export const request=(params)=>{
    return new Promise((resolve,reject)=>{
        wx.request({
          ...params,//ES6,对象的扩展运算符
          url:params.url,
          success:(result)=>{
              resolve(result.data.message);
          },
          fail:(err)=>{
              reject(err);
          }
         
       });
      
      })
}