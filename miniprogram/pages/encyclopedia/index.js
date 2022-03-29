// pages/encyclopedia/index.js
const app = getApp()
const share = require('../../share');
Page({
    data: {

    },
    async onLoad(options) {
        const id = parseInt(options.id);
        const response = await share.request({
            url: 'https://lucidu.cn/api/encyclopedia?id=' + id
        });
        this.setData({
            title: response.data.title,
            md: response.data.content
        });
    }

})