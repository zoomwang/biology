import './assets/main.scss';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import axios from 'axios';
import { isLogged } from "@/services/user";
// import localStorage from "./hooks/localStorage.js";
// Vue.use(Antd)
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

const app = createApp(App);
app.config.globalProperties.$http = axios;

app.use(router);
app.use(Antd).mount('#app');

// app.mount('#app')
