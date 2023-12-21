const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
const UserDto = require('../dto/user-dto');

class UserService {
  async registration(username, email, password) {
    const candidate = await UserModel.findOne({email});
    if(candidate) {
      throw `Пользователь с почтовым адресом ${email} уже существует`;
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const user = await UserModel.create({username, email, password: hashPassword});
    const userDto = new UserDto(user);
    console.log('user: ', userDto);
    return {user: userDto};
  }

  async login(username, password) {
    const user = await UserModel.findOne({username});
    if(!user) {
      throw 'Пользователь с таким именем не найден';
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if(!isPassEquals) {
      throw 'Пароль неверный';
    }
    const userDto = new UserDto(user);
    return {user: userDto};
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({activationLink})
    if (!user) {
        throw 'Неккоректная ссылка активации'
    }
    user.isActivated = true;
    await user.save();
  }

  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }
}

module.exports = new UserService();