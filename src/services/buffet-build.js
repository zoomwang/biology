
import api from './index'

export const updateConfig = (params) => {
  return api.post(`/sys/dynamic_form/update_dynamic_form_config`, params);
}
