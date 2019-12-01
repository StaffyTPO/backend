const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString, GraphQLList, GraphQLBoolean } = require("graphql");

const Podjetje = new GraphQLObjectType({
  name: "Podjetje",
  fields: {
    id: {
      type: GraphQLID
    },
    ime: {
      type: GraphQLString
    }
  }
});

const getPodjetjeById = async () => {
  const result = await global.pg.query(`
    SELECT *
    FROM podjetje
  `);
  return result.rows[0];
};

module.exports = { Podjetje, getPodjetjeById };
