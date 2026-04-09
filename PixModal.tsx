import { useState } from "react";
import { X, Copy, Check } from "lucide-react";

interface PixModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  pixCode: string;
  pixBase64: string;
  pixImage: string;
  transactionId: string;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

export function PixModal({ isOpen, onClose, amount, pixCode, pixBase64, pixImage, transactionId }: PixModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    if (!pixCode) return;
    try {
      await navigator.clipboard.writeText(pixCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = pixCode;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const qrSrc = pixBase64
    ? (pixBase64.startsWith("data:") ? pixBase64 : `data:image/png;base64,${pixBase64}`)
    : pixImage || `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(pixCode)}`;

  return (
    <div
      className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-card rounded-2xl max-w-md w-full p-6 relative shadow-2xl animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-border transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-center text-2xl font-bold text-sky-600 mb-1">Quase lá!</h2>
        <p className="text-center text-secondary-foreground text-sm mb-5">
          Doação de <span className="text-sky-600 font-bold">{formatCurrency(amount)}</span> via <span className="text-sky-600 font-semibold">PIX</span>
        </p>

        <div className="flex justify-center mb-5">
          <div className="w-52 h-52 border-2 border-border rounded-lg bg-card p-2.5 flex items-center justify-center">
            <img src={qrSrc} alt="QR Code PIX" className="w-[180px] h-[180px] rounded" />
          </div>
        </div>

        <div className="mb-4">
          <p className="text-foreground text-sm font-semibold mb-2 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-sky-600 text-card text-xs flex items-center justify-center font-bold">1</span>
            Copie o código:
          </p>
          <div className="bg-muted border border-border rounded-md p-2.5 font-mono text-xs text-muted-foreground break-all max-h-16 overflow-y-auto mb-2">
            {pixCode}
          </div>
          <button
            onClick={handleCopy}
            className={`w-full py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
              copied ? "bg-green-500 text-card" : "bg-sky-600 text-card hover:bg-sky-700"
            }`}
          >
            {copied ? (<><Check className="w-5 h-5" /> COPIADO!</>) : (<><Copy className="w-5 h-5" /> COPIAR CÓDIGO</>)}
          </button>
        </div>

        <div className="bg-muted rounded-lg p-3 text-xs text-secondary-foreground leading-relaxed">
          <p className="mb-1"><strong className="text-sky-600">2.</strong> Abra seu banco e escolha <strong>PIX Copia e Cola</strong></p>
          <p><strong className="text-sky-600">3.</strong> Confirme o pagamento no seu aplicativo</p>
        </div>

        <div className="mt-4 text-center py-2 bg-amber-50 rounded-md text-amber-700 text-xs font-medium flex items-center justify-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          Aguardando pagamento...
        </div>

        {transactionId && (
          <p className="text-center text-xs text-muted-foreground mt-2">ID: {transactionId}</p>
        )}
      </div>
    </div>
  );
}
