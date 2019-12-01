const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString, GraphQLList, GraphQLBoolean } = require("graphql");

const VrstaSluzbe = new GraphQLObjectType({
  name: "VrstaSluzbe",
  fields: {
    id: {
      type: GraphQLID
    },
    podjetje: {
      type: GraphQLInt
    },
    naziv: {
        type: GraphQLString
    }, 
    barva: {
        type: GraphQLString
    }
  }
});

const getVrstaSluzbeById = async sluzbaId => {
  const result = await global.pg.query(`
    SELECT *
    FROM vrsta_sluzbe
    WHERE id = $1
  `, 
  [sluzbaId]
  );
  return result.rows[0];
};

module.exports = { VrstaSluzbe, getVrstaSluzbeById };
