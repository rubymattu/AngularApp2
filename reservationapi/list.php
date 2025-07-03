<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'connect.php';

$reservations = [];

$sql = "SELECT reservationID, reservationImage, reservationName, reservationTime, isBooked FROM reservations";

$result = mysqli_query($con, $sql);

if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $reservations[] = [
            'reservationID' => $row['reservationID'],
            'reservationImage' => $row['reservationImage'],
            'reservationName' => $row['reservationName'],
            'reservationTime' => $row['reservationTime'],
            'isBooked' => $row['isBooked']
        ];
    }
    echo json_encode($reservations);
} else {
    http_response_code(500);
    echo json_encode(["message" => "Database query failed."]);
}
?>
