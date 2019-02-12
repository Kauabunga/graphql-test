const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLString
} = require("graphql");
const { GraphQLDateTime } = require("graphql-iso-date");

const guid = require("guid");

const getRandomDate = () =>
  new Date(+new Date() - Math.floor(Math.random() * 10000000000));

const getRandomJob = () => ({
  id: guid.raw(),

  date: getRandomDate(),
  dateString: getRandomDate().toString(),
  dateISOString: getRandomDate().toISOString(),

  dateGraphQL: getRandomDate(),
  dateGraphQLString: getRandomDate().toString(),
  dateGraphQLISOString: getRandomDate().toISOString()
});

const JobListItem = new GraphQLObjectType({
  name: "JobListItem",
  fields: {
    id: { type: GraphQLID },

    date: { type: GraphQLString },
    dateString: { type: GraphQLString },
    dateISOString: { type: GraphQLString },

    dateGraphQL: { type: GraphQLDateTime },
    dateGraphQLString: { type: GraphQLDateTime },
    dateGraphQLISOString: { type: GraphQLDateTime }
  }
});

const JobList = {
  type: new GraphQLList(JobListItem),
  args: {
    inputDateString: {
      type: GraphQLString
    },
    inputDateGraphQL: {
      type: GraphQLDateTime
    }
  },
  resolve: () => {
    console.log("JobList resolve");
    const list = [...new Array(4)].map(() => getRandomJob());
    console.log("JobList resolve", { list });
    return list;
  }
};

const query = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    JobList
  })
});

const schema = new GraphQLSchema({ query });

module.exports = schema;
