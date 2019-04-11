let app = getApp();
let url = app.globalData.url + "/query";
Page({
  data: {
    color1:'#1a82f7',
    color2:'#77c2d9',
    list: [],
    dayData:[],
    monthData:[],
    qg:{},
    dayqg:{},
    monthqg:{},
  },
  onLoad:function(options){ 
    var that=this;
    console.log(this); 
    //访问后台数据
    dd.showLoading();
    dd.httpRequest({
              url: url,
              method: 'POST',
          data: {
              xh: options.xh,
              userid:app.globalData.userId,
          },
          dataType: 'json',
          success: function(res) {
              var daydata=res.data.dayData;
              var monthdata=res.data.monthData;
              var dayhj={name:'全国',xiaoliang:0,shuliang:0};
              for(var i=0;i<daydata.length;i++){
                if(daydata[i].xiaoliang==null||daydata[i].xiaoliang=='****'){
                  dayhj.name=null;
                  break;
                }
                dayhj.xiaoliang+=parseInt(daydata[i].xiaoliang);
                dayhj.shuliang+=parseInt(daydata[i].shuliang);
              }

              var monthj={name:'全国',xiaoliang:0,shuliang:0};
              for(var i=0;i<monthdata.length;i++){
                if(monthdata[i].xiaoliang==null||monthdata[i].xiaoliang=='****'){
                  monthj.name=null;
                  break;
                }
                monthj.xiaoliang+=parseInt(monthdata[i].xiaoliang);
                monthj.shuliang+=parseInt(monthdata[i].shuliang);
              }
              that.setData({
                 qg:dayhj,
                 list:res.data.dayData
               })
               that.data.dayqg=dayhj;
               that.data.monthqg=monthj;
               that.data.dayData=daydata;
               that.data.monthData=monthdata;
               var message=res.data.message;
               if(!res.data.success){
                 dd.alert({
                      title: '错误提示',
                      content: message,
                      buttonText: '确认',
                      success: () => {
                          dd.alert({
                              title: '请联系管理员解决！',
                          });
                      },
                  });
               }
          },
          fail: function(res) {
              dd.alert({content: JSON.stringify(res)});
          },
          complete: function(res) {
             dd.hideLoading();
          }
    });
    
  },
 showDay: function (e){
    console.log('显示今日销量');
    this.setData({
                 color1:'#1a82f7',
                 color2:'#77c2d9',
                 list: this.data.dayData,
                 qg:this.data.dayqg
               })
  },
  showMonth: function (e){
    console.log('显示本月销量');
    this.setData({
                 color1:'#77c2d9',
                 color2:'#1a82f7',
                 list: this.data.monthData,
                 qg:this.data.monthqg
               })
  }
 
  
  
})