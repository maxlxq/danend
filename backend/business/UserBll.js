
const CryptoHelper = require('../helpers/CryptoHelper'),
  userProcessor = require('../processor/UserProcessor'),
  UserEnums = require('../enums/UserEnums')

const registerUserByPassword = async params => {
  return await userProcessor.RegisterUserByPassword(params)
}

const register = async params => {
  let user = await userProcessor.GetUser(params),
    hashPwd
  if (user) {
    throw 'usr.bll.uae'
  }
  hashPwd = await CryptoHelper.GenerateHash(params.Password)
  return await registerUserByPassword({
    UserName: params.UserName,
    Password: hashPwd,
    ActionType: UserEnums.ActionType.Register,
  })
}

const getUser = async params => {
  return await userProcessor.GetUser(params)
}

const login = async params => {
  let user = await getUser({
    ActionType: UserEnums.ActionType.Login,
    ...params
  })
  if (!user) {
    throw 'usr.une'
  }
  const match = await CryptoHelper.CompareHash(params.Password, user.Password)
  if (!match) {
    throw 'usr.bll.pie'
  }
  return user
}

module.exports = {
  Login: login,
  Register: register,
}
