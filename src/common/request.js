import axios from 'axios'
import router from '@/router'

const instance = axios.create({
  withCredentials: true,
  timeout: 30000 // 超时限制30秒
})
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    config.headers['token'] = token
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    const { data } = response
    if (data.code === 401) {
      // 登录失效
      window.location.href = '/?url=' + encodeURIComponent(location.pathname)
      // return router.push({
      //   path: `/login`,
      //   query: {
      //     url: encodeURIComponent(location.pathname)
      //   },
      //   replace: true
      // })
    }
    return data
  },
  error => {
    return Promise.reject(error)
  }
)

export default instance