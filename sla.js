let p1sum = 0;
let p2sum = 0;
let c = 1;
let diceRollSound = new Audio("dicesound.mp3");
let winSound = new Audio("win.mp3");
var turn = document.getElementById("turn");
var dice = document.getElementById("dice");
const ladders = {
  3: 25,
  8: 30,
  21: 62,
  28: 84,
};
const snakes = {
  24: 6,
  32: 10,
  88: 26,
  64: 18,
};
// creation of grids
function generateGrids() {
  var container = document.getElementById("container");
  let row = document.createElement("div");
  let left2Right = false;
  for (let i = 1; i <= 100; i++) {
    var box = document.createElement("div");
    box.classList.add("box");
    box.setAttribute("id", `${i}`);
    container.appendChild(box);
    box.innerHTML = i;
    if (i % 2 == 0) {
      box.style.backgroundColor = "#c4baa7";
    }
    row.style.display = "flex";
    row.appendChild(box);
    if (i % 10 == 0) {
      container.append(row);
      row = document.createElement("div");
      if (!left2Right) {
        row.style.flexDirection = "row-reverse";
      }
      left2Right = !left2Right;
    }
  }
}
generateGrids();
let icon0 = document.createElement("i");
icon0.classList.add("fa-solid");
icon0.classList.add("fa-street-view");
icon0.classList.add("icon0");
icon0.setAttribute("id", "p1");
document.getElementById(1).appendChild(icon0);

let icon1 = document.createElement("i");
icon1.classList.add("fa-solid");
icon1.classList.add("fa-street-view");
icon1.classList.add("icon1");
icon1.setAttribute("id", "p2");
document.getElementById(1).appendChild(icon1);
//
function rollDice() {
  var x = Math.floor(Math.random() * 6 + 1);
  var dice1 = document.getElementById("dice0");
  dice1.src = `dice${x}.png`;
  return x;
}
dice.addEventListener("click", startPlaying);
function startPlaying(e) {
  dice.disabled = true;
  diceRollSound.play();
  let diceValue = rollDice();
  if (c % 2 != 0) {
    let sum = movePosition("p1", "p1sum", 0, diceValue);
    console.log(sum);
    if (sum != 100) {
      setTimeout(() => {
        dice.disabled = false;
        blueTurn();
      }, 800);
    }
  } else if (c % 2 == 0) {
    let sum = movePosition("p2", "p2sum", 5, diceValue);
    console.log(sum);
    if (sum != 100) {
      setTimeout(() => {
        dice.disabled = false;
        redTurn();
      }, 800);
    }
  }
  c = c + 1;
}

function movePosition(player, psum, correction, num) {
  let sum;
  if (psum == "p1sum") {
    p1sum = p1sum + num;
    p1sum = p1sum > 100 ? p1sum - num : p1sum;
    let i = p1sum.toString();
    p1sum = check(i);
    sum = p1sum;
  }
  if (psum == "p2sum") {
    p2sum = p2sum + num;
    p2sum = p2sum > 100 ? p2sum - num : p2sum;
    let i = p2sum.toString();
    p2sum = check(i);
    sum = p2sum;
  }
  document.getElementById(`${player}`).style.transition = `linear all 1s`;
  if (sum < 10) {
    document.getElementById(`${player}`).style.left = `${(sum - 1) * 60}px`;
  } else if (sum == 100) {
    winSound.play();

    document.getElementById(`${player}`).style.left = `${0}px`;
    dice.removeEventListener("click", startPlaying);
    if (player == "p1") {
      turn.innerHTML = "RED WON 🎉🎉🎉";
    } else if (player == "p2") {
      turn.innerHTML = "BLUE WON 🎉🎉🎉";
    }
  } else {
    numarr = Array.from(String(sum));
    n1 = eval(numarr.shift());
    n2 = eval(numarr.pop());
    // console.log(n1, n2)
    if (n1 % 2 != 0) {
      if (n2 == 0) {
        document.getElementById(`${player}`).style.left = `${9 * 60}px`;
        document.getElementById(`${player}`).style.top = `${
          (-n1 + 1) * 60 - correction
        }px`;
      } else {
        document.getElementById(`${player}`).style.left = `${
          (9 - (n2 - 1)) * 60
        }px`;
        document.getElementById(`${player}`).style.top = `${
          -n1 * 60 - correction
        }px`;
      }
    } else if (n1 % 2 == 0) {
      if (n2 == 0) {
        document.getElementById(`${player}`).style.left = `${0 * 60}px`;
        document.getElementById(`${player}`).style.top = `${
          (-n1 + 1) * 60 - correction
        }px`;
      } else {
        document.getElementById(`${player}`).style.left = `${(n2 - 1) * 60}px`;
        document.getElementById(`${player}`).style.top = `${
          -n1 * 60 - correction
        }px`;
      }
    }
  }
  return sum;
}
function check(score) {
  if (score in ladders) {
    return (activeScore = ladders[score]);
  } else if (score in snakes) {
    return (activeScore = snakes[score]);
  } else {
    return Number(score);
  }
}
function blueTurn() {
  turn.innerText = "Blue's Turn : ";
  turn.style.color = "blue";
}
function redTurn() {
  turn.innerText = "Red's Turn : ";
  turn.style.color = "red";
}
