<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
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

// Get request method
$method = $_SERVER['REQUEST_METHOD'];

// Get venue ID from URL parameter if present
$venue_id = isset($_GET['id']) ? $_GET['id'] : null;

// Filter parameters
$location = isset($_GET['location']) ? $_GET['location'] : null;
$type = isset($_GET['type']) ? $_GET['type'] : null;
$min_price = isset($_GET['min_price']) ? (int)$_GET['min_price'] : null;
$max_price = isset($_GET['max_price']) ? (int)$_GET['max_price'] : null;
$min_capacity = isset($_GET['min_capacity']) ? (int)$_GET['min_capacity'] : null;

// Process based on HTTP method
switch ($method) {
    case 'GET':
        if ($venue_id) {
            // Get specific venue details
            getVenueDetails($conn, $venue_id);
        } else {
            // Get all venues with optional filters
            getVenues($conn, $location, $type, $min_price, $max_price, $min_capacity);
        }
        break;
        
    case 'POST':
        // Create new venue (requires authentication, implement later)
        http_response_code(401);
        echo json_encode(["message" => "Authentication required"]);
        break;
        
    case 'PUT':
        // Update venue (requires authentication, implement later)
        http_response_code(401);
        echo json_encode(["message" => "Authentication required"]);
        break;
        
    case 'DELETE':
        // Delete venue (requires authentication, implement later)
        http_response_code(401);
        echo json_encode(["message" => "Authentication required"]);
        break;
        
    default:
        http_response_code(405);
        echo json_encode(["message" => "Method not allowed"]);
        break;
}

// Close the database connection
closeConnection($conn);

// Function to get all venues with optional filters
function getVenues($conn, $location = null, $type = null, $min_price = null, $max_price = null, $min_capacity = null) {
    // Start building the SQL query
    $sql = "SELECT * FROM venues WHERE 1=1";
    
    // Add filters if provided
    if ($location) {
        $sql .= " AND location LIKE '%" . $conn->real_escape_string($location) . "%'";
    }
    
    if ($type && $type != 'all') {
        $sql .= " AND type = '" . $conn->real_escape_string($type) . "'";
    }
    
    if ($min_price !== null) {
        $sql .= " AND price >= " . $min_price;
    }
    
    if ($max_price !== null) {
        $sql .= " AND price <= " . $max_price;
    }
    
    if ($min_capacity !== null) {
        $sql .= " AND capacity >= " . $min_capacity;
    }
    
    // Execute query
    $result = $conn->query($sql);
    
    if ($result) {
        $venues = [];
        
        // Fetch all rows
        while ($row = $result->fetch_assoc()) {
            // Get venue images
            $images_sql = "SELECT image_url FROM venue_images WHERE venue_id = " . $row['id'];
            $images_result = $conn->query($images_sql);
            
            $images = [];
            if ($images_result && $images_result->num_rows > 0) {
                while ($img_row = $images_result->fetch_assoc()) {
                    $images[] = $img_row['image_url'];
                }
            }
            
            // Add images array to venue data
            $row['images'] = $images;
            
            // Add venue to results
            $venues[] = $row;
        }
        
        // Return venues as JSON
        http_response_code(200);
        echo json_encode($venues);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Error: " . $conn->error]);
    }
}

// Function to get details of a specific venue
function getVenueDetails($conn, $venue_id) {
    // Get venue details
    $sql = "SELECT * FROM venues WHERE id = " . $conn->real_escape_string($venue_id);
    $result = $conn->query($sql);
    
    if ($result && $result->num_rows > 0) {
        $venue = $result->fetch_assoc();
        
        // Get venue images
        $images_sql = "SELECT image_url FROM venue_images WHERE venue_id = " . $venue_id;
        $images_result = $conn->query($images_sql);
        
        $images = [];
        if ($images_result && $images_result->num_rows > 0) {
            while ($img_row = $images_result->fetch_assoc()) {
                $images[] = $img_row['image_url'];
            }
        }
        
        // Get venue features
        $features_sql = "SELECT feature_name FROM venue_features WHERE venue_id = " . $venue_id;
        $features_result = $conn->query($features_sql);
        
        $features = [];
        if ($features_result && $features_result->num_rows > 0) {
            while ($feature_row = $features_result->fetch_assoc()) {
                $features[] = $feature_row['feature_name'];
            }
        }
        
        // Add images and features to venue data
        $venue['images'] = $images;
        $venue['features'] = $features;
        
        // Get unavailable dates (could be from a bookings table)
        $dates_sql = "SELECT booking_date FROM bookings WHERE venue_id = " . $venue_id . " AND status = 'confirmed'";
        $dates_result = $conn->query($dates_sql);
        
        $unavailable_dates = [];
        if ($dates_result && $dates_result->num_rows > 0) {
            while ($date_row = $dates_result->fetch_assoc()) {
                $unavailable_dates[] = $date_row['booking_date'];
            }
        }
        
        $venue['unavailable_dates'] = $unavailable_dates;
        
        // Return venue details as JSON
        http_response_code(200);
        echo json_encode($venue);
    } else {
        http_response_code(404);
        echo json_encode(["message" => "Venue not found"]);
    }
}
?>