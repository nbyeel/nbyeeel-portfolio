declare module 'next-themes' {
  import { ReactNode } from 'react'

  export interface ThemeProviderProps {
    children: ReactNode
    attribute?: string
    defaultTheme?: string
    enableSystem?: boolean
    disableTransitionOnChange?: boolean
  }

  export function ThemeProvider(props: ThemeProviderProps): JSX.Element
  export function useTheme(): {
    theme: string | undefined
    setTheme: (theme: string) => void
  }
}
