const share = require('../../share');

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },


    async onLoad(options) {

        let rect = await share.boundingClientRect('.img-width');
        this.slideImageWidth = rect.width;
        this.smallWidth = rect.width / 5;

        rect = await share.boundingClientRect('.slide-button');
        this.maxMove = this.slideImageWidth + 12 - rect.width;

        // wx.createSelectorQuery().select(".slide-button").boundingClientRect(function (e) {
        //     e && (o = e.width, i.maxMove = i.slideImageWidth + 12 - o, i.allTime = 0, i.timer1 = setInterval(function () {
        //         i.allTime = i.allTime + 10;
        //     }, 10));
        // }).exec();
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


    onShareAppMessage() {

    },
    touchstart(e) {
        this.downX = e.touches[0].clientX;
    },
    touchmove(e) {
        const offset = Math.min(e.touches[0].clientX - this.downX, this.maxMove);
        const xOffset = Math.max(-6, offset - 6);

        // var n = i,
        //     o = i - 6;
        // o < -6 && (o = -6, this.showTxt = !0), n < 0 && (n = 0), this.btnClientX = o, this.clientX = n;

        this.setData({
            btnClientX: xOffset
        })
    },
    touchend(e) {
        this.setData({
            btnClientX: -6
        })
    },
    closeDialog() {
        this.setData({
            hideDialog: true
        })
    }
})