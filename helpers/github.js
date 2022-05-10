const axios = require("axios");
const config = require("../config.js");

/**
 * @param {String} username Github username as String
 * @returns axios promise object with json response of all repos owned by username param
 */
const getReposByUsername = username => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  const options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      "User-Agent": "request",
      Authorization: `token ${config.TOKEN}`,
    },
  };

  return axios(options);
};

module.exports.getReposByUsername = getReposByUsername;
