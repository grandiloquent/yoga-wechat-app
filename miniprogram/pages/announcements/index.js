// pages/announcements/index.js
const app = getApp()
const share = require('../../share');
Page({
    data: {
    },
    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: "公告"
        })
        this.setData({
            announcements: app.globalData.yoga.announcements
        })
    },
    onItemClick(e) {
        wx.navigateTo({
            url:`/pages/announcement/index?id=${e.currentTarget.dataset.id}`
        })
    },
})