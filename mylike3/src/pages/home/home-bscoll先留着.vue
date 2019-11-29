<template>
    <section class="wrapper" ref="wrapper">
        <div>
            <home-header></home-header>
            <!---导航star--->
            <div class="wrap">
                <div class="navwrapper">
                    <div class="nav isFixed" ref="navwrap">
                        <div class="left-nav" ref="tab">
                            <ul ref="tabWrapper">
                            　　<li 
                                ref="tabitem"
                                v-for="(nav,index) in navList" 
                                :key="index"
                                :class="{'active':current === index}" 
                                @click="addNavClass(index)"
                                >
                                {{nav.desc}}
                                </li>
                            </ul>
                        </div>
                        <div class="right-nav">全部</div>
                    </div>
                </div>
                <!---广告轮播star--->
                <section class="banner">
                    <swiper :options="swiperOptionBan" v-if="advList.length"><!--v-if="lists.length"是为了让loop:true不失效---->
                    　　<swiper-slide v-for="list in swiperList" :key="list.id">
                            <div class="db"><img :src="list.imgUrl" alt=""></div>
                        </swiper-slide>
                    </swiper>
                    <div class="swiper-pagination pagBan"></div>
                </section>
                <!---图标栏star--->
                <section class="menu" ref="menu">
                    <swiper :options="swiperOptionMenu">
                    　　<swiper-slide v-for="icon in menuList" :key="icon.id"><div class="icon"><img v-lazy="icon.imgUrl" alt=""><div class="text">{{icon.desc}}</div></div></swiper-slide>
                    </swiper>
                    <div class="swiper-pagination pagMenu"></div>
                </section>

                <!---广告栏star--->
                <section class="adv">
                    <ul>
                        <li v-for="img in advList" :key="img.id"><img v-lazy="img.imgUrl" alt=""></li>
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
                            <swiper-slide v-for="free in freeList" :key="free.id">
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
                    <div class="shipin" v-for="video in videoList" :key="video.id">
                        <img v-lazy="video.imgUrl" alt="">
                        <p>{{video.desc}}</p>
                    </div>
                </section>

                <!---活动列表star--->
                <div class="huodong" ref="huodong">
                    <div class="ti"><h3>精品优选<span>限时特价<i>{{timeobj.hou}}</i>:<i>{{timeobj.min}}</i>:<i>{{timeobj.sec}}</i></span></h3></div>
                    <div class="swiperTab">
                        <!--huodongList后面多加个[current]是因为多嵌套json,当导航点击时，上面的index=current-->
                        <div class="list" v-for="huodong in huodongList[current]" :key="huodong.id">
                            <img :src="huodong.imgUrl" alt="">
                            <div class="text">
                                <p>{{huodong.desc}}</p>
                                <em>折后</em>
                                <span><b><font>¥</font>{{huodong.price}}<s>¥{{huodong.oldprice}}</s></b><i class="iconfont gwc-ico"></i></span>
                            </div>
                        </div>
                    </div>
                    <div class="load-more-gif">loading...</div>
                </div>
            </div>
        </div>
    </section> 
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
            Fixed:false,
            scrollY:"",
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
        _initScroll(){
            this.$nextTick(()=>{
                if (!this.scroll) {
                    this.scrollwrapper = new BScroll(this.$refs.wrapper,{
                        pullUpLoad:true,
                        pullDownRefresh:true,
                        probeType: 3,
                        scrollY: true,
                        click: true,
                        useTransition:false,  // 防止iphone微信滑动卡顿
                        bounce:true,
                        momentumLimitDistance: 15,//只有在屏幕上快速滑动的距离大于momentumLimitDistance,才能开启 momentum 动画。
                        mouseWheel: true
                    });
                    this.scrollwrapper.on('scroll',(pos)=>{
                        this.scrollY = Math.abs(Math.round(pos.y));
                        var menuTop = this.$refs.menu.offsetTop;//距离顶部的高度
                        //console.log(this.scrollY,menuTop);
                        if (this.scrollY > menuTop) {
                            this.Fixed = true;
                        } else {
                            this.Fixed = false;
                        };
                    });
                    this.scrollwrapper.on('touchEnd',(pos)=>{//这里网上都是小写touchend，一定要大写touchEnd否则监听不到
                        if(this.scrollwrapper.y<=(this.scrollwrapper.maxScrollY + 50)){//滚动到底部加载数据
                            console.log(pos.y);
                        }
                    });
                }else{
                    this.scrollwrapper.refresh();
                };
            });
        },
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
                    this.tabNavScroll();
                    var vm=this;
                    window.onresize=function(){
                        vm.tabNavScroll();
                    }
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
            let enddowntime=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' 23:59:59';//结束时间
            let interval=setInterval(()=>{
               this.timeobj = countDown(enddowntime);
               //停止时间
               if(this.timeobj.flag==1){
                    console.log(this.timeobj.flag);
                    clearInterval(interval);
               };
            },1000);
            //onsole.log(this.timeobj.hou)
        },

        /***导航切换star****/
        tabNavScroll() {
            let width = 0
            for (let i = 0; i < this.navList.length; i++) {
                width += this.$refs.tabitem[i].getBoundingClientRect().width;
            }
            this.$refs.tabWrapper.style.width = width + 'px'
            this.$nextTick(() => {
                if (!this.scroll) {
                    this.scrolltab = new BScroll(this.$refs.tab, {
                        startX: 0,
                        click: true,
                        scrollX: true,
                        scrollY: false,
                        //probeType:3,
                        eventPassthrough: 'vertical'
                    });
                } else {
                    this.scrolltab.refresh()
                }
            });
        },
        //导航点击效果
        addNavClass (index) {
            this.current = index;//这里除了对应点击加个active,还有一个功能点击获取多嵌套json
            //console.log(this.current);
            let width = this.$refs.navwrap.getBoundingClientRect().width;//最外层的宽度
            let lileft= this.$refs.tabitem[index].offsetLeft;//li距离父级的左距离，记得父级要加上position:relative
            let liw=this.$refs.tabitem[index].clientWidth;//li的宽度
            let cenw=(width-liw)/2;//滚动条中间值
            let target = lileft - cenw;//目标值
            let maxTranslate=this.scrolltab.maxScrollX;//滚动条最大的偏移
            //console.log(lileft,cenw,target,lileft-width,target/2);
            if(target<0){
                this.scrolltab.scrollTo(0,0,300);
            }else if(lileft-width>0){
                this.scrolltab.scrollTo(maxTranslate,0,300);
            }else{
                this.scrolltab.scrollTo(-target,0,300);
            }
            //点击滑到活动版块
            var hdoffsetTop=this.$refs.huodong.offsetTop;
            document.documentElement.scrollTop=hdoffsetTop;
            document.body.scrollTop=hdoffsetTop;
        },
        // handleScroll(){
        //     var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;//网页被卷起来的高度
        //     var menuTop = this.$refs.menu.offsetTop;//距离顶部的高度
        //     //console.log(scrollTop,offsetTop);
        //     //导航添加fixed star
        //     if (scrollTop > menuTop) {
        //         this.Fixed = true;
        //     } else {
        //         this.Fixed = false;
        //     };
        //     //导航添加fixed end
        //     //滑动到底部加载数据star
        //     if (((window.screen.height + document.body.scrollTop) > (document.body.clientHeight)) && this.REQUIRE) {
        //         console.log(11);
        //     }
        // },
    },
    mounted(){
        this.getHomeInfo();//数据
        this.countDownTime();//倒计时
        this._initScroll();//整个页面拉到底加载精品优选数据
        // window.addEventListener('scroll', this.handleScroll)
        // window.ontouchmove = this.handleScroll;
    },
    //页面离开的时销毁，不然window是全局，会影响到其它页面
    destroyed(){
        // window.removeEventListener('scroll', this.handleScroll)
        // window.ontouchmove = null
    },
    computed:{
        // //活动图标4个一排
        // pages(){
        //     const pages=[]
        //     this.huodongList.forEach((item,index)=>{
        //         const page=Math.floor(index/1)
        //         if(!pages[page]){
        //             pages[page]=[]
        //         }
        //         pages[page].push(item)
        //     })
        //     return pages;
        // }
    },
}
</script>
<style src="@/assets/css/home.css" lang="stylus" scoped></style>


