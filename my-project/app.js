App({
  onLaunch: function () {
    wx.cloud.init({
      env: 'cloud1-8gtrugs0f0002ef3', //云开发环境ID
      traceUser: true,
    })
  },
})
