let DanSchema = require('../framework/DanSchema.js'),
  DbConnections = require('../framework/DbConnections.js'),
  RequestLogEnums = require('../enums/RequestLogEnums.js'),
  ConstantEnums = require('../enums/ConstantEnums.js'),
  props = {
    Status: {type: String, enum: Object.keys(RequestLogEnums.Status)},
    GroupId: {type: String},
    UserId: {type: String},
    UserToken: {type: String},
    MemberId: {type: String},
    DisplayName: ConstantEnums.MultiLanguageStringType,
    ServiceName: {type: String},
    MethodName: {type: String},
    IPAddress: {type: String},
    UserAgent: {type: String},
    ServerType: {type: String, enum: Object.keys(RequestLogEnums.ServerType)},
    CreateTime: {type: Date, default: Date.now},
    Error: {},
    query: {},
    body: {}
  },
  RequestLog = new DanSchema(props);

exports.RequestLog = DbConnections.danLog.model('RequestLog', RequestLog, 'RequestLog')
