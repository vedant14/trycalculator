import Link from "next/link";
import { Card, Layout, SEO } from "../components";
import keywordData from "@/data/keywords.json";
import { slugify } from "@/utils/sharedFunctions";
export default function Home() {
  return (
    <div>
      <SEO />
      <Layout>
        <amp-ad
          width="100vw"
          height="320"
          type="adsense"
          data-ad-client="ca-pub-9462943595284125"
          data-ad-slot="7044592325"
          data-auto-format="rspv"
          data-full-width=""
        >
          <div overflow=""></div>
        </amp-ad>
        <Card>
          <div className="text-xl">All Calculators</div>
          <ul>
            {keywordData.map((family, i) => (
              <li key={i}>
                {family.name}
                <ul className="ml-4">
                  {family.calculators.map((caclculator, i) => (
                    <li className="list-disc" key={i}>
                      <Link
                        className="underline"
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
