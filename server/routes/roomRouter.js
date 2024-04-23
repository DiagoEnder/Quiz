const express = require('express');

const authController = require('../controllers/authController');
const roomController = require('./../controllers/roomController')

const router = express.Router();

router
    .route('/checkexist')
    .post(
        roomController.checkExistRoom
    )

router
    .route('/joinedroom')
    .put(

        roomController.joinRoom
    )

router
    .route('/leaveroom')
    .patch(

        roomController.leaveRoom
    )
router.route('/addscore')
    .patch(

        roomController.pushResult
    )

router.route('/fetchroom')
    .get(

        roomController.currentRoom
    )
router.use(authController.protect);

router
    .route('/startlive/:quizId')
    .post(

        authController.restrictTo('user', 'admin'),
        roomController.createRoom
    )
    .put(

        authController.restrictTo('user', 'admin'),
        roomController.kickPlayer
    )
    .delete(

        authController.restrictTo('user', 'admin'),
        roomController.deleteRoom
    )
    .get(
        roomController.currentRoom
    )
    .patch(
        roomController.startRoom
    )


module.exports = router;