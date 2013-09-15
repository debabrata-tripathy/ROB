<?php
	//error_reporting(E_ALL);
	//ini_set('display_errors','On');

	include "util.php";
	//get the method
	$method = $_GET['method'];

	if(!isset($_GET['param1'])) {
		echo $method();
		return 0;
	}
	if(!isset($_GET['param2'])) {
    echo $method($_GET['param1']);
		return 0;
  }
 	echo $method($_GET['param1'],$_GET['param2']);
?>
