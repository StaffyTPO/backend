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

const getVrstaSluzbeById = async id => {
  const result = await global.pg.query(
    `
    SELECT *
    FROM vrsta_sluzbe
    WHERE id = $1
  `,
    [id]
  );
  return result.rows[0];
};

const getVrsteSluzbeByPodjetjeId = async id => {
  const result = await global.pg.query(
    `
    SELECT *
    FROM vrsta_sluzbe
    WHERE podjetje = $1
    `,
    [id]
  );
  return result.rows;
}

module.exports = { VrstaSluzbe, getVrstaSluzbeById, getVrsteSluzbeByPodjetjeId };