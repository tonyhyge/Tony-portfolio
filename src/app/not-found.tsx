export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <div
        className="flex items-center justify-center"
        style={{
          width: 120,
          height: 120,
          clipPath:
            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          background: "var(--gradient-hero)",
        }}
        aria-hidden="true"
      >
        <span className="text-3xl font-bold text-primary-foreground">404</span>
      </div>
      <h1 className="text-2xl font-semibold text-foreground">
        Lost in the Lab?
      </h1>
      <p className="max-w-md text-muted-foreground">
        The page you are looking for does not exist. It may have been moved, or
        the link you followed might be broken.
      </p>
      <a
        href="/Tony-portfolio/"
        className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
      >
        Back to Home
      </a>
    </div>
  );
}
