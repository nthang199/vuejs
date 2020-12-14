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
      component: Login,
      beforeEnter: (to, from, next) => {
        let user = {userName:localStorage.username,password:localStorage.password};
        //let user = store.getters.user;
     
        console.log(user);
        if ( (user.userName!="" && user.password!="")){
    next({name:"List"})
  }else {next()}
      }
    },
  ]
});
router.beforeEach(( to,from,next) => {
  let user = { userName: localStorage.username, password: localStorage.password };
 // let user = store.getters.user;
  console.log(user);
  if (to.name !="Login" && (user.userName==="" || user.password==="")){
    next({name:"Login"})
  }else {next()}
})