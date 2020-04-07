const { gql } = require("apollo-server");
const data = require("../fixtures/products");

const typeDefs = gql`
  extend type Query {
    topProducts(first: Int = 5): [Product!]!
  }

  type Product @key(fields: "upc") {
    upc: String!
    name: String!
    price: Int
  }
`;

const resolvers = {
  Query: {
    async topProducts(_, { first }) {
      return (await rankedProducts()).slice(0, first);
    }
  },
  Product: {
    __resolveReference({ upc }) {
      return fetchProductByUpc(upc);
    }
  }
};

async function rankedProducts() {
  return data.sort((a, b) => a.rating > b.rating);
}

async function fetchProductByUpc(upc) {
  return data.find(p => p.upc === upc);
}

module.exports = {
  name: __filename,
  resolvers,
  typeDefs
};
