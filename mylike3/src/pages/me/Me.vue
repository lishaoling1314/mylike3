<template>
    <div class="me">
        <div  v-for="list in myinfoList" :key="list.key">
            <div class="user-info">
                <dl>
                    <dt>
                        <em><img :src="list.txUrl" alt=""></em>
                        <b>{{list.sex}}</b>
                    </dt>
                    <dd>
                        <i>{{list.name}}<em><img src="http://frontendengineer.gzmylike.cn/ling/mylike/src/assets/images/jz1.png" alt=""></em></i>
                        <p>{{list.phone}}</p>
                        <span>关注{{list.gz}}<small>|</small>粉丝{{list.fensi}}</span>
                    </dd>
                    <div class="loginout" @click="loginout">退出登录</div>
                </dl>
            </div>
            <div class="list">
                <div class="perinfo">
                    <ul>
                        <li><span><i>¥</i>{{list.yj}}</span><p>佣金</p></li>
                        <li><span>{{list.jinfen}}</span><p>积分</p></li>
                        <li><span>{{list.jinbi}}</span><p>金币</p></li>
                        <li><span>{{list.card}}</span><p>卡券</p></li>
                    </ul>
                </div>
                <div class="dingdan">
                    <div class="ti">我的订单</div>
                    <ul>
                        <li><i><img src="http://frontendengineer.gzmylike.cn/ling/mylike/src/assets/images/dd-ico1.png" alt=""></i><p>待付款</p></li>
                        <li><i><img src="http://frontendengineer.gzmylike.cn/ling/mylike/src/assets/images/dd-ico2.png" alt=""></i><p>待付款</p></li>
                        <li><i><img src="http://frontendengineer.gzmylike.cn/ling/mylike/src/assets/images/dd-ico3.png" alt=""></i><p>待付款</p></li>
                        <li><i><img src="http://frontendengineer.gzmylike.cn/ling/mylike/src/assets/images/dd-ico4.png" alt=""></i><p>待付款</p></li>
                        <li><i><img src="http://frontendengineer.gzmylike.cn/ling/mylike/src/assets/images/dd-ico5.png" alt=""></i><p>待付款</p></li>
                    </ul>
                </div>
                <div class="dongtai">
                    <div class="ti">我的动态</div>
                    <ul>
                        <li><span>{{list.riji}}</span><p>日记</p></li>
                        <li><span>{{list.teizi}}</span><p>帖子</p></li>
                        <li><span>{{list.pinglun}}</span><p>评价</p></li>
                        <li><span>{{list.que}}</span><p>问答</p></li>
                        <li><span>{{list.shoucang}}</span><p>收藏</p></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"Me",
    data(){
        return{
            myinfoList:[],
        }
    },
    created:function () {
        this.$emit('footer',true);//绑定底部导航是否显示
    },
    methods:{
        /**接收数据star*/
        getMyInfo(){
            this.axios.get('https://lishaoling1314.github.io/mylike3/mylike3/public/data/page.json')
            /**这里的axios与main.js文件的Vue.prototype后面带的名字一致,记得前面加上this**/
            .then((res)=>{
                res=res.data;
                if(res.ret && res.data){
                    const data = res.data;	//一次请求，获得多组数据，分别赋值
                    this.myinfoList = data.myinfo;
                    console.log(this.myinfoList);
                };
                console.log('加载成功');
            })
            .catch((err)=>{
                console.log('请求失败')
            })
        },
        /**接收数据end*/
        loginout(){
            localStorage.clear();
            this.$router.push({path: "/login"});
        }
    },
    mounted(){
        this.getMyInfo();
    }
}
</script>
<style src="@/assets/css/subpage.css" scoped></style>