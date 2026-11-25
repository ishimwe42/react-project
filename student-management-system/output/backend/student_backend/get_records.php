
<?php

// db.php centralizes CORS headers, OPTIONS handling, and the MySQL connection.
require_once "db.php";


// Check database connection
if (!$conn || $conn->connect_error) {
    http_response_code(500);

    echo json_encode([
        "success" => false,
        "message" => "Database connection failed"
    ]);

    exit;
}

// Fetch students
$sql = "SELECT id, fullname, email, age, course, created_at
        FROM students
        ORDER BY id DESC";

$result = $conn->query($sql);

// Check query
if (!$result) {
    http_response_code(500);

    echo json_encode([
        "success" => false,
        "message" => "Unable to retrieve student records",
        "error" => $conn->error
    ]);

    $conn->close();
    exit;
}

// Store students
$students = [];

while ($row = $result->fetch_assoc()) {
    $students[] = $row;
}

// Return JSON response
http_response_code(200);

echo json_encode([
    "success" => true,
    "students" => $students
]);

$conn->close();

?>
