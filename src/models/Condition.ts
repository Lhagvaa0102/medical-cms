import mongoose from "mongoose";

const ConditionSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
  },

  title: {
    mn: String,
    en: String,
  },

  content: {
    mn: String,
    en: String,
  },

  coverImage: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Condition ||
  mongoose.model("Condition", ConditionSchema);
