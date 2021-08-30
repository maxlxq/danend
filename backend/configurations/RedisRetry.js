/*jslint node:true es5:true nomen:true*/
let ConstantEnums = require('../enums/ConstantEnums')

function RedisRetry(options) {
  if (options.error && options.error.code === 'ECONNREFUSED') {
    // End reconnecting on a specific error and flush all commands with a individual error
    return new Error('The server refused the connection')
  }
  if (options.total_retry_time > ConstantEnums.REDIS_RETRY_TIME) {
    // End reconnecting after a specific timeout and flush all commands with a individual error
    return new Error('Retry time exhausted')
  }
  // reconnect after
  return Math.max(options.attempt * 100, 3000)
}

module.exports = RedisRetry
