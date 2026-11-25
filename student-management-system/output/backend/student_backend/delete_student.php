
<?php

include "db.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "POST method required"
    ]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$id = (int)($data["id"] ?? 0);

if ($id <= 0) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Valid student ID is required"
    ]);
    exit;
}

$stmt = $conn->prepare(
    "DELETE FROM students WHERE id = ?"
);

$stmt->bind_param("i", $id);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    echo json_encode([
        "success" => true,
        "message" => "Student deleted successfully"
    ]);
} else {
    http_response_code(404);
    echo json_encode([
        "success" => false,
        "message" => "Student not found"
    ]);
}

$stmt->close();
$conn->close();

?>
