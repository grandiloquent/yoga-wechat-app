const app = getApp()
const share = require('../../share');
const api = require('../../api');

Page({
    data: {
        pictruesLeft: [],
        pictruesRight: [],
        leftHeight: 0,
        rightHeight: 0,
        limit: 20,
        offset: 0
    },
    async onLoad(options) {

        this.setData({
            screenWidth: wx.getSystemInfoSync().screenWidth,
            screenHeight: wx.getSystemInfoSync().screenHeight,
            imgWidth: 0.5 * wx.getSystemInfoSync().screenWidth,
        })
        await this.loadPictures();
    },

    async loadPictures() {
        let pictrues = (await api.fetchPictures(app, this.data.limit, this.data.offset)).data;

        if (!pictrues.length) {
            this.data.finished = true;
            return;
        }
        pictrues.forEach(x => {
            const match = /W(\d+)H(\d+)/.exec(x.image);
            const width = parseInt(match[1]);
            const height = parseInt(match[2]);

            var scale = this.data.imgWidth / width;
            var imgHeight = height * scale;
            if (this.data.leftHeight <= this.data.rightHeight) {
                this.data.pictruesLeft.push({
                    id: x.id,
                    src: `${app.globalData.staticHost}/images/${x.image}`
                })
                this.data.leftHeight += imgHeight;
            } else {
                this.data.pictruesRight.push({
                    id: x.id,
                    src: `${app.globalData.staticHost}/images/${x.image}`
                })
                this.data.rightHeight += imgHeight;
            }

        })
        this.setData({
            pictruesLeft: this.data.pictruesLeft,
            pictruesRight: this.data.pictruesRight
        })
    },

    onPreviewImage(e) {
        wx.previewImage({
            current: e.currentTarget.dataset.src,
            urls: this.data.pictruesLeft.map(x => x.src)
                .concat(this.data.pictruesRight.map(x => x.src))
        })
    },
    async onReachBottom() {
        try {
            if (this.data.finished) return;
            this.data.offset += this.data.limit;
            console.log(this.data.offset);
            await this.loadPictures();
        } catch (error) {
            this.data.finished = true;
        }
    }
})