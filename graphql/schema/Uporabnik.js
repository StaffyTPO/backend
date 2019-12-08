const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString } = require("graphql");

const Uporabnik = new GraphQLObjectType({
  name: "Uporabnik",
  fields: {
    id: {
      type: GraphQLID
    },
    ime: {
      type: GraphQLString
    },
    priimek: {
      type: GraphQLString
    },
    slika: {
      type: GraphQLString
    },
    telefon: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    },
    podjetje: {
      type: GraphQLInt
    }
  }
});

const getUporabniki = async id => {
  const result = await global.pg.query(
    `SELECT *
    FROM uporabnik
    WHERE podjetje = $1    
    `,
    [id]
  );
  return result.rows;
};

const addUporabnik = async (ime, priimek, slika, telefon, email, password, podjetje) => {
  const result = await global.pg.query(
    `INSERT INTO uporabnik(ime, priimek, slika, telefon, email, password, podjetje)
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING *
  `,
    [ime, priimek, slika, telefon, email, password, podjetje]
  );
  return result.rows[0];
};

const getUporabnikById = async id => {
  const result = await global.pg.query(
    `
    SELECT *
    FROM uporabnik
    WHERE id = $1
  `,
    [id]
  );
  return result.rows[0];
};

module.exports = { Uporabnik, addUporabnik, getUporabniki, getUporabnikById };
