<?php
	header("Content-Type:application/json;charset=utf-8");
	@$n=$_REQUEST['uname'];
	@$p=$_REQUEST['upwd'];
	if(empty($n)||empty($p)){
	    echo '[]';
	    return;
	}
    $time=time()*1000;
	require('init_pdo.php');
   	$stmt = $conn->prepare("INSERT INTO t_user VALUES(
          null,:n,:p,:t,'',10000,'user_header.jpg',0
    )");
    $stmt->execute(array('n' => $n,'t'=>$time,'p'=>$p));
    if($conn->lastinsertid()){
        session_start();
        $_SESSION['uname'] = $n;
        $_SESSION['upwd']=$p;
        echo '{"code":1,"msg":"register success"}';
    }else{
        echo '{"code":0,"msg":"register error"}';
    }
?>