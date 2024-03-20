import { findBestFit } from "./findPlace.js";

//заповнюємо контейнер 0
function arrContainer(containerSize) {
  let blocksArr = [];
  for (let y = 0; y < containerSize.height; y++) {
    let row = [];
    for (let x = 0; x < containerSize.width; x++) {
      row.push(0);
    }
    blocksArr.push(row);
  }
  return blocksArr;
}

//заповнюємо блоки 1
function arrBlockCoordinates(arr, blockCoordinates) {
  blockCoordinates.forEach((block) => {
    for (let row = block.top; row < block.bottom; row++) {
      for (let col = block.left; col < block.right; col++) {
        arr[row][col] = 1;
      }
    }
  });
  return arr;
}

//функція ддя пошуку внутрішньої порожнини
function findHole(blockCoordinates, containerSize) {
  let arr = arrBlockCoordinates(arrContainer(containerSize), blockCoordinates);
  let hole = 0;

  for (let i = 1; i < arr.length - 1; i++) {
    for (let j = 1; j < arr[i].length - 1; j++) {
      if (arr[i][j] === 1) {
        continue;
      }

      // перевірка для знаходження порожнини (початок порожнини)
      if (arr[i][j] === 0 && arr[i - 1][j] === 1 && arr[i][j - 1] === 1) {
        let x = i;
        let y = j;
        let xArr = []; //масиви для відстеження прохідних координат
        let yArr = [];
        // пошук кінця порожнини
        while (x < arr.length - 1 && y < arr[i].length - 1) {
          if (arr[x][j] !== 1) {
            x += 1;
            xArr.push(arr[x][j]);
          }
          if (arr[i][y] !== 1) {
            y += 1;
            yArr.push(arr[i][y]);
          }

          if (arr[x][j] === 1 && arr[i][y] === 1) break;
        }
        if (!xArr.includes(1) || !yArr.includes(1)) {
          hole += 0;
        } else {
          hole += (x - i) * (y - j);
        }
      }
    }
  }
  return hole;
}

//EXPORT!
export function optimizeContainer(blocks, containerSize) {
  const blockCoordinates = [];
  for (let i in blocks) {
    blocks[i].initialOrder = Number(i) + 1;
  }
  // сортуємо блоки за зменшенням площі
  blocks.sort((a, b) => b.width * b.height - a.width * a.height);

  // Ініціалізуємо контейнер
  const container = {
    width: Number(containerSize.width),
    height: Number(containerSize.height),
  };

  // Ініціалізуємо змінну для обчислення площі внутрішніх порожнин
  let emptySpace = container.width * container.height;

  // Розміщуємо блоки у контейнері
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];

    // Знаходимо найбільший порожній простір для блока
    let bestFit = findBestFit(block, container, blockCoordinates);

    if (bestFit === null) return "ERROR";

    if (bestFit) {
      blockCoordinates.push({
        top: bestFit.top,
        left: bestFit.left,
        right: bestFit.left + block.width,
        bottom: bestFit.top + block.height,
        initialOrder: blocks[i].initialOrder,
      });

      // Віднімаємо площу, зайняту блоком, від порожнього постору
      emptySpace -= block.width * block.height;
    }
  }
  const hole = findHole(blockCoordinates, containerSize); //площа внутрішніх порожнин
  const allBlocksArea = container.width * container.height - emptySpace; //пллоща всіх блоків
  const fullness = 1 - hole / (hole + allBlocksArea); //рахуємо за формулою заданою в умові

  return {
    fullness,
    blockCoordinates,
  };
}
