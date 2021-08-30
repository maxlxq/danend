
let RedisRetry = require('../RedisRetry'),
  mobileHost = process.env.HOST || 'localhost',
  mobilePort = process.env.PORT || '8886',
  // esbHost = process.env.HOST || 'localhost',
  // esbPort = process.env.PORT || '8887',
  // rpcHost = process.env.HOST || 'localhost',
  // rpcPort = process.env.PORT || '8002',
  // webHost = process.env.HOST || 'localhost',
  // webPort = process.env.PORT || '8888',
  // appHost = "localhost",
  // appPort = "3000",
  ///********************local environment
  mongoHost = process.env.MONGO_HOST || 'localhost',
  mongoPort = process.env.MONGO_PORT || '27017',
  redisHost = process.env.REDIS_HOST || 'localhost',
  redisPort = process.env.REDIS_PORT || '6379'

// console.log(`mongodb://${mongoUserName}:${mongoPassword}@${mongoHost}:${mongoPort}/p8security`)
module.exports = function () {
  'use strict'
  return {
    deploy: {
      useNodeEnv: false
    },
    mongodb: {
      //***************local
      danCommon: process.env.MONGO_P8COMMON || `mongodb://${mongoHost}:${mongoPort}/danCommon`,
      danLog: process.env.MONGO_P8LOG || `mongodb://${mongoHost}:${mongoPort}/danLog`,
      winstonlog: {
        host: process.env.MONGO_P8LOG_HOST || mongoHost,
        port: process.env.MONGO_P8LOG_PORT || mongoPort,
        db: 'danLog',
        collection: 'log'
      },
      replica: process.env.MONGO_REPLICA || '',
      replicaLR: process.env.MONGO_REPLICA_LR || process.env.MONGO_REPLICA || ''
    },
    Redis: {
      Connection: {
        host: process.env.REDIS_HOST || redisHost,
        port: process.env.REDIS_PORT || redisPort,
        retry_strategy: RedisRetry
      }
    },
    protocol: 'http:',
    mblUrl: `//${mobileHost}:${mobilePort}/`,
    SearchDatabase: process.env.SEARCH_DB || 'MongoDB',
  }
}
