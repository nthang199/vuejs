import Vue from "vue";
import Router from "vue-router";
import List from "../views/users/List.vue"
import Login from "../views/Login"
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/user",
      name: "User",
      component: List
    },
    {
      path: "/",
      name: "Login",
      component: Login
    },
  ]
});