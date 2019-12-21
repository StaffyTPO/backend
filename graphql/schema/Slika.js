const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString, GraphQLList, GraphQLBoolean } = require("graphql");

const Slika = new GraphQLObjectType({
  name: "Slika",
  fields: {
    id: {
      type: GraphQLID
    },
    url: {
      type: GraphQLString
    },
    aktivnost: {
      type: GraphQLInt
    }
  }
});

const addSlika = async (id, url, aktivnost) => {
  const result = await global.pg.query(
    `
    INSERT INTO slika(id, url, aktivnost)
    VALUES ($1,$2,$3)
    RETURNING *
  `,
    [id, url, aktivnost]
  );
  return result.rows[0];
};

const getSlikaURL = async aktivnostId => {
  const result = await global.pg.query(
    `
      SELECT *
      FROM slika
      WHERE aktivnost = $1
    `,
    [aktivnostId]
  );
  return result.rows;
};

module.exports = { Slika, getSlikaURL, addSlika };
