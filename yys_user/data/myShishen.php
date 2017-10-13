<?php
    header('Content-Type:application/json;charset=utf-8');
    @$uid=$_REQUEST['uid'];
    if(empty($uid)){
        echo '[]';
        return;
    }
    require('init.php');
    $stmt = $conn->prepare('SELECT u_s.u_sid,s.sname,s.bpic,u_s.sid FROM yys_user_shishen u_s,yys_shishen s WHERE u_s.sid=s.sid AND uid=:uid GROUP BY u_s.sid ORDER BY u_s.u_sid');
    $stmt->execute(array('uid' => $uid));
    $output=[];
    while(true){
        $row=$stmt->fetch(PDO::FETCH_ASSOC);
        if($row){
            $output[]=$row;
        }else{
            break;
        }
    };
    echo json_encode($output);
?>