/* global describe, it */
'use strict';

delete require.cache[require.resolve('..')];
var hashdir = require('..');
var assert = require('assert');

describe('hashdir', function () {

    it('should work', function (done) {
        hashdir('test/fixtures', function (err, result) {
            assert.ok(!err);
            assert.ok(result);

            assert.equal(result['index.js'], 'a77b15c0d64cf6111e025645e562faf8ccabb9d7');
            assert.strictEqual(result.emptyfolder, undefined);
            assert.equal(result['subfolder/module.js'], '52c32688290d33191d4f56c9066eb4cb14daf60c');

            done();
        });
    });

});
