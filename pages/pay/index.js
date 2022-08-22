import { request } from "../../request/request";

// pages/pay/index.js
Page({


  data: {
    address:'',
    goodsList:[],
    price:0,
    count:0
  },


  onLoad:function (options) {
    this.getShopCarStorage()
    var add=wx.getStorageSync('address');
    this.setData({
      address:add
    })
  },
  getShopCarStorage: function () {
    var List = wx.getStorageSync('ShoppingCar') || []
    var p=0;
    var c=0;
    for(var i=0;i<List.length;i++){
      if(List[i].isSelect==false){
        List.splice(i, 1);
        i--;
      }
      else{
        c++;
        p+=(List[i].goods_price*List[i].num);
      }
    }
    if (List) {
      this.setData({
        goodsList: List,
        price:p,
        count:c
      })
    }
    
  },
  removeItem:function(){
    var car=wx.getStorageSync('ShoppingCar');
    for(var i=0;i<car.length;i++){
      if(car[i].isSelect==true){
        car.splice(i,1);
        i--;
      }
    }
    wx.setStorageSync('ShoppingCar', car)
  },
  async handlePay(){
    const token=wx.getStorageSync('token');
    if(!token){
      wx.navigateTo({
        url: '../auth/index',
      })
    }
    else
    {
      const header={Authorization:token};
      const order_price=this.data.price;

      const consignee_addr=this.data.address.provinceName+this.data.address.cityName+this.data.address.countyName+this.data.address.detailInfo;
      let goods=[];
      for(var i=0;i<this.data.goodsList.length;i++){
        var item=new Object;
        item.goods_id=this.data.goodsList[i].goods_id;
        item.goods_number=this.data.goodsList[i].num;
        item.goods_price=this.data.goodsList[i].goods_price;
        goods.push(item);
      }

      const orderParams={order_price,consignee_addr,goods}
      const {order_number}=await request({url:"/my/orders/create",method:'post',data:orderParams,header:header});
      // console.log({order_number});
      const pay=await request({url:"/my/orders/req_unifiedorder",method:'post',header:header,data:{order_number}})
      // console.log(pay);

      wx.requestPayment({
        nonceStr: pay.nonceStr,
        package: pay.package,
        paySign: pay.paySign,
        timeStamp: pay.timeStamp,
        success:(res)=>{
          // 没有appid没办法弹出，到这里结束
          console.log(res);
        }
        
      })
      this.removeItem();
      wx.switchTab({
        url: '../cart/index',
      })

      // wx.request({
      //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/my/orders/create?order_price='+order_price+
      //   '&consignee_addr='+consignee_addr+'&goods='+goods,
      //   method:'POST',
      //   header:header,
      //   success:(res)=>{
      //     console.log(res);
      //   }

      // })
      

    }
  },

  
})