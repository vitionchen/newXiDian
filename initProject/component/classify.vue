<template>
  <div class="classify-list" v-scroll='getList'>
      <img v-bind:src="bannerImg" class='banner-img' @click='toIndex()'/>
      <div class="content-item">
          <p class="item-title">{{title}}<span>{{sumNum?'共'+sumNum+'篇讲话':''}}</span></p>
          <p class="item-list" v-for='item in list' @click="turnToArticle(item)">{{item.title}}{{item.createTime?' ['+item.createTime+']':''}}</p>
      </div>
       <div class="loading" v-if="loadMore&&loading">
            <div class="loading-item"></div>
            <p class="loading-text">正在加载...</p>
            <div class="clear"></div>
        </div>
  </div>
</template>

<script>
import banner from '../img/banner.jpg';
import mainJs from '../js/main'; 
import fetchMethod from '../js/fetch';
const toGetList=(self)=>{
    let getData={
        columnId:self.columnId,
        rowNumber:self.loadNum,
        count:20,
        adv:1,
        siteID:1,
        version:0
      }
      self.loading=true;
    fetchMethod('getArticles','get',getData,function(data){
      self.loading=false;
      for(let i = 0 ; i < data.list.length ; i++){
        data.list[i].createTime = data.list[i].createTime ? data.list[i].createTime.split(' ')[0] : '';
      }
      self.loadNum += data.list.length;
      if(data.list.length<20){
        self.loadMore=false;
      }
      self.list.push(...data.list);
    },()=>{
        setTimeout(()=>{
          self.loading=false
        },3000)
      })
}
export default {
  data(){
    return {
      bannerImg:banner,
      title:'',
      list:[],
      sumNum:'',
      columnId:'',
      loadNum:0,
      loadMore:true,
      loading:true,
      jump:false
    }
  },
  mounted(){
    //分享 
    let shareJson={
      url:mainJs.shareIndex,
      title:'习近平总书记系列重要讲话大型数据库',
      desc:'打开南方+，学习习近平总书记系列重要讲话'
    }
    mainJs.shareDeed(shareJson);
		//二次分享 
    var shareData={
        //请求失败回调
        getShareFail:function(){},
        //分享标题
        title:shareJson.title,
        //分享描述
        desc:shareJson.desc,
        //分享图片地址
        iconUrl:mainJs.xdShareIcon,
        //需要分享的路径，不传默认本页面
        shareUrl:shareJson.url
    }
    initShare(shareData);
    // QQ
		var viewport = document.querySelector("meta[itemprop=description]");
		viewport.setAttribute('content', shareJson.title);
    //获取列表 
    let self = this;
    self.columnId=this.$route.query.id;
    self.title=this.$route.query.text;
    //获取总条数 
    let getActicleData={columnId:self.columnId};
    fetchMethod('getColumnArticleSize','get',getActicleData,function(data){
      toGetList(self);
      self.sumNum=data.size;
    })
  },
  methods:{
		toIndex(){
			this.$router.push('/main');
		},
    turnToArticle(item){
      try{
        SecrectActivity.getVersionCode();
        this.$router.push({path:'article',query:{id:item.fileId,title:item.title,source:item.releaseSource,createTime:item.createTime}});
      }catch(e){
        this.$router.push({path:'article',query:{id:item.fileId}})
      }
    },
    getList(){
        if(!this.loading&&this.loadMore)toGetList(this);
    },
    changeJump(){
      this.jump=true;
    }
  },
  directives:{
      'scroll'(el,binding){
          el.addEventListener('scroll',e=>{
              let ownHeight=el.scrollHeight;
              let scrollBottom=ownHeight-el.clientHeight-el.scrollTop;
              if(scrollBottom<10)binding.value();
          })
          // var touchPos=0;
          // window.t1=(e)=>{
          //     touchPos=e.touches[0].clientY;
          // }
          //判断系统与是否第一次初始 
          // var getSys=function(){
          //     var sysJuc={
          //         ios:/(iPhone|iPad|iPod|iOS)/i,
          //         android:/(Android)/i
          //     };
          //     var nav=navigator.userAgent;
          //     var system=sysJuc.ios.test(nav)?'ios':sysJuc.android.test(nav)?'android':'other';
          //     return system
          // }
          // if(binding.value.jump||getSys()!=='ios')return;
          // binding.value.changeJump();
          // var t2=(e)=>{
          //     e.preventDefault();
          //     e.stopPropagation();
          //     var movePos=e.touches[0].clientY
          //     el.scrollTop+=touchPos-(movePos);
          //     touchPos=movePos;
          // }
          // el.addEventListener('touchstart',t1)
          // el.addEventListener('touchmove',t2)
      }
  }
}
</script>

