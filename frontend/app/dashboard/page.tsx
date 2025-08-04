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
  Activity
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

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('')
  const [userRole, setUserRole] = useState('admin')

  useEffect(() => {
    // Get user role from localStorage
    const userInfo = localStorage.getItem('user')
    if (userInfo) {
      const user = JSON.parse(userInfo)
      setUserRole(user.role || 'admin')
    }
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'status-success'
      case 'processing': return 'status-info'
      case 'pending': return 'status-warning'
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

  return (
    <div className="flex h-screen bg-background">
      <Sidebar userRole={userRole} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-background-secondary border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
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
        </main>
      </div>

      <AIAssistant />
    </div>
  )
} 