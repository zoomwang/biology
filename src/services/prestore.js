
import api from './index'
/** 账号登陆 */
export const publish = (param) => {
  console.log("param==", param)
  return api.post(`/sys/demand/publish`, param);
}

