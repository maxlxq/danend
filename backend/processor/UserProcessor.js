
const SchemaPack = require('../framework/SchemaPack'),
  UserEnums = require('../enums/UserEnums'),
  guid = require('uuid')

const registerUserByPassword = async params => {
  let user = new SchemaPack.User({
      dId: guid.v1(),
      UserName: params.UserName,
      Password: params.Password,
      LastLoginTime: Date.now(),
      RegisterDate: Date.now(),
    })
  await user.save()
  return user
}

const getUser = async params => {
  const setObj = {}
  if (params.ActionType === UserEnums.ActionType.Login) {
    setObj.LastLoginTime = Date.now()
  }
  return await SchemaPack.User.findOneAndUpdate(
    {
      UserName: params.UserName,
      Status: {
        $in: [
          UserEnums.UserStatus.Active,
          UserEnums.UserStatus.Registered,
          UserEnums.UserStatus.Verified,
          ]
      },
    },
    {
      $set: setObj,
    }
  ).exec()
}

module.exports = {
  RegisterUserByPassword: registerUserByPassword,
  GetUser: getUser,
}
