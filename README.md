Shopify App: Affiliate & Commission Engine
MVP de aplicación de afiliados para Shopify. Este proyecto demuestra capacidades de integración técnica, manejo de APIs de Shopify y arquitectura escalable.

🚀 Módulo Custom: Gestión de Afiliados
Este módulo permite la gestión centralizada de afiliados, facilitando el registro y visualización de datos.

Tecnologías Clave
Framework: React Router v7

UI/UX: Shopify Polaris (Components: Page, Layout, Card, DataTable)

Base de Datos: Prisma ORM (SQLite local / PostgreSQL prod)

Backend: Shopify App Framework (Node.js)

Implementación y Logros Técnicos
Migración a React Router v7: Adaptación a la estructura moderna de enrutamiento, optimizando el ciclo de vida de los datos.

Sistema de Diseño (Polaris): Integración completa para asegurar una experiencia de usuario nativa y profesional.

Persistencia: Implementación de modelos CRUD con Prisma para la gestión de afiliados.

Resolución de Errores: Corrección crítica de jerarquía de contextos (AppProvider) para asegurar la estabilidad de los componentes Polaris.

🏗 Sustentación Técnica (Converxity Challenge)
1. Decisiones de Arquitectura
Patrón de Procesamiento: Para el sistema de Billing, implemento una arquitectura asíncrona. Cuando el Web Pixel reporta una venta, el evento se procesa y el UsageRecord se crea en background. Esto asegura que el checkout del cliente nunca se bloquee, garantizando idempotencia mediante el uso de IDs de transacción únicos para evitar cargos duplicados.

Seguridad: Implementación de validación de firmas (HMAC) en las peticiones del Web Pixel para asegurar que los datos provienen legítimamente de Shopify.

2. Base de Datos y Escalabilidad
Migración: El MVP utiliza SQLite para agilidad local. En producción, la migración a PostgreSQL es mandatoria.

Estrategia de Datos: * Indexación: Índices B-Tree en shop_id y affiliate_id para garantizar consultas rápidas bajo alta carga.

Particionamiento: Para manejar millones de registros de eventos, aplicaré RANGE partitioning por fecha, permitiendo que los datos históricos se archiven sin impactar el rendimiento de lectura.

Integridad: Las transacciones ACID aseguran que la creación del cargo de facturación y el registro de la venta sean atómicos.

3. DevOps y Gestión de Entornos
Estrategia: Desarrollo en entornos aislados (Local/Staging/Prod).

CI/CD (GitHub Actions): Flujo de trabajo automatizado que incluye:

Linting & Typing: eslint y tsc para asegurar calidad.

Test Suite: Ejecución de pruebas unitarias.

Security: npm audit para vulnerabilidades.

Deployment: Despliegue automático a plataforma cloud (ej. Fly.io o Render) tras aprobación en staging.

Secretos: Rotación de secretos mediante variables de entorno inyectadas en tiempo de ejecución, nunca persistidas en el repositorio.

4. Escalabilidad y Alta Concurrencia
Throttling: Ante rate limits de la API de Shopify, implemento un sistema de reintentos con exponential backoff en las peticiones GraphQL.

Alta Concurrencia: Para escenarios de Black Friday, la arquitectura soporta escalabilidad horizontal. La aplicación está diseñada para ser stateless, permitiendo levantar múltiples instancias del backend que consumen de una cola de mensajes (Redis/BullMQ) para procesar los cargos de facturación de forma desacoplada.

🛠 Documentación del Template (Shopify)
(Referencia para despliegue y configuración)

Visit the shopify.dev documentation for more details on the React Router app package.

Local Development
Shell
shopify app dev