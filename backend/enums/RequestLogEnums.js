
let Enums = {
  Status: {
    Denied: 0, //the request didn't pass authentication or authorization
    Failed: 0, //the request passed auth, but failed at business logic
    Exception: 0, //some unhandled exception happened, let array out of bound, reference to an undefined object
    Success: 0//the service was successfully executed
  },
  ServerType: {
    Mobile: 0,
    Web: 0,
    ESB: 0,
    API: 0
  }
}
require('./EnumsBase.js').SetNames(Enums)

module.exports = Enums
