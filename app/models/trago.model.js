const sql = require("./db.js");

// constructor
const Trago = function(trago) {
  this.title = trago.title;
  this.description = trago.description;
  this.published = trago.published;
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

Trago.getAll = (title, result) => {
  let query = "SELECT * FROM trago";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
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

Trago.getAllPublished = result => {
  sql.query("SELECT * FROM trago WHERE published=true", (err, res) => {
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
    "UPDATE trago SET title = ?, description = ?, published = ? WHERE id = ?",
    [trago.title, trago.description, trago.published, id],
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

    console.log("tuto borrado con id: ", id);
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
