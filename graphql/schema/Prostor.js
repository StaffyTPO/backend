const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString, GraphQLList, GraphQLBoolean } = require("graphql");

const Prostor = new GraphQLObjectType({
  name: "Prostor",
  fields: {
    id: {
      type: GraphQLID
    },
    naziv: {
      type: GraphQLString
    },
    podjetje: {
      type: GraphQLInt
    }
  }
});

const getProstorById = async prostorId => {
  console.log(prostorId);

  const result = await global.pg.query(
    `
    SELECT *
    FROM prostor
    WHERE id = $1
  `,
    [prostorId]
  );
  return result.rows[0];
};

module.exports = { Prostor, getProstorById };
