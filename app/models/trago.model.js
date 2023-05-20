const sql = require("./db.js");

// constructor
const Trago = function(trago) {
  this.nombre = trago.nombre;
  this.description = trago.description;
  this.ingredientes = trago.ingredientes;
  this.preparacion = trago.preparacion;
  this.disponible = trago.disponible;
};

Trago.create = (newtrago, result) => {
  sql.query("INSERT INTO trago SET ?", newtrago, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("trago creado: ", { id: res.insertId, ...newtrago });
    result(null, { id: res.insertId, ...newtrago });
  });
};

Trago.findById = (id, result) => {
  sql.query(`SELECT * FROM trago WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("trago encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }

    // No encuentro el tuto con id
    result({ kind: "not_found" }, null);
  });
};

Trago.getAll = (nombre, result) => {
  let query = "SELECT * FROM trago";

  if (nombre) {
    query += ` WHERE nombre LIKE '%${nombre}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("trago: ", res);
    result(null, res);
  });
};

Trago.getAllDisponible = result => {
  sql.query("SELECT * FROM trago WHERE disponible=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tragoes: ", res);
    result(null, res);
  });
};

Trago.updateById = (id, trago, result) => {
  sql.query(
    "UPDATE trago SET nombre = ?, description = ?, ingredientes = ? , preparacion = ?, disponible = ? WHERE id = ?",
    [trago.nombre, trago.description, trago.ingredientes, trago.preparacion , trago.disponible, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // no encuentro tuto con id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated trago: ", { id: id, ...trago });
      result(null, { id: id, ...trago });
    }
  );
};

Trago.remove = (id, result) => {
  sql.query("DELETE FROM trago WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // no encuentro tuto con id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("trago borrado con id: ", id);
    result(null, res);
  });
};

Trago.removeAll = result => {
  sql.query("DELETE FROM trago", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`tutos ${res.affectedRows} borrados`);
    result(null, res);
  });
};

module.exports = Trago;
