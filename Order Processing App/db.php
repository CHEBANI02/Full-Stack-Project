<?php
// db.php - Database connection
$host = 'localhost';
$port = '5432'; 
$dbname = 'order_processing';
$user = 'nebula';
$password = 'cool';

try {
    $pdo = new PDO("pgsql:host=$host;dbname=$dbname", $user, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
} catch (PDOException $e) {
    die("Could not connect to the database: " . $e->getMessage());
}
?>
