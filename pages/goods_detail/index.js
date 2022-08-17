// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailList:[],
    id:'',
    swiperList:[]
  },

  priview:function(e){
    // console.log(e);
    var u=this.data.swiperList[e.currentTarget.dataset.index].pics_big
    // console.log(u);
    wx.previewImage({
      urls: [u],
    })
  },

  getdetailList:function(){
    var link='https://api-hmugo-web.itheima.net/api/public/v1/goods/detail?goods_id='+this.data.id;
    // console.log(link);
    wx.request({
      url: link,
      success:(result)=>{
        // console.log(result.data.message);
        this.setData({
          detailList:result.data.message,
          swiperList:result.data.message.pics
        })
      }
    })
  },
  onLoad: function (options) {
    // console.log(options.cid);
    this.setData({
      id:options.cid
    }),
    this.getdetailList()
  },
  addShoppingCar:function(){
    var shoppingcar=wx.getStorageSync('ShoppingCar')||[]
    var index=shoppingcar.findIndex(v=>v.goods_id==this.data.detailList.goods_id)
    // console.log(index);
    console.log(shoppingcar);
    // console.log(this.data.detailList);
    if(index==-1){
      shoppingcar.push(this.data.detailList);
      wx.setStorageSync('ShoppingCar',shoppingcar)
      wx.showToast({
        title: '加入成功',
        mask:true
      })
    }
    else{
      wx.showToast({
      title: '商品已存在',
      mask:true
    })
    }


  }

  
})