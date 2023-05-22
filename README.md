# Node.js Rest API con Express & MySQL


Project setup
In the project directory, you can run:

npm install
# or
yarn install
or

Compiles and hot-reloads for development
npm start
# or
yarn start


----------------------


DB:
https://app.planetscale.com/renatavitrich99/bdrejunte

TABLE QUERY:
CREATE TABLE `trago` (
	`id` int NOT NULL AUTO_INCREMENT,
	`nombre` varchar(255) NOT NULL,
	`description` varchar(255),
	`ingredientes` varchar(255) NOT NULL,
	`preparacion` varchar(255) NOT NULL,
	`disponible` tinyint(1) DEFAULT '1',
	PRIMARY KEY (`id`)
) ENGINE InnoDB,
  CHARSET utf8mb3;

APIS:

// Crea nuevo trago
  router.post("/", trago.create);

  // trae todos los tragos
  router.get("/", trago.findAll);

  // Trae todos los  trago publicados
  router.get("/published", trago.getAllDisponible);

  // TRae un trago por un id especifico
  router.get("/:id", trago.findOne);

  // Actualiza un trago por id
  router.put("/:id", trago.update);

  // borra un tuto por id
  router.delete("/:id", trago.delete);

  // borra todos los tragos
  router.delete("/", trago.deleteAll);

  MAIN: app.use('/api/trago', router);
