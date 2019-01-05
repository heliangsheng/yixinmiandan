import xhr from './xhr'
/**
 * 用户相关的 API
 */
class SystemService {
  /**
   * 用户登录
   * @param {any} params
   * @returns
   * @memberof SystemService
   */
  login(params) {
    return xhr({
      method: 'post',
      url: '/api/xt/login',
      params
    })
  }

  /**
   * 获取验证码
   * @returns
   * @memberof SystemService
   */
  getCode() {
    return xhr({
      method: 'get',
      url: '/api/xt/logout'
    })
  }
}
// 实例化后导出，全局单例
export default new SystemService()
