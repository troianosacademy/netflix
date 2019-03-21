const mongoose = require('mongoose');

module.exports = mongoose.model('Title', {
  type: String,
  title: String,
  subTitle: String,
  age: Number,
  durationMinutes: Number,
  tags: [String],
  synopsis: String,
  category: String,
  categoryId: mongoose.Schema.Types.ObjectId,
  imageCoverFilename: String,
  videoFileName: String,
  year: Number,
  createdAt: Date,
  isFixedOnHome: Boolean,
  seasons: [{ number: Number, episodes: [{ videoFileName: String, title: String, durationMinutes: Number, synopsis: String, imageCoverFilename: String }] }]
});
