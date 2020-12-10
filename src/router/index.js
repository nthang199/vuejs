import Vue from "vue";
import Router from "vue-router";
// import { store } from "../store/store.js";
import List from "../views/users/List.vue"
import Login from "../views/Login"
Vue.use(Router);

export const router = new Router({
  routes: [
    {
      path: "/user",
      name: "List",
      component: List
    },
    {
      path: "/",
      name: "Login",
      component: Login
    },
  ]
});
// router.beforeEach((to, from, next) => {
//   console.log(store.getters.userName);
//   if (to.name !="Login")
//   {
//     next({ name: 'List' })
//   }
//   else {
//     next()
//   }
// })