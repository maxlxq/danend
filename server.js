
let express = require('express'),
  app = express(),
  cookieParser = require('cookie-parser'),
  port = process.env.PORT || 8888,
  bodyParser = require('body-parser'),
  compress = require('compression'),
  async = require('async'),
  DbConnections = require('./backend/framework/DbConnections.js'),
  maxConnections = 1000000,
  environment = process.env.BUILD_ENV || 'local',
  bodyParserUrl = bodyParser.urlencoded({
    extended: true,
    keepExtensions: true,
    limit: '50mb'
  }),
  allowedOrigins = [
    // 'http://localhost:3000'
  ],
  serverType = process.env.SERVER_TYPE || 'web',
  allowCrossDomain = (req, res, next) => {
    if (allowedOrigins.indexOf(req.headers.origin) > -1) {
      res.header('Access-Control-Allow-Origin', req.headers.origin)
    }
    res.header('Access-Control-Allow-Methods', 'GET,POST')
    res.header('Access-Control-Allow-Headers', 'Content-Type, f, tzo, x-request-with, UserToken')
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Expose-Headers', 'error, Build-Version')
    res.header('Access-Control-Max-Age', 604800)
    next()
  },
  enableCORS = environment !== 'local',
  middleWares = [
    compress(),
    cookieParser(),
    bodyParser.json({
      limit: '50mb'
    }),
    bodyParserUrl
  ],
  httpServer,
  serviceGateway,
  serverFactory = {},
  multer = require('multer'),
  upload = multer({
    dest: './static/img/tmp',
    limits: {
      fileSize: 1024 * 1024 * 100
    }
  })


const parallel = middlewares => {
  'use strict'
  return function (req, res, next) {
    async.each(middlewares, (mw, cb) => {
      mw(req, res, cb)
    }, next)
  }
}

// SERVER_TYPE=mbl PORT=8886 nodemon server.js
serverFactory.mbl = gateway => {
  app.get('/mbl/:ServiceName/:MethodName', gateway.ProcessMobileRequest)
  app.post('/mbl/:ServiceName/:MethodName', upload.any(), gateway.ProcessMobileRequest)
}

DbConnections.init(function () {
  'use strict'
  serviceGateway = require('./backend/framework/ServiceGateway.js')
  if (["web", "mbl", "esb"].includes(serverType)) {
    app.use(parallel(middleWares))
    httpServer = app.listen(port, maxConnections, function () {
      console.log("process.pid", process.pid)
    })
  }
  serverFactory[serverType](serviceGateway)
})
