const { ApolloServer } = require("apollo-server");
const { ApolloGateway, LocalGraphQLDataSource } = require("@apollo/gateway");
const { buildFederatedSchema } = require("@apollo/federation");
const walk = require("walk-sync");

const localServiceList = walk(`${__dirname}/services`, {
  directories: false
}).map(file => require(`${__dirname}/services/${file}`));

const gateway = new ApolloGateway({
  debug: true,
  localServiceList,
  buildService: service => {
    return new LocalGraphQLDataSource(buildFederatedSchema([service]));
  }
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
  playground: {
    tabs: [
      {
        endpoint: process.env.SANDBOX_URL,
        query: `query {
  me {
    username
    reviews {
      body
      product {
        name
        upc
      }
    }
  }
}`
      }
    ]
  }
});

server.listen(8080).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
