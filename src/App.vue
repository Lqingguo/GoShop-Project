<template>
  <div>
    <router-view/>
    <FooterGuide/>
  </div>
</template>
<script>
  import FooterGuide from './components/FooterGuide/FooterGuide.vue'
  export default {
    mounted(){
      this.$store.dispatch('getAddress');
    },
    components:{
      FooterGuide,
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">

</style>
