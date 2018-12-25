import {
  reqGetUserInfo,
  reqLoginout
} from '../../api/index'
import {
  RECEIVE_USER,
  RESET_USER
} from '../mutation-types'
const state ={
  user:{} //用户信息
};
const getter ={

};
const actions ={
  Saveuser({commit},user){
    commit(RECEIVE_USER,{user})
  },
  async getUserInfo({commit}){
    const result =await reqGetUserInfo();
    if(result.code === 0){
      const user = result.data;
      commit(RECEIVE_USER,{user})
    }
  },
  async loginout({commit}){
    const result =await reqLoginout();
    if(result.code === 0){
      commit(RESET_USER)
    }
  },
};
const mutations ={
  [RECEIVE_USER] (state,{user}){
    state.user = user
  },
  [RESET_USER] (state){
    state.user ={}
  }
};
export default {
  state,
  getter,
  actions,
  mutations
}
