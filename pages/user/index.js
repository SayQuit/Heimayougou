// pages/user/index.js
Page({
  data: {
    userInfo: [],
    isLogin: false,
    nav: [{
        id: 0,
        name: '收藏的店铺',
        num: 0
      },
      {
        id: 1,
        name: '收藏的商品',
        num: 0
      },
      {
        id: 2,
        name: '关注的商品',
        num: 0
      },
      {
        id: 3,
        name: '我的足迹',
        num: 0
      }
    ],
    order: [{
        id: 0,
        name: '全部订单',
        img: 'icon-ding_dan'
      },
      {
        id: 1,
        name: '待付款',
        img: 'icon-fukuantongzhi'

      },
      {
        id: 2,
        name: '待收货',
        img: 'icon-receipt-address'
      },
      {
        id: 3,
        name: '退款/退货',
        img: 'icon-tuihuotuikuan_dianpu'
      }
    ]
  },
  getCollectCount() {
    var collect = wx.getStorageSync('collection') || [];
    var f = 'nav[1].num'
    this.setData({
      [f]: collect.length
    })
  },
  getUserInfo: function () {

    if (wx.getStorageSync('userInfo')) {
      var user = wx.getStorageSync('userInfo');
      this.setData({
        userInfo: user,
        isLogin: true
      })
    }
  },
  onShow: function (options) {
    this.getUserInfo();
    this.getCollectCount();
  },

})