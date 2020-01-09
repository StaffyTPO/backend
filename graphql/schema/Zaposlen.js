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

const vrstaSluzbeZaposlenega = async (id_uporabnik) => {
  const result = await global.pg.query(
    `
    SELECT *
    FROM zaposlen
    WHERE uporabnik = $1
  `,
    [id_uporabnik]
  );
  return result.rows[0];
}

module.exports = { Zaposlen, addZaposlen, vsiZaposleni, vrstaSluzbeZaposlenega };
