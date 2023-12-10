
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

