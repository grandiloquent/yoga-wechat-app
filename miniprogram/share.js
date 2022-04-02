function promisify(api) {
    return (opt, ...arg) => {
        return new Promise((resolve, reject) => {
            api(Object.assign({}, opt, {
                success: resolve,
                fail: reject
            }), ...arg)
        })
    }
}

function dataset(e, key) {
    return e.currentTarget.dataset[key];
}

function getDates() {
    const dates = [];
    const weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    for (let index = 0; index < 7; index++) {
        const now = new Date();
        now.setDate(now.getDate() + index);
        dates.push({
            id: index,
            week: index === 0 ? '今日' : weeks[now.getDay()],
            day: now.getDate(),
            month: now.getMonth(),
            time: ~~(now / 1000)
        })
    }
    return dates;
}

function getTodayTimestamp(now) {
    now.setHours(0, 0, 0, 0);
    return now.getTime();
}

function boundingClientRect(selector) {
    return new Promise((resolve, reject) => {
        wx.createSelectorQuery().select(selector).boundingClientRect(function (rect) {
            resolve(rect);
        }).exec()
    })
}

function timestamp() {
    return new Date().setHours(0, 0, 0, 0);
}
module.exports = {
    request: promisify(wx.request),
    callFunction: promisify(wx.cloud.callFunction),
    getUserProfile: promisify(wx.getUserProfile),
    getStorage: promisify(wx.getStorage),
    getDates,
    getTodayTimestamp,
    boundingClientRect,
    timestamp,
    dataset
};