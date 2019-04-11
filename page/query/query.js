let app = getApp();
let url = app.globalData.url + "/query";
Page({
  data: {
    list: [],
  },
  onLoad: function () {
    let _this = this;
      var type=app.globalData.type;
      var name=app.globalData.userName;
      var userid=app.globalData.userId;
          dd.httpRequest({
              url: url,
              method: 'POST',
          data: {
              type: type,
              name: name,
              userid:userid
          },
          dataType: 'json',
          success: function(res) {
              var arr=[];
              for(var i=0;i<res.data.result.length;i++){
              arr.push({
                name: "   "+res.data.result[i].name+":",
                value:res.data.result[i].value
              });
              }  
              console.log(arr);
              _this.setData({
                 list: arr
               })
          },
          fail: function(res) {
               console.log(res);
          },
          complete: function(res) {
             dd.hideLoading();
             
          }
});
  },
  onShareAppMessage: function (res) {
    return {
      title: '销量查询',
      path: '/pages/index/index',
      imageUrl: 'https://gw.alicdn.com/tfs/TB1VxoyJ1SSBuNjy0FlXXbBpVXa-888-517.png'
    }
  }
})