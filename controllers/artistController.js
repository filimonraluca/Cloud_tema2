const Artist = require('../models/artistModel')
var ObjectId = require('mongoose').Types.ObjectId;
const {getBodyData} = require('../utils/utils')

async function createArtist(req, res, id) {
    try {
        if (id) {
            const data = await Artist.find({_id: new ObjectId(id)});
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
            studio_albums = 0,
            compilation_albums = 0,
            live_albums = 0,
            remix_albums = 0
        } = JSON.parse(body)
        const artist = {
            name,
            studio_albums,
            compilation_albums,
            live_albums,
            remix_albums
        }
        console.log(artist)
        const data = await Artist.find({name: artist.name});
        if (data.length != 0) {
            res.writeHead(409, {'Conternt-Type': 'application/json'})
            return res.end(JSON.stringify({'message': 'Resource already exists!'}))
        }
        await Artist.create(artist)
        res.writeHead(201, {'Conternt-Type': 'application/json'})
        return res.end(JSON.stringify(artist))
    } catch (error) {
        console.log(error)
        res.writeHead(404, {'Conternt-Type': 'application/json'})
        res.end(JSON.stringify({'message': 'Route not found!'}))
    }
}

async function getArtists(req, res, param, id) {
    try {
        const propertyParams = {};
        if (id) {
            propertyParams["_id"] = new ObjectId(id)
        }
        if (param.name) {
            propertyParams["name"] = param.name;
        }
        if (param.studio_albums) {
            propertyParams["studio_albums"] = param.studio_albums;
        }
        if (param.compilation_albums) {
            propertyParams["compilation_albums"] = param.compilation_albums;
        }
        if (param.live_albums) {
            propertyParams["live_albums"] = param.live_albums;
        }
        if (param.remix_albums) {
            propertyParams["remix_albums"] = param.remix_albums;
        }
        const data = await Artist.find(propertyParams);
        res.writeHead(200, {'Conternt-Type': 'application/json'})
        return res.end(JSON.stringify(data))
    } catch (error) {
        console.log(error)
        res.writeHead(404, {'Conternt-Type': 'application/json'})
        res.end(JSON.stringify({'message': 'Route not found!'}))
    }
}

async function updateArtist(req, res, id) {
    try {
        const data = await Artist.find({_id: new ObjectId(id)});
        if (data.length == 0) {
            res.writeHead(404, {'Conternt-Type': 'application/json'})
            return res.end(JSON.stringify({'message': ' ID not found!'}))
        }
        const body = JSON.parse(await getBodyData(req))
        const artist = await Artist.updateOne(
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

async function deleteArtist(req, res, id) {
    try {
        const data = await Artist.find({_id: new ObjectId(id)});
        if (data.length == 0) {
            res.writeHead(404, {'Conternt-Type': 'application/json'})
            return res.end(JSON.stringify({'message': ' ID not found!'}))
        }
        const del_res = await Artist.deleteOne({_id: new ObjectId(id)});
        res.writeHead(200, {'Conternt-Type': 'application/json'})
        return res.end(JSON.stringify(del_res))
    } catch (error) {
        console.log(error)
        res.writeHead(404, {'Conternt-Type': 'application/json'})
        res.end(JSON.stringify({'message': 'Route not found!'}))
    }
}

module.exports = {createArtist, getArtists, updateArtist, deleteArtist}
