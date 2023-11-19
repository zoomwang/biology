import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import axios from 'axios';
// import localStorage from "./hooks/localStorage.js";
// Vue.use(Antd)

const app = createApp(App);
app.config.globalProperties.$http = axios;

app.use(router);
app.use(Antd).mount('#app');

// app.mount('#app')
