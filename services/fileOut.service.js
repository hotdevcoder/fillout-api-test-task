const axios = require("axios");
const { fillOut } = require("../config");

const getResponse = ({ formId, page, pageSize }) => {
  return new Promise(async (resolve, reject) => {
    try {
     const response = await axios
      .get(`${fillOut.url}/${formId}/submissions`, {
        headers: {
          Authorization: `Bearer ${fillOut.key}`,
        },
        params: { page, pageSize },
      })
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  getResponse,
};
