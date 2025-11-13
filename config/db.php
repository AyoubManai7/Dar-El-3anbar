<?php
// Database connection configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'root'); // Default EasyPHP user
define('DB_PASS', ''); // Default EasyPHP password is empty
define('DB_NAME', 'dar_el_3anbar');

// Create connection
function getConnection() {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    // Set charset to UTF-8
    $conn->set_charset("utf8mb4");
    
    return $conn;
}

// Function to close connection
function closeConnection($conn) {
    $conn->close();
}
?>