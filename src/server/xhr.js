import axios from 'axios'
import qs from 'qs'
// import Spin from 'iview/src/components/spin'
// import router from '@/router'
import { Toast } from 'mint-ui'
// import Modal from 'iview/src/components/modal'

// let loadingInstance = null
// 请求时的拦截器
axios.interceptors.request.use(config => {
  // Spin.show()
  // loadingInstance = Loading.service({ fullscreen: true })
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 请求完成后的拦截器
axios.interceptors.response.use(response => {
  // Spin.hide()
  // loadingInstance.close()
  // loadingInstance = null
  return response.data
}, error => {
  // Spin.hide()
  return Promise.reject(error)
})

const RES_OK = 0
const xhr = ({ method = 'get', url, params = null }) => {
  return new Promise((resolve, reject) => {
    if (method === 'get') {
      axios.get(url, {
        params: params
      }).then(res => {
        if (res.c === RES_OK) {
          resolve(res.d)
        } else if (res.c === 40004) {
          // Modal.info({
          //   title: '消息',
          //   content: '用户未登录',
          //   okText: '我知道了',
          //   onOk() {
          //     router.push({ path: '/login' })
          //   }
          // })
          // router.push({ path: '/login' })
        } else {
          reject(res)
          Toast({
            message: res.m || res.e,
            position: 'top'
          })
        }
      }).catch(e => {
        Toast({
          message: e || '请求 API 失败,请检查网络是否正常',
          position: 'top'
        })
      })
    } else if (method === 'post') {
      axios.post(url, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        if (res.c === RES_OK) {
          resolve(res.d)
        } else if (res.c === 40004) {
          // Modal.info({
          //   title: '消息',
          //   content: '用户未登录',
          //   okText: '我知道了',
          //   onOk() {
          //     router.push({ path: '/login' })
          //   }
          // })
          // router.push({ path: '/login' })
        } else {
          reject(res)
          if (url !== '/api/family/attr/by/year') {
            Toast({
              message: res.m || res.e,
              position: 'top'
            })
          }
        }
      }).catch(e => {
        Toast({
          message: e || '请求 API 失败,请检查网络是否正常',
          position: 'top'
        })
      })
    } else {
      //
    }
  })
}

export default xhr
