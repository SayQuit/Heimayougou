// pages/goods_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodList:[],
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
  getgoodList:function(){
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/search',
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
    console.log(options);
    this.getgoodList();
  },


})