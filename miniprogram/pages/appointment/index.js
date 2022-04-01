// pages/appointment/index.js
const share = require("../../share");
const api = require("../../api");

const app = getApp()

Page({
    data: {
        selected: 0,
        caches: {},
        dayScheduleActivated: true,
        hideDialog: true
    },
    closeDialog() {
        this.setData({
            hideDialog: true
        })
    },
    deleteCourse(e) {
        this.setData({
            hideDialog: false,
            selectedId: e.currentTarget.dataset.id,
            selectedDateTime:e.currentTarget.dataset.time
        })
    },
    initializeIndicators() {
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
    onUnload() {
        this.data.caches = {};
    },



    collectReservationData(e) {
        const openId = app.globalData.openid;
        const courseId = e.currentTarget.dataset.id;
        const dateTime = e.currentTarget.dataset.time;
        return {
            openId,
            courseId,
            dateTime
        };
    },
    async bookCourse(e) {
        try {
            console.log(e);
            let response = await api.sendReservationData(app, this.collectReservationData(e));
            if (this.data.dayScheduleActivated) {
                const dateTime = e.currentTarget.dataset.time;
                this.data.caches[dateTime] = null;
                this.setData({
                    courses: {}
                });
                await this.loadCourses(dateTime);
            } else {
                const date = new Date();
                date.setDate(date.getDate() + 30);
                const endTime = date.setHours(0, 0, 0, 0)
                this.data.caches[endTime] = null;
                this.setData({
                    coursesMonth: {}
                });
                await this.loadCourses(share.getDateTimestamp(), endTime);
            }
        } catch (error) {
            console.error(error);
        }
    },
    async calculateIndicators() {
        const dailySchedule = await share.boundingClientRect('.tab-daily-schedule .tab__text');
        const monthlySchedule = await share.boundingClientRect('.tab-monthly-schedule .tab__text');
        this.dailySchedule = dailySchedule.left + dailySchedule.width / 2;
        this.monthlySchedule = monthlySchedule.left + monthlySchedule.width / 2;
    },
    async clickDaySchedule() {
        this.setData({
            offset: this.dailySchedule,
            dayScheduleActivated: true
        });
        await this.loadCourses(share.getDateTimestamp());
    },
    async clickMonthlySchedule() {
        this.setData({
            offset: this.monthlySchedule,
            dayScheduleActivated: false
        })

        await this.loadCourses(share.getDateTimestamp(), 1);
    },
    async confirmDialog(e) {
        const id = e.currentTarget.dataset.id;
        let response;
        try {
            response = await share.request({
                url: `https://lucidu.cn/api/reservation?id=${id}`,
                method: 'DELETE'
            });
            
        } catch (error) {
            console.error(error);
        }
        if (!response) {
            return;
        }
        if (this.data.dayScheduleActivated) {
            const dateTime = this.data.selectedDateTime;
            this.data.caches[dateTime] = null;
            this.setData({
                courses: {}
            });
            await this.loadCourses(dateTime);
        } else {
            const date = new Date();
            date.setDate(date.getDate() + 30);
            const endTime = date.setHours(0, 0, 0, 0);
            this.data.caches[endTime] = null;
            this.setData({
                coursesMonth: {}
            });
            await this.loadCourses(share.getDateTimestamp(), endTime);
        }
        this.setData({
            hideDialog: true
        })
    },
    async loadCourses(dateTime, endTime) {
        // 调用云数据库
        if (!endTime && this.data.caches[dateTime]) {
            this.setData({
                courses: this.data.caches[dateTime]
            })
            return;
        } else if (this.data.caches[endTime]) {
            this.setData({
                coursesMonth: this.data.caches[endTime]
            })
            return;
        }
        let courses = endTime ? (await api.fetchFullMonthCourses(app)).data : (await api.fetchCourses(app, dateTime, endTime || 0)).data;

        if (!courses) return;
        let now = new Date();
        const hour = now.getHours();
        now.setHours(0, 0, 0, 0);
        for (const course of courses) {
            if (now.getTime() >= course.dateTime && parseInt(course.startTime) < hour) {
                course.disable = true;
            }
        };
        if (!endTime) {
            this.data.caches[dateTime] = courses;
            this.setData({
                courses
            })
        } else {
            this.data.caches[endTime] = courses;
            this.setData({
                coursesMonth: courses
            })
        }
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
    async onLoad(options) {
        await this.calculateIndicators();
        this.initializeIndicators();
        this.setData({
            dates: share.getDates()
        });
        if (this.data.dayScheduleActivated) {
            await this.loadCourses(share.getDateTimestamp());
        } else {
            await this.loadCourses(share.getDateTimestamp(), 1);
        }
    },
    onShareAppMessage() {
        wx.onShareAppMessage(() => {
            return {
                title: '瑜伽课表'
            }
        })
    }
})