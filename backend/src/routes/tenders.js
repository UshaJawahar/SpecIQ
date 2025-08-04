const express = require('express');
const multer = require('multer');
const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || 
        file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.mimetype === 'application/vnd.ms-excel') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF and Excel files are allowed.'), false);
    }
  }
});

// Demo data for tender comparison
const comparisonData = {
  electrical: [
    {
      id: 1,
      specification: 'Voltage Rating',
      clientSpec: '400V AC',
      tenderSpec: '400V AC',
      status: 'met',
      notes: 'Exact match'
    },
    {
      id: 2,
      specification: 'Current Rating',
      clientSpec: '100A',
      tenderSpec: '125A',
      status: 'exceeds',
      notes: 'Tender exceeds requirement'
    },
    {
      id: 3,
      specification: 'Protection Class',
      clientSpec: 'IP65',
      tenderSpec: 'IP54',
      status: 'not-met',
      notes: 'Insufficient protection'
    }
  ],
  mechanical: [
    {
      id: 4,
      specification: 'Operating Temperature',
      clientSpec: '-20°C to +60°C',
      tenderSpec: '-10°C to +50°C',
      status: 'not-met',
      notes: 'Temperature range too narrow'
    },
    {
      id: 5,
      specification: 'Material Grade',
      clientSpec: 'Stainless Steel 316',
      tenderSpec: 'Stainless Steel 316',
      status: 'met',
      notes: 'Exact match'
    }
  ],
  hydraulic: [
    {
      id: 6,
      specification: 'Pressure Rating',
      clientSpec: '350 bar',
      tenderSpec: '400 bar',
      status: 'exceeds',
      notes: 'Tender exceeds requirement'
    },
    {
      id: 7,
      specification: 'Flow Rate',
      clientSpec: '50 L/min',
      tenderSpec: '45 L/min',
      status: 'not-met',
      notes: 'Flow rate below requirement'
    }
  ],
  safety: [
    {
      id: 8,
      specification: 'Safety Certification',
      clientSpec: 'CE, UL',
      tenderSpec: 'CE, UL, ATEX',
      status: 'exceeds',
      notes: 'Additional ATEX certification'
    },
    {
      id: 9,
      specification: 'Emergency Stop',
      clientSpec: 'Required',
      tenderSpec: 'Not specified',
      status: 'not-met',
      notes: 'Missing safety feature'
    }
  ]
};

const clientSpecs = [
  {
    id: 1,
    projectId: 'TC-2024-001',
    client: 'TechCorp Industries',
    projectName: 'TechCorp Hydraulic System',
    lastUpdated: '2024-01-15',
    specifications: {
      electrical: ['400V AC', '100A', 'IP65'],
      mechanical: ['-20°C to +60°C', 'Stainless Steel 316'],
      hydraulic: ['350 bar', '50 L/min'],
      safety: ['CE, UL', 'Required']
    }
  }
];

// Upload tender document
router.post('/upload', upload.single('tender'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Simulate file processing
    const processingResult = {
      success: true,
      data: {
        filename: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
        processingStatus: 'completed',
        extractedSpecs: {
          electrical: 3,
          mechanical: 2,
          hydraulic: 2,
          safety: 2
        },
        message: 'Document processed successfully'
      }
    };

    res.json(processingResult);
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({ error: 'File upload failed' });
  }
});

// Get comparison data
router.get('/comparison', (req, res) => {
  try {
    const { category } = req.query;
    
    if (category && comparisonData[category]) {
      res.json({
        success: true,
        data: comparisonData[category]
      });
    } else {
      res.json({
        success: true,
        data: comparisonData
      });
    }
  } catch (error) {
    console.error('Comparison data error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get client specifications
router.get('/client-specs', (req, res) => {
  try {
    const { projectId } = req.query;
    
    let specs = clientSpecs;
    if (projectId) {
      specs = clientSpecs.filter(spec => spec.projectId === projectId);
    }
    
    res.json({
      success: true,
      data: specs
    });
  } catch (error) {
    console.error('Client specs error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get comparison summary
router.get('/summary', (req, res) => {
  try {
    const summary = {
      total: 0,
      met: 0,
      exceeds: 0,
      notMet: 0,
      categories: {}
    };

    Object.keys(comparisonData).forEach(category => {
      const categoryData = comparisonData[category];
      summary.categories[category] = {
        total: categoryData.length,
        met: categoryData.filter(item => item.status === 'met').length,
        exceeds: categoryData.filter(item => item.status === 'exceeds').length,
        notMet: categoryData.filter(item => item.status === 'not-met').length
      };
      
      summary.total += categoryData.length;
      summary.met += summary.categories[category].met;
      summary.exceeds += summary.categories[category].exceeds;
      summary.notMet += summary.categories[category].notMet;
    });

    res.json({
      success: true,
      data: summary
    });
  } catch (error) {
    console.error('Summary error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Export comparison report
router.post('/export', (req, res) => {
  try {
    const { format, category } = req.body;
    
    if (!format || !['pdf', 'excel'].includes(format)) {
      return res.status(400).json({ error: 'Invalid export format' });
    }
    
    const exportData = category ? comparisonData[category] : comparisonData;
    
    res.json({
      success: true,
      data: {
        format,
        category: category || 'all',
        downloadUrl: `/api/tenders/download/comparison-${Date.now()}.${format}`,
        message: `Exporting comparison report as ${format.toUpperCase()}`
      }
    });
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// AI analysis endpoint
router.post('/analyze', (req, res) => {
  try {
    const { specifications, category } = req.body;
    
    if (!specifications) {
      return res.status(400).json({ error: 'Specifications are required' });
    }
    
    // Simulate AI analysis
    const analysis = {
      compliance: Math.floor(Math.random() * 100),
      recommendations: [
        'Consider upgrading protection class to IP65',
        'Verify temperature range meets requirements',
        'Ensure safety certifications are current'
      ],
      risks: [
        'Protection class below requirement',
        'Temperature range limitations',
        'Missing safety features'
      ],
      score: Math.floor(Math.random() * 100)
    };
    
    res.json({
      success: true,
      data: analysis
    });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 