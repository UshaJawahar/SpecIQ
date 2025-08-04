'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '@/components/Sidebar'
import AIAssistant from '@/components/AIAssistant'
import {
  Search,
  BookOpen,
  Filter,
  Download,
  MessageSquare,
  Brain,
  FileText,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Database,
  Zap,
  Settings,
  Shield,
  Star,
  Hash,
  Copy
} from 'lucide-react'

// Demo data for industrial standards
const standardBodies = [
  { id: 'iso', name: 'ISO', count: 1247, description: 'International Organization for Standardization' },
  { id: 'iec', name: 'IEC', count: 892, description: 'International Electrotechnical Commission' },
  { id: 'din', name: 'DIN', count: 567, description: 'Deutsches Institut für Normung' },
  { id: 'astm', name: 'ASTM', count: 445, description: 'American Society for Testing and Materials' },
  { id: 'api', name: 'API', count: 234, description: 'American Petroleum Institute' }
]

const itemCategories = [
  { id: 'valves', name: 'Valves', count: 156, icon: Settings },
  { id: 'cables', name: 'Cables', count: 234, icon: Zap },
  { id: 'relays', name: 'Relays', count: 89, icon: Shield },
  { id: 'pumps', name: 'Pumps', count: 123, icon: Database },
  { id: 'sensors', name: 'Sensors', count: 178, icon: Star },
  { id: 'motors', name: 'Motors', count: 145, icon: Zap }
]

const searchResults = [
  {
    id: 1,
    standardCode: 'ISO 1219-1:2012',
    title: 'Fluid power systems and components - Graphic symbols and circuit diagrams',
    item: 'Hydraulic Control Valves',
    category: 'valves',
    body: 'ISO',
    summary: 'Specifies graphic symbols for fluid power systems and components. Includes symbols for directional control valves, pressure control valves, flow control valves, and check valves.',
    specifications: [
      'Pressure rating: Up to 350 bar',
      'Temperature range: -40°C to +120°C',
      'Flow capacity: 2 to 200 L/min',
      'Port sizes: DN 6 to DN 32',
      'Materials: Carbon steel, stainless steel'
    ],
    relevance: 95,
    lastUpdated: '2023-12-15'
  },
  {
    id: 2,
    standardCode: 'IEC 60947-2:2016',
    title: 'Low-voltage switchgear and controlgear - Circuit-breakers',
    item: 'Circuit Breakers',
    category: 'relays',
    body: 'IEC',
    summary: 'Specifies requirements for circuit-breakers for operation in polluted atmospheres. Includes testing procedures and performance requirements.',
    specifications: [
      'Rated current: Up to 6300 A',
      'Rated voltage: Up to 1000 V AC',
      'Breaking capacity: Up to 150 kA',
      'Protection class: IP20 to IP65',
      'Operating temperature: -5°C to +40°C'
    ],
    relevance: 88,
    lastUpdated: '2023-11-20'
  },
  {
    id: 3,
    standardCode: 'DIN VDE 0298-4:2013',
    title: 'Use of cables and flexible cords - Current-carrying capacity',
    item: 'Power Cables',
    category: 'cables',
    body: 'DIN',
    summary: 'Specifies current-carrying capacity of cables and flexible cords for fixed wiring in buildings and similar installations.',
    specifications: [
      'Conductor cross-sections: 1.5 to 1000 mm²',
      'Rated voltage: Up to 1000 V',
      'Current ratings: 16 to 1000 A',
      'Installation methods: Various',
      'Temperature ratings: -15°C to +90°C'
    ],
    relevance: 82,
    lastUpdated: '2023-10-10'
  }
]

const aiQuestions = [
  'What is the specific application or environment for this item?',
  'What are the operating conditions (temperature, pressure, humidity)?',
  'What are the performance requirements (flow rate, current rating, etc.)?',
  'Are there any specific safety or certification requirements?',
  'What is the expected service life and maintenance schedule?'
]

