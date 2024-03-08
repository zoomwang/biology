
import api from './index'
/** 预存接口 */
export const addStore = (param) => {
  console.log("param==", param)
  return api.post(`/sys/store/add`, param);
}

export const editInvoices = (param) => {
  console.log("param==", param)
  return api.post(`/sys/invoice/modify`, param);
}

export const addInvoice = (param) => {
  console.log("param==", param)
  return api.post(`/sys/invoice/add`, param);
}

export const deleteInvoice = (param) => {
  console.log("param==", param)
  return api.post(`/sys/invoice/delete`, param);
}

export const getStoreList = (param) => {
  return api.post(`/sys/store/list`, param);
}

export const cancelStoreRefund = (param) => {
  return api.post(`/sys/store/refund`, param);
}

export const publish = (param) => {
  return api.post(`/sys/demand/publish`, param);
}

export const getInvoiceList = (param) => {
  return api.post(`/sys/invoice/list`, param || {});
}

export const getStoreRebate = (amount, type) => {
  return api.get(`/sys/store/rebate?amount=${amount}&type=${type}`);
}

