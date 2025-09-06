'use client'

import { motion } from 'framer-motion'

export function ContactSection() {
  return (
    <section className="py-24 bg-white dark:bg-[#18181B]" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
            Let&apos;s Work Together
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto">
            I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10 md:mb-12">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Email</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">nbyeeeeel@gmail.com</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Location</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Gojra, Pakistan</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a
              href="mailto:nbyeeeeel@gmail.com"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-emerald-600 text-white font-semibold rounded-full hover:bg-emerald-700 transition-colors duration-200 text-sm sm:text-base"
            >
              Send Email
            </a>
            <a
              href="https://wa.me/923443814208"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-emerald-600 text-emerald-600 dark:text-emerald-400 font-semibold rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors duration-200 text-sm sm:text-base"
            >
              WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
