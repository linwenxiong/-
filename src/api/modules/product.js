import { post } from '../utils.js'
// 商品管理
export const apiGetPfbMenu = data => post('api/getPfbMenuBy', data)

export const apiGetPfbByPfxm = data => post('api/getPfbByPfxm', data)

export const apiGetPfbDetails = data => post('api/getPfbDetailsBy', data)

export const apiGetItem = data => post('api/getItem', data)

export const apiGetAccept = data => post('api/fvQualityControl/getAccept', data)
// 获取门店
export const apiGetDepOptions = data => post('api/getOrgan', data)

export const apiGetSaleInfoByDay = data => post('api/shelfDisplay/getSaleInfoByDay', data)

// 新增坐标定位
export const apiAddProductLocation = data => post('api/shelfDisplay/addProductLocation', data)

// 货架模版模糊查询
export const apiFindPatternCD = data => post('api/shelfDisplay/findPatternCD', data)

// 最新版本的销售总数据
// export const apiGetSaleInfoByNewVersion = data => post('api/shelfDisplay/getSaleInfoByNewVersion', data)


// 所有版本的销售总数据
export const apiGetSaleInfoByAllVersion = data => post('api/shelfDisplay/getSaleInfoByAllVersion', data)

// 货架内商品sku比例
export const apiGetSkuSale = data => post('api/shelfDisplay/getSkuSale', data)

// 货架内商品按小类获取销售信息
export const apiGetSaleInfoByCls = data => post('api/shelfDisplay/getSaleInfoByCls', data)

// 根据门店编码查询在门店内的坐标点
export const apiGetLocationByOrgan = data => post('api/shelfDisplay/getLocationByOrgan', data)


