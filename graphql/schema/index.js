const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt, GraphQLBoolean } = require("graphql");

const { Podjetje, getPodjetjeById } = require("./Podjetje");
const { Uporabnik, getUporabniki, addUporabnik } = require("./Uporabnik");
const { Aktivnost, getAktivnosti } = require("./Aktivnost");
const { Komentar, addKomentar } = require("./Komentar");

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    podjetje: {
      description: "Podjetje. Podamo id podjetja da dobimo podatke samo o enem podjetju",
      type: Podjetje,
      args: {
        id: {
          type: GraphQLInt
        }
      },
      resolve: (parent, args, contex) => getPodjetjeById(args.id)
    },
    uporabnikiPodjetja: {
      description: "Vsi uporabniki nekega podjetja. Podamo id podjetja da dobimo vse njihove uporabnike",
      type: new GraphQLList(Uporabnik),
      args: {
        id: {
          type: GraphQLInt
        }
      },
      resolve: (parent, args, contex) => getUporabniki(args.id)
    },
    aktivnosti: {
      description: "Vse aktivnosti za neko podjetje",
      type: new GraphQLList(Aktivnost),
      args: {
        podjetjeId: {
          type: GraphQLInt
        }
      },
      resolve: (parent, args, contex) => getAktivnosti(args.podjetjeId)
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutatuion",
  fields: {
    dodajUporabnika: {
      description: "Dodajanje novega uporabnika vezanega na neko podjetje",
      type: Uporabnik,
      args: {
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
      },
      resolve: (parent, args, contex) =>
        addUporabnik(args.ime, args.priimek, args.slika, args.telefon, args.email, args.password, args.podjetje)
    },
    dodajKomentar: {
      description: "Dodajanje komentarja na aktivnost, podamo mu id Aktivnosti",
      type: Komentar,
      args: {
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
      },
      resolve: (parent, args, contex) => addKomentar(args.sporocilo, args.datum, args.uporabnik, args.aktivnost)
    }
  }
});

const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

module.exports = schema;
