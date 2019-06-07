<?
require_once 'db_config.php';
require_once 'DBHelper.php';


header('Content-Type: application/json');
$db = new DBHelper($host, $user, $password, $database);

    if(!empty($_GET['fun'])) {
    // echo "1";
    // echo ($_GET['fun']);
    switch($_GET['fun']) {
        case "getBrands":
                $result = $db -> getQuery("select * from brand order by name");
            break;
        case "getModels":
            if (isset($_GET['brand']))
                $result = $db -> getQuery("select * from model where brand_id=".$_GET['brand'].' order by name'); 
            break;
        case "getEngines":
            if (isset($_GET['model']))
                $result = $db -> getQuery("select
                    engine.name,
                    engine.code
                    from engine
                join engine_model on engine_model.engine_id=engine.code 
                where engine_model.model_id =".$_GET['model']." order by engine.name"); 
            //select engine.name, engine.code from model join engine_model on engine_model.model_id join engine on engine.code = engine_model.engine_id where model.brand_id=1 and model.id = 1 order by engine.name
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
                    $_GET['engine']."'
                    order by part.name");
        break;
        case "addTicket": 
        $_POST = json_decode(file_get_contents('php://input'), true);
        // var_dump($_POST);
            // var_dump($_POST);
            // echo "test++test++test++test++test++test++test++";
            if (isset($_POST['name']) && isset($_POST['brand']) && isset($_POST['model']) && isset($_POST['engine']) &&
                isset($_POST['total']) && isset($_POST['vin']) && isset($_POST['serviceInfo']) && isset($_POST['serviceInfo']['services'])) {
                $newTicketId = $db -> getQuery("select count(*) as id from ticket")[0]['id'] + 1;
                $newServiceTicketId = $db -> getQuery("select count(*) as id from service_ticket")[0]['id'] + 1;
                $newPartTicketId = $db -> getQuery("select count(*) as id from part_ticket")[0]['id'] + 1;
                $date = date("Y-m-d");
                // echo $date."<br><br>";
               /* echo "insert into ticket
                (`id`, `date`, `customer_name`, `brand_id`, `model_id`, `engine_id`, `total`, `vin`)
                 values('".$newTicketId."',
                    '".$date."',
                    '".$_GET['name']."',
                    '".$_GET['brand']."',
                    '".$_GET['model']."',
                    '".$_GET['engine']."',
                    '".$_GET['total']."',
                    '".$_GET['vin']."',
                    )";*/
                // echo json_encode($newTicketId);
                $db -> execQuery("insert into ticket
                (`id`, `date`, `customer_name`, `brand_id`, `model_id`, `engine_id`, `total`, `vin`)
                 values('".$newTicketId."',
                    '".$date."',
                    '".$_POST['name']."',
                    '".$_POST['brand']."',
                    '".$_POST['model']."',
                    '".$_POST['engine']."',
                    '".$_POST['total']."',
                    '".$_POST['vin']."'
                    )");
//сделать заполнение таблиц service_ticket, part_ticket и отправку писем. Сделать отдельный конфиг файл с указанием все адресатов
                foreach ( $_POST['serviceInfo']['services'] as $service ) {
                    $db -> execQuery("insert into service_ticket
                    (`id`, `service_id`, `ticket_id`, `price`)
                     values('".$newServiceTicketId."',
                        '".$service["service_id"]."',
                        '".$newTicketId."',
                        '".$service["price"]."'
                        )");
                    // var_dump($service);
                    $newServiceTicketId++;
                }
                if (isset($_POST['serviceInfo']['parts'])) {
                    foreach ( $_POST['serviceInfo']['parts'] as $part ) {
                        $db -> execQuery("insert into part_ticket
                        (`id`, `part_id`, `ticket_id`, `price`, `count`)
                         values('".$newPartTicketId."',
                            '".$part["code"]."',
                            '".$newTicketId."',
                            '".$part["price"]."',
                            '".$part['count']."'
                            )");
                        // var_dump($part);
                        echo "insert into part_ticket
                        (`id`, `part_id`, `ticket_id`, `price`, `count`)
                         values('".$newPartTicketId."',
                            '".$part["code"]."',
                            '".$newTicketId."',
                            '".$part["price"]."',
                            '".$part['count']."'
                            )";
                        $newPartTicketId++;

                    }
                }
                // $ticketInfo = json_encode($_POST['body']);
                // var_dump($_POST);
            }
        break;
        case "getCurrentTicketId" :
            $result = $db -> getQuery("select count(*) as id from ticket")[0]['id'];
        break;
            // }
    }
    if (!empty($result)) {
                    // echo "8";
                    echo json_encode($result);
                }
}
// echo $_GET['fun'] == "getPartTypes";
/*

select t.id as "ticket_id",
t.customer_name as "customer_name",
t.total as "total",
st.service_id as "service_id_t",
sfc.service_id as "service_id_sfc",
st.price as "price1",
sfc.price as "price2",
s.name as "service_name"
from ticket t
left join service_ticket st on st.ticket_id=t.id
left join service s on s.id=st.service_id
left join (select * from service_for_car where brand_id=1 and model_id=1 and engine_id="aaa123bmw") sfc on sfc.service_id=st.service_id
where t.id = 3*/