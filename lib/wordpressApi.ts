if (process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

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
  /*
   * GraphQL responses can contain both data and errors.
   * If data is present, we return it but log errors.
   * If strictly no data and only errors, we throw.
   */
  if (json.errors) {
    console.error('WPGraphQL Errors:', json.errors);
    if (!json.data) {
      throw new Error('Failed to fetch API: ' + json.errors[0]?.message || 'Unknown error');
    }
  }
  return json.data;
}

export async function getAllPosts(first?: number, after?: string, last?: number, before?: string) {
  // Default to first: 10 if no pagination args provided
  if (!first && !last) {
    first = 10;
  }

  const data = await fetchAPI(
    `
    query AllPosts($first: Int, $after: String, $last: Int, $before: String) {
      posts(first: $first, after: $after, last: $last, before: $before, where: { orderby: { field: DATE, order: DESC } }) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
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
        last,
        before,
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
        databaseId
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
        tags {
          nodes {
            name
            slug
          }
        }
        comments(first: 100) {
          nodes {
            id
            content
            date
            parentId
            author {
              node {
                name
                avatar {
                  url
                }
              }
            }
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

export async function getPageBySlug(slug: string) {
  const data = await fetchAPI(
    `
    query PageBySlug($id: ID!, $idType: PageIdType!) {
      page(id: $id, idType: $idType) {
        title
        content
        slug
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  `,
    {
      variables: {
        id: slug,
        idType: 'URI',
      },
    }
  );
  return data?.page;
}

export async function getPostsByCategory(categorySlug: string, first?: number, after?: string, last?: number, before?: string) {
  // Default to first: 10 if no pagination args provided
  if (!first && !last) {
    first = 10;
  }

  const data = await fetchAPI(
    `
    query PostsByCategory($id: ID!, $first: Int, $after: String, $last: Int, $before: String) {
      category(id: $id, idType: SLUG) {
        name
        description
        posts(first: $first, after: $after, last: $last, before: $before, where: { orderby: { field: DATE, order: DESC } }) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
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
          }
        }
      }
    }
  `,
    {
      variables: {
        id: categorySlug,
        first,
        after,
        last,
        before,
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

export async function loginUser(credentials: any) {
  const data = await fetchAPI(
    `
    mutation Login($input: LoginInput!) {
      login(input: $input) {
        authToken
        refreshToken
        user {
          id
          name
          email
          avatar {
            url
          }
        }
      }
    }
  `,
    {
      variables: {
        input: {
          clientMutationId: 'uniqueId',
          username: credentials.username,
          password: credentials.password,
        },
      },
    }
  );
  return data?.login;
}

export async function getViewer(authToken: string) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authToken}`
  };

  if (!process.env.WORDPRESS_API_URL) {
    throw new Error('WORDPRESS_API_URL is not defined');
  }

  const res = await fetch(process.env.WORDPRESS_API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: `
        query Viewer {
          viewer {
            id
            name
            email
            avatar {
              url
            }
          }
        }
      `,
    }),
    next: { revalidate: 0 },
  });

  const json = await res.json();
  return json?.data?.viewer;
}

export async function registerUser(input: any) {
  const data = await fetchAPI(
    `
    mutation RegisterUser($input: RegisterUserInput!) {
      registerUser(input: $input) {
        user {
          id
          username
          email
        }
      }
    }
  `,
    {
      variables: {
        input: {
          clientMutationId: 'register',
          username: input.username,
          email: input.email,
          password: input.password,
        },
      },
    }
  );
  return data?.registerUser;
}

export async function createComment(input: any) {
  const data = await fetchAPI(
    `
    mutation CreateComment($input: CreateCommentInput!) {
      createComment(input: $input) {
        success
        comment {
          id
          content
          date
          parentId
          author {
            node {
              name
              avatar {
                url
              }
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        input: {
          clientMutationId: 'createComment',
          commentOn: input.postId,
          parent: input.parentId ? input.parentId : null,
          author: input.author,
          authorEmail: input.authorEmail,
          content: input.content,
        },
      },
    }
  );
  return data?.createComment;
}
