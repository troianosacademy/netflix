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
router.get('/login',  AuthController.login);
router.post('/login', AuthController.sigin);
router.get('/logout', AuthController.logout);


/* Category */
router.get('/categories', authMiddleware(UserRole.ADMIN, loginRoute), CategoryController.index);
router.get('/category/:id', authMiddleware(UserRole.ADMIN, loginRoute), CategoryController.record);
router.get('/category', authMiddleware(UserRole.ADMIN, loginRoute), CategoryController.record);
router.get('/category/remove/:id', authMiddleware(UserRole.ADMIN, loginRoute), CategoryController.remove);
router.post('/category', authMiddleware(UserRole.ADMIN, loginRoute), CategoryController.save);
router.post('/category/:id', authMiddleware(UserRole.ADMIN, loginRoute), CategoryController.save);

/* Title */
router.get('/movies', authMiddleware(UserRole.ADMIN, loginRoute), TitleController.movies);
router.get('/series', authMiddleware(UserRole.ADMIN, loginRoute), TitleController.series);
router.get('/title/setFixedOnHome', authMiddleware(UserRole.ADMIN, loginRoute), TitleController.setFixedOnHome);
router.get('/serie/:titleId/seasons', authMiddleware(UserRole.ADMIN, loginRoute), TitleController.seasons);
router.get(['/serie/:titleId/season','/serie/:titleId/season/:id'], authMiddleware(UserRole.ADMIN, loginRoute), TitleController.season);
router.post(['/serie/:titleId/season','/serie/:titleId/season/:id'], authMiddleware(UserRole.ADMIN, loginRoute), TitleController.saveSeason);

router.get('/serie/:titleId/season/:id/remove', authMiddleware(UserRole.ADMIN, loginRoute), TitleController.removeSeason)

router.get(['/title', '/title/:id'], authMiddleware(UserRole.ADMIN, loginRoute), TitleController.record);
router.post(['/title', '/title/:id'], authMiddleware(UserRole.ADMIN, loginRoute), TitleController.save);

/* Users */
router.get('/users', authMiddleware(UserRole.ADMIN, loginRoute), AuthController.index);
router.get('/user/setDisabled', authMiddleware(UserRole.ADMIN, loginRoute), AuthController.setDisabled);
router.get('/user/:id', authMiddleware(UserRole.ADMIN, loginRoute), AuthController.edit);
router.post('/user/:id', authMiddleware(UserRole.ADMIN, loginRoute), AuthController.save);

module.exports = router;
