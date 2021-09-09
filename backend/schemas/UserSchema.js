

let DanSchema = require('../framework/DanSchema.js'),
  DbConnections = require('../framework/DbConnections.js'),
  UserEnums = require('../enums/UserEnums.js'),
  ConstantEnums = require('../enums/ConstantEnums.js'),
  props = () => {
    return {
      UserName: {type: String},
      Password: {type: String},
      PasswordSalt: {type: String},
      Status: {type: String, enum: Object.keys(UserEnums.UserStatus), default: UserEnums.UserStatus.Registered},
      LastLoginTime: {type: Number},
      RegisterDate: {type: Number},
    }
  },
  UserSchema = new DanSchema(props())

exports.User = DbConnections.danCommon.model('User', UserSchema, 'User');
