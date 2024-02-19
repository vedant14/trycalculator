import { Layout, SEO } from "@/components";
import axios from "axios";
import Link from "next/link";

export async function getBlogs() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/api/get-paths`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching blog content:", error);
    return null;
  }
}

export async function getStaticProps() {
  const blogs = await getBlogs();
  return { props: { blogs }, notFound: !blogs };
}

export default function AllBlogs({ blogs }) {
  return (
    <Layout>
      <SEO title="All blogs" />
      <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="absolute inset-0">
          <div className="bg-white h-4/5" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
              From the blog
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Best content on calculators from the web
            </p>
          </div>
          <div className="my-12 max-w-lg mx-auto lg:max-w-none">
            {blogs.map((post) => (
              <Link
                href={`/blogs/${post.slug}`}
                key={post.id}
                className="grid gap-5 my-12 lg:grid-cols-2 flex-col rounded-lg shadow-lg overflow-hidden"
              >
                <div className="flex-shrink-0">
                  <img
                    className="h-full w-full object-cover"
                    src={post.coverImage.url}
                    alt=""
                  />
                </div>
                <div className="flex-1 bg-white justify-between">
                  <div className="flex-1">
                    <div className="block mt-2">
                      <p className="text-xl font-semibold text-gray-900">
                        {post.title?.substring(0, 100).concat("...")}
                      </p>
                      <p className="mt-3 text-base text-gray-500">
                        {post.description?.substring(0, 150).concat("...")}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center">
                    <div className="flex-shrink-0">
                      <span className="sr-only">{post.author?.name}</span>
                      {post.author?.picture?.url && (
                        <img
                          className="h-10 w-10 rounded-full"
                          src={post.author?.picture?.url}
                          alt={post.author?.name}
                        />
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {post.author?.name}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
