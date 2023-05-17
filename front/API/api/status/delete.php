<?php

    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header("Access-Control-Allow-Methods: DELETE");
    header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods");

    include_once '../../config/Database.php';
    include_once '../../alert/Alert.php';

    $database = new Database();
    $db = $database -> connect();

    $alert = new Alert($db);
    $deleteData = json_decode(file_get_contents("php://input"));
    $alert -> ID = $deleteData -> ID;

    if ($alert -> delete()) {
        echo json_encode(
            array('message' => 'Post Deleted')
        );
    } else {
        echo json_encode(
            array('message' => 'Alert not done')
        );
    }

?>