const { Shema, model, Schema, default: mongoose } = require("mongoose");

const quoteSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  body: {
    type: String,
    required: true,
    trim: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = model("quote", quoteSchema);
