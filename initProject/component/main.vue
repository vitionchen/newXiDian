<template>
  <div class="main-item">
	  <img v-bind:src="bannerImg" class='banner-img'/>
    <div class='search-box'>
      <div class="search-item-ground">
        <div class="search-item">
            <img :src='img.searchImg' class='search-img'/>
            <input placeholder="热搜：新时代中国特色社会主义思想" v-model="searchText" @keyup.enter="searchText?toSearch():null"/>
            <div class='cancel-img' v-if='searchText' @click="clearSearch()">
              <img :src='img.cancelImg'/>
            </div>
        </div>
        <p class="search-text" :class="{'ensearch':searchText}" @click='searchText?toSearch():null'>搜索</p>
      </div>
    </div>
    <initModule v-if='!searchShow'/>
    <searchPage v-if='searchShow' :searchText='searchText' ref="search"/>
  </div>
</template>
<script>
import searchImg from '../img/search.png';
import cancelImg from '../img/search_close.png';
import banner from '../img/banner.jpg';
// 模块

import initModule from './mainVue/initComponent';
import searchPage from './mainVue/searchPage';
import mainJs from '../js/main';
// import myFetch from '../js/fetch';
export default {
  data(){
    return{
      bannerImg:banner,
      img:{
        searchImg:searchImg,
        cancelImg:cancelImg
      },
      searchText:'',
      oldSearchText:'',
      searchShow:false
    }
  },
  components:{
    initModule,
    searchPage
  },
  mounted(){
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
  },
  methods:{
    clearSearch(){
      this.searchText='';
      this.oldSearchText='';
    },
    toSearch(){
      if(this.searchText==this.oldSearchText||!this.searchText)return;
      if(this.searchShow)this.$refs.search.searchDeed(this.searchText);
      this.searchShow=true;
      this.oldSearchText=this.searchText;
    }
  },
  watch:{
    searchText(newVal,oldVal){
      if(!newVal){
        this.searchShow=false;
        this.searchText='';
        this.oldSearchText='';
      }
    }
  }
}
</script>
