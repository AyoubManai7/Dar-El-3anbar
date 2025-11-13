<?php
header("Access-Control-Allow-Origin: *"); // Allow all origins (or specify localhost if needed)
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'config/db.php';

$conn = getConnection();

// Get JSON from frontend
$data = json_decode(file_get_contents("php://input"), true);

// Extract and sanitize input
$firstName = $conn->real_escape_string($data['firstName']);
$lastName = $conn->real_escape_string($data['lastName']);
$email = $conn->real_escape_string($data['email']);
$phone = $conn->real_escape_string($data['phone']);
$password = password_hash($data['password'], PASSWORD_BCRYPT);
$fullName = $firstName . ' ' . $lastName;

// Insert into DB
$sql = "INSERT INTO users (email, password, full_name, phone) VALUES ('$email', '$password', '$fullName', '$phone')";

if ($conn->query($sql)) {
    echo json_encode(["success" => true, "message" => "User registered successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
}

closeConnection($conn);
?>
