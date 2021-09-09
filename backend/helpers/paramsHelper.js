
let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.\-]+@[a-z0-9]([a-z0-9\-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9\-]*[a-z0-9])?)*$/i,
  PHONE_REGEXP = /^[1][1-9][0-9]{9}$/

function testChineseCharacter(str) {
  return (/[\u4e00-\u9fa5]/).test(str);
}

function isValidEmail(params) {
  return new RegExp(EMAIL_REGEXP).test(params);
}
function isValidPhoneNumber(number) {
  return new RegExp(PHONE_REGEXP).test(number);
}

module.exports = {
  testChineseCharacter,
  IsValidEmail: isValidEmail,
  IsValidPhoneNumber: isValidPhoneNumber,
}
