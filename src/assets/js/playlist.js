export const artists = [
  {
    id: 0,
    name: "Nekfeu",
    description:
      "Nekfeu, de son vrai nom Ken Samaras, né le 3 avril 1990 à La Trinité, dans les Alpes-Maritimes, est un rappeur (auteur-interprète) et acteur français. Il est aussi, dans une moindre mesure, réalisateur et directeur de photographie. Membre du groupe S-Crew et 1995, il appartient au collectif L'Entourage et a fait également partie de 5 Majeur. Sorti en 2015, son premier album solo, Feu, bénéficie d'une couverture médiatique importante ; pour cet album, il remporte en 2016 le prix du « meilleur album de musique urbaine » aux Victoires de la musique. Son deuxième album, intitulé Cyborg, sort en 2016, et son troisième, Les Étoiles vagabondes, en 2019.Au cours de sa carrière, Il a vendu plus de 1,5 million d'albums et détient trois disques de diamant pour ses trois albums studios.",
    photo: require("../img/nekfeu.jpg"),
  },
  {
    id: 1,
    name: "H.E.R",
    description:
      "Gabriella Wilson, dite H.E.R., est une chanteuse américaine née le 27 juin 1997 à Vallejo. Son nom de scène est l'acronyme de « Having Everything Revealed ». H.E.R a commencé à faire parler d'elle début 2017 après que ses EP H.E.R Volume 1 & 2 soient sortis de façon anonyme. Le projet musical est le reflet de la vision singulière de H.E.R, et représente une introduction parfaite à son travail ; et pour ceux qui la connaisse déjà, la sortie offre une remise en contexte palpitante de sa carrière jusque-là impressionnante. Dans ce lapse de temps et à travers deux EP remarquables, la chanteuse compositrice énigmatique s'est positionnée comme une des nouvelles voix les plus envoutantes du R&B moderne : une artiste avec l'habilité à canaliser la douleur et les joies de la vie à travers différentes ambiances sonores, ainsi que la reconnaissance d'être un des dix meilleurs albums de 2017 par l'Associated Press. En août 2018, elle a sorti son EP I Used To Know Her : The Prelude puis en novembre I Used To Know Her : Part 2, qui a davantage propulsé la chanteuse.",
    photo: require("../img/her.jpg"),
  },
  {
    id: 2,
    name: "Alpha Wann",
    description:
      "Alpha Omar Wann, dit Alpha Wann, né le 2 juillet 1989 dans le 14e arrondissement de Paris, est un rappeur (auteur-interprète) français. Il est membre du groupe 1995 et du collectif L'Entourage. Membre fondateur de 1995, Alpha Wann est un pilier du groupe avec Nekfeu. Après s'être lancé dans une carrière en solo, il sort trois EP successifs, la trilogie Alph Lauren. Le 21 septembre 2018, Wann publie son premier album, Une main lave l’autre (UMLA). Alpha Wann participe au Colors Show en 2019 avec son titre Pistolet Rose 2.",
    photo: require("../img/alpha-wann.jpg"),
  },
  {
    id: 3,
    name: "Gazo",
    description:
      "D’origine guinéenne, Gazo est un rappeur de 25 ans venant de Saint Denis et du 11ème arrondissement de Paris. C’est au CM2 que le jeune homme se met à gratter ses premiers textes pour ne plus jamais quitter la musique. Cela dit, il ne s’est pas toujours appelé Gazo. En effet, il a commencé sous le nom de Bramsou et a même collaboré avec 4Keus Gang à l’époque. Son équipe se fait surnommer MaLaGaNgX à cause de leur amour pour les vêtements de luxe et leurs activités sombres à côté. En parlant d’habits, il a sa propre marque : BSB.",
    photo: require("../img/gazo.jpg"),
  },
  {
    id: 4,
    name: "DFG, MisterMV, ZeratoR",
    description:
      "Alexis Rodrigues, plus connu sous le pseudo de DrFeelgood (abrégé DFG), est un streameur et Youtuber français. Il fait des vidéos et des streams sur League of Legends. De 2014 jusqu'en janvier 2016, il est chez Eclypsia et y fait des streams sur la TV LoL. Xavier Dang, dit MisterMV, né le 26 août 1980 à Paris, est un vidéaste, streamer, et compositeur de musiques de jeux vidéos français. Adrien Nougaret, dit ZeratoR, né le 1er mars 1990 à Montpellier, est un streamer Twitch jouant à de divers jeux : Minecraft, League of Legends, CSGO, H1Z1 et d’autres jeux, notamment des jeux indépendants qu’il met en avant dans son émission « IndependenZ Day » tous les dimanche soir. Il fait ses lives en face commentary, excepté pour les nocturnes (non rediffusées sur Youtube), où il y a seulement un micro.",
    photo: require("../img/le-son-interdit.jpg"),
  },
];

export const playlist = [
  {
    id: 0,
    artist: artists[0],
    title: "Au cœur du G",
    source: require("../mp3/au-coeur-du-g.mp3"),
    coverUrl: require("../img/feu.jpg"),
    isLiked: false,
  },
  {
    id: 1,
    artist: artists[0],
    title: "Humanoïde",
    source: require("../mp3/humanoide.mp3"),
    coverUrl: require("../img/cyborg.jpg"),
    isLiked: false,
  },
  {
    id: 2,
    artist: artists[1],
    title: "Damage",
    source: require("../mp3/damage.mp3"),
    coverUrl: require("../img/damage.jpg"),
    isLiked: false,
  },
  {
    id: 3,
    artist: artists[2],
    title: "UNE MAIN LAVE L'AUTRE",
    source: require("../mp3/umla.mp3"),
    coverUrl: require("../img/umla.jpg"),
    isLiked: false,
  },
  {
    id: 4,
    artist: artists[3],
    title: "Drill FR 5 (ft. Hamza)",
    source: require("../mp3/drill-fr-5.mp3"),
    coverUrl: require("../img/drill-fr-5.jpg"),
    isLiked: false,
  },
  {
    id: 5,
    artist: artists[4],
    title: "LE SON INTERDIT",
    source: require("../mp3/le-son-interdit.mp3"),
    coverUrl: require("../img/le-son-interdit.jpg"),
    isLiked: false,
  },
];
