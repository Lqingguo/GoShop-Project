<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:LoginWif}" @click="LoginWif=true">短信登录</a>
          <a href="javascript:;" :class="{on:!LoginWif}" @click="LoginWif=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on:LoginWif}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="!isRightphone || timercom>0" class="get_verification" :class="{right_phone_number:isRightphone}" @click.prevent="sendCod">
                {{timercom>0 ? `已发送${timercom}`: '获取验证码'}}</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!LoginWif}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input :type="isPassWord ? 'text' : 'password'" maxlength="8" placeholder="密码" v-model="pwd">
                <div class="switch_button" :class="isPassWord ? 'on':'off'" @click="isPassWord = !isPassWord">
                  <div class="switch_circle" :class="{right:isPassWord}"></div>
                  <span class="switch_text">{{isPassWord? '显示密码':''}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img ref="captcha" class="get_verification" src="http://localhost:5000/captcha" alt="captcha" @click="updateCaptcha">
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="GoLogin">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
  </section>
</template>
<script>
  import {reqSendCode,reqSmslogin,reqPwdLogin} from '../../api/index'
  import {MessageBox,Toast} from  'mint-ui'
  export default {
      data(){
        return{
          LoginWif:false, //短信登录//密码登录
          phone:'',   //手机号码
          timercom:0, //倒计时事件
          isPassWord:false,  //密码是否显示
          code:'',  //短信验证码
          pwd:'', //密码
          captcha:'' , //图片验证码
          name:''  //用户名
        }
      },
      computed:{
        isRightphone(){
          return /^1\d{10}$/.test(this.phone)
        }
      },
      methods:{
      async sendCod(){
         this.timercom = 30;
         let IntervalID = setInterval(()=>{
            this.timercom--;
            if(this.timercom <= 0){
              this.timercom = 0
              clearInterval(IntervalID)
            }
          },1000)
          //发送ajax请求发送验证码
         const result = await reqSendCode(this.phone);
         if(result.code === 0){  //短信发送成功
           Toast('短信已发送')
         }else {
           this.timercom = 0
           Toast('发送失败请重试');

         }
        },
        //更新显示验证码
        updateCaptcha(){
          //给指定img指定src携带事件戳参数
          this.$refs.captcha.src = 'http://localhost:5000/captcha?time='+ Date.now()
        },
        //登录
       async GoLogin(){

          let aresult;
              const {name,captcha,pwd,code,phone,LoginWif} = this
          if(LoginWif){
            //loginwif 为true为短信登录
            if(!this.isRightphone){ //手机号输入错误
              return MessageBox.alert('必须输入正确的手机号')
            }else if (!/^\d{6}/.test(code)){
              return MessageBox.alert('必须输入6位验证码')
            }
            aresult = await reqSmslogin({phone,code})
          }else {
            //为图片验证码登录
            if(!name.trim()){
              return MessageBox.alert('用户名不能为空')
            }else if(!pwd.length){
              return MessageBox.alert('密码不能为空')
            }else if(captcha.length !== 4){
              return MessageBox.alert('验证码要输入四位')
            }
            //发送登录请求
            aresult = await reqPwdLogin({name,pwd,captcha});
          }
          //根结果做出不同响应
          if(aresult.code === 0){

            const user = aresult.data;
            //调用方法将user存储到state中
            this.$store.dispatch('Saveuser',user)
            this.$router.replace('/profile')
          }else {
            Toast(aresult.msg)
          }

        }
      }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixins.styl'
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone_number
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(27px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
