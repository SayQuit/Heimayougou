// pages/user/index.js
Page({
  data: {
    userInfo:[],
    isLogin:false
  },
  getUserInfo:function(){

    if(wx.getStorageSync('userInfo')){
      var user=wx.getStorageSync('userInfo');
      this.setData({
        userInfo:user,
        isLogin:true
      })
    }
  },
  onShow: function (options) {
    this.getUserInfo();
  },

})