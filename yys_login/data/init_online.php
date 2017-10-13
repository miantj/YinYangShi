<?php
     $host=SAE_MYSQL_HOST_M;
        	$port=SAE_MYSQL_PORT;
        	$dbname=SAE_MYSQL_DB;
        	$root=SAE_MYSQL_USER;
        	$pass=SAE_MYSQL_PASS;
            $conn=new PDO("mysql:host=$host;port=$port;dbname=$dbname",$root,$pass);
            $conn->exec("set names 'utf8'");
?>
