const API_URL = process.env.WORDPRESS_API_URL;

async function fetchAPI(query: string, { variables }: { variables?: any } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  if (!API_URL) {
    throw new Error('WORDPRESS_API_URL is not defined in environment variables');
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
    // next: { revalidate: 60 }, // Cache for 60 seconds
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }
  return json.data;
}

export async function getAllPosts(first = 10, after?: string) {
  const data = await fetchAPI(
    `
    query AllPosts($first: Int, $after: String) {
      posts(first: $first, after: $after, where: { orderby: { field: DATE, order: DESC } }) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          title
          excerpt
          slug
          date
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          author {
            node {
              name
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        first,
        after,
      },
    }
  );
  return data?.posts;
}

export async function getPostBySlug(slug: string) {
  const data = await fetchAPI(
    `
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        title
        excerpt
        content
        slug
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        author {
          node {
            name
            avatar {
              url
            }
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
      }
    }
  `,
    {
      variables: {
        id: slug,
        idType: 'SLUG',
      },
    }
  );
  return data?.post;
}

export async function getPostsByCategory(categorySlug: string) {
  const data = await fetchAPI(
    `
    query PostsByCategory($id: ID!) {
      category(id: $id, idType: SLUG) {
        name
        description
        posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
          nodes {
            title
            excerpt
            slug
            date
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            author {
              node {
                name
              }
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        id: categorySlug,
      },
    }
  );
  return data?.category;
}

export async function getPostsByTag(tagSlug: string) {
  const data = await fetchAPI(
    `
    query PostsByTag($id: ID!) {
      tag(id: $id, idType: SLUG) {
        name
        description
        posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
          nodes {
            title
            excerpt
            slug
            date
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            author {
              node {
                name
              }
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        id: tagSlug,
      },
    }
  );
  return data?.tag;
}

export async function getPostsBySearch(searchTerm: string) {
  const data = await fetchAPI(
    `
    query PostsBySearch($search: String!) {
      posts(first: 20, where: { search: $search, orderby: { field: DATE, order: DESC } }) {
        nodes {
          title
          excerpt
          slug
          date
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          author {
            node {
              name
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        search: searchTerm,
      },
    }
  );
  return data?.posts?.nodes;
}

export async function getAllCategories() {
  const data = await fetchAPI(
    `
    query AllCategories {
      categories(first: 20, where: { hideEmpty: true }) {
        nodes {
          name
          slug
          count
        }
      }
    }
    `
  );
  return data?.categories?.nodes;
}

export async function getAllTags() {
  const data = await fetchAPI(
    `
    query AllTags {
      tags(first: 30, where: { hideEmpty: true }) {
        nodes {
          name
          slug
          count
        }
      }
    }
    `
  );
  return data?.tags?.nodes;
}
