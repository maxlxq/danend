
const bcrypt = require('bcrypt')

const generateHashAndSalt = async pwd => {
  const salt = await bcrypt.genSalt(10),
    hash = await bcrypt.hash(pwd, salt)
  return {
    salt,
    hash,
  }
}

const compareHash = async (pwd, hash) => {
  return await bcrypt.compare(pwd, hash)
}

module.exports = {
  GenerateHashAndSalt: generateHashAndSalt,
  CompareHash: compareHash,
}

