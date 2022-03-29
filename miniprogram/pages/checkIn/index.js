const app = getApp()
const share = require('../../share');
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';

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
    data: {},
    onReserved() {
        Dialog.confirm({
            title: '询问',
            message: '您确定要取消预约吗？',
          }).then(() => {
            // on close
          });
    },
    async onLoad(options) {
        
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
})