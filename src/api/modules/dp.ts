import { post } from '../utils.js'
// 仓库人员绩效
export const apiGetPerformance = data => post('api/performanceTracker/getPerformance', data)