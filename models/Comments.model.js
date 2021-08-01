const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    twit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Twit",
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Comments = mongoose.model("Comments", commentSchema);

module.exports = Comments;
