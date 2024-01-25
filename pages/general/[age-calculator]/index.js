import { AgeCalculatorForm } from "@/components/forms/AgeCalculatorForm";
import { SEO, Card, Layout } from "@/components/index";

export default function Home() {
  return (
    <div>
      <SEO title="Age Calculator" />
      <Layout>
        <Card>
          <AgeCalculatorForm />
        </Card>
      </Layout>
    </div>
  );
}
