import { prisma as db } from "../db.server";

export const action = async ({ request }: { request: Request }) => {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const { ref, orderId, total, currency } = await request.json();

  try {
    // 1. Buscamos al afiliado en la base de datos por su couponCode (el 'ref' que mandaste)
    const affiliate = await db.affiliate.findUnique({
      where: { couponCode: ref },
    });

    if (!affiliate) {
      return new Response("Affiliate not found", { status: 404 });
    }

    // 2. Calculamos la comisión (suponiendo que commissionRate es 0.10 para 10%)
    const commissionAmount = parseFloat(total) * affiliate.commissionRate;

    // 3. Guardamos la comisión
    await db.commission.create({
      data: {
        orderId: orderId.toString(),
        amount: commissionAmount,
        status: "PENDING",
        affiliateId: affiliate.id,
      },
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error guardando conversión:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};