// pages/cart/index.js
Page({
  data: {
    goodsList: [],
    selectAll: false,
    priceCount: 0,
    address: '',
    count: 0,
    anySelect:false

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
  updateCount: function () {
    var c = 0;
    for (var i = 0; i < this.data.goodsList.length; i++) {
      if (this.data.goodsList[i].isSelect == true) c++;
    }
    this.setData({
      count: c
    })
  },
  setShopCarStorage: function () {
    wx.setStorageSync('ShoppingCar', this.data.goodsList)
  },
  updatePriceCount: function () {

    var price = 0
    for (var i = 0; i < this.data.goodsList.length; i++) {
      var addprice = this.data.goodsList[i].num * this.data.goodsList[i].goods_price;
      if (this.data.goodsList[i].isSelect == true) {
        price += Number(addprice)
      }
    }
    this.setData({
      // selectAll: false
      priceCount: price
    })
  },
  
  handleRemoveItem: function (index) {
    var i = index;
    this.data.goodsList.splice(i, 1);
    
    this.ChangeSelectAll();
    this.updatePriceCount();
    this.updateCount();
    this.setShopCarStorage();
    this.getShopCarStorage();

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
    if (this.data.goodsList.length != 0) {
      this.setData({
        selectAll: true
      })
    }
    else if (this.data.goodsList.length == 0) {
      this.setData({
        selectAll: false
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
    var newValue = Number(this.data.goodsList[i].num) + Number(v);
    if (newValue <= 0) {
      wx.showModal({
        title:'提示',
        content:'您是否要删除',
        success:(res)=>{
          if(res.confirm){
            this.handleRemoveItem(i);
          }
        }
      })
      return;
    } 
    else {
      var f = 'goodsList[' + i + '].num'
      this.setData({
        [f]: newValue
      })
      this.updatePriceCount();
      this.setShopCarStorage();
    }


  },
  handleInputValue: function (e) {
    var i = e.currentTarget.dataset.index;
    var newValue = e.detail.value;
    var f = 'goodsList[' + i + '].num'
    if (newValue <= 0) newValue = 1;
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

  handleGetAddress: function () {

    if (this.data.address == false) {
      wx.chooseAddress({
        success: (result) => {
          this.setData({
            address: result
          })
        },
        fail: (res) => {},
        complete: (res) => {},
      })
    }
  },
  isAnySelect:function(){
    for(var i=0;i<this.data.goodsList.length;i++){
      if(this.data.goodsList[i].isSelect==true){
        console.log(i);
        this.setData({
          anySelect:true
        })
        return;
      }
    }
    this.setData({
      anySelect:false
    })
  },
  handlePay:function(){
    this.isAnySelect();
    if(!this.data.address){
      wx.showToast({
        title: '未添加收货地址',
        icon:'none'
      })
      return;
    }
    if(this.data.anySelect==false){
      wx.showToast({
        title: '未添加商品',
        icon:'none'
      })
      return;
    }
    else{
      wx.setStorageSync('address', this.data.address)
      wx.navigateTo({
        url: '../pay/index',
      })
    }
  }

})