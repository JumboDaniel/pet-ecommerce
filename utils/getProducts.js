import hygraphClient, { gql } from "./hygraph-client.js";

// TODO: get this from hygraph instead
// Average review.rating for a product
function averageRating({ data: reviews }) {
  const total = reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.floor(total / reviews.length);
}

export async function getSomeProducts(count = 4) {
  const query = gql`
    query GetSomeProducts($count: Int!) {
      products(first: $count) {
        id
        productName
        productSlug
        productImage {
          url
          height
          width
          altText
        }
        productPrice
        reviews {
          data {
            id
            name
            rating
            comment
          }
        }
      }
    }
  `;

  try {
    const { products } = await hygraphClient.request(query, { count });

    return products;
  } catch (error) {
    console.log({ error });
  }
}

export async function allProducts() {
  const query = gql`
    query GetAllSlugs {
      products {
        productName
        id
        productSlug
        productImage {
          url
          height
          width
          altText
        }
        productPrice
        reviews {
          data {
            id
            name
            rating
            comment
          }
        }
      }
    }
  `;

  try {
    const { bikes } = await hygraphClient.request(query);

    return bikes;
  } catch (error) {
    console.log(error);
  }
}
export async function allProductsWithFilter(search, minPrice, maxPrice, category) {
  const query = gql`
    query GetAllProducts($search: String, $minPrice: Float!, $maxPrice: Float!, $category: String) {
      products(
        where: {
          AND: [
            { productName_contains: $search }
            { productPrice_gte: $minPrice, productPrice_lte: $maxPrice }
            { productCategories_some: { categoryName_contains: $category } }
          ]
        }
      ) {
        productName
        id
        productSlug
        productImage {
          url
          height
          width
          altText
        }
        productPrice
        productCategories {
          categoryName
        }
        reviews {
          data {
            id
            name
            rating
            comment
          }
        }
      }
    }
  `;

  try {
    const variables = {
      search,
      minPrice: minPrice !== undefined ? minPrice :0,
      maxPrice: maxPrice !== undefined ? maxPrice : 1000000,
      category,
    };
    const {products} = await hygraphClient.request(query, variables);
    return products;
  } catch (error) {
    console.log(error);
  }
}
export async function getProductBySlug(slug, preview = false) {
  const query = gql`
    query GetSingleProduct($slug: String!, $stage: Stage!) {
      product(where: { productSlug: $slug }, stage: $stage) {
        id
        productName
        productSlug
        productPrice
        productDescription {
          html
        }
        reviews {
          data {
            id
            name
            rating
            comment
          }
        }
        productCategories {
          id
          slug
          categoryName
        }
        productImage {
          altText
          url
        }
      }
    }
  `;
  try {
    if (preview)
      hygraphClient.setHeader(
        "Authorization",
        `Bearer ${process.env.HYGRAPH_DEV_AUTH_TOKEN}`
      );

    let { product } = await hygraphClient.request(query, {
      slug,
      stage: preview ? "DRAFT" : "PUBLISHED",
    });
    product.averageRating = averageRating(product.reviews);

    return product;
  } catch (error) {
    console.log(error);
  }
}
export async function getProductById(id) {
  const query = gql`
    query MyQuery($id: ID!) {
      product(where: { id: $id }) {
        productName
        productPrice
        productSlug
        id
        productImage {
          url
        }
      }
    }
  `;
  try {
    const { product } = await hygraphClient.request(query,{id});
    return product;
  } catch (error) {
    console.log(error);
  }
}
 