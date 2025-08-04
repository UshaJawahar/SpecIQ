'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '@/components/Sidebar'
import AIAssistant from '@/components/AIAssistant'
import {
  Search,
  Folder,
  FileText,
  Copy,
  Eye,
  ChevronRight,
  ChevronDown,
  Filter,
  Calendar,
  DollarSign,
  Building2,
  Hash,
  Download,
  Star,
  Clock,
  Database,
  Brain
} from 'lucide-react'

// Demo data for quotation retrieval
const folderStructure = [
  {
    id: 'electrical',
    name: 'Electrical',
    type: 'folder',
    size: '2.4 GB',
    children: [
      {
        id: 'cables',
        name: 'Cables',
        type: 'folder',
        size: '856 MB',
        children: [
          { id: 'power-cables', name: 'Power Cables', type: 'folder', size: '234 MB', count: 45 },
          { id: 'control-cables', name: 'Control Cables', type: 'folder', size: '189 MB', count: 32 },
          { id: 'instrumentation', name: 'Instrumentation', type: 'folder', size: '156 MB', count: 28 }
        ]
      },
      {
        id: 'switches',
        name: 'Switches',
        type: 'folder',
        size: '1.2 GB',
        children: [
          { id: 'circuit-breakers', name: 'Circuit Breakers', type: 'folder', size: '567 MB', count: 67 },
          { id: 'contactors', name: 'Contactors', type: 'folder', size: '234 MB', count: 34 }
        ]
      },
      {
        id: 'relays',
        name: 'Relays',
        type: 'folder',
        size: '456 MB',
        children: [
          { id: 'protective-relays', name: 'Protective Relays', type: 'folder', size: '123 MB', count: 23 },
          { id: 'control-relays', name: 'Control Relays', type: 'folder', size: '189 MB', count: 41 }
        ]
      }
    ]
  },
  {
    id: 'mechanical',
    name: 'Mechanical',
    type: 'folder',
    size: '1.8 GB',
    children: [
      { id: 'valves', name: 'Valves', type: 'folder', size: '789 MB', count: 89 },
      { id: 'pumps', name: 'Pumps', type: 'folder', size: '456 MB', count: 56 }
    ]
  }
]

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
    subcategory: 'power-cables',
    folderPath: 'Electrical/Cables/Power Cables'
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
    subcategory: 'circuit-breakers',
    folderPath: 'Electrical/Switches/Circuit Breakers'
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
    subcategory: 'control-relays',
    folderPath: 'Electrical/Relays/Control Relays'
  }
]

const clients = [
  { id: 'techcorp', name: 'TechCorp Industries', count: 45 },
  { id: 'powergrid', name: 'PowerGrid Solutions', count: 32 },
  { id: 'manufacturing', name: 'Manufacturing Plus', count: 28 },
  { id: 'automation', name: 'Automation Systems', count: 19 }
]

