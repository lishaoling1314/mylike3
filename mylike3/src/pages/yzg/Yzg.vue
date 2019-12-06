<template>
    <section class="wrapper" ref="wrapper">
        <!---导航star--->
        <div class="nav" ref="navwrap">
            <div class="tab" ref="tab">
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
        </div>
        <div class="wrap" ref="wrap">
            <div>
                <div class="list" id="list">
                    <ul id="box">
                        <li v-for="(list,index) in yzgList[this.current]" v-if="index<reset.rows" :key="index">
                            <img :src="list.imgUrl" class="listImg">
                            <span>
                                <p>{{list.text}}</p>
                                <dl>
                                    <dt><i><img :src="list.tximg" alt=""><font><img :src="list.jzimg" alt=""></font></i>{{list.name}}</dt>
                                    <dd><em class="iconfont love-ico">&#xe637;</em>{{list.love}}</dd>
                                </dl>
                            </span>
                        </li>
                    </ul>
                    <div class="load-more-gif" v-if="reset.isLoading">努力加载中</div>
                    <div class="load-more-end" v-if="reset.endLoading">加载完毕...</div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import BScroll from "better-scroll";
export default {
    name:"Home",
    data(){
        return{
            /**数据调用 star*/
            navList:[],
            /**数据调用 end*/
            current:0,//头部导航索引值
            yzgList:[],
            pages:5,//加载的条数
            //这里加reset的目的是导航点击时重置这些变量，
            //不然js会给他们赋值，同理this.rows也要改成this.reset.rows
            reset:{
                rows:5,//显示的条数
                isLoading:true,//底部加载图标
                endLoading:false,//底部结束图标
            }
        }
    },
    methods:{
        getHomeInfo(){
            let url = this.GLOBAL.BASE_URL+'yzg.json'
            this.axios({
                url:url,
                method:'get',
            })
            /**这里的axios与main.js文件的Vue.prototype后面带的名字一致,记得前面加上this**/
            .then((res)=>{
                res=res.data;
                if(res.ret && res.data){
                    const data = res.data;	//一次请求，获得多组数据，分别赋值
                    this.navList=data.navList;
                    this.yzgList=data.yzgList;
                };
                //console.log('加载OK');
                //star这个因为是动态获取数据，要放在数据里面，否则数据慢加载的获取不到li
                var vm=this;
                this.$nextTick(()=>{
                    this.tabNavScroll();
                    //图片加载完才获取top，不然top的值不正确
                    var listImg=document.getElementById("box").getElementsByClassName("listImg");
                    var newImg = new Image();
                    //console.log(listImg.length);
                    for(var i=0;i<listImg.length;i++){
                        newImg.src = listImg[i].src;
                        newImg.onload = function(){
                            vm.waterFall();
                        }
                    }
                    window.onresize=function(){
                        vm.tabNavScroll();
                        vm.waterFall();
                    }
                });//end
                
            })
            .catch((err)=>{
                console.log('请求失败')
            })
        },
        /**接收数据end*/
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
            this.reset = this.$options.data().reset;//切换时让一开始加载条数初始化this.reset.rows
            //console.log(this.reset.rows);
            this.current = index;//这里除了对应点击加个active,还有一个功能点击获取多嵌套json
            let width = this.$refs.navwrap.getBoundingClientRect().width;//最外层的宽度
            let lileft= this.$refs.tabitem[index].offsetLeft;//li距离父级的左距离，记得父级要加上position:relative
            let liw=this.$refs.tabitem[index].clientWidth;//li的宽度
            let cenw=(width-liw)/2;//滚动条中间值
            let target = lileft - cenw;//目标值
            let maxTranslate=this.scrolltab.maxScrollX;//滚动条最大的偏移
            //console.log(lileft,cenw,target,lileft-width,target/2);
            //console.log(lileft,width);
            if(target<0){
                this.scrolltab.scrollTo(0,0,300);
            }else if(lileft-width>=0){
                this.scrolltab.scrollTo(maxTranslate,0,300);
            }else{
                this.scrolltab.scrollTo(-target,0,300);
            }
            var vm=this;
            this.$nextTick(()=>{
                //图片加载完才获取top，不然top的值不正确
                var listImg=document.getElementById("box").getElementsByClassName("listImg");
                var newImg = new Image();
                //console.log(listImg.length);
                for(var i=0;i<listImg.length;i++){
                    newImg.src = listImg[i].src;
                    newImg.onload = function(){
                        vm.waterFall();
                    }
                }
                window.onresize=function(){
                    vm.waterFall();
                }
            });//end
        },
        waterFall() {
            var gap = 10;
            var box = document.getElementById('box');
            var list = document.getElementById('list');
            var items = box.children;
            // 1- 确定列数  = 页面的宽度 / 图片的宽度
            var pageWidth = box.clientWidth+(list.clientWidth - box.offsetWidth);
            var itemWidth = items[0].offsetWidth;
            var columns = parseInt(pageWidth / itemWidth);
            var arr = [];
            for (var i = 0; i < items.length; i++) {
                if (i < columns) {
                    // 2- 确定第一行
                    items[i].style.top = 0;
                    items[i].style.left = (itemWidth + gap) * i + 'px';
                    arr.push(items[i].offsetHeight);
                } else {
                    // 其他行
                    // 3- 找到数组中最小高度  和 它的索引
                    var minHeight = arr[0];
                    var index = 0;
                    for (var j = 0; j < arr.length; j++) {//这时arr只有两条
                        if (minHeight > arr[j]) {
                            minHeight = arr[j];
                            index = j; 
                        }
                    }
                    // 4- 设置下一行的第一个盒子位置
                    // top值就是最小列的高度 + gap
                    items[i].style.top = arr[index] + gap + 'px';
                    // left值就是最小列距离左边的距离
                    items[i].style.left = items[index].offsetLeft + 'px';
                    // 5- 修改最小列的高度
                    // 最小列的高度 = 当前自己的高度 + 拼接过来的高度 + 间隙的高度
                    arr[index] = arr[index] + items[i].offsetHeight + gap;
                }
            }
            //取出每个li的offsetHeight然后取出最大的就是ul的高度
            var maxHeight = Math.max.apply(null, arr);//ul的最大高度
            box.style.height = maxHeight + 'px'; 
        },
        BtScroll(){
            let box = document.getElementById('box');
            var items = box.children;
            var scrollT = document.documentElement.scrollTop || document.body.scrollTop; //滚动条的垂直偏移
            var scrollH = document.documentElement.scrollHeight || document.body.scrollHeight; //元素的整体高度
            var clientH = document.documentElement.clientHeight || document.body.clientHeight; //元素的可见高度
            //console.log(scrollH - clientH - scrollT)
            if (scrollH - clientH - scrollT<100) {
                this.axios.get('https://lishaoling1314.github.io/mylike3/mylike3/public/data/yzg.json').then((res)=>{
                    res=res.data;
                    if(res.ret && res.data){
                        const data = res.data;	//一次请求，获得多组数据，分别赋值
                        this.yzgList=data.yzgList;
                        //console.log(data.yzgList);
                        const yzlist=this.yzgList[this.current];
                        //console.log(this.current,yzlist.length,items.length,222222222222)
                        if(yzlist.length > this.reset.rows){//根据条数来判断
                            this.reset.rows=this.reset.rows+this.pages;//每次下拉到底加两条数据
                            //console.log(this.reset.rows);
                            this.$nextTick(()=>{//这里要加上this.$nextTick()不然li到waterFall()还没获取到就先执行box.children
                                this.waterFall();
                            })//end
                        }
                        if(yzlist.length == items.length){//当相等时,没有更多数据
                            //console.log("停止");
                            this.reset.isLoading=false;
                            this.reset.endLoading=true;
                        }
                    };
                })
                .catch((err)=>{
                    console.log('请求失败');
                    this.reset.isLoading=true;
                    this.reset.endLoading=false;
                })
            }
        }
    },
    mounted(){
        this.getHomeInfo();//数据
        window.addEventListener('scroll',this.BtScroll);
    },
    destroyed(){
        window.removeEventListener('scroll', this.BtScroll);
    }
}
</script>
<style lang="stylus" scoped>
.nav
    padding:2% 0
    display:flex
    display:-webkit-flex
    justify-content:space-around
    line-height:0.4rem
    text-align:center
    position:relative
    z-index:9
    background:#fff
    .tab
        width:100%
        overflow: hidden
        position: relative
    li
        width:1.3rem
        display: inline-block
        text-align: center
        cursor: pointer
    .active:after
        content:""
        display:block
        width:0.5rem
        height:0.04rem
        border-radius:0.05rem
        background:#ffe034
        margin:0 auto
.list
    ul
        position:relative
        margin:0 2%
    li
        width:3.5rem
        background:#fff
        border-radius:0.2rem
        overflow:hidden
        font-size:0.22rem
        position:absolute
        span
            display:block
            padding:0 5%
        p
            padding:5% 0
            line-height:1.3
        dl
            display:flex
            display:-webkit-flex
            justify-content:space-between
            padding-bottom:5%
            dt
                width:60%
            i
                display:inline-block
                width:0.33rem
                vertical-align:middle
                margin-right 8%
                position:relative
                img
                    border-radius:50%
                    overflow:hidden
            font
                display:block
                width:0.18rem
                position:absolute
                right:-0.1rem
                bottom:0
            dd
                display:flex
                display:-webkit-flex
                justify-content:space-between
                align-items:center
            em
                color:#7f7f7f
            .love-ico
                font-size:0.25rem
                margin-right:2%

.load-more-gif
    load-more-gif()
.load-more-gif::after
    load-more-gifafter()
.load-more-end
    load-more-end()

@keyframes loading{
    0%{
        transform:rotate(0deg)
    }
    100%{
        transform:rotate(360deg)
    }
}
</style>

