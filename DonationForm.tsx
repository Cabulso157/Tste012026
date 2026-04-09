import { useState } from "react";
import { Shield, Loader2 } from "lucide-react";
import {
  FunctionsFetchError,
  FunctionsHttpError,
  FunctionsRelayError,
} from "@supabase/supabase-js";
import { PixModal } from "./PixModal";
import { supabase } from "@/integrations/supabase/client";

interface DonationFormProps {
  goalAmount: number;
  raisedAmount: number;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

export function DonationForm({ goalAmount, raisedAmount }: DonationFormProps) {
  const [customAmount, setCustomAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [message, setMessage] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [participateRaffle, setParticipateRaffle] = useState(false);
  const [showPixModal, setShowPixModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [pixData, setPixData] = useState({ code: "", base64: "", image: "", transactionId: "" });

  const progressPercentage = Math.min((raisedAmount / goalAmount) * 100, 100);

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value) {
      const numValue = parseInt(value) / 100;
      setCustomAmount(numValue.toFixed(2).replace(".", ","));
    } else {
      setCustomAmount("");
    }
  };

  const handleAmountBlur = () => {
    if (customAmount) {
      const numValue = parseFloat(customAmount.replace(",", ".")) || 0;
      if (numValue > 0 && numValue < 5) setCustomAmount("5,00");
    }
  };

  const getFinalAmount = () => (customAmount ? parseFloat(customAmount.replace(",", ".")) || 0 : 0);
  const getTotalAmount = () => {
    const base = getFinalAmount();
    return participateRaffle ? base + 10 : base;
  };

  const resolveFunctionError = async (err: unknown) => {
    if (err instanceof FunctionsHttpError) {
      const payload = await err.context.json().catch(async () => ({
        error: await err.context.text().catch(() => null),
      }));

      return payload?.error || payload?.message || "Erro ao gerar PIX";
    }

    if (err instanceof FunctionsRelayError || err instanceof FunctionsFetchError) {
      return "Não foi possível falar com o serviço de pagamento. Tente novamente em alguns segundos.";
    }

    if (err instanceof Error) {
      return err.message;
    }

    return "Erro ao gerar o pagamento PIX. Tente novamente.";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = getTotalAmount();

    if (amount < 5) {
      setError("O valor mínimo para doação é R$ 5,00");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const { data, error: fnError } = await supabase.functions.invoke("sigilopay-pix", {
        body: {
          amount,
          donorName: isAnonymous ? "Anônimo" : donorName || "Doador",
          message,
          whatsapp,
          participateRaffle,
        },
      });

      if (fnError) throw fnError;
      if (!data || data.error) throw new Error(data?.error || "Erro ao gerar PIX");

      setPixData({
        code: data.pix?.code || "",
        base64: data.pix?.base64 || "",
        image: data.pix?.image || "",
        transactionId: data.transactionId || "",
      });
      setShowPixModal(true);
    } catch (err) {
      console.error("Erro ao gerar PIX:", err);
      setError(await resolveFunctionError(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <aside className="lg:sticky lg:top-20" id="donation-form">
        <div className="campaign-card">
          <div className="mb-4 animate-slide-up">
            <h3 className="text-xl font-extrabold text-foreground leading-snug mb-1">
              <span className="animate-heartbeat inline-block">💚</span> Lucas precisa de ajuda urgente!
            </h3>
            <p className="text-3xl font-extrabold text-foreground mb-1">
              <span className="gradient-text">{formatCurrency(raisedAmount)}</span>
            </p>
            <p className="text-sm text-muted-foreground">arrecadados de {formatCurrency(goalAmount)}</p>
          </div>

          <div className="progress-wrap mb-2">
            <div className="progress-bar" style={{ width: `${progressPercentage}%` }} />
          </div>
          <p className="text-xs font-bold text-muted-foreground uppercase mb-6">
            {progressPercentage.toFixed(1)}% COMPLETO
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="animate-scale-in" style={{ animationDelay: "0.1s" }}>
              <label className="block text-sm font-bold text-primary uppercase tracking-wide mb-2">
                <span className="animate-float inline-block">💰</span> VALOR A SER DOADO:
              </label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold text-lg transition-transform group-focus-within:scale-110">R$</span>
                <input
                  type="text"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  onBlur={handleAmountBlur}
                  placeholder="5,00"
                  className="w-full border-2 border-primary/30 rounded-xl py-4 pl-14 pr-4 text-lg font-semibold bg-card focus:border-primary focus:outline-none transition-all placeholder:text-muted-foreground/50 focus:shadow-lg focus:shadow-primary/10"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-secondary-foreground uppercase tracking-wide mb-2">SEU NOME</label>
              <input
                type="text"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                placeholder="Digite seu nome completo"
                disabled={isAnonymous}
                className="w-full border border-border rounded-xl py-3.5 px-4 text-sm bg-card focus:border-primary focus:outline-none transition-all disabled:opacity-50 placeholder:text-muted-foreground"
              />
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-5 h-5 rounded border-border text-primary focus:ring-primary accent-primary"
              />
              <span className="text-sm text-foreground font-medium">Doar anonimamente</span>
            </label>

            <div>
              <label className="block text-xs font-bold text-secondary-foreground uppercase tracking-wide mb-2">MENSAGEM (OPCIONAL)</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, 300))}
                placeholder="Mensagem de apoio (sua mensagem aparecerá após o pagamento 💚)"
                rows={3}
                className="w-full border border-border rounded-xl py-3 px-4 text-sm bg-card focus:border-primary focus:outline-none transition-all resize-none placeholder:text-muted-foreground"
              />
              <p className="text-right text-xs text-muted-foreground mt-1">{message.length}/300</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-secondary-foreground uppercase tracking-wide mb-2">INSIRA TEU WHATSAPP PARA PARTICIPAR DO SORTEIO DO IPHONE</label>
              <input
                type="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="11 00000-0000"
                className="w-full border border-border rounded-xl py-3.5 px-4 text-sm bg-card focus:border-primary focus:outline-none transition-all placeholder:text-muted-foreground"
              />
            </div>

            <div className="animate-scale-in" style={{ animationDelay: "0.4s" }}>
              <p className="text-xs font-bold text-secondary-foreground uppercase tracking-wide mb-3">CONCORRA A 3 IPHONE 17 PRO MAX 256GB!</p>
              <label className={`flex items-start gap-3 cursor-pointer border-2 rounded-xl p-4 bg-card transition-all duration-300 hover-lift ${participateRaffle ? "border-primary bg-primary/5 shadow-lg shadow-primary/10" : "border-border hover:border-primary/50"}`}>
                <input
                  type="checkbox"
                  checked={participateRaffle}
                  onChange={(e) => setParticipateRaffle(e.target.checked)}
                  className="w-5 h-5 mt-1 rounded border-border text-primary focus:ring-primary accent-primary flex-shrink-0"
                />
                <div className="flex items-center gap-3">
                  <div className={`w-24 h-20 rounded-lg overflow-hidden flex-shrink-0 transition-transform duration-300 ${participateRaffle ? "scale-110 animate-float" : ""}`}>
                    <img src="/iphone-raffle.jpeg" alt="iPhone 17 Pro Max - Sorteio" className="w-full h-full object-cover" />
                  </div>
                  <p className="text-sm text-foreground font-semibold leading-snug">
                    Por apenas <strong className="text-primary">R$10 a mais</strong>, participe do sorteio de 3 iPhone 17 Pro Max 256GB.
                  </p>
                </div>
              </label>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Marque esta opção para adicionar R$10 à sua doação e garantir sua participação no sorteio. Serão sorteados <strong>3 (três)</strong> aparelhos — ganhadores serão contatados via WhatsApp.
              </p>
            </div>

            <div className="pt-2">
              <p className="text-lg font-bold text-foreground">
                Total: <span className="text-xl">{formatCurrency(getTotalAmount())}</span>
              </p>
            </div>

            {error && <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg">{error}</div>}

            <button
              type="submit"
              disabled={isLoading || getTotalAmount() < 5}
              className="btn-primary w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-base uppercase tracking-wide shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover-glow"
            >
              {isLoading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> GERANDO PIX...</>
              ) : (
                <><Shield className="w-5 h-5" /> DOAR VIA PIX</>
              )}
            </button>

            <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1.5">
              <Shield className="w-3.5 h-3.5" /> Pagamento seguro via PIX
            </p>
          </form>
        </div>
      </aside>

      <PixModal
        isOpen={showPixModal}
        onClose={() => setShowPixModal(false)}
        amount={getTotalAmount()}
        pixCode={pixData.code}
        pixBase64={pixData.base64}
        pixImage={pixData.image}
        transactionId={pixData.transactionId}
      />
    </>
  );
}
