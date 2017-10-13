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
/******生成随机数******/
function rn(max,min){
    return parseInt(Math.random()*(max-min)+min);
}
/******生成随机数结束***/
/******生成随机颜色*****/
function rnCol(max,min){
    var r=rn(max,min);
    var g=rn(max,min);
    var b=rn(max,min);
    return "rgb("+r+","+g+","+b+")";
}
/******生成随机颜色结束***/
/******数字保留两位小数***/
function toFix2(num){
    var num=num.toString().split('.');
    if(num[1]){
        if(num[1].length==1){
            num[1]=num[1]+"0";
        }
    }else{
        num[1]="00";
    }
    return parseFloat(num[0]+"."+num[1]).toFixed(2);
}
/******数字保留两位小数结束****/
/******替换class函数******/
function replaceClass(el,className,replaceStr){
    return el.className.replace(className,replaceStr);
    //返回新className
}
/*****替换class函数结束****/
/*****是否具有某个className*****/
function hasClass(el,className){
    return el.className.indexOf(className)>-1?true:false;
}
/*****结束*********************/

