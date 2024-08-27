class ShoppingCart {
    private items: { name: string, price: number }[] = [];

    addItem(name: string, price: number): void {
        this.items.push({ name, price });
    }

    
    removeItem(index: number): void {
        if (index >= 0 && index < this.items.length) {
            this.items.splice(index, 1);
        } else {
            console.log("Invalid index");
        }
    }

    
    getTotalCost(): number {
        let total = 0;
        for (const item of this.items) {
            total += item.price;
        }
        return total;
    }

    
    displayCart(): void {
        console.log("Shopping Cart:");
        this.items.forEach((item, index) => {
            console.log(`${index + 1}. ${item.name} - $${item.price}`);
        });
        console.log(`Total Cost: $${this.getTotalCost()}`);
    }
}


const cart = new ShoppingCart();

cart.addItem("Shirt", 20);
cart.addItem("Pants", 30);
cart.addItem("Shoes", 50);

cart.displayCart(); 

cart.removeItem(1); 
console.log("\nAfter removing an item:");
cart.displayCart(); 