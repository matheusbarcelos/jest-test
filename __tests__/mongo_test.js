let database = require('../database/db.js')
let feitos = require('../fixtures/feitos/feitos.js')

describe('Consultar feito no Mongo', () => {
    it('Validar feito consultado', async () => {
        let consulta = await database.run(feitos.id_feito_valido)

        expect(consulta.numero).toBe(feitos.numero_feito)
    });
    
});