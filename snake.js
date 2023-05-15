player1 = document.querySelector("#person1");
player2 = document.querySelector("#person2");
ladder = document.querySelector(".ladder");

let diceRollSound = new Audio("dicesound.mp3");
let winSound = new Audio("win.mp3");

let score = -1;
let p1sum = -1;
let p2sum = -1;
let c = 1;
let sum;

const ladders = {
  4: 25,
  21: 39,
  29: 74,
  43: 76,
  63: 80,
  71: 89,
};
const snakes = {
  30: 7,
  47: 15,
  56: 19,
  82: 42,
  98: 55,
  92: 75,
  73: 51,
};

let size =
  ladder.offsetWidth < ladder.offsetHeight
    ? ladder.offsetWidth
    : ladder.offsetHeight;
let eleSize = size / 10;
player1.style.fontSize = `${eleSize / 2.2}px`;
player2.style.fontSize = `${eleSize / 2.2}px`;
ladder.style.width = `${size}px`;
ladder.style.height = `${size}px`;
player1.style.top = `${size - eleSize}px`;
player2.style.top = `${size - eleSize}px`;
// player2.style.left = `${eleSize / 2}px`;

console.log(ladder.offsetWidth, ladder.offsetHeight);

let rolldice = document.getElementById("rolldice");
rolldice.addEventListener("click", startPlaying);

function rollDice() {
  let num = Math.floor(Math.random() * 6) + 1;
  var dice1 = document.getElementById("dice0");
  dice1.src = `dice${num}.png`;
  return num;
}

async function startPlaying() {
  let diceValue = rollDice();
  rolldice.disabled = true;
  if (c % 2 != 0) {
    score = await movePosition("person1", "p1sum", diceValue);

    if (score != 100) {
      setTimeout(() => {
        rolldice.disabled = false;
      }, 800);
    }
  } else if (c % 2 == 0) {
    score = await movePosition("person2", "p2sum", diceValue);

    if (score != 100) {
      setTimeout(() => {
        rolldice.disabled = false;
      }, 800);
    }
  }
  c = c + 1;
}

async function movePosition(player, psum, num) {
  if (psum == "p1sum") {
    p1sum = p1sum + num;
    p1sum = p1sum > 99 ? p1sum - num : p1sum;
    sum = p1sum;
  }
  if (psum == "p2sum") {
    p2sum = p2sum + num;
    p2sum = p2sum > 99 ? p2sum - num : p2sum;
    sum = p2sum;
  }
  calculatePosition(player, sum);
  let sum1 = sum + 1;
  let i = sum1.toString();
  // sum++;
  let snakeLadderValue = check(i);
  if (snakeLadderValue) {
    sum = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(calculatePosition(player, snakeLadderValue));
      }, 1100);
    });
    if (psum == "p1sum") {
      p1sum = snakeLadderValue;
    } else {
      p2sum = snakeLadderValue;
    }
  }

  if (snakeLadderValue) {
    return sum - 1;
  } else {
    return sum;
  }
}
function calculatePosition(player, sum) {
  let playerEl = document.getElementById(`${player}`);
  let scoreA = sum;

  if (scoreA == 99) {
    winSound.play();
    playerEl.style.left = `${eleSize / 2}px`;
    // playerEl.style.top = `${-eleSize}px`;
    alert(`${player} winner  🎉 🎉 🎉 🎉 🎉 🎉`);
    //location.reload();
    rolldice.removeEventListener("click", startPlaying);
  } else {
    let a = parseInt(scoreA / 10);
    let b = scoreA % 10;
    let val1 = (9 - a) * eleSize;
    playerEl.style.top = `${val1}px`;
    let val2 = 0;
    if (a % 2 == 0) {
      val2 = size - (10 - b) * eleSize;
    } else {
      val2 = (9 - b) * eleSize;
    }
    if (player == "person1") {
      playerEl.style.left = `${val2}px`;
    } else {
      playerEl.style.left = `${val2 + 15}px`;
    }

    return sum - 1;
  }
}

function check(score) {
  if (score in ladders) {
    return ladders[score] - 1;
  } else if (score in snakes) {
    return snakes[score] - 1;
  }
}
