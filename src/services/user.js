
import api from './index'
/** 账号登陆 */
export const login = (param) => {
  console.log("param==", param)
  return api.post(`/sys/auth/login`, param);
}

/** 手机号登陆 */
export const mobileLogin = (param) => 
api.post(`/sys/auth/mobile`, param);

/** 发送验证码 */
export const sendSysCode = (param) =>
api.post(`/sys/auth/send/code`, param);

/** 注册 */
export const regitry = (param) =>
api.post(`/sys/auth/register`, param);

/** 重置密码 */
export const resetPassword = (param) =>
api.post(`/sys/auth/resetPassword`, param);

/** 重置密码 */
export const isLogged = (param) =>
api.post(`/sys/auth/isLogged`, param);

