// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init();

const db = cloud.database();

exports.main = async (event, context) => {
  const ocrHistory = db.collection("ocr_history");

  try {
    var historyDetail =await ocrHistory.doc(event._id).get();
    return {
      state: true,
      message: "get ocr history detail successed",
      data: historyDetail
    }
  } catch (e) {
    return {
      state: false,
      message: "get ocr history detail failed",
      error_message: e
    }
  }
}