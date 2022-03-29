// pages/user/index.js
const share = require('../../share.js');
const app = getApp();

Page({
    data: {
        userStatus: 1
    },
    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        wx.setNavigationBarTitle({
            title: '会员中心',
        })
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

    async updateUserInfo() {
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
                    openid:app.globalData.openid
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
        // wx.getUserProfile({
        //     lang: 'zh_CN',
        //     desc: '用于完善会员资料',
        //     success: res => {
        //         console.log(res.userInfo)
        //         const {
        //             nickName,
        //             avatarUrl
        //         } = res.userInfo;
        //         this.setUserInfo(nickName, avatarUrl);

        //     },
        //     fail: err => {
        //         console.log(err);
        //         wx.showToast({
        //             title: err.errMsg,
        //             icon: 'none'
        //         })
        //     }
        // })
    },
    onChange(event) {
        this.setData({
            activeNames: event.detail,
        });
    },
})