import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  isbn: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  publishedYear: { type: Date, required: true },
  copiesAvailable: { type: Number, required: true },
  totalCopies: { type: Number, required: true },
});

export default mongoose.model("Books", bookSchema);
