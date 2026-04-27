import { redirect, type ActionFunctionArgs } from "react-router";
import { useLoaderData, Form } from "react-router";
import { Page, Layout, Card, TextField, Button, DataTable, Text, BlockStack } from "@shopify/polaris";
import { prisma } from "../db.server";

// 1. CARGAR DATOS
export async function loader() {
  const affiliates = await prisma.affiliate.findMany();
  return { affiliates };
}

// 2. PROCESAR ACCIONES
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const couponCode = formData.get("couponCode") as string;
  const commissionRate = parseFloat(formData.get("commissionRate") as string);

  await prisma.affiliate.create({
    data: { name, email, couponCode, commissionRate },
  });

  return redirect("/app/affiliates");
}

// 3. VISTA
export default function Affiliates() {
  const { affiliates } = useLoaderData<typeof loader>();

  // Lógica de Dashboard (Cálculo de métricas)
  const totalAffiliates = affiliates.length;
  const totalCommission = affiliates.reduce((sum, a) => sum + (a.commissionRate || 0), 0);
  const avgCommission = totalAffiliates > 0 ? (totalCommission / totalAffiliates).toFixed(1) : 0;

  return (
    <Page title="Gestión de Afiliados">
      <Layout>
        {/* --- Dashboard de Resumen --- */}
        <Layout.Section>
          <Card>
            <BlockStack gap="200">
              <Text variant="headingMd" as="h2">Resumen de Afiliados</Text>
              <Text variant="bodyMd" as="p">
                Total registrado: <strong>{totalAffiliates}</strong> | 
                Comisión promedio: <strong>{avgCommission}%</strong>
              </Text>
            </BlockStack>
          </Card>
        </Layout.Section>

        {/* --- Formulario --- */}
        <Layout.Section>
          <Card>
            <Form method="post">
              <BlockStack gap="400">
                <TextField label="Nombre" name="name" autoComplete="off" />
                <TextField label="Email" name="email" type="email" autoComplete="off" />
                <TextField label="Cupón" name="couponCode" autoComplete="off" />
                <TextField label="Comisión (%)" name="commissionRate" type="number" autoComplete="off" />
                <Button submit variant="primary">Guardar Afiliado</Button>
              </BlockStack>
            </Form>
          </Card>
        </Layout.Section>

        {/* --- Tabla --- */}
        <Layout.Section>
          <Card>
            <DataTable
              columnContentTypes={['text', 'text', 'text', 'numeric']}
              headings={['Nombre', 'Email', 'Cupón', 'Comisión']}
              rows={affiliates.map((a) => [
                a.name, 
                a.email, 
                a.couponCode, 
                `${a.commissionRate}%`
              ])}
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}