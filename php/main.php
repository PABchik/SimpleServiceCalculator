<?
require_once 'db_config.php';
require_once 'DBHelper.php';


header('Content-Type: application/json');
$db = new DBHelper($host, $user, $password, $database);
//$db->printVars();
//echo $_SERVER['REQUEST_METHOD'];


	echo json_encode($db->getQuery("select * from test_table"));
