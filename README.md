# Shopify App: Affiliate Management Module

Este proyecto es una aplicación de Shopify construida con [React Router](https://reactrouter.com/), integrada con el sistema de diseño [Shopify Polaris](https://shopify.dev/docs/api/app-home/polaris-web-components) y [Prisma ORM](https://www.prisma.io/).

---

## 🚀 Módulo Custom: Gestión de Afiliados

Este módulo permite la gestión centralizada de afiliados para la aplicación, facilitando el registro y la visualización de datos en tiempo real.

### Tecnologías Clave
- **Framework:** React Router v7
- **UI/UX:** Shopify Polaris (Components: Page, Layout, Card, TextField, DataTable)
- **Base de Datos:** Prisma ORM
- **Backend:** Shopify App Framework (Node.js)

### Implementación y Logros Técnicos
1. **Migración a React Router v7:** Adaptación de la estructura del proyecto para eliminar dependencias obsoletas y optimizar el ciclo de vida de los datos (`loaders` y `actions`).
2. **Sistema de Diseño (Polaris):** Integración completa del sistema de diseño de Shopify para asegurar una experiencia de usuario nativa.
3. **Persistencia de Datos:** Implementación de modelos en Prisma para el manejo CRUD de afiliados.
4. **Resolución de Contexto:** Corrección crítica del error `TypeError: Cannot read properties of null (reading 'useContext')` mediante la configuración de jerarquía de proveedores (`AppProvider` de Polaris) en el layout principal.
5. **Flujo de Trabajo:** Desarrollo completo de formulario frontend conectado a acciones backend, asegurando la actualización reactiva de la tabla de visualización.

---

## 🛠 Documentación del Template (Shopify)

*(Esta sección se mantiene del template original para referencia de despliegue y configuración)*

Visit the [`shopify.dev` documentation](https://shopify.dev/docs/api/shopify-app-react-router) for more details on the React Router app package.

### Local Development
```shell
shopify app dev