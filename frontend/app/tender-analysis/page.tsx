'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '@/components/Sidebar'
import AIAssistant from '@/components/AIAssistant'
import {
  Upload,
  FileText,
  Download,
  CheckCircle,
  AlertCircle,
  Clock,
  Zap,
  Settings,
  Database,
  Filter,
  Search,
  ChevronDown,
  ChevronRight,
  FileSpreadsheet,
  FilePdf,
  Brain,
  Diff
} from 'lucide-react'

// Demo data for tender analysis
const analysisResults = {
  electrical: [
    {
      id: 1,
      specification: 'Voltage Rating',
      customerSpec: '400V AC',
      clientSpec: '400V AC',
      status: 'met',
      notes: 'Exact match',
      category: 'electrical'
    },
    {
      id: 2,
      specification: 'Current Rating',
      customerSpec: '100A',
      clientSpec: '125A',
      status: 'exceeds',
      notes: 'Client standard exceeds requirement',
      category: 'electrical'
    },
    {
      id: 3,
      specification: 'Protection Class',
      customerSpec: 'IP65',
      clientSpec: 'IP54',
      status: 'not-met',
      notes: 'Insufficient protection level',
      category: 'electrical'
    }
  ],
  mechanical: [
    {
      id: 4,
      specification: 'Operating Temperature',
      customerSpec: '-20°C to +60°C',
      clientSpec: '-10°C to +50°C',
      status: 'not-met',
      notes: 'Temperature range too narrow',
      category: 'mechanical'
    },
    {
      id: 5,
      specification: 'Material Grade',
      customerSpec: 'Stainless Steel 316',
      clientSpec: 'Stainless Steel 316',
      status: 'met',
      notes: 'Exact match',
      category: 'mechanical'
    }
  ],
  hydraulic: [
    {
      id: 6,
      specification: 'Pressure Rating',
      customerSpec: '350 bar',
      clientSpec: '400 bar',
      status: 'exceeds',
      notes: 'Client standard exceeds requirement',
      category: 'hydraulic'
    },
    {
      id: 7,
      specification: 'Flow Rate',
      customerSpec: '50 L/min',
      clientSpec: '45 L/min',
      status: 'not-met',
      notes: 'Flow rate below requirement',
      category: 'hydraulic'
    }
  ],
  safety: [
    {
      id: 8,
      specification: 'Safety Certification',
      customerSpec: 'CE, UL',
      clientSpec: 'CE, UL, ATEX',
      status: 'exceeds',
      notes: 'Additional ATEX certification',
      category: 'safety'
    },
    {
      id: 9,
      specification: 'Emergency Stop',
      customerSpec: 'Required',
      clientSpec: 'Not specified',
      status: 'not-met',
      notes: 'Missing safety feature',
      category: 'safety'
    }
  ]
}

const clientSpecs = [
  {
    id: 1,
    projectId: 'TC-2024-001',
    client: 'TechCorp Industries',
    projectName: 'TechCorp Hydraulic System',
    lastUpdated: '2024-01-15',
    specifications: {
      electrical: ['400V AC', '125A', 'IP54'],
      mechanical: ['-10°C to +50°C', 'Stainless Steel 316'],
      hydraulic: ['400 bar', '45 L/min'],
      safety: ['CE, UL, ATEX', 'Not specified']
    }
  }
]

const tabs = [
  { id: 'electrical', name: 'Electrical', icon: Zap },
  { id: 'mechanical', name: 'Mechanical', icon: Settings },
  { id: 'hydraulic', name: 'Hydraulic', icon: Database },
  { id: 'safety', name: 'Safety', icon: AlertCircle }
]

