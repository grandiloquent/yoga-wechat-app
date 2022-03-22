// app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env: 'yoga1-8gbpzb9ra0378700',
        traceUser: true,
      });
    }
    this.addUser();
  },
  
  addUser() {
    wx.cloud.callFunction({
      name: "login",
      success: res => {
        this.globalData.openid = res.result.openid;
      },
      fail(err) {
        wx.showToast({
          title: '请求失败，请重试',
          icon: 'none'
        })
      }
    });
  },
  globalData: {
    openid: null
  }
});