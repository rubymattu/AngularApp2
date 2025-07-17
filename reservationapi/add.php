<?php
require 'connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $reservationName = isset($_POST['reservationName']) ? mysqli_real_escape_string($con, trim($_POST['reservationName'])) : '';
    $reservationTime = isset($_POST['reservationTime']) ? mysqli_real_escape_string($con, trim($_POST['reservationTime'])) : '';
    $isBooked = isset($_POST['isBooked']) ? (int) $_POST['isBooked'] : 0;

    if ($reservationName === '' || $reservationTime === '') {
        http_response_code(400);
        echo json_encode(['message' => 'Missing fields']);
        exit();
    }

    $reservationImage = 'placeholder.jpg'; // default

    // Handle image upload if exists
    if (isset($_FILES['reservationImage']) && $_FILES['reservationImage']['error'] === UPLOAD_ERR_OK) {
        $target_dir = "uploads/";

        $fileTmpPath = $_FILES['reservationImage']['tmp_name'];
        $fileName = $_FILES['reservationImage']['name'];
        $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

        // Check for duplicates and keep original name or add a suffix
        $destination = $target_dir . $fileName;
        $baseName = pathinfo($fileName, PATHINFO_FILENAME);
        $counter = 1;
        while (file_exists($destination)) {
            $destination = $target_dir . $baseName . '_' . $counter . '.' . $fileExt;
            $counter++;
        }

        if (move_uploaded_file($fileTmpPath, $destination)) {
            $reservationImage = basename($destination);
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

} else {
    http_response_code(405);
    echo json_encode(['message' => 'Method Not Allowed']);
}
?>
