'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, X, MessageCircle, Sparkles } from 'lucide-react'

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      // Handle AI interaction here
      console.log('AI Message:', message)
      setMessage('')
      setIsOpen(false)
    }
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
              className="bg-background-secondary border border-border rounded-2xl shadow-2xl w-96 max-h-[500px] flex flex-col"
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
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-text-secondary hover:text-text-primary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-4 space-y-4 max-h-80 overflow-y-auto">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <Brain className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-background-tertiary rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm text-text-primary">
                      Hello! I'm your AI assistant. How can I help you with specifications, standards, or inquiries today?
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 justify-end">
                  <div className="bg-primary/20 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm text-text-primary">
                      Can you help me find ISO standards for hydraulic valves?
                    </p>
                  </div>
                  <div className="w-8 h-8 bg-accent-green/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-accent-green" />
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <Brain className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-background-tertiary rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm text-text-primary">
                      I found several relevant ISO standards for hydraulic valves:
                    </p>
                    <ul className="text-sm text-text-secondary mt-2 space-y-1">
                      <li>• ISO 1219-1:2012 - Fluid power systems</li>
                      <li>• ISO 4411:2008 - Hydraulic fluid power</li>
                      <li>• ISO 5598:2008 - Vocabulary</li>
                    </ul>
                  </div>
                </div>
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
                  />
                  <button
                    type="submit"
                    className="bg-primary text-background p-2 rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    <Sparkles className="w-4 h-4" />
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