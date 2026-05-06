// Stub Hero used in the sandbox to verify the boot sequence reveals
// real-looking page content underneath.
export function FakeHero() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--bg, #0a0a0a)",
        color: "var(--text-primary, #f4f1ea)",
        padding: "10vh 6vw",
        fontFamily: "var(--font-display, var(--font-sans, system-ui))",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.08em",
          color: "var(--text-tertiary, #a8a39a)",
          marginBottom: 40,
        }}
      >
        § 00 / BRYCE HENTHORN
      </p>
      <h1
        style={{
          fontSize: "clamp(48px, 8vw, 112px)",
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
          maxWidth: "20ch",
          margin: 0,
        }}
      >
        Stub hero — the real one renders here once the boot sequence ends.
      </h1>
    </main>
  )
}
