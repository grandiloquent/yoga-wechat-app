const app = getApp()
const share = require('../../share');
Page({
    data: {
        pictruesLeft: [],
        pictruesRight: [],
        leftHeight: 0,
        rightHeight: 0
    },
    async onLoad(options) {
        this.setData({
            screenWidth: wx.getSystemInfoSync().screenWidth,
            screenHeight: wx.getSystemInfoSync().screenHeight,
            imgWidth: 0.5 * wx.getSystemInfoSync().screenWidth,
        })
        let response;
        try {
            response = await share.request({
                url: `https://lucidu.cn/api/picture/all`
            });
        } catch (error) {
            console.error(error);
        }
        
        if (!response) {
            return;
        }

        let pictrues = response.data;
        
        pictrues.forEach(x => {
            const match = /W(\d+)H(\d+)/.exec(x.image);
            const width = parseInt(match[1]);
            const height = parseInt(match[2]);

            var scale = this.data.imgWidth / width;
            var imgHeight = height * scale;
            if (this.data.leftHeight <= this.data.rightHeight) {
                this.data.pictruesLeft.push({
                    id: x.id,
                    src: `https://static.lucidu.cn/images/${x.image}`
                })
                this.data.leftHeight += imgHeight;
            } else {
                this.data.pictruesRight.push({
                    id: x.id,
                    src: `https://static.lucidu.cn/images/${x.image}`
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
            urls: this.data.pictruesLeft.map(x=>x.src)
            .concat(this.data.pictruesRight.map(x=>x.src))
        })
    }
})