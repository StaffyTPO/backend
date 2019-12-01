const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString, GraphQLList, GraphQLBoolean } = require("graphql");

const Komentar = new GraphQLObjectType({
  name: "Komentar",
  fields: {
    id: {
      type: GraphQLID
    },
    sporocilo: {
      type: GraphQLString
    },
    datum: {
      type: GraphQLString
    },
    uporabnik: {
      type: GraphQLInt
    },
    aktivnost: {
      type: GraphQLInt
    }
  }
});

const addKomentar = async (sporocilo, datum, uporabnik, aktivnost) => {
  const result = await global.pg.query(
    `
    INSERT INTO komentar(sporocilo, datum, uporabnik, aktivnost)
    VALUES ($1,$2,$3,$4)
    RETURNING *
  `,
    [sporocilo, datum, uporabnik, aktivnost]
  );
  return result.rows[0];
};

module.exports = { Komentar, addKomentar };
