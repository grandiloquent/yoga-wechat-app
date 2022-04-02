const share = require('share');


async function userStatus(app) {
    return await share.request({
        url: `${app.globalData.host}/api/user/status?openId=${app.globalData.openid}`
    });
}
async function codeStatus(app, phoneNumber, code) {
    return await share.request({
        url: `${app.globalData.host}/api/vc/status?phoneNumber=${phoneNumber}&code=${code}`
    });
}
async function fetchConfiguration(app) {
    return await share.request({
        url: `${app.globalData.host}/api/yoga`
    });
}
async function classes(app, dateTime, endTime) {
    return await share.request({
        url: `${app.globalData.host}/api/courses?dateTime=${dateTime}&endTime=${endTime||0}&openId=${app.globalData.openid}`
    });
}
async function classesMonthly(app) {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return await
    classes(app, share.timestamp(), date.setHours(0, 0, 0, 0))
}
async function fetchPictures(app, limit, offset) {
    return await share.request({
        url: `${app.globalData.host}/api/picture/all?limit=${limit}&offset=${offset}`
    });
}
async function book(app, object) {
    return await share.request({
        url: `${app.globalData.host}/api/reservation`,
        method: 'POST',
        data: object,
    });
}
// 删除预约

async function booked(app, id) {
    return await share.request({
        url: `${app.globalData.host}/api/reservation?id=${id}`,
        method: 'DELETE'
    });
}
async function code(app, phoneNumber) {
    return await share.request({
        url: `${app.globalData.host}/api/sms?openId=${app.globalData.openid}&token=${app.globalData.token}&phoneNumber=${ phoneNumber}`
    });
}

module.exports = {
    fetchConfiguration,
    classes,
    classesMonthly,
    book,
    fetchPictures,
    booked,
    code,
    userStatus,
    codeStatus
}