const express = require('express');

const authController = require('../controllers/authController');
const roomController = require('./../controllers/roomController')

const router = express.Router();

router.use(authController.protect);

router
    .route('/startlive/:quizId')
    .post(
        authController.protect,
        authController.restrictTo('user', 'admin'),
        roomController.createRoom
    )

module.exports = router;

