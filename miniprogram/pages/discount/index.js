// pages/discount/index.js
const app = getApp()
const share = require('../../share');


Page({

    data: {},
    async onLoad(options) {

        if (!app.globalData.yoga) {
            const response = await share.request({
                url: `${app.globalData.host}/api/yoga`
            });
            app.globalData.yoga = response.data
        }
        this.setData({
            title: app.globalData.yoga.discountTitle,
            md: app.globalData.yoga.discountContent
        })
    },
    onShareAppMessage() {
        wx.onShareAppMessage(() => {
            return {
                title: '优惠活动'
            }
        })
    },
  
})