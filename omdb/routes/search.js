const fs = require('fs');
const path = require('path');

function notFound(req,res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    const stream = fs.createReadStream(path.resolve('public', 'movie.html')); // public/movie.html

    stream.pipe(res);
}

module.exports = notFound;