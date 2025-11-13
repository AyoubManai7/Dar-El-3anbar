<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// CORS headers
header("Access-Control-Allow-Origin: http://localhost:8081");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept, Origin, X-Requested-With, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// Handle OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only POST requests beyond this point
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Method not allowed. Only POST requests accepted."
    ]);
    exit();
}

// Get and decode JSON input
$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Invalid JSON data: " . json_last_error_msg()
    ]);
    exit();
}

// Validate required fields
$required = ['email', 'password'];
$missing = [];

foreach ($required as $field) {
    if (!isset($data[$field]) || trim($data[$field]) === '') {
        $missing[] = $field;
    }
}

if (!empty($missing)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Missing required fields: " . implode(', ', $missing)
    ]);
    exit();
}

// Extract and validate data
$email = trim($data['email']);
$password = $data['password'];

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Invalid email format"
    ]);
    exit();
}

// Database connection
$servername = "127.0.0.1";
$username = "root";
$password_db = "";
$dbname = "dar_el_3anbar";

try {
    $conn = new mysqli($servername, $username, $password_db, $dbname);

    if ($conn->connect_error) {
        throw new Exception("Database connection failed: " . $conn->connect_error);
    }

    // Check if user exists
    $checkStmt = $conn->prepare("SELECT id, first_name, password FROM clients WHERE email = ?");
    $checkStmt->bind_param("s", $email);
    $checkStmt->execute();
    $result = $checkStmt->get_result();

    if ($result->num_rows === 0) {
        http_response_code(401);
        echo json_encode([
            "success" => false,
            "message" => "Vos informations sont incorrectes."
        ]);
        $checkStmt->close();
        $conn->close();
        exit();
    }

    $user = $result->fetch_assoc();
    $checkStmt->close();

    // Verify password
    if (!password_verify($password, $user['password'])) {
        http_response_code(401);
        echo json_encode([
            "success" => false,
            "message" => "Vos informations sont incorrectes."
        ]);
        $conn->close();
        exit();
    }

    // Successful login
    echo json_encode([
        "success" => true,
        "message" => "Bienvenu !",
        "user_id" => $user['id'],
        "user_name" => $user['first_name']
    ]);

    $conn->close();

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Erreur lors de la connexion. Veuillez réessayer.",
        "error" => $e->getMessage()
    ]);
}
?>
