const express = require("express");
const graphqlHTTP = require("express-graphql");

const Schema = require("./schema.js");
const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: Schema,
    graphiql: true
  })
);

app.listen(process.env.PORT || 4000);
