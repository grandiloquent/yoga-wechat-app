// pages/appointment/index.js
const share = require("../../share");
const app = getApp()

Page({
    data: {
        selected: 0,
        caches: {},
        dayScheduleActivated: false
    },
    onShareAppMessage() {
        wx.onShareAppMessage(() => {
            return {
                title: '瑜伽课表'
            }
        })
    },
    async loadCourses(dateTime) {
        // 调用云数据库
        if (this.data.caches[dateTime]) {
            this.setData({
                courses: this.data.caches[dateTime]
            })
            return;
        }
        let courses;
        try {
            const response = await share.request({
                url: `https://lucidu.cn/api/courses?dateTime=${dateTime}&openId=${app.globalData.openid}`
            });
            courses = response.data;
        } catch (error) {
            console.log(error);
        }
        if (!courses) return;
        let now = new Date();
        const hour = now.getHours();
        now.setHours(0, 0, 0, 0);
        for (const course of courses) {
            if (now.getTime() === dateTime && parseInt(course.startTime) < hour) {
                course.disable = true;
            }
        }
        this.data.caches[dateTime] = courses;
        this.setData({
            courses
        })
    },
    async onDateTap(e) {
        // Toggle selected date
        this.setData({
            selected: parseInt(e.currentTarget.dataset.id)
        });
        // Empty loaded courses to improve user experience
        this.setData({
            courses: {}
        });
        const time = e.currentTarget.dataset.time;
        await this.loadCourses(new Date(time * 1000).setHours(0, 0, 0, 0));
    },

    clickDaySchedule() {
        this.setData({
            offset: this.dailySchedule,
            dayScheduleActivated: true
        })
    },
    clickMonthlySchedule() {
        this.setData({
            offset: this.monthlySchedule,
            dayScheduleActivated: false
        })
    },
    async calculateIndicatorPosition(){
        const dailySchedule = await share.boundingClientRect('.tab-daily-schedule .tab__text');

        const monthlySchedule = await share.boundingClientRect('.tab-monthly-schedule .tab__text');

        this.dailySchedule = dailySchedule.left + dailySchedule.width / 2;
        this.monthlySchedule = monthlySchedule.left + monthlySchedule.width / 2;
    },
    async initializeIndicator() {
        if (this.data.dayScheduleActivated) {
            this.setData({
                offset: this.dailySchedule
            })
        } else {
            this.setData({
                offset: this.monthlySchedule
            })
        }
    },
    async onLoad(options) {
        this.calculateIndicatorPosition();
        this.initializeIndicator();
        this.setData({
            dates: share.getDates()
        });
        await this.loadCourses(new Date().setHours(0, 0, 0, 0));
    },
    onReserve(e) {
        // Collect the data needed to book a course
        const openId = app.globalData.openid;
        const courseId = e.currentTarget.dataset.id;
        const dateTime = e.currentTarget.dataset.time;
        const object = {
            openId,
            courseId,
            dateTime
        };
        wx.request({
            url: 'https://lucidu.cn/api/reservation',
            method: 'POST',
            data: object,
            success: async () => {
                // Empty the cache
                this.data.caches = {};
                // Clear the UI
                this.setData({
                    courses: {}
                });
                await this.loadCourses(dateTime);
            }
        })
    },
    onReserved() {
        
    },
    onUnload() {
        this.data.caches = {};
    }
})