export default function KnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBody, setSelectedBody] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [showAIQuestions, setShowAIQuestions] = useState(false)
  const [selectedResult, setSelectedResult] = useState<any>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsSearching(true)
    setShowAIQuestions(true)

    // Simulate LLM processing and standards mapping
    setTimeout(() => {
      setSearchResults(searchResults)
      setIsSearching(false)
    }, 3000)
  }

  const handleAIQuestion = (question: string) => {
    // Simulate AI processing the clarifying question
    console.log('AI Question:', question)
    setShowAIQuestions(false)
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar userRole="standards-expert" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-background-secondary border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Industrial Standards Knowledge Base</h1>
              <p className="text-text-secondary">LLM-Driven Standards Mapping & Retrieval</p>
            </div>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for item specification..."
                className="glow-input w-full pl-10"
              />
            </form>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar - Filters */}
            <div className="lg:col-span-1 space-y-6">
              {/* Standard Bodies Filter */}
              <div className="card">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-text-primary">Standard Bodies</h3>
                </div>
                
                <div className="space-y-2">
                  {standardBodies.map((body) => (
                    <motion.button
                      key={body.id}
                      onClick={() => setSelectedBody(selectedBody === body.id ? '' : body.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                        selectedBody === body.id
                          ? 'bg-primary/10 text-primary border border-primary/30'
                          : 'text-text-secondary hover:text-text-primary hover:bg-background-tertiary'
                      }`}
                      whileHover={{ x: 4 }}
                    >
                      <div>
                        <div className="font-medium">{body.name}</div>
                        <div className="text-xs opacity-75">{body.description}</div>
                      </div>
                      <span className="text-xs bg-background-tertiary px-2 py-1 rounded">
                        {body.count}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Item Categories Filter */}
              <div className="card">
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="w-5 h-5 text-accent-green" />
                  <h3 className="font-semibold text-text-primary">Item Categories</h3>
                </div>
                
                <div className="space-y-2">
                  {itemCategories.map((category) => {
                    const Icon = category.icon
                    return (
                      <motion.button
                        key={category.id}
                        onClick={() => setSelectedCategory(selectedCategory === category.id ? '' : category.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                          selectedCategory === category.id
                            ? 'bg-accent-green/10 text-accent-green border border-accent-green/30'
                            : 'text-text-secondary hover:text-text-primary hover:bg-background-tertiary'
                        }`}
                        whileHover={{ x: 4 }}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4" />
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <span className="text-xs bg-background-tertiary px-2 py-1 rounded">
                          {category.count}
                        </span>
                      </motion.button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-6">
              {/* AI Chatbot Section */}
              {showAIQuestions && (
                <div className="card">
                  <div className="flex items-center gap-3 mb-4">
                    <Brain className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-text-primary">AI Clarifying Questions</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {aiQuestions.map((question, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleAIQuestion(question)}
                        className="w-full p-3 bg-background-tertiary rounded-lg text-left hover:bg-primary/10 hover:text-primary transition-colors"
                        whileHover={{ x: 4 }}
                      >
                        <div className="flex items-center gap-3">
                          <MessageSquare className="w-4 h-4" />
                          <span className="text-sm">{question}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Search Status */}
              {isSearching && (
                <div className="card">
                  <div className="flex items-center gap-3">
                    <Brain className="w-5 h-5 text-primary animate-pulse" />
                    <div>
                      <p className="text-sm font-medium text-text-primary">AI Processing</p>
                      <p className="text-xs text-text-secondary">Mapping item to relevant standards...</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="card">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-text-primary">Retrieved Standards</h2>
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

                  <div className="space-y-4">
                    {searchResults.map((result) => (
                      <motion.div
                        key={result.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-background-tertiary rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer"
                        onClick={() => setSelectedResult(result)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                              <Hash className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-text-primary">{result.standardCode}</h3>
                              <p className="text-sm text-text-secondary">{result.title}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-medium text-accent-green">
                              {result.relevance}% relevant
                            </span>
                            <div className="text-xs text-text-muted mt-1">{result.body}</div>
                          </div>
                        </div>
                        
                        <p className="text-sm text-text-secondary mb-3">{result.summary}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-text-secondary">Item:</span>
                            <p className="text-text-primary font-medium">{result.item}</p>
                          </div>
                          <div>
                            <span className="text-text-secondary">Category:</span>
                            <p className="text-text-primary font-medium capitalize">{result.category}</p>
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-border">
                          <div className="flex items-center justify-between text-xs text-text-muted">
                            <span>Last updated: {result.lastUpdated}</span>
                            <button className="text-primary hover:text-primary-dark transition-colors">
                              View Full Specification
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Selected Result Details */}
              {selectedResult && (
                <div className="card">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-text-primary">Specification Details</h3>
                    <button 
                      onClick={() => setSelectedResult(null)}
                      className="text-text-secondary hover:text-text-primary"
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-text-primary mb-2">Key Specifications</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedResult.specifications.map((spec: string, index: number) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-background-tertiary rounded">
                            <CheckCircle className="w-4 h-4 text-accent-green" />
                            <span className="text-sm text-text-secondary">{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="btn-primary px-4 py-2 text-sm flex items-center gap-2">
                        <Copy className="w-4 h-4" />
                        Copy Specifications
                      </button>
                      <button className="btn-secondary px-4 py-2 text-sm flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Download PDF
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="card">
                <h3 className="font-semibold text-text-primary mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="p-4 bg-background-tertiary rounded-lg border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Brain className="w-5 h-5 text-primary" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-text-primary">AI Analysis</p>
                        <p className="text-xs text-text-secondary">Compare standards</p>
                      </div>
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="p-4 bg-background-tertiary rounded-lg border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Database className="w-5 h-5 text-accent-green" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-text-primary">Update Database</p>
                        <p className="text-xs text-text-secondary">Add new standards</p>
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