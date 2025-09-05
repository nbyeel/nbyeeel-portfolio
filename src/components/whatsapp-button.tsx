'use client'

import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'

interface WhatsAppButtonProps {
  phoneNumber: string
}

export function WhatsAppButton({ phoneNumber }: WhatsAppButtonProps) {
  const handleClick = () => {
    const message = encodeURIComponent("Hi Nabeel! I'd like to discuss a project with you.")
    const url = `https://wa.me/${phoneNumber}?text=${message}`
    window.open(url, '_blank')
  }

  return (
    <motion.button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <MessageCircle size={24} />
    </motion.button>
  )
}
