<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name || '定位中...'">
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right">
        <span class="header_login_text" >登录|注册</span>
      </span>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="cateGorysArr.length>0">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(category,index) in cateGorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(s,index) in category" :key="index">
              <div class="food_container">
                <img :src="'https://fuss10.elemecdn.com'+s.image_url">
              </div>
              <span>{{s.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./msite_back.svg" alt="aa" v-else>
    </nav>
    <!--首页附近商家-->
    <ShopList/>
  </section>
</template>
<script>
  import ShopList from '../../components/ShopList/ShopList.vue'
  import {mapState} from 'vuex'
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  export default {
    computed:{
      ...mapState(['address','categorys']),
      cateGorysArr(){
        let bigArr =[];
        let smallArr = [];
        const {categorys} = this;
        categorys.forEach(s =>{
          if(smallArr.length === 0){
            bigArr.push(smallArr)
          }
          smallArr.push(s);
          if(smallArr.length === 8){
            smallArr=[]
          }
        });
        return bigArr
      }
      },
    components:{
        ShopList
    },
    mounted(){
      this.$store.dispatch('getCategorys')
    }
    ,
    watch:{
      categorys(){
        this.$nextTick(()=>{
          new Swiper('.swiper-container',{
            loop:true,
            pagination: {
              el: '.swiper-pagination',
            },
          })
        })
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">

  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%

    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774

</style>
