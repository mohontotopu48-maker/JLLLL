'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Home,
  Building2,
  Ship,
  Car,
  Camera,
  ChevronDown,
  Upload,
  ArrowRight,
  ArrowLeft,
  X,
  Menu,
  Phone,
  Mail,
  MapPin,
  Award,
  Shield,
  Clock,
  Send,
  Crosshair,
  Timer,
  BadgeDollarSign,
  HeartHandshake,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast'

/* ──────────────────────────────── helpers ──────────────────────────────── */

function FadeInSection({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function calculateLeadScore(projectType: string, serviceType: string): number {
  const projectScores: Record<string, number> = {
    'luxury-home': 85,
    commercial: 90,
    marine: 75,
    'classic-auto': 80,
  }
  const serviceScores: Record<string, number> = {
    'full-reupholstery': 90,
    'custom-build': 95,
    repair: 60,
  }
  const p = projectScores[projectType] || 50
  const s = serviceScores[serviceType] || 50
  return Math.round(p * 0.4 + s * 0.6)
}

/* ──────────────────────────────── NAV ──────────────────────────────── */

function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Craft', href: '#craft' },
    { label: 'Services', href: '#services' },
    { label: 'Estimate', href: '#estimate' },
    { label: 'Portal', href: '#portal' },
  ]

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-obsidian/95 backdrop-blur-md' : 'bg-obsidian'
      }`}
    >
      {/* Three-zone layout — flex on mobile, grid on desktop */}
      <div className="mx-auto flex h-16 w-full items-center justify-between px-6 md:grid md:max-w-7xl md:grid-cols-3 md:px-4 lg:md:px-8">
        {/* Left Zone: Logo — flush left */}
        <a href="#" className="brand-logo-link gap-2 shrink-0 md:justify-self-start">
          <img
            src="/images/jl-logo.svg"
            alt="JL Custom Upholstery Logo"
            className="dove-svg h-10 w-auto"
          />
          <span className="text-champagne text-2xl font-black tracking-tight">
            JL
          </span>
          <span className="hidden text-sm font-light tracking-[0.3em] text-white sm:inline">
            CUSTOM UPHOLSTERY
          </span>
        </a>

        {/* Center Zone: Nav links — perfectly centered in viewport (desktop only) */}
        <div className="hidden items-center justify-center gap-8 md:flex md:justify-self-center">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-light tracking-wide text-white/70 transition-colors hover:text-champagne"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Right Zone: CTA button (desktop only) */}
        <div className="hidden md:flex md:justify-self-end">
          <a href="#estimate">
            <Button
              className="bg-champagne text-obsidian h-9 rounded-none px-6 text-sm font-semibold tracking-wide hover:bg-champagne-light"
            >
              Get Estimate
            </Button>
          </a>
        </div>

        {/* Mobile hamburger — flush right */}
        <div className="md:hidden shrink-0 ml-auto pl-4">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 rounded-none"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-obsidian border-white/10 rounded-none w-72"
            >
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-left">
                  <img
                    src="/images/jl-logo.svg"
                    alt="JL Logo"
                    className="h-8 w-auto"
                  />
                  <span className="text-champagne text-lg font-black">
                    JL <span className="text-white font-light tracking-[0.2em] text-sm">CUSTOM UPHOLSTERY</span>
                  </span>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 pt-8">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-lg font-light tracking-wide text-white/80 transition-colors hover:text-champagne"
                  >
                    {l.label}
                  </a>
                ))}
                <Separator className="bg-white/10" />
                <a href="#estimate" onClick={() => setMobileOpen(false)}>
                  <Button className="bg-champagne text-obsidian w-full rounded-none text-sm font-semibold tracking-wide hover:bg-champagne-light">
                    Get Estimate
                  </Button>
                </a>
              </div>
              <SheetClose className="sr-only" />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  )
}

/* ──────────────────────────────── HERO ──────────────────────────────── */

function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-obsidian">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-workshop.png')" }}
      />
      <div className="absolute inset-0 bg-obsidian/70" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-16 text-center sm:px-6 md:px-8 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-black tracking-tight text-white"
          style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)' }}
        >
          PRECISION
          <br />
          CRAFTSMANSHIP
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-xl font-light tracking-wide text-champagne md:text-2xl"
        >
          Grounded in Integrity
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-4 max-w-[90%] text-sm font-light leading-relaxed text-white/70 md:text-base md:max-w-2xl px-6 md:px-0"
        >
          Orange County&apos;s premier upholstery atelier. 25+ years. A new expanded facility.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-center justify-center sm:flex-row sm:gap-4"
        >
          <a href="#estimate" className="w-full max-w-[320px] sm:w-auto">
            <Button className="bg-champagne text-obsidian h-12 rounded-none w-full sm:w-auto px-8 text-sm font-semibold tracking-wide hover:bg-champagne-light">
              Start Visual Quote <Camera className="ml-2 h-4 w-4" />
            </Button>
          </a>
          <a href="#craft" className="w-full max-w-[320px] sm:w-auto mt-3 sm:mt-0">
            <Button
              variant="outline"
              className="h-12 rounded-none border border-white w-full sm:w-auto px-8 text-sm font-light tracking-wide text-white bg-transparent hover:bg-white/10 hover:text-white transition-colors duration-200 shadow-none"
            >
              View Our Craft →
            </Button>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-6 w-6 text-champagne/60" />
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ──────────────────────────────── CORE PILLARS + HERITAGE ──────────────────────────────── */

const corePillars = [
  {
    icon: Crosshair,
    title: 'Precision Craftsmanship',
    body: 'Our quality, stitch lines, and structural restoration standards are executed with absolute seriousness.',
  },
  {
    icon: Timer,
    title: 'Dedicated Timelines',
    body: 'We value your schedule and are committed to delivering master-level completions on time.',
  },
  {
    icon: BadgeDollarSign,
    title: 'Transparent Value',
    body: 'We offer highly competitive, upfront pricing without ever compromising on elite material grades.',
  },
  {
    icon: HeartHandshake,
    title: 'Client-First Philosophy',
    body: 'We treat every heirloom, vehicle, and commercial project with dedicated care and personal focus.',
  },
]

function MissionSection() {
  return (
    <section id="craft" className="py-24 md:py-32" style={{ background: '#111111' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <FadeInSection>
          <div className="text-center">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase" style={{ color: '#C5A880' }}>
              Our Foundation
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-5xl">
              THE JL STANDARD
            </h2>
            <p className="mt-3 text-sm font-light tracking-wide text-white/40">
              Four pillars. One unwavering commitment.
            </p>
          </div>
        </FadeInSection>

        {/* 4-column pillar grid */}
        <FadeInSection delay={0.15}>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-6">
            {corePillars.map((pillar, i) => {
              const Icon = pillar.icon
              return (
                <div
                  key={pillar.title}
                  className="flex flex-col items-center text-center"
                  style={{
                    padding: '32px 20px',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    background: 'rgba(255, 255, 255, 0.02)',
                  }}
                >
                  <Icon
                    className="h-7 w-7 stroke-[1]"
                    style={{ color: '#C5A880' }}
                  />
                  <h3
                    className="mt-5 text-sm font-bold tracking-[0.08em] uppercase"
                    style={{ color: '#C5A880' }}
                  >
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-[13px] font-light leading-relaxed text-white/60">
                    {pillar.body}
                  </p>
                </div>
              )
            })}
          </div>
        </FadeInSection>

        {/* Heritage origin snippet — The Fullerton Connection */}
        <FadeInSection delay={0.25}>
          <div className="mt-20 md:mt-24">
            <div
              className="mx-auto max-w-3xl text-center"
              style={{
                padding: '40px 32px',
                borderTop: '1px solid rgba(197, 168, 128, 0.15)',
                borderBottom: '1px solid rgba(197, 168, 128, 0.15)',
              }}
            >
              <p
                className="text-xs font-semibold tracking-[0.25em] uppercase"
                style={{ color: '#C5A880' }}
              >
                The Fullerton Connection
              </p>
              <h3 className="mt-4 text-2xl font-black tracking-tight text-white md:text-3xl">
                Our Origin
              </h3>
              <p className="mt-5 text-sm font-light leading-[1.85] text-white/60 md:text-base">
                Located on the Anaheim-Fullerton border, JL Custom Upholstery delivers precision craftsmanship built on decades of local heritage. Our doors first opened just across the street in Fullerton; today, we operate a premier Orange County workshop specializing in large-scale transformations for classic cars, luxury marine vessels, custom RVs, and high-end residential spaces.
              </p>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}

/* ──────────────────────────────── SPECIALIST TABS ──────────────────────────────── */

const specialistData = [
  {
    id: 'classic-auto',
    label: 'Classic Auto',
    image: '/images/classic-auto.png',
    title: 'Classic Auto Interior Restoration',
    description:
      'Every classic car deserves an interior that honors its heritage. Our craftsmen specialize in period-correct materials, hand-stitched detailing, and factory-spec restoration — from concours-quality leather to intricate piping and double stitching that matches the original artisan intent.',
  },
  {
    id: 'commercial',
    label: 'Commercial',
    image: '/images/commercial-booth.png',
    title: 'Commercial & Hospitality Seating',
    description:
      'High-traffic environments demand commercial-grade durability without sacrificing design. From restaurant booths and bar seating to hospitality lounges and corporate spaces, we engineer seating solutions that withstand thousands of hours of use while maintaining their form and elegance.',
  },
  {
    id: 'marine',
    label: 'Marine',
    image: '/images/marine-seating.png',
    title: 'Marine & RV Seating',
    description:
      'Salt, sun, and constant motion require materials and techniques built for extremes. Our marine upholstery specialists work with UV-resistant marine vinyl, closed-cell foam, and corrosion-resistant fasteners — delivering seating that performs as beautifully as it looks, season after season.',
  },
]

function SpecialistSection() {
  const [activeTab, setActiveTab] = useState('classic-auto')
  const active = specialistData.find((s) => s.id === activeTab)!

  return (
    <section id="services" className="bg-obsidian py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <div className="text-center">
            <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">
              THE SPECIALISTS
            </h2>
            <p className="mt-3 text-sm font-light tracking-wide text-white/50">
              Three disciplines. One standard.
            </p>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.15}>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="mt-12"
          >
            <TabsList className="mx-auto flex w-fit rounded-none bg-transparent p-0">
              {specialistData.map((s) => (
                <TabsTrigger
                  key={s.id}
                  value={s.id}
                  className="relative rounded-none bg-transparent px-6 py-3 text-sm font-light tracking-wide text-white/60 transition-colors data-[state=active]:text-white data-[state=active]:bg-transparent data-[state=active]:shadow-none hover:text-white/90 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-champagne after:scale-x-0 after:transition-transform data-[state=active]:after:scale-x-100"
                >
                  {s.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="mt-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center gap-10 lg:flex-row lg:items-start"
                >
                  {/* Image */}
                  <div className="w-full lg:w-1/2">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={active.image}
                        alt={active.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="w-full lg:w-1/2 lg:pt-4">
                    <h3 className="text-2xl font-bold text-white md:text-3xl">
                      {active.title}
                    </h3>
                    <p className="mt-4 text-sm font-light leading-relaxed text-white/70 md:text-base">
                      {active.description}
                    </p>
                    <a href="#estimate">
                      <Button className="mt-8 bg-champagne text-obsidian h-11 rounded-none px-6 text-sm font-semibold tracking-wide hover:bg-champagne-light">
                        Request Consultation <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Hidden TabsContent to satisfy Radix requirement */}
            {specialistData.map((s) => (
              <TabsContent key={s.id} value={s.id} className="hidden" />
            ))}
          </Tabs>
        </FadeInSection>
      </div>
    </section>
  )
}

/* ──────────────────────────────── VIDEO SHOWCASE ──────────────────────────────── */

function VideoShowcase() {
  return (
    <section className="bg-obsidian py-24 md:py-32">
      <div className="jl-video-vertical-stack">
        {/* Video 1 — Marine */}
        <FadeInSection>
          <div className="jl-video-item">
            <div className="jl-video-header">
              <h3 className="jl-video-item-title">I. Marine Restoration Architecture</h3>
              <p className="jl-video-item-subtitle">
                A deep-dive look at our comprehensive multi-stage rebuilding process for high-end marine seating and open-water canvas environments.
              </p>
            </div>
            <div className="jl-video-container">
              <iframe
                src="https://www.youtube.com/embed/dM724CSqIC0?rel=0&modestbranding=1"
                title="Marine Showcase"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </FadeInSection>

        {/* Video 2 — Auto & Custom */}
        <FadeInSection delay={0.15}>
          <div className="jl-video-item">
            <div className="jl-video-header">
              <h3 className="jl-video-item-title">II. Precision Auto &amp; Interior Craftsmanship</h3>
              <p className="jl-video-item-subtitle">
                Showcasing structural frame sculpting, premium leather hide selection, and intricate double-stitch piping lines for custom automotive and specialty assets.
              </p>
            </div>
            <div className="jl-video-container">
              <iframe
                src="https://www.youtube.com/embed/2SzwcFDyR_I?rel=0&modestbranding=1"
                title="Auto and Interior Showcase"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}

/* ──────────────────────────────── LEAD WIZARD ──────────────────────────────── */

const projectTypes = [
  {
    id: 'luxury-home',
    label: 'Home',
    icon: Home,
    items: ['Custom Sofas & Sectionals', 'Dining & Accent Chairs', 'Antique & Heirloom Restoration', 'Indoor/Outdoor Cushions'],
  },
  {
    id: 'commercial',
    label: 'Commercial',
    icon: Building2,
    items: ['Restaurant Booths & Banquettes', 'Office & Executive Seating', 'Lounge & Hospitality Furniture', 'Medical & Clinic Tables'],
  },
  {
    id: 'marine',
    label: 'Marine & RV',
    icon: Ship,
    items: ['Yacht & Boat Enclosures', 'Exterior Marine Cushions', 'Custom RV Interiors', "Captain's Chairs"],
  },
  {
    id: 'classic-auto',
    label: 'Auto',
    icon: Car,
    items: ['Complete Interior Restorations', 'Leather Seat Upgrades', 'Convertible Tops & Headliners', 'Door Panels & Carpeting'],
  },
]

const serviceTypes = [
  { id: 'full-reupholstery', label: 'Full Reupholstery' },
  { id: 'custom-build', label: 'Custom Build' },
  { id: 'repair', label: 'Repair' },
]

function LeadWizard() {
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [projectType, setProjectType] = useState('')
  const [serviceType, setServiceType] = useState('')
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [photoBase64, setPhotoBase64] = useState<string | null>(null)
  const [contactName, setContactName] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const leadScore = calculateLeadScore(projectType, serviceType)

  const canContinue = () => {
    if (step === 1) return !!projectType
    if (step === 2) return !!serviceType
    if (step === 3) return true // photo is optional
    if (step === 4) return !!contactName && !!contactPhone && !!contactEmail
    return false
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      const result = reader.result as string
      setPhotoPreview(result)
      setPhotoBase64(result.split(',')[1] || '')
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async () => {
    if (!canContinue()) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          phone: contactPhone,
          projectType,
          serviceType,
          photos: photoBase64 ? [photoBase64] : [],
          source: 'website',
        }),
      })
      if (!res.ok) throw new Error('Submission failed')
      toast({
        title: 'Estimate Request Submitted',
        description:
          'Thank you. Our team will review your request and respond within 24 hours.',
      })
      // Reset form
      setStep(1)
      setProjectType('')
      setServiceType('')
      setPhotoPreview(null)
      setPhotoBase64(null)
      setContactName('')
      setContactPhone('')
      setContactEmail('')
    } catch {
      toast({
        title: 'Submission Failed',
        description:
          'There was an error submitting your request. Please try again or call us directly.',
        variant: 'destructive',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="estimate" className="bg-obsidian py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">
              INSTANT PHOTO ESTIMATE
            </h2>
            <p className="mt-3 text-sm font-light tracking-wide text-white/50">
              Four steps. Sixty seconds. A precision estimate.
            </p>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.15}>
          {/* Glassmorphism card container */}
          <div
            className="mt-12 p-8 md:p-[60px_40px]"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '0px',
              maxWidth: '900px',
              margin: '40px auto',
            }}
          >
            {/* Progress bar */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-2">
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className="flex items-center">
                    <div
                      className={`flex h-8 w-8 items-center justify-center text-xs font-bold transition-colors ${
                        s <= step
                          ? 'bg-champagne text-obsidian'
                          : 'bg-white/10 text-white/40'
                      }`}
                    >
                      {s}
                    </div>
                    {s < 4 && (
                      <div
                        className={`h-[2px] w-12 sm:w-20 md:w-24 transition-colors ${
                          s < step ? 'bg-champagne' : 'bg-white/10'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <Progress
                value={(step / 4) * 100}
                className="h-1 rounded-none bg-white/10 [&>div]:bg-champagne"
              />
            </div>

            {/* Step content */}
            <AnimatePresence mode="wait">
              {/* Step 1: Project Type */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-semibold text-white">
                    What type of project?
                  </h3>
                  <p className="mt-1 text-sm font-light text-white/50">
                    Select the category that best describes your project.
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    {projectTypes.map((pt) => {
                      const Icon = pt.icon
                      const selected = projectType === pt.id
                      const isExpanded = expandedCard === pt.id
                      return (
                        <div
                          key={pt.id}
                          style={{
                            background: selected ? 'rgba(197, 168, 128, 0.06)' : '#111111',
                            border: selected
                              ? '1px solid #C5A880'
                              : '1px solid rgba(255, 255, 255, 0.08)',
                            padding: '32px 24px',
                            transition: 'border-color 0.15s ease',
                            cursor: 'pointer',
                          }}
                          onMouseEnter={(e) => {
                            setExpandedCard(pt.id)
                            if (!selected) e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)'
                          }}
                          onMouseLeave={(e) => {
                            setExpandedCard(null)
                            if (!selected) e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'
                          }}
                          onClick={() => setProjectType(pt.id)}
                          className="flex flex-col items-center justify-center gap-3"
                        >
                          <Icon
                            className={`h-7 w-7 stroke-[1.2] ${
                              selected ? 'text-champagne' : 'text-white/60'
                            }`}
                          />
                          <span
                            className={`flex items-center gap-1 text-xs font-medium tracking-wide ${
                              selected ? 'text-champagne' : 'text-white/60'
                            }`}
                          >
                            {pt.label}
                            <ChevronDown
                              className={`h-3 w-3 transition-transform duration-300 ${
                                isExpanded ? 'rotate-180' : 'rotate-0'
                              }`}
                              style={{ strokeWidth: 1.5 }}
                            />
                          </span>
                          {/* Disclosure dropdown */}
                          <div
                            style={{
                              maxHeight: isExpanded ? '200px' : '0px',
                              opacity: isExpanded ? 1 : 0,
                              overflow: 'hidden',
                              transition: 'max-height 0.4s ease-in-out, opacity 0.3s ease',
                              background: 'transparent',
                              paddingTop: isExpanded ? '16px' : '0px',
                              textAlign: 'left',
                              width: '100%',
                            }}
                          >
                            <ul>
                              {pt.items.map((item) => (
                                <li
                                  key={item}
                                  className="text-white/60 hover:text-white transition-colors duration-150"
                                  style={{
                                    fontSize: '13px',
                                    fontWeight: 400,
                                    lineHeight: 1.8,
                                  }}
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Service Selection */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-semibold text-white">
                    What service do you need?
                  </h3>
                  <p className="mt-1 text-sm font-light text-white/50">
                    Choose the service type for your project.
                  </p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    {serviceTypes.map((st) => {
                      const selected = serviceType === st.id
                      return (
                        <button
                          key={st.id}
                          type="button"
                          onClick={() => setServiceType(st.id)}
                          style={{
                            background: selected ? '#C5A880' : '#111111',
                            border: selected
                              ? '1px solid #C5A880'
                              : '1px solid rgba(255, 255, 255, 0.08)',
                            padding: '12px 24px',
                            transition: 'border-color 0.15s ease, background 0.15s ease',
                          }}
                          onMouseEnter={(e) => {
                            if (!selected) e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)'
                          }}
                          onMouseLeave={(e) => {
                            if (!selected) e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'
                          }}
                          className={`text-sm font-medium tracking-wide ${
                            selected ? 'text-obsidian' : 'text-white/60'
                          }`}
                        >
                          {st.label}
                        </button>
                      )
                    })}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Photo Upload */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-semibold text-white">
                    Upload a photo of your piece
                  </h3>
                  <p className="mt-1 text-sm font-light text-white/50">
                    A photo helps us provide a more accurate estimate. This step
                    is optional.
                  </p>
                  <div className="mt-6">
                    {photoPreview ? (
                      <div className="relative inline-block">
                        <img
                          src={photoPreview}
                          alt="Uploaded preview"
                          className="h-48 w-auto border border-white/10 object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setPhotoPreview(null)
                            setPhotoBase64(null)
                          }}
                          className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center bg-obsidian text-white"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ) : (
                      <label
                        htmlFor="photo-upload"
                        className="flex min-h-[200px] cursor-pointer flex-col items-center justify-center gap-4 border border-dashed bg-[#111111] transition-colors hover:border-champagne/50 hover:bg-champagne/5"
                        style={{ borderColor: 'rgba(255, 255, 255, 0.12)' }}
                      >
                        <Camera className="h-10 w-10 text-white/30" />
                        <div className="text-center">
                          <p className="text-sm font-medium text-white/60">
                            Upload a Photo of Your Piece
                          </p>
                          <p className="mt-1 text-xs font-light text-white/40 md:hidden">
                            Tap to snap a photo now for a precision estimate.
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-white/40">
                          <Upload className="h-3 w-3" />
                          <span>Click or drag to upload</span>
                        </div>
                        <input
                          id="photo-upload"
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </label>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Step 4: Contact */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">
                      Your contact information
                    </h3>
                    {leadScore > 0 && (
                      <Badge
                        variant="outline"
                        className="border-champagne/30 text-champagne rounded-none text-xs"
                      >
                        Lead Score: {leadScore}
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 text-sm font-light text-white/50">
                    We&apos;ll respond with your estimate within 24 hours.
                  </p>
                  <div className="mt-6 space-y-4">
                    <div>
                      <Label
                        htmlFor="lead-name"
                        className="text-xs font-medium tracking-wide text-white/60 uppercase"
                      >
                        Name
                      </Label>
                      <Input
                        id="lead-name"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Your full name"
                        className="mt-1 rounded-none border-white/10 bg-[#111111] text-white placeholder:text-white/25 focus-visible:ring-champagne"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="lead-phone"
                        className="text-xs font-medium tracking-wide text-white/60 uppercase"
                      >
                        Phone
                      </Label>
                      <Input
                        id="lead-phone"
                        type="tel"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="(555) 000-0000"
                        className="mt-1 rounded-none border-white/10 bg-[#111111] text-white placeholder:text-white/25 focus-visible:ring-champagne"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="lead-email"
                        className="text-xs font-medium tracking-wide text-white/60 uppercase"
                      >
                        Email
                      </Label>
                      <Input
                        id="lead-email"
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="mt-1 rounded-none border-white/10 bg-[#111111] text-white placeholder:text-white/25 focus-visible:ring-champagne"
                      />
                    </div>
                  </div>
                  <p className="mt-4 text-xs font-light text-white/30">
                    Your information is never shared. Period.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="mt-8 flex items-center justify-between">
              {step > 1 ? (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep(step - 1)}
                  className="rounded-none text-white/60 hover:text-white"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <Button
                  type="button"
                  disabled={!canContinue()}
                  onClick={() => setStep(step + 1)}
                  className="bg-champagne text-obsidian rounded-none px-6 font-semibold hover:bg-champagne-light disabled:opacity-40"
                >
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  disabled={!canContinue() || submitting}
                  onClick={handleSubmit}
                  className="bg-champagne text-obsidian rounded-none px-6 font-semibold hover:bg-champagne-light disabled:opacity-40"
                >
                  {submitting ? 'Submitting...' : 'Submit Estimate Request'}
                </Button>
              )}
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}

/* ──────────────────────────────── DESIGNER PORTAL ──────────────────────────────── */

function DesignerPortalSection() {
  const { toast } = useToast()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    portfolio: '',
    message: '',
  })

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.company) {
      toast({
        title: 'Missing Fields',
        description: 'Name, email, and company are required.',
        variant: 'destructive',
      })
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/designer-portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed')
      toast({
        title: 'Access Request Submitted',
        description:
          'Our team will review your application and respond within 48 hours.',
      })
      setDialogOpen(false)
      setForm({
        name: '',
        email: '',
        company: '',
        phone: '',
        portfolio: '',
        message: '',
      })
    } catch {
      toast({
        title: 'Submission Failed',
        description: 'Please try again or contact us directly.',
        variant: 'destructive',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="portal" className="bg-slate-deep py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <div className="text-center">
            <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">
              THE DESIGNER PORTAL
            </h2>
            <p className="mt-3 text-sm font-light tracking-wide text-champagne md:text-base">
              For the trade. By invitation.
            </p>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.15}>
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm font-light leading-relaxed text-white/60 md:text-base">
            Interior designers trust JL with their most demanding projects.
            Access dedicated work-order submissions, priority scheduling, and
            fabric consultation.
          </p>
        </FadeInSection>

        <FadeInSection delay={0.25}>
          <div className="mt-10 flex flex-col items-center justify-center sm:flex-row sm:gap-4">
              <a className="w-full max-w-[320px] sm:w-auto">
                <Button
                  onClick={() => setDialogOpen(true)}
                  className="bg-champagne text-obsidian h-12 rounded-none w-full sm:w-auto px-8 text-sm font-semibold tracking-wide hover:bg-champagne-light"
                >
                  Request Access
                </Button>
              </a>
              <a className="w-full max-w-[320px] sm:w-auto mt-3 sm:mt-0">
                <Button
                  variant="outline"
                  className="h-12 rounded-none border border-white w-full sm:w-auto px-8 text-sm font-light tracking-wide text-white bg-transparent hover:bg-white/10 hover:text-white transition-colors duration-200 shadow-none"
                >
                  Member Log In →
                </Button>
              </a>
            </div>
        </FadeInSection>

        <FadeInSection delay={0.35}>
          <p className="mt-8 text-center text-xs font-light tracking-wide text-white/30">
            Current designer partners: 40+ Orange County design firms
          </p>
        </FadeInSection>

        {/* Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="bg-slate-deep border-white/10 rounded-none sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-white text-lg font-bold">
                Designer Portal Access
              </DialogTitle>
              <DialogDescription className="text-white/50 text-sm font-light">
                Submit your information to request access to the JL Designer
                Portal.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 space-y-4">
              <div>
                <Label className="text-xs font-medium tracking-wide text-white/60 uppercase">
                  Name *
                </Label>
                <Input
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Your full name"
                  className="mt-1 rounded-none border-white/15 bg-obsidian text-white placeholder:text-white/30 focus-visible:ring-champagne"
                />
              </div>
              <div>
                <Label className="text-xs font-medium tracking-wide text-white/60 uppercase">
                  Email *
                </Label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="you@firm.com"
                  className="mt-1 rounded-none border-white/15 bg-obsidian text-white placeholder:text-white/30 focus-visible:ring-champagne"
                />
              </div>
              <div>
                <Label className="text-xs font-medium tracking-wide text-white/60 uppercase">
                  Company *
                </Label>
                <Input
                  value={form.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                  placeholder="Your design firm"
                  className="mt-1 rounded-none border-white/15 bg-obsidian text-white placeholder:text-white/30 focus-visible:ring-champagne"
                />
              </div>
              <div>
                <Label className="text-xs font-medium tracking-wide text-white/60 uppercase">
                  Phone
                </Label>
                <Input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="(555) 000-0000"
                  className="mt-1 rounded-none border-white/15 bg-obsidian text-white placeholder:text-white/30 focus-visible:ring-champagne"
                />
              </div>
              <div>
                <Label className="text-xs font-medium tracking-wide text-white/60 uppercase">
                  Portfolio URL
                </Label>
                <Input
                  value={form.portfolio}
                  onChange={(e) => handleChange('portfolio', e.target.value)}
                  placeholder="https://your-portfolio.com"
                  className="mt-1 rounded-none border-white/15 bg-obsidian text-white placeholder:text-white/30 focus-visible:ring-champagne"
                />
              </div>
              <div>
                <Label className="text-xs font-medium tracking-wide text-white/60 uppercase">
                  Message
                </Label>
                <Textarea
                  value={form.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="Tell us about your projects..."
                  rows={3}
                  className="mt-1 rounded-none border-white/15 bg-obsidian text-white placeholder:text-white/30 focus-visible:ring-champagne"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <Button
                variant="ghost"
                onClick={() => setDialogOpen(false)}
                className="rounded-none text-white/60 hover:text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={submitting}
                className="bg-champagne text-obsidian rounded-none px-6 font-semibold hover:bg-champagne-light disabled:opacity-40"
              >
                {submitting ? 'Submitting...' : 'Submit Request'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}

/* ──────────────────────────────── EXPERIENCE / FACILITY ──────────────────────────────── */

const capabilities = [
  {
    icon: Award,
    title: 'Premium Fabric Library',
    description: 'Access to 500+ premium textiles and leathers',
  },
  {
    icon: Shield,
    title: 'Dedicated Project Bays',
    description: 'Each project gets its own workspace and craftsman',
  },
  {
    icon: Clock,
    title: 'Quality Assurance',
    description: 'Every piece inspected before it leaves our workshop',
  },
]

function FacilitySection() {
  return (
    <section className="bg-stark py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <div className="relative overflow-hidden">
            <img
              src="/images/facility.png"
              alt="JL Custom Upholstery expanded facility"
              className="h-auto w-full object-cover"
            />
            <div className="absolute inset-0 bg-obsidian/50" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">
                A NEW EXPANDED FACILITY
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm font-light leading-relaxed text-white/80 md:text-base">
                Scale meets precision. Our 2024 expansion triples our capacity
                without compromising a single stitch.
              </p>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {capabilities.map((cap) => {
              const Icon = cap.icon
              return (
                <div
                  key={cap.title}
                  className="border border-obsidian/10 bg-white p-6 md:p-8"
                >
                  <Icon className="h-8 w-8 text-champagne" />
                  <h3 className="mt-4 text-base font-bold text-obsidian">
                    {cap.title}
                  </h3>
                  <p className="mt-2 text-sm font-light leading-relaxed text-obsidian/60">
                    {cap.description}
                  </p>
                </div>
              )
            })}
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}

/* ──────────────────────────────── FOOTER ──────────────────────────────── */



function Footer() {
  return (
    <footer className="bg-obsidian mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Col 1: Mission */}
          <div>
            <div className="flex items-center gap-2">
              <img
                src="/images/jl-logo.svg"
                alt="JL Custom Upholstery dove logo — custom upholstery, reupholstery, leather repair, and furniture restoration in Orange County"
                className="h-8 w-auto"
              />
              <span className="text-champagne text-2xl font-black tracking-tight">
                JL
              </span>
              <span className="text-sm font-light tracking-[0.3em] text-white">
                CUSTOM UPHOLSTERY
              </span>
            </div>
            <p className="mt-4 text-sm font-light leading-relaxed text-white/50">
              Grounded in Integrity. Precision in Craft.
            </p>
          </div>

          {/* Col 2: Studio — structured location block */}
          <div
            style={{
              background: '#111111',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '24px',
            }}
          >
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: '#C5A880' }}>
              Atelier
            </h4>
            <div className="mt-5 space-y-4">
              <div>
                <span className="block text-[11px] font-bold tracking-[0.15em] uppercase" style={{ color: '#C5A880' }}>
                  Address
                </span>
                <span className="mt-1 flex items-start gap-2 text-sm font-light text-white/80">
                  <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0 text-champagne/70" />
                  1112 E Raymond Way, Anaheim, CA 92801
                </span>
              </div>
              <div>
                <span className="block text-[11px] font-bold tracking-[0.15em] uppercase" style={{ color: '#C5A880' }}>
                  Phone
                </span>
                <span className="mt-1 flex items-center gap-2 text-sm font-light text-white/80">
                  <Phone className="h-3.5 w-3.5 shrink-0 text-champagne/70" />
                  (714) 805-4391
                </span>
              </div>
              <div>
                <span className="block text-[11px] font-bold tracking-[0.15em] uppercase" style={{ color: '#C5A880' }}>
                  Studio Hours
                </span>
                <span className="mt-1 flex items-center gap-2 text-sm font-light text-white/80">
                  <Clock className="h-3.5 w-3.5 shrink-0 text-champagne/70" />
                  Mon–Fri 8 AM – 5 PM
                </span>
              </div>
              <div>
                <span className="block text-[11px] font-bold tracking-[0.15em] uppercase" style={{ color: '#C5A880' }}>
                  Email
                </span>
                <span className="mt-1 flex items-center gap-2 text-sm font-light text-white/80">
                  <Mail className="h-3.5 w-3.5 shrink-0 text-champagne/70" />
                  info@jlcustomupholstery.com
                </span>
              </div>
            </div>
          </div>

          {/* Col 3: Socials + CTA */}
          <div className="md:text-right">
            <h4 className="text-xs font-medium tracking-[0.2em] text-white/40 uppercase">
              Connect
            </h4>
            <div className="jl-footer-socials">
              <a className="jl-social-link" href="https://facebook.com/jlcustomupholstery" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.8z"/></svg>
              </a>
              <a className="jl-social-link" href="https://instagram.com/jlcustomupholstery" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              </a>
              <a className="jl-social-link" href="https://yelp.com/biz/jl-custom-upholstery-anaheim" target="_blank" rel="noopener noreferrer" aria-label="Yelp">
                <svg viewBox="0 0 24 24"><path d="M12.2 12.9l3.2 4.5s.4.5.1.8c-.3.3-.8.2-1.2 0l-4.5-2.2-1.2.9c-.8.6-1.5 1.3-2.3 1.9-.4.3-.9.2-1-.3-.1-.3-.1-.5 0-.7l2-4.7-4-1.3c-.5-.2-.7-.6-.5-1 .2-.4.6-.6 1.1-.4l5 1.1.2-4.9c0-.5.4-.9.9-.9.5 0 .9.3.9.8l.2 4.5 3-3.1c.3-.4.9-.4 1.2-.1.4.3.4.8.1 1.2l-3.2 3.3z"/></svg>
              </a>
              <a className="jl-social-link" href="https://nextdoor.com/pages/jl-custom-upholstery" target="_blank" rel="noopener noreferrer" aria-label="Nextdoor">
                <svg viewBox="0 0 24 24"><path d="M19 9.3V4h-3v2.6L12 3 2 12h3v9h5v-6h4v6h5v-9h3L19 9.3zm-5.5 4.2c-.4.4-1 .5-1.5.2-.2-.1-.3-.3-.4-.5v.3c0 .6-.4 1-1 1s-1-.4-1-1v-2.1c0-.6.4-1 1-1s1 .4 1 1v.7c.1-.2.3-.4.5-.5.5-.3 1.1-.2 1.5.2.4.4.5 1.1.5 1.6 0 .5-.2 1.1-.6 1.5z"/></svg>
              </a>
              <a className="jl-social-link" href="https://linkedin.com/company/jlcustomupholstery" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
            <div className="mt-6">
              <a href="#estimate">
                <Button className="bg-champagne text-obsidian h-10 rounded-none px-6 text-xs font-semibold tracking-wide hover:bg-champagne-light">
                  Start Visual Quote <Camera className="ml-2 h-3.5 w-3.5" />
                </Button>
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}

/* ──────────────────────────────── UTILITY BAR ──────────────────────────────── */

function UtilityBar() {
  return (
    <div className="bg-black border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-6 md:px-10 md:py-7">
        {/* Main copyright and description */}
        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:gap-8">
          <div className="flex-1">
            <p className="text-xs font-light tracking-wide text-white/50">
              &copy; 2026 JL Custom Upholstery. All rights reserved.
            </p>
            <p className="mt-2 text-xs font-light leading-relaxed text-white/35">
              JL Custom Upholstery is a premier Orange County workshop providing master craftsmanship in residential furniture, hospitality layouts, and automotive/marine interiors. Quality is our foundational priority. We source elite, high-grade materials and guarantee all structural execution.
            </p>
          </div>
          <div className="shrink-0 md:text-right">
            <p className="text-xs font-light tracking-wide text-white/50">
              1112 E Raymond Way, Anaheim, CA 92801
            </p>
            <p className="mt-1 text-xs font-light tracking-wide text-white/50">
              (714) 805-4391
            </p>
            <p className="mt-3 text-[10px] font-light tracking-wide text-white/25">
              Powered by{' '}
              <a
                href="https://nxlbyldr.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C5A880] transition-colors duration-200 hover:text-[#d4c09e]"
              >
                NXLBYLDR CRM
              </a>
              {' | '}managed by{' '}
              <a
                href="https://vsualdigitalmedia.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C5A880] transition-colors duration-200 hover:text-[#d4c09e]"
              >
                VSUALdigitalmedia.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ──────────────────────────────── ATELIER AI ──────────────────────────────── */

interface ChatMessage {
  role: 'user' | 'ai'
  text: string
  photo?: string
}

function AtelierAI() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId] = useState(() => Math.random().toString(36).substring(2, 15))
  const [photoHover, setPhotoHover] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Send initial greeting on first open
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          role: 'ai',
          text: 'Welcome to the JL Atelier. How may I assist you with your upholstery project today?',
        },
      ])
    }
  }, [open, messages.length])

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return
    const userMsg: ChatMessage = { role: 'user', text }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, message: text }),
      })
      const data = await res.json()
      const aiText = data.success && data.response
        ? data.response
        : 'I apologize, but I\'m unable to process your request at this time. Please try again shortly.'
      setMessages((prev) => [...prev, { role: 'ai', text: aiText }])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'ai', text: 'I apologize, but I\'m unable to process your request at this time. Please try again shortly.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      const result = reader.result as string
      setMessages((prev) => [
        ...prev,
        { role: 'user', text: '[Photo uploaded]', photo: result },
      ])
      sendMessage('A user has uploaded a photo of their piece for estimation.')
    }
    reader.readAsDataURL(file)
    // Reset input so the same file can be re-selected
    e.target.value = ''
  }

  const handleClose = async () => {
    setOpen(false)
    setMessages([])
    setInput('')
    try {
      await fetch(`/api/agent?sessionId=${sessionId}`, { method: 'DELETE' })
    } catch {
      // silently ignore
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  return (
    <>
      {/* ── Floating Vertical Tab (visible when chat closed) ── */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(true)}
            className="fixed right-0 top-1/2 z-40 -translate-y-1/2 cursor-pointer py-6 px-3"
            style={{
              background: '#111111',
              border: '1px solid #C5A880',
              borderRight: 'none',
              borderRadius: '8px 0 0 8px',
              writingMode: 'vertical-lr',
              textOrientation: 'mixed',
            }}
            aria-label="Open Atelier AI Chat"
          >
            <span
              className="flex items-center gap-3 text-xs font-medium tracking-[0.25em] uppercase transition-colors"
              style={{ color: 'rgba(255,255,255,0.8)' }}
              onMouseEnter={(e) => {
                ;(e.currentTarget.parentElement as HTMLElement).style.borderColor = '#d4c09e'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget.parentElement as HTMLElement).style.borderColor = '#C5A880'
              }}
            >
              <Camera className="h-4 w-4" style={{ writingMode: 'vertical-lr' }} />
              ASK ATELIER AI
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat Panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-1/2 z-40 flex -translate-y-1/2 flex-col"
            style={{
              width: '400px',
              maxWidth: 'calc(100vw - 24px)',
              height: '600px',
              maxHeight: 'calc(100vh - 48px)',
              background: '#0A0A0A',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRight: 'none',
              borderRadius: '8px 0 0 8px',
            }}
          >
            {/* ── Header ── */}
            <div
              className="flex shrink-0 items-center justify-between px-5 py-4"
              style={{ background: '#000000', borderBottom: '1px solid #C5A880' }}
            >
              <div className="flex items-center gap-3">
                <Camera className="h-4 w-4 text-champagne" />
                <div>
                  <p className="text-sm font-semibold tracking-wide text-white">
                    Atelier Design Assistant
                  </p>
                  <p className="text-[10px] font-light tracking-wider text-white/40">
                    JL Custom Upholstery
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-white/40 transition-colors hover:text-white"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* ── Messages Area ── */}
            <div className="flex-1 overflow-y-auto px-5 py-5" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.15) transparent' }}>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`mb-3 flex ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-3 text-[13px] leading-relaxed ${
                      msg.role === 'ai'
                        ? 'bg-[#111111] text-white/80'
                        : 'bg-[#C5A880]/10 text-white/80'
                    }`}
                    style={{ borderRadius: 0 }}
                  >
                    {msg.photo && (
                      <img
                        src={msg.photo}
                        alt="Uploaded photo"
                        className="mb-2 max-h-32 w-auto border border-white/10"
                      />
                    )}
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Loading dots */}
              {loading && (
                <div className="mb-3 flex justify-start">
                  <div className="bg-[#111111] p-3 text-[13px] leading-relaxed text-white/80" style={{ borderRadius: 0 }}>
                    <motion.span
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      ...
                    </motion.span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ── Photo Upload Zone ── */}
            <div className="shrink-0 px-5 pb-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                onMouseEnter={() => setPhotoHover(true)}
                onMouseLeave={() => setPhotoHover(false)}
                className="flex w-full items-center justify-center gap-2 py-3 text-center transition-colors"
                style={{
                  border: `1px dashed ${photoHover ? 'rgba(197,168,128,0.6)' : 'rgba(197,168,128,0.3)'}`,
                  background: 'rgba(255,255,255,0.02)',
                }}
              >
                <Camera className="h-3.5 w-3.5 text-white/30" />
                <span className="text-[11px] font-light tracking-wide text-white/40">
                  Drop project photos here or Snap a new one!
                </span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />
            </div>

            {/* ── Input Row ── */}
            <div className="flex shrink-0 items-center gap-2 px-5 pb-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about your project..."
                className="flex-1 border border-white/10 bg-[#111111] px-3 text-sm text-white placeholder:text-white/30 focus-visible:ring-champagne focus-visible:outline-none h-10"
                style={{ borderRadius: 0 }}
              />
              <button
                type="button"
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || loading}
                className="bg-champagne text-obsidian h-10 px-4 text-sm font-semibold hover:bg-champagne-light transition-colors disabled:opacity-40"
                style={{ borderRadius: 0 }}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>

            {/* ── Footer Attribution ── */}
            <div className="shrink-0 border-t border-white/5 py-2 text-center">
              <p className="text-[10px] font-light tracking-wide text-white/25">
                Powered by NXLBYLDR AI | managed by VSUALdigitalmedia.com
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ──────────────────────────────── PAGE ──────────────────────────────── */

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <HeroSection />
        <MissionSection />
        <SpecialistSection />
        <VideoShowcase />
        <LeadWizard />
        <DesignerPortalSection />
        <FacilitySection />
      </main>
      <Footer />
      <UtilityBar />
      <AtelierAI />
    </div>
  )
}
