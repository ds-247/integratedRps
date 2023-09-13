const choices = ["stone", "paper", "scissor"];

const winner_predicting_obj = {
  stone: { stone: 0, paper: -1, scissor: 1 },
  paper: { stone: 1, paper: 0, scissor: -1 },
  scissor: { stone: -1, paper: 1, scissor: 0 },
};

const img_db = {
  stone: "Stone.jpg",
  paper: "Paper.jpg",
  scissor: "Scissors.jpg",
};

function getBotInput() {
  const index = Number.parseInt(Math.random() * 3);
  return choices[index];
}

function getSkore(params) {
  const user_choice = params[0];
  const bot_choice = params[1];

  const your_skore = winner_predicting_obj[user_choice][bot_choice];

  return your_skore;
}

function getVerdict(skore) {
  if (skore === 1) return { mssg: "You Won", color: "green" };
  else if (skore === 0) return { mssg: "Draw", color: "yellow" };
  else if (skore === -1) return { mssg: "You Lose", color: "red" };
}

function displayVerdict(user, bot, results) {
  // hide current images
  $("img").addClass("hidden");

  // add user and bot images
  $(".content").append(`<img id="stone" src=${img_db[user]} alt="" />`);
  $(".content").append(
    `<h2 class="message" style="color:${results["color"]}" >${results["mssg"]}</h2>`
  );
  $(".content").append(`<img id="stone" src=${img_db[bot]} alt="" />`);

  // adding play again
  $(".heading").after(`<button class="btn" > Play Again </button>`);

  restartGame();
}

function restartGame() {
  $(".btn").click(() => {
    location.reload();
  });
}

$("img").click(function () {
  const user_input = this.id;
  const bot_input = getBotInput();

  const skore = getSkore([user_input, bot_input]);

  const verdict_obj = getVerdict(skore);

  displayVerdict(user_input, bot_input, verdict_obj);
});
