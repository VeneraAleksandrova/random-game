const GAME_NODE = document.querySelector("#game-board");
const VICTORY_TEXT = document.querySelector("#victory-message");
const START_GAME_BTN = document.querySelector("#new-game-btn");
const STEPS = document.querySelector(".steps");
const VISIBLE_CARD_CLASSNAME = "visible";
const RESULTS = document.querySelector("#results-of-game");
const CARD_FLIP_TIMEOUT_MS = 500;
const CARD_ELEMENTS = ["🍇", "🍒", "🥭", "🍍", "🍉", "🥝"];
const MODAL = document.querySelector(".modal-overlay");
const MODAL_WRAPPER = document.querySelector(".modal-wrapper");

const CARD_AMOUNT = 12;
let VISIBLE_CARDS = [];
let step = 0;
let WINNERS = [];
START_GAME_BTN.addEventListener("click", startGame);

function startGame() {
  checkSteps(true);
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

function checkSteps(newGame = false) {
  if (!newGame) {
    step++;
  } else {
    step = 0;
  }
  STEPS.textContent = step;
}
function handleCardClick(card) {
  if (card.classList.contains(VISIBLE_CARD_CLASSNAME)) {
    return;
  }
  checkSteps();
  const checkVictory = () => {
    const visibleCardNode = document.querySelectorAll(
      `.${VISIBLE_CARD_CLASSNAME}`
    );
    if (visibleCardNode.length === CARD_AMOUNT) {
      VICTORY_TEXT.textContent = `Вы выйграли! Количество ходов: ${step} `;
      console.log(addWinners());
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

function addWinners() {
  WINNERS.push({ movies: step });
  WINNERS = WINNERS.sort((a, b) => console.log(a.movies));
  WINNERS = WINNERS.slice(0, 10);
  return WINNERS;
}

startGame();

function openResults() {
  MODAL.classList.remove("hide");
  MODAL_WRAPPER.innerHTML = "";
  const close = document.createElement("div");
  close.classList.add("close");
  close.innerHTML = `<svg class="close-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256" width="50px" height="50px" fill-rule="nonzero"><g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.12,5.12)"><path d="M7.71875,6.28125l-1.4375,1.4375l17.28125,17.28125l-17.28125,17.28125l1.4375,1.4375l17.28125,-17.28125l17.28125,17.28125l1.4375,-1.4375l-17.28125,-17.28125l17.28125,-17.28125l-1.4375,-1.4375l-17.28125,17.28125z"></path></g></g></svg>`;
  const h2 = document.createElement("h2");
  h2.textContent = "Результаты";
  const block = document.createElement("div");
  WINNERS.forEach((element, i) => {
    let res = document.createElement("div");
    res.classList.add("result");
    const NUM = document.createElement("div");
    const PROGRESS = document.createElement("div");
    NUM.textContent = `${i + 1}.`;
    PROGRESS.textContent = element.movies;
    res.appendChild(NUM);
    res.appendChild(PROGRESS);
    block.appendChild(res);
  });

  MODAL_WRAPPER.appendChild(close);
  MODAL_WRAPPER.appendChild(h2);
  MODAL_WRAPPER.appendChild(block);
  MODAL.addEventListener("click", closeResults);
}

RESULTS.addEventListener("click", openResults);

function closeResults(event) {
  if (
    event.target.classList.contains("modal-overlay") ||
    event.target.classList.contains("close-svg") ||
    event.target.tagName === "path"
  ) {
    MODAL.classList.add("hide");
  }
}
