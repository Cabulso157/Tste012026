export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-card shadow-sm">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center justify-start h-16">
          <a href="/" className="flex items-center gap-2">
            <div className="h-12 w-56">
              <img
                src="/logo.png"
                alt="Fundação Esperança Solidária"
                className="h-full w-full object-contain object-left"
              />
            </div>
          </a>
        </div>
      </div>
    </header>
  );
}
