<?php
include 'db.php'; // Database connection file

header("Access-Control-Allow-Origin: http://localhost:3000"); // Replace with your front-end URL
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Allow POST and OPTIONS methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allow specific headers

// Handle preflight request for OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

// Log the incoming data to verify
error_log(print_r($data, true)); // Log the data to check if 'totalAmount' is received

// Check if data was received
if (!$data) {
    echo json_encode(["success" => false, "message" => "No data received or JSON decode error"]);
    exit;
}

// Extract order details
$transaction_id = isset($data['transactionId']) ? trim($data['transactionId']) : null;
$total_amount = isset($data['totalAmount']) ? trim($data['totalAmount']) : null; // Correct key
$items = isset($data['items']) ? $data['items'] : [];

// Log extracted data to check for missing fields
error_log("Transaction ID: " . $transaction_id);
error_log("Total Amount: " . $total_amount);

// Check if all necessary fields are available
$missingFields = [];
if (!$transaction_id) $missingFields[] = 'Transaction ID';
if (!$total_amount) $missingFields[] = 'Total Amount';
if (empty($items)) $missingFields[] = 'Items';

if (count($missingFields) > 0) {
    echo json_encode(["success" => false, "message" => "Missing fields: " . implode(', ', $missingFields)]);
    exit;
}

try {
    // Start transaction
    $pdo->beginTransaction();

    // Insert into orders table
    $stmt = $pdo->prepare("INSERT INTO orders (transaction_id, total_amount, order_date) VALUES (?, ?, ?)");
    $stmt->execute([$transaction_id, $total_amount, date("Y-m-d H:i:s")]); // Using current date-time for order_date
    $order_id = $pdo->lastInsertId(); // Get the order_id generated by the orders table

    // Insert each item into order_items table
    $stmt = $pdo->prepare("INSERT INTO order_items (order_id, product_name, price, quantity) VALUES (?, ?, ?, ?)");
    foreach ($items as $item) {
        // Ensure proper sanitization of item data
        $product_name = isset($item['name']) ? trim($item['name']) : null;
        $price = isset($item['price']) ? trim($item['price']) : null;
        $quantity = isset($item['quantity']) ? (int)$item['quantity'] : 0;

        if ($product_name && $price !== null && $quantity > 0) {
            $stmt->execute([$order_id, $product_name, $price, $quantity]);
        } else {
            echo json_encode(["success" => false, "message" => "Invalid item data"]);
            exit;
        }
    }

    // Commit transaction
    $pdo->commit();

    // Return success response
    echo json_encode(["success" => true, "message" => "Order saved successfully!"]);
} catch (Exception $e) {
    // Rollback in case of error
    $pdo->rollBack();
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>
