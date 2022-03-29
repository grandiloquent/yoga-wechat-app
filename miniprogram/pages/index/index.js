// index.js
const app = getApp()
const share = require('../../share');
Page({
  data: {
    categories: [{
      id: 1,
      name: "瑜伽百科",
      icon: "../../images/zhichanbaike.png"
    }, {
      id: 2,
      name: "约团课",
      icon: "../../images/tuantiyuyue.png"
    }, {
      id: 3,
      name: "约私教",
      icon: "../../images/icon-venue-private.png"
    }, {
      id: 4,
      name: "特约教练",
      icon: "../../images/icon-venue-coach.png"
    }, {
      id: 5,
      name: "视频课程",
      icon: "../../images/icon-venue-videos.png"
    }, {
      id: 6,
      name: "照片墙",
      icon: "../../images/icon-venue-zone.png"
    }, {
      id: 7,
      name: "公告",
      icon: "../../images/gonggao.png"
    }, {
      id: 8,
      name: "在线客服",
      icon: "../../images/online-service.png"
    }],

  },
  jumpPage(e) {
    wx.navigateTo({
      url: `/pages/${e.currentTarget.dataset.page}/index?envId=${this.data.selectedEnv.envId}`,
    });
  },
  goNotice() {
    wx.navigateTo({
      url: '/pages/discount/index'
    })
  },
  async onLoad() {
    const response = await share.request({
      url: 'https://lucidu.cn/api/yoga'
    });
    app.globalData.yoga = response.data;
    this.setData({
      yoga: response.data
    })
  },
  
  tabClick(e) {
    const id = e.currentTarget.dataset.id;
    if (id === 1) {
      wx.navigateTo({
        url: '/pages/encyclopedias/index',
      })
      return;
    }
    if (id === 2 || id === 3 || id === 4) {
      wx.switchTab({
        url: '/pages/appointment/index',
      })
    } else
    if (id === 7) {
      wx.navigateTo({
        url: '/pages/announcements/index',
      })
    } else
    if (id === 4  ) {
      wx.navigateTo({
        url: '/pages/notFound/index',
      })
    }else  if (id === 5 ) {
      wx.navigateTo({
        url: '/pages/videoLessons/index',
      })
    } else{
      wx.navigateTo({
        url: "/pages/photoWall/index"
      })
      
    }
  },
  onAnnouncement(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/announcement/index?id=${id}`,
    });
  }


});