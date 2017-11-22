<template>
  <div class="router-item">
      <!-- <img v-bind:src="bannerImg" class='banner-img' v-if='showBanner'/> -->
      <router-view class="router-box"></router-view>
  </div>
</template>
<script>
// import banner from '../img/banner.jpg';
export default {
  data(){
    return{
      // bannerImg:banner,
      // showBanner:true
    }
  }
}
</script>
