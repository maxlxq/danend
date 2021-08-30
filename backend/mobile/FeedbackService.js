
async function getFeedback(params) {
  // 'use strict';
  // let result = await require("../business/AppFeedbackBll.js").SubmitFeedback({
  //   FeedbackText: params.req.body.FeedbackText,
  //   Contact: params.req.body.Contact,
  //   FeedbackId: params.req.body.FeedbackId,
  //   PictureFileNames: params.req.body.PictureFileNames,
  //   DateBucket: params.req.body.DateBucket,
  //   UserName: params.req.body.UserName,
  //   files: params.req.files
  // });
  return { code: 200, data: { msg: 'success' } }
}

module.exports = {
  GetFeedback: getFeedback
}
