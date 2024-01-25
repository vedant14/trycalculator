import { AgeCalculatorForm } from "@/components/forms/AgeCalculatorForm";
import { SEO, Card, Layout } from "@/components/index";

export default function AgeCalculatorTemplate({ params }) {
  console.log(params);
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
