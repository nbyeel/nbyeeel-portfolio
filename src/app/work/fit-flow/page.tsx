import { Metadata } from 'next'
import { FitFlowCaseStudy } from '@/components/case-studies/fit-flow-case-study'

export const metadata: Metadata = {
  title: 'Fit Flow - Case Study | Muhammad Nabeel',
  description: 'A detailed case study of the Fit Flow health app design - currently in development for iOS.',
  openGraph: {
    title: 'Fit Flow - Case Study | Muhammad Nabeel',
    description: 'A detailed case study of the Fit Flow health app design - currently in development for iOS.',
    images: ['/projects/fit-flow-hero.jpg'],
  },
}

export default function FitFlowPage() {
  return (
    <main className="min-h-screen pt-20">
      <FitFlowCaseStudy />
    </main>
  )
}
