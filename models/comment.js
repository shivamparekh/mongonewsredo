//packages

var mongoose = require("mongoose");

// create a schema 

var Schema = mongoose.Schema;

// schema

var CommentSchema = new Schema({

  title: {

    type: String

  },

  body: {

    type: String

  }
  
});

// create the comment model using the CommentSchema

var Comment = mongoose.model("Comment", CommentSchema);

// export it

module.exports = Comment;