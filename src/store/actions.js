/**
 * Created by liqingguo on 2018/12/22.
 */
import {
  reqAddress,
  reqCategorys,
  reqShops,
  reqGetUserInfo,
  reqLoginout
} from '../api/index'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RESET_USER
} from './mutation-types'
 export default {
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

}
