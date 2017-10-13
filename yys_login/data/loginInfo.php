<?php
header('Content-Type: application/json');

//向当前客户端返回其存储在服务器端Session空间中的数据
session_start();
@$output['uname'] = $_SESSION['uname'];
@$output['upwd'] = $_SESSION['upwd'];
echo json_encode($output);
?>