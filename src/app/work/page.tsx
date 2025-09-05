import { Metadata } from 'next'
import { WorkGrid } from '@/components/work-grid'

export const metadata: Metadata = {
  title: 'Work - Muhammad Nabeel',
  description: 'Explore my UI/UX design and web development projects.',
}

export default function WorkPage() {
  return (
    <main className="min-h-screen">
      <WorkGrid />
    </main>
  )
}
