const express = require('express');
const router = express.Router();

// Demo data for knowledge base
const standards = [
  {
    id: 1,
    title: 'Hydraulic Control Valves - ISO 1219-1:2012',
    summary: 'Specifications for hydraulic fluid power systems and components',
    standardCode: 'ISO 1219-1:2012',
    category: 'Valves',
    body: 'ISO',
    status: 'active',
    lastUpdated: '2023-12-15',
    content: 'Detailed specifications for hydraulic control valves including pressure ratings, flow characteristics, and material requirements.'
  },
  {
    id: 2,
    title: 'Electrical Relays - IEC 61810-1:2015',
    summary: 'Electromechanical elementary relays - Part 1: General and safety requirements',
    standardCode: 'IEC 61810-1:2015',
    category: 'Relays',
    body: 'IEC',
    status: 'active',
    lastUpdated: '2023-11-20',
    content: 'Comprehensive requirements for electromechanical relays including safety standards and performance criteria.'
  },
  {
    id: 3,
    title: 'Industrial Cables - DIN VDE 0298-4:2013',
    summary: 'Current-carrying capacity of cables and flexible cords',
    standardCode: 'DIN VDE 0298-4:2013',
    category: 'Cables',
    body: 'DIN',
    status: 'active',
    lastUpdated: '2023-10-08',
    content: 'Standards for current-carrying capacity and installation requirements for industrial cables.'
  }
];

const standardBodies = [
  { id: 'iso', name: 'ISO', count: 156 },
  { id: 'iec', name: 'IEC', count: 89 },
  { id: 'din', name: 'DIN', count: 234 },
  { id: 'astm', name: 'ASTM', count: 67 },
  { id: 'api', name: 'API', count: 45 }
];

const itemCategories = [
  { id: 'valves', name: 'Valves', count: 89 },
  { id: 'cables', name: 'Cables', count: 156 },
  { id: 'relays', name: 'Relays', count: 67 },
  { id: 'pumps', name: 'Pumps', count: 45 },
  { id: 'motors', name: 'Motors', count: 78 },
  { id: 'sensors', name: 'Sensors', count: 123 }
];

// Get all standards
router.get('/standards', (req, res) => {
  try {
    const { body, category, search } = req.query;
    
    let filteredStandards = [...standards];
    
    if (body) {
      filteredStandards = filteredStandards.filter(standard => 
        standard.body.toLowerCase() === body.toLowerCase()
      );
    }
    
    if (category) {
      filteredStandards = filteredStandards.filter(standard => 
        standard.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    if (search) {
      filteredStandards = filteredStandards.filter(standard => 
        standard.title.toLowerCase().includes(search.toLowerCase()) ||
        standard.summary.toLowerCase().includes(search.toLowerCase()) ||
        standard.standardCode.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    res.json({
      success: true,
      data: filteredStandards,
      total: filteredStandards.length
    });
  } catch (error) {
    console.error('Standards error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get standard by ID
router.get('/standards/:id', (req, res) => {
  try {
    const { id } = req.params;
    const standard = standards.find(s => s.id === parseInt(id));
    
    if (!standard) {
      return res.status(404).json({ error: 'Standard not found' });
    }
    
    res.json({
      success: true,
      data: standard
    });
  } catch (error) {
    console.error('Standard detail error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get standard bodies
router.get('/bodies', (req, res) => {
  try {
    res.json({
      success: true,
      data: standardBodies
    });
  } catch (error) {
    console.error('Standard bodies error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get item categories
router.get('/categories', (req, res) => {
  try {
    res.json({
      success: true,
      data: itemCategories
    });
  } catch (error) {
    console.error('Categories error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// AI chat endpoint
router.post('/chat', (req, res) => {
  try {
    const { message, context } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    // Simulate AI response
    const aiResponses = {
      'valve': 'I found several valve standards that might be relevant. What type of valve are you looking for?',
      'cable': 'For cables, I recommend checking the DIN VDE 0298-4:2013 standard. What is your application?',
      'relay': 'The IEC 61810-1:2015 standard covers electromechanical relays. What voltage rating do you need?',
      'default': 'I can help you find the right specifications. Could you provide more details about your requirements?'
    };
    
    let response = aiResponses.default;
    
    if (message.toLowerCase().includes('valve')) {
      response = aiResponses.valve;
    } else if (message.toLowerCase().includes('cable')) {
      response = aiResponses.cable;
    } else if (message.toLowerCase().includes('relay')) {
      response = aiResponses.relay;
    }
    
    res.json({
      success: true,
      data: {
        response,
        suggestions: [
          'What is the operating pressure range?',
          'What fluid will be used?',
          'What is the required flow rate?',
          'What are the environmental conditions?'
        ]
      }
    });
  } catch (error) {
    console.error('AI chat error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Export standards
router.post('/export', (req, res) => {
  try {
    const { format, standards: standardIds } = req.body;
    
    if (!format || !['pdf', 'excel'].includes(format)) {
      return res.status(400).json({ error: 'Invalid export format' });
    }
    
    // Simulate export process
    const exportData = standardIds ? 
      standards.filter(s => standardIds.includes(s.id)) : 
      standards;
    
    res.json({
      success: true,
      data: {
        format,
        count: exportData.length,
        downloadUrl: `/api/knowledge/download/export-${Date.now()}.${format}`,
        message: `Exporting ${exportData.length} standards as ${format.toUpperCase()}`
      }
    });
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 