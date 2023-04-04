let pedidos_vista_service = require('../services/pedidosVista_service.js')
let body = require('../fixtures/jsons/pedirVista.js')
let feitos = require('../fixtures/feitos/feitos.js')
let utils = require('../support/utils.js')

describe('Pedidos de Vista', () => {
    
    it('Validar pedido de vista feito válido', async ()  => {
        const response = await pedidos_vista_service.postPedirVista(body.bodyPedidoVista(feitos.id_feito_valido), utils.token)
       
        expect(response.statusCode).toBe(200)
        expect(response.responseBody.success).toBe(true)
        expect(response.responseBody.msg).toBe('Pedido de vista criado com sucesso')
    });

    it('Validar pedido de vista feito inválido', async ()  => {
        const response = await pedidos_vista_service.postPedirVista(body.bodyPedidoVista(''), utils.token)

        expect(response.statusCode).toBe(200)
        expect(response.responseBody.success).toBe(false)
    });

    it('Validar pedidos de vista sem autorização', async ()  => {
        const response = await pedidos_vista_service.postPedirVista(body.bodyPedidoVista(feitos.id_feito_valido), '')

        expect(response.statusCode).toBe(401)
        expect(response.responseBody.detail).toBe('Not authenticated')
    });
});