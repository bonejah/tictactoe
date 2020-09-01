let mark = "X";

let scoreX = 0;
let scoreO = 0;

const items = document.getElementsByClassName("square-item");


for (const item of items) {
  item.addEventListener("click", function () {
    let result = document.getElementById("result");
    if (result.textContent != "") return;

    if (item.textContent != "") {
      return;
    } else {
      item.innerHTML += mark;

      if (isGameWon()) {
        createMessageResultGame("winner");
        return;
      }

      if (isBoardFull()) {
        createMessageResultGame("end");
        return;
      }

      if (mark == "X") {
        mark = "O";
      } else if (mark == "O") {
        mark = "X";
      }
    }
  });
}

function playAgain () {
  for (const item of items) {
    item.innerHTML = "";
    item.style.cursor = "pointer";
  }

  let message = document.getElementById("result");
  while (message.firstChild) {
    message.removeChild(message.firstChild);
  }

  mark = "X";
}

function restartGame () {
  playAgain();
  scoreX = 0;
  scoreO = 0;
  mark = "X";
}

function clock () {
  let date = new Date();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  hour = updateTime(hour);
  minute = updateTime(minute);
  second = updateTime(second);

  document.getElementById("clock").innerHTML = `${hour}:${minute}:${second}`;
  setTimeout(clock, 1000);
}

function updateTime (k) {
  if (k < 10) {
    return "0" + k;
  } else {
    return k;
  }
}

function createMessageResultGame (msg) {
  let message = document.getElementById("result");

  if (msg != "" && msg != undefined && message.textContent == "") {
    const h1Element = document.createElement("h1");
    h1Element.style.color = "#dcba30";

    if (msg == "winner") {
      h1Element.innerHTML += `Player ${mark} is Winner!!!`;
      message.appendChild(h1Element);
      markScore(mark);
    } else if (msg == "end") {
      h1Element.innerHTML += `End Game!!!`;
      message.appendChild(h1Element);
    }
    
    const items = document.getElementsByClassName("square-item");
    for (let i = 0; i < items.length; i++) {
      items[i].style.cursor = "not-allowed";
    }

    mark = "X";
  }
}

function markScore (mark) {
  console.log("mark", mark)
  console.log("scoreX Before", scoreX)
  console.log("scoreO After", scoreO)
  
  if (mark === "X") {
    scoreX++;
  } else if (mark === "O") {
    scoreO++
  } 
  
  console.log("scoreX After", scoreX)
  console.log("scoreO After", scoreO)
}


function isBoardFull () {
  const top_left = document.getElementById("top-left").textContent;
  const top_center = document.getElementById("top-center").textContent;
  const top_right = document.getElementById("top-right").textContent;

  const mid_left = document.getElementById("mid-left").textContent;
  const mid_center = document.getElementById("mid-center").textContent;
  const mid_right = document.getElementById("mid-right").textContent;

  const bottom_left = document.getElementById("bottom-left").textContent;
  const bottom_center = document.getElementById("bottom-center").textContent;
  const bottom_right = document.getElementById("bottom-right").textContent;

  if (
    top_left != "" &&
    top_center != "" &&
    top_right != "" &&
    mid_left != "" &&
    mid_center != "" &&
    mid_right != "" &&
    bottom_left != "" &&
    bottom_center != "" &&
    bottom_right != ""
  ) {
    return true;
  }

  return false;
}

function isGameWon () {
  let rowsWon,
    colsWon,
    diagWon = false;

  const top_left = document.getElementById("top-left").textContent;
  const top_center = document.getElementById("top-center").textContent;
  const top_right = document.getElementById("top-right").textContent;

  const mid_left = document.getElementById("mid-left").textContent;
  const mid_center = document.getElementById("mid-center").textContent;
  const mid_right = document.getElementById("mid-right").textContent;

  const bottom_left = document.getElementById("bottom-left").textContent;
  const bottom_center = document.getElementById("bottom-center").textContent;
  const bottom_right = document.getElementById("bottom-right").textContent;

  // check rows
  if (top_left != "" && top_center != "" && top_right != "") {
    if (top_left == top_center && top_center == top_right) {
      return (rowsWon = true);
    }
  }

  if (mid_left != "" && mid_center != "" && mid_right != "") {
    if (mid_left == mid_center && mid_center == mid_right) {
      return (rowsWon = true);
    }
  }

  if (bottom_left != "" && bottom_center != "" && bottom_right != "") {
    if (bottom_left == bottom_center && bottom_center == bottom_right) {
      return (rowsWon = true);
    }
  }

  // check cols
  if (top_left != "" && mid_left != "" && bottom_left != "") {
    if (top_left == mid_left && mid_left == bottom_left) {
      return (colsWon = true);
    }
  }

  if (top_center != "" && mid_center != "" && bottom_center != "") {
    if (top_center == mid_center && mid_center == bottom_center) {
      return (colsWon = true);
    }
  }

  if (top_right != "" && mid_right != "" && bottom_right != "") {
    if (top_right == mid_right && mid_right == bottom_right) {
      return (colsWon = true);
    }
  }

  // check diagonal
  if (top_left != "" && mid_center != "" && bottom_right != "") {
    if (top_left == mid_center && mid_center == bottom_right) {
      return (diagWon = true);
    }
  }

  if (top_right != "" && mid_center != "" && bottom_left != "") {
    if (top_right == mid_center && mid_center == bottom_left) {
      return (diagWon = true);
    }
  }
}
