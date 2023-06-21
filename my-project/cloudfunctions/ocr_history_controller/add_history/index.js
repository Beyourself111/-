// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

exports.main = async (event, context) => {
  const ocr_history= db.collection("ocr_history");
  let { OPENID } = cloud.getWXContext();
  try {
    await ocr_history.add({
      data: {
        user: OPENID,
        file_id: event.file_id,
        ocr_result:event.ocr_result,
        translate_result:event.translate_result
      }
    });
    /**
     * 向云数据库添加数据代码空缺，需要补充
     * ocr_history集合的数据有四个字段，user, file_id, ocr_result, translate_result
     * 其中第一字段为用户openid，由第10行代码获取，剩下的字段由event传入
     * 请补全添加数据的代码
     */
    
    return {
      state: true,
      message: "add history successed"
    };
  } catch (err) {
    return {
      state: false,
      message: "add history failed",
      error_message: err
    }
  }
  
}

