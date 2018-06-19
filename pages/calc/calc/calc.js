var saveExprs = function(expr){
  var exprs =wx.getStorageSync('exprs')||[]
  exprs.unshift(expr);
  wx.setStorageSync('exprs',exprs);
}
Page({
  data:{
    result:"0",
    b1:"history",
    b2: "clear",
    b3: "back",
    b4: "div",  //除法
    b5: "n_7",
    b6: "n_8",
    b7: "n_9",
    b8: "mul",  //乘法
    b9: "n_4",
    b10: "n_5",
    b11: "n_6",
    b12: "sub",  //减法
    b13: "n_1",
    b14: "n_2",
    b15: "n_3",
    b16: "add",
    b17: "neg",  //取负
    b18: "n_0",
    b19: "dot",
    b20: "equ",  //等于
    temp:"0",
    lastoper:"+",
    flag:"",
    record:true,
    expr:""      //表达式输出值
  },
  // 单击按钮处理时间
  clickBtn:function(e){
    var data = this.data.result;//获取上一个结果

    // 运算用到的变量
    var tmp = this.data.temp;//上一临时值
    var lastoper1 = this.data.lastoper;//上一运算符
    var noNumFlag = this.data.flag;//上一非数字符按钮符

    //缓存用到的变量
    var expr1 = this.data.expr;//获取前面的表达式
    if (e.target.id >= 'n_0' && e.target.id <= 'n_9'){//数字按钮
      data += e.target.id.split("_")[1];//获取运算数值
      if(this.data.result=='0'|| noNumFlag ){//结果为0时和上一次按的是非数字时，只输出当前值
        data = e.target.id.split("_")[1];
      }
      noNumFlag=false;
    }else if (e.target.id == "dot") {
      //indexOf(str)，若String中没出现过str，就会返回 - 1
      if (data.toString().indexOf(".") == -1) {//如果输入的值不包含小数点才加小数点
        data += ".";
      }
      noNumFlag = false;
    }else{//非数字
      noNumFlag = true;
      console.log(e.target.id);
      if (e.target.id == "clear") {
        data = 0;
        tmp = 0;
        lastoper1 = "+";
      }else if (e.target.id == "neg") {
        data = -1 * data;
      } else if (e.target.id == "back") {
        if(data.toString().length>1){
          // substr() 方法可在字符串中抽取从 start 下标开始的指定数目的字符。
          data = data.substr(0,data.toString().length -1);
        }else{//长度只有一位
          data=0;
        }
      } else if (e.target.id == "div") {
        /*缓存所需操作begin*/
        expr1 += data.toString() + "÷";
        /*缓存所需操作end*/
        data = calc(tmp,lastoper1,data);
        tmp = data;
        lastoper1 = "/";
      } else if (e.target.id == "mul") {
        /*缓存所需操作begin*/
        expr1 += data.toString() + "×";
        /*缓存所需操作end*/
        data = calc(tmp, lastoper1, data);
        tmp = data;
        lastoper1 = "*";
      } else if (e.target.id == "add") {
        /*缓存所需操作begin*/
        expr1 += data.toString() + "+";
        /*缓存所需操作end*/
        data = calc(tmp, lastoper1, data);
        tmp = data;
        lastoper1 = "+";
      } else if (e.target.id == "sub") {
        /*缓存所需操作begin*/
        expr1 += data.toString() + "-";
        /*缓存所需操作end*/
        data = calc(tmp, lastoper1, data);
        tmp = data;
        lastoper1 = "-";
      } else if (e.target.id == "equ") {
        /*缓存所需操作begin*/
        expr1 += data.toString();
        /*缓存所需操作end*/
        data = calc(tmp, lastoper1, data);
        tmp = 0;
        lastoper1 = "+";
        /*缓存所需操作begin*/
        expr1 += "="+data;
        if(this.data.record){
          // wx.setStorageSync("expr", expr1);
          saveExprs(expr1);
        }
        expr1 = "";
        /*缓存所需操作end*/
      } else if (e.target.id == "history"){
        wx.navigateTo({
          url: '../../history/history',
        })
      }
      
    }
    this.setData({//更新计算结果
      result:data,
      lastoper: lastoper1,
      temp:tmp,
      flag:noNumFlag,
      expr:expr1
    });
  },
  RecordHistory:function(e){
    console.log(e);
    this.setData({
      record:e.detail.value
    });
  }
})

// 运算
var calc=function(d1,oper,d2){
  var data;
  /***********************************************************
  parseFloat() 指定字符串中的首个字符是否是数字。是，则对字符串解析直到到达数字的末端。
  第一个字符不能被转换为数字，那么 parseFloat() 会返回 NaN。
  *************************************************************/
  d1 = parseFloat(d1);
  d2 = parseFloat(d2);
  switch(oper){
    case "+":
      data = d1 + d2;
      break;
    case "-":
      data = d1 - d2;
      break;
    case "*":
      data = d1 * d2;
      break;
    case "/":
      if(d2 !== 0){
        data = d1 / d2;
      }else{
        data = 0;
      }
      break;
  }
  return data;
}