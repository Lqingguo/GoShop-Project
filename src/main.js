/**
 * Created by liqingguo on 2018/12/21.
 */
import Vue from 'vue';
import app from './App.vue'
import router from './router/index'
import store from './store/index'
import HeaderTop from './components/HeaderTop/HeaderTop.vue'
import Start from './components/Start/Start.vue'
Vue.component('HeaderTop',HeaderTop);
Vue.component('Start',Start);
new Vue({
  el:'#app',
  render: h=> h(app),
  router,
  store
});
