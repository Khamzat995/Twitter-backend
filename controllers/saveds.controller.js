const Saved = require("../models/Saved.model");

module.exports.savedController = {
  createSaved: async (req, res) => {
    const { user, twit } = req.body;
    try {
      await Saved.create({
        user,
        twit,
      });
      res.json("Твит добавлен в избранное");
    } catch (e) {
      res.json(e.message);
    }
  },

  pushSaved: async (req, res) => {
    const { twit } = req.body;
    const saved = await Saved.findByIdAndUpdate(req.params.id, {
      $push: {
        twit: twit,
      },
    });
    res.json(saved);
  },

  getAllSaved: async (req, res) => {
    try {
      const saved = await Saved.find().populate('user', 'name');

      return res.json(saved);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  editSaved: async (req, res) => {
    const { user, twit } = req.body;
    const { id } = req.params;

    if (!user) {
      return res.status(400).json({
        error: "Необходимо указать новое название user",
      });
    }
    if (!twit) {
      return res.status(400).json({
        error: "Необходимо указать новый post",
      });
    }
    try {
      const edited = await Saved.findByIdAndUpdate(
        id,
        { user, twit },
        { new: true }
      );

      if (!edited) {
        return res.status(400).json({
          error: "Не удалось изменить. Проверь правильность ID",
        });
      }

      return res.json(edited);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  removeSaved: async (req, res) => {
    const { id } = req.params;

    try {
      const deleted = await Saved.findByIdAndRemove(id);

      if (!deleted) {
        return res.status(400).json({
          error: "Не удалось удалить saved. Укажите верный ID",
        });
      }

      return res.json({
        message: "Saved успешно удален",
      });
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },
};
