<?php
	header("content-type:application/json;charset=utf-8");
	@$uname=$_REQUEST['uname'] or die('{"code":-1,"msg":"uname is required"}');
	@$upwd=$_REQUEST['upwd'] or die('{"code":-2,"msg":"upwd is required"}');
	 require('init.php');
	$stmt = $conn->prepare('SELECT uid,uname,pic,vip,lv FROM t_user WHERE uname=:uname AND upwd=:upwd');
    $stmt->execute(array('uname' => $uname,'upwd'=>$upwd));
    $row=$stmt->fetch(PDO::FETCH_ASSOC);
//    var_dump($row);
//    echo $row['uid'];
    if($row){
          $time=time()*1000;
          $uid=$row['uid'];
          $result = $conn->prepare('UPDATE t_user SET lasttime=:t WHERE uid=:uid');
          $result->execute(array('t' => $time,'uid'=>$uid));
          if($result->rowCount()){
              session_start(); //创建新Session空间或查找当前客户端已有的Session空间
              $_SESSION['uname'] = $uname; //在当前客户端的专有Session空间中存数据
              $_SESSION['uid']=$row['uid'];
              $_SESSION['pic']=$row['pic'];
              $_SESSION['vip']=$row['vip'];
              $_SESSION['lv']=$row['lv'];
              echo '{"code":1,"msg":"login succ"}';
          }else{
            echo '{"code":-1,"msg":"update error"}';
          }
    }else{
        echo '{"code":0,"msg":"uname or upwd error"}';
    }
?>