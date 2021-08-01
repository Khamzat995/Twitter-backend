const Comments = require("../models/Comments.model");

module.exports.commentsController = {
  getAllComments: async (req, res) => {
    try {
      const comments = await Comments.find().populate('user', 'name');

      return res.json(comments);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  getCommentsById: async (req, res) => {
    const { id } = req.params;

    try {
      const comments = await Comments.findById(id).populate('user', 'name');

      if (!comments) {
        return res.status(404).json({
          error: "Комментарий с таким ID не найдена",
        });
      }

      return res.json(comments);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  createComments: async (req, res) => {
    const { user, twit, text } = req.body;

    if (!user) {
      return res.status(400).json({
        error: "Необходимо указать user name",
      });
    }
    if (!twit) {
      return res.status(400).json({
        error: "Необходимо указать post",
      });
    }
    if (!text) {
      return res.status(400).json({
        error: "Необходимо указать text",
      });
    }

    try {
      const comments = await Comments.create({ user, twit, text });

      return res.json(comments);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  removeComments: async (req, res) => {
    const { id } = req.params;

    try {
      const deleted = await Comments.findByIdAndRemove(id);

      if (!deleted) {
        return res.status(400).json({
          error: "Не удалось удалить комментарий. Укажите верный ID",
        });
      }

      return res.json({
        message: "Комментарий успешно удален",
      });
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  editComments: async (req, res) => {
    const { user, twit, text } = req.body;
    const { id } = req.params;

    if (!user) {
      return res.status(400).json({
        error: "Необходимо указать новое название user",
      });
    }
    if (!twit) {
      return res.status(400).json({
        error: "Необходимо указать новое название post",
      });
    }
    if (!text) {
      return res.status(400).json({
        error: "Необходимо указать новое название text",
      });
    }

    try {
      const edited = await Comments.findByIdAndUpdate(
        id,
        { user, twit, text },
        { new: true }
      );

      if (!edited) {
        return res.status(400).json({
          error: "Не удалось изменить название. Проверь правильность ID",
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
