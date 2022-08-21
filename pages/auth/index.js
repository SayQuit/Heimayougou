const {
  request
} = require('../../request/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  handlegetuserinfo: function (e) {

    let mytoken = wx.getStorageSync('token');
    // console.log(mytoken);


    const {
      encryptedData,
      rawData,
      iv,
      signature
    } = e.detail;
    // console.log(encryptedData);
    // console.log(rawData);
    // console.log(iv);
    // console.log(signature);

    wx.login({
      timeout: 10000,
      success: (result) => {
        const {
          code
        } = result;
        console.log(code);
        const loginParams = {
          encryptedData,
          rawData,
          iv,
          signature,
          code
        }
        console.log(loginParams);
        var link = 'https://api-hmugo-web.itheima.net/api/public/v1/users/wxlogin/?encryptedData=' + encryptedData + '&rawData=' + rawData + '&iv=' + iv + '&signature=' + signature + '&code=' + code
        // var link = 'https://api-hmugo-web.itheima.net/api/public/v1/users/wxlogin/?loginParams=' + loginParams
        wx.request({
          url: link,
          method: 'post',
          success: (res) => {
            console.log(res);
            wx.setStorageSync('token', "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo")
            wx.navigateBack({
              delta: 2,
            })
          }
        })

        // const res=await request({url:"/users/wxlogin",data:loginParams,method:"post"});
        // console.log(res);
      }
    })




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