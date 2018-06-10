Page({
  data: {
    imgUrls: [
      '../common/img/1.jpg',
      '../common/img/2.jpg',
      '../common/img/3.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,

    place: [{ name: 'GD', value: "广东",check:"true" }, 
            { name: 'GC', value: "广西"},
            {name: 'HN', value: "湖南"},
            {name: 'BJ', value:"北京"},
            { name: 'ETC', value:"etc"}],
    places: ["广东","广西","湖南", "北京"],

    Date:"2016-09-01",
    startDate: "2016-09-01",
    endDate: "2018-09-01",

    Time: "12:00",
    startTime: "12:00",
    endTime:"19:05",

    flag:"false",
    index:0,
    //loading提交倒数时间
    time:2
  },
  formSubmit:function(e){
    var t1 = this.data.time;
    var t2 = this.data.time*1000;
    console.log('提交！');
    console.log(e.detail.value);
    //Loading
    // setTimeChange(function(){
    //   if (!t1) {
    //     t1 = t1 - 1;
    //     if (t1 > 0) {
    //       this.setData({
    //         time: t1
    //       });
    //     }
    //   }
    // },1000);
    wx.showLoading({
      title: '提交中..',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, t2)
  },
  formReset: function (e) {
    console.log('重置！');
  },
  bindPlacePicker:function(e){
    this.setData({
      index:e.detail.value
    });
  },
  bindDatePicker: function (e) {
    this.setData({
      Date: e.detail.value
    });
  },
  bindTimePicker: function (e) {
    this.setData({
      Time: e.detail.value
    });
  }
})