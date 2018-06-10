Page({
  data: {
    btn1:"calc",
    btn2: "history",
    btn3: "counter",
    btn4: "weather",
    btn5: "form",
    btn6: "media",
    btn7: "加法减法计算器",
    btn8:"chart",
  },
  btnIndex:function(e){
    var tmp = e.target.id;
    if (tmp=="calc"){
      wx.navigateTo({
        url: '../calc/calc',
      })
    } else if (tmp == "history") {
      wx.navigateTo({
        url: '../history/history',
      })
    } else if (tmp == "counter") {
      wx.navigateTo({
        url: '../counter/counter',
      })
    } else if (tmp == "weather") {
      wx.navigateTo({
        url: '../weather/weather',
      })
    }else if (tmp == "form") {
      wx.navigateTo({
        url: '../form/form',
      })
    } else if (tmp == "media") {
      wx.navigateTo({
        url: '../media/media',
      })
    } else if (tmp == "加法减法计算器") {
      wx.navigateTo({
        url: '../add/add',
      })
    } else if (tmp == "chart") {
      wx.navigateTo({
        url: '../report/report',
      })
    }
  }
})
