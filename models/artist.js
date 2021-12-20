const mongoose = require("mongoose");

const Artist = mongoose.Schema({
  address: { type: String, required: true },
  name: { type: String, required: true },
});
Artist.index({ address: 1 }, { unique: true });

mongoose.model("Artist", Artist);
