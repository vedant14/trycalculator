import axios from "axios";
import { format } from "date-fns";
import keywordData from "@/data/keywords.json";
import { slugify } from "@/utils/sharedFunctions";

const EXTERNAL_DATA_URL = "https://www.trycalculator.online";

async function getAllPostPaths() {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/get-paths`);
    return res.data.map((path) => ({
      params: { blog: path.slug },
    }));
  } catch (error) {
    console.error("Error fetching post paths:", error);
    return [];
  }
}

async function generatePaths() {
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

  const blogPaths = await getAllPostPaths();
  blogPaths.forEach((blog) => {
    paths.push(`${EXTERNAL_DATA_URL}/blog/${blog.params.blog}`);
  });

  return paths;
}

function generateSiteMap(paths) {
  const manualURLs = ["https://www.trycalculator.online"];
  const allURLs = [...manualURLs, ...paths];
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allURLs
      .map(
        (url) => `
     <url>
       <loc>${url}</loc>
       <lastmod>${format(new Date(), "yyyy-MM-dd")}</lastmod>
     </url>
   `
      )
      .join("")}
  </urlset>`;
}

export async function getServerSideProps({ res }) {
  try {
    const paths = await generatePaths();
    const sitemap = generateSiteMap(paths);

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();
  } catch (error) {
    console.error("Error generating sitemap:", error);
    res.status(500).end();
  }

  return {
    props: {},
  };
}

export default function SiteMap() {
  return null; // This component doesn't render anything
}
