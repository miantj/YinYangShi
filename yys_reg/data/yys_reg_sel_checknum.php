<?php
	header("content-type:application/json;charset=utf-8");
	@$cid=$_REQUEST['cid'] or die("id�Ǳ����");
	require('conn.php');
	$sql="SELECT pic,check_num FROM t_check WHERE cid=$cid";
	$result=mysqli_query($conn,$sql);
    $rows=mysqli_fetch_assoc($result);
    echo json_encode($rows);
?>