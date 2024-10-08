type DiscoveryFilter = { name: string; id:number; searchOptions: string[] }[];

export const discoverFilters: DiscoveryFilter = [
  {
    id: 0,
    name: "Nature",
    searchOptions: [
      "Nature",
      "forest",
      "wildlife",
      "rainforest",
      "savannah",
      "tundra",
      "islands",
      "meadows",
      "hiking",
      "camping",
      "fishing",
      "birdwatching",
      "rock climbing",
      "glaciers",
      "prairies",
      "national parks",
      "coral reefs",
      "flora",
      "fauna",
      "water bodies",
      "natural wonders",
    ],
  },
  {
    id: 1,
    name: "Avengers",
    searchOptions: [
      "Avengers",
      "raOne",
      "thor",
      "ironman",
      "shaktiman",
      "spiderman",
      "hulk",
      "ironman",
      "wolverine",
      "deadpool",
      "blackpanther",
      "captainamerica",
      "hellboy",
      "drstrange",
      "avengers",
      "flash",
    ],
  },
  {
    id: 2,
    name: "Animals",
    searchOptions: [
      "animals",
      "cat",
      "lion",
      "dog",
      "tiger",
      "duck",
      "buffalo",
      "crocodile",
      "fish",
      "salmon",
      "cow",
      "rhino",
      "mouse",
      "elephant",
      "giraffe",
      "zebra",
      "kangaroo",
      "panda",
      "penguin",
      "leopard",
      "wolf",
      "bear",
      "dolphin",
      "whale",
      "shark",
      "eagle",
      "falcon",
      "camel",
      "rabbit",
      "squirrel",
      "koala",
      "parrot",
      "peacock",
    ],
  },
  {
    id: 3,
    name: "People",
    searchOptions: [
      "People",
      "Humans",
      "girl",
      "boy",
      "man",
      "woman",
      "teenager",
      "child",
      "adult",
      "senior",
      "doctor",
      "teacher",
      "student",
      "engineer",
      "artist",
      "athlete",
      "chef",
      "nurse",
      "police officer",
      "firefighter",
      "scientist",
      "pilot",
      "soldier",
      "musician",
      "actor",
      "dancer",
      "businessperson",
      "farmer",
      "programmer",
      "lawyer",
      "model",
      "writer",
      "astronaut",
    ],
  },
  {
    id: 4,
    name: "Boys",
    searchOptions: [
      "Boys",
      "fashion",
      "beard",
      "hairstyle",
      "shoes",
      "watch",
      "gym",
      "sports",
      "cars",
      "gadgets",
      "gaming",
      "sneakers",
      "t-shirts",
      "jeans",
      "jackets",
      "suits",
      "hoodies",
      "hats",
      "belts",
      "backpacks",
      "sunglasses",
      "wallets",
      "scarves",
      "ties",
      "cufflinks",
      "watches",
      "bracelets",
      "rings",
      "perfume",
      "sandals",
      "loafers",
      "bikes",
    ],
  },
  {
    id: 5,
    name: "Girls",
    searchOptions: [
      "Girls",
      "fashion",
      "makeup",
      "hairstyle",
      "dress",
      "heels",
      "perfume",
      "jewelry",
      "bag",
      "nail art",
      "fitness",
      "skincare",
      "eyeliner",
      "lipstick",
      "bracelets",
      "earrings",
      "scarves",
      "gowns",
      "sunglasses",
      "watches",
      "flats",
      "sandals",
      "t-shirts",
      "skirts",
      "hats",
      "belts",
      "jumpsuits",
      "jackets",
      "leggings",
      "coats",
      "handbags",
      "sweaters",
    ],
  },
  {
    id: 6,
    name: "Gym",
    searchOptions: [
      "Gym",
      "dumbbells",
      "barbells",
      "treadmill",
      "squat rack",
      "resistance bands",
      "bench press",
      "pull-up bar",
      "kettlebells",
      "yoga mat",
      "cardio",
      "strength training",
      "HIIT",
      "crossfit",
      "powerlifting",
      "bodybuilding",
      "deadlift",
      "protein powder",
      "supplements",
      "pre-workout",
      "post-workout",
      "calisthenics",
      "fitness apps",
      "fitness tracker",
      "workout shoes",
      "gym bag",
      "water bottle",
      "headphones",
      "running",
      "cycling",
      "swimming",
      "rowing machine",
    ],
  },
  {
    id: 7,
    name: "Gaming",
    searchOptions: [
      "Gaming",
      "pubg",
      "callofduty",
      "bgmi",
      "football",
      "cricket",
      "hockey",
      "rugby"
    ],
  },
  {
    id: 8,
    name: "Science",
    searchOptions: [
      "Science",
      "physics",
      "chemistry",
      "biology",
      "astronomy",
      "genetics",
      "neuroscience",
      "ecology",
      "evolution",
      "space exploration",
      "quantum mechanics",
      "nuclear physics",
      "robotics",
      "AI",
      "data science",
      "geology",
      "climate science",
      "mathematics",
      "astronauts",
      "microscopy",
      "DNA",
      "immunology",
      "cell biology",
      "biotechnology",
      "research labs",
      "innovation",
      "medicine",
      "vaccines",
      "space telescopes",
      "dark matter",
      "particle physics",
      "biochemistry",
    ],
  },
  {
    id: 9,
    name: "Space",
    searchOptions: [
      "Space",
      "planets",
      "stars",
      "galaxies",
      "black holes",
      "astronauts",
      "space missions",
      "moon",
      "mars",
      "satellites",
      "spacecraft",
      "NASA",
      "spaceX",
      "comets",
      "asteroids",
      "nebulae",
      "supernovae",
      "space stations",
      "cosmos",
      "spacewalk",
      "alien life",
      "exoplanets",
      "rocket science",
      "space exploration",
      "telescopes",
      "space travel",
      "gravity",
      "cosmic rays",
      "meteors",
      "quasars",
      "dark energy",
      "light years",
    ],
  },
  {
    id: 10,
    name: "Cars",
    searchOptions: [
      "Cars",
      "sedan",
      "SUV",
      "hatchback",
      "convertible",
      "electric car",
      "sports car",
      "luxury car",
      "hybrid car",
      "muscle car",
      "off-road",
      "coupe",
      "classic car",
      "pickup truck",
      "vintage car",
      "car maintenance",
      "car mods",
      "car tuning",
      "car brands",
      "car accessories",
      "car insurance",
      "car repair",
      "car design",
      "racing",
      "car interior",
      "car audio",
      "fuel efficiency",
      "car dealerships",
      "autonomous cars",
      "car safety",
      "road trips",
      "custom cars",
    ],
  },
  {
    id: 11,
    name: "Bikes",
    searchOptions: [
      "Bikes",
      "mountain bike",
      "road bike",
      "BMX",
      "electric bike",
      "folding bike",
      "hybrid bike",
      "touring bike",
      "cruiser bike",
      "bike accessories",
      "bike maintenance",
      "bike gears",
      "bike trails",
      "cycling",
      "bike helmets",
      "bike lights",
      "bike racks",
      "bike lock",
      "bike repair",
      "biking clothes",
      "bike brands",
      "racing bikes",
      "vintage bikes",
      "commuter bikes",
      "fitness bikes",
      "bike pumps",
      "off-road biking",
      "bike safety",
      "bike routes",
      "long-distance biking",
      "bike sharing",
    ],
  },
  {
    id: 12,
    name: "Billionaires",
    searchOptions: [
      "Billionaires",
      "Elon Musk",
      "Jeff Bezos",
      "Bill Gates",
      "Warren Buffet",
      "Mark Zuckerberg",
      "Bernard Arnault",
      "Larry Page",
      "Sergey Brin",
      "Steve Ballmer",
      "Larry Ellison",
      "Mukesh Ambani",
      "Gautam Adani",
      "Francoise Bettencourt",
      "Michael Bloomberg",
      "Jack Ma",
      "Alice Walton",
      "Jim Walton",
      "Rob Walton",
      "Ma Huateng",
      "Zhong Shanshan",
      "Amancio Ortega",
      "Carlos Slim",
      "Charles Koch",
      "David Koch",
      "George Soros",
      "Sheldon Adelson",
      "Phil Knight",
      "Dieter Schwarz",
      "Leonardo Del Vecchio",
      "Azim Premji",
    ],
  }
  
];


