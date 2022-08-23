import {
  request
} from "../../request/request";
Page({


  data: {
    OrderList: [],
    pageType: 0,
    tabs: [{
        name: '全部',
        isActive: false,
        id: 0
      },
      {
        name: '待付款',
        isActive: false,
        id: 1
      },
      {
        name: '待发货',
        isActive: false,
        id: 2
      },
      {
        name: '退款/退货',
        isActive: false,
        id: 3
      },

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
    this.setData({
      pageType: e.detail
    })
    this.getOrderList();
  },
  setisActive(index) {

    this.setData({
      pageType: index
    })
    var f = 'tabs[' + index + '].isActive'
    this.setData({
      [f]: true
    })

  },
  onLoad: function (options) {
    this.setisActive(options.type);
  },
  onShow: function () {

    this.getOrderList();
    // let page=getCurrentPages();
    // console.log(page[page.length-1].options);
    // this.setData({
    //   pageType:page[page.length-1].options
    // })
  },
  async getOrderList() {
    const token = wx.getStorageSync('token');
    if (!token) {
      wx.navigateTo({
        url: '../auth/index',
      })
    } else { 

      const List = await request({
        url: "/my/orders/all",
        method: 'get',
        data: this.data.pageType
      })
      var order_List = List.orders

      this.setData({
        OrderList: order_List
      })
      for (var i = 0; i < this.data.OrderList.length; i++) {
        var f = 'OrderList[' + i + '].update_time'
        var time=this.formatTime(this.data.OrderList[i].update_time,'Y/M/D h:m:s')
        this.setData({
          [f]: time
        })
      }
    }
  },
  formatTime:function(number, format) {
    var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
    var returnArr = [];
    var date = new Date(number * 1000);
    returnArr.push(date.getFullYear());
    returnArr.push(this.formatNumber(date.getMonth() + 1));
    returnArr.push(this.formatNumber(date.getDate()));
    returnArr.push(this.formatNumber(date.getHours()));
    returnArr.push(this.formatNumber(date.getMinutes()));
    returnArr.push(this.formatNumber(date.getSeconds()));
    for (var i in returnArr) {
      format = format.replace(formateArr[i], returnArr[i]);
    }
    return format;
  },
  formatNumber:function (n){
    n = n.toString()
    return n[1] ? n : '0' + n
  }
  //导出



})