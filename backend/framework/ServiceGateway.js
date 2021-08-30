
let responseHelper = require('./ResponseHelper'),
  i18nHelper = require('../helpers/i18nHelper.js'),
  servicesByServerTypeMapping = {
    // web: require('./WebServices.js'),
    // esb: require('./EsbServices.js'),
    mobile: require('./MobileServices.js')
  };

const processRequest = async (req, res, type) => {
  const { ServiceName, MethodName } = req.params
  console.log(new Date, ServiceName, MethodName, req.header("UserToken"))
  try {
    let services = servicesByServerTypeMapping[type],
      result
    if (!services) {
      throw 'Unsupported server type'
    }
    if (services[ServiceName] && services[ServiceName][MethodName] && typeof services[req.params.ServiceName][req.params.MethodName] === "function") {
      result = await services[ServiceName][MethodName]()
      responseHelper.SendData(res, result, false, i18nHelper.getLanguageIndexFromReq(req))
    } else {
      throw 'Unsupported service or method'
    }
  } catch (e) {
    console.log(new Date(), ServiceName, MethodName, req.header("UserToken"), e, req.query, req.body);
    responseHelper.SendError(res, e, i18nHelper.getLanguageIndexFromReq(req));
  }
}

const processMobileRequest = async (req, res) => {
  await processRequest(req, res, 'mobile')
}

module.exports = {
  ProcessMobileRequest: processMobileRequest,
}
