let translationKeys = {
    en: require("../enums/KeyEnglish.js"),
    zh: require("../enums/KeyChinese.js")
  },
  paramsHelper = require('../helpers/paramsHelper.js')

const applyLanguagePaddingToNode = node => {
  if (node.en && typeof node.en === 'string' && !node.zh) {
    node.zh = node.en
  }
  if (node.zh && typeof node.zh === 'string' && !node.en) {
    node.en = node.zh
  }
}

const padLanguageString = doc => {
  Object.keys(doc).forEach((key) => {
    let child = doc[key]
    if (child && typeof child === "object") {
      applyLanguagePaddingToNode(child)
      padLanguageString(child)
    }
  })
  return doc
}

const contentTypeData = (res, contentTypeHeader, contentTypeValue) => {
  res.set(contentTypeHeader, contentTypeValue)
}

const sendData = (res, data, asIs, languageIndex) => {
  let myTranslationKeys = translationKeys[languageIndex],
    obj
  contentTypeData(res, 'Cache-Control', 'no-cache, must-revalidate')
  if (asIs) {
    res.send(data)
  } else if (typeof data === "string") {
    res.send({
      message: myTranslationKeys[data] || data
    })
  } else if (typeof data === "object") {
    obj = JSON.parse(JSON.stringify(data))
    if (obj && !obj.KeepLanguage) {
      padLanguageString(obj)
    }
    res.send({
      data: obj
    })
  } else {
    res.send({
      data: data
    })
  }
}

const sendError = (res, error, languageIndex) => {
  'use strict'
  let str = error.toString(),
    myTranslationKeys = translationKeys[languageIndex]
  if (!paramsHelper.testChineseCharacter(str)) {
    contentTypeData(res, 'Error', str)
  } else {
    contentTypeData(res, 'Error', "rpc error")
  }
  contentTypeData(res, 'Content-Type', 'text/html;charset=utf-8')
  res.send(myTranslationKeys[str] || str)
}

module.exports = {
  SendData: sendData,
  SendError: sendError,
}
