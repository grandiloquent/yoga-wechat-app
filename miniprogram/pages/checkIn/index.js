const app = getApp()
const share = require('../../share');

async function readReservedCoursesFromServer() {
    let response;
    try {
        response = await share.request({
            url: `https://lucidu.cn/api/reservation/${app.globalData.openid}`
        });
    } catch (error) {
        console.error(error);
    }
    return response;
}

function determineIfCourseIsOverdue(todayTimestamp, course, hour) {
    return todayTimestamp > course.dateTime ||
        (todayTimestamp == course.dateTime && parseInt(course.startTime) < hour)
}
Page({
    data: {
        hideDialog: true
    },
    onReserved(e) {
        this.setData({
            hideDialog: false,
            selectedId: e.currentTarget.dataset.id
        })
    },
    async loadData() {
        let response = await readReservedCoursesFromServer();
        if (!response) {
            return;
        }
        let courses = response.data;
        
        let now = new Date();
        const hour = now.getHours();
        const todayTimestamp = share.getTodayTimestamp(now)
        for (const course of courses) {
            course.disable = determineIfCourseIsOverdue(todayTimestamp, course, hour);
        }
        this.setData({
            courses
        })
    },
    closeDialog() {
        this.setData({
            hideDialog: true
        })
    },
    makeAppointment() {
        wx.switchTab({
            url: '/pages/appointment/index',
        })
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

        await this.loadData();

        this.setData({
            hideDialog: true
        })
    },
    // async onPullDownRefresh() {
    //     await this.loadData();
    //     // "enablePullDownRefresh": true
    // },
    async onShow() {
        await this.loadData();
    }
})