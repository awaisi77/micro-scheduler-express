const axios = require('axios');
const config = require("../config/config.json");

module.exports = (baseURL) => {
  return axios.create({
    baseURL: baseURL,
    headers: {
      "servicename":config.service_name
    }
  });
}