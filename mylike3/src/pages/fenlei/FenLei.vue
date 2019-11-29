<template>
  <div class="fenlei">
     <div class="menu-wrapper" ref="menuWrapper">
       <ul>
           <li 
           v-for="(item,index) in fenleiList" 
           :key="index"
           :class="{'active':current === index}"
           @click="addClass(index)"
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
            this.axios.get('https://lishaoling1314.github.io/mylike3/mylike3/public/data/page.json')
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
            //console.log(fenleilist);
            this.fenleiScroll.scrollToElement(el, 300);
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
