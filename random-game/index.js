const GAME_NODE = document.querySelector("#game-board");
const VICTORY_TEXT = document.querySelector("#victory-message");
const START_GAME_BTN = document.querySelector("#new-game-btn");

const VISIBLE_CARD_CLASSNAME = "visible";

const CARD_FLIP_TIMEOUT_MS = 500;
const CARD_ELEMENTS = ["🍇", "🍒", "🥭", "🍍", "🍉", "🥝"];

const CARD_AMOUNT = 12;
let VISIBLE_CARDS = [];

START_GAME_BTN.addEventListener("click", startGame);

function startGame() {
  [GAME_NODE, VICTORY_TEXT].forEach((element) => (element.textContent = ""));
  const CARD_VALUES = generateArray(CARD_ELEMENTS, CARD_AMOUNT);
  console.log(CARD_VALUES);
  CARD_VALUES.forEach((element) => renderCard(element));
}

function generateArray(emojies, cardAmount) {
  const randomArray = [];
  const elementCount = {};

  for (const emoji of emojies) {
    elementCount[emoji] = 0;
  }

  while (randomArray.length < cardAmount) {
    const randomIndex = Math.floor(Math.random() * emojies.length);
    const randomElement = emojies[randomIndex];

    if (elementCount[randomElement] < 2) {
      randomArray.push(randomElement);
      elementCount[randomElement]++;
    }
  }
  return randomArray;
}

function renderCard(emoji) {
  const card = document.createElement("div");
  card.classList.add("card");

  const cardInner = document.createElement("div");
  cardInner.classList.add("card-inner");

  const cardFront = document.createElement("div");
  cardFront.classList.add("card-front");

  const cardBack = document.createElement("div");
  cardBack.classList.add("card-back");

  cardFront.textContent = "?";
  cardBack.textContent = emoji;

  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);

  card.appendChild(cardInner);

  card.addEventListener("click", () => handleCardClick(card));
  GAME_NODE.appendChild(card);
}

function handleCardClick(card) {
  if (card.classList.contains(VISIBLE_CARD_CLASSNAME)) {
    return;
  }

  const checkVictory = () => {
    const visibleCardNode = document.querySelectorAll(
      `.${VISIBLE_CARD_CLASSNAME}`
    );
    if (visibleCardNode.length === CARD_AMOUNT) {
      VICTORY_TEXT.textContent = "Вы выйграли!";
    }
  };

  card.classList.add(VISIBLE_CARD_CLASSNAME);
  VISIBLE_CARDS.push(card);
  card
    .querySelector(".card-inner")
    .addEventListener("transitionend", checkVictory);
  if (VISIBLE_CARDS.length % 2 !== 0) {
    return;
  }

  const [prelastCard, lastCard] = VISIBLE_CARDS.slice(-2);
  if (prelastCard.textContent !== lastCard.textContent) {
    VISIBLE_CARDS = VISIBLE_CARDS.slice(0, VISIBLE_CARDS.length - 2);

    setTimeout(() => {
      lastCard.classList.remove(VISIBLE_CARD_CLASSNAME);
      prelastCard.classList.remove(VISIBLE_CARD_CLASSNAME);
    }, CARD_FLIP_TIMEOUT_MS);
  }
}

startGame();
