"use client"

import { useForm, ValidationError } from "@formspree/react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CheckCircle2, Loader2 } from "lucide-react"

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "YOUR_FORM_ID"
// Get your Formspree form ID from:
// 1. Create an account at https://formspree.io
// 2. Go to Dashboard -> Create Form
// 3. Copy the hash from the form endpoint URL (the part after /f/)
// 4. Set NEXT_PUBLIC_FORMSPREE_ID in your build environment or .env.local
// For static export on GitHub Pages, NEXT_PUBLIC_ prefix bakes it in at build time.

export function ContactForm() {
  const [state, handleSubmit] = useForm(FORMSPREE_ID)

  if (state.succeeded) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border/50 bg-card/50 p-8 text-center backdrop-blur-sm">
        <CheckCircle2 className="h-10 w-10 text-[oklch(0.58_0.17_145)]" />
        <p className="text-lg font-medium text-foreground">
          Thanks, Minh will get back to you soon.
        </p>
        <p className="text-sm text-muted-foreground">
          Your message has been sent successfully.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5"
      noValidate
    >
      {/* Honeypot — D-15: accessible-safe positioning, not display:none */}
      <input
        type="text"
        name="_gotcha"
        style={{ position: "absolute", left: "-9999px", top: "-9999px" }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium text-foreground">
          Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          required
          aria-invalid={!!state.errors.find(e => e.field === "name")}
          className={cn(
            "w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground",
            "outline-none transition-colors",
            "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
            "aria-invalid:border-destructive"
          )}
          placeholder="Your name"
        />
        <ValidationError
          prefix="Name"
          field="name"
          errors={state.errors}
          className="text-xs text-destructive"
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          aria-invalid={!!state.errors.find(e => e.field === "email")}
          className={cn(
            "w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground",
            "outline-none transition-colors",
            "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
            "aria-invalid:border-destructive"
          )}
          placeholder="you@example.com"
        />
        <ValidationError
          prefix="Email"
          field="email"
          errors={state.errors}
          className="text-xs text-destructive"
        />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          aria-invalid={!!state.errors.find(e => e.field === "message")}
          className={cn(
            "w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-foreground",
            "outline-none transition-colors",
            "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
            "aria-invalid:border-destructive"
          )}
          placeholder="Your message..."
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
          className="text-xs text-destructive"
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={state.submitting}
        className="w-fit"
      >
        {state.submitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>

      {/* Form-level errors from Formspree */}
      {state.errors.length > 0 && state.errors.some(e => !e.field) && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
          {state.errors
            .filter(e => !e.field)
            .map((e, i) => (
              <p key={i}>{e.message}</p>
            ))}
        </div>
      )}
    </form>
  )
}
