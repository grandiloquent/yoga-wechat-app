const share = require('share');

async function fetchConfiguration(app) {
    return await share.request({
        url: `${app.globalData.host}/api/yoga`
    });
}

async function fetchCourses(app, dateTime, endTime) {
    return await share.request({
        url: `${app.globalData.host}/api/courses?dateTime=${dateTime}&endTime=${endTime||0}&openId=${app.globalData.openid}`
    });
}
async function fetchFullMonthCourses(app) {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return await
    fetchCourses(app, share.getDateTimestamp(), date.setHours(0, 0, 0, 0))
}

async function sendReservationData(app,object) {
    return await share.request({
        url: `${app.globalData.host}/api/reservation`,
        method: 'POST',
        data: object,
    });
}

module.exports = {
    fetchConfiguration,
    fetchCourses,
    fetchFullMonthCourses,
    sendReservationData
}