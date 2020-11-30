import Vue from "vue";
import Router from "vue-router";
import User from "../views/users/User.vue"
import Login from "../views/Login"
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/user",
      name: "User",
      component: User
    },
    {
      path: "/",
      name: "Login",
      component: Login
    },
  ]
});