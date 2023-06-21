const cloud = require('wx-server-sdk');
const axios = require('axios');

cloud.init();

exports.main = async (event, context) => {
  try {
    // 解析 OneNet 数据推送请求
    const { data } = event.body; // 获取推送的数据

    // 将数据存储到微信小程序的云数据库中
    const db = cloud.database();
    const result = await db.collection('onenetData').add({
      data: {
        timestamp: data.timestamp,
        value: data.value
      }
    });

    return result;
  } catch (err) {
    console.error(err);
    return err;
  }
};
