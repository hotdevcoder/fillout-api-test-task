exports.filterResponses = (responses, filters) => {
  return responses.filter((response) => {
    return filters.every((filter) => {
      const question = response.questions.find(
        (question) => question.id === filter.id
      );
      if (!question) return false;
      switch (filter.condition) {
        case "equals":
          return question.value === filter.value;
        case "does_not_equal":
          return question.value !== filter.value;
        case "greater_than":
          return new Date(question.value) > new Date(filter.value);
        case "less_than":
          return new Date(question.value) < new Date(filter.value);
        default:
          return false;
      }
    });
  });
};
