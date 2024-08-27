const express = require('express');
const app = express();
const cors = require('cors');
const port = 3005;

app.use(express.json());
app.use(cors());

let foodProducts = [];

app.post('/createproduct', (req, res) => {
    const newProduct = req.body;
    if (!newProduct.name) {
        res.status(400).json({ error: 'No data received on the server' });
        return;
    } else {
        foodProducts.push(newProduct);
        console.log(`Product added successfully: ${newProduct.name}`);
        console.log(foodProducts);
        res.json(`Product created: ${newProduct.name}`);
    }
});

app.get('/getproduct/products/:name', (req, res) => {
    const name1 = req.params.name;
    if (!name1) {
        res.status(400).json({ error: 'No data received by the server' });
        return;
    } else {
        const product = foodProducts.find(product => product.name === name1);
        if (!product) {
            res.json(`No product found with the name ${name1}`);
        } else {
            res.json(`Product found: ${product.name}, Category: ${product.category}, Price: ${product.price}`);
            console.log(product);
        }
    }
});

app.get('/getproductdetails/products/:name', (req, res) => {
    const name1 = req.params.name;
    if (!name1) {
        res.status(400).json({ error: 'No data received by the server' });
        return;
    } else {
        const product = foodProducts.find(product => product.name === name1);
        if (!product) {
            res.json('No product found');
        } else {
            res.json(product);
            console.log(product);
        }
    }
});

app.put('/updateproduct/products/:name', (req, res) => {
    const name1 = req.params.name;
    const { category, price } = req.body;
    const index = foodProducts.findIndex(product => product.name === name1);
    if (index !== -1) {
        const oldProduct = foodProducts[index];
        oldProduct.category = category;
        oldProduct.price = price;

        foodProducts[index] = oldProduct;

        console.log(foodProducts);

        res.json(`Details updated for ${name1}`);
    } else {
        res.status(404).json({ error: 'No product found' });
    }
});

app.delete('/deleteproduct/products/:name', (req, res) => {
    const name1 = req.params.name;
    const index = foodProducts.findIndex(product => product.name === name1);
    if (index !== -1) {
        foodProducts.splice(index, 1);
        res.json('Product deleted successfully');
        console.log(foodProducts);
    } else {
        res.status(400).json({ error: 'Product not found' });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

