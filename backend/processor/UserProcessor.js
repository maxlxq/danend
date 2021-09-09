
const SchemaPack = require('../framework/SchemaPack'),
  UserEnums = require('../enums/UserEnums'),
  guid = require('uuid')

const registerUserByPassword = async params => {
  let user = new SchemaPack.User({
    dId: guid.v1(),
    UserName: params.UserName,
    Password: params.Password,
    PasswordSalt: params.PasswordSalt,
    LastLoginTime: Date.now(),
    RegisterDate: Date.now(),
  })
  await user.save()
  return user
}

const updateUser = async (filter, update) => {
  await SchemaPack.User.updateOne(
    filter, update
  ).exec()
}

const getUser = async params => {
  let filter = {
      UserName: params.UserName,
      Status: {
        $in: [
          UserEnums.UserStatus.Active,
          UserEnums.UserStatus.Registered,
          UserEnums.UserStatus.Verified,
        ]
      },
    },
    update,
    user = await SchemaPack.User.findOne(filter).exec()

  if (params.ActionType === UserEnums.ActionType.Login) {
    update = {
      $set: {
        LastLoginTime: Date.now()
      }
    }
    await updateUser(filter, update)
  }
  return user
}

module.exports = {
  RegisterUserByPassword: registerUserByPassword,
  GetUser: getUser,
  UpdateUser: updateUser,
}
