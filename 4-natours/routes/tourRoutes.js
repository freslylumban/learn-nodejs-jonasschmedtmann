const express = require('express');
const {
  getAllTours,
  createTour,
  getTourById,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan
} = require('./../controllers/tourController');
const authController = require('./../controllers/authController');

const router = express.Router();

// router.param('id', checkID);

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);

router.route('/tour-stats').get(getTourStats);

router.route('/monthly-plan/:year').get(getMonthlyPlan);

router
  .route('/')
  .get(authController.protect, getAllTours)
  .post(createTour);

router
  .route('/:id')
  .get(getTourById)
  .patch(updateTour)
  .delete(deleteTour);

module.exports = router;
