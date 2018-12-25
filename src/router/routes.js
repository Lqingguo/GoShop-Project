/**
 * Created by liqingguo on 2018/12/21.
 */
import Msite from '../pages/Msite/Msite.vue'
import Order from '../pages/Order/Order.vue'
import Search from '../pages/Search/Search.vue'
import Profile from '../pages/Profile/Profile.vue'
import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopPating from '../pages/Shop/ShopPating/ShopPating.vue'
export default [
  {
    path:'/msite',
    component:Msite,
    meta: {
      showFooter: true
    }
  },
  {
    path:'/order',
    component:Order,
    meta: {
      showFooter: true
    }
  },
  {
    path:'/search',
    component:Search,
    meta: {
      showFooter: true
    }
  },
  {
    path:'/profile',
    component:Profile,
    meta: {
      showFooter: true
    }
  },
  {
    path:'/login',
    component:Login
  },
  {
    path:'/shop',
    component:Shop,
    children:[
      {
        path:'/shop/info',
        component:ShopInfo
      },
      {
        path:'/shop/pating',
        component:ShopPating
      },
      {
        path:'/shop/goods',
        component:ShopGoods
      },
      {
        path:'',
        redirect:'/shop/goods'
      }
    ]
  },
  {
    path:'/',
    redirect:'/msite'
  }
]
