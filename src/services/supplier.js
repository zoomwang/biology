
import api from './index'
/** 供应商订单列表 */
export const supplierOrderList = (param) => {
  return api.post(`/sys/supplier/order/list`, param);
}

/** 供应商列表 */
export const supplierList = (param) => {
  return api.post(`/sys/supplier/list`, param);
}

/** 供应商界面列表 */
export const supplierItemList = (param) => {
  return api.post(`/sys/supplier/item/list`, param);
}

/** 供应商项目列表 */
export const supplierItemDetailList = (param) => {
  return api.post(`/sys/supplier/item-detail/list`, param);
}

/** 更新供应商商项目 */
export const supplierItemUpdate = (param) => {
  return api.post(`/sys/supplier/item/update`, param);
}

/** 更新供应商商项目 */
export const supplierItemAdd = (param) => {
  return api.post(`/sys/supplier/item/add`, param);
}

