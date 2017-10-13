var progerss=0;
function img_load(){
    progerss+=25;
    if(progerss===100){
        jiaose_move();
        function jiaose_move() {
            //为按钮添加点击事件
            var bann_jiaose1 = document.querySelector("#top div.banner div.banner-jiaose-1");
            var bann_jiaose2 = document.querySelector("#top div.banner div.banner-jiaose-2");
            var show = 0;//记录当前显示图层
            var bann_btn = document.querySelector("#top div.banner-jiaose i");

            function move() {
                if (show === 0) {
                    bann_jiaose1.className += " active";
                    bann_jiaose2.className = "banner-jiaose-2";
                    show = 1;
                } else {
                    bann_jiaose2.className += " active";
                    bann_jiaose1.className = "banner-jiaose-1";
                    show = 0;
                }
            }

            move();//加载完成执行一次
            bann_btn.addEventListener("click", move);
        }

    }
}