const fs = require('fs');
const path = require('path');

const targetFolderPath = './gameData';
const fileName = 'games.json';

const filePath = path.join(targetFolderPath, fileName);
const gameZone = Array.from({ length: 9 }, () => (''));
let instanceGame
const fileHandler = (gameId) => {
  instanceGame = gameId
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if(err) throw err;
    const gameData = JSON.parse(data);
    if(gameData[gameId]) return;
    const objId = {gameZone, winnable: ''}
    gameData[gameId] =  objId;
    const content = JSON.stringify(gameData, null, 2);

    fs.writeFile(filePath, content, (err) => {
      if (err) {
        console.error('Ошибка при создании файла:', err);
      } else {
        console.log(`Файл ${fileName} успешно создан в ${targetFolderPath}`);
      }
    });
  })
  return gameZone
}

const clickDrawEvent = (clickOfArray) => {
  console.log(instanceGame)
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if(err) throw err;
    const gameData = JSON.parse(data);
    gameData[instanceGame].gameZone = clickOfArray;
    const content = JSON.stringify(gameData, null, 2);

    fs.writeFile(filePath, content, (err) => {
      if (err) {
        console.error('Ошибка при записи в массив:', err);
      }
    });
  })
  return clickOfArray
}

// fileHandler(2)
// clickDrawEvent(['x','1','1','2','3','4','5','6','7'])
module.exports.fileHandler = fileHandler;
module.exports.clickDrawEvent = clickDrawEvent;