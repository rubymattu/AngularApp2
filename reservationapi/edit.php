<?php
require 'connect.php';

// Get the posted data
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    // Extract the data
    $request = json_decode($postdata);

    // Validate
    if (!isset($request->reservationID) || (int)$request->reservationID < 1 ||
        !isset($request->reservationName) || trim($request->reservationName) === '' ||
        !isset($request->reservationTime) || trim($request->reservationTime) === '' ||
        !isset($request->isBooked)) {
        http_response_code(400);
        exit();
    }

    // Sanitize
    $reservationID = mysqli_real_escape_string($con, (int)$request->reservationID);
    $reservationName = mysqli_real_escape_string($con, $request->reservationName);
    $reservationTime = mysqli_real_escape_string($con, $request->reservationTime);
    $isBooked = mysqli_real_escape_string($con, (int)$request->isBooked);

    // Update query
    $sql = "UPDATE `reservations` 
            SET 
              `reservationName` = '$reservationName',
              `reservationTime` = '$reservationTime',
              `isBooked` = '$isBooked'
            WHERE 
              `reservationID` = '$reservationID' 
            LIMIT 1";

    if (mysqli_query($con, $sql)) {
        http_response_code(204); // No Content, success
    } else {
        http_response_code(422); // Unprocessable Entity, error during update
    }
}
?>
