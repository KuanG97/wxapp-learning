Page({
  data:{
    num1:"",
    num2:"",
    result:""
  },
  //计算按钮触发
  bindAdd:function(e){
    var r = this.data.num1*1 + this.data.num2*1;
    console.log("result:" + r);
    this.setData({
      result:r
    });
  },
  bindInput1: function (e) {
    var n = e.detail.value;
    if (!isNaN(n)) {//如果输入的是数字
    console.log("num1:"+n);
      this.setData({
        num1: n
      });
    } else {
      console.log("非数字");
    }
  },
  bindInput2: function (e) {
    var n = e.detail.value;
    if (!isNaN(n)) {//如果输入的是数字
      console.log("num2:" + n);
      this.setData({
        num2: n
      });
    }else{
      console.log("非数字");
    }
  }
})