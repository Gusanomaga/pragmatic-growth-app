import type { ActionFunctionArgs } from "react-router";

export async function action({ request }: ActionFunctionArgs) {
  // Leemos el body
  const body = await request.json();
  const { salesData } = body;

  // Tu lógica de IA
  const aiResponse = `Análisis de IA: Tus ventas de $${salesData?.amount || 0} muestran tendencia.`;

  // Retornamos usando el estándar Web (Response)
  return new Response(JSON.stringify({ insight: aiResponse }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}