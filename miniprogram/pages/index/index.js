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
    });
    this.setData({
      market: [{
        image: "https://thirdwx.qlogo.cn/mmopen/vi_32/L6SG55UJpKRHlk15ibtm7icF9MyhgBcG0flZZNicq4Jrxs3bMT2QkRo0DJNXf445DDPwJwy3Hl98YSVicicg0Nvysdg/132",
        title: "萧大侠已预约课程"
      }, {
        image: "https://thirdwx.qlogo.cn/mmopen/vi_32/L6SG55UJpKRHlk15ibtm7icF9MyhgBcG0flZZNicq4Jrxs3bMT2QkRo0DJNXf445DDPwJwy3Hl98YSVicicg0Nvysdg/132",
        title: "潇洒哥已预约课程"
      }, {
        image: "https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJVJ3bu5nDiblEmjaUS6ZPEDYvL5j9zlV94rdqIS499bTEDibUricx3gy53s96BOlAwujE4nqyEuMI6g/132",
        title: "陈陈已预约课程"
      }]
    });
    const rect = await share.boundingClientRect('.sliding-container');
    const height = rect.height;
    let index = 0;
    let max = 4;
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
    }, 3000);
  },
  onBookClass() {
    wx.switchTab({
      url: '/pages/appointment/index',
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
    if (id === 4) {
      wx.navigateTo({
        url: '/pages/notFound/index',
      })
    } else if (id === 5) {
      wx.navigateTo({
        url: '/pages/videoLessons/index',
      })
    } else {
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