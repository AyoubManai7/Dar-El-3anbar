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
        !empty($data->name) &&
        !empty($data->email) &&
        !empty($data->message)
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
        
        // Prepare SQL statement
        $sql = "INSERT INTO contact_messages (name, email, message, created_at) 
                VALUES (
                    '" . $conn->real_escape_string($data->name) . "', 
                    '" . $conn->real_escape_string($data->email) . "', 
                    '" . $conn->real_escape_string($data->message) . "', 
                    NOW()
                )";
        
        // Execute query
        if ($conn->query($sql)) {
            // Message sent successfully
            http_response_code(201);
            echo json_encode([
                "success" => true,
                "message" => "Votre message a été envoyé avec succès"
            ]);
            
            // Optionally, send an email notification
            // NOTE: This requires proper email configuration on the server
            /*
            $to = "contact@darelanbar.tn";  // Change to actual admin email
            $subject = "Nouveau message de contact";
            $headers = "From: " . $data->email . "\r\n";
            $headers .= "Reply-To: " . $data->email . "\r\n";
            $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
            
            $emailBody = "
                <h3>Nouveau message de contact</h3>
                <p><strong>Nom:</strong> " . htmlspecialchars($data->name) . "</p>
                <p><strong>Email:</strong> " . htmlspecialchars($data->email) . "</p>
                <p><strong>Message:</strong></p>
                <p>" . nl2br(htmlspecialchars($data->message)) . "</p>
            ";
            
            mail($to, $subject, $emailBody, $headers);
            */
        } else {
            // Failed to send message
            http_response_code(500);
            echo json_encode([
                "success" => false,
                "message" => "Erreur lors de l'envoi du message: " . $conn->error
            ]);
        }
    } else {
        // Data incomplete
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "Données incomplètes. Nom, email et message requis."
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