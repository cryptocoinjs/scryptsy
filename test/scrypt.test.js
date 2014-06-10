var scrypt = null;

scrypt = require('../').scrypt;
var terst = require('terst');

var fixtures = require('./fixtures/scrypt')

//some tests params from: https://github.com/barrysteyn/node-scrypt/blob/master/tests/scrypt-tests.js
//also: https://tools.ietf.org/html/draft-josefsson-scrypt-kdf-00
//note, that params are wrong on here https://tools.ietf.org/html/draft-josefsson-scrypt-kdf-00 see: 
// => https://twitter.com/dchest/status/247734446881640448

describe('scrypt', function() {
  describe('> when valid', function() {
    fixtures.valid.forEach(function(f) {
      if (f.skip) return //impractical to run most times
      it('should compute for ' + f.description, function() {
        var data = scrypt(f.key, f.salt, f.iterations, f.memory, f.parallel, f.keyLen)
        EQ (data.toString('hex'), f.result)
      })
    })
  })
})


