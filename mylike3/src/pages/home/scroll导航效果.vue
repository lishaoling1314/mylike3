<template>
    <div class="page">
        <section class="wrap">
            <!---导航star--->
            <div class="nav" ref="wrapper">
                <div class="left-nav" ref="tab">
                    <ul ref="tabWrapper">
                    　　<li 
                        ref="tabitem"
                        v-for="(nav,index) in navList" 
                        :key="index"
                        :class="{'active':current === index}" 
                        @click="addClass(index)"
                        >
                        {{nav.desc}}
                        </li>
                    </ul>
                </div>
                <div class="right-nav">全部</div>
            </div>
        </section>
    </div>
</template>
<script>
import BScroll from "better-scroll";
import {countDown} from '@/assets/js/timedown.js'
import HomeHeader from './components/Header'
export default {
    name:"Home",
    components:{
        HomeHeader,
    },
    data(){
        return{
            /**数据调用 star*/
            swiperList:[],
            menuList:[],
            navList:[],
            advList:[],
            freeList:[],
            videoList:[],
            huodongList:[],
            /**数据调用 end*/
            current:0,//头部导航索引值
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
    created:function () {
        //this.$emit('footer',true);//绑定底部导航是否显示
    },
    methods:{
        /**接收数据star*/
        getHomeInfo(){
            this.axios.get('/api/index.json')
            /**这里的axios与main.js文件的Vue.prototype后面带的名字一致,记得前面加上this**/
            .then((res)=>{
                res=res.data;
                if(res.ret && res.data){
                    const data = res.data;	//一次请求，获得多组数据，分别赋值
                    this.swiperList = data.swiperList;
                    this.menuList=data.menuList;
                    this.navList=data.navList;
                    this.advList=data.advList;
                    this.freeList=data.freeList;
                    this.videoList=data.videoList;
                    this.huodongList=data.huodongList;
                };
                console.log('加载成功');
                //star这个因为是动态获取数据，要放在数据里面，否则数据慢加载的获取不到li
                this.$nextTick(()=>{
                    this.tabScroll();
                })//end

            })
            .catch((err)=>{
                console.log('请求失败')
            })
        },
        /**接收数据end*/

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
        //导航切换
        tabScroll() {
            let width = 0
            for (let i = 0; i < this.navList.length; i++) {
                width += this.$refs.tabitem[i].getBoundingClientRect().width;
            }
            this.$refs.tabWrapper.style.width = width + 'px'
            this.$nextTick(() => {
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.tab, {
                        startX: 0,
                        click: true,
                        scrollX: true,
                        scrollY: false,
                        probeType:3,
                        eventPassthrough: 'vertical'
                    });
                    this.scroll.on('scroll',(pos)=>{
                        this.scrollY = Math.abs(Math.round(pos.y));
                    });
                } else {
                    this.scroll.refresh()
                }
            });
        },
        //导航点击效果
        addClass (index) {
            this.current = index;
            //let pointX = this.scroll.pointX;
            let width = this.$refs.wrapper.getBoundingClientRect().width;//最外层的宽度
            let lileft= this.$refs.tabitem[index].offsetLeft;//li距离父级的左距离，记得父级要加上position:relative
            let liw=this.$refs.tabitem[index].clientWidth;//li的宽度
            let cenw=(width-liw)/2;//滚动条中间值
            let target = lileft - cenw;//目标值
            let maxTranslate=this.scroll.maxScrollX;//滚动条最大的偏移
            //console.log(lileft,cenw,target,lileft-width,target/2);
            if(target<0){
                this.scroll.scrollTo(0,0,300);
            }else if(lileft-width>0){
                this.scroll.scrollTo(maxTranslate,0,300);
            }else{
                this.scroll.scrollTo(-target,0,300);
            }
        }
    },
    mounted(){
        this.getHomeInfo();
        this.countDownTime();//倒计时
    },
    computed:{
        //活动图标4个一排
        pages(){
            const pages=[]
            this.huodongList.forEach((item,index)=>{
                const page=Math.floor(index/1)
                if(!pages[page]){
                    pages[page]=[]
                }
                pages[page].push(item)
            })
            return pages;
        }
    },
}
</script>
<style src="@/assets/css/home.css" lang="stylus"></style>


