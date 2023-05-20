module.exports = app => {
  const trago = require("../controllers/trago.controller.js");

  var router = require("express").Router();

  // Crea nuevo Tutorial
  router.post("/", trago.create);

  // trae todos los Tutoriales
  router.get("/", trago.findAll);

  // Trae todos los  trago publicados
  router.get("/published", trago.findAllPublished);

  // TRae un tuto por un id especifico
  router.get("/:id", trago.findOne);

  // Actualiza un tuto por id
  router.put("/:id", trago.update);

  // borra un tuto por id
  router.delete("/:id", trago.delete);

  // borra todos los tuto
  router.delete("/", trago.deleteAll);

  app.use('/api/trago', router);
};
