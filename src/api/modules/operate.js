import { post } from '../utils.js'
// 运营管理
export const apiMarketSurveyGetTask = data => post('api/marketSurvey/getTask', data)
// 任务列表
export const apiMarketSurveyGetAll = data => post('api/marketSurvey/getAll', data)

// 获取业绩报表
export const apiGetPatternSaleReportByDay = data => post('api/shelfDisplay/getPatternSaleReportByDay', data)

export const apiShelfGetByBarcode = data => post('api/shelfDisplay/ShelfGetByBarcode', data)
// 库存表
export const apiGetGoodsStock = data => post('api/shelfDisplay/getGoodsStock', data)

// 查询巡店数据
export const apiGetInspectInfo = data => post('api/xundian/getInspectInfo', data)

// 巡店详情
export const apiGetInspectRecordByTaskID = data => post('api/xundian/getInspectRecordByTaskID', data)





