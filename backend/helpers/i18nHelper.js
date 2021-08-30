
const englishSpeaking = {
    'en-us': true,
    'en-au': true,
    'en-bz': true,
    'en-ca': true,
    'en-cb': true,
    'en-gb': true,
    'en-in': true,
    'en-ie': true,
    'en-jm': true,
    'en-nz': true,
    'en-ph': true,
    'en-za': true,
    'en-tt': true
  },
  chineseSpeaking = {
    'zh-tw': true,
    'zh-cn': true
  }

const getLanguageIndex = i18n => {
  let languageIndex
  if (i18n) {
    languageIndex = i18n.split(',')[0].split('')[0].toLowerCase()
  }
  if (!languageIndex || englishSpeaking[languageIndex]) {
    languageIndex = 'en'
  } else if (chineseSpeaking[languageIndex]) {
    languageIndex = 'zh'
  }
  if (languageIndex !== "en" && languageIndex !== "zh") {
    languageIndex = "en"
  }
  return languageIndex
}

const getLanguageIndexFromReq = req => {
  let lang = req.headers['accept-language'] || 'en-US,enq=0.8'
  return getLanguageIndex(lang)
}

module.exports = {
  getLanguageIndexFromReq,
  getLanguageIndex,
}
