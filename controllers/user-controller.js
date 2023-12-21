const userService = require('../services/user-service');
const { validationResult } = require('express-validator');

class UserController {
  async registration(req, res, next) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next('Ошибка при валидации', errors.array())
        }
        const {username, email, password} = req.body;
        const userData = await userService.registration(username, email, password);
        return res.json(userData);
    } catch (e) {
        next(e);
    }
  }

  async login(req, res, next) {
    try {
      const {username, password} = req.body;
      const userData = await userService.login(username, password);
      console.log('пользователь зашел')
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }
}


module.exports = new UserController()