import type { HeadersFunction, LoaderFunctionArgs } from "react-router";
import { Outlet, useLoaderData, useRouteError } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { AppProvider } from "@shopify/shopify-app-react-router/react";
// 1. IMPORTA EL PROVIDER Y LOS ESTILOS DE POLARIS
import { AppProvider as PolarisProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import translations from "@shopify/polaris/locales/en.json"; // Puedes cambiar a es.json si prefieres

import { authenticate } from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);
  return { apiKey: process.env.SHOPIFY_API_KEY || "" };
};

export default function App() {
  const { apiKey } = useLoaderData<typeof loader>();

  return (
    // 2. ENVUELVE TODO EN POLARIS PROVIDER
    <PolarisProvider i18n={translations}>
        <AppProvider embedded apiKey={apiKey}>
          <s-app-nav>
            <s-link href="/app">Home</s-link>
            <s-link href="/app/additional">Additional page</s-link>
          </s-app-nav>
          <Outlet />
        </AppProvider>
    </PolarisProvider>
  );
}

export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};