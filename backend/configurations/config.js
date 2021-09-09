
let environment = process.env.BUILD_ENV || 'local',
  Config = require('./cf/' + environment + '-config.js')({
    path: __dirname.replace('/backend/configurations', '')
  }),
  RedisRetry = require('./RedisRetry'),
  databases = ['danCommon', 'danLog', 'danSecurity'],
  primary = process.env.REPLICA_PRIMARY || 'a0',
  secondary = process.env.REPLICA_SECONDARY || 'a1',
  primaryB = process.env.REPLICA_PRIMARY_B || 'a0',
  secondaryB = process.env.REPLICA_SECONDARY_B || 'a1',
  envInvariants = {
    Redis: {
      Connection: {
        url: process.env.REDISCLOUD_URL,
        no_ready_check: true,
        retry_strategy: RedisRetry
      }
    },
    DispatchEmailInterval: 10,
    ProcessEventBusItemInterval: 10,
    EsbItemNumberPerTurk: 20,
    PerformScheduledTasksInterval: 30,
    TriggerJobInterval: 300,
    UnlockEventBusItemsInterval: 300,
    EmailPerDispatch: 100,
    ConcurrentJobsNumber: 2,
    UploadFolder: "static",
    RecordStore: "record",
    ImageStore: "img",
    DocsStore: "docs",
    ProvisionStore: "provision",
    // checkWeChatUrl: "https://api.weixin.qq.com/sns/auth",
    // wechatTokenUrl: "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential",
    // wechatTicketUrl: "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token="
  }

Object.keys(envInvariants).forEach(function (prop) {
  Config[prop] = Config[prop] || envInvariants[prop]
})

databases.forEach(function (db) {
  'use strict'
  if (Config.mongodb[db]) {
    Config.mongodb[db] = Config.mongodb[db].replace(/__primary__/g, primary).replace(/__secondary__/g, secondary)
    Config.mongodb[db] = Config.mongodb[db].replace(/__primaryB__/g, primaryB).replace(/__secondaryB__/g, secondaryB)
  }
})
if (Config.mongodb.winstonlog && Config.mongodb.winstonlog.host) {
  Config.mongodb.winstonlog.host = Config.mongodb.winstonlog.host.replace(/__primary__/g, primary).replace(/__secondary__/g, secondary)
  Config.mongodb.winstonlog.host = Config.mongodb.winstonlog.host.replace(/__primaryB__/g, primaryB).replace(/__secondaryB__/g, secondaryB)
}

module.exports = Config
