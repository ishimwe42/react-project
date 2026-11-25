
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

$email = trim($data["email"] ?? "");
$password = $data["password"] ?? "";

if ($email === "" || $password === "") {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Email and password are required"
    ]);
    exit;
}

$stmt = $conn->prepare(
    "SELECT id, fullname, email, age, course, password
     FROM students WHERE email = ?"
);

$stmt->bind_param("s", $email);
$stmt->execute();

$result = $stmt->get_result();

if ($student = $result->fetch_assoc()) {

    if (password_verify($password, $student["password"])) {

        unset($student["password"]);

        echo json_encode([
            "success" => true,
            "message" => "Login successful",
            "student" => $student
        ]);

    } else {
        http_response_code(401);
        echo json_encode([
            "success" => false,
            "message" => "Incorrect password"
        ]);
    }

} else {
    http_response_code(404);
    echo json_encode([
        "success" => false,
        "message" => "Student account not found"
    ]);
}

$stmt->close();
$conn->close();

?>
