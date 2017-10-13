/**********新闻动态更新*******************/
(function(){
    var newsId=[];//存储每种类型最新的id;
    var news_list=document.querySelector('#news-wrap .news-list');
    var news_latest=document.querySelector('#news-wrap .latest-items');
    var news_news=document.querySelector('#news-wrap .news-items');
    var news_notice=document.querySelector('#news-wrap .notice-items');
    var news_activity=document.querySelector('#news-wrap .activity-items');
    var news_media=document.querySelector('#news-wrap .media-items');
    var news_element=[news_latest,news_news,news_notice,news_activity,news_media];
    /***********页面初次加载初始化新闻****/
    (function(){
        function getNews(data){
            var result=JSON.parse(data);
            var hash={};//存储对应的iid的数组下标
            var arr=[];//存储最新的五条新闻iid
            for(var i=0;i<result.length;i++){
                var news=result[i];
                newsId.push(news[0].iid);
                for(var j=0,html='';j<news.length;j++){
                    arr.push(news[j].iid);
                    hash[news[j].iid]=[i,j];
                    var date=formatDate(new Date(parseInt(news[j].addTime)));
                    html+=`
                            <li>
                                <a href="#">
                            ${news[j].title}
                                 </a>
                            <span>${date}</span>
                    </li>
                        `;
                }
                news_element[i+1].innerHTML=html;
            }
            arr=arr.sort(function(a,b){return b-a}).slice(0,5);
            for(var n=0,html='';n<arr.length;n++){
                var index=hash[arr[n]];
                var obj=result[index[0]][index[1]];
                var date=formatDate(new Date(parseInt(obj.addTime)));
                html+=`
                        <li>
                        <a href="#">
                            ${obj.title}
                        </a>
                        <span>${date}</span>
                    </li>
                    `;
            }
            news_element[0].innerHTML=html;
        }
        //初始化参数
        var url="data/sel_news.php";
        var data={newsType:0};
        var type="GET";
        //调用xhr函数
        getData(url,data,type,getNews);
        //刷新
        document.querySelector('#newsFresh').addEventListener('click',()=>{
            getData(url,data,type,getNews);
        })
    })();
    /*********页面初次加载初始化新闻结束***/
})();
/**********新闻动态更新结束***************/