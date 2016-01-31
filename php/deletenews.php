<?php
	header("Content-Type: text/html;charset=utf-8");
	require_once('usercfg.php');
	$newsid = $_GET['deleteId'];
	
	$con = mysql_connect(HOST,USERNAME,PASSWORD);
	
		if (!$con)
  		{
  			die('Could not connect to DB' . mysql_error());
  		}
  	mysql_query("set names utf8");
	mysql_select_db("baidunews", $con);
	$result = mysql_query("DELETE FROM `news` WHERE newsid='$newsid'");
 	echo $result;
  		mysql_close($con);	
?>