
import api from './index'
/** 供应商订单列表 */
export const supplierOrderList = (param) => {
  return api.post(`/sys/supplier/order/list`, param);
}

/** 供应商列表 */
export const supplierList = (param) => {
  return api.post(`/sys/supplier/detail/list`, param);
}

/** 供应商界面列表 */
export const supplierItemList = (param) => {
  return api.post(`/sys/supplier/item/list`, param);
}

/** 供应商项目列表 */
export const supplierItemDetailList = (param) => {
  return api.post(`/sys/supplier/item-detail/list`, param);
}

/** 供应商项目列表 */
// export const supplierItemDetailList = (param) => {
//   return api.post(`/sys/supplier/detail/list`, param);
// }

/** 更新供应商商项目 */
export const supplierItemUpdate = (param) => {
  return api.post(`/sys/supplier/item/update`, param);
}

/** 新增供应商商项目 */
export const supplierItemAdd = (param) => {
  return api.post(`/sys/supplier/item/add`, param);
}

/** 新增供应商 */
export const supplierAdd = (param) => {
  return api.post(`/sys/supplier/add`, param);
}

/** 编辑供应商 */
export const supplierUpdate = (param) => {
  return api.post(`/sys/supplier/update`, param);
}

/** 编辑供应商 */
export const getSupplierDetail = (id) => {
  return api.get(`/sys/supplier/${id}`);
}

/** 新增供应商商项目 */
export const supplierItemDetailAdd = (param) => {
  return api.post(`/sys/supplier/item-detail/add`, param);
}

/** 新增供应商商项目 */
export const supplierItemDetailEdit = (param) => {
  return api.post(`/sys/supplier/item-detail/update`, param);
}

/** 供应商个人信息列表 */
export const supplierPersonList = (param) => {
  return api.post(`/sys/supplier/list`, param);
}

/** 新增供应商总表 */
export const addSupplier = (param) => {
  return api.post(`/sys/supplier/item-detail/add`, param);
}

/** 编辑供应商个人信息表 */
export const supplierPersonUpdate = (param) => {
  return api.post(`/sys/supplier/update`, param);
}

/** 新增供应商个人信息表 */
export const supplierPersonAdd = (param) => {
  return api.post(`/sys/supplier/add`, param);
}
