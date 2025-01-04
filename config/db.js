const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '127.0.0.1',           
  user: 'root',                
  password: 'Root@123',    
  database: 'telecom_inventory' 
});

// Establish the connection
connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    process.exit(1); 
  }
  console.log('Database connected successfully!');
});

module.exports = connection;
