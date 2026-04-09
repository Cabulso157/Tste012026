import { useState, useEffect } from "react";

interface OfficialModalProps {
  enabled?: boolean;
}

export function OfficialModal({ enabled = true }: OfficialModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (enabled) setIsOpen(true);
  }, [enabled]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-[100000] flex items-center justify-center p-5">
      <div className="relative max-w-[520px] w-full bg-card rounded-xl p-7 shadow-2xl text-center">
        <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-secondary hover:bg-border transition-colors text-muted-foreground hover:text-foreground" aria-label="Fechar">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div className="w-[200px] h-[200px] mx-auto mb-5">
          <img src="/selo-oficial.png" alt="Selo oficial - Campanha Certificada" className="w-full h-full object-contain" />
        </div>
        <h3 className="text-xl font-extrabold text-foreground mb-4">Atenção — Campanha oficial</h3>
        <div className="text-left text-secondary-foreground text-base leading-relaxed mb-5 space-y-3">
          <p>Esta campanha é oficial e acompanhada por auditoria para garantir transparência.</p>
          <p>Todo o conteúdo deste site (textos, imagens, design, estrutura e código) é protegido pela Lei de Direitos Autorais nº 9.610/1998. A reprodução ou cópia, total ou parcial, sem autorização é proibida e sujeita a medidas legais.</p>
        </div>
        <div className="flex justify-center">
          <button onClick={() => setIsOpen(false)} className="bg-card border border-border px-5 py-2.5 rounded-xl cursor-pointer font-bold text-foreground hover:bg-secondary transition-colors">Fechar</button>
        </div>
      </div>
    </div>
  );
}
