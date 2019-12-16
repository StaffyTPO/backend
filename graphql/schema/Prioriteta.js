const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString, GraphQLList, GraphQLBoolean } = require("graphql");

const Prioriteta = new GraphQLObjectType({
  name: "Prioriteta",
  fields: {
    id: {
      type: GraphQLID
    },
    tip: {
      type: GraphQLString
    },
    podjetje: {
      type: GraphQLInt
    },
    barva: {
      type: GraphQLString
    }
  }
});

const getPrioritetaById = async id => {
  const result = await global.pg.query(
    `
    SELECT *
    FROM prioriteta
    WHERE id = $1
  `,
    [id]
  );
  return result.rows[0];
};

const getPrioritetaByPodjetjeId = async podjetjeId => {
  const result = await global.pg.query(
    `
    SELECT *
    FROM prioriteta
    WHERE podjetje = $1
    `,
    [podjetjeId]
  )
  return result.rows;
}

module.exports = { Prioriteta, getPrioritetaById, getPrioritetaByPodjetjeId };
