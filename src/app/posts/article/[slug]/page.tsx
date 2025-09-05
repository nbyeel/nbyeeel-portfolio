import { client, safeFetch } from '@/lib/sanity'
import { notFound } from 'next/navigation'
import { urlForImage } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import { format } from 'date-fns'
import { ArrowLeft, Clock, Calendar, MessageCircle, Users, ExternalLink, TrendingUp, Smartphone, Zap } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import BlogShare from '@/components/blog-share'

import TableOfContents from '@/components/table-of-contents'

interface Post {
  _id: string
  title: string
  slug: { current: string }
  hook?: {
    text: string
    letterSpacing: string
    lineHeight: string
    fontSize: string
    customFontSize?: number
  }
  introduction: {
    headline?: string
    text: string
    letterSpacing: string
    lineHeight: string
    fontSize: string
    customFontSize?: number
  }
  mainBody: {
    content: any[]
    letterSpacing: string
    lineHeight: string
    fontSize: string
    customFontSize?: number
  }
  conclusion: {
    text: string
    letterSpacing: string
    lineHeight: string
    fontSize: string
    customFontSize?: number
  }
  publishedAt: string
  coverImage?: {
    asset: {
      _ref: string
    }
    alt?: string
  }
  categories?: string[]
  technologies?: string[]
  author?: {
    name: string
    avatar?: {
      asset: {
        _ref: string
      }
    }
    bio?: {
      text: string
      letterSpacing: string
      lineHeight: string
      fontSize: string
      customFontSize?: number
    }
    website?: string
    socialLinks?: {
      twitter?: string
      linkedin?: string
      github?: string
    }
  }
  callToAction?: {
    title: string
    description: {
      text: string
      letterSpacing: string
      lineHeight: string
      fontSize: string
      customFontSize?: number
    }
    buttonText: string
    buttonUrl: string
    buttonStyle: string
  }
}

// Custom components for PortableText - Jinesh Inspired
const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <figure className="my-12">
          <div className="relative overflow-hidden rounded-lg">
            <Image
              src={urlForImage(value).url()}
              alt={value.alt || 'Blog post image'}
              width={1200}
              height={800}
              className="w-full h-auto object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center mt-4 text-sm text-[#374151] dark:text-[#D1D5DA]">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
  block: {
    normal: ({ children, value }: any) => {
      // Check if this is an empty block (no children or only whitespace)
      const isEmpty = !children || (Array.isArray(children) && children.length === 0) || 
                     (typeof children === 'string' && children.trim() === '') ||
                     (Array.isArray(children) && children.every(child => 
                       typeof child === 'string' && child.trim() === ''
                     ))
      
      if (isEmpty) {
        // Render empty blocks as <br> elements to preserve multiple line breaks
        return <br className="block h-6" />
      }
      
      // Render normal paragraphs with clean typography
      return (
        <p className="leading-relaxed mb-6 text-lg text-[#374151] dark:text-[#D1D5DA]">
          {children}
        </p>
      )
    },
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold mt-16 mb-8 leading-tight scroll-mt-24 text-[#111827] dark:text-[#FFFFFF]">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-semibold mt-12 mb-6 leading-tight scroll-mt-20 text-[#111827] dark:text-[#FFFFFF]">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-semibold mt-10 mb-4 leading-tight scroll-mt-16 text-[#111827] dark:text-[#FFFFFF]">
        {children}
      </h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="text-lg text-zinc-600 dark:text-zinc-400 italic leading-relaxed border-l-4 border-emerald-500 pl-6 my-6">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-zinc-900 dark:text-zinc-100 underline decoration-zinc-300 dark:decoration-zinc-600 underline-offset-2 hover:decoration-zinc-500 dark:hover:decoration-zinc-400 transition-colors"
      >
        {children}
      </a>
    ),
    strong: ({ children }: any) => (
      <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
        {children}
      </strong>
    ),
    em: ({ children }: any) => (
      <em className="italic text-[#374151] dark:text-[#D1D5DA]">
        {children}
      </em>
    ),
    code: ({ children }: any) => (
      <code className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-sm font-mono text-zinc-800 dark:text-zinc-200">
        {children}
      </code>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="my-6 space-y-3 list-none">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="my-6 space-y-3 list-decimal list-inside">
        {children}
      </ol>
    ),
  },
  listItem: ({ children }: any) => (
    <li className="text-lg leading-relaxed flex items-start gap-3 text-[#374151] dark:text-[#D1D5DA]">
      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2.5 flex-shrink-0"></span>
      <span>{children}</span>
    </li>
  ),
}

