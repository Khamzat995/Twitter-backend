const mongoose = require("mongoose");

const twitSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    like: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Twit = mongoose.model("Twit", twitSchema);

module.exports = Twit;
