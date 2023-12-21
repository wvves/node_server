const fs = require('fs');
const path = require('path');

const targetFolderPath = './gameData';
const fileName = 'names.json';

const filePath = path.join(targetFolderPath, fileName);

const getSocketIdByUserId = (id) => {
  const usersIds = JSON.parse(fs.readFileSync(filePath, 'utf-8')).names;
  const userIndex = usersIds.indexOf(id);
  return userIndex === -1 ? null : usersIds[userIndex];
}
// console.log(getSocketIdByUserId('ss'));

module.exports.getSocketIdByUserId = getSocketIdByUserId;