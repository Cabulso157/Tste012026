const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SIGILOPAY_BASE_URL = "https://app.sigilopay.com.br/api/v1";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const publicKey = "cordeiromario531_3jiv7btusbl9zqwo";
    const secretKey = "sgan8feo9et9hnh2k52b5j5egu23pvxayhaw7wslafdu8nlt4gygekldr5psbo8k";

    const body = await req.json();
    const { amount, donorName, message, whatsapp, participateRaffle } = body ?? {};

    if (typeof amount !== "number" || !Number.isFinite(amount) || amount < 5) {
      return json({ error: "Valor mínimo é R$ 5,00" }, 400);
    }

    const identifier = `DOA_${Date.now()}_${crypto.randomUUID().slice(0, 8)}`;

    const payload = {
      identifier,
      amount: Number(amount),
      client: {
        name: typeof donorName === "string" && donorName.trim() ? donorName.trim() : "Doador Anônimo",
        email: "doacao@campanha.com",
        phone: typeof whatsapp === "string" && whatsapp.trim() ? whatsapp.trim() : "11999999999",
        document: "12345678909",
      },
    };

    const response = await fetch(`${SIGILOPAY_BASE_URL}/gateway/pix/receive`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-public-key": publicKey,
        "x-secret-key": secretKey,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return json(
        {
          error: data?.message || "Erro ao gerar PIX",
          details: data,
        },
        response.status,
      );
    }

    return json({
      transactionId: data?.transactionId,
      status: data?.status,
      pix: data?.pix,
      order: data?.order,
    });
  } catch (error) {
    console.error("Edge function error:", error);
    return json({ error: "Erro interno do servidor" }, 500);
  }
});
