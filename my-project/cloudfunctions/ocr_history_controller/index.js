const addHistory = require('./add_history/index')
const getHistoryList = require('./get_history_list/index')
const getHistoryDetail = require('./get_history_detail/index')

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'add_history':
      return await addHistory.main(event, context);
    case 'get_history_list':
      return await getHistoryList.main(event, context);
    case 'get_history_detail':
      return await getHistoryDetail.main(event, context);
  }
}