'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Brain, 
  Shield, 
  User, 
  Building2, 
  Zap, 
  Lock,
  Eye,
  EyeOff,
  ArrowRight
} from 'lucide-react'
import toast from 'react-hot-toast'

const roles = [
  { id: 'admin', name: 'Admin', icon: Shield, description: 'Full system access' },
  { id: 'sales-engineer', name: 'Sales Engineer', icon: User, description: 'Sales inquiry & tender analysis' },
  { id: 'standards-expert', name: 'Standards Expert', icon: Brain, description: 'Knowledge base management' },
  { id: 'electrical-team', name: 'Electrical Team', icon: Zap, description: 'Quotation retrieval' },
]

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState('')
  const [companyId, setCompanyId] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!companyId || !password || !selectedRole) {
      toast.error('Please fill in all fields and select a role')
      return
    }

    setIsLoading(true)
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyId,
          password,
          role: selectedRole
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Store token in localStorage
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        
        toast.success(data.message || `Welcome! Logging in as ${selectedRole}`)
        
        // Redirect based on role
        switch (selectedRole) {
          case 'admin':
            router.push('/sales-inquiry')
            break
          case 'sales-engineer':
            router.push('/sales-inquiry')
            break
          case 'standards-expert':
            router.push('/knowledge-base')
            break
          case 'electrical-team':
            router.push('/quotation-retrieval')
            break
          default:
            router.push('/sales-inquiry')
        }
      } else {
        toast.error(data.error || 'Login failed. Please try again.')
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Network error. Please check your connection.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = (role: string) => {
    // Set demo credentials for the selected role
    const demoCredentials = {
      'admin': { companyId: 'admin', password: 'admin123' },
      'sales-engineer': { companyId: 'sales', password: 'sales123' },
      'standards-expert': { companyId: 'standards', password: 'standards123' },
      'electrical-team': { companyId: 'electrical', password: 'electrical123' }
    }
    
    const demoCred = demoCredentials[role as keyof typeof demoCredentials]
    if (demoCred) {
      setSelectedRole(role)
      setCompanyId(demoCred.companyId)
      setPassword(demoCred.password)
      toast.success(`Demo credentials loaded for ${role}`)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent-green rounded-2xl flex items-center justify-center shadow-glow-blue">
              <Brain className="w-8 h-8 text-background" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gradient mb-2">SpecIQ</h1>
          <p className="text-text-secondary">AI-Powered Sales Inquiry & Knowledge Management</p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Company ID Input */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Company ID
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="text"
                  value={companyId}
                  onChange={(e) => setCompanyId(e.target.value)}
                  className="glow-input w-full pl-10"
                  placeholder="Enter your company ID"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="glow-input w-full pl-10 pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-primary"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-3">
                Select Role
              </label>
              <div className="grid grid-cols-2 gap-3">
                {roles.map((role) => {
                  const Icon = role.icon
                  return (
                    <motion.button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id)}
                      onDoubleClick={() => handleDemoLogin(role.id)}
                      className={`p-3 rounded-lg border transition-all duration-200 text-left ${
                        selectedRole === role.id
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border bg-background-tertiary text-text-secondary hover:border-primary/50 hover:text-primary'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className="w-5 h-5 mb-2" />
                      <div className="text-sm font-medium">{role.name}</div>
                      <div className="text-xs opacity-75">{role.description}</div>
                      <div className="text-xs text-text-muted mt-1">Double-click for demo</div>
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {/* Login Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Sign in with Company ID
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8 text-text-muted text-sm"
        >
          <p>© 2024 SpecIQ. AI-Powered Enterprise Solutions</p>
          <p className="mt-2 text-xs">Demo: Double-click any role to auto-fill credentials</p>
        </motion.div>
      </div>
    </div>
  )
} 