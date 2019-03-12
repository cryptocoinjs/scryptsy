const crypto = require('crypto')
const {
  checkAndInit,
  smix
} = require('./utils')

// N = Cpu cost, r = Memory cost, p = parallelization cost
function scrypt (key, salt, N, r, p, dkLen, progressCallback) {
  return new Promise(function (resolve, reject) {
    try {
      const {
        XY,
        V,
        B32,
        x,
        _X,
        B,
        tickCallback
      } = checkAndInit(key, salt, N, r, p, dkLen, progressCallback)

      const smixFunc = function (i, p, doneCallback) {
        if (i === p) {
          doneCallback(null, crypto.pbkdf2Sync(key, B, 1, dkLen, 'sha256'))
        } else {
          smix(B, i * 128 * r, r, N, V, XY, _X, B32, x, tickCallback)
          setImmediate(function () {
            smixFunc(i + 1, p, doneCallback)
          })
        }
      }

      const doneCallback = function (error, buffer) {
        if (error) return reject(error)
        else return resolve(buffer)
      }

      smixFunc(0, p, doneCallback)
    } catch (error) {
      return reject(error)
    }
  })
}

module.exports = scrypt
