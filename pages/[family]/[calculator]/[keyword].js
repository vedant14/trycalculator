import keywordData from "@/data/keywords.json";
import { SEO, Card, Layout } from "@/components/index";
import { slugify, reverseSlugify } from "@/utils/sharedFunctions";
import { CalculatorDecider } from "@/components/forms";

export async function getStaticPaths() {
  const paths = [];
  keywordData.forEach((family) => {
    family.calculators.forEach((calculator) => {
      calculator.keywords.forEach((keyword) => {
        const familySlug = slugify(family.name);
        const calculatorSlug = slugify(calculator.name);
        const keywordSlug = slugify(keyword);
        paths.push({
          params: {
            family: familySlug,
            calculator: calculatorSlug,
            keyword: keywordSlug,
          },
        });
      });
    });
  });
  return {
    paths,
    fallback: true,
  };
}

export default function CalculatorPage({ calculatorData }) {
  if (!calculatorData) {
    return null;
  }
  return (
    <div>
      <SEO
        title={`${reverseSlugify(calculatorData.keyword)} | ${reverseSlugify(
          calculatorData.calculator
        )} | ${reverseSlugify(calculatorData.family)}`}
      />
      <Layout>
        <Card>
          <CalculatorDecider
            title={calculatorData.keyword}
            calculator={calculatorData.calculator}
          />
        </Card>
      </Layout>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const { family, calculator, keyword } = params;
  const slugifiedFamily = slugify(family);
  const slugifiedCalculator = slugify(calculator);
  const slugifiedKeyword = slugify(keyword);

  // Find the matching data in keywordData
  const familyData = keywordData.find(
    (item) => slugify(item.name) === slugifiedFamily
  );

  if (!familyData) {
    return {
      notFound: true,
    };
  }

  const calculatorData = familyData.calculators.find(
    (item) => slugify(item.name) === slugifiedCalculator
  );

  if (!calculatorData) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      calculatorData: {
        family: slugify(familyData.name),
        calculator: slugify(calculatorData.name),
        keyword: slugifiedKeyword,
      },
    },
  };
}
