// pages/login/index.js
Page({

  data: {

  },
  handlegetuserinfo:function(e){
    var userInfo=e.detail;
    wx.setStorageSync('userInfo', userInfo);
    wx.switchTab({
      url: '../user/index',
    })
  },

  onShow: function () {

  },

 
})