<?
require_once 'db_config.php';
require_once 'DBHelper.php';


header('Content-Type: application/json');
$db = new DBHelper($host, $user, $password, $database);

if (!empty($_GET) && count($_GET) == 1 && !empty($_GET['entity'])) {
    // echo "0";
	$result = $db->getQuery("select * from ".$_GET['entity']);
	if (!empty($result)) {
		echo json_encode($result);
	}
} elseif(!empty($_GET['fun'])) {
    // echo "1";
    // echo ($_GET['fun']);
    switch($_GET['fun']) {
        case "findById":
        // echo "3"; 
            if (!empty($_GET['id']) && !empty($_GET['entity'])) {
                // echo "4";
                if (!empty($_GET['relatedEntity'])){
                    // echo "5";
                    // echo "\n";
                    // echo "select * from ".$_GET['entity']." where ".$_GET['relatedEntity']."_id == ".$_GET[id];
                    // echo "\n";
                    $result = $db -> getQuery("select * from ".$_GET['entity']." where ".$_GET['relatedEntity']."_id = ".$_GET[id]);
                } 
                else {
                    // echo "6";
                    $result = $db -> getQuery("select * from ".$_GET['entity']." where id = ".$_GET[id]);
                }
                // echo "7";
                if (!empty($result)) {
                    // echo "8";
                    echo json_encode($result);
                }
            }
    }
}