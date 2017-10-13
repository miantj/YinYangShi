<?php
    header("Content-Type:application/json;charset=utf-8");
    @$uname=$_REQUEST['uname'] or die('{"code":-1,"msg":"uname is required"}');
    require('conn.php');
    $sql="SELECT uname FROM t_user WHERE uname='$uname'";
    $result=mysqli_query($conn,$sql);
    $row=mysqli_fetch_row($result);//非关联数组
    if($row===null){
        $msg='{"code":1,"msg":"user name can be used"}';
    }else{
        $msg='{"code":0,"msg":"user name is existed"}';
    }
    echo $msg;
?>