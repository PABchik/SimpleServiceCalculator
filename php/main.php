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
                    if (!empty($_GET['join']) && !empty($_GET['on'])) {
                        /*echo "select * from ".$_GET['entity']." left join ".$_GET['join']." on ".$_GET['join'].".".$_GET['on']."=".$_GET['entity'].".".$_GET['join']."_id where ".$_GET['entity'].".".$_GET['relatedEntity']."_id=".$_GET['id'];*/
                        $result = $db->getQuery("select * from ".$_GET['entity']." left join ".$_GET['join']." on ".$_GET['join'].".".$_GET['on']."=".$_GET['entity'].".".$_GET['join']."_id where ".$_GET['entity'].".".$_GET['relatedEntity']."_id=".$_GET['id']);
                    } else {
                        $result = $db->getQuery("select * from ".$_GET['entity']." where ".$_GET['relatedEntity']."_id = ".$_GET[id]);
                    }
                    // echo "5";
                    // echo "\n";
                    // echo "select * from ".$_GET['entity']." where ".$_GET['relatedEntity']."_id == ".$_GET[id];
                    // echo "\n";
                } 
                else {
                    // echo "6";
                    $result = $db -> getQuery("select * from ".$_GET['entity']." where id = ".$_GET[id]);
                }
                // echo "7";
                
            }
            break;
        case "findServices":
            if (!empty($_GET['brand']) && !empty($_GET['model']) && !empty($_GET['engine'])) {
                /*echo "select sfc.id,
                sfc.service_id,
                sfc.price,
                s.name,
                s.description
                 from service_for_car sfc 
                    left join service s on s.id=sfc.service_id 
                    where sfc.brand_id=".
                    $_GET['brand']." and sfc.model_id=".
                    $_GET['model']." and sfc.engine_id='".
                    $_GET['engine']."'";*/
                $result = $db->getQuery("select sfc.id,
                sfc.service_id,
                sfc.price,
                s.name,
                s.description
                 from service_for_car sfc 
                    left join service s on s.id=sfc.service_id 
                    where sfc.brand_id=".
                    $_GET['brand']." and sfc.model_id=".
                    $_GET['model']." and sfc.engine_id='".
                    $_GET['engine']."'");
            }
            break;
        case "getPartTypes":
        /*echo "select * from part_type_for_service ptfs
                    join part_type pt on pt.id=ptfs.part_type_id
                    where ptfs.service_for_car_id=".$_GET['id'];*/
            // if (!empty($_GET['id'])) {
                /*echo "select * from part_type_for_service ptfs
                    join part_type pt on pt.id=ptfs.part_type_id";*/
                $result = $db->getQuery("select * from part_type_for_service ptfs
                    join part_type pt on pt.id=ptfs.part_type_id");
                break;
        case "getPartsForCar":
        /*echo "select * from car_part cp
                    join part on part.id=cp.part_code_id 
                    where cp.brand_id=".
                    $_GET['brand']." and cp.model_id=".
                    $_GET['model']." and cp.engine_id='".
                    $_GET['engine']."'";*/
                    /*echo "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++";
                    var_dump($_GET);
                    echo "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++";
                    echo "select * from car_part cp
                    join part on part.code=cp.part_id 
                    where cp.brand_id=".
                    $_GET['brand']." and cp.model_id=".
                    $_GET['model']." and cp.engine_id='".
                    $_GET['engine']."'";*/
             $result = $db->getQuery("select 
                    cp.id,
                    part.code,
                    part.name,
                    part.price,
                    part.part_type_id,
                    ptfs.count,
                    ptfs.service_for_car_id
                     from car_part cp
                    left join part on part.code=cp.part_id 
                    left join part_type_for_service ptfs on ptfs.part_type_id=part.part_type_id
                    where cp.brand_id=".
                    $_GET['brand']." and cp.model_id=".
                    $_GET['model']." and cp.engine_id='".
                    $_GET['engine']."'");
        break;
            // }
    }
    if (!empty($result)) {
                    // echo "8";
                    echo json_encode($result);
                }
}
// echo $_GET['fun'] == "getPartTypes";