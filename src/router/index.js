/*
 * @Author: wangrongrong wangrongrong@bigo.sg
 * @Date: 2023-11-05 22:22:48
 * @LastEditors: wangrongrong wangrongrong@bigo.sg
 * @LastEditTime: 2023-11-05 22:31:05
 * @FilePath: /biology/src/router/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHistory } from "vue-router";
// import Login from '../views/login/Login.vue';
// import Register from '../views/login/Register.vue';
// import FindPassword from '../views/login/FindPassword.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: { name: 'userinfo' }
    },
    { path: "/process/:id", component: () => import("../views/process/Index.vue") },
    {
      path: "/process/index",
      name: "index",
      component: () => import("../views/process/Index.vue"),
    },
    {
      path: "/process/order",
      name: "order",
      component: () => import("../views/process/Order.vue"),
    },
    {
      path: "/process/detail",
      name: "detail",
      component: () => import("../views/process/Detail.vue"),
    },
    {
      path: "/home/login",
      name: "login",
      component: () => import("../views/login/Login.vue"),
    },
    {
      path: "/home/register",
      name: "register",
      component: () => import("../views/login/Register.vue"),
    },
    {
      path: "/home/order-reservation",
      name: "ordereservation",
      component: () => import("../views/login/OrderReservation.vue"),
    },
    {
      path: "/home/find-password",
      name: "findPassword",
      component: () => import("../views/login/FindPassword.vue"),
    },
    {
      path: "/home/WXScan",
      name: "WXScan",
      component: () => import("../views/login/WXScan.vue"),
    },
    {
      path: "/user/prestore",
      name: "publishPrestore",
      component: () => import("../views/prestore/Prestore.vue"),
    },
    {
      path: "/user/userinfo",
      name: "userinfo",
      component: () => import("../views/user/Index.vue"),
    },
    {
      path: "/user/publish-demand",
      name: "publishDemand",
      component: () => import("../views/user/PostDemand.vue"),
    },
  ],
});
export default router;
