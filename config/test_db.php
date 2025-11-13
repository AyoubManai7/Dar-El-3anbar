<?php
// Test file to verify database connection
require_once 'config/db.php';

// Try to connect
$conn = getConnection();

if ($conn) {
    echo "Database connection successful!";
    
    // Test query - count venues
    $sql = "SELECT COUNT(*) as venue_count FROM venues";
    $result = $conn->query($sql);
    
    if ($result) {
        $row = $result->fetch_assoc();
        echo "<br>Number of venues in database: " . $row['venue_count'];
    } else {
        echo "<br>Error executing query: " . $conn->error;
    }
    
    // Close connection
    closeConnection($conn);
} else {
    echo "Failed to connect to database.";
}
?>