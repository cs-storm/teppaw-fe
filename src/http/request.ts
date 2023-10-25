import axios from 'axios'
import qs from 'qs'

const baseURL = import.meta.env.VITE_APP_DEV_URL

const username = 'evan'
const password = 'Teppaw33'

const token = btoa(`${username}:${password}`)

// 创建axios实例
const http = axios.create({
  // 服务接口请求
  baseURL,
  //   paramsSerializer: (params) => qs.stringify({ ...params }),
  headers: {
    Authorization: `Basic ${token}`
  }
  // 超时设置
  // timeout: 15000,
  // headers:{'Content-Type':'application/json;charset=utf-8'}
})

export default http
