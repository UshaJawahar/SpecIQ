const express = require('express');
const router = express.Router();

// Demo data for quotations
const quotations = [
  {
    id: 1,
    serviceItem: 'Power Cable 3x150mm² XLPE',
    partNumber: 'PC-3X150-XLPE',
    latestPrice: 2450.00,
    currency: 'USD',
    sourceDocument: 'TechCorp_Quote_2024-001.pdf',
    client: 'TechCorp Industries',
    poNumber: 'PO-2024-001',
    date: '2024-01-15',
    validity: '30 days',
    supplier: 'CableCo International',
    status: 'active',
    category: 'cables',
    subcategory: 'power-cables'
  },
  {
    id: 2,
    serviceItem: 'Circuit Breaker 400A 4P',
    partNumber: 'CB-400A-4P',
    latestPrice: 1850.00,
    currency: 'USD',
    sourceDocument: 'PowerGrid_Quote_2024-002.pdf',
    client: 'PowerGrid Solutions',
    poNumber: 'PO-2024-002',
    date: '2024-01-12',
    validity: '45 days',
    supplier: 'ElectroTech Systems',
    status: 'active',
    category: 'switches',
    subcategory: 'circuit-breakers'
  },
  {
    id: 3,
    serviceItem: 'Control Relay 24V DC',
    partNumber: 'CR-24V-DC',
    latestPrice: 85.50,
    currency: 'USD',
    sourceDocument: 'Manufacturing_Quote_2024-003.pdf',
    client: 'Manufacturing Plus',
    poNumber: 'PO-2024-003',
    date: '2024-01-10',
    validity: '60 days',
    supplier: 'RelayCorp',
    status: 'expired',
    category: 'relays',
    subcategory: 'control-relays'
  },
  {
    id: 4,
    serviceItem: 'Instrumentation Cable 2x1.5mm²',
    partNumber: 'IC-2X1.5',
    latestPrice: 320.00,
    currency: 'USD',
    sourceDocument: 'Automation_Quote_2024-004.pdf',
    client: 'Automation Systems',
    poNumber: 'PO-2024-004',
    date: '2024-01-08',
    validity: '90 days',
    supplier: 'CableCo International',
    status: 'active',
    category: 'cables',
    subcategory: 'instrumentation'
  }
];

const folderStructure = [
  {
    id: 'electrical',
    name: 'Electrical',
    type: 'folder',
    children: [
      {
        id: 'cables',
        name: 'Cables',
        type: 'folder',
        children: [
          { id: 'power-cables', name: 'Power Cables', type: 'folder', count: 45 },
          { id: 'control-cables', name: 'Control Cables', type: 'folder', count: 32 },
          { id: 'instrumentation', name: 'Instrumentation', type: 'folder', count: 28 }
        ]
      },
      {
        id: 'switches',
        name: 'Switches',
        type: 'folder',
        children: [
          { id: 'circuit-breakers', name: 'Circuit Breakers', type: 'folder', count: 67 },
          { id: 'contactors', name: 'Contactors', type: 'folder', count: 34 }
        ]
      },
      {
        id: 'relays',
        name: 'Relays',
        type: 'folder',
        children: [
          { id: 'protective-relays', name: 'Protective Relays', type: 'folder', count: 23 },
          { id: 'control-relays', name: 'Control Relays', type: 'folder', count: 41 }
        ]
      }
    ]
  },
  {
    id: 'mechanical',
    name: 'Mechanical',
    type: 'folder',
    children: [
      { id: 'valves', name: 'Valves', type: 'folder', count: 89 },
      { id: 'pumps', name: 'Pumps', type: 'folder', count: 56 }
    ]
  }
];

const clients = [
  { id: 'techcorp', name: 'TechCorp Industries', count: 45 },
  { id: 'powergrid', name: 'PowerGrid Solutions', count: 32 },
  { id: 'manufacturing', name: 'Manufacturing Plus', count: 28 },
  { id: 'automation', name: 'Automation Systems', count: 19 }
];

