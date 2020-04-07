const { gql } = require("apollo-server");
const data = require("../fixtures/reviews");

const typeDefs = gql`
  type Review {
    body: String
    author: User @provides(fields: "username")
    product: Product
  }

  extend type User @key(fields: "id") {
    id: ID! @external
    username: String! @external
    reviews: [Review]
  }

  extend type Product @key(fields: "upc") {
    upc: String! @external
    reviews: [Review]
  }
`;

const resolvers = {
  User: {
    reviews(user) {
      return reviewsForUser(user.id);
    }
  },
  Product: {
    reviews(product) {
      return reviewsForProduct(product.upc);
    }
  },
  Review: {
    author(review) {
      return { id: review.authorId, username: review.authorUsername };
    },
    product(review) {
      return { upc: review.productUpc };
    }
  }
};

async function reviewsForUser(userId) {
  return data.filter(review => review.authorId === userId);
}

async function reviewsForProduct(productUpc) {
  return data.filter(review => review.productUpc === productUpc);
}

module.exports = {
  name: __filename,
  resolvers,
  typeDefs
};
