import {
  reqAddress,
  reqCategorys,
  reqShops,
} from '../../api/index'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
} from '../mutation-types'

const state ={
  latitude: 40.10038, // 纬度
  longitude: 116.36867, // 经度
  address: {}, // 地址信息对象
  categorys: [], // 食品分类数组
  shops: [], // 商家数组
};
const getter ={

};
const actions ={
  async getAddress({commit,state}){
    const {latitude,longitude} = state;
    const result =await reqAddress(longitude,latitude)
    if(result.code === 0){
      const address = result.data;
      commit(RECEIVE_ADDRESS,{address})
    }
  },
  async getCategorys({commit,state}){
    const result =await reqCategorys()
    if(result.code === 0){
      const categorys = result.data;
      commit(RECEIVE_CATEGORYS,{categorys})
    }
  },
  async getShops({commit,state}){
    const {latitude,longitude} = state;
    const result =await reqShops(longitude,latitude)
    if(result.code === 0){
      const shops = result.data;
      commit(RECEIVE_SHOPS,{shops})
    }
  },
};
const mutations ={
  [RECEIVE_ADDRESS](state,{address}){
    state.address = address
  },
  [RECEIVE_CATEGORYS](state,{categorys}){
    state.categorys = categorys
  },
  [RECEIVE_SHOPS](state,{shops}){
    state.shops = shops
  },
}
export default {
  state,
  getter,
  actions,
  mutations
}
