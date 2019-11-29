<template>
    <section class="wrap">
        <!---导航star--->
        <div class="nav">
            <div class="left-nav">
                <swiper :options="swiperOptionNav" ref="swiperNav">
                　　<swiper-slide 
                    v-for="(nav,index) in navs" 
                    :key="index"
                    :class="{'active':current === index}" 
                    @click.native="addClass(index)"
                    >
                    {{nav.desc}}
                    </swiper-slide>
                </swiper>
            </div>
            <div class="right-nav">全部</div>
        </div>

        <!---广告轮播star--->
        <section class="banner">
            <swiper :options="swiperOptionBan" v-if="lists.length"><!--v-if="lists.length"是为了让loop:true不失效---->
            　　<swiper-slide v-for="list in lists" :key="list.id">
                    <div class="db"><img :src="list.imgUrl" alt=""></div>
                </swiper-slide>
            </swiper>
            <div class="swiper-pagination pagBan"></div>
        </section>

        <!---图标栏star--->
        <section class="menu">
            <swiper :options="swiperOptionMenu">
            　　<swiper-slide v-for="icon in icons" :key="icon.id"><div class="icon"><img v-lazy="icon.imgUrl" alt=""><div class="text">{{icon.desc}}</div></div></swiper-slide>
            </swiper>
            <div class="swiper-pagination pagMenu"></div>
        </section>

        <!---广告栏star--->
        <section class="adv">
            <ul>
                <li v-for="img in advimgs" :key="img.id"><img v-lazy="img.imgUrl" alt=""></li>
            </ul>
        </section>
        
        <!---隔开线star--->
        <section class="line"></section>

        <!---0元区　star--->
        <section class="free">
            <div class="ti">
                <h3><img src="~images/sy-ti.png" alt=""></h3>
                <p>
                    整点秒杀 | 还剩
                    <span><i>{{timeobj.hou}}</i>:<i>{{timeobj.min}}</i>:<i>{{timeobj.sec}}</i></span>
                </p>
            </div>
            <div class="free-list">
                <swiper :options="swiperOptionFree">
                    <swiper-slide v-for="free in frees" :key="free.id">
                        <div class="list">
                            <img v-lazy="free.imgUrl" alt="">
                            <p>{{free.desc}}</p>
                            <span><b><font>¥</font>{{free.price}}</b><i class="iconfont gwc-ico">&#xe60d;</i></span>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </section>

        <!---视频star--->
        <section class="video">
            <div class="ti"><h3>项目体验直播室<i>MORE></i></h3></div>
            <div class="shipin" v-for="video in videos" :key="video.id">
                <img v-lazy="video.imgUrl" alt="">
                <p>{{video.desc}}</p>
            </div>
        </section>

        <div class="huodong">
            <div class="ti"><h3>精品优选<span>限时特价<i>{{timeobj.hou}}</i>:<i>{{timeobj.min}}</i>:<i>{{timeobj.sec}}</i></span></h3></div>
            <swiper :options="swiperOptionTab" ref="swiperTab">
                <swiper-slide v-for="(page,index) of pages" :key="index">
                    <div class="list" v-for="huodong in page" :key="huodong.id">
                        <img v-lazy="huodong.imgUrl" alt="">
                        <div class="text">
                            <p>{{huodong.desc}}</p>
                            <em>折后</em>
                            <span><b><font>¥</font>{{huodong.price}}<s>¥{{huodong.oldprice}}</s></b><i class="iconfont gwc-ico"></i></span>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
    </section>
</template>

<script>
import {countDown} from '@/assets/js/timedown.js'
export default {
    name:"HomeBanner",
    //属性声明
    props:{
        navs:Array,
        lists:Array,
        icons:Array,
        advimgs:Array,
        frees:Array,
        videos:Array,
        huodongs:Array,
    },
    data(){
        return{
            current:0,
            timeobj:{hou:'00',min:'00',sec:'00'},//倒计时
            //0不用加双引号，00要加双引号。
            //为了定个起始值才{}里面的，要是不用起始值可以不加直接写timeobj:{}
            swiperOptionNav: {
                slidesPerView: 5,
                preventClicks : false,
                //slideToClickedSlide: true,
            },
            swiperOptionTab: {
            },
            swiperOptionBan:{
                pagination: {
                    el: '.pagBan',
                },
            },
            swiperOptionMenu:{
                slidesPerView: 5,
                pagination: {
                    el: '.pagMenu',
                },
            },
            swiperOptionFree:{
                slidesPerView:"auto",
                pagination: {
                    el: '.pagFree',
                },
            }
        }
    },
    created(){
    },
    mounted(){
        /*****导航轮播****/
        this.$nextTick(() => {
            const swiperTab = this.$refs.swiperTab.swiper
            const swiperNav = this.$refs.swiperNav.swiper
            swiperTab.controller.control = swiperNav
            swiperNav.controller.control = swiperTab
        });
        this.countDownTime();
    },
    computed:{
        //活动图标4个一排
        pages(){
            const pages=[]
            this.huodongs.forEach((item,index)=>{
                const page=Math.floor(index/1)
                if(!pages[page]){
                    pages[page]=[]
                }
                pages[page].push(item)
            })
            return pages;
        }
    },
    methods: {
        addClass (index) {
            this.current = index
        },
        //每天倒计时
        countDownTime:function(){
            let date = new Date();
            let enddowntime=date.getFullYear()+','+(date.getMonth()+1)+','+date.getDate()+' 23:59:59';//结束时间
            let interval=setInterval(()=>{
               this.timeobj = countDown(enddowntime);
               if(this.timeobj.flag==1){
                    console.log(this.timeobj.flag);
                    clearInterval(interval);
               };
            },1000);
            //onsole.log(this.timeobj.hou)
        },
    },
}
</script>
<style src="@/assets/css/home.css" lang="stylus"></style>



