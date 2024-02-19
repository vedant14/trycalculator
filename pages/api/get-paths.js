import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "https://api-us-west-2.hygraph.com/v2/cls207uw5000008l35zn57sea/master",
  cache: new InMemoryCache(),
});

// GraphQL query
const GET_POSTS = gql`
  query Posts {
    posts {
      id
      slug
      title
      coverImage {
        url(transformation: { image: { resize: { height: 300, width: 400 } } })
      }
      author {
        title
        name
        picture {
          url(transformation: { image: { resize: { height: 30, width: 30 } } })
        }
      }
    }
  }
`;

// Function to fetch data
export async function getPosts() {
  const { data } = await client.query({
    query: GET_POSTS,
  });
  return data.posts;
}

export default async function handler(req, res) {
  const data = await getPosts();
  res.status(200).send(data);
}
