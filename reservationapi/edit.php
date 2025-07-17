<?php
require 'connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $reservationID     = $_POST['reservationID'] ?? '';
    $reservationName   = $_POST['reservationName'] ?? '';
    $reservationTime   = $_POST['reservationTime'] ?? '';
    $isBooked          = $_POST['isBooked'] ?? 0;
    $existingImage     = $_POST['existingImage'] ?? '';
    $newImageName      = $existingImage; // default to old image

    // Validate inputs
    if (!$reservationID || !$reservationName || !$reservationTime) {
        http_response_code(400);
        echo json_encode(['message' => 'Invalid input']);
        exit;
    }

if (isset($_FILES['reservationImage']) && $_FILES['reservationImage']['error'] === UPLOAD_ERR_OK) {
    $fileTmpPath = $_FILES['reservationImage']['tmp_name'];
    $fileName = $_FILES['reservationImage']['name'];
    $uploadFileDir = './uploads/';
    $dest_path = $uploadFileDir . $fileName;

    // Prevent overwriting existing file with same name
    $baseName = pathinfo($fileName, PATHINFO_FILENAME);
    $extension = pathinfo($fileName, PATHINFO_EXTENSION);
    $counter = 1;
    while (file_exists($dest_path)) {
        $fileName = $baseName . '_' . $counter . '.' . $extension;
        $dest_path = $uploadFileDir . $fileName;
        $counter++;
    }

    if (move_uploaded_file($fileTmpPath, $dest_path)) {
        $newImageName = $fileName;

        // Delete old image if it's different and not placeholder
        if ($existingImage && $existingImage !== 'placeholder.jpg' && $existingImage !== $newImageName) {
            $oldImagePath = $uploadFileDir . $existingImage;
            if (file_exists($oldImagePath)) {
                unlink($oldImagePath);
            }
        }
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to move uploaded file.']);
        exit;
    }
}


    // Escape other inputs
    $reservationID = mysqli_real_escape_string($con, (int)$reservationID);
    $reservationName = mysqli_real_escape_string($con, $reservationName);
    $reservationTime = mysqli_real_escape_string($con, $reservationTime);
    $isBooked = mysqli_real_escape_string($con, (int)$isBooked);
    $newImageName = mysqli_real_escape_string($con, $newImageName);

    // Update reservation in DB
    $sql = "UPDATE reservations SET 
                reservationName = '$reservationName', 
                reservationTime = '$reservationTime', 
                isBooked = '$isBooked',
                reservationImage = '$newImageName'
            WHERE reservationID = '$reservationID'
            LIMIT 1";

    if (mysqli_query($con, $sql)) {
        http_response_code(200);
        echo json_encode(['message' => 'Reservation updated']);
    } else {
        http_response_code(500);
        echo json_encode(['message' => 'Update failed']);
    }
} else {
    http_response_code(405);
    echo json_encode(['message' => 'Method Not Allowed']);
}
?>
