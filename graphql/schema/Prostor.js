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

const getProstoriByPodjetjeId = async podjetjeId => {
  const result = await global.pg.query(
    `
    SELECT *
    FROM prostor
    WHERE podjetje = $1
  `,
    [podjetjeId]
  );
  console.log(result.rows);

  return result.rows;
};

module.exports = { Prostor, getProstorById, getProstoriByPodjetjeId };
