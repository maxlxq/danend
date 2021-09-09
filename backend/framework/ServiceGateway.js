
let responseHelper = require('./ResponseHelper'),
  i18nHelper = require('../helpers/i18nHelper.js'),
  requestLogProcess = require('../processor/RequestLogProcessor.js'),
  servicesByServerTypeMapping = {
    // web: require('./WebServices.js'),
    // esb: require('./EsbServices.js'),
    mobile: require('./MobileServices.js')
  };

const processRequest = async (req, res, type) => {
  const { ServiceName, MethodName } = req.params
  console.log(new Date, ServiceName, MethodName, req.method)
  try {
    let services = servicesByServerTypeMapping[type],
      result
    if (!services) {
      throw 'Unsupported server type'
    }
    // 获取请求用户
    // 接口自行检测是否需要登录
    if (services[ServiceName]?.[MethodName] && typeof services[req.params.ServiceName][req.params.MethodName] === "function") {
      result = await services[ServiceName][MethodName]({
        req,
      })
      responseHelper.SendData(res, result, false, i18nHelper.getLanguageIndexFromReq(req))
    } else {
      throw 'Unsupported service or method'
    }
  } catch (e) {
    console.log(new Date(), ServiceName, MethodName, e, req.query, req.body, req.method);
    requestLogProcess.CreateLog({
      ServiceName: ServiceName,
      MethodName: MethodName,
      UserToken: req.header("UserToken"),
      ServerType: type,
      Error: e,
      IPAddress: responseHelper.GetIPAddress(req),
      query: req.query,
      body: req.body
    });
    responseHelper.SendError(res, e, i18nHelper.getLanguageIndexFromReq(req));
  }
}

const processMobileRequest = async (req, res) => {
  await processRequest(req, res, 'mobile')
}

module.exports = {
  ProcessMobileRequest: processMobileRequest,
}
