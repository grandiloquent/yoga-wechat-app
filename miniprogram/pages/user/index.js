// pages/user/index.js
const share = require('../../share.js');
const app = getApp();

Page({
    data: {
        userStatus: 1
    },

    async onLoad(options) {
        if (!this.checkOpenId()) {
            return;
        }
        const response = await share.request({
            url: `https://lucidu.cn/api/user/${app.globalData.openid}`
        });
        if (response.data) {
            app.globalData.userInfo = response.data
            this.setData({
                userStatus: 2,
                userInfo: response.data
            })
        } else {
            this.setData({
                userStatus: 1,
            })
        }
    },
    checkOpenId() {
        if (!app.globalData.openid) {
            wx.showToast({
                title: "无法获取用户ID",
                icon: "error"
            });
            return false;
        }
        return true;
    },
    async updateUserInfo() {
        if (!this.checkOpenId()) {
            return;
        }
        try {
            const response = await share.getUserProfile({
                lang: 'zh_CN',
                desc: '用于完善会员资料'
            });
            const {
                nickName,
                avatarUrl,
                gender
            } = response.userInfo;
            const res = await share.request({
                url: `https://lucidu.cn/api/user`,
                method: 'post',
                data: {
                    nickName,
                    avatarUrl,
                    gender,
                    openid: app.globalData.openid
                }
            });
            app.globalData.userInfo = response.userInfo
            this.setData({
                userStatus: 2,
                userInfo: response.userInfo
            });
        } catch (error) {
            console.log(error);
        }
    }
})