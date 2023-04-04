let Joi = require( 'joi' ) ;

module.exports = {

    getPeticionamentosSchema : Joi.object({
        success: Joi.boolean().required(),
        status_code: Joi.number().required(),
        count: Joi.number().required(),
        results: Joi.array().items(Joi.object({
                documentos: Joi.array().items(Joi.object({
                            id_documento: Joi.string().required(),
                            filename: Joi.string().required(),
                            arquivo: Joi.string().required(),
                            arquivo_original: Joi.string().required(),
                            versaoPdf: Joi.string().required(),
                            extensao: Joi.string().required()
                            })),
                data: Joi.string().isoDate().required(),
                id: Joi.string().required(),
                id_feito: Joi.string().required(),
                numero: Joi.string().required(),
                classe: Joi.string().required(),
                promotoria: Joi.string().required(),
                filename: Joi.string().required()
        })).required()
     })

}