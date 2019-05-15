<?
require_once 'db_config.php';
require_once 'DBHelper.php';


header('Content-Type: application/json');
$db = new DBHelper($host, $user, $password, $database);
//$db->printVars();
//echo $_SERVER['REQUEST_METHOD'];
if (!empty($_GET) && count($_GET) == 1 && !empty($_GET['entity'])) {
	$result = $db->getQuery("select * from ".$_GET['entity']);
	if (!empty($result)) {
		echo json_encode($result);
	}
}

	
