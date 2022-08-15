// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs:{
      type:Array,
      value:[]
    }
  },

  data: {

  },

  methods: {
    clickTabs:function(e){
      // console.log(e.currentTarget.dataset.clickid);
      this.triggerEvent('clicktabs',e.currentTarget.dataset.clickid)
    }
  }
})
