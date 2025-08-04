'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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

const navigationItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['admin', 'sales-engineer', 'standards-expert', 'electrical-team'] },
  { name: 'Sales Inquiry', href: '/sales-inquiry', icon: MessageSquare, roles: ['admin', 'sales-engineer'] },
  { name: 'Knowledge Base', href: '/knowledge-base', icon: BookOpen, roles: ['admin', 'standards-expert'] },
  { name: 'Tender Analysis', href: '/tender-analysis', icon: FileText, roles: ['admin', 'sales-engineer'] },
  { name: 'Quotation Retrieval', href: '/quotation-retrieval', icon: DollarSign, roles: ['admin', 'electrical-team'] },
  { name: 'Settings', href: '/settings', icon: Settings, roles: ['admin'] },
]

interface SidebarProps {
  userRole?: string
}

export default function Sidebar({ userRole = 'admin' }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  const filteredItems = navigationItems.filter(item => 
    item.roles.includes(userRole)
  )

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
          const isActive = pathname === item.href
          
          return (
            <Link key={item.name} href={item.href}>
              <motion.div
                className={`sidebar-item ${isActive ? 'active' : ''}`}
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
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-4 border-t border-border">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center gap-2 text-text-secondary hover:text-primary transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm">Collapse</span>
            </>
          )}
        </button>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-border">
        <button className="w-full flex items-center gap-2 text-text-secondary hover:text-accent-orange transition-colors">
          <LogOut className="w-4 h-4" />
          {!isCollapsed && <span className="text-sm">Logout</span>}
        </button>
      </div>
    </motion.div>
  )
} 