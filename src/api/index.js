/**
 * Created by liqingguo on 2018/12/22.
 */
import ajax from './ajax';
const BASE = '/api';
//获取地理位置的请求query方式
export const reqAddress = (longitude,latitude)=> ajax(BASE+`/position/${latitude},${longitude}`);
//获取食品分类列表
export const reqCategorys = ()=> ajax(BASE+'/index_category');
//获取商铺列表param方式
export const reqShops =(latitude,longitude) =>ajax(BASE+'/shops',{latitude,longitude});
