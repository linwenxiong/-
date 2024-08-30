import request from '../common/request'
export const post = (url, data = {}, config = {}) => {
  return request.post(url, data, config)
}

export const get = (url, params = {}, config = {}) => {
  return request.get(url, { params, ...config })
}
