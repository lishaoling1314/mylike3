<template>
    <div class="login">
        <div class="toper">
            <i class="iconfont">&#xe67c;</i>
        </div>
        <div class="login-content">
            <p>这里默认一个用户名密码admin,admin</p>
            <ul>
                <li><i class="iconfont denglu-ico">&#xe70a;</i><input type="text" v-model="loginForm.username" placeholder="请输入用户名/手机号"></li>
                <li><i class="iconfont mima-ico">&#xe61d;</i><input type="password" v-model="loginForm.password" placeholder="请输入密码"></li>
            </ul>
            <input type="submit" class="loginBtn" value="登录" @click="login"/>
            <input type="reset" class="emptyBtn" value="重置" @click="reset"/>
        </div>
    </div>
</template>
<script>
export default {
    name:"Login",
    data(){
        return{
            loginForm:{
                username:"",
                password:""
            }
        }
    },
    created:function(){
        this.$emit('footer',false);//绑定底部导航是否显示
    },
    methods:{
        login(){
            if (this.loginForm.username === '' || this.loginForm.password === '') {
                alert('账号或密码不能为空');
            }else{
                if(this.loginForm.username=='admin' && this.loginForm.password=='admin'){
                    localStorage.setItem("username", "admin");//本地存储,和main.js里面的localStorage.getItem("username")对应
                    this.$router.push({path: "me"});
                }else{
                    alert('输入正确的账号和密码');
                }
            }
        },
        reset(){
            this.loginForm.username="",
            this.loginForm.password=""
        }
    },
    mounted(){
    }
}
</script>
<style lang="stylus">
.login
    .toper
        background: #8c25d5;
        background: -webkit-gradient(linear, left top, right top, from(#8d24d6), to(#5e3acd));
        background: linear-gradient(to right, #8d24d6, #5e3acd);
        padding:10% 0
        text-align:center
        color: rgb(228, 223, 223);
        i
            font-size:2rem
    .login-content
        padding:0 5%
        p
            padding:8% 0
            color:#ff0000
        ul
            padding:0 0 5%
            li
                line-height:2
                padding-bottom:5%
                display:flex
                display:-webkit-flex
                i
                    font-size:0.4rem
                    margin-right:3%
                input
                    flex:1
                    border-bottom:1px solid #ccc
                    background:none
                    line-height:2
    .loginBtn
        line-height:0.8rem
        width:100%
        border-radius:0.5rem
        background:#5e3acd;
        color:#fff
        margin-bottom:5%
    .emptyBtn
        line-height:0.8rem
        width:100%
        border-radius:0.5rem
        background:none;
        border:1px solid #ccc
</style>