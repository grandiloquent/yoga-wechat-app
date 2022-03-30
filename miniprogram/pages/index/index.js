// index.js
const app = getApp()
const share = require('../../share');
Page({
  data: {},
  jumpPage(e) {
    wx.navigateTo({
      url: `/pages/${e.currentTarget.dataset.page}/index?envId=${this.data.selectedEnv.envId}`,
    });
  },
  goNotice() {
    wx.navigateTo({
      url: '/pages/discount/index'
    })
  },
  async onLoad() {
    const response = await share.request({
      url: 'https://lucidu.cn/api/yoga'
    });
    app.globalData.yoga = response.data;
    this.setData({
      yoga: response.data
    });

    const rect = await share.boundingClientRect('.sliding-container');
    const height = rect.height;
    let index = 0;
    let max = response.data.prompts.length;
    let forward = true;
    setInterval(() => {
      if (!forward && index < 1) {
        index = 0;
        forward = true;
      }
      if (forward && index + 1 < max)
        index++;
      else {
        forward = false;
      }
      if (!forward) {
        index--;
      }
      let count = index * height * -1;

      this.setData({
        style: `transform: translateY(${count}px)`
      })
    }, 3000);
  },
  onBookClass() {
    wx.switchTab({
      url: '/pages/appointment/index',
    })
  },
  tabClick(e) {
    const id = e.currentTarget.dataset.id;
    if (id === 1) {
      wx.navigateTo({
        url: '/pages/encyclopedias/index',
      })
      return;
    }
    if (id === 2 || id === 3 || id === 4) {
      this.navigateToBookClass();
    } else
    if (id === 7) {
      wx.navigateTo({
        url: '/pages/announcements/index',
      })
    } else
    if (id === 4) {
      wx.navigateTo({
        url: '/pages/notFound/index',
      })
    } else if (id === 5) {
      wx.navigateTo({
        url: '/pages/videoLessons/index',
      })
    } else {
      wx.navigateTo({
        url: "/pages/photoWall/index"
      })

    }
  },
  onAnnouncement(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/announcement/index?id=${id}`,
    });
  },
  navigateToBookClass() {
    wx.switchTab({
      url: '/pages/appointment/index',
    })
  }


});