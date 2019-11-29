<template>
    <div class="header">
        <div class="head-up">
            <img src="~images/logo.png" alt="">
            美莱官方商城
        </div>
        <div class="head-down">
            <div class="header-input">
                <i class="iconfont search-ico">&#xe7d4;</i>
                <input type="text" placeholder="大家都在搜:隆鼻">
            </div>
            <router-link to="/call.html">
                <div class="iconfont zixun-ico">&#xe61c;</div>
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    name:"HomeHeader",
}
</script>
<style lang="stylus" scoped>
.header
    padding:3% 3% 0; text-align: center;color:$whitecolor;
    background: #812ad3;
    background: -webkit-linear-gradient(bottom,#8a26d5,#6736cf);
    background: -o-linear-gradient(top,#8a26d5,#6736cf);
    background: -moz-linear-gradient(top,#8a26d5,#6736cf);
    background: linear-gradient(to bottom,#8a26d5,#6736cf);
    .head-up
        img
            width:0.35rem
    .head-down
        margin:3% 0 0; display:flex; display:-webkit-flex; justify-content:space-around
        .header-input
            width:90%; background:rgba(255,255,255,0.3); 
            border-radius: 0.5rem; 
            display:flex;
            display:-webkit-flex;
            justify-content:center;
            align-items:center
            input
                background: none;color:#fff;width:40%;
                font-size:0.26rem; padding:1% 0; margin-left 2%
            input::placeholder
                color:#fff;
            input::-webkit-placeholder
                color:#fff;
        .zixun-ico
            font-size:0.3rem; margin:25% 0; color:#fff
</style>