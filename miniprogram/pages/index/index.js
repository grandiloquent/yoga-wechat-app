// index.js
const app = getApp()
const share = require('../../share');
const api = require('../../api');

Page({
  data: {
    host:app.globalData.host
  },
  async setScrolling() {
    const rect = await share.boundingClientRect('.sliding-container');
    const height = rect.height;
    let index = 0;
    let max = app.globalData.yoga.prompts.length;
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
  async onLoad() {

    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })

    app.globalData.yoga = (await api.fetchConfiguration(app)).data;
    this.setData({
      yoga: app.globalData.yoga
    });

    this.setScrolling();
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
    } else if (id === 6) {
      wx.navigateTo({
        url: "/pages/discount/index",
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
  },
  onShareAppMessage() {
    wx.onShareAppMessage(() => {
      return {
        title: '瑜伽测试号'
      }
    })
  },
  openOfferInformation() {
    wx.navigateTo({
      url: "/pages/discount/index",
    })
  }


});