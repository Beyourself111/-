// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init();

const db = cloud.database();

exports.main = async (event, context) => {
  const ocrHistory = db.collection("ocr_history");
  let { OPENID } = cloud.getWXContext();
  try {
    var historyList = await ocrHistory.where({
      user: OPENID
    }).get();
    return {
      state: true,
      message: "get ocr history list successed",
      data: historyList
    }
  } catch (e) {
    return {
      state: false,
      message: "get ocr history list failed",
      error_message: e
    }
  }
}