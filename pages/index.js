import Link from "next/link";
import { Card, Layout, SEO } from "../components";
import keywordData from "@/data/keywords.json";
import { slugify } from "@/utils/sharedFunctions";
export default function Home() {
  return (
    <div>
      <SEO />
      <Layout>
        <Card>
          <div>All Calculators</div>
          <ul>
            {keywordData.map((family, i) => (
              <li key={i}>
                {family.name}
                <ul className="ml-4">
                  {family.calculators.map((caclculator, i) => (
                    <li className="list-disc" key={i}>
                      <Link
                        href={`${slugify(family.name)}/${slugify(
                          caclculator.name
                        )}/${slugify(caclculator.keywords[0])}`}
                      >
                        {caclculator.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Card>
      </Layout>
    </div>
  );
}
