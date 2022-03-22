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
module.exports = {
    request: promisify(wx.request),
    callFunction: promisify(wx.cloud.callFunction),
    getDates
};