const Agenda = require("../models/Agenda");

class AgendaController {
  static async index(req, res) {
    try {
      const agenda = await Agenda.findAll();
      //   console.log(agenda);
      res.render("agenda/index", { agenda });
    } catch (error) {
      res.status(500).send("Error al obtener agenda");
    }
  }

  static create(req, res) {
    res.render("agenda/create");
  }

  static async store(req, res) {
    try {
      const agenda = new Agenda(req.body);

      //   console.log("Datos recibidos:", agenda);
      await agenda.save();
      res.redirect("/");
    } catch (error) {
      res.status(500).send("Error al guardar agenda");
    }
  }

  static async edit(req, res) {
    try {
      const agenda = await Agenda.findById(req.params.id);
      if (!agenda) {
        return res.status(404).send("Agenda no encontrada");
      }
      res.render("agenda/edit", { agenda });
    } catch (error) {
      res.status(500).send("Error al obtener agenda");
    }
  }

  static async update(req, res) {
    try {
      const agenda = new Agenda({ id: req.params.id, ...req.body });
      await agenda.update();
      res.redirect("/");
    } catch (error) {
      res.status(500).send("Error al actualizar agenda");
    }
  }

  static async destroy(req, res) {
    try {
      await Agenda.delete(req.params.id);
      res.redirect("/");
    } catch (error) {
      res.status(500).send("Error al eliminar agenda");
    }
  }
}

module.exports = AgendaController;
