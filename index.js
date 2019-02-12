const express = require("express");
const graphqlHTTP = require("express-graphql");

const schema = require("./schema.js");
const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.get("/graphql-example", (req, res) =>
  res.redirect(
    `/graphql?query=%0Aquery%20(%24inputDateString%3A%20String%2C%20%24inputDateGraphQL%3A%20DateTime)%20%7B%0A%0A%0A%20%20JobList(inputDateString%3A%24inputDateString%2C%20inputDateGraphQL%3A%20%24inputDateGraphQL)%20%7B%0A%20%20%20%20id%0A%20%20%20%20date%0A%20%20%20%20dateString%0A%20%20%20%20dateISOString%0A%20%20%20%20%0A%20%20%20%20dateGraphQL%0A%20%20%20%20dateGraphQLString%0A%20%20%20%20dateGraphQLISOString%0A%20%20%7D%0A%7D&variables=%7B%0A%20%20%20"inputDateGraphQL"%3A"2018-11-13T05%3A54%3A57.357Z"%2C%0A%20%20%20"inputDateString"%3A"2018-11-13T05%3A54%3A57.357Z"%20%0A%7D`
  )
);

app.listen(process.env.PORT || 4000);
