window.onload = function () {
    /****************定义同人专区异步加载函数***********/
    function addIterm(lid, for_back_status, rotate_status) {
        var status = for_back_status;
        var rStatus = rotate_status == 0 ? 1 : 0;
        var progress = 0;
        if (status === 1) {
            var ele = document.querySelectorAll("#tongren div.tongren-item>a.backward>img");
            status = 0;
        }
        else {
            var ele = document.querySelectorAll("#tongren div.tongren-item>a.forward>img");
            status = 1;
        }
        //翻转函数
        function createRote() {
            var iterms = document.querySelectorAll("#tongren div.tongren-item");
            var iterms_num = [];
            var iterms_delay = [];

            function rn(min, max) {
                return Math.floor(Math.random() * (max - min) + min);
            }

            function createDelay(eles, arr) {
                for (var i = 0; i < eles.length; i++) {
                    arr.push(i * 50);
                }
            }

            function createNum(eles, arr) {
                for (var i = 0; i < eles.length; i++) {
                    var n = rn(0, eles.length);
                    if (arr[n] == undefined) {
                        arr[n] = i;
                    } else {
                        i--;
                    }
                }
            }

            function addRotate(eles, arr1, arr2) {
                for (var i = 0; i < eles.length; i++) {
                    // eles[arr1[i]].firstElementChild.style.transitionDelay = arr2[i] + "ms";
                    // eles[arr1[i]].lastElementChild.style.transitionDelay = arr2[i] + "ms";
                    if (rotate_status === 0) {
                        eles[i].className += " active";

                    }
                    else {
                        eles[i].className = "tongren-item";
                    }

                }
                if (rotate_status === 0)
                    rotate_status = 1;
                else
                    rotate_status = 0;
            }

            function start() {
                // createNum(iterms, iterms_num);
                // createDelay(iterms, iterms_delay);
                addRotate(iterms, iterms_num, iterms_delay);
                //避免死循环
            }

            start();
        }

        createRote();
        function insertIterm(arr, ele) {
            for (let i = 0; i < ele.length || i < arr.length; i++) {
                ele[i].src = "images/tongren/" + arr[i].pic;
                ele[i].alt = arr[i].name;
                ele[i].nextElementSibling.innerHTML = arr[i].content;
                // ele[i].onload=function(){
                //     progress++;
                //     if(progress===ele.length){
                //         createRote();
                //     }
                // }
            }
        }

        //异步请求数据
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var result = JSON.parse(xhr.responseText);
                insertIterm(result, ele);

            }
        };
        xhr.open("POST", "data/tongren_select.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("lid=" + lid);
        /************异步结束******************/
        return [status, rStatus];//每次都修改状态值
    }

    /****************同人函数结束***********************/
    /****************显示用户信息*****************/
    (function () {
        var user_info = document.querySelector('#top .user_info');
        var user_name = document.querySelector('#top .user_name');
        var lv_info = document.querySelector('#top .lv_bar_info');
        var user_header = user_info.querySelector('.user_header>img');
        var user_center = document.querySelector('#top .user_center');
        var lv_num = document.querySelector('#top .lv_num');
        var isVip = document.querySelector('#top .vip');
        var lv = document.querySelector('#top .lv');
        var btn_user_exit=document.querySelector('#top .user_exit');
        var lv_imgPos = ["-153px -9px", "-153px -44px", "-153px -80px", "-153px -115px", "-153px -150px", "-153px -185px", "-153px -220px"];
        var lv_num_arr = [0, 10000, 20000, 40000, 80000, 16000, 32000, 64000];

        var btn_login=document.querySelector('#top .btn_login');
            //跳转到个人中心
        user_center.onclick = function () {
            console.log('to user_center');
            open('yys_user/user_center.html','_blank');
        };
        btn_user_exit.onclick=function(e){
            e.preventDefault();
            var url='data/clearInfo.php';
            var data={};
            var type="GET";
            function clearInfo(){
                user_info.innerHTML="";
                user_info.style.visibility = "hidden";
                btn_login.style.display="flex";
                console.log('clear success');
            }
            getData(url,data,type,clearInfo);
            // var date=new Date();
            // date.setTime(date.getTime()-10000000);
            // var reg=new RegExp("(^| )"+"PHPSESSID"+"=([^;]*)(;|$)");
            // console.log(document.cookie.match(reg));
            // var cval=document.cookie.match(reg)[2];
            // console.log(cval);
            // console.log(date.toGMTString());
            // if(cval!=null){
            //     console.log('expires');
            //     //注意：删除cookie必须在同一域下才能覆盖原来的，由于PHPSESSID的path=/，而默认设置的cookie为
            //     // 当前域名如yys...等
            //     console.log("PHPSESSID="+cval+";expires="+date.toGMTString()+";path=/");
            //     document.cookie="PHPSESSID="+cval+";expires="+date.toGMTString()+";path=/";
            //     user_info.innerHTML="";
            //     user_info.style.visibility = "hidden";
            //     btn_login.style.display="flex";
            // }
        };
        //跳转到个人中心结束

        //获取个人信息
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var result = JSON.parse(xhr.responseText);
                if (result.uname) {
                    user_name.innerHTML = result.uname;
                    user_header.src = "images/user_info/" + result.pic;
                    if (result.vip) {
                        isVip.style.display = "block";
                    }
                    /*****等级相关*****/
                    for (var i = 1; i < lv_num_arr.length; i++) {
                        if (result.lv < lv_num_arr[i]) {
                            console.log(result.lv);
                            lv_num.innerHTML =
                                `
                                    <span>${result.lv}</span>/${lv_num_arr[i]}
                                `;
                            lv.style.backgroundPosition = lv_imgPos[i - 1];
                            var lv_width=100*(result.lv-lv_num_arr[i-1])/(lv_num_arr[i]-lv_num_arr[i-1]);
                            lv_info.style.width=lv_width+"%";
                            break;
                        }
                    }
                    /*****等级结束******/
                    btn_login.style.display="none";
                    user_info.style.visibility = "visible";
                }
            }
        };
        xhr.open('GET', 'data/loginInfo.php', true);
        xhr.send(null);
    })();
    /****************显示用户信息结束**************/
    /********导航条和logo显示效果和底部下载二维码弹出效果(反正就是scroll所有事件)*****/
    (function () {
        var navbar = document.querySelector("#top div.nav-bar");
        var logo = document.querySelector("#top div.logo");
        var scroll_t = document.body.scrollTop;//获取初始位置
        var d_top = document.getElementById("downLoad").offsetTop;//底部download元素到顶部距离
        //获取底部动画元素
        var tongren_top = document.getElementById("tongren").offsetTop;
        var tongren_status = 1;//只执行一次初始化
        var d_a = document.querySelector("#downLoad>a");

        //页面初次加载判断是否在同人专区模块
        (function(){
            var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            if (scrollTop > (tongren_top - window.innerHeight + 100) && tongren_status === 1) {
                addIterm(1, 0);//调用函数
                tongren_status = 0;
            }
        })();

        window.onscroll = function () {
            var innerh = window.innerHeight;
            //显示与隐藏
            var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            if (scrollTop > 100) {
                navbar.style.opacity = 0;
                logo.className = "logo hide";
            } else {
                navbar.style.opacity = 1;
                logo.className = "logo";
            }
            //显示与隐藏结束
            //固定定位，判断是否往上滚
            if (scrollTop > innerh && scrollTop < scroll_t) {
                navbar.style.opacity = 1;
                navbar.style.position = "fixed";
                navbar.className = "nav-bar show";
            } else {
                navbar.style.position = "";
                navbar.className = "nav-bar";
            }
            //同人专区加载图片
            if (scrollTop > (tongren_top - window.innerHeight + 100) && tongren_status === 1) {
                addIterm(1, 0);//调用函数
                tongren_status = 0;
            }
            //同人专区加载图片结束
            //底部二维码弹出效果,100为修正值
            if (scrollTop > (d_top - window.innerHeight + 100)) {
                d_a.className += " active";
            } else {
                d_a.className = "";
            }
            //底部二维码弹出效果结束
            //记录scrolltop位置用于判断
            scroll_t = scrollTop;
        };
    })();
    /*********导航条和logo显示效果结束*********/
    /**********导航条楼层跳转*********/
    (function () {
        var timer = null;
        var nav_ul = document.querySelector("#top>div.nav-bar ul");
        nav_ul.addEventListener("click", function (e) {
            if (e.target.getAttribute("data-toggle") === "jump") {
                e.preventDefault();
                clearTimeout(timer);
                timer = null;
                var jump_id = e.target.getAttribute("href").split("#")[1];
                var jump_dir = document.getElementById(jump_id);
                //获取跳转元素的高度
                var jump_h = jump_dir.offsetTop;
                //获取当前scroll位置
                var scroll_h = document.body.scrollTop || document.documentElement.scrollTop;
                if (jump_h > scroll_h) {
                    timer = setInterval(function () {
                        if (scroll_h < jump_h - 100) {
                            scroll_h += 10;
                            document.body.scrollTop = scroll_h;
                            if (!document.body.scrollTop)
                                document.documentElement.scrollTop = scroll_h;
                        } else {
                            clearInterval(timer);
                            timer = null;
                        }
                    }, 1);
                }
                if (jump_h < scroll_h) {
                    timer = setInterval(function () {
                        if (scroll_h > jump_h - 100) {
                            scroll_h -= 10;
                            document.body.scrollTop = scroll_h;
                            if (!document.body.scrollTop)
                                document.documentElement.scrollTop = scroll_h;
                        } else {
                            clearInterval(timer);
                            timer = null;
                        }
                    }, 1);
                }
            }
        })
    })();
    /*********导航条楼层跳转结束**********/
    /**********返回到顶部**************************/
    (function () {
        var toTop = document.querySelector("#contact a.to-top");
        toTop.onclick = function (e) {
            e.preventDefault();
            var h = document.body.scrollTop || document.documentElement.scrollTop;
            var timer = setInterval(function () {
                h <= 10 ? h = 0 : h -= 30;
                document.body.scrollTop = h;
                if (!document.body.scrollTop)
                    document.documentElement.scrollTop = h;
                if (h <= 0) {
                    clearInterval(timer);
                    timer = null;
                }
            }, 1);
        }
    })();
    /*************返回顶部结束****************/
    //banner底部下载模块
    (function () {
        var top = document.getElementById("top");
        var downloadClose = document.querySelector("a.download-close");
        var downloadWrap = downloadClose.parentNode;
        //给按钮添加点击事件
        downloadClose.onclick = function (e) {
            //阻止默认行为
            e.preventDefault();
            //判断class是否有close
            var str = downloadWrap.className;
            var i = str.search(/\s?close\s?/);
            if (i == -1) {
                downloadWrap.className += " close";
            } else {
                str = str.replace(/\s?close\s?/, "");
                downloadWrap.className = str;
            }
        }
    })();
    //banner底部下载模块结束

    //左侧小广告轮播
    /*******左侧图片轮播******/
    (function () {
        var timer = null, index = 0, show = 0;
        var status = 0, mouseoverStatus = 1, ismouseout = 0, btn_on_num = 0;
        var as = document.querySelectorAll("#left-news div.news-banner-wrap>a");//图片
        var btns = document.querySelectorAll("#left-news div.news-banner-nav>a");
        var btn_father = document.querySelector("#left-news div.news-banner-nav");
        var wrap = document.querySelector("#left-news div.news-banner-wrap");

        /*****动态添加图片、按钮(后期从数据库获取json)*******/
        function move() {
            if (status === 0) {
                index < as.length - 1 ? index++ : index = 0;
            }
            as[index].className += " next";
            // console.log(index);
            if (index > show || (index === 0 && show === 5)) {//条件有问题
                wrap.className += " lt";
            } else {
                as[index].style.left = "-360px";
                wrap.className += " rt";
            }
        }

        /*************添加动画完成事件***************/
        wrap.addEventListener("animationend", function () {
            this.className = this.className.replace(/(\slt)|(\srt)/ig, "");
            as[show].className = as[show].className.replace(/\sshow/ig, "");
            as[index].className = as[index].className.replace(/\snext/ig, " show");
            as[index].style.left = "";
            btns[show].className = "";
            btns[index].className = "on";
            btn_on_num = index;
            show = index;
            status = 0;
        });
        btn_father.addEventListener("mouseover", function (e) {
            e.preventDefault();
            if (e.target.nodeName === "A") {
                //当前按钮序号
                var btn_num = parseInt(e.target.href.split("#")[1]);
                //防止重复触发
                if ((status === 0) && (btn_num != btn_on_num)) {
                    btn_on_num = btn_num;
                    clearTimeout(timer);
                    timer = null;
                    index = btn_num;
                    status = mouseoverStatus;
                    ismouseout = 1;//只有触发了mouseover才能触发mousout
                    move();
                }
            }
        });
        btn_father.addEventListener("mouseout", function (e) {
            e.preventDefault();
            if (e.target.nodeName === "A") {
                //同一个元素只能触发一次mouseover，所以也只能触发一次mousout
                if (ismouseout === 1) {
                    ismouseout = 0;
                    timer = setInterval(move, 2000);
                }
            }
        });
        timer = setInterval(move, 2000);
    })();
    /*******左侧图片轮播结束*******/
    //左侧小广告轮播结束

    //左侧新闻模块
    /*****给新闻内容添加切换效果*******/
    (function () {
        var as = document.querySelectorAll("#news-wrap>div.news-tabs a");
        var newsList = document.querySelector("#news-wrap>div.news-list");
        var showNow = 1;
        var status = 0;//0表示动画结束，1表示动画还在进行
        for (var i = 0; i < as.length; i++) {
            as[i].addEventListener("click", function (e) {
                e.preventDefault();
                if (status === 0) {
                    status = 1;
                    var active = document.querySelector("#news-wrap>div.news-tabs>a.active");
                    var show = document.querySelector("#news-wrap ul.show");//当前显示文本
                    var classFt = active.className.split(" ")[0];//第一个class名
                    var num = this.className.split("-")[1];//点击的序号，用于判断在当前显示文本左右
                    var contentClass = "#news-wrap ul." + this.className.split("-")[0] + "-items";
                    var cont = document.querySelector(contentClass);//对应的文本
                    if (showNow != num) {
                        if (num < showNow) {
                            show.className += " show_rt";
                            cont.className += " rt";
                            showNow = num;
                        } else {
                            show.className += " show_lt";
                            cont.className += " lt";
                            showNow = num;
                        }
                    }
                    //更新active
                    active.className = classFt;
                    this.className += " active";
                    //判断num是否大于showNow

                }
            })
        }
        /******给文本内容添加动画完成事件(利用事件冒泡)****/

        newsList.addEventListener("animationend", function (e) {
            //console.log("动画结束");
            var cName = e.target.className;
            //console.log(cName.search(/(\slt)|(\srt)/ig));
            //console.log("classname" + cName);
            if (cName.indexOf("show") !== -1) {
                e.target.className = cName.split(" ")[0];
                //console.log(e.target);
            } else if (cName.search(/\slt|\srt/ig) !== -1) {
                //console.log("进来了");
                e.target.className = cName.split(" ")[0] + " show";
            }
            status = 0;

        });
    })();
    /**********新闻内容添加切换效果结束*********/

    /*****************式神区域***************/
    (function () {
        var shishen_nav = document.querySelector("#intro-shishen div.shishen-navbar");
        var nav_as = shishen_nav.querySelectorAll("a");
        //添加点击事件
        shishen_nav.onclick = function (e) {
            e.preventDefault();
            if (e.target.nodeName === "A") {
                for (var i = 0; i < nav_as.length; i++) {
                    nav_as[i].className = nav_as[i].className.replace(" active", "");
                }
                e.target.className += " active";
                var rare = e.target.getAttribute("data-rare");
                createShishen(rare);
            }
        }
    })();
    /*****************式神区域结束**********/
    /**********攻略区域*************/
    /*********攻略区域小广告********/
    (function () {
        /*****抖动效果*******/
        var ban_wrap = document.querySelector("#strategy div.strategy-banner-lists");
        var ban_iterms = document.querySelector("#strategy div.strategy-banner-items");
        ban_wrap.onmouseover = function () {
            ban_iterms.className += " active";
        };
        ban_wrap.onmouseout = function () {
            ban_iterms.className = "strategy-banner-items";
        };
        /*********抖动效果结束********/
        /*********小广告轮播**********/
        var as = document.querySelectorAll('#strategy div.strategy-banner-lists>a');
        var btn_wrap = document.querySelector("#strategy div.strategy-nav-btn");

        function createBtn() {
            var html = "";
            for (var i = 0; i < as.length; i++) {
                if (i === 0) {
                    html += `
                            <i data_index="${i}" class="on"></i>
                        `;
                } else {
                    html += `
                        <i data_index="${i}"></i>
                    `;
                }
            }
            btn_wrap.innerHTML = html;
        };
        createBtn();

        var btns = document.querySelectorAll("#strategy div.strategy-nav-btn>i");
        var show = 0;
        var next = 1;
        var isMouseOut = 0;//状态量，判断是否能进行mouseout操作
        function move() {
            (next >= as.length) && (next = 0);
            for (var i = 0; i < as.length; i++) {
                as[i].className = "";
                btns[i].className = "";
            }
            btns[next].className = "on";
            as[next].className = "active";
            show = next;
            next++;
        }

        var timer = setInterval(move, 3000);
        btn_wrap.onmouseover = function (e) {
            if (e.target.nodeName === "I" && e.target.getAttribute('data_index') != show) {
                var btns = document.querySelectorAll("#strategy div.strategy-nav-btn>i");
                for (var i = 0; i < btns.length; i++) {
                    btns[i].className = "";
                }
                e.target.className = "on";
                clearInterval(timer);
                timer = null;
                next = parseInt(e.target.getAttribute('data_index'));
                move();
                isMouseOut = 1;
                /**************未完待续**********/
            }
        };
        btn_wrap.onmouseout = function (e) {
            if (e.target.nodeName === "I" && isMouseOut === 1) {
                timer = setInterval(move, 3000);
                isMouseOut = 0;
            }
        };
        /********小广告轮播*********/
    })();
    /*********攻略区域小广告结束******/
    /**********攻略区域结束*********/
    /*******************同人区域切换******************/
    (function () {
        var navs = document.querySelectorAll("#tongren>nav.tongren-nav>ul>li");
        var show = 1;//默认显示精选推荐的
        var for_back_status = 1;//表示当前显示为正面
        var rotate_status = 0;//表示未翻转
        for (var i = 0; i < navs.length; i++) {
            navs[i].onclick = function (e) {
                e.preventDefault();
                var that = this;
                var lid = parseInt(that.firstElementChild.getAttribute("href"));
                if (lid !== show) {
                    //导航条样式
                    navs[show - 1].className = navs[show - 1].className.replace(' active', '');
                    navs[lid - 1].className += " active";
                    show = lid;
                    /************添加iterm里面信息函数************/
                    var result = addIterm(lid, for_back_status, rotate_status);
                    for_back_status = result[0];
                    rotate_status = result[1];
                }
            }
        }
    })();
    /********************同人区域切换结束*****************/
};