// Helper function to get final font size
const getFinalFontSize = (fontSize: string, customFontSize?: number) => {
  if (fontSize === 'custom' && customFontSize) {
    return `${customFontSize}px`
  }
  return fontSize
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    
    const post: Post = await safeFetch(`
      *[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        hook {
          text,
          letterSpacing,
          lineHeight,
          fontSize,
          customFontSize
        },
        introduction {
          headline,
          text,
          letterSpacing,
          lineHeight,
          fontSize,
          customFontSize
        },
        mainBody {
          content,
          letterSpacing,
          lineHeight,
          fontSize,
          customFontSize
        },
        conclusion {
          text,
          letterSpacing,
          lineHeight,
          fontSize,
          customFontSize
        },
        publishedAt,
        coverImage {
          asset,
          alt
        },
        categories,
        technologies,
        author {
          name,
          avatar {
            asset
          },
          bio {
            text,
            letterSpacing,
            lineHeight,
            fontSize,
            customFontSize
          },
          website,
          socialLinks {
            twitter,
            linkedin,
            github
          }
        },
        callToAction {
          title,
          description {
            text,
            letterSpacing,
            lineHeight,
            fontSize,
            customFontSize
          },
          buttonText,
          buttonUrl,
          buttonStyle
        }
      }
    `, null, { slug })
    
    if (!post) {
      notFound()
    }

    // Debug: Log author data to console
    console.log('Post author data:', post.author);
    console.log('Author avatar data:', post.author?.avatar);

    // Calculate reading time (rough estimate: 200 words per minute)
    const wordCount = post.mainBody?.content?.reduce((count: number, block: any) => {
      if (block._type === 'block' && block.children) {
        return count + block.children.reduce((blockCount: number, child: any) => {
          return blockCount + (child.text?.split(' ').length || 0)
        }, 0)
      }
      return count
    }, 0) || 0
    const readingTime = Math.ceil(wordCount / 200)

    return (
      <>
        <main className="min-h-screen bg-white dark:bg-zinc-900">
          {/* Hero Section - KEEPING UNTOUCHED AS REQUESTED */}
          <section className="relative w-full min-h-[65vh]">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[65vh]">
              {/* Left Side - Image */}
              {post.coverImage && (
                <div className="relative lg:block hidden">
                  <Image
                    src={urlForImage(post.coverImage).url()}
                    alt={post.coverImage.alt || post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/10"></div>
                </div>
              )}

              {/* Right Side - Background Card */}
              <div className="absolute inset-0 left-[49%] bg-[#069668] dark:bg-[#064E3B]"></div>
              
              {/* Right Side - Black Card (Smaller) */}
              <div className="absolute right-20 top-1/2 transform -translate-y-1/2 w-1/2 h-[55%] bg-[#069668]/100 dark:bg-[#064E3B]/100 backdrop-blur-sm"></div>
              
              {/* Right Side - Content */}
              <div className="relative z-10 flex items-center px-6 lg:px-8 py-20">
                <div className="w-full max-w-2xl -ml-12">
                  <div className="space-y-6">
                      {post.categories && post.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {post.categories.map((category, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm rounded-full border border-zinc-200 dark:border-zinc-700"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {post.technologies && post.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {post.technologies.map((technology, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-emerald-100 dark:bg-emerald-800/30 text-emerald-700 dark:text-emerald-300 text-sm rounded-full border border-emerald-200 dark:border-emerald-700"
                            >
                              {technology}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <h1 className="text-3xl md:text-5xl lg:text-6xl font-inter text-white dark:text-[#34D399] leading-tight" style={{ 
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: '700',
                        fontSize: '48px',
                        letterSpacing: '-1.2px',
                        lineHeight: '48px'
                      }}>
                        {post.title}
                      </h1>
                      
                      <div className="flex flex-wrap items-center gap-6">
                        <time 
                          dateTime={post.publishedAt}
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: '400',
                            fontSize: '14px',
                            letterSpacing: '0px',
                            lineHeight: '20px'
                          }}
                          className="dark:text-[#11B981] text-[#A7F3D0]"
                        >
                          {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
                        </time>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </section>

          {/* NEW REDESIGNED CONTENT SECTION - JINESH INSPIRED */}
          <section className="py-16 w-full bg-white dark:bg-zinc-900">
            {/* Hook Section - Clean & Simple */}
            {post.hook && (
              <div className="w-full py-16 mb-20">
                <div className="w-full px-8 lg:px-16 xl:px-24">
                  <div className="max-w-5xl mx-auto">
                    <div className="text-center">
                      <div 
                        className="text-2xl md:text-3xl lg:text-4xl font-light text-zinc-800 dark:text-zinc-200 leading-relaxed max-w-4xl mx-auto"
                        style={{
                          letterSpacing: post.hook.letterSpacing,
                          lineHeight: post.hook.lineHeight,
                          fontSize: getFinalFontSize(post.hook.fontSize, post.hook.customFontSize),
                        }}
                      >
                        &ldquo;{post.hook.text}&rdquo;
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Main Content - Clean Layout */}
            <div className="w-full px-8 lg:px-16 xl:px-24">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
                  {/* Main Content */}
                  <article className="lg:col-span-3">
                    {/* Introduction */}
                    {post.introduction && (
                      <div className="mb-16">
                        <h2 className="text-3xl font-bold mb-8 leading-tight text-[#111827] dark:text-[#FFFFFF]">
                          {post.introduction.headline || 'Introduction'}
                        </h2>
                        <div 
                          className="text-lg leading-relaxed max-w-4xl text-[#374151] dark:text-[#D1D5DA]"
                          style={{
                            letterSpacing: post.introduction.letterSpacing,
                            lineHeight: post.introduction.lineHeight,
                            fontSize: getFinalFontSize(post.introduction.fontSize, post.introduction.customFontSize)
                          }}
                        >
                          {post.introduction.text}
                        </div>
                      </div>
                    )}

                    {/* Main Body Content - Clean Design */}
                    {post.mainBody && (
                      <div className="mb-16">
                        <div
                          className="prose prose-lg max-w-4xl prose-zinc dark:prose-invert prose-headings:font-bold prose-p:text-lg prose-p:leading-relaxed prose-p:tracking-wide text-lg"
                          style={{
                            letterSpacing: post.mainBody.letterSpacing,
                            lineHeight: post.mainBody.lineHeight,
                          }}
                        >
                          <PortableText
                            value={post.mainBody.content}
                            components={portableTextComponents}
                          />
                        </div>
                      </div>
                    )}

                                         {/* Conclusion - Enhanced Design */}
                     {post.conclusion && (
                       <div className="mb-16">
                         <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-8 max-w-4xl">
                           <h2 className="text-3xl font-bold mb-6 leading-tight text-[#111827] dark:text-[#FFFFFF]">
                             Conclusion
                           </h2>
                           <div 
                             className="text-lg leading-relaxed text-[#374151] dark:text-[#D1D5DA]"
                             style={{
                               letterSpacing: post.conclusion.letterSpacing,
                               lineHeight: post.conclusion.lineHeight,
                               fontSize: getFinalFontSize(post.conclusion.fontSize, post.conclusion.customFontSize)
                             }}
                           >
                             {post.conclusion.text}
                           </div>
                         </div>
                       </div>
                     )}

                    {/* Call to Action - Clean Design */}
                    {post.callToAction && (
                      <div className="mb-16">
                        <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-8 max-w-4xl">
                          <h3 className="text-2xl font-bold mb-4 text-[#111827] dark:text-[#FFFFFF]">
                            {post.callToAction.title}
                          </h3>
                          <div 
                            className="text-lg mb-6 leading-relaxed text-[#374151] dark:text-[#D1D5DA]"
                            style={{
                              letterSpacing: post.callToAction.description.letterSpacing,
                              lineHeight: post.callToAction.description.lineHeight,
                              fontSize: getFinalFontSize(post.callToAction.description.fontSize, post.callToAction.description.customFontSize)
                            }}
                            dangerouslySetInnerHTML={{
                              __html: post.callToAction.description.text.replace(/\n/g, '<br />')
                            }}
                          />
                          <a
                            href={post.callToAction.buttonUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium rounded-lg transition-colors hover:bg-zinc-800 dark:hover:bg-zinc-200"
                          >
                            {post.callToAction.buttonText}
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    )}
                  </article>

                  {/* Sidebar - Clean Design */}
                  <aside className="lg:col-span-1">
                    <div className="sticky top-8 space-y-8 pl-8">
                      {/* Reading Stats */}
                      <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-8 min-w-[280px]">
                        <h3 className="text-xl font-semibold mb-6 text-[#111827] dark:text-[#FFFFFF]">Reading Stats</h3>
                        <div className="space-y-4">
                          <div className="flex items-center gap-4 text-zinc-600 dark:text-zinc-400">
                            <Clock className="w-5 h-5" />
                            <span className="text-base">{readingTime} min read</span>
                          </div>
                          <div className="flex items-center gap-4 text-zinc-600 dark:text-zinc-400">
                            <Calendar className="w-5 h-5" />
                            <span className="text-base">{format(new Date(post.publishedAt), 'MMM d, yyyy')}</span>
                          </div>
                          <div className="flex items-center gap-4 text-zinc-600 dark:text-zinc-400">
                            <Users className="w-5 h-5" />
                            <span className="text-base">{wordCount} words</span>
                          </div>
                        </div>
                      </div>


                      


                      {/* Author Info */}
                      {post.author && (
                        <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-8 min-w-[280px]">
                          <h3 className="text-xl font-semibold mb-6 text-center text-[#111827] dark:text-[#FFFFFF]">About the author</h3>
                          <div className="text-center">
                            {post.author.avatar && post.author.avatar.asset && post.author.avatar.asset._ref && (
                              <div className="mb-6">
                                <div className="relative w-20 h-20 mx-auto">
                                  <Image
                                    src={urlForImage(post.author.avatar).url()}
                                    alt={post.author.name}
                                    fill
                                    className="rounded-full object-cover"
                                  />
                                </div>
                              </div>
                            )}
                            {/* Fallback avatar if no image is provided */}
                            {(!post.author.avatar || !post.author.avatar.asset || !post.author.avatar.asset._ref) && (
                              <div className="mb-6">
                                <div className="relative w-20 h-20 mx-auto">
                                  <div className="w-full h-full rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold text-2xl">
                                    {post.author.name.charAt(0).toUpperCase()}
                                  </div>
                                </div>
                              </div>
                            )}
                            <h4 className="font-semibold mb-3 text-lg text-[#111827] dark:text-[#FFFFFF]">
                              {post.author.name}
                            </h4>
                            {post.author.bio && (
                              <div 
                                className="text-sm leading-relaxed mb-6 text-[#374151] dark:text-[#D1D5DA]"
                                style={{
                                  letterSpacing: post.author.bio.letterSpacing,
                                  lineHeight: post.author.bio.lineHeight,
                                  fontSize: getFinalFontSize(post.author.bio.fontSize, post.author.bio.customFontSize)
                                }}
                              >
                                {post.author.bio.text}
                              </div>
                            )}
                            
                            {/* Social Links */}
                            {post.author.website && (
                              <div className="flex items-center justify-center gap-3">
                                <a
                                  href={post.author.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-3 bg-white dark:bg-zinc-700 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-600 transition-colors"
                                  title="Website"
                                >
                                  <ExternalLink className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      )}


                    </div>
                  </aside>
                </div>
              </div>
            </div>
          </section>
        </main>
      </>
    )
  } catch (error) {
    console.error('Error fetching blog post:', error)
    notFound()
  }
}