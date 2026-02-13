"use client"

import { memo, useEffect, useLayoutEffect, useMemo, useState } from "react"
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion"
import { Star, ChevronLeft, ChevronRight, X } from "lucide-react"

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

type UseMediaQueryOptions = {
  defaultValue?: boolean
  initializeWithValue?: boolean
}

const IS_SERVER = typeof window === "undefined"

export function useMediaQuery(
  query: string,
  {
    defaultValue = false,
    initializeWithValue = true,
  }: UseMediaQueryOptions = {}
): boolean {
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) {
      return defaultValue
    }
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query)
    }
    return defaultValue
  })

  const handleChange = () => {
    setMatches(getMatches(query))
  }

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query)
    handleChange()

    matchMedia.addEventListener("change", handleChange)

    return () => {
      matchMedia.removeEventListener("change", handleChange)
    }
  }, [query])

  return matches
}

interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  avatar: string
}

const duration = 0.15
const transition = { duration, ease: [0.32, 0.72, 0, 1] }
const transitionOverlay = { duration: 0.5, ease: [0.32, 0.72, 0, 1] }

const Carousel = memo(
  ({
    handleClick,
    controls,
    testimonials,
    isCarouselActive,
  }: {
    handleClick: (testimonial: Testimonial, index: number) => void
    controls: any
    testimonials: Testimonial[]
    isCarouselActive: boolean
  }) => {
    const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
    const cylinderWidth = isScreenSizeSm ? 1100 : 1800
    const faceCount = testimonials.length
    const faceWidth = cylinderWidth / faceCount
    const radius = cylinderWidth / (2 * Math.PI)
    const rotation = useMotionValue(0)
    const transform = useTransform(
      rotation,
      (value) => `rotate3d(0, 1, 0, ${value}deg)`
    )

    // Auto-rotate the carousel slowly when active
    useEffect(() => {
      if (!isCarouselActive) return
      
      let animationFrame: number
      const animate = () => {
        rotation.set(rotation.get() + 0.05) // Very slow continuous rotation
        controls.set({
          rotateY: rotation.get(),
        })
        animationFrame = requestAnimationFrame(animate)
      }
      animationFrame = requestAnimationFrame(animate)
      
      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame)
        }
      }
    }, [isCarouselActive, rotation, controls])

    return (
      <div
        className="flex h-full items-center justify-center bg-transparent"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <motion.div
          drag={isCarouselActive ? "x" : false}
          className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
          style={{
            transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          onDrag={(_, info) =>
            isCarouselActive &&
            rotation.set(rotation.get() + info.offset.x * 0.01)
          }
          onDragEnd={(_, info) =>
            isCarouselActive &&
            controls.start({
              rotateY: rotation.get() + info.velocity.x * 0.01,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 30,
                mass: 0.1,
              },
            })
          }
          animate={controls}
        >
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={`key-${testimonial.id}-${i}`}
              className="absolute flex h-full origin-center items-center justify-center p-4"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${
                  i * (360 / faceCount)
                }deg) translateZ(${radius}px)`,
              }}
              onClick={() => handleClick(testimonial, i)}
            >
              <motion.div
                layoutId={`testimonial-${testimonial.id}`}
                className="pointer-events-auto w-full max-w-md rounded-3xl bg-black/60 border border-white/20 backdrop-blur-xl p-8 hover:border-kaal-accent/50 transition-colors cursor-pointer"
                initial={{ filter: "blur(4px)", opacity: 0.7 }}
                animate={{ filter: "blur(0px)", opacity: 1 }}
                transition={transition}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6 text-kaal-accent">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} size={16} fill="currentColor" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-kaal-text text-lg font-body italic leading-relaxed mb-8">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover border border-white/10" 
                  />
                  <div>
                    <h4 className="font-display font-bold text-lg leading-none text-white">{testimonial.name}</h4>
                    <p className="text-kaal-muted text-sm font-body font-medium mt-1">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    )
  }
)

Carousel.displayName = "Carousel"

function ThreeDTestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [activeTestimonial, setActiveTestimonial] = useState<Testimonial | null>(null)
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [isCarouselActive, setIsCarouselActive] = useState(true)
  const controls = useAnimation()

  const handleClick = (testimonial: Testimonial, index: number) => {
    setActiveTestimonial(testimonial)
    setActiveIndex(index)
    setIsCarouselActive(false)
    controls.stop()
  }

  const handleClose = () => {
    setActiveTestimonial(null)
    setIsCarouselActive(true)
  }

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % testimonials.length
    setActiveIndex(nextIndex)
    setActiveTestimonial(testimonials[nextIndex])
  }

  const handlePrevious = () => {
    const prevIndex = (activeIndex - 1 + testimonials.length) % testimonials.length
    setActiveIndex(prevIndex)
    setActiveTestimonial(testimonials[prevIndex])
  }

  return (
    <motion.div layout className="relative">
      <AnimatePresence mode="sync">
        {activeTestimonial && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            layoutId={`testimonial-container-${activeTestimonial.id}`}
            layout="position"
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 m-5 md:m-36 lg:mx-[19rem] rounded-3xl"
            style={{ willChange: "opacity" }}
            transition={transitionOverlay}
          >
            <motion.div
              layoutId={`testimonial-${activeTestimonial.id}`}
              className="max-w-2xl w-full rounded-3xl bg-black/70 border border-white/30 backdrop-blur-xl p-10 relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.1,
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              style={{
                willChange: "transform",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-kaal-accent/20 border border-white/20 hover:border-kaal-accent/50 transition-colors text-white/70 hover:text-kaal-accent z-10"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-kaal-accent/20 border border-white/20 hover:border-kaal-accent/50 transition-colors text-white/70 hover:text-kaal-accent z-10"
                aria-label="Next testimonial"
              >
                <ChevronRight size={24} />
              </button>

              {/* Stars */}
              <div className="flex gap-1 mb-6 text-kaal-accent">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} size={20} fill="currentColor" />
                ))}
              </div>

              {/* Content */}
              <p className="text-kaal-text text-xl font-body italic leading-relaxed mb-8">
                "{activeTestimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img 
                  src={activeTestimonial.avatar} 
                  alt={activeTestimonial.name} 
                  className="w-16 h-16 rounded-full object-cover border-2 border-kaal-accent/50" 
                />
                <div>
                  <h4 className="font-display font-bold text-2xl leading-none text-white">{activeTestimonial.name}</h4>
                  <p className="text-kaal-muted text-base font-body font-medium mt-2">{activeTestimonial.role}</p>
                </div>
              </div>

              {/* Page Indicator */}
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 rounded-full transition-all ${
                      idx === activeIndex
                        ? "w-8 bg-kaal-accent"
                        : "w-2 bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative h-[600px] w-full overflow-hidden">
        <Carousel
          handleClick={handleClick}
          controls={controls}
          testimonials={testimonials}
          isCarouselActive={isCarouselActive}
        />
      </div>
    </motion.div>
  )
}

export { ThreeDTestimonialCarousel }
