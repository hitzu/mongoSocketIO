'use strict';

function conexion(req,res){
    res.status(200).send({ hola: "hola" });
}

module.exports = {
    conexion
}