/* global describe, it */

var assert = require('assert')
var scrypt = require('../')

var fixtures = require('./fixtures')

// some tests params from: https://github.com/barrysteyn/node-scrypt/blob/master/tests/scrypt-tests.js
// also: https://tools.ietf.org/html/draft-josefsson-scrypt-kdf-00
// note, that params are wrong on here https://tools.ietf.org/html/draft-josefsson-scrypt-kdf-00 see:
// => https://twitter.com/dchest/status/247734446881640448

describe('scrypt', function () {
  describe('> when valid', function () {
    fixtures.valid.forEach(function (f) {
      if (f.skip) return // impractical to run most times

      it('should compute for ' + f.description, function () {
        var data = scrypt(f.key, f.salt, f.iterations, f.memory, f.parallel, f.keyLen)

        assert.strictEqual(data.toString('hex'), f.result)
      })
    })
  })
  describe('progress callback', function () {
    var f = fixtures.valid[1]
    it('should callback for ' + f.description, function () {
      var called = []
      var data = scrypt(f.key, f.salt, f.iterations, f.memory, f.parallel, f.keyLen, function (d) {
        called.push(d)
      })
      assert.strictEqual(called.length, 32)
      assert.deepStrictEqual(called[5], {
        current: 6000,
        percent: 18.310546875,
        total: 32768
      })
      assert.deepStrictEqual(called[31], {
        current: 32000,
        percent: 97.65625,
        total: 32768
      })
      assert.strictEqual(data.toString('hex'), f.result)
    })
  })
  describe('handle bad options', function () {
    it('rejects N that is too low', function () {
      assert.throws(function () {
        scrypt('nothing', 'nothing', -1)
      }, /N must be > 0 and a power of 2/)
    })
    it('rejects N that is not a power of 2', function () {
      assert.throws(function () {
        scrypt('nothing', 'nothing', 3)
      }, /N must be > 0 and a power of 2/)
    })
    it('rejects N that too large', function () {
      assert.throws(function () {
        scrypt('nothing', 'nothing', 0x80000000 * 256, 1)
      }, /Parameter N is too large/)
    })
    it('rejects r that too large', function () {
      assert.throws(function () {
        scrypt('nothing', 'nothing', 4, 8, 0x80000000)
      }, /Parameter r is too large/)
    })
  })
})
