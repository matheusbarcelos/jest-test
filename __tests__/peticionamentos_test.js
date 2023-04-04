let peticionamentos_service = require('../services/peticionamentos_service.js')
let usuario = require('../fixtures/usuarios/usuarios.js')
let utils = require('../support/utils.js')
let  Joi  =  require( 'joi' ) ;
let schema = require ('../fixtures/schemas/peticionamentos_schema.js');
let feito = require ('../fixtures/feitos/feitos.js')

describe('Consultar Peticionamentos efetuados', () => {
    
    it('Validar retorno de peticionamentos efetuados por um usuário válido', async ()  => {
      const response = await peticionamentos_service.getPeticionamentos('cpf', usuario.cpf_valido, utils.token)
      
      expect(response.statusCode).toBe(200)
      expect(response.body.success).toBe(true)
      expect(response.body.count).toBeGreaterThan(0)
      Joi.assert(response.body, schema.getPeticionamentosSchema);
    });

    it('Validar retorno de peticionamentos por um usuário inválido', async () => {
      const response = await peticionamentos_service.getPeticionamentos('cpf',usuario.cpf_invalido, utils.token)
      
      expect(response.statusCode).toBe(200)
      expect(response.body.success).toBe(true)
      expect(response.body.count).toBe(0)
    });

    it('Validar retorno de peticionamentos sem informar um CPF', async () => {
      const response = await peticionamentos_service.getPeticionamentos('', '', utils.token)
        
      expect(response.statusCode).toBe(422)
      expect(response.body.detail[0].msg).toBe('field required')
    });

    it('Validar retorno de peticionamentos usuário sem autorização', async () => {
      const response = await peticionamentos_service.getPeticionamentos('cpf', usuario.cpf_valido, '')
          
      expect(response.statusCode).toBe(401)
      expect(response.body.detail).toBe('Not authenticated')
    });

});

describe('Efetuar Peticionamentos', () => {

    it('Validar peticionamento de um feito válido', async ()  => {
        const response = await peticionamentos_service.postPeticionar(feito.id_feito_valido, utils.token)
        
        expect(response.statusCode).toBe(200)
        expect(response.body.success).toBe(true)
        expect(response.body.msg).toBe('Petição criada com sucesso')
    });

    it('Validar peticionamento sem informar um feito', async ()  => {
        const response = await peticionamentos_service.postPeticionar('', utils.token)

        expect(response.statusCode).toBe(422)
        expect(response.body.detail[0].msg).toBe('field required')
    });

    it('Validar peticionamento sem autorização', async ()  => {
        const response = await peticionamentos_service.postPeticionar(feito.id_feito_valido, '')

        expect(response.statusCode).toBe(401)
        expect(response.body.detail).toBe('Not authenticated')
    });
    
});