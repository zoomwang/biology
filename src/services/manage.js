
import api from './index'
/** 用户列表 */
export const getUserList = (param) => {
  return api.post(`/sys/user_admin/user_list`, param);
}

/** 用户预存列表 */
export const getStoreList = (param) => 
api.post(`/sys/user_admin/store_list`, param);

/** 用户积分情况列表 */
export const getOrderPointsList = (param) =>
api.post(`/sys/user_admin/points_order_list`, param);

/** 用户订单情况列表 */
export const getOrderList = (param) =>
api.post(`/sys/user_admin/order_list`, param);

/** 调整用户积分 */
export const adjustPoints = (param) =>
api.post(`/sys/user_admin/adjust_points`, param);

/** 调整用户预存金 */
export const adjustAmount = (param) =>
api.post(`/sys/user_admin/adjust_amount`, param);

/** 调整用户备注 */
export const updateUserRemark = (param) =>
api.post(`/sys/user_admin/update_user_remark`, param);

/** 调整用户信用金额度 */
export const activeCreditPay = (param) =>
api.post(`/sys/user_admin/active_credit_pay`, param);


/** 修改密码 */
export const updatePassword = (param) =>
api.post(`/sys/user/password`, param);


/** 修改用户信息 */
export const updateUser = (param) =>
api.post(`/sys/user`, param);

/** 管理段获取用户信息 */
export const getUserInfo = (param) =>
api.get(`/sys/user_admin/user_info?username=${param}`);

/** 管理段获取用户信息 */
export const getUserCredit = (param) =>
api.get(`/sys/user_admin/get_user_credit?uid=${param}`);

/** 设置用户订单状态为已还款 */
export const setOrderRepaid = (param) =>
  api.post(`/sys/user_admin/set_order_repaid`, param);
