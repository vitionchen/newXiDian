
// import xdShareIcon from 'http://devstatic.nfapp.southcn.com/hd/newXiDian/share_logo.jpg';
// const xdShareIcon = 'https://testdangfei.nfapp.southcn.com/Vson/XDspeech/XDshare/img/share_logo.png';
const xdShareIcon ='https://static.nfapp.southcn.com/hd/XDspeech/XDshare/img/share_logo.png';
// const baseUrl = 'https://devapi.nfapp.southcn.com/nanfang_if/';         //开发
// const baseUrl = 'https://testapi.nfapp.southcn.com/nanfang_if/';            //测试
const baseUrl = 'https://api.nfapp.southcn.com/nanfang_if/';            //正式
// const shareIndex = 'https://devstatic.nfapp.southcn.com/hd/newXiDian/XDshare/index.html';         //分享首页
// const shareArticle = 'https://devstatic.nfapp.southcn.com/hd/newXiDian/XDshare/shareArticle.html';         //分享首页
// const shareIndex = 'https://testdangfei.nfapp.southcn.com/Vson/XDspeech/XDshare/index.html';         //分享首页
// const shareArticle = 'https://testdangfei.nfapp.southcn.com/Vson/XDspeech/XDshare/shareArticle.html';         //分享文章页
const shareIndex = 'https://static.nfapp.southcn.com/hd/XDspeech/XDshare/index.html';         //分享首页
const shareArticle = 'https://static.nfapp.southcn.com/hd/XDspeech/XDshare/shareArticle.html';         //分享文章页
// const shareIndex = 'https://static.nfapp.southcn.com/hd/XDspeech/XDshare/index.html#/';         //分享文章页


// 测试

// 外交	2361
// 国防	2360
// 党建	2359
// 生态	2358
// 社会	2357
// 文化	2356
// 政治	2355
// 经济	2354

// 开发

// 外交	2082
// 国防	2081
// 党建	2080
// 生态	2079
// 社会	2078
// 文化	2077
// 政治	2076
// 经济	2075

// 正式

// 习典 4617 
// 经济4618 
// 政治4619 
// 文化4620 
// 社会4621 
// 生态4622 
// 党建4623 
// 国防4624 
// 外交4625
// let idArr=[2075,2076,2077,2078,2079,2080,2081,2082]    //开发
// let idArr=[2354,2355,2356,2357,2358,2359,2360,2361]       //测试
let idArr=[4618,4619,4620,4621,4622,4623,4624,4625]    //正式
const shareDeed=(shareJson)=>{
    //分享
    var shareUrl = shareJson.url;
    var shareIcon = xdShareIcon;
    var shareTitle = shareJson.title;
    var shareDesc = shareJson.desc;
    window.getShareUrl=function(){
        return shareUrl;
    }
    window.getShareDesc=function(){
        return shareDesc;
    }
    window.getShareIcon=function(){
        return shareIcon;
    }
    window.getShareTitle=function(){
        return shareTitle;
    }
    window.getShareObj=function(){
        window.activity.getShareUrl(shareUrl);
        window.activity.getShareDesc(shareDesc);
        window.activity.getShareTitle(shareTitle);
        window.activity.getShareIcon(shareIcon);
    }
}

export default {
    shareDeed,
    baseUrl,
    shareIndex,
    shareArticle,
    idArr,
    xdShareIcon
}