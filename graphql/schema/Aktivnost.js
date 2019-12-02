const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString, GraphQLList, GraphQLBoolean } = require("graphql");
const { Prostor, getProstorById } = require("./Prostor");
const { VrstaSluzbe, getVrstaSluzbeById } = require("./VrstaSluzbe");

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
      type: VrstaSluzbe,
      resolve: parent => getVrstaSluzbeById(parent.vrsta_sluzbe)
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
    `SELECT *
    FROM aktivnost
    WHERE podjetje = $1
  `,
    [podjetjeId]
  );

  return result.rows;
};

const getAktivnostiZaVrstoSluzbe = async vrstaSluzbeId => {
  const result = await global.pg.query(
    `SELECT *
    FROM aktivnost
    WHERE vrsta_sluzbe = $1
    `,
    [vrstaSluzbeId]
  );
  return result.rows;
};

const addAktivnost = async (naslov, opis, prostor, prioriteta, vrsta_sluzbe, status, koncni_datum, podjetje) => {
  const result = await global.pg.query(
    `INSERT INTO aktivnost(naslov, opis, prostor, prioriteta, vrsta_sluzbe, status, koncni_datum, podjetje)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    RETURNING *
    `,
    [naslov, opis, prostor, prioriteta, vrsta_sluzbe, status, koncni_datum, podjetje]
  );

  return result.rows[0];
};

module.exports = { Aktivnost, getAktivnosti, getAktivnostiZaVrstoSluzbe, addAktivnost };
