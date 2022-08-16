// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailList:[],
    id:'',
    swiperList:[]
  },

  getdetailList:function(){
    var link='https://api-hmugo-web.itheima.net/api/public/v1/goods/detail?goods_id='+this.data.id;
    // console.log(link);
    wx.request({
      url: link,
      success:(result)=>{
        // console.log(result.data.message);
        this.setData({
          detailList:result.data.message,
          swiperList:result.data.message.pics
        })
      }
    })
  },
  onLoad: function (options) {
    // console.log(options.cid);
    this.setData({
      id:options.cid
    }),
    this.getdetailList()
  },

  
})