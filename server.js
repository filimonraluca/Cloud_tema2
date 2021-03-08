const http = require('http')
const url = require('url')
const {PORT, MONGO_CONN_STRING} = require("./config")
const mogoose = require('mongoose')
const {getArtists, createArtist, updateArtist, deleteArtist} = require("./controllers/artistController")
const {createAlbum, getAlbums, updateAlbum, deleteAlbum} = require("./controllers/albumController")

async function artistPathHandler(req, res, path, queryObject) {
    if (path === '/api/artists' && req.method === 'GET') {
        await getArtists(req, res, queryObject)
    } else if (path.match('\/api\/artists\/([0-9a-f]{24}$)') && req.method === 'GET') {
        const id = path.split("/")[3];
        await getArtists(req, res, queryObject, id)
    } else if (path === '/api/artists' && req.method === 'POST')
        await createArtist(req, res)
    else if (path.match('\/api\/artists\/([0-9a-f]{24}$)') && req.method === 'POST') {
        const id = path.split("/")[3];
        await createArtist(req, res, id)
    } else if (path === '/api/artists' && req.method === 'PUT') {
        res.writeHead(405, {'Conternt-Type': 'application/json'})
        res.end(JSON.stringify({'message': 'Method Not Allowed!'}))
    } else if (path.match('\/api\/artists\/([0-9a-f]{24}$)') && req.method === 'PUT') {
        const id = path.split("/")[3];
        await updateArtist(req, res, id)
    } else if (path === '/api/artists' && req.method === 'DELETE') {
        res.writeHead(405, {'Conternt-Type': 'application/json'})
        res.end(JSON.stringify({'message': 'Method Not Allowed!'}))
    } else if (path.match('\/api\/artists\/([0-9a-f]{24}$)') && req.method === 'DELETE') {
        const id = path.split("/")[3];
        await deleteArtist(req, res, id)
    } else {
        res.writeHead(404, {'Conternt-Type': 'application/json'})
        res.end(JSON.stringify({'message': 'Route not found!'}))
    }
}

async function albumsPathHandler(req, res, path, queryObject) {
    if (path === '/api/albums' && req.method === 'GET') {
        await getAlbums(req, res, queryObject)
    } else if (path.match('\/api\/albums\/([0-9a-f]{24}$)') && req.method === 'GET') {
        const id = path.split("/")[3];
        await getAlbums(req, res, queryObject, id)
    } else if (path === '/api/albums' && req.method === 'POST')
        await createAlbum(req, res)
    else if (path.match('\/api\/albums\/([0-9a-f]{24}$)') && req.method === 'POST') {
        const id = path.split("/")[3];
        await createAlbum(req, res, id)
    } else if (path === '/api/albums' && req.method === 'PUT') {
        res.writeHead(405, {'Conternt-Type': 'application/json'})
        res.end(JSON.stringify({'message': 'Method Not Allowed!'}))
    } else if (path.match('\/api\/albums\/([0-9a-f]{24}$)') && req.method === 'PUT') {
        const id = path.split("/")[3];
        await updateAlbum(req, res, id)
    } else if (path === '/api/albums' && req.method === 'DELETE') {
        res.writeHead(405, {'Conternt-Type': 'application/json'})
        res.end(JSON.stringify({'message': 'Method Not Allowed!'}))
    } else if (path.match('\/api\/albums\/([0-9a-f]{24}$)') && req.method === 'DELETE') {
        const id = path.split("/")[3];
        await deleteAlbum(req, res, id)
    } else {
        res.writeHead(404, {'Conternt-Type': 'application/json'})
        res.end(JSON.stringify({'message': 'Route not found!'}))
    }
}

const server = http.createServer(async (req, res) => {
    const path = url.parse(req.url, true).pathname
    const queryObject = url.parse(req.url, true).query;
    if (path.match('\/api\/artists'))
        await artistPathHandler(req, res, path, queryObject)
    else if (path.match('\/api\/albums'))
        await albumsPathHandler(req, res, path, queryObject)
    else {
        res.writeHead(404, {'Conternt-Type': 'application/json'})
        res.end(JSON.stringify({'message': 'Route not found!'}))
    }
})
server.listen(PORT, async () => {
    await mogoose.connect(MONGO_CONN_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
    console.log("Connected to database!")
    console.log('Server running on port ' + PORT)
})

