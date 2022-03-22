// index.js
const app = getApp()
Page({
  data: {
    noticeList: {
      title: "预约课程 68 元",
      id: 1
    },
    categories: [{
      id: 1,
      name: "约团课",
      icon: "../../images/icon-venue-league.png"
    }, {
      id: 2,
      name: "约私教",
      icon: "../../images/icon-venue-private.png"
    }, {
      id: 3,
      name: "特约教",
      icon: "../../images/icon-venue-coach.png"
    }, {
      id: 4,
      name: "视频课程",
      icon: "../../images/icon-venue-videos.png"
    }, {
      id: 5,
      name: "照片墙",
      icon: "../../images/icon-venue-zone.png"
    }, {
      id: 6,
      name: "活动",
      icon: "../../images/huodong.png"
    }, {
      id: 7,
      name: "公告",
      icon: "../../images/gonggao.png"
    }, {
      id: 8,
      name: "在线客服",
      icon: "../../images/online-service.png"
    }],



    coachs:[
      {
        teacherName:"妮子老师",
        type:"私教",
        thumbnail:"../../images/pilates.jpg",
        description:"国家一级教练，国家一级教练，国家一级教练，国家一级教练，国家一级教练，"
      },
      {
        teacherName:"妮子老师",
        type:"私教",
        thumbnail:"../../images/pilates.jpg",
        description:"国家一级教练，国家一级教练，国家一级教练，国家一级教练，国家一级教练，"
      },
      {
        teacherName:"妮子老师",
        type:"私教",
        thumbnail:"../../images/pilates.jpg",
        description:"国家一级教练，国家一级教练，国家一级教练，国家一级教练，国家一级教练，"
      },
    ]

  },
  jumpPage(e) {
    wx.navigateTo({
      url: `/pages/${e.currentTarget.dataset.page}/index?envId=${this.data.selectedEnv.envId}`,
    });
  },
  goNotice() {

  },
  onLoad() {
    this.setData({
      announcements: [{
        title: "元旦放假通知",
        updateAt: 1640966400,
        id: 'xxxyyy'
      }]
    })
  },
  tabClick(e) {
    const id = e.currentTarget.dataset.id;
    if (id === 1 || id === 2 || id === 3) {
      wx.switchTab({
        url: '/pages/appointment/index',
      })
    } else
    if (id === 7) {
      wx.navigateTo({
        url: '/pages/announcement/index',
      })
    } else
    if (id === 4 || id === 5 || id === 6) {
      wx.navigateTo({
        url: '/pages/notFound/index',
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