// Get all quotations
router.get('/', (req, res) => {
  try {
    const { 
      search, 
      client, 
      category, 
      subcategory, 
      status,
      minPrice,
      maxPrice,
      dateFrom,
      dateTo
    } = req.query;
    
    let filteredQuotations = [...quotations];
    
    // Search filter
    if (search) {
      filteredQuotations = filteredQuotations.filter(quote => 
        quote.serviceItem.toLowerCase().includes(search.toLowerCase()) ||
        quote.partNumber.toLowerCase().includes(search.toLowerCase()) ||
        quote.client.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Client filter
    if (client) {
      filteredQuotations = filteredQuotations.filter(quote => 
        quote.client.toLowerCase().includes(client.toLowerCase())
      );
    }
    
    // Category filter
    if (category) {
      filteredQuotations = filteredQuotations.filter(quote => 
        quote.category === category
      );
    }
    
    // Subcategory filter
    if (subcategory) {
      filteredQuotations = filteredQuotations.filter(quote => 
        quote.subcategory === subcategory
      );
    }
    
    // Status filter
    if (status) {
      filteredQuotations = filteredQuotations.filter(quote => 
        quote.status === status
      );
    }
    
    // Price range filter
    if (minPrice) {
      filteredQuotations = filteredQuotations.filter(quote => 
        quote.latestPrice >= parseFloat(minPrice)
      );
    }
    
    if (maxPrice) {
      filteredQuotations = filteredQuotations.filter(quote => 
        quote.latestPrice <= parseFloat(maxPrice)
      );
    }
    
    // Date range filter
    if (dateFrom) {
      filteredQuotations = filteredQuotations.filter(quote => 
        new Date(quote.date) >= new Date(dateFrom)
      );
    }
    
    if (dateTo) {
      filteredQuotations = filteredQuotations.filter(quote => 
        new Date(quote.date) <= new Date(dateTo)
      );
    }
    
    res.json({
      success: true,
      data: filteredQuotations,
      total: filteredQuotations.length,
      filters: {
        search,
        client,
        category,
        subcategory,
        status,
        minPrice,
        maxPrice,
        dateFrom,
        dateTo
      }
    });
  } catch (error) {
    console.error('Quotations error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get quotation by ID
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const quotation = quotations.find(q => q.id === parseInt(id));
    
    if (!quotation) {
      return res.status(404).json({ error: 'Quotation not found' });
    }
    
    res.json({
      success: true,
      data: quotation
    });
  } catch (error) {
    console.error('Quotation detail error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get folder structure
router.get('/folders/structure', (req, res) => {
  try {
    res.json({
      success: true,
      data: folderStructure
    });
  } catch (error) {
    console.error('Folder structure error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get quotations by folder
router.get('/folders/:folderId', (req, res) => {
  try {
    const { folderId } = req.params;
    
    // Filter quotations based on folder
    const folderQuotations = quotations.filter(quote => {
      if (folderId === 'power-cables') return quote.subcategory === 'power-cables';
      if (folderId === 'control-cables') return quote.subcategory === 'control-cables';
      if (folderId === 'instrumentation') return quote.subcategory === 'instrumentation';
      if (folderId === 'circuit-breakers') return quote.subcategory === 'circuit-breakers';
      if (folderId === 'control-relays') return quote.subcategory === 'control-relays';
      return quote.category === folderId;
    });
    
    res.json({
      success: true,
      data: folderQuotations,
      folderId
    });
  } catch (error) {
    console.error('Folder quotations error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get clients
router.get('/clients/list', (req, res) => {
  try {
    res.json({
      success: true,
      data: clients
    });
  } catch (error) {
    console.error('Clients error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Copy quotation to proposal
router.post('/:id/copy', (req, res) => {
  try {
    const { id } = req.params;
    const quotation = quotations.find(q => q.id === parseInt(id));
    
    if (!quotation) {
      return res.status(404).json({ error: 'Quotation not found' });
    }
    
    // Simulate copying to proposal
    const proposalData = {
      quotationId: quotation.id,
      serviceItem: quotation.serviceItem,
      partNumber: quotation.partNumber,
      price: quotation.latestPrice,
      currency: quotation.currency,
      copiedAt: new Date().toISOString(),
      proposalId: `PROP-${Date.now()}`
    };
    
    res.json({
      success: true,
      data: proposalData,
      message: 'Quotation copied to proposal successfully'
    });
  } catch (error) {
    console.error('Copy quotation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get quotation statistics
router.get('/stats/summary', (req, res) => {
  try {
    const stats = {
      total: quotations.length,
      active: quotations.filter(q => q.status === 'active').length,
      expired: quotations.filter(q => q.status === 'expired').length,
      totalValue: quotations.reduce((sum, q) => sum + q.latestPrice, 0),
      averagePrice: quotations.reduce((sum, q) => sum + q.latestPrice, 0) / quotations.length,
      byCategory: {},
      byClient: {}
    };
    
    // Category breakdown
    quotations.forEach(quote => {
      if (!stats.byCategory[quote.category]) {
        stats.byCategory[quote.category] = 0;
      }
      stats.byCategory[quote.category]++;
    });
    
    // Client breakdown
    quotations.forEach(quote => {
      if (!stats.byClient[quote.client]) {
        stats.byClient[quote.client] = 0;
      }
      stats.byClient[quote.client]++;
    });
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Export quotations
router.post('/export', (req, res) => {
  try {
    const { format, filters } = req.body;
    
    if (!format || !['pdf', 'excel', 'csv'].includes(format)) {
      return res.status(400).json({ error: 'Invalid export format' });
    }
    
    // Apply filters if provided
    let exportData = quotations;
    if (filters) {
      // Apply the same filtering logic as the GET endpoint
      // (simplified for demo)
    }
    
    res.json({
      success: true,
      data: {
        format,
        count: exportData.length,
        downloadUrl: `/api/quotations/download/export-${Date.now()}.${format}`,
        message: `Exporting ${exportData.length} quotations as ${format.toUpperCase()}`
      }
    });
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 