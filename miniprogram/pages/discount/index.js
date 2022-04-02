const app = getApp()
const api = require('../../api');

Page({

    data: {},
    async onLoad(options) {

        if (!app.globalData.yoga) {
            app.globalData.yoga = (await api.fetchConfiguration(app)).data;
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