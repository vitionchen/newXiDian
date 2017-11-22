import './less/main';
import Vue from 'vue';
import * as indexComponent from './component/index';
import vueRouter from 'vue-router';
import myRouter from './js/router';
import './js/remDefine.js';
import './js/shareWx';

Vue.use(vueRouter);
const newRouter = new vueRouter(myRouter(Vue));
const index = Vue.extend(indexComponent);

const myVue=new Vue({
    el:"#main",
    router:newRouter,
    render:h=>h(index)
})