<?php
require 'connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $reservationName = mysqli_real_escape_string($con, $_POST['reservationName'] ?? '');
    $reservationTime = mysqli_real_escape_string($con, $_POST['reservationTime'] ?? '');
    $isBooked = (int) ($_POST['isBooked'] ?? 0);

    if ($reservationName === '' || $reservationTime === '') {
        http_response_code(400);
        echo json_encode(['message' => 'Missing fields']);
        exit();
    }

    // Handle image upload
    $target_dir = "uploads/";
    $reservationImage = '';

    if (empty($reservationImage)) {
            $reservationImage = 'placeholder.jpg';
        }

    if (isset($_FILES['reservationImage']) && $_FILES['reservationImage']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['reservationImage']['tmp_name'];
        $fileName = $_FILES['reservationImage']['name'];
        $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
        $newFileName = uniqid('res_', true) . '.' . $fileExt;
        $destination = $target_dir . $newFileName;

        if (move_uploaded_file($fileTmpPath, $destination)) {
            $reservationImage = $newFileName;
        } else {
            http_response_code(500);
            echo json_encode(['message' => 'Image upload failed']);
            exit();
        }
    }

    $sql = "INSERT INTO `reservations` (`reservationName`, `reservationTime`, `isBooked`, `reservationImage`) 
            VALUES ('$reservationName', '$reservationTime', '$isBooked', '$reservationImage')";

    if (mysqli_query($con, $sql)) {
        http_response_code(201);
        echo json_encode(['reservationID' => mysqli_insert_id($con)]);
    } else {
        http_response_code(422);
        echo json_encode(['message' => 'Insert failed']);
    }
}
?>
