// pages/encyclopedias/index.js
const app = getApp()
const share = require('../../share');
Page({

    /**
     * 页面的初始数据
     */
    data: {
    },
    async onLoad(options) {
        wx.setNavigationBarTitle(
            {
                title:"瑜伽百科"
            }
        )
        const response = await share.request({
            url: 'https://lucidu.cn/api/encyclopedia/list'
        });
        this.setData({
            encyclopedias: response.data
        })
    },
    onItemClick(e) {
        wx.navigateTo(
            {
                url:`/pages/encyclopedia/index?id=${e.currentTarget.dataset.id}`
            }
        )
    },
})