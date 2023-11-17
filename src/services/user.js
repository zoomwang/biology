
import api from './index'
/** 手机号登陆 */
export const sysLogin = (param) => {
  console.log("param==", param)
  return api.get(`/sys/login`, param);
}


/** 发送验证码 */
export const sysSendCode = (param) =>
api.get(`/sys/verfiCode`, param);

/** 发送验证码 */
export const sysRegitry = (param) =>
api.get(`/sys/registry`, param);