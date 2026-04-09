import { Check } from "lucide-react";

interface StorySectionProps {
  goalAmount: number;
  raisedAmount: number;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

export function StorySection({ goalAmount, raisedAmount }: StorySectionProps) {
  return (
    <div className="campaign-card mb-6">
      <div className="mb-4">
        <h2 className="text-primary font-bold text-base pb-2 border-b-2 border-primary inline-block">História</h2>
        <div className="border-b border-border -mt-[2px]" />
      </div>
      <div className="space-y-6">
        <div className="border-l-4 border-accent bg-green-50/50 p-4">
          <h3 className="text-lg font-extrabold text-foreground leading-snug mb-3">
            ⚠️ Após se recuperar da Covid, Lucas desenvolveu uma infecção pós-Covid que evoluiu para pneumonia.
          </h3>
          <div className="text-foreground text-sm leading-relaxed space-y-2">
            <p><strong>Zinforo</strong> — o único medicamento eficaz para o caso; é um antibiótico específico e de alto custo (cada dose ~ <strong>R$ 500</strong>) e não é fornecido pelo SUS.</p>
            <p>Sem esse tratamento, o quadro pode se agravar rapidamente.</p>
            <p>A família não tem condições de arcar com o custo sozinho — qualquer ajuda agora é essencial.</p>
          </div>
        </div>
        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2.5 rounded-full text-sm font-semibold border border-green-200 pulse-ring hover-scale cursor-pointer transition-all">
          <Check className="w-5 h-5 animate-pulse" strokeWidth={2.5} />
          <span>Caso verificado pela equipe</span>
        </div>
        <div className="border-l-4 border-accent bg-green-50/50 p-4">
          <h3 className="text-lg font-extrabold text-foreground mb-4">💚 Para onde vai cada doação</h3>
          <div className="text-foreground text-sm leading-relaxed space-y-3">
            <p>💊 <strong>Remédios:</strong> o medicamento eficaz para o caso do Lucas é o <strong>Zinforo</strong>, um antibiótico específico e de alto custo — cada dose custa cerca de <strong>R$ 500</strong> e não é fornecida pelo SUS.</p>
            <p>🍽️ <strong>Alimentação:</strong> manutenção da nutrição durante o tratamento.</p>
            <p>👕 <strong>Roupas:</strong> necessidades básicas para conforto e dignidade.</p>
            <p>🏠 <strong>Casa:</strong> pequenas melhorias para um ambiente mais seguro e saudável.</p>
            <p>💚 <strong>Ajuda mensal:</strong> apoio para despesas essenciais (contas, transporte e cuidados).</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 stagger-children">
          <a href="#donation-form" className="bg-card border border-border p-4 rounded-xl hover-lift card-interactive block">
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-semibold mb-1">
              <span className="animate-float inline-block">🎯</span> Meta da campanha
            </div>
            <div className="text-2xl font-extrabold text-foreground">{formatCurrency(goalAmount)}</div>
          </a>
          <a href="#donation-form" className="bg-card border border-border p-4 rounded-xl hover-lift card-interactive block">
            <div className="text-sm text-muted-foreground font-semibold mb-1">Arrecadado até agora</div>
            <div className="text-2xl font-extrabold text-green-600 gradient-text">{formatCurrency(raisedAmount)}</div>
          </a>
        </div>
        <p className="text-secondary-foreground text-sm">Cada contribuição aproxima a família do tratamento necessário.</p>
        <p className="text-foreground font-bold text-lg">Aqui não é sobre pena — é sobre solidariedade, assistência e dignidade.</p>
        <a href="#donation-form" className="btn-primary block w-full text-center bg-primary text-primary-foreground py-4 rounded-xl font-bold text-base shadow-lg relative overflow-hidden group">
          <span className="relative z-10 flex items-center justify-center gap-2">
            <span className="animate-heartbeat inline-block">💚</span>
            <span>AJUDAR AGORA</span>
          </span>
        </a>
        <p className="text-secondary-foreground text-sm">Se não puder doar agora, <strong>por favor compartilhe</strong> 🔄. A divulgação também salva vidas.</p>
        <a href="#donation-form" className="btn-primary block w-full text-center bg-primary/10 text-primary py-3 rounded-xl font-bold text-sm border-2 border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all">
          Fazer minha doação agora
        </a>
        <p className="text-foreground font-bold">🙏 Obrigado por nos enxergar.</p>
        <p className="text-sm text-secondary-foreground"><strong>Transparência:</strong> todas as doações são destinadas exclusivamente à alimentação, medicamentos, cuidados e despesas essenciais da casa.</p>
      </div>
    </div>
  );
}
