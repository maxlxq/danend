


function testChineseCharacter(str) {
  return (/[\u4e00-\u9fa5]/).test(str);
}

module.exports = {
  testChineseCharacter,
}
