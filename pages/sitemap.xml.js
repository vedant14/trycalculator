import keywordData from "@/data/keywords.json";
import { slugify } from "@/utils/sharedFunctions";
import { format } from "date-fns";
const EXTERNAL_DATA_URL = "https://www.trycalculator.online";
function generateSiteMap(paths) {
  const manualURLs = ["https://www.trycalculator.online"];
  const allURLs = [...manualURLs, ...paths];
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allURLs
      .map((url) => {
        return `
     <url>
       <loc>${url}</loc>
       <lastmod>${format(new Date(), "yyyy-MM-dd")}</lastmod>
     </url>
   `;
      })
      .join("")}
  </urlset>`;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const paths = [];
  keywordData.forEach((family) => {
    family.calculators.forEach((calculator) => {
      calculator.keywords.forEach((keyword) => {
        const familySlug = slugify(family.name);
        const calculatorSlug = slugify(calculator.name);
        const keywordSlug = slugify(keyword);
        paths.push(
          `${EXTERNAL_DATA_URL}/${familySlug}/${calculatorSlug}/${keywordSlug}`
        );
      });
    });
  });

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(paths);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
