// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailList:[],
    id:'',
    swiperList:[],
    isCollection:false
  },

  priview:function(e){
    // console.log(e);
    var u=this.data.swiperList[e.currentTarget.dataset.index].pics_big
    // console.log(u);
    wx.previewImage({
      urls: [u],
    })
  },
  handleCollect:function(){
    var c=!this.data.isCollection;
    this.setData({
      isCollection:c
    })
    var collection=wx.getStorageSync('collection')||[]

    if(this.data.isCollection){
      collection.push(this.data.detailList);
      wx.showToast({
        title: '收藏成功',
      })
    }
    else{
      for(var i=0;i<collection.length;i++){
        if(collection[i].goods_id==this.data.detailList.goods_id){
            collection.splice(i,1);
        }
      }
      wx.showToast({
        title: '取消成功',
      })
    }
    wx.setStorageSync('collection', collection)
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
        this.setIsCollection();
      }
    })
  },
  async setIsCollection(){
    var collection=wx.getStorageSync('collection')||[]
    for(var i=0;i<collection.length;i++){
      // console.log(collection[i].goods_id);
      // console.log(this.data.detailList.goods_id);

      if(collection[i].goods_id==this.data.detailList.goods_id){
        this.setData({
          isCollection:true
        })
      }
    }
  },
  onLoad: function (options) {
    // console.log(options.cid);
    this.setData({
      id:options.cid
    }),
    this.getdetailList();
    // this.setIsCollection();
  },
  addShoppingCar:function(){
    var shoppingcar=wx.getStorageSync('ShoppingCar')||[]
    var index=shoppingcar.findIndex(v=>v.goods_id==this.data.detailList.goods_id)

    if(index==-1){
      let shopCar = JSON.parse(JSON.stringify(this.data.detailList));
      shopCar.isSelect=false;
      shopCar.num=1;
      shoppingcar.push(shopCar);
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