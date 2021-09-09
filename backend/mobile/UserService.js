
const register = async params => {
  return await require('../business/UserBll').Register({
    UserName: params.req.body.UserName,
    Password: params.req.body.Password,
  })
}

const login = async params => {
  return await require('../business/UserBll').Login({
    UserName: params.req.body.UserName,
    Password: params.req.body.Password,
  })
}

module.exports = {
  Login: login,
  Register: register,
}
