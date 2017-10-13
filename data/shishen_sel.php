<?php
    header("Content-Type:application/json;charset=utf-8");
    @$rare=$_REQUEST['rare'] or die('{"code":-1,"msg":"rare is required"}');
    require('init.php');
    if($rare==-1){
        $sql="SELECT * FROM yys_shishen";
        $result=mysqli_query($conn,$sql);
        $rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
        echo json_encode($rows);
    }else{
        $sql="SELECT * FROM yys_shishen WHERE rare=$rare";
        $result=mysqli_query($conn,$sql);
                $rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
                if($rows===null){
                    echo '{"code":0,"msg":"rare err"}';
                }else{
                    echo json_encode($rows);
                }

    }
?>