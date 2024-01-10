
import api from './index'

/** 下积分订单 */
export const addOrder = (params) => {
  return api.post(`/sys/user/points/order/pay`, params);
}

// 获取优惠券列表
export const getOrderList = (param) => {
  console.log("param==", param)
  return api.get(`/sys/user/points/order/list`, param);
}

// 获取优惠券列表
export const getOrderDetail = (param) => {
  console.log("param==", param)
  return api.get(`/sys/user/points/info`, param);
}



