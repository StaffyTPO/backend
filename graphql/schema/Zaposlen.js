const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString, GraphQLList, GraphQLBoolean } = require("graphql");

const Zaposlen = new GraphQLObjectType({
  name: "Zaposlen",
  fields: {
    uporabnik: {
      type: GraphQLInt
    },
    vrsta_sluzbe: {
      type: GraphQLInt
    },
  }
});

const addZaposlen = async (id_uporabnik, id_vrsta_sluzbe) => {
  const result = await global.pg.query(
    `
    INSERT INTO zaposlen(uporabnik, vrsta_sluzbe)
    VALUES ($1,$2)
    RETURNING *
  `,
    [id_uporabnik, id_vrsta_sluzbe]
  );
  return result.rows[0];
};

const vsiZaposleni = async () => {
  const result = await global.pg.query(
    `
    SELECT *
    FROM zaposlen
  `
  );
  return result.rows;
};

module.exports = { Zaposlen, addZaposlen, vsiZaposleni };
