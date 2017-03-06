// packages

var mongoose = require("mongoose");

// create schema class

var Schema = mongoose.Schema;

// create schema

var ArticleSchema = new Schema({

  title: {

    type: String,
    required: true

  },

  link: {

    type: String,
    required: true

  },

  note: [{

    type: Schema.Types.ObjectId,
    ref: "Note"

  }]

});

// article model

var Article = mongoose.model("Article", ArticleSchema);

// export it

module.exports = Article;