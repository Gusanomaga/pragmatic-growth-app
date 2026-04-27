import { register } from "@shopify/web-pixels-extension";

register(({ analytics, browser, init }) => {
  // 1. Capturar el 'ref' desde la URL cuando el usuario aterriza
  const url = new URL(init.context.document.location.href);
  const affiliateRef = url.searchParams.get('ref');

  if (affiliateRef) {
    // Guardamos en sessionStorage de forma segura dentro del sandbox
    browser.sessionStorage.setItem('affiliate_ref', affiliateRef);
  }

  // 2. Suscribirse al evento de compra completada
  analytics.subscribe('checkout_completed', async (event) => {
    // Recuperamos el afiliado que guardamos al principio
    const ref = await browser.sessionStorage.getItem('affiliate_ref');

    // Extraemos datos usando encadenamiento opcional (?.) para evitar errores de null
    const orderId = event.data.checkout.order?.id;
    const total = event.data.checkout.totalPrice?.amount;
    const currency = event.data.checkout.totalPrice?.currencyCode;

    // Verificamos que tengamos la referencia y el ID de la orden antes de reportar
    if (ref && orderId) {
      fetch('https://tu-codigo-unico.trycloudflare.com/api/conversion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ref: ref,
          orderId: orderId,
          total: total,
          currency: currency
        })
      }).catch(err => console.error('Error reportando venta:', err));
    }
  });
});