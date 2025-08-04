'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '@/components/Sidebar'
import AIAssistant from '@/components/AIAssistant'
import {
  Search,
  MessageSquare,
  FileText,
  BookOpen,
  TrendingUp,
  Clock,
  Users,
  Download,
  Brain,
  AlertCircle,
  CheckCircle,
  Activity,
  Upload,
  Settings,
  Database,
  Filter,
  ChevronDown,
  ChevronRight,
  Zap,
  DollarSign
} from 'lucide-react'

// Demo data
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
]

const projectStats = [
  { name: 'Total Documents', value: '1,247', change: '+12%', icon: FileText },
  { name: 'Active Projects', value: '23', change: '+3', icon: Activity },
  { name: 'AI Processed', value: '89%', change: '+5%', icon: Brain },
  { name: 'Response Time', value: '2.3h', change: '-0.5h', icon: Clock }
]

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
]

// Tender Analysis Data
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

const tabs = [
  { id: 'electrical', name: 'Electrical', icon: Zap },
  { id: 'mechanical', name: 'Mechanical', icon: Settings },
  { id: 'hydraulic', name: 'Hydraulic', icon: Database },
  { id: 'safety', name: 'Safety', icon: AlertCircle }
]

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('')
  const [userRole, setUserRole] = useState('admin')
  const [activeSection, setActiveSection] = useState('dashboard')
  const [activeTab, setActiveTab] = useState('electrical')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)

  useEffect(() => {
    // Get user role from localStorage
    const userInfo = localStorage.getItem('user')
    if (userInfo) {
      const user = JSON.parse(userInfo)
      setUserRole(user.role || 'admin')
    }
  }, [])

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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-accent-orange'
      case 'medium': return 'text-primary'
      case 'low': return 'text-accent-green'
      default: return 'text-text-secondary'
    }
  }

  const currentData = analysisResults[activeTab as keyof typeof analysisResults] || []

  // Render different content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Stats and Quick Access */}
            <div className="lg:col-span-2 space-y-6">
              {/* Project Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {projectStats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <motion.div
                      key={stat.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="card-hover"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-text-secondary text-sm">{stat.name}</p>
                          <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                          <p className="text-accent-green text-xs">{stat.change}</p>
                        </div>
                        <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Quick Access Tiles */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="card-hover cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-accent-green/20 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-accent-green" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary">Emails</h3>
                      <p className="text-text-secondary text-sm">12 unread</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="card-hover cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary">Quotes</h3>
                      <p className="text-text-secondary text-sm">5 pending</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="card-hover cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-accent-purple/20 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-accent-purple" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary">Manuals</h3>
                      <p className="text-text-secondary text-sm">Updated today</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Recent Projects */}
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-text-primary">Recent Projects</h2>
                  <button className="text-primary hover:text-primary-dark transition-colors">
                    View All
                  </button>
                </div>
                
                <div className="space-y-3">
                  {recentProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      whileHover={{ x: 4 }}
                      className="flex items-center justify-between p-3 bg-background-tertiary rounded-lg border border-border"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-text-primary">{project.name}</h3>
                          <p className="text-sm text-text-secondary">{project.client} • {project.size}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className={`status-badge ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                        <span className="text-xs text-text-muted">{project.lastUpdated}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Live Inquiry Feed */}
            <div className="space-y-6">
              {/* Live Inquiry Feed */}
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-text-primary">Live Inquiry Feed</h2>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent-green rounded-full animate-pulse"></div>
                    <span className="text-xs text-accent-green">Live</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {liveInquiries.map((inquiry) => (
                    <motion.div
                      key={inquiry.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-4 bg-background-tertiary rounded-lg border border-border"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-text-primary">{inquiry.client}</h3>
                        <span className={`text-xs font-medium ${getPriorityColor(inquiry.priority)}`}>
                          {inquiry.priority}
                        </span>
                      </div>
                      
                      <p className="text-sm text-text-secondary mb-3">{inquiry.inquiry}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className={`status-badge ${getStatusColor(inquiry.status)}`}>
                          {inquiry.status}
                        </span>
                        <span className="text-xs text-text-muted">{inquiry.time}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Retrieve Info Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                <Brain className="w-5 h-5" />
                Retrieve Info with AI
              </motion.button>
            </div>
          </div>
        )

      case 'sales-inquiry':
        return (
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-lg font-semibold text-text-primary mb-4">Sales Inquiry Management</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-background-tertiary rounded-lg">
                  <h3 className="font-medium text-text-primary mb-2">New Inquiries</h3>
                  <p className="text-2xl font-bold text-primary">12</p>
                  <p className="text-sm text-text-secondary">Today</p>
                </div>
                <div className="p-4 bg-background-tertiary rounded-lg">
                  <h3 className="font-medium text-text-primary mb-2">Processing</h3>
                  <p className="text-2xl font-bold text-accent-orange">8</p>
                  <p className="text-sm text-text-secondary">Active</p>
                </div>
                <div className="p-4 bg-background-tertiary rounded-lg">
                  <h3 className="font-medium text-text-primary mb-2">Completed</h3>
                  <p className="text-2xl font-bold text-accent-green">24</p>
                  <p className="text-sm text-text-secondary">This week</p>
                </div>
              </div>
            </div>

            <div className="card">
              <h2 className="text-lg font-semibold text-text-primary mb-4">Recent Inquiries</h2>
              <div className="space-y-3">
                {liveInquiries.map((inquiry) => (
                  <div key={inquiry.id} className="p-4 bg-background-tertiary rounded-lg border border-border">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-text-primary">{inquiry.client}</h3>
                      <span className={`text-xs font-medium ${getPriorityColor(inquiry.priority)}`}>
                        {inquiry.priority}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary mb-3">{inquiry.inquiry}</p>
                    <div className="flex items-center justify-between">
                      <span className={`status-badge ${getStatusColor(inquiry.status)}`}>
                        {inquiry.status}
                      </span>
                      <span className="text-xs text-text-muted">{inquiry.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'tender-analysis':
        return (
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
                    <button className="btn-secondary px-3 py-2 text-sm flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      Filter
                    </button>
                    <button className="btn-secondary px-3 py-2 text-sm flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Export Report
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
              </div>
            )}
          </div>
        )

      case 'knowledge-base':
        return (
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-lg font-semibold text-text-primary mb-4">Knowledge Base Management</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-background-tertiary rounded-lg">
                  <h3 className="font-medium text-text-primary mb-2">Total Documents</h3>
                  <p className="text-2xl font-bold text-primary">1,247</p>
                  <p className="text-sm text-text-secondary">In database</p>
                </div>
                <div className="p-4 bg-background-tertiary rounded-lg">
                  <h3 className="font-medium text-text-primary mb-2">Categories</h3>
                  <p className="text-2xl font-bold text-accent-green">24</p>
                  <p className="text-sm text-text-secondary">Organized</p>
                </div>
                <div className="p-4 bg-background-tertiary rounded-lg">
                  <h3 className="font-medium text-text-primary mb-2">Last Updated</h3>
                  <p className="text-2xl font-bold text-accent-orange">2h</p>
                  <p className="text-sm text-text-secondary">Ago</p>
                </div>
              </div>
            </div>

            <div className="card">
              <h2 className="text-lg font-semibold text-text-primary mb-4">Recent Updates</h2>
              <div className="space-y-3">
                {recentProjects.map((project) => (
                  <div key={project.id} className="p-4 bg-background-tertiary rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-text-primary">{project.name}</h3>
                        <p className="text-sm text-text-secondary">{project.client} • {project.size}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`status-badge ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                        <span className="text-xs text-text-muted">{project.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'quotation-retrieval':
        return (
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-lg font-semibold text-text-primary mb-4">Quotation Retrieval</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-background-tertiary rounded-lg">
                  <h3 className="font-medium text-text-primary mb-2">Total Quotes</h3>
                  <p className="text-2xl font-bold text-primary">456</p>
                  <p className="text-sm text-text-secondary">Available</p>
                </div>
                <div className="p-4 bg-background-tertiary rounded-lg">
                  <h3 className="font-medium text-text-primary mb-2">This Month</h3>
                  <p className="text-2xl font-bold text-accent-green">23</p>
                  <p className="text-sm text-text-secondary">Generated</p>
                </div>
                <div className="p-4 bg-background-tertiary rounded-lg">
                  <h3 className="font-medium text-text-primary mb-2">Pending</h3>
                  <p className="text-2xl font-bold text-accent-orange">7</p>
                  <p className="text-sm text-text-secondary">Awaiting approval</p>
                </div>
              </div>
            </div>

            <div className="card">
              <h2 className="text-lg font-semibold text-text-primary mb-4">Recent Quotations</h2>
              <div className="space-y-3">
                {recentProjects.map((project) => (
                  <div key={project.id} className="p-4 bg-background-tertiary rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-text-primary">{project.name}</h3>
                        <p className="text-sm text-text-secondary">{project.client} • {project.size}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`status-badge ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                        <span className="text-xs text-text-muted">{project.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'settings':
        return (
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-lg font-semibold text-text-primary mb-4">System Settings</h2>
              <div className="space-y-4">
                <div className="p-4 bg-background-tertiary rounded-lg">
                  <h3 className="font-medium text-text-primary mb-2">User Profile</h3>
                  <p className="text-sm text-text-secondary">Manage your account settings and preferences</p>
                </div>
                <div className="p-4 bg-background-tertiary rounded-lg">
                  <h3 className="font-medium text-text-primary mb-2">System Configuration</h3>
                  <p className="text-sm text-text-secondary">Configure system-wide settings and parameters</p>
                </div>
                <div className="p-4 bg-background-tertiary rounded-lg">
                  <h3 className="font-medium text-text-primary mb-2">Security</h3>
                  <p className="text-sm text-text-secondary">Manage security settings and access controls</p>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-lg font-semibold text-text-primary">Welcome to SpecIQ</h2>
              <p className="text-text-secondary">Select a section from the sidebar to get started.</p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar userRole={userRole} onSectionChange={setActiveSection} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-background-secondary border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-text-primary capitalize">
                {activeSection === 'dashboard' ? 'Dashboard' : 
                 activeSection === 'sales-inquiry' ? 'Sales Inquiry' :
                 activeSection === 'tender-analysis' ? 'Tender Analysis' :
                 activeSection === 'knowledge-base' ? 'Knowledge Base' :
                 activeSection === 'quotation-retrieval' ? 'Quotation Retrieval' :
                 activeSection === 'settings' ? 'Settings' : 'Dashboard'}
              </h1>
              <p className="text-text-secondary">AI-Powered Sales Inquiry Management</p>
            </div>
            
            {/* Search Bar */}
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for item, client, or project..."
                className="glow-input w-full pl-10"
              />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>

      <AIAssistant />
    </div>
  )
} 