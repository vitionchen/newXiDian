<template>
<div class="article">
	<img v-bind:src="bannerImg" class='banner-img' @click='toMore()'/>
	<div class="article-content">
		<div class="title">{{title}}</div>
		<div class="sub-title">{{source}}<span>{{createTime}}</span></div>
		<div class="content" v-html="content"></div>
		<div class="reload-box" @click="getArticleContent()" v-if="loadFail">
			<img :src="reloadImg">
			<div class="reload">网络开小差，点击重新加载</div>
		</div>
		<div class="article-more" @click='toMore()' v-if="share&&content">查看更多讲话内容</div>
	</div>
</div>
</template>
<script>
import fetchMethod from '../js/fetch';
import reloadImg from '../img/reload.png';
import mainJs from '../js/main';
import banner from '../img/banner.jpg';
const getArticle=(self)=>{
	let queryData=self.$route.query;
	let ts0 = new RegExp('<html>.*<body>');
	let ts1 = new RegExp('</body>.*</html>');
	let getData = {
		articleId:queryData.id,
		colID:14,
		t:1507342056148
	}
	fetchMethod('getArticleContent','get',getData,function(data){
		self.loadFail=false;
		self.title=data.title;
		self.content=data.content.replace(ts0,'').replace(ts1,'');
		self.createTime=data.createTime?data.createTime.split(' ')[0]:'';
		self.source=data.source?data.source:'';
		if(!self.wxShare){
			shareWx(self.title,self)
		}
	},()=>{self.loadFail=true})
}
const shareWx = (title,self) =>{
		let queryData=self.$route.query;
		var viewport = document.querySelector("meta[itemprop=description]");
		viewport.setAttribute('content', title);
		let tsloc = new RegExp('\.html.*\#');
		let suLoc = location.href.replace(tsloc,'.html#');
		let wxUrl = mainJs.shareArticle+'?id='+queryData.id;
		//二次分享
		var shareData={
			//请求失败回调
			getShareFail:function(){},
			//分享标题
			title:title,
			//分享描述
			desc:'打开南方+，学习习近平总书记系列重要讲话',
			//分享图片地址
			iconUrl:mainJs.xdShareIcon,
			//需要分享的路径，不传默认本页面
			shareUrl:wxUrl
		}
		initShare(shareData);
		self.wxShare=true;
}
export default {
	data(){
		return{
      		bannerImg:banner,
			title:'',
			source:'',
			createTime:'',
			content:'',
			share:false,
			loadFail:false,
			reloadImg:reloadImg,
			wxShare:false
		}
	},
	mounted(){
		let self = this;
		//获取已知文案
		let queryData=this.$route.query;
		self.title= queryData.title||'';
		self.source= queryData.source||'';
		self.createTime= queryData.createTime||'';
		self.share = queryData.share;
		getArticle(this);
		let tsloc = new RegExp('\.html.*\#');
		let suLoc = location.href.replace(tsloc,'.html#');
		//分享 
		let shareJson={
			url:mainJs.shareArticle+'?id='+queryData.id,
			title:queryData.title,
			desc:'打开南方+，学习习近平总书记系列重要讲话'
		}
		console.log(shareJson)
		mainJs.shareDeed(shareJson);
		if(self.title){
			shareWx(shareJson.title,this)
		}
	},
	methods:{
		toMore(){
			this.$router.push('/main');
		},
		getArticleContent(){
			getArticle(this);
		}
	}
}
</script>
