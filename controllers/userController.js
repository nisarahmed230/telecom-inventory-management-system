const bcrypt = require('bcryptjs');

// User Registration
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Please provide username, email, and password' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    const [rows, fields] = await db.execute(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );
    
    res.status(201).json({
      message: 'User registered successfully',
      userId: rows.insertId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed, please try again' });
  }
};

// User Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Please provide email and password' });
  }

  try {
    const [rows, fields] = await db.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, rows[0].password); // Compare hashed password

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    res.status(200).json({
      message: 'Login successful',
      userId: rows[0].id, 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed, please try again' });
  }
};
