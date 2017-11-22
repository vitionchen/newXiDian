<template>
  <div>
    <div class="content-item">
      <p class="item-title">全部分类</p>
      <div class="classify">
        <div class="classify-item" v-for='item in classifyFirst' @click="turnClassify(item.id,item.text)">
          <img :src='item.img'/>
          <p>{{item.text}}</p>
        </div>
      </div>
      <div class="classify">
        <div class="classify-item" v-for='item in classifySecond' @click="turnClassify(item.id,item.text)">
          <img :src='item.img'/>
          <p>{{item.text}}</p>
        </div>
      </div>
    </div>
    <div class="grey-line"></div>
    <div class="content-item">
        <p class="item-title">最新讲话</p>
        <p class="item-list" v-for="item in newList" @click="readArticle(item)">{{item.title}}{{'['+item.createTime+']'}}</p>
        <div class="loading" v-if="!newList.length&&(loadState==0)">
            <div class="loading-item"></div>
            <p class="loading-text">正在加载...</p>
            <div class="clear"></div>
        </div>
        <div class="reload-box" v-if="loadState==2" @click="getNew()">
          <img :src="reloadImg">
          <div class="reload">网络开小差，点击重新加载</div>
        </div>
    </div>
  </div>
</template>
<script>
import mainJs from '../../js/main';
import fetchMethod from '../../js/fetch';
// 分类图片
import economyImg from '../../img/economy.png';
import politicsImg from '../../img/politics.png';
import cultureImg from '../../img/culture.png';
import societyImg from '../../img/society.png';
import ecologyImg from '../../img/ecology.png';
import partyImg from '../../img/party.png';
import armyImg from '../../img/army.png';
import diplomacyImg from '../../img/diplomacy.png';
import reloadImg from '../../img/reload.png';

const getNewActicle=(self)=>{
    fetchMethod('getRecentXiyu','get',{},function(data){
      self.loadState=1;
      for(let i = 0 ; i < data.list.length ; i++){
        data.list[i].createTime = data.list[i].createTime ? data.list[i].createTime.split(' ')[0] : '';
      }
      self.newList=data.list;
    },()=>{self.loadState=2;})
}
export default {
  data(){
      return {
          reloadImg,
          classifyFirst:[
                {img:economyImg,text:'经济',id:mainJs.idArr[0]},
                {img:politicsImg,text:'政治',id:mainJs.idArr[1]},
                {img:cultureImg,text:'文化',id:mainJs.idArr[2]},
                {img:societyImg,text:'社会',id:mainJs.idArr[3]}
            ],
            classifySecond:[
                {img:ecologyImg,text:'生态',id:mainJs.idArr[4]},
                {img:partyImg,text:'党建',id:mainJs.idArr[5]},
                {img:armyImg,text:'国防',id:mainJs.idArr[6]},
                {img:diplomacyImg,text:'外交',id:mainJs.idArr[7]}
            ],
            newList:[],
            loadState:0
            // loadFail:false
        }
  },
  mounted(){
    let self = this;
    getNewActicle(self);
  },
  methods:{
    turnClassify(id,text){
      this.$router.push({path:'classify',query:{'id':id,text:text}})
    },
    readArticle(item){
      try{
        SecrectActivity.getVersionCode();
        this.$router.push({path:'article',query:{id:item.fileId,title:item.title,source:item.source,createTime:item.createTime}})
      }catch(e){
        this.$router.push({path:'article',query:{id:item.fileId}})
      }
    },
    getNew(){
      if(this.loadState !== 2)return;
      this.loadState=0;
      getNewActicle(this);
    }
  }
}
</script>
