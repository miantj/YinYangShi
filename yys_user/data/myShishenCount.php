<?php
    header('Content-Type:application/json;charset=utf-8');
    @$uid=$_REQUEST['uid'];
    if(empty($uid)){
        echo '[]';
        return;
    }
    require('init.php');
    $stmt = $conn->prepare('SELECT s.RARE as rare,COUNT(s.RARE) as count FROM yys_shishen s,yys_user_shishen u_s WHERE u_s.sid=s.sid AND uid=:uid GROUP BY s.RARE');
    $stmt->execute(array('uid' => $uid));
    $output=[];
    while(true){
         $row=$stmt->fetch(PDO::FETCH_ASSOC);
         if($row){
            $output[]=$row;
         }else{
            break;
         }
    }
    echo json_encode($output);

?>