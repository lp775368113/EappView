let app = getApp();
let url = app.globalData.url + '/getquyuPermission';
Page({
  data: {
    items: [],
  },
  onLoad: function () {
    let model=this;
    dd.showLoading();
    dd.httpRequest({
                    url: url,
                    method: 'POST',
                    data: {
                        userid: app.globalData.userId,
                    },
                    dataType: 'json',
                    success: (res) => {
                      console.log(res);
                        model.setData({
                            items: res.data.result
                        })
                    },
                    fail: (res) => {
                       dd.alert({content: JSON.stringify(res)});
                       console.log(res);
                    },
                    complete: (res) => {
                        dd.hideLoading();
                    }
                });
  },
  formSubmit: function(e) {
    dd.showLoading();
    console.log(e);
    let that=app.globalData;
    let quyu='';
    let bz=e.detail.value.textarea;
    for(var i=0;i<e.detail.value.__unknown_for_control_1.length;i++){
      if(quyu==''){
        quyu=e.detail.value.__unknown_for_control_1[i];
      }else{
        quyu=quyu+','+e.detail.value.__unknown_for_control_1[i];
      }
    }
     console.log('form发生了submit事件，携带数据为：', quyu,bz)
     dd.httpRequest({
                    url: app.globalData.url+'/processinstance/start',
                    method: 'POST',
                    data: JSON.stringify({
                        originatorUserId: that.userId,
                        deptId: that.deptId,
                        textForms: [
                          {name:"区域权限",value:quyu},
                          {name:"说明",value:bz}
                        ],
                    }),
                    headers:{'Content-Type': 'application/json'},
                    dataType: 'json',
                    success: (res) => {
                      console.log(res);
                        dd.confirm({
                          title: '成功',
                          content: '审批已发起！',
                          confirmButtonText: '确定',
                          cancelButtonText: '取消',
                          success: (result) => {
                                dd.redirectTo({
                                    url: '../input/input'
                                })
                          },
                        });   
                    },
                    fail: (res) => {
                        console.log("httpRequestFail---",res)
                    },
                    complete: (res) => {
                       dd.hideLoading();
                    }
                    
                });
  },
  formReset: function() {
    console.log('form发生了reset事件')
  }
  
});