import { Layout, SEO } from "@/components";
import axios from "axios";
import ReactMarkdown from "react-markdown";

export async function getAllPaths() {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/get-paths`);
    return res.data.map((path) => {
      return {
        params: {
          blog: path.slug,
        },
      };
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getStaticPaths() {
  const paths = await getAllPaths();
  return {
    paths: paths,
    fallback: true, // false or "blocking"
  };
}

export async function getPostContent() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/api/get-blogs`,
      {
        params: { slug: "age-calculator" },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getStaticProps() {
  const blog = await getPostContent();
  return { props: { blog } };
}

export default function Page({ blog }) {
  if (!blog) return null;
  return (
    <Layout>
      <SEO title={blog.title} description={blog.title} />
      <p className="text-xl my-4 font-medium">{blog.title}</p>
      <article className="prose">
        <ReactMarkdown>{blog.content.markdown}</ReactMarkdown>
      </article>
    </Layout>
  );
}
