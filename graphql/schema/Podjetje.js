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

const getPodjetjeById = async id => {
  const result = await global.pg.query(
    `
    SELECT *
    FROM podjetje
    WHERE id = $1
  `,
    [id]
  );
  return result.rows[0];
};

const getVsaPodjetja = async () => {
  const result = await global.pg.query(
    `
    SELECT *
    FROM podjetje
    `
  );
  return result.rows;
}

module.exports = { Podjetje, getPodjetjeById, getVsaPodjetja };
