import { Heart, Clock } from "lucide-react";

interface HeroSectionProps {
  title: string;
  organizer: string;
  createdAt: string;
}

export function HeroSection({ title, organizer, createdAt }: HeroSectionProps) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl md:text-3xl font-extrabold leading-tight text-foreground mb-4 flex items-start gap-2 animate-slide-up">
        <span className="text-3xl animate-heartbeat">💚</span>
        <span>{title}</span>
      </h1>
      <div className="flex flex-col gap-2 text-muted-foreground text-sm font-medium mb-6 stagger-children">
        <span className="inline-flex items-center gap-2 hover:text-foreground transition-colors">
          <Heart className="w-4 h-4 text-primary animate-pulse" />
          Vaquinha de <strong className="text-primary ml-1">{organizer}</strong>
        </span>
        <span className="inline-flex items-center gap-2 hover:text-foreground transition-colors">
          <Clock className="w-4 h-4 text-muted-foreground" />
          Criada em {createdAt}
        </span>
      </div>
      <div className="block lg:hidden mb-6 animate-scale-in" style={{ animationDelay: "0.3s" }}>
        <a
          href="#donation-form"
          className="btn-primary block w-full text-center bg-primary text-primary-foreground py-4 rounded-xl font-bold text-base shadow-lg hover-glow"
        >
          <span className="flex items-center justify-center gap-2">
            <span>Quero Ajudar</span>
            <span className="animate-float">🙏</span>
          </span>
        </a>
      </div>
    </div>
  );
}
