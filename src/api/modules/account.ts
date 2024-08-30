
import { post } from '../utils.js'
export const apiLogin = data => post('api/login', data)
// 权限
export const apiGetUserRight = data => post('api/getUserRight', data)