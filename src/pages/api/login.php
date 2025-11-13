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
        !empty($data->email) &&
        !empty($data->password)
    ) {
        // Escape special characters
        $email = $conn->real_escape_string($data->email);
        $password = $data->password; // We'll verify this against the hashed password
        
        // SQL query to check if user exists
        $sql = "SELECT id, first_name, last_name, email, password FROM users WHERE email = '$email'";
        $result = $conn->query($sql);
        
        if ($result) {
            // Check if user exists
            if ($result->num_rows > 0) {
                $user = $result->fetch_assoc();
                
                // Verify password
                if (password_verify($password, $user['password'])) {
                    // Password is correct, create user data to return
                    $user_data = [
                        "id" => $user['id'],
                        "first_name" => $user['first_name'],
                        "last_name" => $user['last_name'],
                        "email" => $user['email']
                    ];
                    
                    // Return user data as successful login
                    http_response_code(200);
                    echo json_encode([
                        "success" => true,
                        "message" => "Login successful",
                        "user" => $user_data
                    ]);
                } else {
                    // Password is incorrect
                    http_response_code(401);
                    echo json_encode([
                        "success" => false,
                        "message" => "Email ou mot de passe incorrect"
                    ]);
                }
            } else {
                // No user found with this email
                http_response_code(401);
                echo json_encode([
                    "success" => false,
                    "message" => "Email ou mot de passe incorrect"
                ]);
            }
        } else {
            // Database query error
            http_response_code(500);
            echo json_encode([
                "success" => false,
                "message" => "Erreur de connexion à la base de données: " . $conn->error
            ]);
        }
    } else {
        // Data incomplete
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "Données incomplètes. Email et mot de passe requis."
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