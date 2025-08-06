const AppDataSource = require("../config/database");

class AgendaController {
  static repository;

  static async init() {
    try {
      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
        console.log("Conectado a la base de datos");
      }
      AgendaController.repository = AppDataSource.getRepository("Agenda");
    } catch (error) {
      console.error("Error al conectar la base de datos:", error);
    }
  }

  static async index(req, res) {
    try {
      const agenda = await AgendaController.repository.find({
        order: { id: "DESC" },
      });
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
      const nuevaAgenda = AgendaController.repository.create(req.body);
      await AgendaController.repository.save(nuevaAgenda);
      res.redirect("/");
    } catch (error) {
      res.status(500).send("Error al guardar agenda");
    }
  }

  static async edit(req, res) {
    try {
      const agenda = await AgendaController.repository.findOneBy({
        id: parseInt(req.params.id),
      });
      if (!agenda) return res.status(404).send("Agenda no encontrada");
      res.render("agenda/edit", { agenda });
    } catch (error) {
      res.status(500).send("Error al obtener agenda");
    }
  }

  static async update(req, res) {
    try {
      const id = parseInt(req.params.id);
      await AgendaController.repository.update({ id }, req.body);
      res.redirect("/");
    } catch (error) {
      res.status(500).send("Error al actualizar agenda");
    }
  }

  static async destroy(req, res) {
    try {
      const id = parseInt(req.params.id);
      await AgendaController.repository.delete({ id });
      res.redirect("/");
    } catch (error) {
      res.status(500).send("Error al eliminar agenda");
    }
  }
}

module.exports = AgendaController;
