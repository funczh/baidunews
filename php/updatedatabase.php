<?php
	header("Content-Type: text/html;charset=utf-8");
	require_once('usercfg.php');
	
	updateData();
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
	function updateData(){
		$newsid = $_POST['update-id'];
		$newstitle = $_POST['update-title'];
		$newstype = $_POST['update-type'];
		$newsimg = $_POST['update-img'];
		$newslink = $_POST['update-link'];
		$addtime = $_POST['update-addtime'];
		$newscontent = $_POST['update-content'];
		connectDB();
		mysql_query("set names utf8");
		mysql_select_db("baidunews", $GLOBALS['con']);
		$insert = mysql_query("UPDATE `news` SET `newstitile`='$newstitle',`newslink`='$newslink',`newsimg`='$newsimg',`newscontent`='$newscontent',`newstype`='$newstype',`addtime`='$addtime' WHERE newsid = '$newsid'");
		if ($insert) {
			echo "更新成功";
		}else{
			echo "更新失败";
		};
	}
?>
