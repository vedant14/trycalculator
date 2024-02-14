import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "https://api-us-west-2.hygraph.com/v2/cls207uw5000008l35zn57sea/master",
  cache: new InMemoryCache(),
});

// GraphQL query
const GET_POSTS = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
      id
      slug
      title
      content {
        markdown
      }
      coverImage {
        url
      }
    }
  }
`;

// Function to fetch data
export async function getPosts(slug) {
  const { data } = await client.query({
    query: GET_POSTS,
    variables: {
      slug: slug,
    },
  });
  return data.post; // Assuming you want to return the post object
}

export default async function handler(req, res) {
  const slug = req.query.slug;
  const data = await getPosts(slug);
  res.status(200).send(data);
}
