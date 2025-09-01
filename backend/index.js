const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const register = require('./routes/register');
const login = require('./routes/login');

const app = express();

require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use('/api/register', register);
app.use('/api/login', login);

const products = require('./products'); 

app.get('/', (req, res) => {
  res.send('Welcome to our Online Shop API');
}
);

app.get('/products', (req, res) => {
  
  res.json(products);
}
);
// app.get('/products/:id', (req, res) => {
//   const products = [
//     { id: 1, name: 'Laptop', price: 999.99 },
//     { id: 2, name: 'Smartphone', price: 499.99 },
//     { id: 3, name: 'Tablet', price: 299.99 }
//   ];
  
//   const product = products.find(p => p.id === parseInt(req.params.id));
  
//   if (!product) {
//     return res.status(404).send('Product not found');
//   }
  
//   res.json(product);
// }
// );
// app.post('/products', (req, res) => {
//   const newProduct = req.body;
//   // Here you would typically save the product to a database
//   newProduct.id = Date.now(); // Simulating an ID for the new product
//   res.status(201).json(newProduct);
// }
// );
// app.put('/products/:id', (req, res) => {
//   const products = [
//     { id: 1, name: 'Laptop', price: 999.99 },
//     { id: 2, name: 'Smartphone', price: 499.99 },
//     { id: 3, name: 'Tablet', price: 299.99 }
//   ];

//   const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));

//   if (productIndex === -1) {
//     return res.status(404).send('Product not found');
//   }

//   const updatedProduct = { ...products[productIndex], ...req.body };
//   products[productIndex] = updatedProduct;

//   res.json(updatedProduct);
// }
// );
// app.delete('/products/:id', (req, res) => {
//   const products = [
//     { id: 1, name: 'Laptop', price: 999.99 },
//     { id: 2, name: 'Smartphone', price: 499.99 },
//     { id: 3, name: 'Tablet', price: 299.99 }
//   ];

//   const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));

//   if (productIndex === -1) {
//     return res.status(404).send('Product not found');
//   }

//   products.splice(productIndex, 1);
//   res.status(204).send();
// }
// );
const port = process.env.PORT || 5000; 
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}
);

const uri = process.env.DB_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});