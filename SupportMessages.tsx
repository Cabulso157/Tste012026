import { useState } from "react";

interface Message {
  id: number;
  name: string;
  initials: string;
  message: string;
  amount: number;
  date: string;
}

// Generate dynamic dates: today, yesterday, day before yesterday with random times
function generateDate(daysAgo: number, hour: number, minute: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  d.setHours(hour, minute, 0, 0);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  const hh = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
}

const MOCK_MESSAGES: Message[] = [
  { id: 1, name: "Anônimo", initials: "A", message: "", amount: 50, date: generateDate(0, 9, 12) },
  { id: 2, name: "Ariany Gomes", initials: "AG", message: "Vai dar tudo certo, pequeno! Deus está cuidando de tudo.", amount: 10, date: generateDate(0, 10, 47) },
  { id: 3, name: "Patrícia Pinheiro", initials: "PP", message: "Que a cura do Deus vivo chegue até você precioso.", amount: 10, date: generateDate(0, 12, 3) },
  { id: 4, name: "Anônimo", initials: "A", message: "", amount: 5, date: generateDate(0, 14, 28) },
  { id: 5, name: "Anônimo", initials: "A", message: "", amount: 20, date: generateDate(0, 16, 55) },
  { id: 6, name: "Adriana Jesus", initials: "AJ", message: "", amount: 10, date: generateDate(0, 18, 31) },
  { id: 7, name: "Ivonei Girardi Pacheco", initials: "IG", message: "Que Deus abençoe", amount: 15, date: generateDate(0, 20, 14) },
  { id: 8, name: "Vitor Marcos da Silva Xavier", initials: "VM", message: "", amount: 5, date: generateDate(1, 7, 45) },
  { id: 9, name: "Anônimo", initials: "A", message: "Deus abençoe", amount: 5, date: generateDate(1, 9, 22) },
  { id: 10, name: "Maria Fernanda Costa", initials: "MF", message: "Força para a família!", amount: 100, date: generateDate(1, 11, 8) },
  { id: 11, name: "João Pedro Santos", initials: "JP", message: "", amount: 25, date: generateDate(1, 13, 36) },
  { id: 12, name: "Anônimo", initials: "A", message: "Deus é maior!", amount: 50, date: generateDate(1, 15, 51) },
  { id: 13, name: "Carla Mendes", initials: "CM", message: "Melhoras, Lucas!", amount: 30, date: generateDate(1, 17, 19) },
  { id: 14, name: "Roberto Almeida", initials: "RA", message: "", amount: 200, date: generateDate(1, 19, 42) },
  { id: 15, name: "Anônimo", initials: "A", message: "", amount: 15, date: generateDate(2, 8, 15) },
  { id: 16, name: "Luciana Ferreira", initials: "LF", message: "Estamos orando por você!", amount: 40, date: generateDate(2, 10, 33) },
  { id: 17, name: "Fernando Oliveira", initials: "FO", message: "", amount: 100, date: generateDate(2, 13, 7) },
  { id: 18, name: "Anônimo", initials: "A", message: "Força guerreiro!", amount: 20, date: generateDate(2, 15, 48) },
  { id: 19, name: "Amanda Souza", initials: "AS", message: "Deus está no controle!", amount: 35, date: generateDate(2, 18, 25) },
  { id: 20, name: "Paulo Henrique Lima", initials: "PH", message: "", amount: 50, date: generateDate(2, 21, 2) },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

export function SupportMessages() {
  const [showAll, setShowAll] = useState(false);
  const displayedMessages = showAll ? MOCK_MESSAGES : MOCK_MESSAGES.slice(0, 5);

  return (
    <div className="campaign-card">
      <div className="mb-4">
        <h2 className="text-primary font-bold text-base pb-2 border-b-2 border-primary inline-block">Apoiadores</h2>
        <div className="border-b border-border -mt-[2px]" />
      </div>

      <div className="space-y-3">
        {displayedMessages.map((msg) => (
          <div key={msg.id} className="flex gap-3 p-3 rounded-xl bg-muted/50 hover-lift transition-all">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center flex-shrink-0">
              {msg.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-0.5">
                <span className="font-semibold text-sm text-foreground truncate">{msg.name}</span>
                <span className="text-xs text-muted-foreground flex-shrink-0">{msg.date}</span>
              </div>
              <p className="text-sm text-primary font-bold">{formatCurrency(msg.amount)}</p>
              {msg.message && <p className="text-sm text-secondary-foreground mt-1">{msg.message}</p>}
            </div>
          </div>
        ))}
      </div>

      {MOCK_MESSAGES.length > 5 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full mt-4 py-3 text-sm font-semibold text-primary hover:bg-primary/5 rounded-xl transition-colors"
        >
          {showAll ? "Ver menos" : `Ver todos os ${MOCK_MESSAGES.length} apoiadores`}
        </button>
      )}
    </div>
  );
}
