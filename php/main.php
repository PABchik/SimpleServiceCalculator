<?
require_once 'db_config.php';
require_once 'DBHelper.php';

$db = new DBHelper($host, $user, $password, $database);
//$db->printVars();
//echo $_SERVER['REQUEST_METHOD'];

if ($_SERVER['REQUEST_METHOD'] != 'get') {
	echo json_encode($db->getQuery("select * from test_table"));
	
}