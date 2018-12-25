/**
 * Created by liqingguo on 2018/12/21.
 */
import Vue from 'vue';
import app from './App.vue'
import router from './router/index'
import store from './store/index'
import HeaderTop from './components/HeaderTop/HeaderTop.vue'
import Start from './components/Start/Start.vue'
import {Button} from 'mint-ui';
Vue.component('HeaderTop',HeaderTop);
Vue.component('Start',Start);
Vue.component(Button.name,Button)
new Vue({
  el:'#app',
  render: h=> h(app),
  router,
  store
});
