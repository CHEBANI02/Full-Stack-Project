<?php
// Include the database connection file
include 'db.php';

// Fetch all orders along with their items
$query = "
    SELECT o.order_id, o.transaction_id, o.total_amount, o.order_date, oi.item_id, oi.product_name, oi.price, oi.quantity
    FROM orders o
    LEFT JOIN order_items oi ON o.order_id = oi.order_id
    ORDER BY o.order_date DESC";

try {
    $stmt = $pdo->query($query);
    $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    die("Query failed: " . $e->getMessage());
}

// Organize items by order
$groupedOrders = [];
foreach ($orders as $order) {
    $orderId = $order['order_id'];
    if (!isset($groupedOrders[$orderId])) {
        $groupedOrders[$orderId] = [
            'transaction_id' => $order['transaction_id'],
            'total_amount' => $order['total_amount'],
            'order_date' => $order['order_date'],
            'items' => []
        ];
    }
    $groupedOrders[$orderId]['items'][] = [
        'item_id' => $order['item_id'],
        'product_name' => $order['product_name'],
        'price' => $order['price'],
        'quantity' => $order['quantity']
    ];
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel - Order Details</title>
    <link rel="stylesheet" href="admin.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #fafbff;
            margin: 0;
            padding: 20px;
            color: #2c3e50;
        }

        h1 {
            text-align: center;
            color: #2c3e50;
            font-size: 2rem;
            margin-bottom: 20px;
        }

        table {
            width: 90%;
            margin: 20px auto;
            border-collapse: collapse;
            background-color: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
            transition: all 0.4s ease;
        }

        table:hover {
            transform: scale(1.03);
        }

        th, td {
            padding: 15px;
            text-align: center;
            font-size: 15px;
            transition: background-color 0.3s;
        }

        th {
            background-color: #4c9f70;
            color: #ffffff;
            font-weight: bold;
        }

        td {
            background-color: #f4f9f4;
            color: #333;
        }

        /* Order Details Subtable */
        .order-details-table {
            width: 100%;
            border-collapse: collapse;
            background-color: #fffcf7;
            margin-top: 8px;
            box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05);
        }

        .order-details-table th {
            background-color: #f39c12;
            color: #ffffff;
            font-weight: 500;
            padding: 8px;
            text-align: center;
            font-size: 14px;
            border: 1px solid #e7e7e7;
        }

        .order-details-table td {
            background-color: #fefae0;
            padding: 10px;
            font-size: 14px;
            border: 1px solid #e7e7e7;
        }

        /* Highlight total amount */
        .total-amount {
            font-weight: bold;
            color: #27ae60;
        }

        /* Row hover effects */
        tr:hover td {
            background-color: #e3f2fd;
            color: #333;
        }

        .order-details-table tr:hover td {
            background-color: #fde3a7;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            table, .order-details-table {
                width: 100%;
                font-size: 13px;
            }
            th, td {
                padding: 12px;
            }
        }
    </style>
</head>
<body>
    <h1>Order Details</h1>
    <table>
        <thead>
            <tr>
                <th>Order ID</th>
                <th>Transaction ID</th>
                <th>Order Date</th>
                <th>Order Details</th>
                <th>Total Amount</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($groupedOrders as $orderId => $order): ?>
                <tr>
                    <td><?php echo htmlspecialchars($orderId); ?></td>
                    <td><?php echo htmlspecialchars($order['transaction_id']); ?></td>
                    <td><?php echo htmlspecialchars($order['order_date']); ?></td>
                    <td>
                        <table class="order-details-table">
                            <thead>
                                <tr>
                                    <th>Item ID</th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($order['items'] as $item): ?>
                                    <tr>
                                        <td><?php echo htmlspecialchars($item['item_id']); ?></td>
                                        <td><?php echo htmlspecialchars($item['product_name']); ?></td>
                                        <td>₹<?php echo htmlspecialchars($item['price']); ?></td>
                                        <td><?php echo htmlspecialchars($item['quantity']); ?></td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    </td>
                    <td class="total-amount">₹<?php echo htmlspecialchars($order['total_amount']); ?></td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</body>
</html>
