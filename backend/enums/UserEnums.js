
let Enums = {
  UserStatus: {
    Forbidden: 0,
    Archived: 0,
    Verified: 0,
    Active: 0,
    Registered: 0, //User has confirmed through cellphone or email, can use limited functionality
  },
  NameStatus: {
    Empty: 0,
    Default: 0,
    Set: 0
  },
  TokenStatus: {
    Active: 0,
    Archived: 0
  },
  UserType: {
    Student: 0,
    Teacher: 0,
    Other: 0,
    GlobalAdmin: 0,
  },
  ContactStatus: {
    Pending: 0, //user wants to add a contact but has not been verified
    Archived: 0,
    Regular: 0,
    Primary: 0
  },
  DeviceType: {
    iOS: 0,
    android: 0
  },
  ActionType: {
    Login: 0,
    Register: 0,
    Archived: 0,
  }
}

require('./EnumsBase.js').SetNames(Enums)

module.exports = Enums
