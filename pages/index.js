import { ApolloClient, InMemoryCache, gql } from "@apollo/client"

export default function Home({ posts }) {
  return (
    <>
      <main className="main">
        <h2 className="header-main">Blog post from hashnode API</h2>
        <div className="card-container">
          {posts.map((post) => {
            return (
              <div key={post._id} className="uenmedia">
                <a href={`https://blog.uenmedia.de/${post.slug}`}>
                  <div className="uenmedia-image">
                    <img src={post.coverImage} alt={post.title} />
                  </div>
                  <div className="description">
                    <h2>{post.title}</h2>
                    <p>{post.brief}</p>
                  </div>
                </a>
              </div>
            )
          })}
        </div>
      </main>
    </>
  )
}

export async function getStaticProps(context) {
  const client = new ApolloClient({
    uri: "https://api.hashnode.com/",
    cache: new InMemoryCache(),
  })

  const { data } = await client.query({
    query: gql`
      query GetPosts {
        user(username: "uenmedia") {
          publication {
            posts(page: 0) {
              _id
              coverImage
              slug
              brief
              title
              author {
                username
              }
            }
          }
        }
      }
    `,
  })

  return {
    props: {
      posts: data.user.publication.posts,
    },
  }
}
