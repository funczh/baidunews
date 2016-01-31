<?php
	header("Content-Type: text/html;charset=utf-8");
	require_once('usercfg.php');
	
	insertData();
	//连接数据库
	function connectDB(){
		$con = mysql_connect(HOST,USERNAME,PASSWORD);
		$GLOBALS['con'] = $con;
		if (!$con)
  		{
  			die('Could not connect to DB' . mysql_error());
  		};
	}
	//上传内容到数据库
	function insertData(){
		$newstitle = $_POST['newstitle'];
		$newstype = $_POST['newstype'];
		$newsimg = $_POST['newsimg'];
		$newslink = $_POST['newslink'];
		$addtime = $_POST['addtime'];
		$newscontent = $_POST['newscontent'];
		connectDB();
		mysql_query("set names utf8");
		mysql_select_db("baidunews", $GLOBALS['con']);
		$insert = mysql_query("INSERT INTO news (newstitile, newslink, newsimg, newscontent, newstype, addtime) VALUES ('$newstitle','$newslink','$newsimg','$newscontent','$newstype','$addtime')");
		if ($insert) {
			echo "上传成功";
		}else{
			echo "上传失败";
		};
	}
?>
