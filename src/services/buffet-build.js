
import api from './index'

export const updateConfig = (params) => {
  return api.post(`/sys/dynamic_form/update_dynamic_form_config`, params);
}

export const createConfig = (params) => {
  return api.post(`/sys/dynamic_form/create_dynamic_form_config`, params);
}

export const fetchConfig = (params) => {
  return api.post(`/sys/dynamic_form/fetch_dynamic_form_config`, params);
}

export const fetchCatalog = (params) => {
  return api.post(`/sys/dynamic_form/fetch_type_and_sub_type`, params).then(res => {
    const titleHits = ['高端测试', "材料测试", "生物服务", "环境检测"]
    res.data = (res.data || []).filter(item => titleHits.includes(item.title)).map(item => {
      return {
        label: item.title,
        value: item.id,
        selectable: false,
        children: (item.subTypeList || []).map(subItem => {
          return {
            label: subItem.catename,
            value: subItem.categoryid,
          }
        })
      }
    })
    return res;
  })
}

export const fetchConfigList = (params) => {
  return api.post(`/sys/dynamic_form/fetch_dynamic_form_config_list`, params).then(res => {
    res.data.list = (res.data.list || []).map(item => {
      const {baseInfo, detailInfo, extInfo, sampleQuestions, ...rest} = item
      return {
        ...baseInfo,
        ...rest,
      }
    })
    return res
  })
}

export const deleteConfig = (params) => {
  return api.post(`/sys/dynamic_form/delete_dynamic_form_config`, params)
}

export const shelveOnConfig = (params) => {
  return api.post(`/sys/dynamic_form/set_listing_dynamic_form_config`, params)
}

export const shelveOffConfig = (params) => {
  return api.post(`/sys/dynamic_form/set_un_listing_dynamic_form_config`, params)
}