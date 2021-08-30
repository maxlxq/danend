
async function getFeedback(params) {
  console.log('params:', params)
  return { code: 200, data: { msg: 'success' } }
}

module.exports = {
  GetFeedback: getFeedback
}
