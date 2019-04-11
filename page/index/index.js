let app = getApp();
let loginurl = app.globalData.url + '/login';
Page({
  data: {
    charts: [
      { name: 'day', value: '今日销量' },      
      // { name: 'week', value: '本周销量' },
      { name: 'month', value: '本月销量' },
      // { name: 'year', value: '本年销量' },
      // { name: 'diy', value: '自定义查询' }
    ]
  },
  gotoPage: function (e) {
    var page = e.currentTarget.dataset.page;
    app.globalData.type = page;
    dd.navigateTo({
          url: '../query/query',
          data:{type:page}
    });
  },
  onLoad: function () {
        dd.showLoading();
        dd.getAuthCode({
            success:(res)=>{
              console.log(res.authCode);
                dd.httpRequest({
                    url: loginurl,
                    method: 'POST',
                    data: {
                        authCode: res.authCode,
                    },
                    dataType: 'json',
                    success: (res) => {
                        console.log('success----',res)
                        let userId = res.data.result.userId;
                        let userName = res.data.result.userName;
                        let deptId=res.data.result.deptId;
                        app.globalData.userId=userId;
                        app.globalData.userName=userName;
                        app.globalData.deptId=deptId;
                        if(!res.data.result.quanxian){
                            dd.alert({content: '尚无查看区域数据的权限，如有需要请在权限申请里申请权限！'});
                        }else{
                          app.globalData.quyu=res.data.result.quyu;
                        }
                    },
                    fail: (res) => {
                       dd.alert({content: JSON.stringify(res)});
                    },
                    complete: (res) => {
                        dd.hideLoading();
                    }
                    
                });
            },
            fail: (err)=>{
                console.log(err);
                dd.alert({
                    content: JSON.stringify(err)
                })
            }
        })
  },
  onShareAppMessage: function (res) {
    return {
      title: '销量查询',
      desc: '合川科技',
      path: '/pages/index/index',
      imageUrl: 'https://gw.alicdn.com/tfs/TB1VxoyJ1SSBuNjy0FlXXbBpVXa-888-517.png'
    }
  }
})