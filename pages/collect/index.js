// pages/collect/index.js
Page({


  data: {
    collectList:[],
    tabs: [{
        name: '商品收藏',
        isActive: true,
        id: 0
      },
      {
        name: '品牌收藏',
        isActive: false,
        id: 1
      },
      {
        name: '店铺收藏',
        isActive: false,
        id: 2
      },
      {
        name: '浏览足迹',
        isActive: false,
        id: 3
      },

    ],
    goodCollectTabs: [{
        name: '全部',
        isActive: true,
        id: 0
      },
      {
        name: '正在热卖',
        isActive: false,
        id: 1
      }, {
        name: '即将上线',
        isActive: false,
        id: 2
      }

    ]
  },
  handleclicktabs: function (e) {
    for (var i = 0; i < this.data.tabs.length; i++) {
      var f = 'tabs[' + i + '].isActive'
      this.setData({
        [f]: false
      })
    }
    this.setisActive(e.detail);

  },

  setisActive(index) {

    var f = 'tabs[' + index + '].isActive'
    this.setData({
      [f]: true
    })

  },

  handleChangeGoodCollectTabs: function (e) {
    for (var i = 0; i < this.data.goodCollectTabs.length; i++) {
      var f = 'goodCollectTabs[' + i + '].isActive'
      this.setData({
        [f]: false
      })
    }
    var f = 'goodCollectTabs[' + e.currentTarget.dataset.index + '].isActive'
    this.setData({
      [f]: true
    })
  },


  onShow: function () {
    var List=wx.getStorageSync('collection')||[];
    this.setData({
      collectList:List
    })
  },


})