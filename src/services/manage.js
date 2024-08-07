
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

/** 获取管理段订单列表 */
export const getOrderMgtList = (param) =>
  api.post(`/sys/order-mgt/list`, param);

/** 获取管理段待实验订单列表 */
export const getPendingOrderList = (param) =>
  api.post(`/sys/order-mgt/pending-experiment/list`, param);

/** 获取管理段实验中订单列表 */
export const getExperieOrderList = (param) =>
  api.post(`/sys/order-mgt/experimenting/list`, param);

/** 获取管理端已完成订单列表 */
export const getCompletedOrderList = (param) =>
  api.post(`/sys/order-mgt/completed-order/list`, param);

/** 查询小铅笔备注列表 */
export const getRemarkList = (param) =>
  api.post(`/sys/order-mgt/remark/list`, param);

/** 添加小铅笔备注列表 */
export const addRemark = (param) =>
  api.post(`/sys/order-mgt/remark/add`, param);

/** 上传实验结果 */
export const addExperimentResult = (param) =>
  api.post(`/sys/order-mgt/experimentResult/add`, param);

/** 确定查询费用 */
export const determinefee = (param) =>
  api.post(`/sys/order-mgt/determinefee/query`, param);

/** 提交确定费用 */
export const addDetermineFee = (param) =>
  api.post(`/sys/order-mgt/determineFee/add`, param);

/** 分配订单 */
export const assignOrder = (param) =>
  api.post(`/sys/order-mgt/assign-order/query`, param);

/** 删除派单信息 */
export const deleteOrder = (param) =>
  api.post(`/sys/order-mgt/assign-order/del`, param);

/** 删除寄样信息 */
export const deleteSendOrder = (param) =>
  api.post(`/sys/order-mgt/send-samples-order/del`, param);


/** 寄样 */
export const sendOrder = (param) =>
  api.post(`/sys/order-mgt/send-samples-order/add`, param);

/** 寄样给供应商 */
export const addAssignOrder = (param) =>
  api.post(`/sys/order-mgt/assign-order/add`, param);

/** 更新发票状态 */
export const updateOrderProcess = (param) =>
  api.post(`/sys/order-mgt/order-process/update`, param);

/** SQL查询日志 */
export const getSql = (param) =>
  api.post(`/sys/sql/list`, param);
