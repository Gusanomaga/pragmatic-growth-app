# Affiliate & Commission Engine - Shopify App

Esta es la solución propuesta para el reto técnico de **Converxity**. Un sistema de afiliados para Shopify enfocado en escalabilidad, monetización automatizada y arquitectura robusta.

## 1. Instrucciones de Instalación

Para ejecutar este proyecto en tu entorno local, sigue estos pasos:

1. **Clona el repositorio:**
   ```bash
   git clone [url-del-repo]
   ```
2. **Instala las dependencias:**
   ```bash
   npm install
   ```
3. **Configura las variables de entorno:**
   - Crea un archivo `.env` en la raíz del proyecto (puedes usar `.env.example` como referencia).
4. **Sincroniza la base de datos:**
   ```bash
   npx prisma db push
   ```
5. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

---

## 2. Decisiones de Arquitectura

- **Framework (Remix/React Router):** Elegido por su capacidad de renderizado en el servidor (SSR), fundamental para Shopify, donde la latencia impacta directamente la experiencia del usuario en el Admin.
- **Manejo de Asincronía:** El endpoint `/api/conversion` implementa un patrón "Fire-and-Forget". La validación es temprana para asegurar que el Web Pixel no bloquee el checkout del cliente.
- **Idempotencia:** La lógica de facturación verifica el `orderId` antes de crear un `UsageRecord`, previniendo cobros duplicados si el Web Pixel se dispara dos veces (error común por reintentos de red).

---

## 3. Sustentación de Base de Datos

- **Esquema:** SQLite fue seleccionado para el MVP por su portabilidad. Está diseñado para migrar a PostgreSQL en producción sin cambios estructurales mayores.
- **Escalabilidad y Rendimiento:**
  - **Indexación:** Se implementaron índices en las columnas `ref` y `orderId` para garantizar búsquedas eficientes ($O(log n)$).
  - **Particionamiento:** Para manejar millones de eventos, se propone particionamiento por rangos de fecha (mensual), permitiendo archivar datos antiguos y mantener consultas rápidas.
- **Consistencia:** El flujo de reporte y facturación está diseñado bajo transacciones ACID, asegurando que los datos siempre estén sincronizados.

---

## 4. Sustentación de DevOps y CI/CD

- **Gestión de Entornos:** Uso de variables de entorno para separar dev, staging y prod. La app está preparada para tener URLs de callback distintas configuradas en el Partner Dashboard.
- **Pipeline de CI/CD:**
  - **Lint/Type Check:** Validación de código limpio (ESLint + TypeScript).
  - **Testing:** Ejecución de pruebas unitarias (Vitest).
  - **Build:** Validación de compilación.
  - **Deploy:** Despliegue automático a plataforma cloud (ej. Fly.io, Render).
- **Seguridad:** Uso de Secret Managers para la gestión de API Keys y tokens, garantizando que nunca queden expuestos en el código fuente.

---

## 5. Escalabilidad (Escenario de Alta Concurrencia)

Aunque el MVP utiliza SQLite, para un escenario de Black Friday con miles de transacciones por minuto, la propuesta es:

- **Separación de responsabilidades:** Desacoplar la recepción del evento del Web Pixel (vía un Message Queue como Redis o AWS SQS) para procesar la facturación de forma asíncrona sin saturar la base de datos.
- **Monitoreo:** Implementación de logs estructurados y herramientas como Sentry para detectar errores de API o throttling en tiempo real.

---