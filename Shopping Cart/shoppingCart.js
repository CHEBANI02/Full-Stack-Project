var ShoppingCart = /** @class */ (function () {
    function ShoppingCart() {
        this.items = [];
    }
    // Add item to the cart
    ShoppingCart.prototype.addItem = function (name, price) {
        this.items.push({ name: name, price: price });
    };
    // Remove item from the cart
    ShoppingCart.prototype.removeItem = function (index) {
        if (index >= 0 && index < this.items.length) {
            this.items.splice(index, 1);
        }
        else {
            console.log("Invalid index");
        }
    };
    // Calculate total cost
    ShoppingCart.prototype.getTotalCost = function () {
        var total = 0;
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var item = _a[_i];
            total += item.price;
        }
        return total;
    };
    // Display cart items and total cost
    ShoppingCart.prototype.displayCart = function () {
        console.log("Shopping Cart:");
        this.items.forEach(function (item, index) {
            console.log("".concat(index + 1, ". ").concat(item.name, " - $").concat(item.price));
        });
        console.log("Total Cost: $".concat(this.getTotalCost()));
    };
    return ShoppingCart;
}());
// Example usage
var cart = new ShoppingCart();
cart.addItem("Shirt", 20);
cart.addItem("Pants", 30);
cart.addItem("Shoes", 50);
cart.displayCart(); // Display initial cart
cart.removeItem(1); // Remove "Pants"
console.log("\nAfter removing an item:");
cart.displayCart(); // Display updated cart
