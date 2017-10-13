window.onload = function () {
    (function () {
        /****创建状态变量存储每个表单是否通过验证******/
        var status_uname = false,
            status_upwd = false,
            status_upwd_re = false,
            status_check = false,
            status_gree = false;
        var check_status = 0;
        //获取表单元素
        var uname = document.querySelector("#reg li.uname input");
        var upwd = document.querySelector("#reg li.upwd input");
        var upwd_re = document.querySelector("#reg li.upwd_re input");
        var check = document.querySelector("#reg li.check_num input");
        var gree = document.querySelector("#reg li.gree input");
        var check_img = document.querySelector("#reg li.check_num>em>img");
        var em = document.querySelector("#reg li.check_num>em");
        var p = document.querySelector("#reg li.check_num>p");
        var btn_reg = document.querySelector("#reg li.btn_reg>input");
        //创建验证的正则表达式
        //用户名正则
        var reg_uname = /(^\d{11}$)|(^\w+@[A-Za-z0-9]+(.com)$|(.com.cn)$)/;
        //密码正则
        var reg_pwd = /^[A-Za-z0-9]{6,16}$/;
        //存储验证码
        var check_num = "";
        //数据库中验证码的行数
        var cid_len = 0;
        /****获取数据库行数*****/
        (function () {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    cid_len = xhr.responseText;
                }
            };
            xhr.open("GET", "data/yys_reg_sel_count.php", true);
            xhr.send(null);
        })();
        /****随机生成验证码图片(从数据库获取)****/
        function randomCheck() {
            var n = parseInt(Math.random() * cid_len + 1);
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var result = JSON.parse(xhr.responseText);
                    console.log(result);
                    var img_src = "img/check_num/" + result.pic;
                    console.log(img_src);
                    check_img.src = img_src;
                    check_num = result['check_num'];
                    isCheck(check);
                }
            };
            xhr.open("GET", "data/yys_reg_sel_checknum.php?cid=" + n, true);
            xhr.send(null);
        }

        /*****验证码验证函数*****/
        function isCheck(ele) {
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

        //验证函数
        function name_pwd_check(ele, str, reg) {
            if (reg.test(str) === true) {
                ele.parentElement.parentElement.lastElementChild.className = "gou";
                return true;
            } else {
                if (str === "")
                    ele.parentElement.parentElement.lastElementChild.className = "";
                else
                    ele.parentElement.parentElement.lastElementChild.className = "cha";
                return false;
            }
        }

        /*********验证用户名**********/
        uname.onkeyup = function () {
            var str = this.value;
            status_uname = name_pwd_check(this, str, reg_uname);
            if (status_uname === true) {
                console.log("验证是否存在");
                var that = this;
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        var result = JSON.parse(xhr.responseText);
                        var eleI = that.parentElement.parentElement.lastElementChild;
                        console.log(result.code);
                        if (result.code === 1) {
                            eleI.className = "gou";
                            eleI.innerHTML = "用户名可用";
                            status_name = true;
                        }
                        if (result.code === 0) {
                            console.log(result.msg);
                            eleI.className = "cha";
                            eleI.innerHTML = "用户名已被注册";
                            status_name = false;
                        }
                    }
                };
                xhr.open("POST", "data/check_name.php", true);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.send("uname=" + uname.value);
            }

        };
        /*********验证密码**********/
        upwd.onkeyup = function () {
            var str = this.value;
            status_upwd = name_pwd_check(this, str, reg_pwd);
        };
        /********确认密码*********/
        upwd_re.onkeyup = function () {
            var str = this.value;
            var upwd_str = upwd.value;
            if (str === upwd_str) {
                status_upwd_re = name_pwd_check(this, str, reg_pwd);
            } else {
                status_upwd_re = false;
                if (str === "")
                    this.parentElement.parentElement.lastElementChild.className = "";
                else
                    this.parentElement.parentElement.lastElementChild.className = "cha";
            }
        };
        check.onfocus = function () {
            /***随机生成验证码图片****/
            if (check_status === 0) {
                randomCheck();
                em.style.display = "block";
                p.style.display = "block";
                check_status = 1;
            }
        };
        /******验证验证码******/
        check.onkeyup = function () {
            isCheck(this);
        };
        p.onclick = function () {
            randomCheck();
        };
        //验证是否阅读协议
        gree.onclick = function () {
            if (gree.checked === true) {
                document.querySelector("#reg li.gree>i").className = "gou";
                status_gree = true;
            }
            else {
                document.querySelector("#reg li.gree>i").className = "cha";
                status_gree = false;
            }
        };
        /*******注册按钮************/
        btn_reg.onclick = function () {
            //所有都验证都通过发送到数据库
            if (status_uname && status_upwd && status_upwd_re && status_check && status_gree) {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        var result = JSON.parse(xhr.responseText);
                        console.log(typeof result.code);
                        if (result.code === 1) {
                            var eleP = document.querySelector("#reg p.succ");
                            eleP.style.display = "block";
                            document.querySelector("#reg div.reg_wrap>ul").style.display = "none";
                            var t = 3;
                            eleP.innerHTML = "注册成功," + t + "s后跳转到登录页面";
                            var timer = setInterval(function () {
                                t -= 1;
                                eleP.innerHTML = "注册成功," + t + "s后跳转到登录页面";
                                if (t <= 0) {
                                    clearInterval(timer);
                                    timer = null;
                                    // sessionStorage['yys_uname'] = uname.value;
                                    // sessionStorage['yys_upwd'] = upwd.value;
                                    location.href = "../yys_login/login.html";
                                }
                            }, 1000);
                        }
                    }
                };
                xhr.open("POST", "data/yys_reg.php", true);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.send("uname=" + uname.value + "&upwd=" + upwd.value);
            }

        }

    })();
};