// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        name: '体验问题',
        isActive: true,
        id: 0
      },
      {
        name: '商品、商家投诉',
        isActive: false,
        id: 1
      }

    ],
    uploadImg: [],
    question:''
  },
  handleAddImg: function () {
    wx.chooseImage({
      count: 9,
      sizeType: ['compressed', 'original'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // console.log(res.tempFiles);
        for (var i = 0; i < res.tempFiles.length; i++) {
          // console.log(res.tempFiles[i].path);
          var l = this.data.uploadImg.length;
          var f = 'uploadImg[' + l + ']'
          this.setData({
            [f]: res.tempFiles[i].path
          })
        }
      }

    })
  },
  handleDelete:function(e){
    for(var i=0;i<this.data.uploadImg.length;i++){
      if(this.data.uploadImg[i]==e.detail){
        this.data.uploadImg.splice(i,1);
        var up=this.data.uploadImg;
        this.setData({
          uploadImg:up
        })
      }
    }
  },
  handleCommit:function(){
    this.setData({
      question:'',
      uploadImg:[]
    })
  },
  handleInput:function(e){
    this.setData({
      question:e.detail.value
    })
    console.log(this.data.question);
  },
  handleclicktabs: function (e) {
    // console.log(this.data.tabs.length);
    for (var i = 0; i < this.data.tabs.length; i++) {
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})