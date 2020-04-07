const { gql } = require("apollo-server");
const data = require("../fixtures/accounts");

const typeDefs = gql`
  type Query {
    me: User!
  }

  type User @key(fields: "id") {
    id: ID!
    username: String!
  }
`;

const resolvers = {
  Query: {
    me() {
      return fetchUserById("1");
    }
  },
  User: {
    __resolveReference(user) {
      return fetchUserById(user.id);
    }
  }
};

async function fetchUserById(id) {
  return data.find(user => user.id === id);
}

module.exports = {
  name: __filename,
  resolvers,
  typeDefs
};
