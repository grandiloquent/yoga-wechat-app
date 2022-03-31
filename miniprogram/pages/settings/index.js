const app = getApp()
const share = require('../../share');

Page({
    data: {
        hideDialog: true
    },
    async onLoad(options) {

        let response;
        try {
            response = await share.request({
                url: `https://lucidu.cn/api/user/${app.globalData.openid}`
            });
        } catch (error) {
            console.error(error);
        }
        if (!response) {
            return;
        }
        const {
            nickName,
            phone,
            address,
            gender
        } = response.data;
        this.setData({
            nickName,
            phone,
            address,
            gender
        });
    },
    closeDialog() {
        this.setData({
            hideDialog: true
        })
    },
    capture() {

    }
})