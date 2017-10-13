<?php
/*
    *newstype=0抓取所有的；
    *newstype=1抓取最新的；
    *newstype=2-5分别为新闻，公告，活动，媒体.
*/
    header('Content-Type:application/json;charset=utf-8');
    @$newsType=$_REQUEST['newsType'];
    require('init_pdo.php');
    $output=[];
    $count=2;
    if($newsType=='0'){
        while($count<=5){
            $stmt = $conn->prepare('SELECT iid,title,addTime,type FROM yys_newsItem WHERE type=:type ORDER BY iid DESC LIMIT 5');
                    $stmt->execute(array('type' => $count));
                    $result=[];
                    while(true){
                        $row=$stmt->fetch(PDO::FETCH_ASSOC);
                        if($row){
                            $result[]=$row;
                        }else{
                            break;
                        }
                    }
                    $output[]=$result;
                    $count++;
        }
    }else if($newsType=='1'){
        $stmt = $conn->prepare('SELECT iid,title,addTime,type FROM yys_newsItem ORDER BY iid DESC LIMIT 0,5');
        $stmt->execute();
        $result=[];
        while(true){
            $row=$stmt->fetch(PDO::FETCH_ASSOC);
            if($row){
                $result[]=$row;
            }else{
                break;
            }
        }
       $output[]=$result;
    }else{
       $stmt = $conn->prepare('SELECT iid,title,addTime,type FROM yys_newsItem WHERE type=:type ORDER BY iid DESC LIMIT 5');
       $stmt->execute(array('type' => $newsType));
       $result=[];
        while(true){
            $row=$stmt->fetch(PDO::FETCH_ASSOC);
            if($row){
                $result[]=$row;
            }else{
                break;
            }
        }
        $output[]=$result;
    }
    echo json_encode($output);
?>