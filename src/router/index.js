/*
 * @Author: wangrongrong wangrongrong@bigo.sg
 * @Date: 2023-11-05 22:22:48
 * @LastEditors: wangrongrong wangrongrong@bigo.sg
 * @LastEditTime: 2023-11-05 22:31:05
 * @FilePath: /biology/src/router/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/login/Login.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home/login',
      name: 'home',
      component: Login
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/login/Register.vue')
    }
  ]
})

export default router
