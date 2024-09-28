const GAME_NODE = document.querySelector("#game-board");
const VICTORY_TEXT = document.querySelector("#victory-message");
const START_GAME_BTN = document.querySelector("#new-game-btn");

const VISIBLE_CARD_CLASSNAME = "visible";

const CARD_FLIP_TIMEOUT_MS = 500;
const CARD_ELEMENTS = ["🍇", "🍒", "🥭", "🍍", "🍉", "🥝"];

const CARD_AMOUNT = 12;
const VISIBLE_CARDS = [];

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

function handleCardClick() {}

startGame();

{
  /* <div class="card visible">
  <div class="card-inner">
    <div class="card-front">Лицевая</div>
    <div class="card-back">Задняя</div>
  </div>
</div>; */
}
