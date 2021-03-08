const mongoose = require('mongoose')

const albumSchema = new mongoose.Schema({
    name: String,
    artist: String,
    genre:  String,
    released: Number,
    Producer: String
});

const Album = mongoose.model("Albums", albumSchema)

module.exports = Album;