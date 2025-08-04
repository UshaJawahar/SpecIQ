'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, X, MessageCircle, Sparkles, Send, Copy, Download, RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your AI assistant. How can I help you with specifications, standards, or inquiries today?',
      timestamp: new Date()
    },
    {
      id: '2',
      type: 'user',
      content: 'Can you help me find ISO standards for hydraulic valves?',
      timestamp: new Date()
    },
    {
      id: '3',
      type: 'ai',
      content: 'I found several relevant ISO standards for hydraulic valves:\n\n• ISO 1219-1:2012 - Fluid power systems\n• ISO 4411:2008 - Hydraulic fluid power\n• ISO 5598:2008 - Vocabulary\n\nWould you like me to provide detailed specifications for any of these standards?',
      timestamp: new Date()
    }
  ])
  const [isTyping, setIsTyping] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setMessage('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        'I\'ve analyzed your query and found relevant information. Let me provide you with the details...',
        'Based on the specifications you mentioned, here are the applicable standards and requirements...',
        'I can help you with that! Let me search through our knowledge base for the most relevant information...',
        'Great question! I\'ve identified several options that match your requirements. Here\'s what I found...',
        'I\'ve processed your request and found matching specifications. Here are the details...'
      ]
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)]
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: randomResponse,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 2000)
  }

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
    toast.success('Message copied to clipboard')
  }

  const handleExportChat = () => {
    const chatContent = messages.map(msg => 
      `${msg.type === 'user' ? 'You' : 'AI'}: ${msg.content}`
    ).join('\n\n')
    
    const blob = new Blob([chatContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ai-chat-${new Date().toISOString().split('T')[0]}.txt`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Chat exported successfully')
  }

  const handleClearChat = () => {
    setMessages([{
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your AI assistant. How can I help you with specifications, standards, or inquiries today?',
      timestamp: new Date()
    }])
    toast.success('Chat cleared')
  }

  return (
    <>
      {/* Floating AI Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-primary to-accent-green rounded-full flex items-center justify-center shadow-glow-blue hover:shadow-glow-green transition-all duration-300 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Brain className="w-6 h-6 text-background" />
      </motion.button>

      {/* AI Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-end p-6"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 100 }}
              className="bg-background-secondary border border-border rounded-2xl shadow-2xl w-96 max-h-[600px] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent-green rounded-lg flex items-center justify-center">
                    <Brain className="w-4 h-4 text-background" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">AI Assistant</h3>
                    <p className="text-xs text-text-secondary">Powered by SpecIQ</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportChat}
                    className="text-text-secondary hover:text-text-primary transition-colors p-1"
                    title="Export Chat"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleClearChat}
                    className="text-text-secondary hover:text-text-primary transition-colors p-1"
                    title="Clear Chat"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-4 space-y-4 max-h-80 overflow-y-auto">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex items-start gap-3 ${msg.type === 'user' ? 'justify-end' : ''}`}>
                    {msg.type === 'ai' && (
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                        <Brain className="w-4 h-4 text-primary" />
                      </div>
                    )}
                    
                    <div className={`rounded-lg p-3 max-w-[80%] ${
                      msg.type === 'user' 
                        ? 'bg-primary/20' 
                        : 'bg-background-tertiary'
                    }`}>
                      <p className="text-sm text-text-primary whitespace-pre-line">
                        {msg.content}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-text-muted">
                          {msg.timestamp.toLocaleTimeString()}
                        </span>
                        <button
                          onClick={() => handleCopyMessage(msg.content)}
                          className="text-text-muted hover:text-text-primary transition-colors p-1"
                          title="Copy message"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    
                    {msg.type === 'user' && (
                      <div className="w-8 h-8 bg-accent-green/20 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-4 h-4 text-accent-green" />
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <Brain className="w-4 h-4 text-primary" />
                    </div>
                    <div className="bg-background-tertiary rounded-lg p-3">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSubmit} className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask me anything..."
                    className="flex-1 glow-input text-sm"
                    disabled={isTyping}
                  />
                  <button
                    type="submit"
                    disabled={isTyping || !message.trim()}
                    className="bg-primary text-background p-2 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 