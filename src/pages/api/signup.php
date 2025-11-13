<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Include database connection
require_once '../config/db.php';

// Get database connection
$conn = getConnection();

// Get HTTP method
$method = $_SERVER['REQUEST_METHOD'];

// Process based on HTTP method
if ($method == 'POST') {
    // Get posted data
    $data = json_decode(file_get_contents("php://input"));
    
    // Check if all required fields are present
    if (
        !empty($data->first_name) &&
        !empty($data->last_name) &&
        !empty($data->email) &&
        !empty($data->phone) &&
        !empty($data->password) &&
        !empty($data->terms)
    ) {
        // Validate email format
        if (!filter_var($data->email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode([
                "success" => false,
                "message" => "Format d'email invalide."
            ]);
            exit;
        }
        
        // Check if email already exists
        $check_email = "SELECT id FROM users WHERE email = '" . $conn->real_escape_string($data->email) . "'";
        $result = $conn->query($check_email);
        
        if ($result && $result->num_rows > 0) {
            // Email already exists
            http_response_code(409);
            echo json_encode([
                "success" => false,
                "message" => "Cette adresse email est déjà utilisée."
            ]);
            exit;
        }
        
        // Hash password
        $hashed_password = password_hash($data->password, PASSWORD_DEFAULT);
        
        // Prepare SQL statement
        $sql = "INSERT INTO users (first_name, last_name, email, phone, password, created_at) 
                VALUES (
                    '" . $conn->real_escape_string($data->first_name) . "', 
                    '" . $conn->real_escape_string($data->last_name) . "', 
                    '" . $conn->real_escape_string($data->email) . "', 
                    '" . $conn->real_escape_string($data->phone) . "',
                    '" . $hashed_password . "',
                    NOW()
                )";
        
        // Execute query
        if ($conn->query($sql)) {
            // Registration successful
            $user_id = $conn->insert_id;
            
            // Return success response with user data
            http_response_code(201);
            echo json_encode([
                "success" => true,
                "message" => "Inscription réussie",
                "user" => [
                    "id" => $user_id,
                    "first_name" => $data->first_name,
                    "last_name" => $data->last_name,
                    "email" => $data->email,
                    "phone" => $data->phone
                ]
            ]);
        } else {
            // Failed to register
            http_response_code(500);
            echo json_encode([
                "success" => false,
                "message" => "Erreur lors de l'inscription: " . $conn->error
            ]);
        }
    } else {
        // Data incomplete
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "Données incomplètes. Tous les champs sont requis."
        ]);
    }
} else {
    // Method not allowed
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Méthode non autorisée"
    ]);
}

// Close database connection
closeConnection($conn);
?>