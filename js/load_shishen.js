/*************声明式神介绍加载函数********/
function createShishen(rare) {
    var shishen_wrap = document.querySelector("#intro-shishen div.intro-shishen-items");
    var prev = document.querySelector("#intro-shishen a.prev");
    var next = document.querySelector("#intro-shishen a.next");
    //初始化按钮，未加载隐藏
    prev.style.display = "none";
    next.style.display = "none";
    /******为prev、next箭头添加点击事件*****/
    function add_prev_next(max_count) {
        var shishen_wrap = document.querySelector("#intro-shishen div.intro-shishen-items");
        var trans = 0;
        var wrap_width = 828;
        shishen_wrap.style.left = trans + "px";
        prev.style.display = "none";
        next.style.display = "block";
        if (max_count === 1) {
            next.className += " noPic";
        } else {
            next.className = "next";
        }
        prev.onclick = function (e) {
            e.preventDefault();
            if (trans >= 0) {
                this.style.display = "none";
                this.className += " noPic";
                return;
            }
            else {
                next.style.display = "block";
                next.className = "next";
                trans += wrap_width;
                shishen_wrap.style.left = trans + "px";
            }
        };
        next.onclick = function (e) {
            e.preventDefault();
            trans -= wrap_width;
            if (trans >= (-(max_count - 1) * wrap_width)) {
                prev.style.display = "block";
                prev.className = "prev";
                if (trans == (-(max_count - 1) * wrap_width))
                    this.className += " noPic";
                shishen_wrap.style.left = trans + "px";
            } else {
                return;
            }
        };

    };
    /**************添加点击事件结束******************/
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var result = JSON.parse(xhr.responseText);
            var ulCount = Math.ceil(result.length / 2);
            var html = '';
            for (var i = 0; i < ulCount; i++) {
                html += `
                        <ul>
                    `;
                for (var j = (2 * i); j < 2 * (i + 1); j++) {
                    if (j >= result.length)
                        break;
                    html += `
                            <li>
                                <a href="#"><span><em>${result[j].sname}</em></span><img src="images/shishen/shishen/${result[j].spic}" alt="${result[j].sname}"><i class="icon-new"></i></a>
                            </li>
                        `;
                }
                html += `</ul>`;
            }
            shishen_wrap.innerHTML = html;
            var shishen_iterms = document.querySelectorAll("#intro-shishen div.intro-shishen-items>ul");
            var len = 6;
            var max_count = Math.ceil(shishen_iterms.length / len);
            add_prev_next(max_count);
        }
    };
    xhr.open("POST", "data/shishen_sel.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("rare=" + rare);
}

createShishen(-1);//初始化式神
/************声明式神介绍加载函数结束*******/