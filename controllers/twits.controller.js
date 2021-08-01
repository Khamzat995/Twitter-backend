const Twit = require("../models/Twit.model");

module.exports.twitController = {
  getAllTwits: async (req, res) => {
    try {
      const twit = await Twit.find().populate('user', 'name');

      return res.json(twit);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  getTwitById: async (req, res) => {
    const { id } = req.params;

    try {
      const twit = await Twit.findById(id).populate('user', 'name');

      if (!twit) {
        return res.status(404).json({
          error: "twit с таким ID не найден",
        });
      }

      return res.json(twit);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  createTwit: async (req, res) => {
    const { user, text } = req.body;

    if (!user) {
      return res.status(400).json({
        error: "Необходимо указать название user",
      });
    }
    if (!text) {
      return res.status(400).json({
        error: "Необходимо указать text",
      });
    }
    try {
      const twit = await Twit.create({ user, text });

      return res.json(twit);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  createTwitByLike: async (req, res) => {
    const { like } = req.body;
    try {
      const likeId = await Twit.findByIdAndUpdate(req.params.id, {
        $push: {
          like: like,
        },
      });
      res.json(likeId);
    } catch (e) {
      res.json(e.message);
    }
  },

  removeTwit: async (req, res) => {
    const { id } = req.params;

    try {
      const deleted = await Twit.findByIdAndRemove(id);

      if (!deleted) {
        return res.status(400).json({
          error: "Не удалось удалить twit. Укажите верный ID",
        });
      }

      return res.json({
        message: "Twit успешно удален",
      });
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  editTwit: async (req, res) => {
    const { user, text } = req.body;
    const { id } = req.params;

    if (!user) {
      return res.status(400).json({
        error: "Необходимо указать новое название user",
      });
    }
    if (!text) {
      return res.status(400).json({
        error: "Необходимо указать новый text",
      });
    }
    try {
      const edited = await Twit.findByIdAndUpdate(
        id,
        { user, text },
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
};
