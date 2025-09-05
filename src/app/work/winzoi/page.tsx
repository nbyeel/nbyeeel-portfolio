import { Metadata } from 'next'
import { WinzoiCaseStudy } from '@/components/case-studies/winzoi-case-study'

export const metadata: Metadata = {
  title: 'WINZOI App - Case Study | Muhammad Nabeel',
  description: 'A detailed case study of the WINZOI mobile app design - a giveaway platform with 10k+ user engagements and 20k+ conversions.',
  openGraph: {
    title: 'WINZOI App - Case Study | Muhammad Nabeel',
    description: 'A detailed case study of the WINZOI mobile app design - a giveaway platform with 10k+ user engagements and 20k+ conversions.',
    images: ['/projects/winzoi-hero.jpg'],
  },
}

export default function WinzoiPage() {
  return (
    <main className="min-h-screen pt-20">
      <WinzoiCaseStudy />
    </main>
  )
}
