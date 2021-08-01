const mongoose = require("mongoose");

const savedSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  twit: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Twit",
    },
  ],
},
  { timestamps: true }
  );

const Saved = mongoose.model("Saved", savedSchema);

module.exports = Saved;
