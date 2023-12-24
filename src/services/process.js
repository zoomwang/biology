
import api from './index'
/** 一级菜单 */
export const getMainInfo = (param) => {
  console.log("param==", param)
  return api.get(`/sys/home/main_info`, param);
}

/** 二级菜单 */
export const getSubMainInfo = (type) => {
  return api.get(`/sys/home/sub_info?type=${type}`);
}

/** 订单菜单 */
export const getOrderMenu = (type) => {
  return api.get(`/sys/order/menu/list?type=${type}`);
}

/** 回收地址列表 */
export const getRecoveryList = (type) => {
  return api.get(`/sys/order/recovery/list`);
}

/** 下订单 */
export const addOrder = (type) => {
  return api.get(`/sys/order/add`);
}

/** 预估金额 */
export const getOrderCostCalc = (params) => {
  return api.post(`/sys/order/cost/calc`, params);
}


/** 保存草稿 */
export const draftSave = (param) => {
  return api.post(`/sys/order/draft/save`, param);
}

/** 获取办事处信息 */
export const getOfficeInfo = (type) => {
  return api.get(`/sys/office/info`);
}

/** 获取办事处信息 */
export const getOrderList = (type) => {
  return api.get(`/sys/order/list?type=${type}`);
}

/** 获取草稿信息 */
export const getProjectInfo = (id) => {
  return api.get(`/sys/order/project/info?id=${id}`);
}

/** 获取订单详情 */
export const getOrderInfo = (orderId) => {
  return api.get(`/sys/order/info?orderId=${orderId}`);
}



