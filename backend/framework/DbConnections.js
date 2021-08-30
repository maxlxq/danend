
let mongoose = require('mongoose'),
  config = require('../configurations/config.js'),
  DbConnections = {},
  dbs = ['danCommon', 'danLog'],
  replicaSets = {
    danCommon: config.mongodb.replica,
    danLog: config.mongodb.replica,
  },
  options = {}

mongoose.Promise = global.Promise
mongoose.set('autoIndex', true)
mongoose.set('autoCreate', true)

dbs.forEach(function (dbName) {
  options[dbName] = {
    useNewUrlParser: true,
  }
  if (config.mongodb.replica !== '') {
    options[dbName].replSet = {
      rs_name: replicaSets[dbName],
      readPreference: 'primaryPreferred',
      useNewUrlParser: true,
    }
  }
})

function init(callback) {
  let fullSet = 0,
    connectionMap = {},
    startTheServer = function (theDbName) {
      if (!connectionMap[theDbName]) {
        fullSet += 1
        connectionMap[theDbName] = true
        if (fullSet === dbs.length) {
          if (callback && typeof callback === 'function') {
            callback()
          }
        }
      }
    }
  dbs.forEach(function (dbName) {
    if (config.mongodb[dbName] && config.mongodb[dbName].length > 0) {
      DbConnections[dbName] = mongoose.createConnection(config.mongodb[dbName], options[dbName])
      DbConnections[dbName].on('connecting', function () {
        console.log('Connecting to: ' + dbName)
      })
      DbConnections[dbName].on('connected', function () {
        console.log(process.pid + ' >> Connected to: ' + dbName)
        startTheServer(dbName)
      })
      DbConnections[dbName].on('error', function (err) {
        console.log('Error, trying to reconnect to: ' + dbName + ' >> ' + err)
      })
      DbConnections[dbName].on('disconnected', function () {
        console.log('Disconnected connection: ' + dbName)
      })
      DbConnections[dbName].on('fullsetup', function () {
        console.log('Full replica set connected: ' + dbName)
      })
      DbConnections[dbName].on('reconnected', function () {
        console.log('Reconnected to: ' + dbName)
      })
      DbConnections[dbName].on('close', function () {
        console.log('Closed connection: ' + dbName + '...')
      })
    }
  })
}

function shutdown() {
  dbs.forEach(function (dbName) {

    if (config.mongodb[dbName] && config.mongodb[dbName].length > 0) {
      try {
        DbConnections[dbName].close()
      } catch (dbEx) {
        console.log(dbEx)
      }
    }
  })
  DbConnections = {}
}

DbConnections.shutdown = shutdown
DbConnections.init = init

module.exports = DbConnections
