const db = require("../config/database");

class Agenda {
  constructor({
    id = null,
    nombres,
    apellidos,
    fecha_nacimiento,
    direccion,
    celular,
    correo,
  }) {
    this.id = id;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.fecha_nacimiento = fecha_nacimiento;
    this.direccion = direccion;
    this.celular = celular;
    this.correo = correo;
  }

  static async findAll() {
    const query = "SELECT * FROM agenda ORDER BY id DESC";
    const [rows] = await db.getConnection().query(query);
    return rows;
  }

  static async findById(id) {
    const query = "SELECT * FROM agenda WHERE id = ?";
    if (!id) {
      throw new Error("El ID es requerido para buscar una agenda");
    }
    const [rows] = await db.getConnection().query(query, [id]);
    return rows[0];
  }

  async save() {
    const query = `
      INSERT INTO agenda (nombres, apellidos, fecha_nacimiento, direccion, celular, correo)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [
      this.nombres,
      this.apellidos,
      this.fecha_nacimiento,
      this.direccion,
      this.celular,
      this.correo,
    ];
    const [result] = await db.getConnection().query(query, values);
    this.id = result.insertId;
    return this;
  }

  async update() {
    const query = `
      UPDATE agenda
      SET nombres = ?, apellidos = ?, fecha_nacimiento = ?, direccion = ?, celular = ?, correo = ?
      WHERE id = ?
    `;
    const values = [
      this.nombres,
      this.apellidos,
      this.fecha_nacimiento,
      this.direccion,
      this.celular,
      this.correo,
      this.id,
    ];
    await db.getConnection().query(query, values);
    return this;
  }

  static async delete(id) {
    const query = "DELETE FROM agenda WHERE id = ?";
    if (!id) {
      throw new Error("El ID es requerido para eliminar una agenda");
    }
    await db.getConnection().query(query, [id]);
  }
}

module.exports = Agenda;
