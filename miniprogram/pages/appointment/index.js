// pages/appointment/index.js
const share = require("../../share");
const api = require("../../api");

const app = getApp()

Page({
    data: {
        selected: 0,
        caches: {},
        dayActive: true,
        hideDialog: true,
        phoneNumber: '',
        codeText: '获取验证码',
        counting: false,
        user: false
    },
    async book(e) {
        if (!this.data.user) {
            this.setData({
                showVerify: true
            })
            return
        }
        try {
            let response = await api.book(app, {
                openId: app.globalData.openid,
                courseId: e.currentTarget.dataset.id,
                dateTime: e.currentTarget.dataset.time
            });
            if (this.data.dayActive) {
                const dateTime = e.currentTarget.dataset.time;
                this.data.caches[dateTime] = null;
                this.setData({
                    courses: {}
                });
                await this.load(dateTime);
            } else {
                this.data.caches[1] = null;
                this.setData({
                    coursesMonth: {}
                });
                await this.load(share.timestamp(), 1);
            }
        } catch (error) {
            console.error(error);
        }
    },
    booked(e) {
        this.setData({
            hideDialog: false,
            selectedId: e.currentTarget.dataset.id,
            selectedDateTime: e.currentTarget.dataset.time
        })
    },
    closeDialog() {
        this.setData({
            hideDialog: true
        })
    },
    async code(e) {
        if (!this.data.counting &&
            this.data.verifyActive === 'active') {
            this.start();
            let response = await api.code(app, this.data.phoneNumber);
            let count = 60;
            this.setData({
                codeText: `${count--}秒后重试`
            })
            const interval = setInterval(() => {
                this.setData({
                    codeText: `${count--}秒后重试`
                })
                if (count < 1) {
                    clearInterval(interval);
                    this.release();
                }
            }, 1000);
        }
    },

    async confirm(e) {
        const result = await api.booked(app, e.currentTarget.dataset.id);
        if (this.data.dayActive) {
            const dateTime = this.data.selectedDateTime;
            this.data.caches[dateTime] = null;
            this.setData({
                courses: {}
            });
            await this.load(dateTime);
        } else {
            this.data.caches[1] = null;
            this.setData({
                coursesMonth: {}
            });
            await this.load(share.timestamp(), 1);
        }
        this.setData({
            hideDialog: true
        })
    },
    indicators() {
        if (this.data.dayActive) {
            this.setData({
                offset: this.positions.daily
            })
        } else {
            this.setData({
                offset: this.positions.monthly
            })
        }
    },
    inputPhone(e) {
        if (/^\d{11}$/.test(e.detail.value)) {
            this.setData({
                verifyActive: 'active',
                phoneNumber: e.detail.value
            })
        }
    },
    inputCode(e) {
        if (/^\d{6}$/.test(e.detail.value) && /^\d{11}$/.test(this.data.phoneNumber)) {
            this.setData({
                btnActive: 'active',
                codeNumber: e.detail.value
            })
        }
    },
    async load(dateTime, endTime) {
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
        let courses = endTime ? (await api.classesMonthly(app)).data : (await api.classes(app, dateTime, endTime || 0)).data;
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

    async onLoad(options) {
        showShareMenu();
        try {
            if (app.globalData.openid) {
                const res = await api.userStatus(app);
                this.data.user = res.data;
            }
        } catch (error) {
            console.log(error);
        }
        this.positions = await position();
        this.indicators();
        this.setData({
            dates: share.getDates()
        });
        if (this.data.dayActive) {
            await this.load(share.timestamp());
        } else {
            await this.load(share.timestamp(), 1);
        }
    },
    onShareAppMessage() {
        wx.onShareAppMessage(() => {
            return {
                title: '瑜伽课表'
            }
        })
    },
    onUnload() {
        this.data.caches = {};
    },
    release() {
        this.data.counting = false;
        this.setData({
            verifyActive: 'active',
            codeText: '获取验证码',
        });
    },
    start() {
        this.data.counting = true;
        this.setData({
            verifyActive: ''
        });
    },
    async tapDate(e) {
        this.setData({
            // Switch to selected date
            selected: parseInt(e.currentTarget.dataset.id),
            // Clear loaded data
            courses: {}
        });
        // Load selected date course data
        // The date is appended to each control's dataset property
        await this.load(new Date(e.currentTarget.dataset.time * 1000).setHours(0, 0, 0, 0));
    },
    async tapDay() {
        this.setData({
            offset: this.positions.daily,
            dayActive: true
        });
        await this.load(share.timestamp());
    },
    async tapMonthly() {
        this.setData({
            offset: this.positions.monthly,
            dayActive: false
        })
        await this.load(share.timestamp(), 1);
    },
    async ver() {
        if (this.data.btnActive !== 'active') return;
        const res = await api.codeStatus(app, this.data.phoneNumber, this.data.codeNumber);
        if (!res.data) {
            wx.showToast({
                title: "验证码错误",
                icon: 'error'
            })
        } else {
            this.data.user = true;
            this.setData({
                showVerify: false
            })
        }
    },
    closeVer() {
        this.setData({
            showVerify: false
        })
    }
})

async function position() {
    const dailySchedule = await share.boundingClientRect('.tab-daily-schedule .tab__text');
    const monthlySchedule = await share.boundingClientRect('.tab-monthly-schedule .tab__text');
    return {
        daily: dailySchedule.left + dailySchedule.width / 2,
        monthly: monthlySchedule.left + monthlySchedule.width / 2
    };
}

function showShareMenu() {
    wx.showShareMenu({
        withShareTicket: true,
        menus: ['shareAppMessage', 'shareTimeline']
    })
}