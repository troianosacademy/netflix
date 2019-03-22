const AuthController = require('../controllers/admin/AuthController');
const DashboardController = require('../controllers/admin/DashboardController');
const CategoryController = require('../controllers/admin/CategoryController');
const TitleController = require('../controllers/admin/TitleController');

const authMiddleware = require('../middlewares/authMiddleware');
const UserRole = require('../business/constants/UserRole');

const express = require('express');

const router = express.Router();
const loginRoute = '/admin/login';

router.get('/', authMiddleware(UserRole.ADMIN, loginRoute), DashboardController.index);

/* Auth */
router.get('/login', AuthController.login);
router.post('/login', AuthController.sigin);

/* Category */
router.get('/categories', CategoryController.index);
router.get('/category/:id', CategoryController.record);
router.get('/category', CategoryController.record);
router.get('/category/remove/:id', CategoryController.remove);
router.post('/category', CategoryController.save);
router.post('/category/:id', CategoryController.save);

/* Title */
router.get('/movies', TitleController.movies);
router.get('/series', TitleController.series);
router.get('/title/setFixedOnHome', TitleController.setFixedOnHome);

router.get(['/title', '/title/:id'], TitleController.record);
router.post(['/title', '/title/:id'], TitleController.save);

/* Users */
router.get('/users', AuthController.index);
router.get('/user/setDisabled', AuthController.setDisabled);
router.get('/user/:id', AuthController.edit);
router.post('/user/:id', AuthController.save);

module.exports = router;
