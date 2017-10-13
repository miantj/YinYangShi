window.onload = function () {
    /***页面加载完成调用二维码登录区域动画****/
    var qr_code = document.querySelector("#login aside.login_erweima");
    qr_code.className += " active";
    /*****表单区域表单验证*****/
    (function () {
        /****每个表单创建一个变量记录每个表单是否通过验证****/
        var status_name = false,
            status_pwd = false,
            status_check = false;
        var uname = document.getElementById("uname"),
            upwd = document.getElementById("upwd"),
            check = document.getElementById("check_input"),
            rem = document.getElementById("rem");
        var span = document.querySelector("#login li.check>span");
        var check_img = document.querySelector("#login li.check>span>img");
        var cid_len = 0;//数据库行数
        var check_num = '';//保存验证码
        var check_status = 0;//保存是否已显示验证码，0为否
        var p = document.querySelector("#login li.check>p");
        //用户名正则
        var reg_uname = /(^\d{11}$)|(^\w+@[A-Za-z0-9]+(.com)$|(.com.cn)$)/;
        //密码正则
        var reg_pwd = /^[A-Za-z0-9]{6,}$/;
        //存储验证码
        var check_num = "";

        /**********自动填写保存的账号密码********/
        var xhr=new XMLHttpRequest();
        xhr.onreadystatechange=function(){
            if(xhr.readyState===4&&xhr.status===200){
                var result=JSON.parse(xhr.responseText);
                if(result.uname&&result.upwd){
                    console.log(result.name);
                    uname.value = result.uname;
                    status_name = true;
                    uname.parentElement.lastElementChild.className = "gou";
                    upwd.value = result.upwd;
                    status_pwd = true;
                    upwd.parentElement.lastElementChild.className = "gou";
                }
            }
        };
        xhr.open('GET','data/loginInfo.php',true);
        xhr.send(null);
        /*
        if (sessionStorage['yys_uname'] && sessionStorage['yys_upwd']) {
            console.log("sess");
            uname.value = sessionStorage['yys_uname'];
            status_name = true;
            uname.parentElement.lastElementChild.className = "gou";
            upwd.value = sessionStorage['yys_upwd'];
            status_pwd = true;
            upwd.parentElement.lastElementChild.className = "gou";
        } else if (localStorage['yys_uname'] && localStorage['yys_upwd']) {
            console.log("local");
            uname.value = localStorage['yys_uname'];
            status_name = true;
            uname.parentElement.lastElementChild.className = "gou";
            upwd.value = localStorage['yys_upwd'];
            status_pwd = true;
            upwd.parentElement.lastElementChild.className = "gou";
        }
        */
        /**********结束****************/

        /****获取数据库行数*****/
        (function () {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    cid_len = xhr.responseText;
                    //console.log(cid_len);
                }
            };
            xhr.open("GET", "data/yys_login_sel_count.php", true);
            xhr.send(null);
        })();
        /****随机生成验证码图片(从数据库获取)****/
        function randomCheck() {
            var n = parseInt(Math.random() * cid_len + 1);
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var result = JSON.parse(xhr.responseText);
                    //console.log(result);
                    var img_src = "img/check_num/" + result['pic'];
                    check_img.src = img_src;
                    check_num = result['check_num'];
                    isCheck(check);
                }
            };
            xhr.open("GET", "data/yys_login_sel_checknum.php?cid=" + n, true);
            xhr.send(null);
        }

        /*****验证码验证函数*****/
        function isCheck(ele) {
            console.log("come");
            if (ele.value.toUpperCase() === check_num) {
                //console.log(ele.parentElement.parentElement.lastElementChild);
                ele.parentElement.parentElement.lastElementChild.className = "gou";
                status_check = true;
            } else {
                //console.log(ele.parentElement.parentElement.lastElementChild);
                ele.parentElement.parentElement.lastElementChild.className = "";
                status_check = false;
            }
        }

        /*****监听事件*****/
        uname.onkeyup = function () {
            console.log(reg_uname.test(this.value));
            if (reg_uname.test(this.value) === true) {
                this.parentElement.lastElementChild.className = "gou";
                status_name = true;
            } else {
                status_name = false;
                // this.parentElement.lastElementChild.innerHTML="";
                if (uname.value === '') {
                    this.parentElement.lastElementChild.className = "";
                } else {
                    this.parentElement.lastElementChild.className = "cha";
                }
            }
        };
        upwd.onkeyup = function () {
            if (reg_pwd.test(this.value) === true) {
                status_pwd = true;
                this.parentElement.lastElementChild.className = "gou";
            } else {
                status_pwd = false;
                if (this.value === '') {
                    this.parentElement.lastElementChild.className = "";
                } else {
                    this.parentElement.lastElementChild.className = "cha";
                }
            }
        };
        check.onfocus = function () {
            /***随机生成验证码图片****/
            if (check_status === 0) {
                randomCheck();
                span.style.display = "block";
                p.style.display = "block";
                check_status = 1;
            }
        };
        check.onkeyup = function () {
            isCheck(this);
        };
        /******换一张验证码*****/
        var qiehuan = document.querySelector("#login li.check>p");
        qiehuan.onclick = function () {
            randomCheck();
        };
        /******记住我模块*****/
        rem.onclick = function () {
            console.log(rem.checked);
        };

        /*********记住我模块结束*******/
        /*****登录事件****/
        var btn_login = document.querySelector("#login li.btn>input.btn_login");
        btn_login.onclick = function () {
            if (status_check === true && status_name === true && status_pwd === true) {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {

                        var result = JSON.parse(xhr.responseText);
                        console.log(result);
                        if (result.code== '1') {
                            var eleP = document.querySelector("#login aside.login_input>p.succ");
                            var t = 3;
                            document.querySelector("#login aside.login_input>ul").style.display = "none";
                            eleP.innerHTML = "登陆成功," + t + "s后跳转到主页";
                            /********是否勾选记住我*********/
                            /*
                            if (rem.checked === true) {
                                localStorage['yys_uname'] = uname.value;
                                localStorage['yys_upwd'] = upwd.value;
                            } else {
                                localStorage.removeItem('yys_uname');
                                localStorage.removeItem('yys_upwd');
                            }
                            */
                            /********结束***********/
                            var timer = setInterval(function () {
                                t -= 1;
                                eleP.innerHTML = "登陆成功," + t + "s后跳转到主页";
                                if (t <= 0) {
                                    clearInterval(timer);
                                    timer = null;
                                    /*************增加uid***************/

                                    /**************************************/
                                    location.href = "../index.html";
                                }
                            }, 1000);
                            eleP.style.display = "block";

                            console.log("登陆成功");
                        } else {
                            document.querySelector("#login span.err").style.display = "block";
                            console.log("登录失败");
                        }
                    }
                };
                xhr.open("POST", "data/yys_login.php", true);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.send("uname=" + uname.value + "&upwd=" + upwd.value);
            }

        }
    })();
}
