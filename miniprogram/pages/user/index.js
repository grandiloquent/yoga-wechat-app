// pages/user/index.js
const share = require('../../share.js');

const app = getApp();

Page({


    data: {
        activeNames: ["1"]
    },
    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        wx.setNavigationBarTitle({
            title: '会员中心',
        })
        const res = await share.callFunction({
            name: "getUserInfo"
        });
        if (res.result[0].avatarUrl) {
            this.setData({
                userStatus: 2,
                userInfo: res.result[0]
            })
        } else {
            this.setData({
                userStatus: 1,
            })
        }

        // wx.getUserInfo({
        //     success: res => {
        //         const userInfo = res.userInfo;
        //         this.setData({
        //             userInfo
        //         });
        //         console.log(userInfo);
        //     },
        //     fail: res => {
        //         console.log(res);
        //     }
        // })
    },

    updateUserInfo() {
        wx.getUserProfile({
            lang: 'zh_CN',
            desc: '用于完善会员资料',
            success: res => {
                const {
                    nickName,
                    avatarUrl
                } = res.userInfo;
                this.setUserInfo(nickName, avatarUrl);
                this.setData({
                    userStatus: 2,
                    userInfo: res.userInfo
                });
            },
            fail: err => {
                console.log(err);
                wx.showToast({
                    title: err.errMsg,
                    icon: 'none'
                })
            }
        })
    },
    setUserInfo(nickName, avatarUrl) {
        wx.cloud.callFunction({
            name: "updateUserInfo",
            data: {
                nickName: nickName,
                avatarUrl: avatarUrl
            },
            success: res => {
                console.log(res);
            },
            fail: err => {
                console.log(err);
            }
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    onChange(event) {
        this.setData({
            activeNames: event.detail,
        });
    },
})