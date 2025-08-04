const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const router = express.Router();

// Validation schemas
const loginSchema = Joi.object({
  companyId: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().valid('admin', 'sales-engineer', 'standards-expert', 'electrical-team').required()
});

// Demo user data (in production, this would come from a database)
const demoUsers = [
  {
    id: 1,
    companyId: 'admin',
    password: '$2a$10$demo.hash.for.admin',
    role: 'admin',
    name: 'Admin User',
    email: 'admin@speciq.com'
  },
  {
    id: 2,
    companyId: 'sales',
    password: '$2a$10$demo.hash.for.sales',
    role: 'sales-engineer',
    name: 'Sales Engineer',
    email: 'sales@speciq.com'
  },
  {
    id: 3,
    companyId: 'standards',
    password: '$2a$10$demo.hash.for.standards',
    role: 'standards-expert',
    name: 'Standards Expert',
    email: 'standards@speciq.com'
  },
  {
    id: 4,
    companyId: 'electrical',
    password: '$2a$10$demo.hash.for.electrical',
    role: 'electrical-team',
    name: 'Electrical Team',
    email: 'electrical@speciq.com'
  }
];

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    // Validate request body
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { companyId, password, role } = value;

    // Find user (in production, this would query a database)
    const user = demoUsers.find(u => u.companyId === companyId && u.role === role);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // In demo mode, accept any password for demo users
    // In production, you would verify the password hash
    const isValidPassword = true; // bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        companyId: user.companyId, 
        role: user.role,
        name: user.name,
        email: user.email
      },
      process.env.JWT_SECRET || 'demo-secret-key',
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        companyId: user.companyId,
        role: user.role,
        name: user.name,
        email: user.email
      },
      message: `Welcome back, ${user.name}!`
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Verify token endpoint
router.get('/verify', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'demo-secret-key');
    res.json({ valid: true, user: decoded });

  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Logout endpoint
router.post('/logout', (req, res) => {
  // In a real application, you might want to blacklist the token
  res.json({ success: true, message: 'Logged out successfully' });
});

module.exports = router; 