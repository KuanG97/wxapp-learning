Page({
  data: {
    btnMsg:[{
      id:0,
      btn: "calc",
      img:"/img/icon/clac.png"
    }, {
      id: 1,
      btn: "history",
      img: "/img/icon/clac.png"
    }, {
      id: 2,
      btn: "counter",
      img: "/img/icon/clac.png"
    }, {
      id: 3,
      btn: "weather",
      img: "/img/icon/weather.png"
    }, {
      id: 4,
      btn: "form",
      img: "/img/icon/from.png"
    }, {
      id: 5,
      btn: "media",
      img: "/img/icon/media.png"
    }, {
      id: 6,
      btn: "加法减法计算器",
      img: "/img/icon/clac.png"
    }, {
      id: 7,
      btn: "chart",
      img: "/img/icon/report.png"
    }, {
      id: 8,
      btn: "houseLoanClac",
      img: "/img/icon/houseLoanClac.png"
    }, {
      id: 9,
      btn: "salaryClac",
      img: "/img/icon/salaryClac.png"
    }],
  },
  btnIndex:function(e){
    var tmp = e.target.id;
    console.log(tmp);
    if (tmp=="calc"){
      wx.navigateTo({
        url: '../calc/calc/calc',
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
        url: '../report/report/report',
      })
    } else if (tmp == "salaryClac") {
      wx.navigateTo({
        url: '../calc/salaryClac/salaryClac',
      })
    } else if (tmp == "houseLoanClac") {
      wx.navigateTo({
        url: '../calc/houseLoan/houseLoan',
      })
    }
  }
})