export default function TenderAnalysis() {
  const [activeTab, setActiveTab] = useState('electrical')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [isFiltering, setIsFiltering] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsUploading(true)
      // Simulate upload and analysis
      setTimeout(() => {
        setUploadedFile(file)
        setIsUploading(false)
        setIsAnalyzing(true)
        
        // Simulate AI analysis
        setTimeout(() => {
          setIsAnalyzing(false)
          setAnalysisComplete(true)
        }, 4000)
      }, 2000)
    }
  }

  const handleFilter = () => {
    setIsFiltering(true)
    setTimeout(() => {
      setIsFiltering(false)
      console.log('Applied filters to analysis results')
    }, 1500)
  }

  const handleExportReport = () => {
    setIsExporting(true)
    setTimeout(() => {
      const reportData = {
        analysisResults,
        summary: {
          met: 8,
          exceeds: 3,
          notMet: 4,
          total: 15
        },
        timestamp: new Date().toISOString()
      }
      
      const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `tender-analysis-${new Date().toISOString().split('T')[0]}.json`
      a.click()
      URL.revokeObjectURL(url)
      setIsExporting(false)
    }, 2000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'met': return <CheckCircle className="w-4 h-4 text-accent-green" />
      case 'exceeds': return <AlertCircle className="w-4 h-4 text-primary" />
      case 'not-met': return <AlertCircle className="w-4 h-4 text-accent-orange" />
      default: return <Clock className="w-4 h-4 text-text-muted" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'met': return 'status-success'
      case 'exceeds': return 'status-info'
      case 'not-met': return 'status-warning'
      default: return 'status-info'
    }
  }

  const currentData = analysisResults[activeTab as keyof typeof analysisResults] || []

  return (
    <div className="flex h-screen bg-background">
      <Sidebar userRole="sales-engineer" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-background-secondary border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">AI-Driven Tender Analysis</h1>
              <p className="text-text-secondary">Automated Specification Comparison & Diff Identification</p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Upload Panel */}
            <div className="card">
              <h2 className="text-lg font-semibold text-text-primary mb-4">Upload Tender Document</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* File Upload */}
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                    <input
                      type="file"
                      accept=".pdf,.xlsx,.xls"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="w-12 h-12 text-text-muted mx-auto mb-4" />
                      <p className="text-text-primary font-medium mb-2">Drop tender PDF/Excel here</p>
                      <p className="text-text-secondary text-sm">or click to browse</p>
                    </label>
                  </div>
                  
                  {isUploading && (
                    <div className="flex items-center gap-2 text-primary">
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-sm">Uploading document...</span>
                    </div>
                  )}
                  
                  {uploadedFile && (
                    <div className="flex items-center gap-3 p-3 bg-background-tertiary rounded-lg">
                      <FileText className="w-5 h-5 text-primary" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-text-primary">{uploadedFile.name}</p>
                        <p className="text-xs text-text-secondary">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                      <CheckCircle className="w-5 h-5 text-accent-green" />
                    </div>
                  )}
                </div>

                {/* Client Spec Auto-fetch */}
                <div className="space-y-4">
                  <h3 className="font-medium text-text-primary">Client Specifications</h3>
                  <div className="bg-background-tertiary rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Database className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium text-text-primary">Auto-fetched from Database</p>
                        <p className="text-xs text-text-secondary">Project: TechCorp Hydraulic System</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-secondary">Client:</span>
                        <span className="text-text-primary">TechCorp Industries</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-secondary">Project ID:</span>
                        <span className="text-text-primary">TC-2024-001</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-secondary">Last Updated:</span>
                        <span className="text-text-primary">2024-01-15</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Analysis Status */}
            {isAnalyzing && (
              <div className="card">
                <div className="flex items-center gap-3">
                  <Brain className="w-5 h-5 text-primary animate-pulse" />
                  <div>
                    <p className="text-sm font-medium text-text-primary">AI Analysis in Progress</p>
                    <p className="text-xs text-text-secondary">LLM analyzing document and identifying specifications...</p>
                  </div>
                </div>
              </div>
            )}

            {/* Analysis Results */}
            {analysisComplete && (
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-text-primary">Specification Comparison Results</h2>
                  <div className="flex gap-2">
                    <button 
                      onClick={handleFilter}
                      disabled={isFiltering}
                      className="btn-secondary px-3 py-2 text-sm flex items-center gap-2"
                    >
                      <Filter className="w-4 h-4" />
                      {isFiltering ? 'Filtering...' : 'Filter'}
                    </button>
                    <button 
                      onClick={handleExportReport}
                      disabled={isExporting}
                      className="btn-secondary px-3 py-2 text-sm flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      {isExporting ? 'Exporting...' : 'Export Report'}
                    </button>
                  </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex space-x-1 mb-6">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          activeTab === tab.id
                            ? 'bg-primary text-background'
                            : 'text-text-secondary hover:text-text-primary hover:bg-background-tertiary'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {tab.name}
                      </button>
                    )
                  })}
                </div>

                {/* Comparison Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-3 text-sm font-medium text-text-secondary">Specification</th>
                        <th className="text-left p-3 text-sm font-medium text-text-secondary">Customer Spec</th>
                        <th className="text-left p-3 text-sm font-medium text-text-secondary">Client Spec</th>
                        <th className="text-left p-3 text-sm font-medium text-text-secondary">Status</th>
                        <th className="text-left p-3 text-sm font-medium text-text-secondary">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentData.map((item) => (
                        <motion.tr
                          key={item.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="border-b border-border/50 hover:bg-background-tertiary transition-colors"
                        >
                          <td className="p-3 text-sm font-medium text-text-primary">{item.specification}</td>
                          <td className="p-3 text-sm text-text-secondary">{item.customerSpec}</td>
                          <td className="p-3 text-sm text-text-secondary">{item.clientSpec}</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(item.status)}
                              <span className={`status-badge ${getStatusColor(item.status)}`}>
                                {item.status}
                              </span>
                            </div>
                          </td>
                          <td className="p-3 text-sm text-text-secondary">{item.notes}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Summary Stats */}
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent-green">8</div>
                      <div className="text-sm text-text-secondary">Met Requirements</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">3</div>
                      <div className="text-sm text-text-secondary">Exceeds Requirements</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent-orange">4</div>
                      <div className="text-sm text-text-secondary">Not Met</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-text-primary">15</div>
                      <div className="text-sm text-text-secondary">Total Specifications</div>
                    </div>
                  </div>
                </div>

                {/* Action Items */}
                <div className="mt-6 pt-6 border-t border-border">
                  <h3 className="font-semibold text-text-primary mb-4">Recommended Actions</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-accent-orange/10 border border-accent-orange/20 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-accent-orange" />
                      <div>
                        <p className="text-sm font-medium text-text-primary">Upgrade Protection Class</p>
                        <p className="text-xs text-text-secondary">Current IP54 needs to be upgraded to IP65</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-accent-orange/10 border border-accent-orange/20 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-accent-orange" />
                      <div>
                        <p className="text-sm font-medium text-text-primary">Extend Temperature Range</p>
                        <p className="text-xs text-text-secondary">Operating temperature range needs to be expanded</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-accent-orange/10 border border-accent-orange/20 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-accent-orange" />
                      <div>
                        <p className="text-sm font-medium text-text-primary">Add Emergency Stop</p>
                        <p className="text-xs text-text-secondary">Safety feature needs to be implemented</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      <AIAssistant />
    </div>
  )
} 