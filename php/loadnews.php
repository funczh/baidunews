<?php
	header("Content-Type: text/html;charset=utf-8");
	require_once('usercfg.php');
	$_GET['name']='recommend';
	selectData();
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

	function selectData(){
		connectDB();
		mysql_query("set names 'utf8'");
		mysql_select_db("BaiduNews", $GLOBALS['con']);
		$result = mysql_query("SELECT * FROM news WHERE newstype=$_GET['name']");
		while($row = mysql_fetch_array($result))
  		{
			echo $row['newstitle'];
			echo "<br/>";
  		}

  		mysql_close($GLOBALS['con']);
	}
?>