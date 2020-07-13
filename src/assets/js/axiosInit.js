import axios from 'axios'
// import store from '../../store/index'

const ERROR_STYLE = 'background-color:red;color:#fff;'

axios.interceptors.request.use(
  (config) => {
    const TOKEN = window.sessionStorage.getItem('token')
    if (TOKEN) {
      config.headers['R-Token'] = TOKEN
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  })

// 干预每次的返回
axios.interceptors.response.use(
  (response) => {
    const SUCCESS_CODE = 0
    // const NOT_LOGIN = 100
    // 如果请求头里的 header 有个 needReturnAll 则直接返回 response
    if (response.config.headers.needReturnAll) return response
    // 如果有数据而且状态码为成功，则返回数据
    if (response.data && response.data.code === SUCCESS_CODE) return response.data
    // __isFulFilled 字段用来区分是接口返回的错误（true），还是接口根本就没有通（非 true）
    if (process.env.NODE_ENV !== 'production') {
      console.log(`%c【开发日志】%s %s 返回成功，但 data.result !== ${SUCCESS_CODE}， res=%o`, ERROR_STYLE, response.config.method.toUpperCase(), response.config.url, response.data)
    }

    return Promise.reject(Object.assign({ __isFulFilled: true }, response.data))
  },
  (error) => {
    // 如果请求头里的 header 有个 needReturnAll 则直接返回 response
    if (error.response && error.response.config.headers.needReturnAll) return error.response
    if (process.env.NODE_ENV !== 'production') {
      console.log('%c【开发日志】接口失败，err=%o', ERROR_STYLE, JSON.parse(JSON.stringify(error)))
    }
    if (error.response && error.response.status === 401) {
      window.location.reload()
    }
    return Promise.reject(error.response && error.response.data)
  })

export default axios
