<?php
require 'connect.php';

// Function to upload image and return the new file name or false if fail
function uploadImage($file) {
    $targetDir = "uploads/";  // Your images folder
    $fileName = basename($file["name"]);
    $targetFilePath = $targetDir . uniqid() . "-" . $fileName; // Unique name to avoid conflicts
    $fileType = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

    // Allow certain file formats
    $allowedTypes = ['jpg', 'jpeg', 'png', 'gif'];

    if (in_array($fileType, $allowedTypes)) {
        if (move_uploaded_file($file["tmp_name"], $targetFilePath)) {
            return basename($targetFilePath);
        }
    }
    return false;
}

// Check if form data was submitted (multipart/form-data)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Make sure required fields exist
    if (!isset($_POST['reservationID']) || !isset($_POST['reservationName']) || !isset($_POST['reservationTime']) || !isset($_POST['isBooked'])) {
        http_response_code(400);
        echo json_encode(['message' => 'Missing required fields']);
        exit();
    }

    $reservationID = intval($_POST['reservationID']);
    $reservationName = mysqli_real_escape_string($con, $_POST['reservationName']);
    $reservationTime = mysqli_real_escape_string($con, $_POST['reservationTime']);
    $isBooked = intval($_POST['isBooked']);
    $existingImage = isset($_POST['existingImage']) ? $_POST['existingImage'] : '';

    $newImageName = $existingImage;  // Default to existing image if no new image uploaded

    // Check if new image uploaded
    if (isset($_FILES['reservationImage']) && $_FILES['reservationImage']['error'] == UPLOAD_ERR_OK) {
        $uploadedImageName = uploadImage($_FILES['reservationImage']);
        if ($uploadedImageName !== false) {
            $newImageName = $uploadedImageName;
        } else {
            http_response_code(422);
            echo json_encode(['message' => 'Image upload failed or invalid file type']);
            exit();
        }
    }

    // Update query including image
    $sql = "UPDATE `reservations` SET 
                `reservationName` = '$reservationName',
                `reservationTime` = '$reservationTime',
                `isBooked` = '$isBooked',
                `reservationImage` = '$newImageName'
            WHERE `reservationID` = '$reservationID'
            LIMIT 1";

    if (mysqli_query($con, $sql)) {
        // After successful update, check if old image is used by any row
        if ($existingImage !== '' && $existingImage !== $newImageName) {
            $checkSql = "SELECT COUNT(*) AS count FROM reservations WHERE reservationImage = '$existingImage'";
            $result = mysqli_query($con, $checkSql);
            $row = mysqli_fetch_assoc($result);
            if ($row['count'] == 0) {
                // Delete old image file
                $oldImagePath = "uploads/" . $existingImage;
                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath);
                }
            }
        }

        http_response_code(200);
        echo json_encode(['message' => 'Reservation updated successfully']);
    } else {
        http_response_code(422);
        echo json_encode(['message' => 'Database update failed']);
    }
} else {
    http_response_code(405);
    echo json_encode(['message' => 'Invalid request method']);
}
?>
