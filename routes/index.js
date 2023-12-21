const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const router = new Router();

// router.get('/new', gameController)
router.post('/login', userController.login);
router.post('/registration', userController.registration);
router.get('/users', userController.getUsers);
router.post('/new');
router.post('/draw');

module.exports = router