export function AppModel() {
  let theme = "night";
  let view = null;
  let mute = false;
  let matrix =
    /* [
    [2, 8, 16, 4],
    [32, 64, 128, 256],
    [512, 1024, 2048, 4],
    [32, 64, 128, 256],
  ]; */
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
  let score = null;
  let moves = null;
  let time = null;
  let winScore = 2048;
  let userData = [];
  let user = null;
  let startTime = null;
  let timeInterval = null;

  this.init = function (myview) {
    matrix = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    score = 2;
    moves = 0;
    time = 0;
    view = myview;
    let data = localStorage.getItem("userList");
    data ? (userData = JSON.parse(data)) : userData;
    this.filterUserList();
  };
  this.reStartGame = function () {
    matrix = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    score = 2;
    moves = 0;
    time = 0;
    startTime = Date.now();
    this.generateBox();
    this.RenderTable();
    this.RenderTime();
    this.RenderScore();
    this.RenderMoves();
  };
  this.filterUserList = function () {
    console.log(userData);
    let arr = userData.sort((a, b) => a.time + a.moves - (b.time + b.moves));
    userData = arr.slice(0, 9);
  };
  this.RenderTable = function () {
    view.RenderTable(matrix, theme);
  };
  this.RenderTime = function (number = time) {
    console.log("number  " + number);
    view.RenderTime(number);
  };
  /*   this.initRenderTime = function () {
    view.initRenderTime(time);
  }; */
  this.RenderScore = function (number = score) {
    view.RenderScore(number);
  };
  this.RenderMoves = function () {
    view.RenderMoves(moves);
  };
  this.moveUp = function () {
    let verticalArr = this.turnOfArrColumnsToRows(matrix);
    for (let row = 0; row < verticalArr.length; row += 1) {
      const a = verticalArr[row].filter((item) => item !== 0);
      getSum(a);
      const filtred = a.filter((i) => i !== 0);
      verticalArr[row] = addZero(filtred);
    }
    /* разворот массива на прежнее место=>строки в столбцы */
    this.turnOfArrRowsToColumns(verticalArr, matrix);
    this.addAnimation("up");
    setTimeout(() => {
      this.generateBox(matrix);
      this.RenderTable(matrix);
    }, 200);
  };
  this.moveDown = function () {
    let verticalArr = this.turnOfArrColumnsToRows(matrix);
    for (let row = 0; row < verticalArr.length; row += 1) {
      const reversed = verticalArr[row].reverse();
      const a = reversed.filter((item) => item !== 0);
      getSum(a);
      const filtred = a.filter((i) => i !== 0);
      verticalArr[row] = addZero(filtred).reverse();
    }

    /* разворот массива на прежнее место=>строки в столбцы */
    this.turnOfArrRowsToColumns(verticalArr, matrix);
    this.addAnimation("down");
    setTimeout(() => {
      this.generateBox(matrix);
      this.RenderTable(matrix);
    }, 200);
  };
  this.moveLeft = function () {
    for (let i = 0; i < matrix.length; i += 1) {
      const a = matrix[i].filter((i) => i !== 0);
      getSum(a);
      const filtred = a.filter((i) => i !== 0);
      matrix[i] = addZero(filtred);
    }
    this.addAnimation("left");
    setTimeout(() => {
      this.generateBox(matrix);
      this.RenderTable(matrix);
    }, 200);
  };

  this.addAnimation = function (value) {
    view.addAnimation(value, matrix);
  };
  this.stopAnimation = function () {
    view.stopAnimation();
  };
  this.moveRight = function () {
    for (let i = 0; i < matrix.length; i += 1) {
      const reversed = matrix[i].reverse();
      const a = reversed.filter((i) => i !== 0);
      getSum(a);
      const filtred = a.filter((i) => i !== 0);
      matrix[i] = addZero(filtred).reverse();
    }
    this.addAnimation("right");
    setTimeout(() => {
      this.generateBox(matrix);
      this.RenderTable(matrix);
    }, 200);
  };
  this.generateBox = function (arr = matrix) {
    let emptyCount = 0;
    const row = Math.round(Math.random() * 3);
    const col = Math.round(Math.random() * 3);
    if (arr[row][col] === 0) {
      arr[row][col] = 2;
    } else if (arr[col][row] === 0) {
      arr[col][row] = 2;
    } else {
      for (let i = 0; i < arr.length; i += 1) {
        for (let j = 0; j < arr[i].length; j += 1) {
          if (arr[i][j] === 0) {
            emptyCount += 1;
            arr[i][j] = 2;
            return;
          }
        }
      }
      if (emptyCount === 0) {
        this.watchLose();
      }
    }
  };
  this.turnOfArrColumnsToRows = function (arr) {
    let verticalArr = [];
    let arrItem = [];
    for (let row = 0; row < arr.length; row += 1) {
      for (let col = 0; col < arr.length; col += 1) {
        arrItem.push(matrix[col][row]);
      }
      verticalArr.push(arrItem);
      arrItem = [];
    }
    return verticalArr;
  };
  this.turnOfArrRowsToColumns = function (arrForTurn, targetarr) {
    for (let row = 0; row < arrForTurn.length; row += 1) {
      for (let col = 0; col < arrForTurn[row].length; col += 1) {
        targetarr[row][col] = arrForTurn[col][row];
      }
    }
  };
  this.incrementMoves = function () {
    moves += 1;
    this.RenderMoves(moves);
  };
  this.watchScore = function () {
    let max = getMax(matrix);
    if (max > score) {
      this.RenderScore(max);
      score = max;
    }
    return;
  };
  this.startTimer = function () {
    if (time === 0) {
      startTime = Date.now();
      //  this.startTimerInterval();
      let diff;
      setTimeout(function timer() {
        let newtime = Date.now();
        diff = Math.round((newtime - startTime) / 1000);
        time = diff;
        view.RenderTime(diff);
        setTimeout(timer, 1000);
      }, 0);
    } else return;
  };

  this.watchWin = function () {
    if (score === winScore) {
      this.startWin();
    }
  };
  this.startWin = function () {
    view.startWin(time, moves, score);
  };
  this.watchLose = function () {
    console.log('watch lose"');
    console.log(time, moves, score);
    view.watchLose(time, moves, score);
    this.stopTimer();
  };
  this.stopTimer = function () {
    console.log("clear");
  };
  this.updateUserName = function (value) {
    user = value;
    console.log(value);
  };
  this.saveUser = function () {
    let userToSave = {
      name: user,
      time,
      score,
      moves,
    };
    userData.push(userToSave);
    localStorage.setItem("userList", JSON.stringify(userData));
    let data = localStorage.getItem("userList");
    console.log(JSON.parse(data));
  };
  this.openRecordlist = function () {
    view.openRecordlist(userData);
  };
  this.closeModal = function (id) {
    view.closeModal(id);
  };
  this.changeTheme = function () {
    theme === "night" ? (theme = "day") : (theme = "night");
    view.changeTheme(theme);
  };
  this.changeThemeTitle = function () {
    view.changeThemeTitle(theme);
  };
  this.playAudio = function () {
    view.playAudio(mute);
  };
  this.changeSoundSettings = function () {
    mute === false ? (mute = true) : (mute = false);
    this.changeMuteTitle();
    return mute;
  };
  this.changeMuteTitle = function () {
    view.changeMuteTitle(mute);
  };
}

function addZero(arr) {
  while (arr.length < 4) {
    arr.push(0);
  }
  return arr;
}
/* function userListTemp(value) {
  return `<li class="user-list-item">${value.name} </li>`;
} */
function getMax(arr) {
  let max = arr[0][0];
  for (let row = 0; row < arr.length; row += 1) {
    for (let col = 0; col < arr.length; col += 1) {
      if (max < arr[row][col]) {
        max = arr[row][col];
      }
    }
  }
  return max;
}
/* сложение чисел в ряду массива */
function getSum(a) {
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] === a[i + 1]) {
      a[i] = a[i] * 2;
      a[i + 1] = 0;
      i = i + 1;
    }
  }
}
/* функция разворота много мерного массива :столбцы превращаються в строки */
