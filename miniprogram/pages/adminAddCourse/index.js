// pages/adminAddCourse/index.js
const share = require('../../share');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        showChooseCourse: false,
        courses: ["普拉提", "优雅仪态", "伸展瑜伽",
            "内观流", "普拉提蜜桃臀", "阴瑜伽", "肩颈理疗", "空中瑜伽", "活力燃脂", "脊柱保养", "流瑜伽",
            "经络瑜伽之中轴序列", "女性保养"
        ],
        teachers: [
            "妮子老师",
            "欧阳老师"
        ],
        peoples: [...new Array(15).keys()].map(x => x + 8),
        showToolbar: true,
        chooseStartTime: "9:00",
        chooseEndTime: "10:00",
        choosePeoples: 8,
        chooseCourse: '普拉提',
        currentDate: new Date().getTime(),
        minDate: new Date().getTime(),
        formatter(type, value) {
            if (type === 'year') {
                return `${value}年`;
            }
            if (type === 'month') {
                return `${value}月`;
            }
            return value;
        },
    },
    onChange() {},
    onChooseEndTimeClose() {
        this.setData({
            showChooseEndTime: false
        })
    },
    onChoosePeoplesClose() {
        this.setData({
            showChoosePeoples: false
        })
    },
    onChooseStartTimeClose() {
        this.setData({
            showChooseStartTime: false
        })
    },
    onChooseTeacherClose() {
        this.setData({
            showChooseTeacher: false
        })
    },
    onChoseCourse() {
        this.setData({
            showChooseCourse: true
        })
    },
    onChoseEndTime() {
        this.setData({
            showChooseEndTime: true
        })
    },
    onChosePeoples() {
        this.setData({
            showChoosePeoples: true
        })
    },
    onChoseStartTime() {
        this.setData({
            showChooseStartTime: true
        })
    },
    onChoseTeacher() {
        this.setData({
            showChooseTeacher: true
        })
    },
    onConfirmCourse(e) {
        this.setData({
            showChooseCourse: false,
            chooseCourse: e.detail.value
        })
    },
    onConfirmEndTime(e) {
        this.setData({
            showChooseEndTime: false,
            chooseEndTime: e.detail
        })
    },
    onConfirmPeoples(e) {
        this.setData({
            showChoosePeoples: false,
            choosePeoples: e.detail.value
        })
    },
    onConfirmStartTime(e) {
        console.log(e);
        this.setData({
            showChooseStartTime: false,
            chooseStartTime: e.detail
        })
    },
    onConfirmTeacher(e) {
        this.setData({
            showChooseTeacher: false,
            chooseTeacher: e.detail.value
        })
    },
    onHideCourse() {},
    onLoad(options) {
        wx.setNavigationBarTitle({
            title: "设置课程 - 管理员"
        })
    },
    onChooseCourseClose() {
        this.setData({
            showChooseCourse: false
        })
    },
    onChoseDateTime() {
        this.setData({
            showChooseDateTime: true
        })
    },
    onConfirmDateTime(e) {
        this.setData({
            showChooseDateTime: false,
            chooseDateTime: new Date(e.detail).setHours(0, 0, 0, 0)
        })
        // %(1000*60*60*24)
    },
    onChooseDateTimeClose() {
        this.setData({
            showChooseDateTime: false
        })
    },
    async submitCourse() {
        const courseName = this.data.chooseCourse;
        if (!courseName || !courseName.length) {
            wx.showToast({
                title: "请提供课程名称",
                icon: "error"
            })
            return;
        }
        const teacher = this.data.chooseTeacher;
        if (!teacher || !teacher.length) {
            wx.showToast({
                title: "请提供教师名称",
                icon: "error"
            })
            return;
        }
        const peoples = this.data.choosePeoples;
        if (!peoples || peoples < 1) {
            wx.showToast({
                title: "请提供人数",
                icon: "error"
            })
            return;
        }
        const startTime = this.data.chooseStartTime
        if (!startTime || !startTime.length) {
            wx.showToast({
                title: "请提供课程开始时间",
                icon: "error"
            })
            return;
        }
        const endTime = this.data.chooseEndTime
        if (!endTime || !endTime.length) {
            wx.showToast({
                title: "请提供课程结束时间",
                icon: "error"
            })
            return;
        }
        const dateTime = this.data.chooseDateTime
        if (!dateTime || dateTime < 1) {
            wx.showToast({
                title: "请提供课程日期",
                icon: "error"
            })
            return;
        }
        const object = {
            courseName,
            teacher,
            peoples,
            startTime,
            endTime,
            dateTime
        };
        // setCourse
        // const res = await share.callFunction({
        //     name: "setCourse",
        //     data: {
        //         data: object
        //     }
        // });
        const res = await share.request({
            url:"https://lucidu.cn/api/course",
            data:object,
            header: {
                'content-type': 'application/json' // 默认值
              },
              method:'POST'
        })
        wx.showToast({
            "icon": "success",
            title: "已成功设置课程"
        })
        // wx.switchTab({
        //     url: "/pages/appointment/index",
        // })
    },
})