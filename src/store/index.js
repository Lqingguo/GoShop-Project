/**
 * Created by liqingguo on 2018/12/22.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import user from './modules/user'
import msite from './modules/msite'
import shop from './modules/shop'
Vue.use(Vuex)
export default new Vuex.Store({
  modules:{
    msite,
    user,
    shop
  },
  actions,
  getters
})
