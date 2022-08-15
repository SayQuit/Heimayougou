Page({
  data:{
    swiperList:[],
    navList:[],
    floorList:[]
  },

  getnavList:function(){
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems',
      success:(result)=>{
        // console.log(result.data.message);
        this.setData({
          navList:result.data.message
        })
      }
    })
  },
  getswiperList:function(){
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      success:(result)=>{
        // console.log(result.data.message);
        this.setData({
          swiperList:result.data.message
        })
      }
    })
  },

  getfloorList:function(){
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata',
      success:(result)=>{
        // console.log(result.data.message);
        this.setData({
          floorList:result.data.message
        })
      }
    })
  },
  onLoad: function (options) {
    this.getswiperList();
    this.getnavList();
    this.getfloorList();
    // console.log(this.floorList);
    // console.log(this.swiperList);
  },
  

  

})