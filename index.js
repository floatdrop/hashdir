'use strict';

var walk = require('node-walk'),
    fs = require('fs'),
    crypto = require('crypto'),
    shasum = crypto.createHash('sha1');

var f = function (path, opts, cb) {
    if (typeof opts === 'function') {
        cb = opts;
        opts = {};
    }

    var walker = walk.walk(path, opts);
    var result = {};

    walker.on('directories', function (root, dirStatsArray, next) {
        result[root] = undefined;
        next();
    });

    walker.on('file', function (root, fileStats, next) {
        fs.createReadStream(fileStats.name)
            .on('data', shasum.bind(shasum))
            .on('error', next)
            .on('end', function () {
                result[root] = shasum.digest('hex');
                next();
            });
    });

    walker.on('error', cb.bind(null));
    walker.on('end', cb.bind(null, null, result));
};

module.exports = f;
