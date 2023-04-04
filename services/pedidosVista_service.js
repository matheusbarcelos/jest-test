let utils = require('../support/utils.js')

module.exports = {
  async postPedirVista(body, token) {
    const url = utils.base_url + '/pedirVista'

      const response = await fetch(url, {
          method: "POST",
          headers: {
              'Authorization': `${token}`,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
      });

      const statusCode = response.status;
      const responseBody = await response.json();
      return { response, responseBody, statusCode };
  },

};