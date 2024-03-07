const { validationResult } = require('express-validator');
const responseService = require('../services/filteredResponse.service');
const fileOutService = require('../services/fileOut.service');

const validateFilters = (value) => {
  try {
    const filters = JSON.parse(value);
    if (!Array.isArray(filters)) {
      throw new Error();
    }

    filters.forEach(filter => {
      if (!filter.id || !filter.condition || !filter.value) {
        throw new Error();
      }

      const validConditions = ['equals', 'does_not_equal', 'greater_than', 'less_than'];
      if (!validConditions.includes(filter.condition)) {
        throw new Error();
      }
    });

    return true;
  } catch {
    throw new Error('Filters must be a valid JSON string of filter objects');
  }
};

const getFilteredResponses = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { formId } = req.params;
    const { page, pageSize, filters } = req.query;
    const response = await fileOutService.getResponse({ formId, page, pageSize })
    console.log('test', response
    )

    const parsedFilters = JSON.parse(filters);
    const filteredResponses = responseService.filterResponses(response.responses, parsedFilters);

    res.json({
      responses: filteredResponses,
      totalResponses: filteredResponses.length,
      pageCount: Math.ceil(filteredResponses.length / pageSize)
    });
  } catch (err) {
    next(err);
  }
};


module.exports = {
  validateFilters,
  getFilteredResponses
}