/**
 * Created by liqingguo on 2018/12/25.
 */
import Vue from 'vue'
import {
  reqGoods,
  reqInfo,
  reqPating
} from '../../api/index';

import {
  RECEIVE_GOODS,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  Add_FOOD_COUNT,
  REDUCE_FOOD_COUNT
} from '../mutation-types'

const state={
  goods:[], //点餐
  pating:[],//评价
  info:{} //  店家
}

const actions ={
  async getGoods({commit},callback){
    const result = await reqGoods();
    if(result.code === 0){

      const goods = result.data
      commit(RECEIVE_GOODS,{goods})
      typeof callback == 'function' && callback()
    }
  },
  async getInfo({commit}){
    const result = await reqInfo();
    if(result.code === 0){
      const info =result.data
      commit(RECEIVE_INFO,{info})
    }
  },
  async getPating({commit}){
    const result = await reqPating();
    if(result.code === 0){
      const pating = result.data
      commit(RECEIVE_RATINGS,{pating})
    }
  },
  addCount({commit},{food,isAdd}){
    if(isAdd){
      commit(Add_FOOD_COUNT,{food})
    }else {
      commit(REDUCE_FOOD_COUNT,{food})
    }
  }
}
const mutations = {
  [RECEIVE_GOODS](state,{goods}){
    state.goods = goods
  },
  [RECEIVE_INFO](state,{info}){
    state.info = info
  },
  [RECEIVE_RATINGS](state,{pating}){
    state.pating = pating
  },
  [Add_FOOD_COUNT](state,{food}){
      if(!food.count){
        Vue.set(food,'count',1)
      }else {
        food.count++
      }
  },
  [REDUCE_FOOD_COUNT](state,{food}){
    if(food.count>0){
      food.count--
    }
  }
}
const getters ={

}
export default {
  state,
  actions,
  mutations,
  getters
}
