module.exports = app => {
  const trago = require("../controllers/trago.controller.js");

  var router = require("express").Router();

  // Crea nuevo trago
  router.post("/", trago.create);

  // trae todos los tragos
  router.get("/", trago.findAll);

  // Trae todos los  trago disponibles
  router.get("/disponible", trago.getAllDisponible);

  // TRae un trago por un id especifico
  router.get("/:id", trago.findOne);

  // Actualiza un trago por id
  router.put("/:id", trago.update);

  // borra un tuto por id
  router.delete("/:id", trago.delete);

  // borra todos los tragos
  router.delete("/", trago.deleteAll);

  app.use('/api/trago', router);
};
