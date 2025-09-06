'use client'

import { useState } from 'react'

export function Footer() {
  const [emailCopied, setEmailCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('nbyeeeeel@gmail.com')
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 500)
    } catch (err) {
      console.error('Failed to copy email:', err)
    }
  }

  return (
    <section className="mt-[15px] flex flex-col rounded-t-[56px] bg-emerald-800" id="footer">
      <div className="font-neue-montreal-book relative z-0 mx-auto mt-16 sm:mt-24 md:mt-32 lg:mt-48 xl:mt-[200px] flex w-full max-w-[1440px] flex-col items-center gap-4">
        <div className="flex w-full flex-col gap-4 px-4 sm:px-6">
          <div>
            <h1 className="w-auto" style={{
              fontFamily: 'PP Neue Montreal, sans-serif',
              fontWeight: '400',
              fontSize: 'clamp(2rem, 8vw, 96px)',
              lineHeight: 'clamp(2.2rem, 8vw, 96px)',
              letterSpacing: '-3px',
              color: '#34D399'
            }}>
              Hi, I&apos;m Nabeel, UI & UX Designer based in Pakistan.
            </h1>
            <p className="prose mt-4 sm:mt-6 md:mt-8" style={{
              fontFamily: 'PP Neue Montreal, sans-serif',
              fontWeight: '300',
              fontSize: 'clamp(1rem, 2.5vw, 24px)',
              lineHeight: 'clamp(1.4rem, 3vw, 32px)',
              letterSpacing: '0px',
              color: '#A7F3D0'
            }}>
              Thank you for taking your time, it means a lot. I like experimenting with interfaces, design<br />
              and interactions. That reflects in what I practice. Point of this website is just to share the<br />
              same philosophy with the world.
            </p>
          </div>
          
          <div className="mb-12 sm:mb-16 md:mb-20 mt-16 sm:mt-24 md:mt-32 lg:mt-40 flex flex-col gap-0">
            <h1 className="font-neue-montreal-medium pointer-events-none relative -z-10 w-auto overflow-hidden capitalize leading-tight tracking-normal lg:-mb-32 text-[60px] sm:text-[80px] lg:text-[200px] xl:text-[300px] font-neue-montreal-book !text-emerald-400">
              Socials
              <div className="absolute bottom-0 left-0 size-full !bg-gradient-to-b !from-transparent !via-emerald-800 !via-65% !to-emerald-800"></div>
            </h1>
          </div>
          
          <div className="mx-auto mt-4 flex w-full flex-col items-center gap-3 sm:gap-4 md:flex-row">
            <a 
              target="_blank" 
              className="group relative w-full overflow-hidden rounded-[48px] sm:rounded-[56px] md:rounded-[64px] bg-emerald-900 from-emerald-900 to-emerald-950 p-4 sm:p-6 md:p-8 text-emerald-400 transition-all duration-500" 
              href="https://www.linkedin.com/in/nabeel-arif-2a515836b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
            >
              <span className="absolute bottom-[-6px] left-0 size-full rounded-[64px] bg-emerald-700/10 transition-all duration-300 group-hover:bottom-[-12px]"></span>
              <div className="flex-col items-center justify-start">
                <div className="z-20 text-[24px] sm:text-[30px] md:text-[38px]">LinkedIn</div>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className="ml-2 inline-block size-12" height="1em" width="1em">
                  <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path>
                </svg>
              </div>
            </a>
            
            <a 
              target="_blank" 
              className="group relative w-full overflow-hidden rounded-[48px] sm:rounded-[56px] md:rounded-[64px] bg-emerald-900 from-emerald-900 to-emerald-950 p-4 sm:p-6 md:p-8 text-emerald-400 transition-all duration-500" 
              href="https://www.instagram.com/nbyeeel"
            >
              <span className="absolute bottom-[-6px] left-0 size-full rounded-[64px] bg-emerald-700/10 transition-all duration-300 group-hover:bottom-[-12px]"></span>
              <div className="flex-col items-center justify-start">
                <div className="z-20 text-[24px] sm:text-[30px] md:text-[38px]">Instagram</div>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className="ml-2 inline-block size-12" height="1em" width="1em">
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                </svg>
              </div>
            </a>
            
            <a 
              target="_blank" 
              className="group relative w-full overflow-hidden rounded-[48px] sm:rounded-[56px] md:rounded-[64px] bg-emerald-900 from-emerald-900 to-emerald-950 p-4 sm:p-6 md:p-8 text-emerald-400 transition-all duration-500" 
              href="https://www.upwork.com/freelancers/~016b66208fc9f66c0b?mp_source=share"
            >
              <span className="absolute bottom-[-6px] left-0 size-full rounded-[64px] bg-emerald-700/10 transition-all duration-300 group-hover:bottom-[-12px]"></span>
              <div className="flex-col items-center justify-start">
                <div className="z-20 text-[24px] sm:text-[30px] md:text-[38px]">Upwork</div>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 640 512" className="ml-2 inline-block size-12" height="1em" width="1em">
                  <path d="M493.9 295.6c-50.3 0-83.5-38.9-92.8-53.9 11.9-95.3 46.8-125.4 92.8-125.4 45.5 0 80.9 36.4 80.9 89.7s-35.4 89.7-80.9 89.7l0-.1zm0-237.8c-81.9 0-127.8 53.4-141 108.4-14.9-28-25.9-65.5-34.5-100.3l-113.2 0 0 141c0 51.1-23.3 89-68.8 89s-71.6-37.8-71.6-89l.5-141-65.3 0 0 141c0 41.1 13.3 78.4 37.6 105.1 25 27.5 59.2 41.8 98.8 41.8 78.8 0 133.8-60.4 133.8-146.9l0-94.8c8.2 31.2 27.8 91.1 65.3 143.6l-35 199.4 66.4 0 23.1-141.3c7.6 6.3 15.7 12 24.2 17 22.2 14 47.7 21.9 73.9 22.8 0 0 4 .2 6.1 .2 81.2 0 145.9-62.9 145.9-147.8S575.3 57.9 494.1 57.9l-.2-.1z"/>
                </svg>
              </div>
            </a>
          </div>
          
          <button 
            onClick={copyEmail}
            className="relative flex w-full flex-col-reverse items-start gap-3 sm:gap-4 rounded-[48px] sm:rounded-[56px] md:rounded-[64px] bg-emerald-900 p-4 sm:p-6 md:p-8 text-[24px] sm:text-[30px] md:text-[38px] text-emerald-400"
          >
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
              {/* @ Icon */}
              <svg 
                stroke="currentColor" 
                fill="currentColor" 
                strokeWidth="0" 
                viewBox="0 0 24 24" 
                height="32"
                width="32"
                className={`absolute inset-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 transition-all duration-500 ease-in-out ${
                  emailCopied 
                    ? 'opacity-0 scale-75 rotate-12' 
                    : 'opacity-100 scale-100 rotate-0'
                }`}
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M12 1.95c-5.52 0-10 4.48-10 10s4.48 10 10 10h5v-2h-5c-4.34 0-8-3.66-8-8s3.66-8 8-8 8 3.66 8 8v1.43c0 .79-.71 1.57-1.5 1.47s-1.5-.78-1.5-1.57v-1.43c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5c1.38 0 2.64-.56 3.54-1.47.65.89 1.77 1.47 2.96 1.47 1.97 0 3.5-1.6 3.5-3.57v-1.43c0-5.52-4.48-10-10-10zm0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"></path>
              </svg>
              
              {/* Tick Icon */}
              <svg 
                stroke="currentColor" 
                fill="currentColor" 
                strokeWidth="0" 
                viewBox="0 0 24 24" 
                height="32"
                width="32"
                className={`absolute inset-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 transition-all duration-500 ease-in-out ${
                  emailCopied 
                    ? 'opacity-100 scale-100 rotate-0' 
                    : 'opacity-0 scale-75 -rotate-12'
                }`}
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" className="transition-all duration-300 ease-out"></path>
              </svg>
            </div>
            Copy Email
            <span className="absolute bottom-[-6px] left-0 z-10 size-full rounded-[64px] bg-emerald-700/10 transition-all duration-300 group-hover:bottom-[-12px]"></span>
            {emailCopied && (
              <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
                <div className="bg-emerald-900/95 backdrop-blur-sm border border-emerald-400/30 text-emerald-100 px-6 py-4 rounded-2xl shadow-2xl transform transition-all duration-300 animate-in fade-in zoom-in-95">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium text-lg">Email copied to clipboard!</span>
                  </div>
                </div>
              </div>
            )}
          </button>
        </div>
      </div>
      
      <div className="relative flex w-full flex-col items-center overflow-hidden text-clip bg-gradient-to-t from-amber-800 via-amber-800 to-emerald-800">
        <div className="h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] w-full flex items-end justify-center pb-12 sm:pb-16 md:pb-20 lg:pb-50">
          <div className="px-4 sm:px-6 md:px-8">
                          <h3 className="w-auto font-bold leading-tight tracking-normal text-emerald-300 dark:text-emerald-400 text-[60px] sm:text-[80px] md:text-[120px] lg:text-[160px] xl:text-[200px] font-pp-neue-montreal text-gray-700/20 dark:text-gray-700/20">
              Thank you!
            </h3>
          </div>
        </div>
        
        <div className="w-full flex justify-center mb-8">
          <div className="w-full h-px" style={{ backgroundColor: '#783510' }}></div>
        </div>
        
        <div className="flex flex-col items-center gap-3 sm:gap-4 py-8 sm:py-12 md:py-16 lg:py-[50px]">
          <div className="flex flex-col items-center text-center">
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: '400',
              fontSize: 'clamp(12px, 2vw, 16px)',
              lineHeight: 'clamp(18px, 2.5vw, 24px)',
              letterSpacing: '0px',
              color: '#FBBF24'
            }}>
              All rights reserved. © 2025 Nabeel
            </p>
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: '400',
              fontSize: 'clamp(12px, 2vw, 16px)',
              lineHeight: 'clamp(18px, 2.5vw, 24px)',
              letterSpacing: '0px',
              color: '#FBBF24'
            }}>
              Built with Next.js, Tailwind CSS, and lots of creativity
            </span>
          </div>
          <div className="flex items-center justify-center gap-3 sm:gap-4 text-zinc-400 *:fill-amber-400 dark:text-zinc-600">
            <a target="_blank" className="text-amber-600 transition-all duration-500 hover:text-amber-300" href="https://github.com/nbyeel">
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="20" width="20" className="w-5 h-5 sm:w-6 sm:h-6">
                <path d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z"></path>
              </svg>
            </a>
            <a target="_blank" className="text-amber-600 transition-all duration-500 hover:text-amber-300" href="https://www.instagram.com/nbyeeel">
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="24" width="24">
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
              </svg>
            </a>
            <a target="_blank" className="text-amber-600 transition-all duration-500 hover:text-amber-300" href="https://www.upwork.com/freelancers/~016b66208fc9f66c0b?mp_source=share">
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 640 512" height="24" width="24">
                <path d="M493.9 295.6c-50.3 0-83.5-38.9-92.8-53.9 11.9-95.3 46.8-125.4 92.8-125.4 45.5 0 80.9 36.4 80.9 89.7s-35.4 89.7-80.9 89.7l0-.1zm0-237.8c-81.9 0-127.8 53.4-141 108.4-14.9-28-25.9-65.5-34.5-100.3l-113.2 0 0 141c0 51.1-23.3 89-68.8 89s-71.6-37.8-71.6-89l.5-141-65.3 0 0 141c0 41.1 13.3 78.4 37.6 105.1 25 27.5 59.2 41.8 98.8 41.8 78.8 0 133.8-60.4 133.8-146.9l0-94.8c8.2 31.2 27.8 91.1 65.3 143.6l-35 199.4 66.4 0 23.1-141.3c7.6 6.3 15.7 12 24.2 17 22.2 14 47.7 21.9 73.9 22.8 0 0 4 .2 6.1 .2 81.2 0 145.9-62.9 145.9-147.8S575.3 57.9 494.1 57.9l-.2-.1z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
