import { get,post } from '../utils.js'
// 商品管理
export const apiGetOrderList = data => get('/api/order/getOrderList', data)
export const apiGetLastOrderList = data => get('/api/order/getLastOrderList', data)

/**商品详情*/
export const apiGetOrderGoodsDetails = data => post('/api/order/goodsDetails', data)

/**订单信息*/
export const apiGetOrderDetails = data => post('/api/order/orderDetails', data)