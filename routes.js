const fs = require('fs')
const path = require('path')
const serialize = require('serialize-javascript')
const bundleRenderer = require('vue-server-renderer')
const cache = require('lru-cache')

const routes = (req, res) => {

  const indexHtml = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf-8')

  try {
    var bundle = fs.readFileSync(path.resolve(__dirname, './dist/server-bundle.js'), 'utf-8')
  } catch(err){
    res.status(500).end('500 | Internal Error')
  }

  let renderer = bundleRenderer.createBundleRenderer(bundle, {
    cache: cache({ max: 1000, maxAge: 1000 * 60 * 15 })
  })

  if (!renderer) return res.end('> compiling')

  res.setHeader("Content-Type", "text/html")

  const context = { url: req.baseUrl }
  const renderStream = renderer.renderToStream(context)

  res.write(indexHtml.slice(0, indexHtml.indexOf('<!-- APP -->')))

  renderStream.on('data', chunk => {
    res.write(chunk)
  })

  renderStream.on('end', () => {
    if (context.initialState) {
      res.write(
        `<script>window.__INITIAL_STATE__=${
          serialize(context.initialState, { isJSON: true })
        }</script>`
      )
    }
    res.end(indexHtml.slice(indexHtml.indexOf('<!-- APP -->') + '<!-- APP -->'.length))
  })

  renderStream.on('error', err => {
    if (err && err.code === '404') {
      res.status(404).end('404 | Page Not Found')
      return
    }
    res.status(500).end('500 | Internal Error')
    console.error(err)
  })

}

module.exports = routes;
