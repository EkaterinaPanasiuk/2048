export function AppController() {
  let container = null;
  let model = null;
  let start = { x: 0, y: 0 };
  let end = { x: 0, y: 0 };
  this.init = function (mycontainer, mymodel) {
    container = mycontainer;
    model = mymodel;
    document.addEventListener("DOMContentLoaded", () => {
      this.generateBox();
      this.RenderTable();
      this.startTimer();
      //  this.initRenderTime();
      this.RenderScore();
      this.RenderMoves();
      this.trackEvents();
    });
    /* первичный рендеринг игрового поля на страницы */
  };
  this.trackEvents = function () {
    document.addEventListener("keydown", (e) => {
      switch (true) {
        case e.code === "ArrowUp" || e.code === "KeyW":
          {
            this.watchGame();
            this.moveUp();
            this.playAudio();
          }
          break;
        case e.code === "ArrowDown" || e.code === "KeyS":
          {
            this.watchGame();
            this.moveDown();
            this.playAudio();
          }
          break;
        case e.code === "ArrowLeft" || e.code === "KeyA":
          {
            this.watchGame();
            this.moveLeft();
            this.playAudio();
          }
          break;
        case e.code === "ArrowRight" || e.code === "KeyD":
          {
            this.watchGame();
            this.moveRight();
            this.playAudio();
          }
          break;
      }
    });
    document.addEventListener("change", (e) => {
      e.preventDefault();
      console.log(e.target);
      switch (true) {
        case e.target.id === "username":
          this.updateUserName(e.target.value);
      }
    });
    document.addEventListener("click", (e) => {
      switch (true) {
        case e.target.id === "change-theme":
          this.changeTheme();
          this.changeThemeTitle();
          break;
        case e.target.id === "mute":
          this.changeSoundSettings();
          break;
        case e.target.id === "save-user-btn":
          {
            e.preventDefault();
            this.saveUser();
            this.closeModal("modal-close-win-btn");
            this.reStartGame();
          }
          break;
        case e.target.id === "open-recordlist-btn":
          {
            e.preventDefault();
            this.openRecordlist();
          }
          break;
        case e.target.id === "modal-close-lose-btn":
          {
            e.preventDefault();
            this.closeModal("modal-close-lose-btn");
            this.reStartGame();
          }
          break;
        case e.target.id === "try-again":
          {
            e.preventDefault();
            this.reStartGame();
          }
          break;
        case e.target.id === "modal-close-userlist-btn" ||
          e.target.id === "modal-close-lose-btn" ||
          e.target.id === "modal-close-win-btn":
          {
            e.preventDefault();
            this.closeModal(e.target.id);
          }
          break;
        case e.target.id === "stop-animation":
          this.stopAnimation();
          break;
      }
    });
    document.addEventListener("touchstart", (e) => {
      start.x = e.touches[0].clientX;
      start.y = e.touches[0].clientY;
      switch (true) {
        case e.target.id === "change-theme":
          this.changeTheme();
          this.changeThemeTitle();
          break;
        case e.target.id === "mute":
          this.changeSoundSettings();
          break;
        case e.target.id === "save-user-btn":
          {
            e.preventDefault();
            this.saveUser();
            this.closeModal("modal-close-win-btn");
            this.reStartGame();
          }
          break;
        case e.target.id === "open-recordlist-btn":
          {
            e.preventDefault();
            this.openRecordlist();
          }
          break;
        case e.target.id === "modal-close-lose-btn":
          {
            e.preventDefault();
            this.closeModal("modal-close-lose-btn");
            this.reStartGame();
          }
          break;
        case e.target.id === "try-again":
          {
            e.preventDefault();
            this.reStartGame();
          }
          break;
        case e.target.id === "modal-close-userlist-btn" ||
          e.target.id === "modal-close-lose-btn" ||
          e.target.id === "modal-close-win-btn":
          {
            e.preventDefault();
            this.closeModal(e.target.id);
          }
          break;
        case e.target.id === "stop-animation":
          this.stopAnimation();
          break;
      }
    });
    document.addEventListener("touchend", (e) => {
      end.x = e.changedTouches[0].clientX;
      end.y = e.changedTouches[0].clientY;
      this.searchTouch();
    });
    /*   document.addEventListener("pointerup", (e) => {
      console.log("pointercancel  ");
      console.log(e);

      //  end.x = e.touches[0].clientX;
      //  end.y = e.touches[0].clientY;
      // console.log("end " + end.x + "  " + end.y);
    }); */
    /* document.addEventListener("touchmove", (e) => {
        console.log(e);
      console.log("pointermove " + e.touches[0].clientY); 
      end.x = e.clientX;
      end.y = e.clientY;
      // console.log("end  " + end);
      switch (true) {
        case start.x < end.x:
          {
            this.watchGame();
            this.moveLeft();
            return;
          }
          break;
        case start.x > end.x:
          {
            this.watchGame();
            this.moveRight();
            return;
          }
          break;
        case start.y < end.y:
          {
            this.watchGame();
            this.moveDown();
            return;
          }
          break;
        case start.y > end.y:
          {
            this.watchGame();
            this.moveUp();
            return;
          }
          break;
      }
      switch (true) {
        case e.target.id === "save-user-btn":
          {
            e.preventDefault();
            this.saveUser();
            this.closeModal("modal-close-win-btn");
            this.reStartGame();
          }
          break;
        case e.target.id === "open-recordlist-btn":
          {
            e.preventDefault();
            this.openRecordlist();
          }
          break;
        case e.target.id === "modal-close-lose-btn":
          {
            e.preventDefault();
            this.closeModal("modal-close-lose-btn");
            this.reStartGame();
          }
          break;
        case e.target.id === "try-again":
          {
            e.preventDefault();
            this.reStartGame();
          }
          break;
        case e.target.id === "modal-close-userlist-btn" ||
          e.target.id === "modal-close-lose-btn" ||
          e.target.id === "modal-close-win-btn":
          {
            e.preventDefault();
            this.closeModal(e.target.id);
          }
          break;
        case e.target.id === "stop-animation":
          this.stopAnimation();
          break;
      }
    }); */
  };
  this.searchTouch = function () {
    const difY = Math.abs(start.y - end.y);
    const difX = Math.abs(start.x - end.x);
    switch (true) {
      case difX > difY && start.x < end.x:
        {
          this.watchGame();
          this.moveRight();
          this.playAudio();
        }
        break;
      case difX > difY && start.x > end.x:
        {
          this.watchGame();
          this.moveLeft();
          this.playAudio();
        }
        break;
      case difX < difY && start.y < end.y:
        {
          this.watchGame();
          this.moveDown();
          this.playAudio();
        }
        break;
      case difX < difY && start.y > end.y:
        {
          this.watchGame();
          this.moveUp();
          this.playAudio();
        }
        break;
    }
  };
  this.RenderTable = function () {
    model.RenderTable();
  };
  /* первичный рендеринг времени на страницы */
  /*  this.initRenderTime = function () {
    model.initRenderTime();
  }; */
  this.generateBox = function () {
    model.generateBox();
  };

  this.RenderTime = function () {
    model.RenderTime();
  };
  /* первичный рендеринг счета на страницы */
  this.RenderScore = function () {
    model.RenderScore();
  };
  this.RenderMoves = function () {
    model.RenderMoves();
  };

  this.reStartGame = function () {
    model.reStartGame();
  };
  this.watchGame = function () {
    this.incrementMoves();
    this.watchScore();
    this.watchWin();
  };
  this.moveUp = function () {
    model.moveUp();
  };
  this.moveDown = function () {
    model.moveDown();
  };
  this.moveLeft = function () {
    model.moveLeft();
  };
  this.moveRight = function () {
    model.moveRight();
  };
  this.incrementMoves = function () {
    model.incrementMoves();
  };
  this.watchScore = function () {
    model.watchScore();
  };
  this.startTimer = function () {
    model.startTimer();
  };
  this.watchWin = function () {
    model.watchWin();
  };
  this.watchLose = function () {
    model.watchLose();
  };
  this.updateUserName = function (value) {
    model.updateUserName(value);
  };
  this.saveUser = function () {
    model.saveUser();
  };
  this.openRecordlist = function () {
    model.openRecordlist();
  };
  this.closeModal = function (id) {
    model.closeModal(id);
  };
  this.stopAnimation = function () {
    model.stopAnimation();
  };
  this.changeTheme = function () {
    model.changeTheme();
  };
  this.changeThemeTitle = function () {
    model.changeThemeTitle();
  };
  this.playAudio = function () {
    model.playAudio();
  };
  this.changeSoundSettings = function () {
    model.changeSoundSettings();
  };
}
