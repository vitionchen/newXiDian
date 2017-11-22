<template>
    <div class="search-result" v-scroll="getList">
        <div class="content-item pt15" v-if="searchList.length">
            <p class="item-list" v-for="item in searchList" @click='turnToArticle(item)'>{{item.title+' ['+item.createTime+']'}}</p>
        </div>
        <div class="loading" v-if="loadState==1">
            <div class="loading-item"></div>
            <p class="loading-text">正在加载...</p>
            <div class="clear"></div>
        </div>
        <div class="unsearch" v-if="!searchList.length&&loadState==2">
            <img :src='noResult'/>
            <p>暂未收录相关讲话，换个关键词试试吧</p>
        </div>
    </div>
</template>

<script>
import noResult from '../../img/no-result.png';
import fetchMethod from '../../js/fetch';
const loadSearch = (text,self,newSearch) =>{
    let getData = {
		pageSize:20,
		pageIndex:self.searchNum||self.$data.searchNum,
		keyword:text
    }
    self.loadState=1;
    fetchMethod('search/xiyuSearch','get',getData,function(data){
        if(text !== self.searchText)return;
        console.log(self);
        if(newSearch)self.$data.searchList.length=0;
        if(data.data.code){
            self.loadState=2;
            return;
        }
        let result = data.data;
        let len = data.data.list.length;
        for(let i = 0 ; i < len ; i++){
            result.list[i].createTime = result.list[i].createTime ? result.list[i].createTime.split(' ')[0] : '';
        }
        if(self.searchNum){
            self.searchNum+=1;
        }
        if(self.loadState)self.loadState=len<20?3:0;
        if(self.searchList&&len>0)self.searchList.push(...result.list);
	},()=>{
        setTimeout(function(){
            self.loadState=0;
        },3000)
    })
}
export default {
    props:['searchText'],
    data(){
        return{
            noResult,
            searchNum:1,
            searchList:[],
            loadState:0,
            loadingMore:true
        }
    },
    mounted(){
        loadSearch(this.searchText,this)
    },
    methods:{
        searchDeed(text){
            this.$data.searchNum=1;
            this.$data.loadState=0;
            this.$data.searchList.length=0;
            this.$data.loadingMore=true;
            loadSearch(text,this,true);
        },
        getList(){
            if(this.loadState)return;
            if(this.searchNum==1)this.searchNum+=20;
            loadSearch(this.searchText,this)
        },
        turnToArticle(item){
            try{
                SecrectActivity.getVersionCode();
                this.$router.push({path:'/article',query:{id:item.fileId,title:item.title,source:item.releaseSource,createTime:item.createTime}})
            }catch(e){
                this.$router.push({path:'article',query:{id:item.fileId}})
            }
        }
    },
  directives:{
      'scroll'(el,binding){
          el.addEventListener('scroll',e=>{
              let ownHeight=el.firstChild.clientHeight;
              let scrollBottom=ownHeight-el.clientHeight-el.scrollTop;
              if(scrollBottom<10)binding.value();
          })
      }
  }
}
</script>
    