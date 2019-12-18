const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString, GraphQLList, GraphQLBoolean } = require("graphql");
const { Uporabnik, getUporabnikById } = require("./Uporabnik");
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
      type: Uporabnik,
      resolve: parent => getUporabnikById(parent.uporabnik)
    },
    aktivnost: {
      type: GraphQLInt
    }
  }
});

const getKomentarji = async aktivnost => {
  const result = await global.pg.query(
    `
    SELECT *
    FROM komentar
    WHERE aktivnost = $1
    `,
    [aktivnost]
  );
  return result.rows;
};

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

module.exports = { Komentar, getKomentarji, addKomentar };
