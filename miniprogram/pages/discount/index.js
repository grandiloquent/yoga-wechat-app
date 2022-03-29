// pages/discount/index.js
const app = getApp()
const share = require('../../share');
Page({

    /**
     * 页面的初始数据
     */
    data: {},
    async onLoad(options) {
        wx.setNavigationBarTitle({
            title: "优惠活动"
        })
        if (!app.globalData.yoga) {
            const response = await share.request({
                url: 'https://lucidu.cn/api/yoga'
            });
            app.globalData.yoga = response.data
        }
        console.log(app.globalData.yoga);
        this.setData({
            title: app.globalData.yoga.discountTitle,
            md: app.globalData.yoga.discountContent
        })
    },
})