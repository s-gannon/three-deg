<?php
// Start session
session_start();

// Check if form is submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Retrieve email and password from form POST
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Validate email and password (you can add more validation if needed)
    if (empty($email) || empty($password)) {
        // Redirect back to login page with error message
        header("Location: login.html?error=Email and password are required");
        exit();
    }

    // Database connection details
    $host = 'localhost';  // Change this to your database host
    $db   = 'your_database';  // Change this to your database name
    $user = 'your_username';  // Change this to your database username
    $pass = 'your_password';  // Change this to your database password
    $charset = 'utf8mb4';

    // Database connection
    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    try {
        $pdo = new PDO($dsn, $user, $pass, $options);
    } catch (PDOException $e) {
        // Redirect back to login page with error message
        header("Location: login.html?error=Database connection error");
        exit();
    }

    // Query to check if the email and password match
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    // Verify password
    if ($user && password_verify($password, $user['password'])) {
        // Password correct, start a new session
        session_regenerate_id();
        $_SESSION['email'] = $email; // Storing email in session
        header("Location: dashboard.php"); // Redirect to your dashboard page
        exit();
    } else {
        // Password incorrect, redirect back to login page with error message
        header("Location: login.html?error=Incorrect email or password");
        exit();
    }
} else {
    // Redirect back to login page if accessed directly
    header("Location: login.html");
    exit();
}
?>
