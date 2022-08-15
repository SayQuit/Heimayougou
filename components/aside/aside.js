// components/aside/aside.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    catList:{
      type:Array,
      value:[]
    },
    isActive:{
      value:0
    },
    right:{
      type:Array,
      value:[]
    }
  },

  data: {
    // rightAside:[]
  },

  methods: {
    cateChange(e){
      // console.log(e.currentTarget.dataset.id);
      this.triggerEvent("CatesActive",e.currentTarget.dataset.id)
    }
  }
})
