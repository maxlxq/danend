
const bcrypt = require('bcrypt')
const saltRounds = 10

const generateHash = async pwd => {
  return await bcrypt.hash(pwd, saltRounds)
}

const compareHash = async (pwd, hash) => {
  return await bcrypt.compare(pwd, hash)
}

module.exports = {
  GenerateHash: generateHash,
  CompareHash: compareHash,
}

