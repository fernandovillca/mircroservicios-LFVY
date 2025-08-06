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
}

module.exports = AgendaController;
