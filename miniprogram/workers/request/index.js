worker.onMessage(function (message) {
  // Object.keys(worker)
  worker.request({
    url: 'https://lucidu.cn/api/token',
    method: 'POST',
    data: message,
    success(res) {
      worker.postMessage(res.data);
    },
    fail(error) {
      console.log(error);
    }
  });
  
  // worker.postMessage({
  //   msg: 'hello'
  // })
})