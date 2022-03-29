// pages/announcement/index.js
const app = getApp()
const share = require('../../share');

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    onLoad(options) {
        if (!options.id) {
           
        } else {
            const id = parseInt(options.id);
            for (const iterator of app.globalData.yoga.announcements) {

                if (iterator.id === id) {
                    const time = new Date(iterator.updatedTime / 10000);
                    this.setData({
                        title: iterator.title,
                        md: iterator.content,
                        dateTime:`${time.getFullYear()}年${(time.getMonth()+1).toString().padStart(2,'0')}月${time.getDate().toString().padStart(2,'0')}日`
                    });
                    break;
                }
            }

        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

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

    }
})