// pages/category/index.js
Page({

  data: {
    Cats:[],
    Active:0,
    rightAside:[]
  },



  getCats(index){
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories',
      success:(result)=>{
        // console.log(result.data.message);
        this.setData({
          Cats:result.data.message,
          rightAside:result.data.message[index].children
        })
      }
    })
  },

  handleCateChange(e){
    // console.log(e.detail);
    this.setData({
      Active:e.detail
    })
    this.getCats(e.detail)
  },
  
  onLoad: function (options) {
    this.getCats(0);
  }

 
})