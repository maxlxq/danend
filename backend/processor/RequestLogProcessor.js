
const SchemaPack = require('../framework/SchemaPack'),
  RequestLogEnums = require("../enums/RequestLogEnums"),
  guid = require('uuid')

function createLog(params) {
  let resolveStatus = () => {
      if (!params.Error) {
        return RequestLogEnums.Status.Success
      }
      if (typeof params.Error === 'string') {
        if (params.Error.indexOf("usr.aut.srd") > -1) {
          return RequestLogEnums.Status.Denied
        }
        return RequestLogEnums.Status.Failed
      }
      return RequestLogEnums.Status.Exception
    },
    log = new SchemaPack.RequestLog({
      d8Id: guid.v1(),
      Status: resolveStatus(),
      UserToken: params.UserToken,
      ServiceName: params.ServiceName,
      MethodName: params.MethodName,
      IPAddress: params.IPAddress,
      Error: params.Error.stack || params.Error.message || params.Error,
      query: params.query,
      body: params.body
    })
  log.save()
}

module.exports = {
  CreateLog: createLog
}
