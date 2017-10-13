window.$=function(str){
    return document.querySelectorAll(str).length===1?document.querySelectorAll(str)[0]:document.querySelectorAll(str);
};
/******序列化*******/
function params(obj){
    var str=[];
    for(var key in obj){
        str.push(key+"="+obj[key])
    }
    return str.join('&');
}
/*****序列化结束*****/
/*****xhr请求函数****/
function getData(url,data,type,func){
    var data=params(data);
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(xhr.readyState===4&&xhr.status===200){
            func(xhr.responseText);
        }
    };
    if(type.toUpperCase()==="POST"){
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.open(type,url,true);
        xhr.send(data);
    }
    if(type.toUpperCase()==="GET"){
        xhr.open(type,url+"?"+data,true);
        xhr.send(null);
    }
}
/*****xhr请求函数结束***/
/******日期转化函数输出入（2011-11-11）*****/
 function formatDate(date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;
}
/*****日期转换函数结束******/