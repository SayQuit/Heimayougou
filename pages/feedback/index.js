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
    question: '',
    imgUrlAfterCommit: []
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
  handleDelete: function (e) {
    for (var i = 0; i < this.data.uploadImg.length; i++) {
      if (this.data.uploadImg[i] == e.detail) {
        this.data.uploadImg.splice(i, 1);
        var up = this.data.uploadImg;
        this.setData({
          uploadImg: up
        })
      }
    }
  },
  handleCommit: function () {

    var q = this.data.question;
    var u = this.data.uploadImg;

    if (!q.trim()) {
      wx.showToast({
        title: '文本不能为空',
        icon: "none",

      })
      return;
    }

    wx.showLoading({

      title: '正在上传中',
    })

    if(this.data.uploadImg.length==0){
      console.log('只是提交了文本');
      wx.hideLoading({
        success: (res) => {},
      })
      this.setData({
        question: '',
        uploadImg: []
      })
    }
    for (var i = 0; i < this.data.uploadImg.length; i++) {
      wx.uploadFile({
        url: 'https://imgchr.com/i/MjaXxU',
        filePath: this.data.uploadImg[i],
        name: 'imgfile',
        formData: {},
        success: (res) => {
          console.log(res);
          var list = this.data.imgUrlAfterCommit;
          list.push(res.data);
          this.setData({
            imgUrlAfterCommit: list
          })
          if (this.data.imgUrlAfterCommit.length == this.data.uploadImg.length) {
            
            this.setData({
              question: '',
              uploadImg: []
            })
            console.log('传到外网,提交后台');
            wx.hideLoading({
              success: (res) => {},
            })
          }

        }
      })
    }



  },
  handleInput: function (e) {
    this.setData({
      question: e.detail.value
    })
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