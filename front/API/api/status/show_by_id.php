<?php

    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once '../../config/Database.php';
    include_once '../../alert/Alert.php';

    $database = new Database();
    $db = $database -> connect();

    $alert = new Alert($db);
    $alert -> id = isset($_GET['id']) ? $_GET['id'] : die();
    $alert -> getStatusAlert();

    $alert_arr = array(
        'id' => $alert -> ID,
        'class' => $alert -> CLASS,
        'name' => $alert -> NAME,
        'message' => $alert -> MESSAGE,
        'curDate' => $alert -> CURDATE,
    );

    print_r(json_encode($alert_arr));

?>