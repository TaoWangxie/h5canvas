import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory("/h5canvas/"), // hash模式:createWebHashHistory，history模式:createWebHistory
  routes: [
    {
      path: "/",
      redirect: "/editor",
    },
    {
      path: "/editor",
      name: "editor",
      component: () =>
        import(/* webpackChunkName: "editor" */ "@/views/editor/index.vue"),
        meta: {
          index: 0,
        },
    },
    {
      path: "/demo",
      name: "demo",
      component: () =>
        import(/* webpackChunkName: "demo" */ "@/views/demo/index.vue"),
        meta: {
          index: 0,
        },
    },
  ],
});

export default router;
