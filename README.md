# hashdir
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status](https://coveralls.io/repos/floatdrop/hashdir/badge.png)](https://coveralls.io/r/floatdrop/hashdir) [![Dependency Status][depstat-image]][depstat-url]

Hashes content in directory and returning object with file structure and hashes (useful in tests)

## Install

Install with npm:

`npm install --save hashdir`

## Example

```js
var hashdir = require('hashdir');

/* `directory` structure:
directory/
  folder/
    file2.js
  emptyfolder/
  file1.js
*/
hashdir('directory', function (err, result) {
    assert.deepEqual(result, {
        'file1.js': 'SHA-1 of file1.js content',
        'folder/file2.js': 'SHA-1 of file2.js content',
        'folder/emptyfolder': undefined,
        'folder/folder': undefined,
    });
});

```

## API

### hashdir(path[, opts], cb)

__path__: path to directory, that you want to be hashed.

__Options__: Object, that passed to [`walk`](https://npmjs.org/package/walk) module.

__Callback__: function, that recieves `error` as first argument and `result` object in second.

## License

MIT © Vsevolod Strukchinsky

[npm-url]: https://npmjs.org/package/hashdir
[npm-image]: https://badge.fury.io/js/hashdir.png

[travis-url]: http://travis-ci.org/floatdrop/hashdir
[travis-image]: https://travis-ci.org/floatdrop/hashdir.png?branch=master

[depstat-url]: https://david-dm.org/floatdrop/hashdir
[depstat-image]: https://david-dm.org/floatdrop/hashdir.png?theme=shields.io
