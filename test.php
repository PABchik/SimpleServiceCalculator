<? 
require_once 'GlobalArr.php';
echo json_encode(array(
            'method' => 'GET',
            'id' => $goodId,
            'good' => 'phone',
            'price' => 10000
        ));