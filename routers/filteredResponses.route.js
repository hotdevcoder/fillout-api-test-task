const express = require('express');
const { check } = require('express-validator');
const responseController = require('../controllers/filteredResponse.controller');

const router = express.Router();

router.get('/:formId/filteredResponses', [
  check('formId').isLength({ min: 1 }).withMessage('Form ID is required'),
  check('page').optional().isInt({ gt: 0 }).withMessage('Page must be a positive integer'),
  check('pageSize').optional().isInt({ gt: 0 }).withMessage('Page size must be a positive integer'),
  check('filters').custom(responseController.validateFilters).withMessage('Filters must be a valid JSON string of filter objects'),
  responseController.getFilteredResponses
]);

module.exports = router;