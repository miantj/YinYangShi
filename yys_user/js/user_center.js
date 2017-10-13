/***********加载页脚**********/
(function () {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var html = xhr.responseText;
            document.getElementById('footer_wrap').innerHTML = html;
        }
    };
    xhr.open('GET', 'tpl/include/footer.html', true);
    xhr.send(null);
})();
/**********加载页脚结束*********/
/*****************************/
window.onload = function () {
    // var uid = 1;//用户id
    var items_count = 0;//记录式神图片层数
    /*********获取用户信息************/
    (function () {
        var user_info = document.querySelector('#top .user_info');
        var user_name = document.querySelector('#top .user_name');
        var lv_info = document.querySelector('#top .lv_bar_info');
        var user_header = user_info.querySelector('.user_header>img');
        var user_center = document.querySelector('#top .user_center');
        var lv_num = document.querySelector('#top .lv_num');
        var isVip = document.querySelector('#top .vip');
        var lv = document.querySelector('#top .lv');
        var btn_user_exit = document.querySelector('#top .user_exit');
        var lv_imgPos = ["-153px -9px", "-153px -44px", "-153px -80px", "-153px -115px", "-153px -150px", "-153px -185px", "-153px -220px"];
        var lv_num_arr = [0, 10000, 20000, 40000, 80000, 16000, 32000, 64000];

        var content_uname = $('#content .uname>b');
        var content_headerImg = $('#content .header_img>img');
        var content_vip = $('#content .uname>span');
        var content_lv_text = $('#content .lv_text');
        var content_lv_info = $('#content .bar_info');
        var content_lv_num = $('#content .lv_num');


        //跳转到个人中心
        user_center.onclick = function () {
            open('yys_user0618/user_center.html', '_blank');
        };
        btn_user_exit.onclick = function (e) {
            e.preventDefault();
            var date = new Date();
            date.setTime(date.getTime() - 10000000);
            var reg = new RegExp("(^| )" + "PHPSESSID" + "=([^;]*)(;|$)");
            var cval = document.cookie.match(reg)[2];
            if (cval != null) {
                //注意：删除cookie必须在同一域下才能覆盖原来的，由于PHPSESSID的path=/，而默认设置的cookie为
                // 当前域名如yys...等
                document.cookie = "PHPSESSID=" + cval + ";expires=" + date.toGMTString() + ";path=/";
                user_info.innerHTML = "";
                user_info.style.visibility = "hidden";
                window.location.href = '../index.html';
            }
        };
        //跳转到个人中心结束

        //获取个人信息
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var result = JSON.parse(xhr.responseText);
                if (result.uname) {
                    uid=result.uid;
                    user_name.innerHTML = result.uname;
                    content_uname.innerHTML = result.uname;
                    user_header.src = "images/user_info/" + result.pic;
                    content_headerImg.src = "images/user_info/" + result.pic;
                    if (result.vip) {
                        isVip.style.display = "block";
                        content_vip.style.display = "inline-block";
                    }
                    /*****等级相关*****/
                    for (var i = 1; i < lv_num_arr.length; i++) {
                        if (result.lv < lv_num_arr[i]) {
                            lv_num.innerHTML =
                                `
                                    <span>${result.lv}</span>/${lv_num_arr[i]}
                                `;
                            content_lv_num.innerHTML =
                                `
                                    <span>${result.lv}</span>/${lv_num_arr[i]}
                                `;
                            lv.style.backgroundPosition = lv_imgPos[i - 1];
                            content_lv_text.innerHTML = 'LV' + (i - 1);
                            var lv_width = 100 * (result.lv - lv_num_arr[i - 1]) / (lv_num_arr[i] - lv_num_arr[i - 1]);
                            lv_info.style.width = lv_width + "%";
                            content_lv_info.style.width = lv_width + "%";
                            break;
                        }
                    }
                    /*****等级结束******/
                    user_info.style.visibility = "visible";

                    showData();

                }
            }
        };
        xhr.open('GET', '../data/loginInfo.php', true);
        xhr.send(null);
    })();
    /**********获取用户信息结束*******/
    /**********显示数据视图**********/
    function showData(){
        /***********我的式神***********/
        (function () {
            var url = 'data/myShishen.php';
            var data = {uid: uid};
            var type = "GET";

            function getTxtHeight(str) {
                var text_h = parseInt(getComputedStyle($('#font_h')).height);//16px字体占高度,不一样浏览器高度不一样，在页面建了个模板选择计算好的样式
                return (str.length * text_h) / 2 + "px";
            }

            function getShishen(data) {
                var result = JSON.parse(data);
                items_count = Math.ceil(result.length / 8);
                for (var i = 0, html = ''; i < items_count; i++) {
                    if (i === 0) {
                        html += `
                    <div class='shishen_info show'>
                  `;
                    } else {
                        html += `
                    <div class='shishen_info beforeInsert'>
                  `;
                    }
                    for (var j = i * 8; j < (i * 8 + 8 > result.length ? result.length : i * 8 + 8); j++) {
                        var sname = result[j].sname;
                        var txtHeight = getTxtHeight(sname);
                        var tran = "transform: translate(-10px,-" + txtHeight + ")";
                        if (j % 2 === 1) {
                            tran = "transform: translate(-10px,-" + txtHeight + ") rotate(180deg)";
                        }
                        html += `
                        <div class='wrap'>
                            <div class='crop'>
                                <img src='images/img_shishen/${result[j].bpic}'>
                                <div class="mark">
                                    <span style="${tran}">${result[j].sname}</span>
                                </div>
                            </div>
                        </div>
                    `;
                    }
                    html += `
                    </div>
                `;
                }
                $('#content .shishen').innerHTML = html;
            }

            getData(url, data, type, getShishen);
        })();
        /***********我的式神结束*******/
        /***********式神切换按钮*******/
        (function () {
            var prev = $('#content .prev');
            var next = $('#content .next');
            var prev_next = $('#content .prev_next');
            var show = 0;//初始化显示第一层图片
            prev_next.onclick = function (e) {
                if (e.target.nodeName === "A") {


                    if (e.target.className.indexOf('next') != -1 && show < items_count - 1) {
                        var shishen_infos = $('#content .shishen>.shishen_info');
                        shishen_infos[show].className += " beforeInsert";
                        shishen_infos[show + 1].className = "shishen_info";
                        if (show === 0) {
                            prev.style.visibility = "visible";
                        }
                        show++;
                        if (show == items_count - 1) {
                            next.style.visibility = "hidden";
                        }
                    }
                    if (e.target.className.indexOf('prev') != -1 && show > 0) {
                        var shishen_infos = $('#content .shishen>.shishen_info');
                        shishen_infos[show].className += " beforeInsert";
                        shishen_infos[show - 1].className = "shishen_info";
                        show--;
                        if (show === 0) {
                            prev.style.visibility = "hidden";
                        }
                        if (show < items_count - 1) {
                            next.style.visibility = "visible";
                        }
                    }
                }
            }
        })();
        /***********式神切换按钮结束****/

        /***********绘制式神统计*******/
        (function () {
            var url = 'data/myShishenCount.php';
            var data = {uid: uid};
            var type = "GET";

            function paint(data) {
                var result = JSON.parse(data);
                var label_arr = [0, 0, 0, 0];//保存SSR,SR R,N数量；
                for (var i = 0; i < result.length; i++) {
                    var index = parseInt(result[i].rare) - 1;
                    label_arr[index] = parseInt(result[i].count);
                }
                toPaint();

                //绘制函数
                function toPaint() {
                    var c1 = $('#c1');
                    var w = 700, h = 500;
                    var colLen = 5;//纵行数
                    var fontSize = 12;
                    c1.width = 700;
                    c1.height = 500;
                    var ctx = c1.getContext('2d');
                    var boxPadding = 50;//盒子内边距
                    var charPadding = 25;//柱状图边距
                    var rowTxt = ['SSR', 'SR', 'R', 'N'];
                    /****绘制坐标***/
                    ctx.beginPath();
                    ctx.moveTo(boxPadding - 5, boxPadding + 8);
                    ctx.lineTo(boxPadding, boxPadding);
                    ctx.lineTo(boxPadding + 5, boxPadding + 8);
                    ctx.moveTo(boxPadding, boxPadding);
                    ctx.lineTo(boxPadding, h - boxPadding + 1);
                    ctx.moveTo(w - boxPadding + 10 - 8, h - boxPadding + 1 - 5);
                    ctx.lineTo(w - boxPadding + 10, h - boxPadding + 1);
                    ctx.lineTo(w - boxPadding + 10 - 8, h - boxPadding + 1 + 5);
                    ctx.moveTo(w - boxPadding + 10, h - boxPadding + 1);
                    ctx.lineTo(boxPadding, h - boxPadding + 1);
                    ctx.stroke();
                    /*****************/
                    var chartW = ((w - 2 * boxPadding) / label_arr.length) - 2 * charPadding;
                    for (var i = 0, max = label_arr[0]; i < label_arr.length; i++) {
                        (label_arr[i] > max) && (max = label_arr[i]);
                    }
                    var maxStr = max.toString();
                    var maxCol = Math.ceil(max / Math.pow(10, (maxStr.length - 1)));
                    var newMax = maxCol * Math.pow(10, (maxStr.length - 1));
                    var perPx = ((h - 2 * boxPadding - 10) / newMax);//单位值占像素
                    var colW = (h - 2 * boxPadding - 10) / colLen;//单位行高
                    var count_height = label_arr.toString().replace(/\d+/g, function (value) {
                        return (value * perPx).toFixed(2)
                    }).split(',');//每种稀有度数量对应高度px
                    /*****绘制横线****/
                    for (var j = 0; j < colLen; j++) {
                        ctx.beginPath();
                        ctx.moveTo(boxPadding, boxPadding + 10 + j * colW);
                        ctx.lineTo(w - boxPadding + 10, boxPadding + 10 + j * colW);
                        ctx.strokeStyle = "#ccc";
                        ctx.stroke();
                        /*****纵坐标**/
                        var colStr = String(toFix2((j + 1) * (newMax / colLen)));
                        ctx.font = fontSize + 'px sans-serif';
                        var colSTtrW = ctx.measureText(colStr).width;
                        ctx.textBaseline = "top";
                        ctx.fillText(colStr, boxPadding - colSTtrW - 5, h - boxPadding - (j + 1) * colW - fontSize / 2);
                    }
                    var colStr = String(toFix2(0));
                    ctx.font = fontSize + 'px sans-serif';
                    var colSTtrW = ctx.measureText(colStr).width;
                    ctx.textBaseline = "top";
                    ctx.fillText(colStr, boxPadding - colSTtrW - 5, h - boxPadding - fontSize / 2);

                    /*****绘制柱状图****/
                    for (var n = 0; n < count_height.length; n++) {
                        var x = charPadding + boxPadding + n * (2 * charPadding + chartW);
                        var y = h - boxPadding - parseInt(count_height[n]);
                        var str = rowTxt[n];
                        var strW = ctx.measureText(str).width;
                        var y2 = y + parseInt(count_height[n]);

                        var g = ctx.createLinearGradient(x, y, x, y2);
                        g.addColorStop(0, rnCol(255, 150));
                        g.addColorStop(1, '#fff');
                        ctx.fillStyle = g;

                        ctx.fillRect(x, y, chartW, parseInt(count_height[n]));
                        //绘制横坐标
                        ctx.textBaseline = "top";
                        ctx.font = "bold " + fontSize + "px sans-serif";
                        ctx.fillStyle = "#222";
                        ctx.fillText(str, (chartW - strW) / 2 + x, h - boxPadding + 7);
                        //绘制数量
                        var count_str = label_arr[n];
                        var count_strW = ctx.measureText(count_str).width;
                        var cx = (chartW - count_strW) / 2 + x;
                        var cy = h - boxPadding - 15 - count_height[n];
                        ctx.fillText(count_str, cx, cy);
                    }
                    ctx.font = 'bold 20px sans-serif';
                    var t_str = "我的式神数量";
                    var t_str_w = ctx.measureText(t_str).width;
                    var tx = ((w - 2 * boxPadding - t_str_w) / 2) + boxPadding;
                    var ty = (boxPadding - 20) / 2;
                    ctx.fillStyle = "#e4393c";
                    ctx.fillText(t_str, tx, ty);
                    /*****绘制柱状图结束***/
                    /*****绘制标题******/

                    /*****绘制标题结束***/
                }
            }

            getData(url, data, type, paint);
        })();
        /***********绘制式神统计结束****/
        /***********导航栏切换********/
        (function () {
            var nav = $('#content .user_nav>ul');
            var nav_lis = $('#content .user_nav>ul>li');
            nav.onclick = function (e) {
                e.preventDefault();
                if (e.target.nodeName === "DIV") {
                    var el_li = e.target.parentNode;
                    //调用自定义函数判断
                    if (hasClass(el_li, 'active')) {
                        return;
                    } else {
                        for (var i = 0; i < nav_lis.length; i++) {
                            if (hasClass(nav_lis[i], 'active')) {
                                nav_lis[i].className = replaceClass(nav_lis[i], 'active', '');
                                el_li.className += " active";
                                var target_className=el_li.firstElementChild.getAttribute('href');
                                var show_el=$('#content .info_content>.show');
                                show_el.className=replaceClass(show_el,' show','');
                                var query='#content .'+target_className;
                                $(query).className+=" show";
                                break;
                            }
                        }
                    }

                }
            }
        })();
        /***********导航栏切换结束****/
    }
    /**********显示数据视图结束*******/
};



