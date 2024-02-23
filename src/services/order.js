
import api from './index'

/** 下积分订单 */
export const addOrder = (params) => {
  return api.post(`/sys/user/points/order/pay`, params);
}

// 获取优惠券列表
export const getOrderList = (param) => {
  console.log("param==", param)
  return api.post(`/sys/user/points/order/list`, param || {});
}

// 获取优惠券列表
export const getOrderDetail = (param) => {
  console.log("param==", param)
  return api.get(`/sys/user/points/info`, param);
}

//余额支付
export const payAmount = (param) => {
  console.log("param==", param)
  return api.post(`/sys/order/pay/amount`, param);
}

//信用支付
export const payCredit = (param) => {
  console.log("param==", param)
  return api.post(`/sys/order/pay/credit`, param);
}

// 获取二维码
export const payQrcodeOrder = (param) => {
  console.log("param==", param)
  return api.post(`/sys/order/pay/qrcode`, param);
}

// 获取二维码
export const payQrcodeStore = (param) => {
  console.log("param==", param)
  return api.post(`/sys/store/pay/qrcode`, param);
}

// 获取订单状态
export const getOrderStatus = (orderId) => {
  return api.get(`/sys/order/status?orderId=${orderId}`);
}
// 获取预存状态
export const getStoreStatus = (storeId) => {
  return api.get(`/sys/store/status?storeId=${storeId}`);
}

// // 获取支付回掉
// export const aliPayNotify = (param) => {
//   console.log("param==", param)
//   return api.post(`/aliPay/notify`, param);
// }

// // 获取支付回掉
// export const wxPayNotify = (param) => {
//   console.log("param==", param)
//   return api.post(`/wxPay/notify`, param);
// }

// 获取支付回掉
export const unionPayNotify = (param) => {
  console.log("param==", param)
  return api.post(`/unionPay/notify`, param);
}



