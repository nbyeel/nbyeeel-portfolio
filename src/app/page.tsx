import { Hero } from '@/components/hero'
import { ProjectsSection } from '@/components/projects-section'
import { CareerSection } from '@/components/career-section'
import { BlogSection } from '@/components/blog-section'
import { AboutSection } from '@/components/about-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ProjectsSection />
      <CareerSection />
      <BlogSection />
      <AboutSection />
      <Footer />
    </main>
  )
}
