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
        !empty($data->venue_id) &&
        !empty($data->user_id) &&
        !empty($data->booking_date)
    ) {
        // Check if date is valid
        $booking_date = date('Y-m-d', strtotime($data->booking_date));
        if ($booking_date === false) {
            http_response_code(400);
            echo json_encode([
                "success" => false,
                "message" => "Date de réservation invalide."
            ]);
            exit;
        }
        
        // Check if venue exists
        $venue_check = "SELECT id, name FROM venues WHERE id = " . (int)$data->venue_id;
        $venue_result = $conn->query($venue_check);
        
        if (!$venue_result || $venue_result->num_rows === 0) {
            http_response_code(404);
            echo json_encode([
                "success" => false,
                "message" => "Salle introuvable."
            ]);
            exit;
        }
        
        $venue = $venue_result->fetch_assoc();
        
        // Check if user exists
        $user_check = "SELECT id, first_name, last_name FROM users WHERE id = " . (int)$data->user_id;
        $user_result = $conn->query($user_check);
        
        if (!$user_result || $user_result->num_rows === 0) {
            http_response_code(404);
            echo json_encode([
                "success" => false,
                "message" => "Utilisateur introuvable."
            ]);
            exit;
        }
        
        $user = $user_result->fetch_assoc();
        
        // Check if date is already booked for this venue
        $date_check = "SELECT id FROM bookings WHERE venue_id = " . (int)$data->venue_id . " AND booking_date = '$booking_date' AND status IN ('confirmed', 'pending')";
        $date_result = $conn->query($date_check);
        
        if ($date_result && $date_result->num_rows > 0) {
            http_response_code(409);
            echo json_encode([
                "success" => false,
                "message" => "Cette date est déjà réservée pour cette salle."
            ]);
            exit;
        }
        
        // All checks passed, create booking
        $booking_notes = !empty($data->notes) ? "'" . $conn->real_escape_string($data->notes) . "'" : "NULL";
        
        $sql = "INSERT INTO bookings (venue_id, user_id, booking_date, status, notes, created_at) 
                VALUES (
                    " . (int)$data->venue_id . ", 
                    " . (int)$data->user_id . ", 
                    '$booking_date', 
                    'pending', 
                    $booking_notes, 
                    NOW()
                )";
        
        // Execute query
        if ($conn->query($sql)) {
            // Booking created successfully
            $booking_id = $conn->insert_id;
            
            // Return success response
            http_response_code(201);
            echo json_encode([
                "success" => true,
                "message" => "Réservation créée avec succès",
                "booking" => [
                    "id" => $booking_id,
                    "venue_name" => $venue['name'],
                    "user_name" => $user['first_name'] . ' ' . $user['last_name'],
                    "booking_date" => $booking_date,
                    "status" => "pending"
                ]
            ]);
        } else {
            // Failed to create booking
            http_response_code(500);
            echo json_encode([
                "success" => false,
                "message" => "Erreur lors de la création de la réservation: " . $conn->error
            ]);
        }
    } else {
        // Data incomplete
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "Données incomplètes. ID de salle, ID d'utilisateur et date de réservation requis."
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