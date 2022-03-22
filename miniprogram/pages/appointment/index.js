// pages/appointment/index.js
const share = require("../../share");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        selected: 0,
        courses: [{
            startTime: "9:00",
            endTime: "10:00",
            teacher: "欧阳老师",
            maxPeoples: 10,
            courseName: "普拉提",
            image: "../../images/pilates.jpg"
        }, {
            startTime: "14:00",
            endTime: "15:00",
            teacher: "欧阳老师",
            maxPeoples: 10,
            courseName: "优雅仪态",
            image: "../../images/elegant-demeanor.jpg"
        }]
    },


    onLoad(options) {
        this.setData({
            dates: share.getDates()
        });
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

    },
    onDateTap(e) {
        this.setData({
            selected: parseInt(e.currentTarget.dataset.id)
        })
    }
})