'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '@/components/Sidebar'
import AIAssistant from '@/components/AIAssistant'
import {
  Search,
  MessageSquare,
  FileText,
  BookOpen,
  Brain,
  Database,
  Folder,
  Mail,
  Clock,
  User,
  Building2,
  RefreshCw,
  Download
} from 'lucide-react'

// Demo data for sales inquiry
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
    source: 'email-thread-001'
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
    source: 'quote-2023-045'
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
    source: 'manual-hydraulic-001'
  }
]

const projectFolders = [
  {
    id: 'tc-2024-001',
    name: 'TechCorp Industries - 2024',
    size: '24.5 GB',
    files: 1247,
    lastUpdated: '2 hours ago',
    status: 'active'
  },
  {
    id: 'pg-2024-002',
    name: 'PowerGrid Solutions - 2024',
    size: '18.3 GB',
    files: 892,
    lastUpdated: '1 day ago',
    status: 'active'
  },
  {
    id: 'mp-2024-003',
    name: 'Manufacturing Plus - 2024',
    size: '31.2 GB',
    files: 1567,
    lastUpdated: '3 days ago',
    status: 'active'
  }
]

export default function SalesInquiry() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [selectedProject, setSelectedProject] = useState('')
  const [isRAGProcessing, setIsRAGProcessing] = useState(false)
  const [isGeneratingResponse, setIsGeneratingResponse] = useState(false)
  const [isCreatingQuote, setIsCreatingQuote] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsSearching(true)
    setIsRAGProcessing(true)

    // Simulate LLM and RAG processing
    setTimeout(() => {
      setSearchResults(inquiryResults)
      setIsSearching(false)
      setIsRAGProcessing(false)
    }, 3000)
  }

  const handleProjectSelection = (projectId: string) => {
    setSelectedProject(projectId)
    // Simulate project-specific search
    setIsRAGProcessing(true)
    setTimeout(() => {
      setIsRAGProcessing(false)
    }, 2000)
  }

  const handleRefresh = () => {
    setIsSearching(true)
    setTimeout(() => {
      setSearchResults([...inquiryResults])
      setIsSearching(false)
    }, 1500)
  }

  const handleExport = () => {
    const exportData = {
      query: searchQuery,
      results: searchResults,
      timestamp: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `sales-inquiry-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleGenerateResponse = () => {
    setIsGeneratingResponse(true)
    setTimeout(() => {
      setIsGeneratingResponse(false)
      // Simulate response generation
      console.log('AI response generated')
    }, 3000)
  }

  const handleCreateQuote = () => {
    setIsCreatingQuote(true)
    setTimeout(() => {
      setIsCreatingQuote(false)
      // Simulate quote creation
      console.log('Quote created based on history')
    }, 2500)
  }

  const handleViewDetails = (result: any) => {
    // Simulate opening detailed view
    console.log('Viewing details for:', result.title)
    // In a real app, this would open a modal or navigate to a detail page
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar userRole="sales-engineer" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-background-secondary border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">AI-Powered Sales Inquiry</h1>
              <p className="text-text-secondary">LLM & RAG-based Information Retrieval</p>
            </div>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search emails, quotations, manuals, knowledge base..."
                className="glow-input w-full pl-10"
              />
            </form>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Project Folders */}
            <div className="lg:col-span-1 space-y-6">
              {/* Project Folders */}
              <div className="card">
                <div className="flex items-center gap-2 mb-4">
                  <Folder className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-text-primary">Project Folders</h3>
                </div>
                
                <div className="space-y-3">
                  {projectFolders.map((project) => (
                    <motion.div
                      key={project.id}
                      onClick={() => handleProjectSelection(project.id)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                        selectedProject === project.id
                          ? 'border-primary bg-primary/10'
                          : 'border-border bg-background-tertiary hover:border-primary/50'
                      }`}
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-text-primary">{project.name}</h4>
                        <span className="text-xs bg-accent-green/20 text-accent-green px-2 py-1 rounded">
                          {project.status}
                        </span>
                      </div>
                      <div className="text-sm text-text-secondary space-y-1">
                        <div className="flex items-center gap-2">
                          <Database className="w-3 h-3" />
                          <span>{project.size} • {project.files} files</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          <span>Updated {project.lastUpdated}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* RAG Processing Status */}
              {isRAGProcessing && (
                <div className="card">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">RAG Processing</p>
                      <p className="text-xs text-text-secondary">Indexing and retrieving relevant data...</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Search Results */}
            <div className="lg:col-span-2 space-y-6">
              {/* Search Status */}
              {isSearching && (
                <div className="card">
                  <div className="flex items-center gap-3">
                    <Brain className="w-5 h-5 text-primary animate-pulse" />
                    <div>
                      <p className="text-sm font-medium text-text-primary">AI Processing</p>
                      <p className="text-xs text-text-secondary">LLM analyzing query and retrieving relevant information...</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="card">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-text-primary">Retrieved Information</h2>
                    <div className="flex gap-2">
                      <button 
                        onClick={handleRefresh}
                        className="btn-secondary px-3 py-2 text-sm flex items-center gap-2"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Refresh
                      </button>
                      <button 
                        onClick={handleExport}
                        className="btn-secondary px-3 py-2 text-sm flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Export
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {searchResults.map((result) => (
                      <motion.div
                        key={result.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-background-tertiary rounded-lg border border-border"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            {result.type === 'email' && <Mail className="w-5 h-5 text-primary" />}
                            {result.type === 'quotation' && <FileText className="w-5 h-5 text-accent-green" />}
                            {result.type === 'manual' && <BookOpen className="w-5 h-5 text-accent-purple" />}
                            <div>
                              <h3 className="font-semibold text-text-primary">{result.title}</h3>
                              <div className="flex items-center gap-4 text-sm text-text-secondary mt-1">
                                <span className="flex items-center gap-1">
                                  <User className="w-3 h-3" />
                                  {result.client}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Building2 className="w-3 h-3" />
                                  {result.project}
                                </span>
                                <span>{result.date}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-medium text-accent-green">
                              {result.relevance}% relevant
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-text-secondary mb-3">{result.content}</p>
                        
                        <div className="flex items-center justify-between text-xs text-text-muted">
                          <span>Source: {result.source}</span>
                          <button 
                            onClick={() => handleViewDetails(result)}
                            className="text-primary hover:text-primary-dark transition-colors"
                          >
                            View Details
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="card">
                <h3 className="font-semibold text-text-primary mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <motion.button
                    onClick={handleGenerateResponse}
                    disabled={isGeneratingResponse}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 bg-background-tertiary rounded-lg border border-border hover:border-primary/50 transition-colors disabled:opacity-50"
                  >
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-5 h-5 text-primary" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-text-primary">
                          {isGeneratingResponse ? 'Generating...' : 'Generate Response'}
                        </p>
                        <p className="text-xs text-text-secondary">AI-powered reply</p>
                      </div>
                    </div>
                  </motion.button>

                  <motion.button
                    onClick={handleCreateQuote}
                    disabled={isCreatingQuote}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 bg-background-tertiary rounded-lg border border-border hover:border-primary/50 transition-colors disabled:opacity-50"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-accent-green" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-text-primary">
                          {isCreatingQuote ? 'Creating...' : 'Create Quote'}
                        </p>
                        <p className="text-xs text-text-secondary">Based on history</p>
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