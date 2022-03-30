const share = require('../../share');

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },


    async onLoad(options) {
        const rect = await share.boundingClientRect('.sliding-container');
        const height = rect.height;
        let index = 0;
        let max =4;
        setInterval(() => {
            let count;
            if (index < max / 2)
                count = (-height * (index + 1));
            else if (index === max - 1) {
                count = 0
            } else {
                count = (-height * (index % 2 + 1));
            }
            if (index + 1 < max)
                index++;
            else
                index = 0;
            this.setData({
                style: `transform: translateY(${count}px)`
            })
        }, 1000);

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