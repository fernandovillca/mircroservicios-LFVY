const Agenda = require("../models/Agenda");

class AgendaController {
  async index(req, res) {
    try {
      const agenda = await Agenda.find();
      res.render("agenda/index", { agenda });
    } catch (error) {
      res.status(500).send("Error al obtener agenda");
    }
  }

  create(req, res) {
    res.render("agenda/create");
  }

  async store(req, res) {
    try {
      const {
        nombres,
        apellidos,
        fecha_nacimiento,
        direccion,
        celular,
        correo,
      } = req.body;

      const fecha = new Date(fecha_nacimiento);
      fecha.setUTCHours(0, 0, 0, 0);

      await Agenda.create({
        nombres,
        apellidos,
        fecha_nacimiento: fecha,
        direccion,
        celular,
        correo,
      });

      res.redirect("/");
    } catch (error) {
      res.status(500).send("Error al crear la agenda");
    }
  }

  async edit(req, res) {
    try {
      const agenda = await Agenda.findById(req.params.id);

      if (!agenda) return res.status(404).send("Agenda no encontrada");

      res.render("agenda/edit", { agenda });
    } catch (error) {
      res.status(500).send("Error al obtener la agenda");
    }
  }

  async update(req, res) {
    try {
      const {
        nombres,
        apellidos,
        fecha_nacimiento,
        direccion,
        celular,
        correo,
      } = req.body;
      await Agenda.findByIdAndUpdate(req.params.id, {
        nombres,
        apellidos,
        fecha_nacimiento,
        direccion,
        celular,
        correo,
      });

      res.redirect("/");
    } catch (error) {
      res.status(500).send("Error al actualizar la agenda");
    }
  }

  async destroy(req, res) {
    try {
      await Agenda.findByIdAndDelete(req.params.id);
      res.redirect("/");
    } catch (error) {
      res.status(500).send("Error al eliminar la agenda");
    }
  }
}

module.exports = new AgendaController();
