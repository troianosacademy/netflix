const AuthController = require('../controllers/admin/AuthController');
const DashboardController = require('../controllers/admin/DashboardController');
const CategoryController = require('../controllers/admin/CategoryController');
const MovieController = require('../controllers/admin/MovieController');
const SerieController = require('../controllers/admin/SerieController');

const authMiddleware = require('../middlewares/authMiddleware');
const UserRole = require('../business/Constants/UserRole');

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

/* Movie */
router.get('/movies', MovieController.index);
router.get('/movie/:id', MovieController.record);
router.get('/movie', MovieController.record);
router.post('/movie', MovieController.save);
router.post('/movie/:id', MovieController.save);

/* Movie */
router.get('/series', SerieController.index);

module.exports = router;
