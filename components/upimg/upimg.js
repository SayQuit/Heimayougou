// components/upimg/upimg.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgUrl:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleDelete:function(){
      
      this.triggerEvent('clickDelete',this.data.imgUrl)
    }
  }
})
