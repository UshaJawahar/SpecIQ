const express = require('express');
const router = express.Router();

// Demo data for dashboard
const liveInquiries = [
  {
    id: 1,
    client: 'TechCorp Industries',
    inquiry: 'Need specifications for hydraulic control valves',
    status: 'pending',
    time: '2 min ago',
    priority: 'high'
  },
  {
    id: 2,
    client: 'PowerGrid Solutions',
    inquiry: 'ISO standards for electrical relays',
    status: 'processing',
    time: '5 min ago',
    priority: 'medium'
  },
  {
    id: 3,
    client: 'Manufacturing Plus',
    inquiry: 'Quote for industrial cables',
    status: 'completed',
    time: '12 min ago',
    priority: 'low'
  }
];

const projectStats = [
  { name: 'Total Documents', value: '1,247', change: '+12%', icon: 'FileText' },
  { name: 'Active Projects', value: '23', change: '+3', icon: 'Activity' },
  { name: 'AI Processed', value: '89%', change: '+5%', icon: 'Brain' },
  { name: 'Response Time', value: '2.3h', change: '-0.5h', icon: 'Clock' }
];

const recentProjects = [
  {
    id: 1,
    name: 'Hydraulic System Specs',
    client: 'TechCorp',
    size: '2.4 MB',
    status: 'processed',
    lastUpdated: '2 hours ago'
  },
  {
    id: 2,
    name: 'Electrical Standards Review',
    client: 'PowerGrid',
    size: '1.8 MB',
    status: 'processing',
    lastUpdated: '4 hours ago'
  },
  {
    id: 3,
    name: 'Safety Compliance Docs',
    client: 'Manufacturing Plus',
    size: '3.1 MB',
    status: 'pending',
    lastUpdated: '6 hours ago'
  }
];

// Get dashboard data
router.get('/data', (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        liveInquiries,
        projectStats,
        recentProjects
      }
    });
  } catch (error) {
    console.error('Dashboard data error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get live inquiries
router.get('/inquiries', (req, res) => {
  try {
    res.json({
      success: true,
      data: liveInquiries
    });
  } catch (error) {
    console.error('Inquiries error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get project statistics
router.get('/stats', (req, res) => {
  try {
    res.json({
      success: true,
      data: projectStats
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get recent projects
router.get('/projects', (req, res) => {
  try {
    res.json({
      success: true,
      data: recentProjects
    });
  } catch (error) {
    console.error('Projects error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Search functionality
router.get('/search', (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    // Simulate search results
    const searchResults = [
      ...liveInquiries.filter(inquiry => 
        inquiry.client.toLowerCase().includes(query.toLowerCase()) ||
        inquiry.inquiry.toLowerCase().includes(query.toLowerCase())
      ),
      ...recentProjects.filter(project => 
        project.name.toLowerCase().includes(query.toLowerCase()) ||
        project.client.toLowerCase().includes(query.toLowerCase())
      )
    ];

    res.json({
      success: true,
      data: searchResults,
      query
    });

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 