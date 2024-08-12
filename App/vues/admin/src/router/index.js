import Vue from "vue";
import store from "@/store";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/Sys/",
    meta: {
      reqauth: false,
      isMenu: false,
    },
  },
  {
    path: "/Sys/",
    name: "系统设置",
    component: () => import("../views/LayoutView.vue"),
    meta: {
      reqauth: true,
      isMenu: true,
      icon: "el-icon-setting",
    },
    children: [
      {
        path: "",
        name: "账号管理",
        component: () => import("../views/System/AdminUser.vue"),
        meta: {
          reqauth: true,
          isMenu: true,
        },
      },
      {
        path: "changepass",
        name: "修改密码",
        component: () => import("../views/System/ChangePass.vue"),
        meta: {
          reqauth: true,
          isMenu: true,
        },
      },
      {
        path: "links",
        name: "友情链接",
        component: () => import("../views/System/LinksView.vue"),
        meta: {
          reqauth: true,
          isMenu: true,
        },
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
    meta: {
      reqauth: false,
      isMenu: false,
    },
  },
];

const router = new VueRouter({
  routes,
});
router.beforeEach((to, from, next) => {
  // console.log(to, from, next);
  if (to.meta.reqauth && store.state.admin_id == 0) {
    next("/login");
  }
  next();
});

export default router;
