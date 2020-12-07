var mongoose = require("mongoose");

postSchema = mongoose.Schema({
  imageUrl: String,
  caption: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
