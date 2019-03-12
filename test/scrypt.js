/* global describe, it */

const assert = require('assert')
const { scrypt, scryptSync } = require('../')

const fixtures = require('./fixtures')

// some tests params from: https://github.com/barrysteyn/node-scrypt/blob/master/tests/scrypt-tests.js
// also: https://tools.ietf.org/html/draft-josefsson-scrypt-kdf-00
// note, that params are wrong on here https://tools.ietf.org/html/draft-josefsson-scrypt-kdf-00 see:
// => https://twitter.com/dchest/status/247734446881640448

describe('scrypt', function () {
  describe('> when valid', function () {
    fixtures.valid.forEach(function (f) {
      if (f.skip) return // impractical to run most times

      it('should compute for ' + f.description, async function () {
        var data1 = await scrypt(f.key, f.salt, f.iterations, f.memory, f.parallel, f.keyLen)
        var data2 = scryptSync(f.key, f.salt, f.iterations, f.memory, f.parallel, f.keyLen)

        assert.strictEqual(data1.toString('hex'), f.result)
        assert.strictEqual(data2.toString('hex'), f.result)
      })
    })
  })
})
