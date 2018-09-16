// 初始化常量：中文天气、天气对应的nav颜色
const weatherMap = {
  'sunny': '晴天',
  'cloudy': '多云',
  'overcast': '阴天',
  'lightrain': '小雨',
  'heavyrain': '大雨',
  'snow': '雪'
}
const weatherColorMap = {
  'sunny': '#cbeefd',
  'cloudy': '#deeef6',
  'overcast': '#c6ced2',
  'lightrain': '#bdd5e1',
  'heavyrain': '#c5ccd0',
  'snow': '#aae1fc'
}
// 腾讯：通过经纬度得出对应位置的城市
const QQMapWX = require('../../libs/qqmap-wx-jssdk.js')
// 未弹窗
const UNPROMPTED = 0
// 无权限
const UNAUTHORIZED = 1
// 已同意
const AUTHORIZED = 2 
Page({
  data:{
    nowTemp: '14°',
    nowWeather: '阴天',
    bgUrl:"",
    forecast:[],
    todayTemp: "",
    todayDate: "",
    city:"广州市",
    locationAuthType: UNPROMPTED
  },
  
  onLoad(){
    // 实例化API核心类
    this.qqmapsdk = new QQMapWX({
      key: 'EAXBZ-33R3X-AA64F-7FIPQ-BY27J-5UF5B'
    });
    // 无参调用getNow则无停止刷新时间
    wx.getSetting({
      success: res => {
        let auth = res.authSetting['scope.userLocation']
        this.setData({
          locationAuthType: auth ? AUTHORIZED
            : (auth === false) ? UNAUTHORIZED : UNPROMPTED
        })

        if (auth)
          this.getCityAndWeather()
        else
          this.getNow() //使用默认城市广州
      },
      fail: () => {
        this.getNow() //使用默认城市广州
      }
    })
  },

  // callback为停止刷新函数参数
  getNow(callback) {
    // 发起网络请求url请求链接、data请求参数
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now',
      data: {
        city: this.data.city
      },
      success: res => {
        let result = res.data.result
        let now = result.now
        let forecastRes = result.forecast
        let forecast=[];
        let nowHour = new Date().getHours()
        for (let i = 0; i < 8; i += 1) {
          forecast.push({
            time: (i*3 + nowHour) % 24 +'时',
            img: '/img/icon/' + forecastRes[i].weather+'-icon.png',
            temp: forecastRes[i].temp+'°'
          })
        }
        forecast[0].time = "现在";
        this.setToday(result.today);
        this.setData({
          nowTemp: now.temp + '°',
          nowWeather: weatherMap[now.weather],
          bgUrl: '/img/' + now.weather + '-bg.png',
          forecast: forecast
        })
        // 根据weather设置对应头部颜色
        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: weatherColorMap[now.weather],
        })
      },
      // 在完成刷新（无论成功失败）都调用
      complete: () => {
        // &&当callback存在则调用下拉刷新动作的函数
        callback && callback()
      }
    })
  },

  // 下拉刷新
  onPullDownRefresh: function () {
    // 下拉刷新是调用getNow方法并返回一个停止下拉刷新动作的函数为参数
    this.getNow(() => {
      wx.stopPullDownRefresh()
    })
  },

  setToday(result) {
    let date = new Date()
    this.setData({
      todayTemp: `${result.minTemp}° - ${result.maxTemp}°`,
      todayDate: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 今天`
    })
  },
  onTapDayWeather() {
    // wx.showToast()
    wx.navigateTo({
      url: '/pages/weather/list/list?city='+this.data.city,
    })
  },
  onTapLocation() {
    this.getCityAndWeather()
  },
  getCityAndWeather() {
    wx.getLocation({
      success: res => {
        //调用接口
        this.qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: res => {
            let city = res.result.address_component.city
            this.setData({
              city: city,
              locationAuthType: AUTHORIZED
            })
            this.getNow()
          },
          fail: () => {
            console.log("city fail");
          }
        })
      },
      fail: () => {
        console.log("locat fail");
        this.setData({
          locationAuthType: UNAUTHORIZED,
        })
      }
    })
  }
})