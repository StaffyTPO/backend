const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt, GraphQLBoolean } = require("graphql");

const { Podjetje, getPodjetjeById, getVsaPodjetja } = require("./Podjetje");
const { Zaposlen, addZaposlen, vsiZaposleni, vrstaSluzbeZaposlenega } = require("./Zaposlen");
const { Uporabnik, getUporabniki, addUporabnik, getUporabnikById, getRegistriranUporabnik, getVsiUporabniki } = require("./Uporabnik");
const { Komentar, getKomentarji, addKomentar } = require("./Komentar");
const { Prostor, getProstoriByPodjetjeId } = require("./Prostor");
const {
  Aktivnost,
  getAktivnosti,
  getAktivnostiZaVrstoSluzbe,
  addAktivnost,
  getAktivnostiGledeNaStatus,
  changeAktivnost,
  deleteAktivnost,
  getAktivnostiById,
  opravljeno,
  getAktivnostiSluzbe,
  getAktivnostiUporabnika
} = require("./Aktivnost");
const { VrstaSluzbe, getVrsteSluzbeByPodjetjeId, getVrstaSluzbeById } = require("./VrstaSluzbe");
const { Prioriteta, getPrioritetaByPodjetjeId } = require("./Prioriteta");
const { Slika, getSlikaURL, addSlika, deleteSlika } = require("./Slika");

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
    aktivnostiPoStatusih: {
      description: "Vse aktivnosti po statusih. Podamo id statusa ter id podjetja in dobimo naprimer vse aktivnosti, ki pripadajo statusu",
      type: new GraphQLList(Aktivnost),
      args: {
        podjetjeId: {
          type: GraphQLInt
        },
        statusId: {
          type: GraphQLInt
        }
      },
      resolve: (parent, args, contex) => getAktivnostiGledeNaStatus(args.statusId, args.podjetjeId)
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
    },
    aktivnostIDja: {
      description: "Aktivnost ID-ja",
      type: Aktivnost,
      args: {
        aktivnostId: {
          type: GraphQLInt
        }
      },
      resolve: (parent, args, contex) => getAktivnostiById(args.aktivnostId)
    },
    aktivnostiSluzbe: {
      description: "Vse aktivnosti za podano sluzbo. Podamo id sluzbe ter id podjetja in dobimo vse aktivnosti, ki ji pripadajo.",
      type: new GraphQLList(Aktivnost),
      args: {
        podjetjeId: {
          type: GraphQLInt
        },
        vrstaSluzbeId: {
          type: GraphQLInt
        }
      },
      resolve: (parent, args, contex) => getAktivnostiZaVrstoSluzbe(args.podjetjeId, args.vrstaSluzbeId)
    },
    uporabnik: {
      description: "Uporabnik. Podamo id uporabnika da dobimo podatke samo o enem uporabniku",
      type: Uporabnik,
      args: {
        id: {
          type: GraphQLInt
        }
      },
      resolve: (parent, args, contex) => getUporabnikById(args.id)
    },
    prostori: {
      type: new GraphQLList(Prostor),
      args: {
        podjetjeId: {
          type: GraphQLInt
        }
      },
      resolve: (parent, args, contex) => getProstoriByPodjetjeId(args.podjetjeId)
    },
    slike: {
      type: new GraphQLList(Slika),
      args: {
        aktivnostId: {
          type: GraphQLInt
        }
      },
      resolve: (parent, args, contex) => getSlikaURL(args.aktivnostId)
    },
    prioritete: {
      description: "Vrne vse prioritete v nekem podjetju. Kot argument mu podamo id podjetja.",
      type: new GraphQLList(Prioriteta),
      args: {
        podjetjeId: {
          type: GraphQLInt
        }
      },
      resolve: (parent, args, contex) => getPrioritetaByPodjetjeId(args.podjetjeId)
    },
    vrsteSluzbe: {
      description: "Vrne vse vrste sluzbe v nekem podjetju. Kot argument mu podamo id podjetja.",
      type: new GraphQLList(VrstaSluzbe),
      args: {
        podjetjeId: {
          type: GraphQLInt
        }
      },
      resolve: (parent, args, contex) => getVrsteSluzbeByPodjetjeId(args.podjetjeId)
    },
    komentarji: {
      type: new GraphQLList(Komentar),
      args: {
        aktivnostId: {
          type: GraphQLInt
        }
      },
      resolve: (parent, args, contex) => getKomentarji(args.aktivnostId)
    },
    registriranUporabnik: {
      description: "Podamo email in geslo, vrne pa uporabnika, ce obstaja.",
      type: Uporabnik,
      args: {
        email: {
          type: GraphQLString
        },
        geslo: {
          type: GraphQLString
        }
      },
      resolve: (parent, args, contex) => getRegistriranUporabnik(args.email, args.geslo)
    },
    podjetja: {
      description: "Vrne vsa podjetja, ki so na voljo.",
      type: new GraphQLList(Podjetje),
      resolve: (parent, args, contex) => getVsaPodjetja()
    },
    zaposleni: {
      description: "Vrne vse zaposlene v bazi.",
      type: new GraphQLList(Zaposlen),
      resolve: (parent, args, contex) => vsiZaposleni()
    },
    uporabniki: {
      description: "Vrne vse uporabnike v bazi.",
      type: new GraphQLList(Uporabnik),
      resolve: (parent, args, contex) => getVsiUporabniki()
    },
    vrstaSluzbeZaposlenegaUporabnika: {
      description: "Vrne vrsto sluzbe uporabnika, katerega id podamo.",
      type: Zaposlen,
      args: {
        id_uporabnika: {
          type: GraphQLInt
        }
      },
      resolve: (parent, args, contex) => vrstaSluzbeZaposlenega(args.id_uporabnika)
    },
    vrstaSluzbeById: {
      description: "Vrne vrsto sluzbe s podanim id-jem.",
      type: VrstaSluzbe,
      args: {
        id: {
          type: GraphQLInt
        }
      },
      resolve: (parent, args, contex) => getVrstaSluzbeById(args.id)
    },
    aktivnostiPodaneSluzbe: {
      description: "Vrne vse aktivnosti za sluzbo s podanim id-jem.",
      type: new GraphQLList(Aktivnost),
      args: {
        idSluzbe: {
          type: GraphQLInt
        }
      },
      resolve: (parent, args, contex) => getAktivnostiSluzbe(args.idSluzbe)
    },
    aktivnostiUporabnika: {
      description: "Vrne vse aktivnosti, ki jih je objavil podani uporabnik.",
      type: new GraphQLList(Aktivnost),
      args: {
        idUporabnika: {
          type: GraphQLInt
        }
      },
      resolve: (parent, args, contex) => getAktivnostiUporabnika(args.idUporabnika)
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
    },
    dodajSliko: {
      description: "Dodajanje slike, podamo mu id Aktivnosti",
      type: Slika,
      args: {
        url: {
          type: GraphQLString
        },
        aktivnost: {
          type: GraphQLInt
        }
      },
      resolve: (parent, args, contex) => addSlika(args.url, args.aktivnost)
    },
    izbrisiSliko: {
      description: "Izbrisi sliko aktivnosti z podanim ID-jem aktivnosti",
      type: Slika,
      args: {
        aktivnostId: {
          type: GraphQLInt
        }
      },
      resolve: (parent, args, contex) => deleteSlika(args.aktivnostId)
    },
    dodajAktivnost: {
      description: "Dodajanje aktivnosti, možnosti podajati različne parametre, niso obvezni",
      type: Aktivnost,
      args: {
        naslov: {
          type: GraphQLString
        },
        opis: {
          type: GraphQLString
        },
        prostor: {
          type: GraphQLInt
        },
        prioriteta: {
          type: GraphQLInt
        },
        vrsta_sluzbe: {
          type: GraphQLInt
        },
        status: {
          type: GraphQLInt
        },
        koncni_datum: {
          type: GraphQLString
        },
        podjetje: {
          type: GraphQLInt
        },
        uporabnik: {
          type: GraphQLInt
        }
      },
      resolve: (parent, args, contex) =>
        addAktivnost(
          args.naslov,
          args.opis,
          args.prostor,
          args.prioriteta,
          args.vrsta_sluzbe,
          args.status,
          args.koncni_datum,
          args.podjetje,
          args.uporabnik
        )
    },
    spremeniAktivnost: {
      description: "Spremeni aktivnost, podaš vse argumente, ki jih imaš, popravijo vse vsi na enkrat, uporabno za updatanje statusa",
      type: Aktivnost,
      args: {
        id: {
          type: GraphQLInt
        },
        naslov: {
          type: GraphQLString
        },
        opis: {
          type: GraphQLString
        },
        prostor: {
          type: GraphQLInt
        },
        prioriteta: {
          type: GraphQLInt
        },
        vrsta_sluzbe: {
          type: GraphQLInt
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
      },
      resolve: (parent, args, contex) =>
        changeAktivnost(
          args.id,
          args.naslov,
          args.opis,
          args.prostor,
          args.prioriteta,
          args.vrsta_sluzbe,
          args.status,
          args.koncni_datum,
          args.podjetje
        )
    },
    izbrisiAktivnost: {
      description: "Izbrisi aktivnost z podanim ID-jem aktivnosti",
      type: Aktivnost,
      args: {
        aktivnostId: {
          type: GraphQLInt
        }
      },
      resolve: (parent, args, contex) => deleteAktivnost(args.aktivnostId)
    },
    opravljenaAktivnost: {
      type: Aktivnost,
      args: {
        aktivnostId: {
          type: GraphQLInt
        }
      },
      resolve: (parent, args, contex) => opravljeno(args.aktivnostId)
    },
    dodajZaposlenega: {
      description: "Dodajanje zaposlenega",
      type: Zaposlen,
      args: {
        uporabnik_id: {
          type: GraphQLInt
        },
        vrstaSluzbe_id: {
          type: GraphQLInt
        }
      },
      resolve: (parent, args, contex) => addZaposlen(args.uporabnik_id, args.vrstaSluzbe_id)
    }
  }
});

const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

module.exports = schema;
