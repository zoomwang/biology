
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

/** 修改密码 */
export const updatePassword = (param) =>
api.post(`/sys/user/password`, param);


/** 重置密码 */
export const isLogged = (param) =>
api.post(`/sys/auth/isLogged`, {
  refreshToken: localStorage.refresh_token
});

/** 登出 */
export const logout = (param) =>
api.post(`/sys/auth/logout`, {
  refreshToken: localStorage.refresh_token
});

/** 编辑用户信息 */
export const editUser = (param) =>
api.post(`/sys/user`, param);

/** 获取用户信息 */
export const getUser = () =>
api.get(`/sys/user/info`);

/**  */
export const getSchool = () =>
api.get(`/sys/school/info`);

/** 获取账户信用 */
export const getCredit = () =>
api.get(`/sys/user/credit`);


/** 获取账户余额 */
export const getAmount = () =>
api.get(`/sys/user/amount`);
