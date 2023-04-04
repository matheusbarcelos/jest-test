let utils = require('../support/utils.js')
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');


module.exports = {
  async getPeticionamentos(cpf, cpf_user, token) {
    const url = utils.base_url + '/peticionamentos' +
      `?${cpf}=${cpf_user}&page=1&pageSize=20&sortKey=data&sortDirection=descending&text_search=`;

      const response = await fetch(url, {
          method: "GET",
          headers: {
              'Authorization': `${token}`,
              'Content-Type': 'application/json'
          }
      });

      const statusCode = response.status;
      const body = await response.json();
      return { response, body, statusCode };
  },

  async postPeticionar(id_feito, token){
    const url = utils.base_url + '/peticionar';

      const fd = new FormData();

        fd.append('id_feito', id_feito);
        fd.append('cpf', '12024991637');
        fd.append('name', 'Meu Nome');
        fd.append('email', 'mbarcelos@mpmg.mp.br');
        fd.append('tel', '37998416803');
        fd.append('selo_id', '1');
        fd.append('selo_name', 'Bronze');
        fd.append('files', fs.createReadStream(path.resolve(__dirname, '../fixtures/documentos/doc.pdf')));
      
        const response = await axios.post(url, fd, {
            headers: {
                'Authorization': token,
                'Content-Type': `multipart/form-data; boundary=${fd._boundary}`,
              },
            validateStatus: function (status) {
                return status >= 200 && status < 423;
            }
        });

      const statusCode = response.status;
      const body =  response.data;
      return { response, statusCode, body};
  },

};


