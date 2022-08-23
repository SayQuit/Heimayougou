import { request } from "../../request/request";

// pages/search/index.js
Page({

  data: {
    searchvalue:'',
    searchList:[],
    timeId:-1,
    isfocus:false
  },

  handleCancel:function(){
    this.setData({
      searchList:[],
      isfocus:false,
      searchvalue:'',
      
    })
  },
  handleInput:function(e){
    if(!e.detail.value.trim()){
      this.setData({
        isfocus:false,
        searchList:[],
        searchvalue:''
      })
      return;
    }

    this.setData({
      isfocus:true,
      searchvalue:e.detail.value
    })

    clearTimeout(this.data.timeId)
    this.data.timeId=setTimeout(() => {
      this.search();
    }, 500);
  },

   search:function(){
    var value=this.data.searchvalue;
    // const res=await request({url:'/goods/qsearch',data:{value}})
    // console.log(res);
    var link='https://api-hmugo-web.itheima.net/api/public/v1/goods/qsearch?query='+value
    wx.request({
      url: link,
      success: (res) => {
        console.log(res.data.message);
        this.setData({
          searchList:res.data.message
        })
      },
    })


  },

  onLoad: function (options) {

  },

  onShow: function () {

  },

})