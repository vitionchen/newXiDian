import 'whatwg-fetch';
import mainjs from './main';
const myGetData=(getData)=>{
    var getSendData="";
    for(let key in getData){
        getSendData+=key+'='+getData[key]+"&";
    }
    getSendData=getSendData.substring(0,getSendData.length-1);
    return getSendData;
}
const myPostData=(sendData,getData)=>{
    for(let key in getData){
        sendData.append(key,getData[key]);
    }
    return sendData;
}
const myFetch=(portName,type,getData,sucFuc,failFuc)=>{
    let req;
    let myHeaders = new Headers();
    // 处理request参数
    if(type=='form'){
        let sendData=new FormData();
        sendData=myPostData(sendData,getData);
        req=new Request(mainjs.baseUrl+portName,{method:'post',mode:"cors",body:sendData,headers:myHeaders});
    }else if(type=='post'){
        myHeaders.append('Content-Type','application/json; charset=UTF-8');
        req=new Request(mainjs.baseUrl+portName,{method:'post',mode:"cors",body:JSON.stringify(getData),headers:myHeaders});
    }else{
        let sendData=myGetData(getData);
        req=new Request(mainjs.baseUrl+portName+"?"+sendData,{method:'get',mode:"cors",headers: myHeaders});
    }
    fetch(req)
    .then((response)=>{
        if(response.ok) {
            return response.json();
        } else {
            failFuc?failFuc():null;
            console.log('请求不成功');
        }
    })
    .then((json)=>{
        if(json.code==0){
            console.log(json);
            failFuc?failFuc():null;
            return;
        }
        sucFuc(json);
    })
    .catch((error) =>{
        failFuc?failFuc():null;
        console.log('请求异常：' + error.message);
    });
};

export default myFetch;