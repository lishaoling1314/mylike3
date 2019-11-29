<template>
    <section class="service">
        <!---广告轮播star--->
        <section class="banner">
            <swiper :options="swiperOptionBan"><!--v-if="lists.length"是为了让loop:true不失效---->
            　　<swiper-slide v-for="list in swiperList" :key="list.id">
                    <div class="db"><img :src="list.imgUrl" alt=""></div>
                </swiper-slide>
            </swiper>
            <div class="swiper-pagination pagBan"></div>
        </section>
        <section class="wrap">
            <div class="part hytd">
                <h3>会员通道</h3>
                <ul>
                    <li v-for="hytd in hytdList" :key="hytd.id">
                        <i><img :src="hytd.imgUrl" alt=""></i>
                        <p>{{hytd.text}}</p>
                    </li>
                </ul>
            </div>
            <div class="part kf">
                <h3>客服与帮助</h3>
                <ul>
                    <li v-for="kf in kfList" :key="kf.id">
                        <i><img :src="kf.imgUrl" alt=""></i>
                        <p>{{kf.text}}</p>
                    </li>
                </ul>
            </div>
        </section>
    </section>
</template>

<script>
export default {
    name:"Service",
    data(){
        return{
            swiperList:[],
            hytdList:[],
            kfList:[],
            swiperOptionBan:{
                pagination: {
                    el: '.pagBan',
                },
            },
        }
    },
    methods:{
        /**接收数据star*/
        getServiceInfo(){
            this.axios.get('https://lishaoling1314.github.io/mylike3/mylike3/public/data/page.json')
            /**这里的axios与main.js文件的Vue.prototype后面带的名字一致,记得前面加上this**/
            .then((res)=>{
                res=res.data;
                if(res.ret && res.data){
                    const data = res.data;	//一次请求，获得多组数据，分别赋值
                    console.log(res.data);
                    this.swiperList = data.swiperList;
                    this.hytdList = data.hytdList;
                    this.kfList = data.kfList;
                };
                console.log('加载成功');
            })
            .catch((err)=>{
                console.log('请求失败')
            })
        },
        /**接收数据end*/
    },
    mounted(){
        this.getServiceInfo();
    }
}
</script>
<style src="@/assets/css/subpage.css" scoped></style>