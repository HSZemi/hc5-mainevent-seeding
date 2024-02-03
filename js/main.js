//Global Holders and State Trackers
let heroes = [];
let currentBracketPos = 0;

// Constants for some animations
const maxIntervaltime = 2000;
let timeoutInterval = 50;
let lastRHero = -1;

jQuery(function () {
  init();

  //Trigger a Seed
  $("#seed").on("click", () => {
    $("#seed").prop("disabled", true);
    seed();
  });
});

//Init
const init = async () => {
  config.heroes.forEach((hero) => {
    heroes.push(new Hero(hero));
  });

  //Shuffle because we can
  shuffle(heroes);

  //Set default positions on the side
  heroes.forEach((hero, i) => hero.setDefaultPosition(i));
};

//Seed Hero
const seed = () => {
  const { index, hero } = selectRandomHero();
  console.log("SELECTED", hero);
  startSelectingAnimation(index);
  $(".loadingWrapper").css({ display: "block" });
};

//Start Selecting Animation
const startSelectingAnimation = (selectedHeroIndex) => {
  timeoutInterval = 50;
  incrementAndWait(selectedHeroIndex);
};

//Selecting Animation
const incrementAndWait = (selectedHeroIndex) => {
  if (timeoutInterval >= maxIntervaltime) {
    $(".loadingWrapper").css({ display: "none" });
    heroes.forEach((hero) =>
      $(hero.$node).css("background-image", 'url("img/HeroBracket.png")')
    );
    $(heroes[selectedHeroIndex].$node).css(
      "background-image",
      'url("img/HeroBracketSelected.png")'
    );
    setTimeout(function () {
      heroSelectionDone(selectedHeroIndex);
    }, maxIntervaltime / 2);
    return;
  }
  timeout = setTimeout(() => {
    incrementAndWait(selectedHeroIndex);
  }, timeoutInterval);
  timeoutInterval *= 1.3;

  heroes.forEach((hero) =>
    $(hero.$node).css("background-image", 'url("img/HeroBracket.png")')
  );

  let rHero = null;
  do {
    random = selectRandomHero();
    rHero = random;
  } while (lastRHero.index === random.index && heroes.length > 1);
  lastRHero = rHero;
  $(rHero.hero.$node).css(
    "background-image",
    'url("img/HeroBracketSelected.png")'
  );
};

//Once Selection done - moving it to the respective place in the bracket
const heroSelectionDone = (selectedHeroIndex) => {
  const selectedHero = heroes[selectedHeroIndex];
  gsap.to(selectedHero.$node, {
    y: gridConfig[currentBracketPos],
    x: 10,
    duration: maxIntervaltime / 2000,
    ease: "power4.out",
    onComplete: () => {
      $(selectedHero.$node).css(
        "background-image",
        'url("img/HeroBracket.png")'
      );

      currentBracketPos++;
      removeHero(selectedHeroIndex);

      if (heroes.length <= 1) {
        seedFinished();
      } else {
        $("#seed").prop("disabled", false);
      }
    },
  });
};

//Seed finished
const seedFinished = () => {
  if (heroes.length === 1) {
    //Placing last one automatically
    heroSelectionDone(0);
  }

  $(".loaderText").text("Seeding finished");
  $(".loadingWrapper").css({ display: "block" });
  $(".lds-roller").css({ opacity: 0 });
};

/**
 * Shuffles array in place. Fisher-Yates shuffle algorithm
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

/**
 * Select Random Hero from Array
 */
const selectRandomHero = () => {
  const random = Math.floor(Math.random() * heroes.length);
  return { index: random, hero: heroes[random] };
};

/**
 * Remove Hero by Index
 */
const removeHero = (index) => {
  heroes.splice(index, 1);
};

//Config
const config = {
  heroes: [
    {
      id: 0,
      name: "Jean Bureau",
    },
    {
      id: 1,
      name: "Gajah Mada",
    },
    {
      id: 2,
      name: "Khosrau",
    },
    {
      id: 3,
      name: "Pachacuti",
    },
    {
      id: 4,
      name: "Alexios Komnenos",
    },
    {
      id: 5,
      name: "Selim the Grim",
    },
    {
      id: 6,
      name: "Robert Guiscard",
    },
    {
      id: 7,
      name: "Sumanguru",
    },
    {
      id: 8,
      name: "Jadwiga",
    },
    {
      id: 9,
      name: "King Stephen",
    },
    {
      id: 10,
      name: "Cobra Car",
    },
    {
      id: 11,
      name: "Cobra Car",
    },
    {
      id: 12,
      name: "Cobra Car",
    },
    {
      id: 13,
      name: "Cobra Car",
    },
    {
      id: 14,
      name: "Cobra Car",
    },
    {
      id: 15,
      name: "Cobra Car",
    },
  ],
};

//Position Config for the left Bracket
const gridConfig = [
  90,
  150,
  213,
  273,
  337,
  397,
  460,
  520,
  584,
  644,
  707,
  767,
  831,
  891,
  954,
  1014,
];
