// import {request} from '../../request/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodList:[],
    param:{
      query:'',
      cid:'',
      pagenum:'',
      pagesize:''
    },
    tabs:[
      {
        name:'综合',
        isActive:true,
        id:0
      },
      {
        name:'销量',
        isActive:false,
        id:1
      },
      {
        name:'价格',
        isActive:false,
        id:2
      }
    ]
  },
  async getgoodList(){
    var link='https://api-hmugo-web.itheima.net/api/public/v1/goods/search?cid='+this.data.param.cid;
    wx.request({
      url: link,
      success:(result)=>{
        // console.log(result.data.message);
        this.setData({
          goodList:result.data.message
        })
      }
    })
  },
  handleclicktabs:function(e){
    // console.log(this.data.tabs.length);
    for(var i=0;i<this.data.tabs.length;i++)
    {
      var f = 'tabs[' + i + '].isActive'
      this.setData({
        [f]: false
      })
    }
    var f = 'tabs[' + e.detail + '].isActive'
      this.setData({
        [f]: true
      })
    // console.log(this.data.tabs);
  },
  onLoad: function (options) {
    // console.log(options);
    var p = 'param.cid'
      this.setData({
        [p]: options.cid
      })
    this.getgoodList();
  },
  onPullDownRefresh:function(){
    this.getgoodList();
    setTimeout(() => {
      wx.stopPullDownRefresh({
        success: (res) => {},
      })
    }, 500);
  },
  onReachBottom:function(){

  }


})