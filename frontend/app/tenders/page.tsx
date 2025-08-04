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
  FileSpreadsheet
} from 'lucide-react'

// Demo data
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
}

const tabs = [
  { id: 'electrical', name: 'Electrical', icon: Zap },
  { id: 'mechanical', name: 'Mechanical', icon: Settings },
  { id: 'hydraulic', name: 'Hydraulic', icon: Database },
  { id: 'safety', name: 'Safety', icon: AlertCircle }
]

export default function Tenders() {
  const [activeTab, setActiveTab] = useState('electrical')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsUploading(true)
      // Simulate upload
      setTimeout(() => {
        setUploadedFile(file)
        setIsUploading(false)
      }, 2000)
    }
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

  const currentData = comparisonData[activeTab as keyof typeof comparisonData] || []

  return (
    <div className="flex h-screen bg-background">
      <Sidebar userRole="sales-engineer" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-background-secondary border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Tender Comparison</h1>
              <p className="text-text-secondary">Specification Analysis Tool</p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Upload Panel */}
            <div className="card">
              <h2 className="text-lg font-semibold text-text-primary mb-4">Upload Tender Documents</h2>
              
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
                      <span className="text-sm">Processing document...</span>
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

            {/* Comparison Tabs */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-text-primary">Specification Comparison</h2>
                <div className="flex gap-2">
                  <button className="btn-secondary px-3 py-2 text-sm flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filter
                  </button>
                  <button className="btn-secondary px-3 py-2 text-sm flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export
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
                      <th className="text-left p-3 text-sm font-medium text-text-secondary">Client Spec</th>
                      <th className="text-left p-3 text-sm font-medium text-text-secondary">Tender Spec</th>
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
                        <td className="p-3 text-sm text-text-secondary">{item.clientSpec}</td>
                        <td className="p-3 text-sm text-text-secondary">{item.tenderSpec}</td>
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
                <div className="grid grid-cols-3 gap-4">
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
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <AIAssistant />
    </div>
  )
} 