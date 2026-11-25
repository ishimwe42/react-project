
<?php

// Allow React frontend to communicate with PHP
$origin = $_SERVER["HTTP_ORIGIN"] ?? "";

$allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000"
];

if (in_array($origin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: " . $origin);
    header("Vary: Origin");
}

header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle browser preflight requests
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

// MySQL configuration
$host = "localhost";
$username = "root";
$password = "";
$database = "student_registration";

// Connect to MySQL
$conn = new mysqli(
    $host,
    $username,
    $password,
    $database
);

// Check connection
if ($conn->connect_error) {
    http_response_code(500);

    die(json_encode([
        "success" => false,
        "message" => "Database connection failed: " . $conn->connect_error
    ]));
}

$conn->set_charset("utf8mb4");

?>
