/**
 * Created by liqingguo on 2018/12/21.
 */
import Vue from 'vue';
import app from './App.vue'
import router from './router/index'
new Vue({
  el:'#app',
  render: h=> h(app),
  router
});
