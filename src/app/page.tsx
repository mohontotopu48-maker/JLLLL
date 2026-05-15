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
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <img
            src="/images/jl-logo.svg"
            alt="JL Custom Upholstery Logo"
            className="h-9 w-9"
          />
          <span className="text-champagne text-2xl font-black tracking-tight">
            JL
          </span>
          <span className="hidden text-sm font-light tracking-[0.3em] text-white sm:inline">
            CUSTOM UPHOLSTERY
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-light tracking-wide text-white/70 transition-colors hover:text-champagne"
            >
              {l.label}
            </a>
          ))}
          <a href="#estimate">
            <Button
              className="bg-champagne text-obsidian h-9 rounded-none px-6 text-sm font-semibold tracking-wide hover:bg-champagne-light"
            >
              Get Estimate
            </Button>
          </a>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden">
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
                    className="h-7 w-7"
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

      <div className="relative z-10 mx-auto max-w-5xl px-4 pt-16 text-center sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl font-black tracking-tight text-white md:text-7xl lg:text-8xl"
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
          className="mx-auto mt-4 max-w-2xl text-sm font-light leading-relaxed text-white/70 md:text-base"
        >
          Orange County&apos;s premier upholstery atelier. 25+ years. A new expanded facility.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a href="#estimate">
            <Button className="bg-champagne text-obsidian h-12 rounded-none px-8 text-sm font-semibold tracking-wide hover:bg-champagne-light">
              Start Your Estimate <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
          <a href="#craft">
            <Button
              variant="outline"
              className="h-12 rounded-none border-white/40 px-8 text-sm font-light tracking-wide text-white hover:bg-white/10 hover:text-white"
            >
              View Our Craft
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

/* ──────────────────────────────── MISSION / VALUES ──────────────────────────────── */

function MissionSection() {
  const stats = [
    { value: '25+', label: 'Years' },
    { value: '10,000+', label: 'Projects' },
    { value: '50+', label: 'Premium Fabrics' },
    { value: '1', label: 'Standard: Perfection' },
  ]

  return (
    <section id="craft" className="bg-stark py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <div className="text-center">
            <span className="text-champagne text-6xl font-light leading-none select-none">
              &ldquo;
            </span>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-obsidian md:text-5xl">
              YOUR QUALITY IS OUR PRIORITY
            </h2>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.15}>
          <p className="mx-auto mt-8 max-w-3xl text-center text-base font-light leading-relaxed text-obsidian/70 md:text-lg">
            At JL Custom Upholstery, every stitch is a statement. For over 25
            years, we&apos;ve operated on a single principle — that the work
            leaving our workshop must be worthy of the homes, vessels, and
            vehicles it inhabits. This is precision craftsmanship, grounded in
            integrity.
          </p>
        </FadeInSection>

        <FadeInSection delay={0.3}>
          <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-black text-champagne md:text-4xl">
                  {s.value}
                </p>
                <p className="mt-1 text-xs font-light tracking-widest text-obsidian/50 uppercase">
                  {s.label}
                </p>
              </div>
            ))}
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

/* ──────────────────────────────── LEAD WIZARD ──────────────────────────────── */

