<?php
    header("Content-Type:application/json;charset=utf-8");
    $type=$_REQUEST['type'];
    $title=$_REQUEST['title'];
    $uid=$_REQUEST['uid'];
    $content=$_REQUEST['content'];
    if(empty($type)||empty($title)||empty($uid)){
        echo '[]';
        return;
    }
    if(!$content){
        $content='';
    }
    require('init_pdo.php');
    $time=time()*1000;
   	 $result = $conn->prepare("INSERT INTO yys_newsItem VALUES(null,:title,:cont,:time,:uid,:type)");
     $result->execute(array('title'=>$title,'cont'=>$content,'time'=>$time,'uid'=>$uid,'type'=>$type));
     if($conn->lastinsertid()){
         $iid=$conn->lastinsertid();
         $output='{"code":"1","iid":'.$iid.'}';
     }else{
         $output='{"code":"0","msg":"err"}';
     }
     echo $output;
?>