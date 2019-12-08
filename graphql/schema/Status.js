const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString, GraphQLList, GraphQLBoolean } = require("graphql");

const Status = new GraphQLObjectType({
  name: "Status",
  fields: {
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    }
  }
});

const getStatusById = async id => {
    const result = await global.pg.query(`
      SELECT *
      FROM status
      WHERE id = $1
    `, 
    [id]
    );
    return result.rows[0];
  };
  
  module.exports = { Status, getStatusById };