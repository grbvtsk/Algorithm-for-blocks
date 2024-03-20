function checkOverlapping(block, container, blockCoordinatess) {
  for (let y = 0; y <= container.height - block.height; y++) {
    for (let x = 0; x <= container.width - block.width; x++) {
      // Перевірка на перекривання іншимим блоками
      const overlapping = blockCoordinatess.some(
        (coord) =>
          !(
            coord.right <= x ||
            coord.left >= x + Number(block.width) ||
            coord.bottom <= y ||
            coord.top >= y + Number(block.height)
          )
      );

      if (!overlapping) {
        return { top: y, left: x };
      }
    }
  }
  return null;
}

function turnTo90(block, container, blockCoordinatess) {
  const temp = block.height;
  block.height = block.width;
  block.width = temp;
  if (checkOverlapping(block, container, blockCoordinatess) === null) {
    return null;
  } else return checkOverlapping(block, container, blockCoordinatess);
  // Якщо не знайдено підходящого місця для блока, повертаємо null
}
//EXPORT!
export function findBestFit(block, container, blockCoordinatess) {
  // Якщо не знайдено підходящого місця для блока, повертаємо на 90
  if (checkOverlapping(block, container, blockCoordinatess) === null) {
    return turnTo90(block, container, blockCoordinatess);
  } else return checkOverlapping(block, container, blockCoordinatess);
}