type imageObj = {
  image: string;
  category: string;
  tags: string[];
};

export type collectionData = {
  collection: string;
  images: imageObj[];
};

export const imageData: collectionData[] = [
  {
    collection: "NatureScenery",
    images: [
      {
        image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa",
        tags: ["mountain", "lake", "sky"],
        category: discoverFilters[0].name
      },
      {
        image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
        tags: ["waterfall", "nature", "rocks"],
        category: discoverFilters[0].name
      },
      {
        image: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c",
        tags: ["beach", "ocean", "sunset"],
        category: discoverFilters[0].name
      },
      {
        image: "https://images.unsplash.com/photo-1521334884684-d80222895322",
        tags: ["desert", "sand", "dunes"],
        category: discoverFilters[0].name
      }
    ]
  },
  {
    collection: "NatureLandscape",
    images: [
      {
        image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa",
        tags: ["mountains", "sunrise", "horizon"],
        category: discoverFilters[0].name
      },
      {
        image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
        tags: ["meadow", "flowers", "grass"],
        category: discoverFilters[0].name
      },
      {
        image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
        tags: ["forest", "autumn", "leaves"],
        category: discoverFilters[0].name
      },
      {
        image: "https://images.unsplash.com/photo-1449168013943-3a15804bb41c",
        tags: ["snow", "mountain", "winter"],
        category: discoverFilters[0].name
      }
    ]
  },
  {
    collection: "NaturalBeauty",
    images: [
      {
        image: "https://images.unsplash.com/photo-1457269449834-928af64c684d",
        tags: ["waterfall", "mist", "nature"],
        category: discoverFilters[0].name
      },
      {
        image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
        tags: ["forest", "pathway", "greenery"],
        category: discoverFilters[0].name
      },
      {
        image: "https://i.pinimg.com/236x/2c/55/21/2c5521af4bfbd2d545c388de165b9bb8.jpg",
        tags: ["lake", "reflections", "trees"],
        category: discoverFilters[0].name
      },
      {
        image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
        tags: ["beach", "coast", "waves"],
        category: discoverFilters[0].name
      },
    ]
  },
  {
    collection: "Nature",
    images: [
      {
        image: "https://i.pinimg.com/236x/6c/12/86/6c1286a1895046fdb0dd8b9ff8c5db42.jpg",
        category: discoverFilters[0].name,
        tags: discoverFilters[0].searchOptions,
      },
      {
        image: "https://i.pinimg.com/236x/55/d0/07/55d00707d138b56178d6c22489ea148f.jpg",
        category: discoverFilters[0].name,
        tags: [...discoverFilters[0].searchOptions,'sunset', 'sun', 'beach', 'ocean'],
      },
      {
        image: "https://i.pinimg.com/236x/a8/b1/77/a8b177e769a1166e228ecd3c8528dce5.jpg",
        category: discoverFilters[0].name,
        tags: [...discoverFilters[0].searchOptions,'sunset', 'sun', 'beach', 'ocean', 'tree'],
      },
      {
        image: "https://i.pinimg.com/236x/b4/78/a2/b478a2981dadc5d762d312f47ff44e62.jpg",
        category: discoverFilters[0].name,
        tags: [...discoverFilters[0].searchOptions,'sunset', 'sun', 'beach', 'ocean'],
      },
      {
        image: "https://i.pinimg.com/236x/27/fc/ab/27fcab30ec27cc1a0742dd4dd8081c66.jpg",
        category: discoverFilters[0].name,
        tags: [...discoverFilters[0].searchOptions,'sunset', 'sun', 'beach', 'ocean'],
      },
      {
        image: "https://i.pinimg.com/236x/52/f0/f5/52f0f55aed021dc1a81cbf51454bd930.jpg",
        category: discoverFilters[0].name,
        tags: [...discoverFilters[0].searchOptions,'sunset', 'sun', 'beach', 'ocean'],
      },
      {
        image: "https://i.pinimg.com/236x/09/47/db/0947db859f8bbec51f4f85d030c59b03.jpg",
        category: discoverFilters[0].name,
        tags: discoverFilters[0].searchOptions,
      },
      {
        image: "https://i.pinimg.com/236x/9e/1b/56/9e1b567a5445db392298cd5affa4239e.jpg",
        category: discoverFilters[0].name,
        tags: discoverFilters[0].searchOptions,
      },
      {
        image: "https://i.pinimg.com/236x/b4/60/0b/b4600b612afa7af00e1d68783d8ea21a.jpg",
        category: discoverFilters[0].name,
        tags: discoverFilters[0].searchOptions,
      },
      {
        image: "https://i.pinimg.com/236x/b4/14/03/b41403e9a36b943a9a5ce39783bd88e0.jpg",
        category: discoverFilters[0].name,
        tags: discoverFilters[0].searchOptions,
      },
      {
        image: "https://i.pinimg.com/236x/9e/c8/ba/9ec8bac3119a7127998dc8ade76326db.jpg",
        category: discoverFilters[0].name,
        tags: discoverFilters[0].searchOptions,
      },
    ],
  },
  {
    collection: "Avengers",
    images: [
      {
        image: "https://i.pinimg.com/236x/d8/8d/41/d88d4171b97b8eba2b1382a09deb7dc8.jpg",
        category: discoverFilters[1].name,
        tags: discoverFilters[1].searchOptions,
      },
      {
        image: "https://i.pinimg.com/236x/17/d3/4c/17d34c7da196f155d4ecc0c85b8cdd3d.jpg",
        category: discoverFilters[1].name,
        tags: [...discoverFilters[1].searchOptions, 'deadpool','superhero'],
      },
      {
        image: "https://i.pinimg.com/236x/0f/48/b4/0f48b44891e045518d73ec92c3aa4d37.jpg",
        category: discoverFilters[1].name,
        tags: [...discoverFilters[1].searchOptions, 'deadpool','superhero' ],
      },
      {
        image: "https://i.pinimg.com/236x/63/42/97/6342975acb89e9ee3d040191f120928c.jpg",
        category: discoverFilters[1].name,
        tags: [...discoverFilters[1].searchOptions,'deadpool','superhero'],
      },
      {
        image: "https://i.pinimg.com/236x/b0/e4/4b/b0e44b2c6f765efa95d28b91bbfaf618.jpg",
        category: discoverFilters[1].name,
        tags: [...discoverFilters[1].searchOptions, 'deadpool','superhero'],
      },
      {
        image: "https://i.pinimg.com/236x/a7/48/e3/a748e3becc91e9e3300818b3e499f3fe.jpg",
        category: discoverFilters[1].name,
        tags: [...discoverFilters[1].searchOptions, 'deadpool','superhero'],
      },
      {
        image: "https://i.pinimg.com/236x/28/ee/23/28ee23692062e90bde0c0631966d4ae1.jpg",
        category: discoverFilters[1].name,
        tags: [...discoverFilters[1].searchOptions, 'spiderman','superhero'],
      },
      {
        image: "https://i.pinimg.com/236x/63/39/e9/6339e949b22c3e43a052e3e345a3b972.jpg",
        category: discoverFilters[1].name,
        tags: [...discoverFilters[1].searchOptions, 'spiderman','superhero'],
      },
      {
        image: "https://i.pinimg.com/236x/da/cc/fb/daccfb69407a8ed09f9eb945cb0d86f4.jpg",
        category: discoverFilters[1].name,
        tags: [...discoverFilters[1].searchOptions,'spiderman','superhero' ],
      },
      {
        image: "https://i.pinimg.com/236x/4a/29/a6/4a29a682bfc5dfe4f6307a3cf3a84c64.jpg",
        category: discoverFilters[1].name,
        tags: [...discoverFilters[1].searchOptions, 'spiderman','superhero'],
      },
      {
        image: "https://i.pinimg.com/236x/c6/a7/18/c6a7180205d987dead83037dda2ba9c1.jpg",
        category: discoverFilters[1].name,
        tags: discoverFilters[1].searchOptions,
      },
      {
        image: "https://i.pinimg.com/474x/77/1c/f4/771cf485835951334e97ef4e5b116566.jpg",
        category: discoverFilters[1].name,
        tags: discoverFilters[1].searchOptions,
      },
      {
        image: "https://i.pinimg.com/236x/4b/54/69/4b5469fafdfcdf67376bee0452b7d50e.jpg",
        category: discoverFilters[1].name,
        tags: discoverFilters[1].searchOptions,
      },
      {
        image: "https://i.pinimg.com/236x/bd/00/32/bd0032a35240c55aa6ea163eea0e58b2.jpg",
        category: discoverFilters[1].name,
        tags: discoverFilters[1].searchOptions,
      },
    ],
  },
  {
    collection: "Animals",
    images: [
      {
        image: "https://i.pinimg.com/236x/51/ce/6a/51ce6a3f68585bb4bf3963a09ea7c323.jpg",
        category: discoverFilters[2].name,
        tags: discoverFilters[2].searchOptions,
      },
      {
        image: "https://i.pinimg.com/236x/34/ff/e0/34ffe039527cf461026fb6a50df7658b.jpg",
        category: discoverFilters[2].name,
        tags: [...discoverFilters[2].searchOptions, 'dog', 'meme', 'funny','hilarious', 'lol'],
      },
      {
        image: "https://i.pinimg.com/236x/34/cf/33/34cf332f10c7a11df12028bbec32c73c.jpg",
        category: discoverFilters[2].name,
        tags: [...discoverFilters[2].searchOptions, 'monkey', 'meme', 'funny','hilarious', 'lol'],
      },
      {
        image: "https://i.pinimg.com/236x/e8/1d/57/e81d579637ad781ab0692cabf3fb3d2d.jpg",
        category: discoverFilters[2].name,
        tags: [...discoverFilters[2].searchOptions, 'mouse', 'meme', 'funny','hilarious', 'lol'],
      },
      {
        image: "https://i.pinimg.com/236x/87/e2/f0/87e2f0e3ab3a2f719da1ee3db638d71e.jpg",
        category: discoverFilters[2].name,
        tags: [...discoverFilters[2].searchOptions, 'jungle', 'kitty', 'cute'],
      },
      {
        image: "https://i.pinimg.com/236x/7b/8a/1c/7b8a1c87910ea3d2387657f88572aa66.jpg",
        category: discoverFilters[2].name,
        tags: [...discoverFilters[2].searchOptions, 'squrial','jungle','cute'],
      },
      {
        image: "https://i.pinimg.com/236x/24/bc/1b/24bc1b4f7fe377849b845c3182f47b4c.jpg",
        category: discoverFilters[2].name,
        tags: discoverFilters[2].searchOptions,
      },
      {
        image: "https://i.pinimg.com/236x/be/d7/63/bed7639b0a4c92f8a02414968b7a9907.jpg",
        category: discoverFilters[2].name,
        tags: discoverFilters[2].searchOptions,
      },
      {
        image: "https://i.pinimg.com/236x/c8/ab/e3/c8abe35a14493db44720113a51212aca.jpg",
        category: discoverFilters[2].name,
        tags: discoverFilters[2].searchOptions,
      },
      {
        image: "https://i.pinimg.com/236x/f3/70/8e/f3708ed3b06c862d3fc00ebd8c75ba38.jpg",
        category: discoverFilters[2].name,
        tags: discoverFilters[2].searchOptions,
      },
      {
        image: "https://i.pinimg.com/236x/05/19/c6/0519c68aab5028942b31d861916f32f8.jpg",
        category: discoverFilters[2].name,
        tags: discoverFilters[2].searchOptions,
      },
      {
        image: "https://i.pinimg.com/236x/3d/25/33/3d2533405844aec70fdd869e6fff8c0d.jpg",
        category: discoverFilters[2].name,
        tags: discoverFilters[2].searchOptions,
      },
    ],
  },
  {
    collection: "Random Picks",
    images: [
      {
        image: "https://i.pinimg.com/236x/cb/fe/25/cbfe25decebe0416ed866fe97d75d6a0.jpg",
        category: discoverFilters[3].name,
        tags: [...discoverFilters[1].searchOptions,...discoverFilters[2].searchOptions,...discoverFilters[3].searchOptions,...discoverFilters[4].searchOptions],
      },
      {
        image: "https://i.pinimg.com/236x/a8/f5/0f/a8f50ff98ba9d9ca3f059166a5f247ec.jpg",
        category: discoverFilters[3].name,
        tags: [...discoverFilters[1].searchOptions,...discoverFilters[2].searchOptions,...discoverFilters[3].searchOptions,...discoverFilters[4].searchOptions],
      },
      {
        image: "https://i.pinimg.com/236x/b1/1f/4d/b11f4d70197fb476bc0e329bd1c38ed4.jpg",
        category: discoverFilters[3].name,
        tags: [...discoverFilters[1].searchOptions,...discoverFilters[2].searchOptions,...discoverFilters[3].searchOptions,...discoverFilters[4].searchOptions],
      },
      {
        image: "https://i.pinimg.com/236x/7a/bc/3c/7abc3c250e0a21da59e54a4de145ae80.jpg",
        category: discoverFilters[3].name,
        tags: [...discoverFilters[1].searchOptions,...discoverFilters[2].searchOptions,...discoverFilters[3].searchOptions,...discoverFilters[4].searchOptions],
      },
      {
        image: "https://i.pinimg.com/236x/00/a6/cf/00a6cfce2060c951ae7dad14a1af956b.jpg",
        category: discoverFilters[3].name,
        tags: [...discoverFilters[1].searchOptions,...discoverFilters[2].searchOptions,...discoverFilters[3].searchOptions,...discoverFilters[4].searchOptions],
      },
      {
        image: "https://i.pinimg.com/236x/5b/8b/45/5b8b456d66dc197e59ee1dd438cb4a02.jpg",
        category: discoverFilters[3].name,
        tags: [...discoverFilters[1].searchOptions,...discoverFilters[2].searchOptions,...discoverFilters[3].searchOptions,...discoverFilters[4].searchOptions,'animal','gorrila', 'meme', 'funny' ],
      },
      {
        image: "https://i.pinimg.com/236x/c9/07/8a/c9078acb40ca4c62a0279880c458c3d4.jpg",
        category: discoverFilters[3].name,
        tags: [...discoverFilters[1].searchOptions,...discoverFilters[2].searchOptions,...discoverFilters[3].searchOptions,...discoverFilters[4].searchOptions,'animal','gorrila', 'meme', 'funny' ],
      },
      {
        image: "https://i.pinimg.com/236x/18/85/21/18852105e109c6020d4089b37cc8403e.jpg",
        category: discoverFilters[3].name,
        tags: [...discoverFilters[1].searchOptions,...discoverFilters[2].searchOptions,...discoverFilters[3].searchOptions,...discoverFilters[4].searchOptions,'animal','cat','hilarious', 'meme', 'funny' ],
      },
      {
        image: "https://i.pinimg.com/236x/86/ef/d4/86efd437d922088ddb8b23887128edb7.jpg",
        category: discoverFilters[3].name,
        tags: [...discoverFilters[1].searchOptions,...discoverFilters[2].searchOptions,...discoverFilters[3].searchOptions,...discoverFilters[4].searchOptions,'animal','cat','hilarious','meme', 'funny' ],
      },
      {
        image: "https://i.pinimg.com/236x/74/6e/c5/746ec58b5c75dd20d767bfbeafd03597.jpg",
        category: discoverFilters[3].name,
        tags: [...discoverFilters[1].searchOptions,...discoverFilters[2].searchOptions,...discoverFilters[3].searchOptions,...discoverFilters[4].searchOptions,'animal','morivation', 'meme', 'funny' ],
      },
      {
        image: "https://i.pinimg.com/236x/b6/2b/0d/b62b0dbc15221ea0f08359ba9d1ccd52.jpg",
        category: discoverFilters[3].name,
        tags: [...discoverFilters[1].searchOptions,...discoverFilters[2].searchOptions,...discoverFilters[3].searchOptions,...discoverFilters[4].searchOptions,'meme', 'funny'],
      },
      {
        image: "https://i.pinimg.com/236x/2f/4a/1a/2f4a1a312e60a7cb452bf4a35f904655.jpg",
        category: discoverFilters[3].name,
        tags: [...discoverFilters[1].searchOptions,...discoverFilters[2].searchOptions,...discoverFilters[3].searchOptions,...discoverFilters[4].searchOptions,'meme', 'funny', 'mustach', 'funny guy', 'hahaha', 'lol'],
      },
      {
        image: "https://i.pinimg.com/736x/bb/f5/63/bbf5634ff73fa3d694fb549b50aa47f0.jpg",
        category: discoverFilters[3].name,
        tags: [...discoverFilters[1].searchOptions,...discoverFilters[2].searchOptions,...discoverFilters[3].searchOptions,...discoverFilters[4].searchOptions,'meme', 'funny','hahaha', 'lol', 'dog'],
      },
      {
        image: "https://i.pinimg.com/236x/69/f9/56/69f956d5463265ce96c2cfd961491a32.jpg",
        category: discoverFilters[3].name,
        tags: [...discoverFilters[1].searchOptions,...discoverFilters[2].searchOptions,...discoverFilters[3].searchOptions,...discoverFilters[4].searchOptions,'meme', 'funny','hahaha', 'lol','guy', 'upsidedown'],
      },
      {
        image: "https://i.pinimg.com/236x/77/62/16/7762161f87842b5e233e5e0f6fdca65b.jpg",
        category: discoverFilters[3].name,
        tags: [...discoverFilters[1].searchOptions,...discoverFilters[2].searchOptions,...discoverFilters[3].searchOptions,...discoverFilters[4].searchOptions,'meme', 'funny','hahaha', 'lol','guy', 'upsidedown', 'spongebob', 'patrick'],
      },
      {
        image: "https://i.pinimg.com/736x/6a/a7/b8/6aa7b8cb9898001e7f85a8c824115006.jpg",
        category: discoverFilters[3].name,
        tags: [...discoverFilters[1].searchOptions,...discoverFilters[2].searchOptions,...discoverFilters[3].searchOptions,...discoverFilters[4].searchOptions,'meme', 'funny','hahaha', 'lol','guy', 'upsidedown', 'spongebob', 'patrick'],
      },
      {
        image: "https://i.pinimg.com/236x/80/cf/97/80cf9733414e55c20f2300d377741220.jpg",
        category: discoverFilters[3].name,
        tags: [...discoverFilters[1].searchOptions,...discoverFilters[2].searchOptions,...discoverFilters[3].searchOptions,...discoverFilters[4].searchOptions,'meme', 'funny','hahaha', 'lol','guy', 'upsidedown', 'spongebob', 'patrick'],
      },
      {
        image: "https://i.pinimg.com/236x/87/1d/6e/871d6e6fe0ca3e86ca8cef96c0102ebe.jpg",
        category: discoverFilters[3].name,
        tags: [...discoverFilters[1].searchOptions,...discoverFilters[2].searchOptions,...discoverFilters[3].searchOptions,...discoverFilters[4].searchOptions,'meme', 'funny','hahaha', 'lol','guy', 'upsidedown', 'spongebob', 'patrick'],
      },
      {
        image: "http://www.livinglocurto.com/wp-content/uploads/2014/06/mr-krabs-money.jpg",
        category: discoverFilters[3].name,
        tags: [...discoverFilters[1].searchOptions,...discoverFilters[2].searchOptions,...discoverFilters[3].searchOptions,...discoverFilters[4].searchOptions,'meme', 'funny','hahaha', 'lol','guy', 'upsidedown', 'spongebob', 'patrick'],
      },
    ],
  },
  {
    collection: "Models",
    images: [
      {
        image: "https://i.pinimg.com/474x/11/15/98/111598b6ef47dd48e848abc2149da89f.jpg",
        category: discoverFilters[4].name,
        tags: [...discoverFilters[4].searchOptions, 'model', 'guy', 'handsome', 'fashion', 'sitting'],
      },
      {
        image: "https://i.pinimg.com/474x/69/68/b5/6968b5d395e8525ef1307621f7e10ff4.jpg",
        category: discoverFilters[4].name,
        tags: [...discoverFilters[4].searchOptions, 'model', 'guy', 'handsome', 'fashion', 'sitting'],
      },
      {
        image: "https://i.pinimg.com/474x/1c/4b/fa/1c4bfa263addcf8ddbaf93735f46d854.jpg",
        category: discoverFilters[4].name,
        tags: [...discoverFilters[4].searchOptions, 'model', 'guy', 'handsome','bodybuilder', 'fashion', 'sitting'],
      },
      {
        image: "https://i.pinimg.com/236x/46/3a/1d/463a1d19d2d7b1a2e25c7c8edb944838.jpg",
        category: discoverFilters[4].name,
        tags: [...discoverFilters[4].searchOptions, 'model', 'guy', 'handsome','bodybuilder', 'fashion', 'sitting'],
      },
      {
        image: "https://i.pinimg.com/236x/be/77/01/be7701ac12b2bd97707f4dd22c236cd3.jpg",
        category: discoverFilters[4].name,
        tags: [...discoverFilters[4].searchOptions, 'model', 'girl', 'beautiful', 'fashion', 'sitting'],
      },
      {
        image: "https://i.pinimg.com/236x/64/7e/29/647e29c52503dd77cfa85098638d7a54.jpg",
        category: discoverFilters[4].name,
        tags: [...discoverFilters[4].searchOptions, 'model', 'girl', 'beautiful', 'fashion', 'sitting'],
      },
      {
        image: "https://i.pinimg.com/236x/4e/92/e5/4e92e54a450bf96d9fa35c349ec3b7fe.jpg",
        category: discoverFilters[4].name,
        tags: [...discoverFilters[4].searchOptions, 'model', 'girl', 'beautiful', 'fashion', 'sitting'],
      },
      {
        image: "https://i.pinimg.com/236x/83/d6/fe/83d6fece0c1bfe9aef52928f2d2bc3c8.jpg",
        category: discoverFilters[4].name,
        tags: [...discoverFilters[4].searchOptions, 'model', 'girl', 'beautiful', 'fashion', 'sitting'],
      },
      {
        image: "https://i.pinimg.com/236x/f7/43/06/f74306308cc35d268a86842ec36e5e3f.jpg",
        category: discoverFilters[4].name,
        tags: [...discoverFilters[4].searchOptions, 'model', 'girl', 'beautiful', 'fashion', 'sitting'],
      },
      {
        image: "https://i.pinimg.com/236x/dc/17/bb/dc17bb3bdd519aa773b18ce210a415bd.jpg",
        category: discoverFilters[4].name,
        tags: discoverFilters[4].searchOptions,
      },
      {
        image: "https://i.pinimg.com/236x/d6/1f/cf/d61fcf28696b382c40fce978c249b21e.jpg",
        category: discoverFilters[4].name,
        tags: discoverFilters[4].searchOptions,
      },
      {
        image: "https://i.pinimg.com/236x/e7/5b/91/e75b914d158a817065094612de2257a7.jpg",
        category: discoverFilters[4].name,
        tags: [...discoverFilters[4].searchOptions, ''],
      },
    ],
  },
  {
    collection: "Body Building",
    images: [
      {
        image: "https://i.pinimg.com/236x/03/c5/f6/03c5f6f4479024f922cc6370bf98f8bf.jpg",
        category: discoverFilters[6].name,
        tags: [...discoverFilters[6].searchOptions, 'biceps', 'chest', '6 packs','abs', 'weightlifting', 'jawline','bodybulding', 'fitness'],
      },
      {
        image: "https://i.pinimg.com/236x/0f/35/2e/0f352e35287c362a0a243b0e86fd38ee.jpg",
        category: discoverFilters[6].name,
        tags: [...discoverFilters[6].searchOptions, 'weights', 'bodybuilding', 'weighttraining','studio',  ],
      },
      {
        image: "https://i.pinimg.com/236x/44/1e/85/441e8559a94328a48d7149fd645eb10b.jpg",
        category: discoverFilters[6].name,
        tags: [...discoverFilters[6].searchOptions,'biceps', 'chest', '6 packs','abs', 'weightlifting', 'jawline','bodybulding', 'girl','gymgirl', 'fitness'],
      },
      {
        image: "https://i.pinimg.com/236x/10/93/5f/10935fd645cc7da8152a5c0fbf926538.jpg",
        category: discoverFilters[6].name,
        tags: [...discoverFilters[6].searchOptions, 'anime', 'bodybuilding', 'biceps', 'chest', '6 packs','abs', 'weightlifting', 'jawline','bodybulding', 'fitness'],
      },
      {
        image: "https://i.pinimg.com/236x/6f/9e/d1/6f9ed1f5c6cd3bac500ea94c118f803c.jpg",
        category: discoverFilters[6].name,
        tags: [...discoverFilters[6].searchOptions, 'anime', 'bodybuilding', 'biceps', 'chest', '6 packs','abs', 'weightlifting', 'jawline','bodybulding', 'fitness', 'shoulders','back', 'heavyweight','sweating'],
      },
      {
        image: "https://i.pinimg.com/236x/e7/55/21/e7552140c4565b1544947eba4536dd74.jpg",
        category: discoverFilters[6].name,
        tags: [...discoverFilters[6].searchOptions, 'anime', 'bodybuilding', 'biceps', 'chest', '6 packs','abs', 'weightlifting', 'jawline','bodybulding', 'fitness', 'cartoon'],
      },
      {
        image: "https://i.pinimg.com/236x/6c/aa/ed/6caaed54ffe3ab9b2febbea915557994.jpg",
        category: discoverFilters[6].name,
        tags: [...discoverFilters[6].searchOptions, 'anime', 'bodybuilding', 'biceps', 'chest', '6 packs','abs', 'weightlifting', 'jawline','bodybulding', 'fitness', 'back', 'spine'],
      },
      {
        image: "https://i.pinimg.com/474x/7f/91/2b/7f912b092e71134f0e7db187be68f37b.jpg",
        category: discoverFilters[6].name,
        tags: [...discoverFilters[6].searchOptions, 'anime', 'bodybuilding', 'biceps', 'chest', '6 packs','abs', 'weightlifting', 'jawline','bodybulding', 'fitness', 'cardio', 'running', 'jogging'],
      },
    ],
  },
  {
    collection: "BillionairePortraits",
    images: [
      {
        image: "https://images.unsplash.com/photo-1522202223705-959b6f2d6b48",
        tags: ["businessman", "portrait", "suit"],
        category: discoverFilters[11].name
      },
      {
        image: "https://images.unsplash.com/photo-1517263904808-5bc7612a7798",
        tags: ["executive", "leadership", "business"],
        category: discoverFilters[11].name
      },
      {
        image: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1",
        tags: ["entrepreneur", "visionary", "innovation"],
        category: discoverFilters[11].name
      },
      {
        image: "https://images.unsplash.com/photo-1554151228-14d9def656e4",
        tags: ["wealth", "success", "luxury"],
        category: discoverFilters[11].name
      },
      {
        image: "https://images.unsplash.com/photo-1603415526960-52ab636606f4",
        tags: ["corporate", "influence", "finance"],
        category: discoverFilters[11].name
      }
    ]
  },
  {
    collection: "BillionaireLifestyle",
    images: [
      {
        image: "https://images.unsplash.com/photo-1517242024945-75a4c1f1f14f",
        tags: ["luxury", "lifestyle", "private jet"],
        category: discoverFilters[11].name
      },
      {
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
        tags: ["yacht", "vacation", "wealth"],
        category: discoverFilters[11].name
      },
      {
        image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312",
        tags: ["sports car", "luxury", "billionaire"],
        category: discoverFilters[11].name
      },
      {
        image: "https://images.unsplash.com/photo-1563223409373-8487d602d8d1",
        tags: ["mansion", "real estate", "property"],
        category: discoverFilters[11].name
      },
      {
        image: "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec",
        tags: ["private island", "exclusive", "vacation"],
        category: discoverFilters[11].name
      }
    ]
  },
  {
    collection: "BillionaireBusiness",
    images: [
      {
        image: "https://images.unsplash.com/photo-1501555088652-021faa6b1424",
        tags: ["conference", "leadership", "business"],
        category: discoverFilters[11].name
      },
      {
        image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4",
        tags: ["boardroom", "corporate", "decision making"],
        category: discoverFilters[11].name
      },
      {
        image: "https://images.unsplash.com/photo-1560185127-6ecdc5ed4d65",
        tags: ["investor", "networking", "finance"],
        category: discoverFilters[11].name
      },
      {
        image: "https://images.unsplash.com/photo-1564866657311-e1cc905ed5f5",
        tags: ["startups", "growth", "innovation"],
        category: discoverFilters[11].name
      },
      {
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
        tags: ["stock market", "wealth", "finance"],
        category: discoverFilters[11].name
      }
    ]
  }
  // Add collections 4, 5, and 6 in a similar manner...
];


