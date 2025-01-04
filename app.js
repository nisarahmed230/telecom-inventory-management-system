const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const db = require('./config/db'); 

// Middleware
app.use(express.json());

// Routes
app.use('/api', userRoutes);
app.use('/api', productRoutes);

// Test database connection
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  } else {
    console.log('Database connected successfully!');
  }
});

// API endpoint to get products
app.get('/api/products', async (req, res) => {
  try {
    const [rows, fields] = await db.execute('SELECT * FROM products');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Database query failed' });
  }
});

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
