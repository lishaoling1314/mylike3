<template>
    <div class="footer" id="footer">
        <div class="footer-bar">
            <ul>
                <router-link tag="li" :to="list.path" 
                v-for="(list,index) in ftList"
                :key="index"
                :class="{'active':($route.matched[0].path || $route.matched[1].path) === list.path}"
                >
                <i><img :src="list.imgUrl"><img :src="list.imgUrlActive"></i><p>{{list.desc}}</p>
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "Footer",
    props:{
        ftlists:Array
    },
    data(){
        return{
            ftList:[]
        }
    },
    methods:{
        getFootInfo(){
            this.axios.get('https://lishaoling1314.github.io/mylike3/mylike3/public/data/foot.json')
            /**这里的axios与main.js文件的Vue.prototype后面带的名字一致,记得前面加上this**/
            .then((res)=>{
                console.log("请求成功");
                res=res.data;
                //console.log(res);
                if(res.ret && res.data){
                    const data = res.data;	//一次请求，获得多组数据，分别赋值
                    this.ftList = data.ftList;
                    //console.log(this.ftList);
                }
            })
            .catch(function(){
                console.log('请求失败')
            })
        },
    },
    mounted(){
        this.getFootInfo();
        //console.log(this.$route.matched[1].path);
    }
}
</script>

<style lang="stylus" scoped>
.footer-bar
    max-width:720px;
    min-width:320px;
    margin:0 auto;
    position: fixed;
    left: 0;
    right:0;
    bottom: 0;
    z-index: 2;
    background:#fff
    height:0.9rem
    padding:2% 0
    border-top:1px solid #ccc;
    ul
        width:100%
        display:flex; 
        display:-webkit-flex;
        justify-content:space-around;
    li
        width:25%
        text-align:center
        font-size:0.25rem
        img
            width:0.5rem
            margin-bottom:2%
        img:nth-child(even)
            display:none
    li.active
        color:#983be3
        img:nth-child(odd)
            display:none
        img:nth-child(even)
            display:inline-block
</style>