import Vue from 'vue';
import App from './App.vue';
import router from "./router";
import Vuelidate from "vuelidate";
import {store} from './store/store';
import "font-awesome/css/font-awesome.min.css";
Vue.component('VueFontawesome', require('vue-fontawesome-icon/VueFontawesome.vue').default);


Vue.use(Vuelidate);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,store,
  
}).$mount('#app')
