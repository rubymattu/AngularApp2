<?php
require 'connect.php';

$reservationID = $_GET['reservationID'] ?? null;

if ($reservationID === null || (int)$reservationID < 1) {
    http_response_code(400);
    echo json_encode(['message' => 'Invalid reservation ID']);
    exit();
}

$reservationID = mysqli_real_escape_string($con, (int)$reservationID);

$sql = "DELETE FROM `reservations` WHERE `reservationID` = '$reservationID' LIMIT 1";

if (mysqli_query($con, $sql)) {
    http_response_code(204); // No content
} else {
    http_response_code(422);
    echo json_encode(['message' => 'Failed to delete reservation']);
}
?>
