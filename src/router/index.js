import Vue from "vue";
import Router from "vue-router";
import UserDashboard from "../views/users/UserDashboard.vue"
import Login from "../views/Login"
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/user",
      name: "UserDashboard",
      component: UserDashboard
    },
    {
      path: "/",
      name: "Login",
      component: Login
    },
    // {
    //   path: "/contact",
    //   name: "Contact",
    //   component: Contact
    // }
  ]
});