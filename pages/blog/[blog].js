import { Layout, SEO } from "@/components";
import axios from "axios";
import ReactMarkdown from "react-markdown";

export async function getAllPaths() {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/get-paths`);
    return res.data.map((path) => ({
      params: { blog: path.slug },
    }));
  } catch (error) {
    console.error("Error fetching paths:", error);
    return [];
  }
}

export async function getStaticPaths() {
  const paths = await getAllPaths();
  return {
    paths: paths,
    fallback: true, // false or "blocking"
  };
}

export async function getPostContent(slug) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/api/get-blogs`,
      { params: { slug } }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching blog content:", error);
    return null;
  }
}

export async function getStaticProps({ params }) {
  const { blog: slug } = params;
  const blog = await getPostContent(slug);
  return { props: { blog }, notFound: !blog };
}

export default function Page({ blog }) {
  if (!blog) {
    return (
      <Layout>
        <SEO title="Page Not Found" />
        <div className="text-center">
          <h1 className="text-3xl font-bold">Page Not Found</h1>
          <p className="text-lg mt-4">
            Sorry, the requested page does not exist.
          </p>
        </div>
      </Layout>
    );
  }

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
