// pages/cart/index.js
Page({
  data: {
    goodsList:[]
  },
  onLoad: function (options) {
    var List=wx.getStorageSync('ShoppingCar')||[]
    this.setData({
      goodsList:List
    })
  },

 
})