
import api from './index'
/** 账号登陆 */
export const getMainInfo = (param) => {
  console.log("param==", param)
  return api.get(`/sys/home/main_info`, param);
}

