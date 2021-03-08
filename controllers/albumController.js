const Album = require('../models/albumModel')
var ObjectId = require('mongoose').Types.ObjectId;
const {getBodyData} = require('../utils/utils')

async function createAlbum(req, res, id) {
    try {
        if (id) {
            const data = await Album.find({_id: new ObjectId(id)});
            if (data.length != 0) {
                res.writeHead(409, {'Conternt-Type': 'application/json'})
                return res.end(JSON.stringify({'message': 'Resource already exists!'}))
            } else {
                res.writeHead(404, {'Conternt-Type': 'application/json'})
                return res.end(JSON.stringify({'message': 'Not found!'}))
            }
        }
        const body = await getBodyData(req)
        const {
            name,
            artist,
            genre,
            released,
            producer,
        } = JSON.parse(body)
        const album = {
            name,
            artist,
            genre,
            released,
            producer,
        }
        console.log(album)
        const data = await Album.find({name: album.name});
        if (data.length != 0) {
            res.writeHead(409, {'Conternt-Type': 'application/json'})
            return res.end(JSON.stringify({'message': 'Resource already exists!'}))
        }
        await Album.create(album)
        res.writeHead(201, {'Conternt-Type': 'application/json'})
        return res.end(JSON.stringify(album))
    } catch (error) {
        console.log(error)
        res.writeHead(404, {'Conternt-Type': 'application/json'})
        res.end(JSON.stringify({'message': 'Route not found!'}))
    }
}

async function getAlbums(req, res, param, id) {
    try {
        const propertyParams = {};
        if (id) {
            propertyParams["_id"] = new ObjectId(id)
        }
        if (param.name) {
            propertyParams["name"] = param.name;
        }
        if (param.artist) {
            propertyParams["artist"] = param.artist;
        }
        if (param.genre) {
            propertyParams["genre"] = param.genre;
        }
        if (param.released) {
            propertyParams["released"] = param.released;
        }
        if (param.producer) {
            propertyParams["producer"] = param.producer;
        }
        const data = await Album.find(propertyParams);
        res.writeHead(200, {'Conternt-Type': 'application/json'})
        return res.end(JSON.stringify(data))
    } catch (error) {
        console.log(error)
        res.writeHead(404, {'Conternt-Type': 'application/json'})
        res.end(JSON.stringify({'message': 'Route not found!'}))
    }
}

async function updateAlbum(req, res, id) {
    try {
        const data = await Album.find({_id: new ObjectId(id)});
        if (data.length == 0) {
            res.writeHead(404, {'Conternt-Type': 'application/json'})
            return res.end(JSON.stringify({'message': ' ID not found!'}))
        }
        const body = JSON.parse(await getBodyData(req))
        const artist = await Album.updateOne(
            {_id: new ObjectId(id)},
            body
        );
        res.writeHead(200, {'Conternt-Type': 'application/json'})
        return res.end(JSON.stringify(artist))
    } catch (error) {
        console.log(error)
        res.writeHead(404, {'Conternt-Type': 'application/json'})
        res.end(JSON.stringify({'message': 'Route not found!'}))
    }
}

async function deleteAlbum(req, res, id) {
    try {
        const data = await Album.find({_id: new ObjectId(id)});
        if (data.length == 0) {
            res.writeHead(404, {'Conternt-Type': 'application/json'})
            return res.end(JSON.stringify({'message': ' ID not found!'}))
        }
        const del_res = await Album.deleteOne({_id: new ObjectId(id)});
        res.writeHead(200, {'Conternt-Type': 'application/json'})
        return res.end(JSON.stringify(del_res))
    } catch (error) {
        console.log(error)
        res.writeHead(404, {'Conternt-Type': 'application/json'})
        res.end(JSON.stringify({'message': 'Route not found!'}))
    }
}


module.exports = {createAlbum,getAlbums,updateAlbum, deleteAlbum}