process.env.VUE_ENV = 'server'
process.env.NODE_ENV = 'production'

const path = require('path')
const express = require('express')
const favicon = require('serve-favicon')
const compression = require('compression')
const cors = require('cors')
const routes = require('./routes')
const helmet = require('helmet')
const fetch = require('isomorphic-fetch')
const dotenv = require('dotenv');

dotenv.load({ path: '.env' });

let app = express()

app.use(helmet.xssFilter());
app.use(helmet.frameguard({action: 'deny'}));
app.use(helmet.ieNoOpen());

app.use(compression({threshold: 0}))
app.use(cors());

app.set('trust proxy', true);
app.use(function (req, res, next) {
  if (req.get('x-appengine-https') === 'on' && !req.get('x-forwarded-proto')) {
    req.headers['x-forwarded-proto'] = 'https';
  }
  next();
});

app.use('/dist', express.static(path.resolve(__dirname, './dist')))
app.use('/content', express.static(path.resolve(__dirname, './content')))
app.use('/public', express.static(path.resolve(__dirname, './public')))
app.use(favicon(path.resolve(__dirname, './public/favicon-96x96.png')))
app.use('*', routes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`\n> scs:cmu / application \n`)
})
