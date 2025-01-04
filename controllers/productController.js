
const db = require('../config/db');

exports.getAllProducts = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM products');
    res.json(rows);  
  } catch (err) {
    res.status(500).json({ error: 'Database query failed' });
  }
};

exports.addProduct = async (req, res) => {
  const { product_name, description, product_category_name, model_number, serial_number, stock_level, reorder_point, supplier_id } = req.body;
  
  const query = `INSERT INTO products (product_name, description, product_category_name, model_number, serial_number, stock_level, reorder_point, supplier_id) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  try {
    const result = await db.execute(query, [product_name, description, product_category_name, model_number, serial_number, stock_level, reorder_point, supplier_id]);
    res.status(201).json({ message: 'Product added successfully', productId: result[0].insertId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add product' });
  }
};


exports.getProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    const [rows] = await db.execute('SELECT * FROM products WHERE id = ?', [productId]);
    if (rows.length > 0) {
      res.json(rows[0]);  
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Database query failed' });
  }
};
