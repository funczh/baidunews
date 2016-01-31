<?php
	header("Content-Type: text/html;charset=utf-8");
	require_once('usercfg.php');
	$newsid = $_POST['updateId'];
	
	$con = mysql_connect(HOST,USERNAME,PASSWORD);
	
		if (!$con)
  		{
  			die('Could not connect to DB' . mysql_error());
  		}
  	mysql_query("set names utf8");
	mysql_select_db("baidunews", $con);
	$result = mysql_query("SELECT * FROM `news` WHERE newsid='$newsid'");
	while($row = mysql_fetch_row($result))
  		{
  			
			$return = array('newsid'=>$row[0],'newstitle'=>$row[1],'newslink'=>$row[2],'newsimg'=>$row[3],'newscontent'=>$row[4],'newstype'=>$row[5],'addtime'=>$row[6]);			
  		}
 
 	echo json_encode($return);
  	mysql_close($con);	
?>