export default function QuotationRetrieval() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedClient, setSelectedClient] = useState('')
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['electrical'])
  const [selectedFolder, setSelectedFolder] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isFiltering, setIsFiltering] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [isBulkExporting, setIsBulkExporting] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => 
      prev.includes(folderId) 
        ? prev.filter(id => id !== folderId)
        : [...prev, folderId]
    )
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsSearching(true)
    // Simulate AI-powered search through folder structure
    setTimeout(() => {
      setSearchResults(quotations.filter(quote => 
        quote.serviceItem.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quote.partNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quote.client.toLowerCase().includes(searchQuery.toLowerCase())
      ))
      setIsSearching(false)
    }, 2000)
  }

  const handleFilter = () => {
    setIsFiltering(true)
    setTimeout(() => {
      setIsFiltering(false)
      console.log('Applied filters to quotations')
    }, 1500)
  }

  const handleExport = () => {
    setIsExporting(true)
    setTimeout(() => {
      const exportData = {
        quotations: searchResults.length > 0 ? searchResults : quotations,
        timestamp: new Date().toISOString()
      }
      
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `quotations-export-${new Date().toISOString().split('T')[0]}.json`
      a.click()
      URL.revokeObjectURL(url)
      setIsExporting(false)
    }, 2000)
  }

  const handleCopyToProposal = (quotation: any) => {
    console.log('Copied to proposal:', quotation.serviceItem)
    // Simulate copying to proposal
  }

  const handleViewDocument = (quotation: any) => {
    console.log('Viewing document:', quotation.sourceDocument)
    // Simulate opening document
  }

  const handleBulkExport = () => {
    setIsBulkExporting(true)
    setTimeout(() => {
      const allQuotations = quotations.map(q => ({
        serviceItem: q.serviceItem,
        partNumber: q.partNumber,
        latestPrice: q.latestPrice,
        currency: q.currency,
        client: q.client,
        date: q.date
      }))
      
      const blob = new Blob([JSON.stringify(allQuotations, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `bulk-quotations-${new Date().toISOString().split('T')[0]}.json`
      a.click()
      URL.revokeObjectURL(url)
      setIsBulkExporting(false)
    }, 3000)
  }

  const handleAIAnalysis = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      console.log('AI price trend analysis completed')
    }, 4000)
  }

  const renderFolder = (item: any, level: number = 0) => {
    const isExpanded = expandedFolders.includes(item.id)
    const isSelected = selectedFolder === item.id

    return (
      <div key={item.id}>
        <motion.div
          className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
            isSelected 
              ? 'bg-primary/10 text-primary border border-primary/30' 
              : 'hover:bg-background-tertiary'
          }`}
          style={{ paddingLeft: `${level * 20 + 12}px` }}
          onClick={() => item.type === 'folder' ? toggleFolder(item.id) : setSelectedFolder(item.id)}
          whileHover={{ x: 4 }}
        >
          {item.type === 'folder' ? (
            <>
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-text-muted" />
              ) : (
                <ChevronRight className="w-4 h-4 text-text-muted" />
              )}
              <Folder className="w-4 h-4 text-primary" />
            </>
          ) : (
            <FileText className="w-4 h-4 text-accent-green" />
          )}
          
          <span className="text-sm font-medium flex-1">{item.name}</span>
          
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <span>{item.size}</span>
            {item.count && (
              <span className="bg-background-tertiary px-2 py-1 rounded">
                {item.count}
              </span>
            )}
          </div>
        </motion.div>

        {item.type === 'folder' && isExpanded && item.children && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {item.children.map((child: any) => renderFolder(child, level + 1))}
          </motion.div>
        )}
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar userRole="electrical-team" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-background-secondary border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Electrical Quotation Retrieval</h1>
              <p className="text-text-secondary">AI-Powered Document Search & Price Retrieval</p>
            </div>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter item or part number..."
                className="glow-input w-full pl-10"
              />
            </form>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar - Folder Navigator */}
            <div className="lg:col-span-1 space-y-6">
              {/* Folder Navigator */}
              <div className="card">
                <div className="flex items-center gap-2 mb-4">
                  <Folder className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-text-primary">Document Structure</h3>
                </div>
                
                <div className="space-y-1">
                  {folderStructure.map(item => renderFolder(item))}
                </div>
              </div>

              {/* Client Filter */}
              <div className="card">
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="w-5 h-5 text-accent-green" />
                  <h3 className="font-semibold text-text-primary">Clients</h3>
                </div>
                
                <div className="space-y-2">
                  {clients.map((client) => (
                    <motion.button
                      key={client.id}
                      onClick={() => setSelectedClient(selectedClient === client.id ? '' : client.id)}
                      className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                        selectedClient === client.id
                          ? 'bg-accent-green/10 text-accent-green border border-accent-green/30'
                          : 'text-text-secondary hover:text-text-primary hover:bg-background-tertiary'
                      }`}
                      whileHover={{ x: 4 }}
                    >
                      <span className="text-sm font-medium">{client.name}</span>
                      <span className="text-xs bg-background-tertiary px-2 py-1 rounded">
                        {client.count}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Search Status */}
              {isSearching && (
                <div className="card">
                  <div className="flex items-center gap-3">
                    <Brain className="w-5 h-5 text-primary animate-pulse" />
                    <div>
                      <p className="text-sm font-medium text-text-primary">AI Searching</p>
                      <p className="text-xs text-text-secondary">Traversing folder structure...</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-6">
              {/* Search Results */}
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-text-primary">Retrieved Quotations</h2>
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
                      onClick={handleExport}
                      disabled={isExporting}
                      className="btn-secondary px-3 py-2 text-sm flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      {isExporting ? 'Exporting...' : 'Export'}
                    </button>
                  </div>
                </div>

                {/* Results Count */}
                <div className="flex items-center gap-4 text-sm text-text-secondary mb-4">
                  <span>Showing {searchResults.length || quotations.length} quotations</span>
                  <span>•</span>
                  <span>Last updated: 2 hours ago</span>
                </div>
              </div>

              {/* Quotation Cards */}
              <div className="space-y-4">
                {(searchResults.length > 0 ? searchResults : quotations).map((quotation) => (
                  <motion.div
                    key={quotation.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card-hover"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-text-primary mb-1">
                              {quotation.serviceItem}
                            </h3>
                            <p className="text-sm text-text-secondary mb-2">
                              Part Number: {quotation.partNumber}
                            </p>
                            <p className="text-xs text-text-muted">
                              Location: {quotation.folderPath}
                            </p>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-2xl font-bold text-accent-green">
                              {quotation.currency} {quotation.latestPrice.toLocaleString()}
                            </div>
                            <div className="text-sm text-text-secondary">
                              Latest Price
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-text-secondary">Client:</span>
                            <p className="text-text-primary font-medium">{quotation.client}</p>
                          </div>
                          <div>
                            <span className="text-text-secondary">PO Number:</span>
                            <p className="text-text-primary font-medium">{quotation.poNumber}</p>
                          </div>
                          <div>
                            <span className="text-text-secondary">Date:</span>
                            <p className="text-text-primary font-medium">{quotation.date}</p>
                          </div>
                          <div>
                            <span className="text-text-secondary">Validity:</span>
                            <p className="text-text-primary font-medium">{quotation.validity}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mt-3 text-sm">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-text-muted" />
                            <span className="text-text-secondary">Source:</span>
                            <span className="text-text-primary">{quotation.sourceDocument}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-text-muted" />
                            <span className="text-text-secondary">Supplier:</span>
                            <span className="text-text-primary">{quotation.supplier}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 ml-4">
                        <button 
                          onClick={() => handleCopyToProposal(quotation)}
                          className="btn-primary px-4 py-2 text-sm flex items-center gap-2"
                        >
                          <Copy className="w-4 h-4" />
                          Copy to Proposal
                        </button>
                        <button 
                          onClick={() => handleViewDocument(quotation)}
                          className="btn-secondary px-4 py-2 text-sm flex items-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          View Document
                        </button>
                        {quotation.status === 'expired' && (
                          <span className="status-badge status-warning text-xs">
                            Expired
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="card">
                <h3 className="font-semibold text-text-primary mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <motion.button
                    onClick={handleBulkExport}
                    disabled={isBulkExporting}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 bg-background-tertiary rounded-lg border border-border hover:border-primary/50 transition-colors disabled:opacity-50"
                  >
                    <div className="flex items-center gap-3">
                      <Database className="w-5 h-5 text-primary" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-text-primary">
                          {isBulkExporting ? 'Exporting...' : 'Bulk Export'}
                        </p>
                        <p className="text-xs text-text-secondary">Export all quotations</p>
                      </div>
                    </div>
                  </motion.button>

                  <motion.button
                    onClick={handleAIAnalysis}
                    disabled={isAnalyzing}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 bg-background-tertiary rounded-lg border border-border hover:border-primary/50 transition-colors disabled:opacity-50"
                  >
                    <div className="flex items-center gap-3">
                      <Brain className="w-5 h-5 text-accent-green" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-text-primary">
                          {isAnalyzing ? 'Analyzing...' : 'AI Analysis'}
                        </p>
                        <p className="text-xs text-text-secondary">Price trend analysis</p>
                      </div>
                    </div>
                  </motion.button>
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