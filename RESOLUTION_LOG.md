# Bitácora de Resolución de Problemas

## Proyecto: Módulo de Gestión de Afiliados
En este documento detallo los retos técnicos enfrentados y las soluciones implementadas durante el desarrollo de la aplicación.

### 1. Desafío de Entorno: Migración a React Router v7
* **Problema:** Adaptar la estructura de archivos al nuevo estándar de React Router v7, eliminando dependencias obsoletas (`@remix-run/node`).
* **Solución:** Refactorización de `loaders` y `actions` para manejar las respuestas de forma nativa. Se eliminó la dependencia de `json()` y se ajustó el enrutamiento para asegurar compatibilidad total con la nueva arquitectura.

### 2. Desafío de Contexto: TypeError en Polaris
* **Problema:** Error `TypeError: Cannot read properties of null (reading 'useContext')` al renderizar componentes de Polaris.
* **Diagnóstico:** Los componentes UI de Polaris (DataTable, TextField) carecían del contexto necesario porque no estaban envueltos en los Providers requeridos dentro del layout (`app/routes/app.tsx`).
* **Solución:** Implementación de la jerarquía correcta de proveedores (`AppProvider` de Shopify y `PolarisProvider`). Se añadieron los estilos globales necesarios (`@shopify/polaris/build/esm/styles.css`) para habilitar el sistema de diseño nativo.

### 3. Mejora Funcional: Dashboard de Métricas
* **Desafío:** Añadir valor analítico más allá de un simple formulario de entrada de datos.
* **Solución:** Implementación de lógica de agregación en el `loader` y renderizado de métricas en tiempo real (Total de Afiliados y Comisión Promedio) utilizando componentes de `Polaris` (Card, Text, BlockStack).