<template>
  <div class="fenlei">
     <div 
     class="menu-wrapper" 
     ref="menuWrapper"
     >
       <ul>
           <li 
           v-for="(item,index) in fenleiList" 
           :key="index"
           :class="{'active':current === index}"
           @click="addClass(index)"
           ref="navitem"
           >
              {{item.name}}
           </li>
       </ul>
     </div>
     <div class="fenlei-wrapper" ref="fenleiWrapper">
        <div>
            <dl v-for="item in fenleiList" :key="item.id" ref="fenleilist">
                <h1 class="title">{{item.name}}</h1>
                <ul>
                    <li 
                    v-for="list in item.sort" 
                    :key="list.id"
                    >
                        <img :src="list.imgUrl" alt="">
                        <span>
                            <h2>{{list.title}}</h2>
                            <p>{{list.text}}</p>
                            <router-link to="/home">了解详情</router-link>
                        </span>
                    </li>
                </ul>
            </dl>
        </div>
         
     </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name:"Fenlei",
    data(){
        return{
            fenleiList:[],
            current:0,
        }
    },
    methods:{
        getFeiLeiInfo(){
            let url = this.GLOBAL.BASE_URL+'page.json'
            this.axios({
                url:url,
                method:'get',
            })
            /**这里的axios与main.js文件的Vue.prototype后面带的名字一致,记得前面加上this**/
            .then((res)=>{
                res=res.data;
                if(res.ret && res.data){
                    const data = res.data;	//一次请求，获得多组数据，分别赋值
                    this.fenleiList = data.fenleiList;
                    console.log(this.fenleiList);
                };
                console.log('加载成功');
            })
            .catch((err)=>{
                console.log('请求失败')
            })
        },
        _initScroll () {
            this.menuScroll = new BScroll(this.$refs.menuWrapper, {
                click: true
            })
            this.fenleiScroll = new BScroll(this.$refs.fenleiWrapper, {
                click: true,
                probeType: 3
            })
            this.fenleiScroll.on('scroll', (pos) => {
                this.scrollY = Math.abs(Math.round(pos.y))
            })
        },
        addClass(index){
            this.current=index;
            let fenleilist = this.$refs.fenleilist;
            let el = fenleilist[index];
            this.fenleiScroll.scrollToElement(el, 300);
            let height = this.$refs.menuWrapper.getBoundingClientRect().height;//最外层的宽度
            let litop= this.$refs.navitem[index].offsetTop;//li距离父级的左距离，记得父级要加上position:relative
            let lih=this.$refs.navitem[index].clientHeight;//li的宽度
            let cenh=litop + lih / 2;//滚动条中间值
            let target = litop - cenh;//目标值
            let maxTranslate=this.menuScroll.maxScrollY;//滚动条最大的偏移
            let maxHeight = -maxTranslate + height / 2;
            console.log(cenh,height/2,maxHeight);
            if(cenh<height/2){
                console.log(11);
                this.menuScroll.scrollTo(0,0,300);
            }else if(cenh > maxHeight){
                console.log(22);
                this.menuScroll.scrollTo(0,maxTranslate,300);
            }else{
                let nowTlanslate = cenh - lih / 2
                console.log(33,nowTlanslate);
                this.menuScroll.scrollTo(0,-nowTlanslate,300);
            }
        }
    },
    mounted(){
        this.getFeiLeiInfo();
        setTimeout(() => {
            this._initScroll()
        }, 20)
    },
    computed:{
    }
}
</script>

<style src="@/assets/css/subpage.css" scoped></style>
