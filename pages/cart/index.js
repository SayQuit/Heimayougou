// pages/cart/index.js
Page({
  data: {
    goodsList: [],
    selectAll: false,
    priceCount:0,
    address:'',
    count:0,
   
  },
  onShow: function (options) {
    this.getShopCarStorage();

  },
  getShopCarStorage: function () {
    var List = wx.getStorageSync('ShoppingCar') || []
    if (List) {
      this.setData({
        goodsList: List
      })
    }
    this.ChangeSelectAll();
    this.updatePriceCount();
    this.updateCount();
  },
  updateCount:function(){
    var c=0;
    for(var i=0;i<this.data.goodsList.length; i++) {
      if(this.data.goodsList[i].isSelect == true)c++;
    }
    this.setData({
      count:c
    })
  },
  setShopCarStorage: function () {
    wx.setStorageSync('ShoppingCar', this.data.goodsList)
  },
  updatePriceCount:function(){
    
    var price=0
    for (var i = 0; i < this.data.goodsList.length; i++) {
      var addprice=this.data.goodsList[i].num*this.data.goodsList[i].goods_price;
      if (this.data.goodsList[i].isSelect == true) {
        price+=Number(addprice)
      }
    }this.setData({
          // selectAll: false
          priceCount:price
        })
  },
  removeShopItem:function(e){
    var i = e.currentTarget.dataset.index;
    this.data.goodsList.removeItem(i);
    this.ChangeSelectAll();
    this.updatePriceCount();
    this.updateCount();
    this.setShopCarStorage();
    
  },
  ChangeSelectAll: function () {

    for (var i = 0; i < this.data.goodsList.length; i++) {
      if (this.data.goodsList[i].isSelect == false) {
        this.setData({
          selectAll: false
        })
        return;
      }
    }
    if(this.data.goodsList.length!=0){
      this.setData({
        selectAll: true
      })
    }

  },
  handleCheckSelect: function (e) {
    var i = e.currentTarget.dataset.index;
    var boolValue = !this.data.goodsList[i].isSelect;
    var f = 'goodsList[' + i + '].isSelect'
    this.setData({
      [f]: boolValue
    })
    
    this.ChangeSelectAll();
    this.updatePriceCount();
    this.updateCount();
    this.setShopCarStorage();
    

  },
  handleAdd: function (e) {

    
    var v = Number(e.currentTarget.dataset.value);
    var i = e.currentTarget.dataset.index;
    var newValue = this.data.goodsList[i].num + v;
    if(newValue<=0)newValue=1;
    var f = 'goodsList[' + i + '].num'
    this.setData({
      [f]: newValue
    })
    
    this.updatePriceCount();
    this.setShopCarStorage();
  },
  handleInputValue: function (e) {
    var i = e.currentTarget.dataset.index;
    var newValue = e.detail.value;
    var f = 'goodsList[' + i + '].num'
    if(newValue<=0)newValue=1;
    this.setData({
      [f]: newValue
    })
    this.updatePriceCount();
    this.setShopCarStorage();
    
  },
  handleSelectAll: function (e) {
    var s = !this.data.selectAll;
    this.setData({
      selectAll: s
    })
    for (var i = 0; i < this.data.goodsList.length; i++) {
      var f = 'goodsList[' + i + '].isSelect'
      this.setData({
        [f]: s
      })
    }
    
    this.updatePriceCount();
    this.updateCount();
    this.setShopCarStorage();

  },
  
  handleGetAddress:function(){
    // wx.getSetting({
    //   withSubscriptions: true,
    // })
    if(this.data.address==false){
      wx.chooseAddress({
        success: (result) => {
            this.setData({
              address:result
            })
        },
        fail: (res) => {},
        complete: (res) => {},
      })
    }
  }

})