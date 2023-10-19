const box = (num, id, theme) =>
  `<div class="box box-${num} ${theme}"  id="${id}><p class="text">${num}</p></div>`;

function renderNumbers(arr, domElem, theme) {
  let innerArr = "";
  let index = 0;
  for (let i = 0; i < arr.length; i += 1) {
    for (let j = 0; j < arr.length; j += 1) {
      const item = box(arr[i][j], index, theme);
      index += 1;
      innerArr += item;
    }
  }
  domElem.innerHTML = innerArr;
}

export function AppView() {
  let container = null;
  /* let leftar = [ */
  /*   [0, 1, 2, 3], */
  /*   [4, 5, 6, 7], */
  /*   [8, 9, 10, 11], */
  /*   [12, 13, 14, 15], */
  /* ]; */
  /* let rightar = [ */
  /*   [3, 2, 1, 0], */
  /*   [7, 6, 5, 4], */
  /*   [11, 10, 9, 8], */
  /*   [15, 14, 13, 12], */
  /* ]; */
  /* let topar = [ */
  /*   [0, 4, 8, 12], */
  /*   [1, 5, 9, 13], */
  /*   [2, 6, 10, 14], */
  /*   [3, 7, 11, 15], */
  /* ]; */
  /* let bottomar = [ */
  /*   [12, 8, 4, 0], */
  /*   [13, 9, 5, 1], */
  /*   [14, 10, 6, 2], */
  /*   [15, 11, 7, 3], */
  /* ]; */

  this.init = function (mycontainer) {
    container = mycontainer;
  };

  this.RenderTable = function (arr, theme) {
    const containerEl = document.getElementById("game-container");
    renderNumbers(arr, containerEl, theme);
    this.refreshTable();
  };
  this.refreshTable = function () {};
  this.RenderTime = function (time) {
    const timeWrapper = document.getElementById("header-time");
    let min = String(parseInt(time / 60)) ?? "00";
    String(min).length === 1 ? (min = "0" + min) : min;

    let sec;
    if (time < 60) {
      sec = time;
    } else {
      min.length === 1 ? (min = "0" + min) : min;

      sec = parseInt(time % 60) ?? "00";
    }
    String(sec).length === 1 ? (sec = "0" + sec) : sec;
    timeWrapper.innerText = `Time: ${min} : ${sec}`;
  };
  /*   this.initRenderTime = function (time) {
    const timeWrapper = document.getElementById("header-time");
    timeWrapper.innerText = `Time: ${time}`;
  }; */
  this.RenderScore = function (number) {
    document.getElementById("header-score").innerText = `Score:${number}`;
  };
  this.RenderMoves = function (moves) {
    document.getElementById("header-moves").innerText = `Moves:${moves}`;
  };
  this.startWin = function (time, moves, score) {
    let modal = document.getElementById("win-modal-wrapper");
    document.getElementById("win-score").innerText = `Score: ${score}`;
    document.getElementById("win-time").innerText = `Time: ${time}`;
    document.getElementById("win-moves").innerText = `Moves: ${moves}`;
    modal.classList.add("visible");
  };
  this.watchLose = function (time, moves, score) {
    let modal = document.getElementById("lose-modal-wrapper");
    document.getElementById("lose-score").innerText = `Score: ${score}`;
    document.getElementById("lose-time").innerText = `Time: ${time}`;
    document.getElementById("lose-moves").innerText = `Moves: ${moves}`;
    modal.classList.add("visible");
  };
  this.openRecordlist = function (data) {
    let recordList = document.getElementById("user-list-modal-wrapper");
    let userList = document.getElementById("user-list");
    let datalist = data.map(
      (i, index) =>
        `<li class="user-list-item"><h2 class="user-list-item">${
          index + 1
        }</h2><h2 class="user-list-item-title">${
          i.name ?? "jon snow"
        }</h2><h2 class="user-list-item" >${i.time}</h2>
        <h2 class="user-list-item" >${i.moves}</h2></li><hr/>`
    );
    userList.innerHTML = datalist.join("");
    recordList.classList.add("visible");
  };
  this.closeModal = function (id) {
    switch (true) {
      case id === "modal-close-userlist-btn":
        {
          const window = document.getElementById("user-list-modal-wrapper");
          window.classList.remove("visible");
        }
        break;
      case id === "modal-close-lose-btn":
        {
          const window = document.getElementById("lose-modal-wrapper");
          window.classList.remove("visible");
        }
        break;
      case id === "modal-close-win-btn":
        {
          const window = document.getElementById("win-modal-wrapper");
          window.classList.remove("visible");
        }
        break;
    }
  };
  this.stopAnimation = function () {
    console.log("stopAnimation");
  };
  this.addAnimation = function (value, arr) {
    let shifted = [];
    let row1 = [];
    let row2 = [];
    let row3 = [];
    let row4 = [];
    switch (true) {
      case value === "left":
        {
          const collection = document.querySelectorAll(".box");
          collection.forEach((item, index) => {
            if (index % 4 !== 0 && !item.classList.contains("box-0")) {
              item.classList.add("border-right");
              item.classList.add("left");
            }
            if (index % 4 === 0) {
              item.classList.add("bg");
            }
          });
        }
        break;
      case value === "up":
        {
          const collection = document.querySelectorAll(".box");
          collection.forEach((item, index) => {
            item.classList.add("border-top");

            if (index > 3 && !item.classList.contains("box-0")) {
              item.classList.add("up");
            }
          });
        }
        break;
      case value === "down":
        {
          const collection = document.querySelectorAll(".box");
          collection.forEach((item, index) => {
            item.classList.add("border-down");
            if (index < 12 && !item.classList.contains("box-0")) {
              item.classList.add("down");
            }
          });
        }
        break;
      case value === "right":
        {
          const collection = document.querySelectorAll(".box");
          collection.forEach((item, index) => {
            item.classList.add("border-right");
            if ((index - 3) % 4 !== 0 && !item.classList.contains("box-0")) {
              item.classList.add("right");
            }
          });
        }
        break;
    }
  };
  this.changeTheme = function (theme) {
    const collection = document.querySelectorAll(".box");
    const html = document.querySelector("html");
    const container = document.querySelector(".game-container");

    switch (true) {
      case theme === "day":
        {
          collection.forEach((item) => item.classList.add("day"));
          html.classList.add("day");
          container.classList.add("day-container");
        }
        break;
      case theme === "night":
        {
          collection.forEach((item) => item.classList.remove("day"));
          html.classList.remove("day");
          container.classList.remove("day-container");
        }
        break;
    }
  };
  this.changeThemeTitle = function (value) {
    value === "night" ? (value = "Day") : (value = "Night");
    const theme = document.getElementById("change-theme");
    theme.innerText = value;
  };
  this.playAudio = function (mute) {
    console.log(mute);
    const audio = document.getElementById("audio");
    if (!mute) {
      audio.play();
    } else {
      return;
    }
  };
  this.changeMuteTitle = function (mute) {
    let value;
    mute === false ? (value = "Mute") : (value = "Sound");
    const muteBtn = document.getElementById("mute");
    muteBtn.innerText = value;
  };
}
