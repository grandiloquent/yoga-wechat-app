// app.js

App({
  checkUpdate() {
    const updateManager = wx.getUpdateManager()
    updateManager.onUpdateReady(() => {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            updateManager.applyUpdate()
          }
        }
      })
    })
  },
  getAuthenticationToken(openid) {
    if (!this.globalData.worker) {
      return;
    }
    const {
      brand,
      model,
      system,
      platform,
      SDKVersion
    } = wx.getSystemInfoSync();
    this.globalData.worker.postMessage({
      brand,
      model,
      system,
      platform,
      SDKVersion,
      openId: openid
    })
  },
  async onLaunch() {
    try {
      const token = await wx.getStorage({
        key: 'token'
      });
      if (token.data) {
        
        this.globalData.token = token.data;
      }
    } catch (error) {
      const worker = wx.createWorker('workers/request/index.js')
      this.globalData.worker = worker;
      worker.onMessage((res) => {
        this.globalData.token = res.token;
        wx.setStorage({
          key: "token",
          data: res.token
        });
      })
    }
    try {
      const res = await wx.getStorage({
        key: 'openid'
      });
      if (res.data) {
        this.globalData.openid = res.data;
        this.getAuthenticationToken(res.data);
        return;
      }
    } catch (error) {}

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env: 'yoga1-8gbpzb9ra0378700',
        traceUser: true,
      });
    }
    this.addUser();
    this.checkUpdate();
  },

  addUser() {
    wx.cloud.callFunction({
      name: "login",
      success: res => {
        this.globalData.openid = res.result.openid;
        this.getAuthenticationToken(this.globalData.openid);
        wx.setStorage({
          key: "openid",
          data: res.result.openid
        });
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
    openid: null,
    host: 'https://lucidu.cn',
    staticHost: 'https://static.lucidu.cn'
  }
});