import Mock from 'mockjs';
import data from './data.json';

//定义 mock接口
//商户信息
Mock.mock('/info', {code: 0, data: data.info})
//点餐
Mock.mock('/goods',{code:0,data:data.goods});
//评价
Mock.mock('/pating',{code:0,data:data.pating});

