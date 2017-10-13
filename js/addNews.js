(function () {
    $('#newsSubmit').onclick = function () {
        var typeVal=['-【新闻】 ','-【公告】 ','-【活动】 ','-【媒体】'];
        var type = parseInt($('#newsType').value)+1;
        var title = typeVal[type-2]+$('#newsTitle').value;
        var uid = 1;
        var content = '';
        if (type && title && uid) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var result = JSON.parse(xhr.responseText);
                    if(result.code==='1'){
                        console.log(result);
                        $('#newsTitle').value='';
                    }
                }
            };
            xhr.open("POST", "data/insert_news.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send("type=" + type + "&title=" + title + "&uid=" + uid + "&content=" + content);
        }
    }
})();
function getNews(type){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var result = JSON.parse(xhr.responseText);
            console.log(result);
        }
    };
    xhr.open("POST", "data/insert_news.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("type=" + type + "&title=" + title + "&uid=" + uid + "&content=" + content);
}
