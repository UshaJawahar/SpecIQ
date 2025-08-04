'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  MessageSquare,
  BookOpen,
  FileText,
  DollarSign,
  Settings,
  LogOut,
  Brain,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import toast from 'react-hot-toast'

const navigationItems = [
  { name: 'Dashboard', id: 'dashboard', icon: LayoutDashboard, roles: ['admin', 'sales-engineer', 'standards-expert', 'electrical-team'] },
  { name: 'Sales Inquiry', id: 'sales-inquiry', icon: MessageSquare, roles: ['admin', 'sales-engineer'] },
  { name: 'Knowledge Base', id: 'knowledge-base', icon: BookOpen, roles: ['admin', 'standards-expert'] },
  { name: 'Tender Analysis', id: 'tender-analysis', icon: FileText, roles: ['admin', 'sales-engineer'] },
  { name: 'Quotation Retrieval', id: 'quotation-retrieval', icon: DollarSign, roles: ['admin', 'electrical-team'] },
  { name: 'Settings', id: 'settings', icon: Settings, roles: ['admin', 'sales-engineer', 'standards-expert', 'electrical-team'] },
]

interface SidebarProps {
  userRole?: string
  onSectionChange?: (section: string) => void
}

export default function Sidebar({ userRole = 'admin', onSectionChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const filteredItems = navigationItems.filter(item => 
    item.roles.includes(userRole)
  )

  const handleLogout = () => {
    // Simulate logout process
    toast.success('Logging out...')
    setTimeout(() => {
      localStorage.removeItem('user')
      localStorage.removeItem('isLoggedIn')
      window.location.href = '/'
    }, 1000)
  }

  const handleSectionClick = (sectionId: string) => {
    if (onSectionChange) {
      onSectionChange(sectionId)
    }
  }

  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className={`bg-background-secondary border-r border-border h-screen flex flex-col transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent-green rounded-lg flex items-center justify-center shadow-glow-blue">
            <Brain className="w-5 h-5 text-background" />
          </div>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-bold text-gradient"
            >
              SpecIQ
            </motion.div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {filteredItems.map((item) => {
          const Icon = item.icon
          
          return (
            <motion.button
              key={item.id}
              onClick={() => handleSectionClick(item.id)}
              className="sidebar-item w-full text-left"
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="w-5 h-5" />
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm font-medium"
                >
                  {item.name}
                </motion.span>
              )}
            </motion.button>
          )
        })}
      </nav>

      {/* Collapse Button */}
      <div className="p-4 border-t border-border">
        <motion.button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="sidebar-item w-full"
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.95 }}
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm font-medium"
            >
              Collapse
            </motion.span>
          )}
        </motion.button>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-border">
        <motion.button
          onClick={handleLogout}
          className="sidebar-item w-full text-red-500 hover:text-red-400"
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.95 }}
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm font-medium"
            >
              Logout
            </motion.span>
          )}
        </motion.button>
      </div>
    </motion.div>
  )
} 