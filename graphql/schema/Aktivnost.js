const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString, GraphQLList, GraphQLBoolean } = require("graphql");
const { Prostor, getProstorById } = require("./Prostor");
const { VrstaSluzbe, getVrstaSluzbeById } = require("./VrstaSluzbe");
const { Prioriteta, getPrioritetaById } = require("./Prioriteta");
const { Status, getStatusById } = require("./Status");
const { Slika, getSlikaURL } = require("./Slika");

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
      type: Prioriteta,
      resolve: parent => getPrioritetaById(parent.prioriteta)
    },
    vrsta_sluzbe: {
      type: VrstaSluzbe,
      resolve: parent => getVrstaSluzbeById(parent.vrsta_sluzbe)
    },
    status: {
      type: Status,
      resolve: parent => getStatusById(parent.status)
    },
    koncni_datum: {
      type: GraphQLString
    },
    podjetje: {
      type: GraphQLInt
    },
    slika: {
      type: Slika,
      resolve: parent => getSlikaURL(parent.id)
    }
  }
});

const getAktivnostiById = async aktivnostId => {
  const result = await global.pg.query(
    `SELECT *
    FROM aktivnost
    WHERE id = $1
  `,
    [aktivnostId]
  );

  return result.rows[0];
};

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

const getAktivnostiZaVrstoSluzbe = async (podjetjeId, vrstaSluzbeId) => {
  const result = await global.pg.query(
    `SELECT *
    FROM aktivnost
    WHERE vrsta_sluzbe = $2 AND podjetje = $1
    `,
    [podjetjeId, vrstaSluzbeId]
  );
  return result.rows;
};

const getAktivnostiGledeNaStatus = async (podjetjeId, statusId) => {
  const result = await global.pg.query(
    `SELECT *
    FROM aktivnost
    WHERE status = $2 AND podjetje = $1
    `,
    [podjetjeId, statusId]
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

const deleteAktivnost = async aktivnostId => {
  const result = await global.pg.query(
    `DELETE FROM aktivnost
     WHERE id = $1
     RETURNING *
    `,
    [aktivnostId]
  );

  return result.rows[0];
};

const changeAktivnost = async (id, naslov, opis, prostor, prioriteta, vrsta_sluzbe, status, koncni_datum, podjetje) => {
  const result = await global.pg.query(
    `UPDATE aktivnost
    SET naslov = $2, opis = $3, prostor = $4, prioriteta = $5, vrsta_sluzbe = $6, status = $7, koncni_datum = $8, podjetje = $9
    WHERE id = $1
    RETURNING *
    `,
    [id, naslov, opis, prostor, prioriteta, vrsta_sluzbe, status, koncni_datum, podjetje]
  );

  return result.rows[0];
};

const opravljeno = async id => {
  const result = await global.pg.query(
    `
    UPDATE aktivnost
    SET status = 1
    WHERE id = $1
    RETURNING *
    `,
    [id]
  );
  return result.rows[0];
};

const getAktivnostiSluzbe = async id => {
  const result = await global.pg.query(
    `SELECT *
    FROM aktivnost
    WHERE vrsta_sluzbe = $1
    `,
    [id]
  );
  return result.rows;
}

module.exports = {
  Aktivnost,
  getAktivnosti,
  getAktivnostiZaVrstoSluzbe,
  addAktivnost,
  deleteAktivnost,
  getAktivnostiGledeNaStatus,
  changeAktivnost,
  getAktivnostiById,
  opravljeno,
  getAktivnostiSluzbe
};
