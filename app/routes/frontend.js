const express = require('express');
const TitleController = require('../controllers/frontend/TitleController');
const AuthController = require('../controllers/frontend/AuthController');
const authMiddleware = require('../middlewares/authMiddleware');
const UserRole = require('../business/Constants/UserRole');

const router = express.Router();
const loginRoute = '/login';

router.get('/', authMiddleware(UserRole.CUSTOMER, loginRoute), TitleController.index);
router.get('/createAll', authMiddleware(UserRole.CUSTOMER, loginRoute), TitleController.createAll);
router.get('/series', authMiddleware(UserRole.CUSTOMER, loginRoute), TitleController.series);
router.get('/movies', authMiddleware(UserRole.CUSTOMER, loginRoute), TitleController.movies);
router.post('/search', authMiddleware(UserRole.CUSTOMER, loginRoute), TitleController.search);
router.get('/details', authMiddleware(UserRole.CUSTOMER, loginRoute), TitleController.details);
router.get('/play', authMiddleware(UserRole.CUSTOMER, loginRoute), TitleController.play);
router.get('/profile', authMiddleware(UserRole.CUSTOMER, loginRoute), AuthController.profile);
router.post('/profile', authMiddleware(UserRole.CUSTOMER, loginRoute), AuthController.updateUser);

router.get('/register', AuthController.register);
router.post('/register', AuthController.saveUser);

router.get(loginRoute, AuthController.login);
router.post(loginRoute, AuthController.sigin);

router.get('/logout', AuthController.logout);

module.exports = router;
