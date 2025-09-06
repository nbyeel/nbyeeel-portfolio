'use client'

import { motion } from 'framer-motion'

export function AboutSection() {
  return (
    <section className="pt-16 sm:pt-24 md:pt-32 lg:pt-48 xl:pt-60 pb-24 bg-white dark:bg-[#18181B]" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full"
        >
          <div className="mb-1">
            <div className="text-center w-full">
              <div className="mt-6 md:mt-5 mb-16 w-full flex justify-center items-center">
                <p
                  className="font-editorial text-center w-full text-[#3F3F46] dark:text-[#DDE0E6]"
                  style={{ 
                    fontSize: 'clamp(1.5rem, 2.2vw, 3rem)',
                    lineHeight: 'clamp(1.8rem, 2.6vw, 2.80rem)',
                    fontWeight: '500',
                    fontFamily: 'Editorial New, Caveat, Dancing Script, cursive',
                    fontStyle: 'italic'
                  }}
                >
                  This is what sets me apart
                </p>
              </div>
            </div>

            <div className="mt-16 sm:mt-24 md:mt-32 lg:mt-48 xl:mt-60 max-w-4xl">
              <div className="space-y-12 sm:space-y-16 md:space-y-20">
                {/* Philosophy 1 */}
                <div className="group relative">
                  <div className="flex items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <div className="w-1 h-8 sm:h-10 md:h-12 bg-emerald-600 group-hover:h-12 sm:group-hover:h-14 md:group-hover:h-16 transition-all duration-500 ease-out"></div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-neue-montreal font-light text-emerald-800 dark:text-emerald-600 group-hover:font-medium transition-all duration-300">
                      Start With Why
                    </h3>
                  </div>
                  <div className="ml-7">
                    <div className="relative">
                      <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-neue-montreal group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
                        I try to understand the core motivations, and needs of users and most importantly how big of an impact will it make.
                      </p>
                      <div className="absolute -left-4 top-0 w-2 h-2 bg-emerald-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200"></div>
                    </div>
                  </div>
                </div>

                {/* Philosophy 2 */}
                <div className="group relative">
                  <div className="flex items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <div className="w-1 h-8 sm:h-10 md:h-12 bg-amber-600 group-hover:h-12 sm:group-hover:h-14 md:group-hover:h-16 transition-all duration-500 ease-out"></div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-neue-montreal font-light text-amber-800 dark:text-amber-600 group-hover:font-medium transition-all duration-300">
                      Attention To Detail
                    </h3>
                  </div>
                  <div className="ml-7">
                    <div className="relative">
                      <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-neue-montreal group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
                        I like to be a perfectionist. I embrace a detail-oriented mindset which creates experiences that leave a lasting impression.
                      </p>
                      <div className="absolute -left-4 top-0 w-2 h-2 bg-amber-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200"></div>
                    </div>
                  </div>
                </div>

                {/* Philosophy 3 */}
                <div className="group relative">
                  <div className="flex items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <div className="w-1 h-8 sm:h-10 md:h-12 bg-emerald-600 group-hover:h-12 sm:group-hover:h-14 md:group-hover:h-16 transition-all duration-500 ease-out"></div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-neue-montreal font-light text-emerald-800 dark:text-emerald-600 group-hover:font-medium transition-all duration-300">
                      Users At The Heart Of Things
                    </h3>
                  </div>
                  <div className="ml-7">
                    <div className="relative">
                      <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-neue-montreal group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
                        While designing experiences, I keep users front and center. I prefer making decisions that are grounded in data.
                      </p>
                      <div className="absolute -left-4 top-0 w-2 h-2 bg-emerald-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
