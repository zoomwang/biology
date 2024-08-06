export default [
  {
    path: '/buffet/:orderTypeId',
    component: () => import("@/views/buffet/index.vue"),
    children: [
      {
        path: 'preview',
        component: () => import("@/views/buffet/Preview/index.vue"),
      },
      {
        path: 'reserve',
        component: () => import("@/views/buffet/Reserve/index.vue"),
      },
      {
        path: 'detail',
        component: () => import("@/views/buffet/Detail/index.vue"),
      },
    ],
  },
]