import { AppModel } from "./AppModel.js";
import { AppView } from "./AppView.js";
import { AppController } from "./AppController.js";

const app = document.getElementById("container");
const myapp = (function () {
  AppView;
  AppModel;
  AppController;
  return {
    init: function (container) {
      const view = new AppView();
      const controller = new AppController();
      const model = new AppModel();
      view.init(container);
      model.init(view);
      controller.init(container, model);
    },
  };
})();
myapp.init(app);

/* ---------comments for cross-check */
console.log(
  `Финальная оценка-70 баллов\n
  Управление с помощью клавиш-стрелок) клавиатуры, клавиш wasd , touch-events\n
Вёрстка +10(все пункты\n
реализован интерфейс игры +5\n
в футере приложения есть ссылка на гитхаб автора приложения,\n
 год создания приложения, логотип курса со ссылкой на курс +5\n
Логика игры. Ходы, перемещения фигур, другие действия игрока подчиняются\n
 определённым свойственным игре правилам +10(есть)\n
Реализовано завершение игры при достижении игровой цели (цель-максимальный блок с 2048)+10\n
По окончанию игры выводится её результат, например, количество ходов,\n
 время игры, набранные баллы, выигрыш или поражение и т.д +10(есть)\n
Результаты последних 10 игр сохраняются в local storage. Есть таблица рекордов,\n
 в которой сохраняются результаты предыдущих 10 игр +10(есть)\n
Анимации или звуки, или настройки игры. Баллы начисляются за любой из перечисленных пунктов +10\n
Очень высокое качество оформления приложения(стиль неоновой вывески, темная и светлая темы,\n
   звуковые ффекты и фукция их отключения\n
   )) +10`
);
