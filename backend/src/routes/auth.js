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

// Demo user data for each role
const demoUsers = {
  'admin': {
    id: 1,
    companyId: 'admin',
    password: 'admin123',
    role: 'admin',
    name: 'Admin User',
    email: 'admin@speciq.com',
    description: 'Full system access'
  },
  'sales-engineer': {
    id: 2,
    companyId: 'sales',
    password: 'sales123',
    role: 'sales-engineer',
    name: 'Sales Engineer',
    email: 'sales@speciq.com',
    description: 'Sales inquiry & tender analysis'
  },
  'standards-expert': {
    id: 3,
    companyId: 'standards',
    password: 'standards123',
    role: 'standards-expert',
    name: 'Standards Expert',
    email: 'standards@speciq.com',
    description: 'Knowledge base management'
  },
  'electrical-team': {
    id: 4,
    companyId: 'electrical',
    password: 'electrical123',
    role: 'electrical-team',
    name: 'Electrical Team',
    email: 'electrical@speciq.com',
    description: 'Quotation retrieval'
  }
};

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    // Validate request body
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { companyId, password, role } = value;

    // Get demo user for the selected role
    const demoUser = demoUsers[role];
    
    if (!demoUser) {
      return res.status(401).json({ error: 'Invalid role selected' });
    }

    // For demo purposes, accept any non-empty company ID and password
    // In production, you would verify against actual user credentials
    if (!companyId.trim() || !password.trim()) {
      return res.status(401).json({ error: 'Company ID and Password are required' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: demoUser.id, 
        companyId: companyId, // Use the provided company ID
        role: demoUser.role,
        name: demoUser.name,
        email: demoUser.email
      },
      process.env.JWT_SECRET || 'demo-secret-key',
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: demoUser.id,
        companyId: companyId, // Use the provided company ID
        role: demoUser.role,
        name: demoUser.name,
        email: demoUser.email,
        description: demoUser.description
      },
      message: `Welcome back, ${demoUser.name}!`
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get available roles endpoint
router.get('/roles', (req, res) => {
  const roles = Object.keys(demoUsers).map(role => ({
    id: role,
    name: demoUsers[role].name,
    description: demoUsers[role].description
  }));
  
  res.json({ roles });
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