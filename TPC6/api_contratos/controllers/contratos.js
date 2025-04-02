var Contrato = require('../models/contrato')

module.exports.list = () => {
    return Contrato
    .find()
    .sort({nome : 1})
    .exec()
}

module.exports.listByEntidade = (entidade) => {
    return Contrato
    .find({entidade_comunicante:entidade})
    .exec()
}

module.exports.listByTipo = (tipo) => {
    return Contrato
    .find({tipoprocedimento:tipo})
    .exec()
}

module.exports.listEntidades = () => {
    return Contrato
    .distinct("entidade_comunicante")
    .exec()
}

module.exports.listTipos = () => {
    return Contrato
    .distinct("tipoprocedimento")
    .exec()
}
module.exports.findByID = (id) => {
    return Contrato
    .findById(id)
    .exec()
}

module.exports.insert = (contrato) => {
    novo_contrato = new Contrato(contrato)
    return novo_contrato.save()
}

module.exports.delete = (id) => {
    return Contrato.findByIdAndDelete(id,{new : true})
}

module.exports.edit = (id,contrato) => {
    return Contrato.findByIdAndUpdate(id,contrato,{new : true})
}