<?php
	header("Content-Type: text/html;charset=utf-8");
	require_once('usercfg.php');
	$newstype = $_POST['name'];
	// $newstype ="recommend";
	selectData($newstype);
	/**
	 * 连接到数据库
	 * @return 字符串 表示连接成功
	 */
	function connectDB(){
		$con = mysql_connect(HOST,USERNAME,PASSWORD);
		$GLOBALS['con'] = $con;
		if (!$con)
  		{
  			die('Could not connect to DB' . mysql_error());
  		}
	}
	//从数据库加载特定类型的数据
	function selectData($type){
		connectDB();
		mysql_query("set names utf8");
		mysql_select_db("BaiduNews", $GLOBALS['con']);
		$result = mysql_query("SELECT * FROM news WHERE newstype='$type'");
		while($row = mysql_fetch_row($result))
  		{
			$return[] = array('newsid'=>$row[0],'newstitle'=>$row[1],'newslink'=>$row[2],'newsimg'=>$row[3],'newscontent'=>$row[4],'newstype'=>$row[5],'addtime'=>$row[6]);			
  		}
  		echo json_encode($return);
  		mysql_close($GLOBALS['con']);
	}
?>