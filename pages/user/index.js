// pages/user/index.js
Page({
  data: {
    userInfo:[],
    isLogin:false,
    nav:[
      {
        id:0,
        name:'收藏的店铺',
        num:0
      },
      {
        id:1,
        name:'收藏的商品',
        num:0
      },
      {
        id:2,
        name:'关注的商品',
        num:0
      },
      {
        id:3,
        name:'我的足迹',
        num:0
      }
    ],
    order:[
      {
        id:0,
        name:'全部订单',
        img:''
      },
      {
        id:1,
        name:'待付款',
        img:''
      },
      {
        id:2,
        name:'待收货',
        img:''
      },
      {
        id:3,
        name:'退款/退货',
        img:''
      }
    ]
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