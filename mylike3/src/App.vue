<template>
  <div id="app">
      <router-view v-on:footer="footer"/>
      <common-footer v-if="ft_show"></common-footer><!--加载共用悬浮的底部-->
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      ft_show:true,
      ftList:[]
    }
  },
  methods:{
      //是否显示底部
      footer:function (bool) {
          this.ft_show = bool;
          console.log(bool);
      },
  }
}
</script>

<style>
#app {
  max-width:720px; min-width:320px; margin:0 auto;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-bottom:16%
}
</style>
