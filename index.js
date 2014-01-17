'use strict';

var walk = require('walk'),
    fs = require('fs'),
    crypto = require('crypto'),
    path = require('path');

var f = function (directory, opts, cb) {
    if (typeof opts === 'function') {
        cb = opts;
        opts = {};
    }

    opts.filters = opts.filters || [];
    opts.filters = opts.filters.concat([directory]);

    directory = path.resolve(directory);

    var walker = walk.walk(directory, opts);
    var result = {};

    walker.on('directory', function (root, dirStatsArray, next) {
        var fullpath = path.join(root, dirStatsArray.name);
        result[path.relative(directory, fullpath)] = undefined;
        next();
    });

    walker.on('file', function (root, fileStats, next) {
        var fullpath = path.join(root, fileStats.name);
        var shasum = crypto.createHash('sha1');
        fs.createReadStream(fullpath)
            .on('data', shasum.update.bind(shasum))
            .on('error', next)
            .on('end', function () {
                result[path.relative(directory, fullpath)] = shasum.digest('hex');
                next();
            });
    });

    walker.on('error', cb.bind(null));
    walker.on('end', cb.bind(null, null, result));
};

module.exports = f;
