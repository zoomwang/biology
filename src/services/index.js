// 首先先引入aixos
import axios from 'axios'
import { notification } from "ant-design-vue";
import $localStorage from "../hooks/localStorage";

console.log(import.meta.env);
// 创建一个axios 实例
const api = axios.create({
    baseURL: import.meta.env.VITE_URL, // 基准地址
    timeout: 5000 // 超时时间
})
// 请求拦截
api.interceptors.request.use((config) => {
    config.headers.Authorization = $localStorage.getItem('access_token');
    return config      
}, error => {
    Promise.reject(error)
})
// 响应拦截
/**
响应拦截也是一样，最基本的可以把返回出来的一些数据做简单处理，
比如把请求回来的提示信息解构出来，给予提示，这样就不用在每次请求完成后单独去写
这里用的是element-ui 里面的提示
**/
api.interceptors.response.use((res) => {
    const { code, msg } = res.data
    if (code == 0) {
        // notification.success({
        //     message: '成功',
        //     description: msg || res?.data?.message,
        // });
    } else {
        if (code == 400 || code == 401) return;
        notification.error({
            message: '失败',
            description: msg ,
        });
    }
    return res?.data;
}, error => {
    Promise.reject(error)
})
// 最后导出
export default api