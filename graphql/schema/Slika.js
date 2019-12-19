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

const getSlikaURL = async aktivnostId => {
    const result = await global.pg.query(`
      SELECT url
      FROM slika
      WHERE aktivnost = $1
    `, 
    [aktivnostId]
    );
    return result.rows;
  };
  
  module.exports = { Slika, getSlikaURL };