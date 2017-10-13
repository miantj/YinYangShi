<?php
    header("Content-Type:application/json;charset=utf-8");
    @$lid=$_REQUEST['lid'] or die('{"code":-1,"msg":"Lid is required"}');
   require('init.php');
    $sql="SELECT * FROM yys_tongrenIterm WHERE lid=$lid";
    $result=mysqli_query($conn,$sql);
    $rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
    if($rows!==null){
        echo json_encode($rows);
    }else{
        echo '{"code":0,"msg":"none pic"}';
    }
?>