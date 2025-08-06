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
}

module.exports = AgendaController;
