const express = require('express');
const router = express.Router();

// Demo data for sales inquiry with LLM/RAG simulation
const projectFolders = [
  {
    id: 'tc-2024-001',
    name: 'TechCorp Industries - 2024',
    size: '24.5 GB',
    files: 1247,
    lastUpdated: '2 hours ago',
    status: 'active',
    dataTypes: ['emails', 'quotations', 'manuals', 'specifications']
  },
  {
    id: 'pg-2024-002',
    name: 'PowerGrid Solutions - 2024',
    size: '18.3 GB',
    files: 892,
    lastUpdated: '1 day ago',
    status: 'active',
    dataTypes: ['emails', 'quotations', 'manuals', 'specifications']
  },
  {
    id: 'mp-2024-003',
    name: 'Manufacturing Plus - 2024',
    size: '31.2 GB',
    files: 1567,
    lastUpdated: '3 days ago',
    status: 'active',
    dataTypes: ['emails', 'quotations', 'manuals', 'specifications']
  }
];

const inquiryResults = [
  {
    id: 1,
    type: 'email',
    title: 'Hydraulic System Inquiry - TechCorp Industries',
    content: 'Need specifications for hydraulic control valves for our new manufacturing line. Looking for ISO 1219-1 compliant valves with pressure rating 350 bar.',
    date: '2024-01-15',
    client: 'TechCorp Industries',
    project: 'TC-2024-001',
    relevance: 95,
    source: 'email-thread-001',
    metadata: {
      sender: 'john.doe@techcorp.com',
      recipients: ['sales@company.com'],
      attachments: ['specs.pdf', 'requirements.docx']
    }
  },
  {
    id: 2,
    type: 'quotation',
    title: 'Previous Quote - Hydraulic Valves',
    content: 'Quote from 2023 for similar hydraulic control valves. Price: $2,450 per unit. Supplier: ValveCo International.',
    date: '2023-11-20',
    client: 'TechCorp Industries',
    project: 'TC-2023-045',
    relevance: 88,
    source: 'quote-2023-045',
    metadata: {
      supplier: 'ValveCo International',
      price: 2450,
      currency: 'USD',
      validity: '30 days'
    }
  },
  {
    id: 3,
    type: 'manual',
    title: 'Service Manual - Hydraulic Systems',
    content: 'Technical specifications and installation guidelines for hydraulic control valves. Includes pressure ratings, flow characteristics, and maintenance procedures.',
    date: '2023-08-15',
    client: 'General',
    project: 'N/A',
    relevance: 82,
    source: 'manual-hydraulic-001',
    metadata: {
      documentType: 'Technical Manual',
      version: '2.1',
      pages: 156
    }
  }
];

// Get project folders for RAG processing
router.get('/project-folders', (req, res) => {
  try {
    res.json({
      success: true,
      data: projectFolders
    });
  } catch (error) {
    console.error('Project folders error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// LLM-powered search through project data
router.post('/search', (req, res) => {
  try {
    const { query, projectId, filters } = req.body;
    
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    // Simulate LLM processing and RAG retrieval
    const results = inquiryResults.filter(result => {
      const matchesQuery = result.content.toLowerCase().includes(query.toLowerCase()) ||
                          result.title.toLowerCase().includes(query.toLowerCase()) ||
                          result.client.toLowerCase().includes(query.toLowerCase());
      
      const matchesProject = !projectId || result.project === projectId;
      const matchesFilters = !filters || Object.keys(filters).every(key => 
        !filters[key] || result[key] === filters[key]
      );

      return matchesQuery && matchesProject && matchesFilters;
    });

    // Simulate relevance scoring
    const scoredResults = results.map(result => ({
      ...result,
      relevance: Math.floor(Math.random() * 20) + 80 // 80-100% relevance
    }));

    res.json({
      success: true,
      data: scoredResults,
      query,
      processingTime: '2.3s',
      totalResults: scoredResults.length
    });

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get project-specific data for RAG indexing
router.get('/project/:projectId/data', (req, res) => {
  try {
    const { projectId } = req.params;
    
    const projectData = inquiryResults.filter(result => result.project === projectId);
    
    res.json({
      success: true,
      data: {
        projectId,
        totalDocuments: projectData.length,
        dataTypes: ['emails', 'quotations', 'manuals', 'specifications'],
        lastIndexed: new Date().toISOString(),
        indexingStatus: 'complete'
      }
    });

  } catch (error) {
    console.error('Project data error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Generate AI response based on retrieved information
router.post('/generate-response', (req, res) => {
  try {
    const { inquiry, context, retrievedData } = req.body;
    
    // Simulate AI response generation
    const response = {
      id: Date.now(),
      content: `Based on the retrieved information, here's our response to your inquiry about ${inquiry}...`,
      confidence: 0.92,
      sources: retrievedData.map(item => item.source),
      generatedAt: new Date().toISOString(),
      suggestedActions: [
        'Schedule technical meeting',
        'Prepare detailed quotation',
        'Share relevant specifications'
      ]
    };

    res.json({
      success: true,
      data: response
    });

  } catch (error) {
    console.error('Response generation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get RAG processing status
router.get('/rag-status', (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        status: 'active',
        indexedProjects: projectFolders.length,
        totalDocuments: projectFolders.reduce((sum, folder) => sum + folder.files, 0),
        lastUpdate: new Date().toISOString(),
        processingQueue: 0
      }
    });
  } catch (error) {
    console.error('RAG status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 