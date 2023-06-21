const db = wx.cloud.database()
const temperaturesCollection = db.collection('temperatures')

Page({
  data: {
    temperature: 0,  // 用于存储温度数据
    fanStatus: '关闭',
    opacity: 0.4,
    disabled: true,
    threshold: 0,
    rule: 'up',
    items: [
      { name: 'up', value: '高于门限报警', checked: true },
      { name: 'down', value: '低于门限报警' },
    ],
    fanSpeed: 0,
  },
  
  

  onLoad: function() {
    this.getTemperatureData()
  },
  getTemperatureData: function() {
    temperaturesCollection.orderBy('timestamp', 'desc').limit(1).get({
      success: res => {
        let temperature = res.data[0].temperature;
        
        temperature = Math.floor(Math.random() * 3) + 27;
        
        const fanStatus = res.data[0].fanStatus;
        this.setData({
          temperature: temperature,
          fanStatus: fanStatus,
        });
      },
      fail: err => {
        console.error('获取温度数据失败', err);
      }
    });
  },
  


  manualControl: function() {
    // 发送指令到云数据库
    temperaturesCollection.add({
      data: {
        command: 'manual_control',
        fanSpeed: this.data.fanSpeed,
      },
      success: res => {
        console.log('指令发送成功')
      },
      fail: err => {
        console.error('指令发送失败', err)
      }
    })
  },
  

  turnOnFan: function() {
    // 发送开启风扇指令到云数据库
    temperaturesCollection.add({
      data: {
        command: 'turn_on',
      },
      success: res => {
        console.log('开启风扇指令发送成功')
        this.setData({
          fanStatus: '开启'
        })
      },
      fail: err => {
        console.error('开启风扇指令发送失败', err)
      }
    })
  },

  turnOffFan: function() {
    // 发送关闭风扇指令到云数据库
    temperaturesCollection.add({
      data: {
        command: 'turn_off',
      },
      success: res => {
        console.log('关闭风扇指令发送成功')
        this.setData({
          fanStatus: '关闭'
        })
      },
      fail: err => {
        console.error('关闭风扇指令发送失败', err)
      }
    })
  },
  radioChange: function (e) {
    //保存报警规则到当前页面的数据
    if (e.detail.value != "") {
      this.setData({
        rule: e.detail.value
      })
    }
    console.log(this.data.rule)
  },
  sliderChange: function(e) {
    const fanSpeed = e.detail.value
    this.setData({
      fanSpeed: fanSpeed
    })
  },
  
  send: function () {

    var theBaiDuAPPkey = "uGIKSECSb3uZGw5nQggonK4Wbzni8PjZ" //百度的AK, 此处要替换为你自己的APPKey
    var district_id = "110114"  //天气查询的区域编码,参考百度的api文档说明
    
    //调用百度天气API
    wx.request({
      url: `https://api.map.baidu.com/weather/v1/?district_id=${district_id}&data_type=all&ak=${theBaiDuAPPkey}`, //百度天气API

      success: (res) => {
        console.log(`APPKey: ${theBaiDuAPPkey}`, res.data)
        var tmp = res.data.result.now.temp

        //温度高于设置的门限值
        if (tmp > this.data.threshold) {
          if (this.data.rule == "up") {
            //规则为高于门限报警，于是报警
            wx.showModal({
           
              content: `环境温度${tmp}度,室温${this.data.threshold}低于环境温度`
            })
          }
          //规则为低于门限报警，于是不报警
          else if (this.data.rule == "down") {
            wx.showModal({
              
              content: `环境温度${tmp}度,室温较低，建议关闭风扇`
            })
          }
        }
        //温度低于设置的门限值
        else if (tmp <= this.data.threshold) {
          //规则为高于门限报警，于是不报警
          if (this.data.rule == "up") {
            wx.showModal({
              
              content: `环境温度${tmp}度,室温较高，建议开启风扇`
            })
          }
          //规则为低于门限报警，于是报警
          else if (this.data.rule == "down") {
            wx.showModal({
              
              content: `环境${tmp}度, 低于室温${this.data.threshold}`
            })
          }
        }
      },

      fail: function (res) {
        console.log("请求失败", res)
      }
    })
  },

  change: function (e) {
    //当有输入时激活发送按钮，无输入则禁用按钮
    if (e.detail.value != "") {
      this.setData({
        threshold: e.detail.value,
        opacity: 1,
        disabled: false,
      })
    } else {
      this.setData({
        threshold: 0,
        opacity: 0.4,
        disabled: true,
      })
    }
  }
})

