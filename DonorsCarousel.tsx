import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Building2, Heart } from "lucide-react";

const COMPANY_LOGOS = [
  { name: "O Boticário", src: "/donors/boticario.png" },
  { name: "Natura", src: "/donors/natura.png" },
  { name: "Grupo Rede 10", src: "/donors/grupo-rede-10.png" },
  { name: "O Boticário", src: "/donors/boticario.png" },
  { name: "Natura", src: "/donors/natura.png" },
  { name: "Grupo Rede 10", src: "/donors/grupo-rede-10.png" },
];

export function DonorsCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const checkScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = carouselRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      return () => el.removeEventListener("scroll", checkScroll);
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({ left: direction === "left" ? -200 : 200, behavior: "smooth" });
  };

  return (
    <section className="py-12 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-teal-400 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pink-400 rounded-full blur-3xl" />
      </div>
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-8 animate-slide-up">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 px-4 py-2 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
            <Building2 className="w-4 h-4" />
            <span>Parceiros da campanha</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white">Empresas que apoiaram</h3>
          <p className="text-white/60 text-sm mt-2 max-w-md mx-auto">Grandes empresas que acreditam na nossa causa e ajudam a fazer a diferença</p>
        </div>
        <div className="relative group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          <button onClick={() => scroll("left")} disabled={!canScrollLeft}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-300 ${canScrollLeft ? "opacity-100 hover:bg-primary hover:text-white hover:scale-110" : "opacity-0 cursor-default"} ${isHovered ? "translate-x-0" : "-translate-x-4"}`}>
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => scroll("right")} disabled={!canScrollRight}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-300 ${canScrollRight ? "opacity-100 hover:bg-primary hover:text-white hover:scale-110" : "opacity-0 cursor-default"} ${isHovered ? "translate-x-0" : "translate-x-4"}`}>
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />
          <div ref={carouselRef} className="flex gap-5 overflow-x-auto py-4 px-8 scroll-smooth" style={{ scrollbarWidth: "none" }}>
            {COMPANY_LOGOS.map((company, index) => (
              <div key={index} className="logo-card flex-none w-44 h-28 flex items-center justify-center bg-white rounded-2xl p-5 shadow-xl border border-white/20">
                <img src={company.src} alt={company.name} className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center gap-6 mt-8 text-white/50 text-sm stagger-children">
          <div className="flex items-center gap-2"><div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" /><span>+50 empresas parceiras</span></div>
          <div className="hidden sm:block w-px h-4 bg-white/20" />
          <div className="hidden sm:flex items-center gap-2"><div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" /><span>Parcerias verificadas</span></div>
        </div>
        <div className="mt-10 text-center">
          <p className="text-white/70 text-sm mb-4">Faça parte dessa corrente do bem</p>
          <a href="#donation-form" className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-sm shadow-lg hover:bg-primary hover:text-white transition-all hover:scale-105 active:scale-95">
            <Heart className="w-5 h-5" /><span>Quero contribuir agora</span>
          </a>
        </div>
      </div>
    </section>
  );
}
