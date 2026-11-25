
<?php

// Return JSON responses
header("Content-Type: application/json");

// Hide PHP warnings from the browser
ini_set("display_errors", "0");
ini_set("log_errors", "1");

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {

    // Connect to database
    require_once "db.php";

    // Only allow POST requests
    if ($_SERVER["REQUEST_METHOD"] !== "POST") {
        http_response_code(405);
        echo json_encode([
            "success" => false,
            "message" => "POST method required"
        ]);
        exit;
    }

    // Receive data from React
    $data = json_decode(file_get_contents("php://input"), true);

    if (!is_array($data)) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "Invalid request data"
        ]);
        exit;
    }

    // Get student information
    $fullname = trim($data["fullname"] ?? "");
    $email = trim($data["email"] ?? "");
    $age = (int)($data["age"] ?? 0);
    $course = trim($data["course"] ?? "");
    $password = $data["password"] ?? "";

    // Validate information
    if (
        $fullname === "" ||
        !filter_var($email, FILTER_VALIDATE_EMAIL) ||
        $age < 1 ||
        $course === "" ||
        strlen($password) < 6
    ) {
        http_response_code(400);

        echo json_encode([
            "success" => false,
            "message" => "Please enter valid student information. Password must be at least 6 characters."
        ]);
        exit;
    }

    // Hash password
    $hashedPassword = password_hash(
        $password,
        PASSWORD_DEFAULT
    );

    // Insert student into database
    $sql = "INSERT INTO students
            (fullname, email, age, course, password)
            VALUES (?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);

    $stmt->bind_param(
        "ssiss",
        $fullname,
        $email,
        $age,
        $course,
        $hashedPassword
    );

    $stmt->execute();

    // Successful registration
    echo json_encode([
        "success" => true,
        "message" => "Student registered successfully",
        "id" => $conn->insert_id
    ]);

    $stmt->close();
    $conn->close();

} catch (Throwable $e) {

    http_response_code(500);

    // Record technical error in PHP log
    error_log($e->getMessage());

    echo json_encode([
        "success" => false,
        "message" => "Registration database error: " . $e->getMessage()
    ]);
}

?>
