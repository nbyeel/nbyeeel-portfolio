'use client'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  className?: string
}

export function LoadingSpinner({ size = 'md', text, className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  }

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }

  return (
    <div className={`flex items-center space-x-2 text-zinc-500 dark:text-zinc-400 ${className}`}>
      <div className={`${sizeClasses[size]} border-2 border-zinc-300 dark:border-zinc-600 border-t-transparent rounded-full animate-spin`}></div>
      {text && <span className={textSizeClasses[size]}>{text}</span>}
    </div>
  )
}
