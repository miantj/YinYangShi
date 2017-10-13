<?php
	header("content-type:text/plain;charset=utf-8");
    require('conn.php');
	$sql="SELECT count(cid) FROM t_check";
    $result=mysqli_query($conn,$sql);
    $rows=mysqli_fetch_row($result);
	echo $rows[0];
?>