const projectTypes = [
  { id: 'luxury-home', label: 'Luxury Home', icon: Home },
  { id: 'commercial', label: 'Commercial / Hospitality', icon: Building2 },
  { id: 'marine', label: 'Marine / RV', icon: Ship },
  { id: 'classic-auto', label: 'Classic Auto', icon: Car },
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
    <section id="estimate" className="bg-stark py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <div className="text-center">
            <h2 className="text-3xl font-black tracking-tight text-obsidian md:text-5xl">
              INSTANT PHOTO ESTIMATE
            </h2>
            <p className="mt-3 text-sm font-light tracking-wide text-obsidian/50">
              Four steps. Sixty seconds. A precision estimate.
            </p>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.15}>
          <div className="mt-12">
            {/* Progress bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className="flex items-center">
                    <div
                      className={`flex h-8 w-8 items-center justify-center text-xs font-bold transition-colors ${
                        s <= step
                          ? 'bg-champagne text-obsidian'
                          : 'bg-obsidian/10 text-obsidian/40'
                      }`}
                    >
                      {s}
                    </div>
                    {s < 4 && (
                      <div
                        className={`h-[2px] w-12 sm:w-20 md:w-24 transition-colors ${
                          s < step ? 'bg-champagne' : 'bg-obsidian/10'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <Progress
                value={(step / 4) * 100}
                className="h-1 rounded-none bg-obsidian/10 [&>div]:bg-champagne"
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
                  <h3 className="text-lg font-semibold text-obsidian">
                    What type of project?
                  </h3>
                  <p className="mt-1 text-sm font-light text-obsidian/50">
                    Select the category that best describes your project.
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    {projectTypes.map((pt) => {
                      const Icon = pt.icon
                      const selected = projectType === pt.id
                      return (
                        <button
                          key={pt.id}
                          type="button"
                          onClick={() => setProjectType(pt.id)}
                          className={`flex flex-col items-center justify-center gap-3 border p-6 transition-colors ${
                            selected
                              ? 'border-champagne bg-champagne/5'
                              : 'border-obsidian/10 bg-white hover:border-obsidian/30'
                          }`}
                        >
                          <Icon
                            className={`h-8 w-8 ${
                              selected ? 'text-champagne' : 'text-obsidian/40'
                            }`}
                          />
                          <span
                            className={`text-xs font-medium tracking-wide ${
                              selected ? 'text-champagne' : 'text-obsidian/60'
                            }`}
                          >
                            {pt.label}
                          </span>
                        </button>
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
                  <h3 className="text-lg font-semibold text-obsidian">
                    What service do you need?
                  </h3>
                  <p className="mt-1 text-sm font-light text-obsidian/50">
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
                          className={`border px-6 py-3 text-sm font-medium tracking-wide transition-colors ${
                            selected
                              ? 'border-champagne bg-champagne text-obsidian'
                              : 'border-obsidian/10 bg-white text-obsidian/60 hover:border-obsidian/30'
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
                  <h3 className="text-lg font-semibold text-obsidian">
                    Upload a photo of your piece
                  </h3>
                  <p className="mt-1 text-sm font-light text-obsidian/50">
                    A photo helps us provide a more accurate estimate. This step
                    is optional.
                  </p>
                  <div className="mt-6">
                    {photoPreview ? (
                      <div className="relative inline-block">
                        <img
                          src={photoPreview}
                          alt="Uploaded preview"
                          className="h-48 w-auto border border-obsidian/10 object-cover"
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
                        className="flex min-h-[200px] cursor-pointer flex-col items-center justify-center gap-4 border-2 border-dashed border-obsidian/20 bg-white transition-colors hover:border-champagne/50 hover:bg-champagne/5"
                      >
                        <Camera className="h-10 w-10 text-obsidian/30" />
                        <div className="text-center">
                          <p className="text-sm font-medium text-obsidian/60">
                            Upload a Photo of Your Piece
                          </p>
                          <p className="mt-1 text-xs font-light text-obsidian/40 md:hidden">
                            Tap to snap a photo now for a precision estimate.
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-obsidian/40">
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
                    <h3 className="text-lg font-semibold text-obsidian">
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
                  <p className="mt-1 text-sm font-light text-obsidian/50">
                    We&apos;ll respond with your estimate within 24 hours.
                  </p>
                  <div className="mt-6 space-y-4">
                    <div>
                      <Label
                        htmlFor="lead-name"
                        className="text-xs font-medium tracking-wide text-obsidian/60 uppercase"
                      >
                        Name
                      </Label>
                      <Input
                        id="lead-name"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Your full name"
                        className="mt-1 rounded-none border-obsidian/20 bg-white focus-visible:ring-champagne"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="lead-phone"
                        className="text-xs font-medium tracking-wide text-obsidian/60 uppercase"
                      >
                        Phone
                      </Label>
                      <Input
                        id="lead-phone"
                        type="tel"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="(555) 000-0000"
                        className="mt-1 rounded-none border-obsidian/20 bg-white focus-visible:ring-champagne"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="lead-email"
                        className="text-xs font-medium tracking-wide text-obsidian/60 uppercase"
                      >
                        Email
                      </Label>
                      <Input
                        id="lead-email"
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="mt-1 rounded-none border-obsidian/20 bg-white focus-visible:ring-champagne"
                      />
                    </div>
                  </div>
                  <p className="mt-4 text-xs font-light text-obsidian/40">
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
                  className="rounded-none text-obsidian/60 hover:text-obsidian"
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
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              onClick={() => setDialogOpen(true)}
              className="bg-champagne text-obsidian h-12 rounded-none px-8 text-sm font-semibold tracking-wide hover:bg-champagne-light"
            >
              Request Access
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-none border-white/30 px-8 text-sm font-light tracking-wide text-white hover:bg-white/10 hover:text-white"
            >
              Learn More
            </Button>
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
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <img
                src="/images/jl-logo.svg"
                alt="JL Logo"
                className="h-8 w-8"
              />
              <span className="text-champagne text-2xl font-black tracking-tight">
                JL
              </span>
              <span className="text-sm font-light tracking-[0.3em] text-white">
                CUSTOM UPHOLSTERY
              </span>
            </div>
            <p className="mt-3 text-xs font-light leading-relaxed text-white/40">
              Jesus is Lord
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center gap-2 md:items-end">
            <div className="flex items-center gap-2 text-xs font-light text-white/60">
              <MapPin className="h-3 w-3 text-champagne" />
              Fullerton, CA
            </div>
            <div className="flex items-center gap-2 text-xs font-light text-white/60">
              <Phone className="h-3 w-3 text-champagne" />
              (714) 555-0100
            </div>
            <div className="flex items-center gap-2 text-xs font-light text-white/60">
              <Mail className="h-3 w-3 text-champagne" />
              info@jlcustomupholstery.com
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-white/10" />

        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <p className="text-xs font-light text-white/30">
            &copy; 2025 JL Custom Upholstery. All rights reserved.
          </p>
          <p className="text-xs font-light text-white/30">
            Scan our business card QR for Instant Photo Estimates
          </p>
        </div>
      </div>
    </footer>
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
        <LeadWizard />
        <DesignerPortalSection />
        <FacilitySection />
      </main>
      <Footer />
    </div>
  )
}
