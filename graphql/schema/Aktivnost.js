const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString, GraphQLList, GraphQLBoolean } = require("graphql");
const { Prostor, getProstorById } = require("./Prostor");

const Aktivnost = new GraphQLObjectType({
  name: "Aktivnost",
  fields: {
    id: {
      type: GraphQLID
    },
    naslov: {
      type: GraphQLString
    },
    opis: {
      type: GraphQLString
    },
    prostor: {
      type: Prostor,
      resolve: parent => getProstorById(parent.prostor)
    },
    prioriteta: {
      type: GraphQLInt
    },
    vrsta_sluzbe: {
      type: GraphQLInt
    },
    status: {
      type: GraphQLInt
    },
    koncni_datum: {
      type: GraphQLString
    },
    podjetje: {
      type: GraphQLInt
    }
  }
});

const getAktivnosti = async podjetjeId => {
  const result = await global.pg.query(
    `
    SELECT *
    FROM aktivnost
    WHERE podjetje = $1
  `,
    [podjetjeId]
  );

  return result.rows;
};

module.exports = { Aktivnost, getAktivnosti };
