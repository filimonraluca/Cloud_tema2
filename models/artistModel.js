const mongoose = require('mongoose')

const artistSchema = new mongoose.Schema({
    name: String,
    studio_albums: Number,
    compilation_albums: Number,
    live_albums: Number,
    remix_albums: Number
});

const Artist = mongoose.model("Artist", artistSchema)

module.exports = Artist;