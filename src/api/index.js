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


// [6、用户名密码登陆](#6用户名密码登陆)<br/>
export const reqPwdLogin = ({name,pwd,captcha}) => ajax(BASE+'/login_pwd',{name,pwd,captcha},'POST')
// [7、发送短信验证码](#7发送短信验证码)<br/>
export const reqSendCode = (phone) => ajax(BASE+'/sendcode',{phone})
// [8、手机号验证码登陆](#8手机号验证码登陆)<br/>
export const reqSmslogin = ({phone,code})=> ajax(BASE +'/login_sms',{phone,code},'POST');
// [9、根据会话获取用户信息](#9根据会话获取用户信息)<br/>
export const reqGetUserInfo =() =>ajax(BASE +'/userinfo')
// [10、用户登出](#10用户登出)<br/>
export const reqLoginout =() =>ajax(BASE +'//logout')

