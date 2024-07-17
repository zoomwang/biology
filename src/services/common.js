import api from './index'

export const uploadFile = (param, config) => {
  return api.post(`/sys/file/upload`, param, {...config, timeout: 0});
}
