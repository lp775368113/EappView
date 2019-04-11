let app = getApp();
let loginurl = app.globalData.url + '/login';
Page({
  data: {
    isfirst:false,
    xhs: [
      { name: 'X2E', value: 'X2E' },      
      { name: 'X3E', value: 'X3E' },
      { name: 'X1M/X3M', value: 'X1M,X3M' },
      { name: 'X2M/X6M', value: 'X2M,X6M' },
    ]
  },
   onLoad: function () {
        var that=this;
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
                        let userid = res.data.result.userid;
                        let name = res.data.result.name;
                        let deptId=res.data.result.deptId;
                        let flag=res.data.result.isfirst;
                        app.globalData.userId=userid;
                        app.globalData.userName=name;
                        app.globalData.deptId=deptId;
                        that.setData({
                            isfirst:flag
                        })
                        if(!res.data.result.quanxian){
                            dd.alert({content: '尚无查看区域数据的权限，如有需要请在权限申请里申请权限！'});
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
  formSubmit: function(e) {
    console.log(e);
    var xh=e.detail.value.xh;
    var xh2=e.detail.value.__unknown_for_control_1;
    console.log(xh2);
    let para='';
    if(xh2!=[]){
      for(var i=0;i<xh2.length;i++){
        if(!para){
          para=xh2[i];
        }else{
          para=para+','+xh2[i];
        }
      }
    }
    if(xh!=''){
      if(para!=''){
        para=para+','+xh;
      }else{
        para=xh;
      }
    }
     console.log('form发生了submit事件，携带数据为：',para);
     
     dd.navigateTo({
           url: '../show/show?xh='+para,
     });
    
    
  },
  help(event) {
    var that=this;
    var flag=that.data.isfirst;
    if(flag){
      flag=false;
    }else{
      flag=true;
    }
    that.setData({
               isfirst:flag
    })
  }
})