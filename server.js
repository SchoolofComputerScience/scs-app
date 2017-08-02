const fs = require('fs')
const path = require('path')
const LRU = require('lru-cache')
const express = require('express')
const cors = require('cors')
const favicon = require('serve-favicon')
const helmet = require('helmet')
const compression = require('compression')
const resolve = file => path.resolve(__dirname, file)
const { createBundleRenderer } = require('vue-server-renderer')
const dotenv = require('dotenv');
const fetch = require('isomorphic-fetch')
const robots = require('express-robots')

dotenv.load({ path: '.env' });

const isProd = process.env.NODE_ENV === 'production'
const serverInfo =
  `express/${require('express/package.json').version} ` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`

const app = express()

const template = fs.readFileSync(resolve('./src/index.template.html'), 'utf-8')

function createRenderer (bundle, options) {
  return createBundleRenderer(bundle, Object.assign(options, {
    template,
    cache: LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15
    }),
    basedir: resolve('./dist'),
    runInNewContext: false
  }))
}

let renderer
let readyPromise
if (isProd) {
  const bundle = require('./dist/vue-ssr-server-bundle.json')
  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  renderer = createRenderer(bundle, {
    clientManifest
  })
} else {
  readyPromise = require('./build/setup-dev-server')(app, (bundle, options) => {

    renderer = createRenderer(bundle, options)
  })
}

const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
})

app.use(compression({ threshold: 0 }))
app.use(robots({UserAgent: '*', Disallow: '/'}))
app.use('/dist', serve('./dist', true))
app.use('/public', serve('./public', true))
app.use('/content', serve('./content'))
app.use(favicon(path.resolve(__dirname, './public/favicon-96x96.png')))
app.use(helmet.xssFilter())
app.use(helmet.frameguard({action: 'deny'}))
app.use(helmet.ieNoOpen())
app.use(cors());
app.set('trust proxy', true);
app.use(function (req, res, next) {
  if (req.get('x-appengine-https') === 'on' && !req.get('x-forwarded-proto')) {
    req.headers['x-forwarded-proto'] = 'https';
  }
  next();
});

function render (req, res) {
  res.setHeader("Content-Type", "text/html")
  res.setHeader("Server", serverInfo)

  const handleError = err => {
    if (err.url) {
      res.redirect(err.url)
    } else if(err.code === 404) {
      res.status(404).end('404 | Page Not Found')
    } else {
      res.status(500).end('500 | Internal Server Error')
      console.error(`error during render : ${req.url}`)
      console.error(err.stack)
    }
  }

  const context = {
    title: 'CMU School of Computer Science',
    url: req.url
  }

  renderer.renderToString(context, (err, html) => {
    if (err) {
      return handleError(err)
    }
    res.end(html)
  })
}

app.get('*', isProd ? render : (req, res) => {
  readyPromise.then(() => render(req, res))
})

app.listen(process.env.PORT || 4000, () => {
  console.log(isProd ? `\n> scs:cmu / application \n` : `\n> building`)
})
