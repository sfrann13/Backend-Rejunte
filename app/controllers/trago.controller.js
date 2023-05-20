const Trago = require("../models/trago.model.js");

// Crea y guarda un trago nuevo
exports.create = (req, res) => {
  // Valida req
  if (!req.body) {
    res.status(400).send({
      message: "No puede ser vacío!"
    });
  }

  // Crea un Trago
  const trago = new Trago({
    nombre: req.body.nombre,
    description: req.body.description,
    ingredientes: req.body.ingredientes,
    preparacion: req.body.preparacion ,
    disponible: req.body.disponible
  });

  // Guarda un Trago en DB
  Trago.create(trago, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "error creando un Trago."
      });
    else res.send(data);
  });
};

// Trae todos los trago  (con condicion).
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;

  Trago.getAll(nombre, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "error obteniendo Tragoes."
      });
    else res.send(data);
  });
};

// Busca un trago por Id
exports.findOne = (req, res) => {
  Trago.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encuentra un Trago con el ID ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "error obteniendo Trago con id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// busca todos los trago que se publicaron
exports.findAllPublished = (req, res) => {
  Trago.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "error obteniendo Tragoes."
      });
    else res.send(data);
  });
};

// Actualiza un trago por id por request
exports.update = (req, res) => {
  // Valida Request
  if (!req.body) {
    res.status(400).send({
      message: "el update no puede ser vacío!"
    });
  }

  console.log(req.body);

  Trago.updateById(
    req.params.id,
    new Trago(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No se encuentra el trago con el id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "error actualizando el trago con el id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Borra un trago con ID especifico
exports.delete = (req, res) => {
  Trago.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encuentra el id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "No puedo borrar el trago con id " + req.params.id
        });
      }
    } else res.send({ message: `El Trago ha sido borrado con éxito!` });
  });
};

// Delete todos los trago.
exports.deleteAll = (req, res) => {
  Trago.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "error borrando todos los Tragoes."
      });
    else res.send({ message: `Todos los trago no existen mas!` });
  });
};
