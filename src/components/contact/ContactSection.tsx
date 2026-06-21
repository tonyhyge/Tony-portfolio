"use client"

import { useEffect, useRef, useState } from "react"
import { Mail } from "lucide-react"
import { ContactForm } from "./ContactForm"
import { SocialLinks } from "./SocialLinks"
import { Container } from "@/components/container"

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="min-h-screen py-16 md:py-24"
      aria-labelledby="contact-heading"
    >
      <Container>
        {/* Heading with icon accent — D-22 */}
        <div className="mb-10 md:mb-14">
          <h2 id="contact-heading" className="flex items-center gap-2 font-heading text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            <Mail className="inline-block h-6 w-6 text-[var(--accent)]" />
            Contact
          </h2>
          <p className="mt-2 text-base text-muted-foreground">
            Have a question or want to collaborate? Send me a message.
          </p>
        </div>

        {/* Split layout — D-21 */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          {/* Left: ContactForm */}
          <div
            className={`transition-all duration-500 ease-out ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: isVisible ? "0ms" : "0ms" }}
          >
            <ContactForm />
          </div>

          {/* Right: SocialLinks */}
          <div className="flex flex-col items-center justify-center gap-6">
            <p className="text-sm text-muted-foreground">Find me on</p>
            <div
              className={`transition-all duration-500 ease-out ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: isVisible ? "300ms" : "0ms" }}
            >
              <SocialLinks />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
