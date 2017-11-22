var xmlHttp;

var myGetData=function(getData){
    var getSendData="";
    for(var key in getData){
        getSendData+=key+'='+ encodeURIComponent(getData[key])+"&";
    }
    getSendData =  getSendData.substring(0,getSendData.length-1);
    return getSendData;
}

function createxmlHttp()//创建xmlHttp对象；
{
    if(window.ActiveXObject)
    {
        xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    else
    {
        xmlHttp=new XMLHttpRequest();
    }
}

function createRequest(url,type,sendData,sucFuc)//向服务器发出请求也就是向Default.aspx页面发出请求；
{
    if(type=='get'){
        sendData=myGetData(sendData);
        url+='?'+sendData;
    }
    createxmlHttp();
    xmlHttp.open(type,url,true);
    xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");
    xmlHttp.onreadystatechange = function() {
        if(xmlHttp.readyState==4){
            if(xmlHttp.status==200){
                sucFuc(xmlHttp.responseText);
            }
        }
    }
    xmlHttp.send(sendData);
}

export default createRequest;