
var crypto = require("crypto");
var sha256 = require("./jssha256");

/**
 * Implementation of PBKDF2 (RFC2898).
 * 
 * @param secret_key
 *            Secret key to initialise MAC function.
 * @param S
 *            Salt.
 * @param c
 *            Iteration count.
 * @param DK
 *            Byte array that derived key will be placed in.
 * @param dkLen
 *            Intended length, in octets, of the derived key.
 * 
 * @throws Error
 */
function pbkdf2(passwd, S, c, DK, dkLen) {
  // fixed to 32
    var hLen = 32;
    
    if (dkLen > (Math.pow(2, 32) - 1) * hLen) {
        throw Error("Requested key length too long");
    }

    var U      = [];
    var T      = [];
    var block1 = [];

    var l = Math.ceil(dkLen / hLen);
    var r = dkLen - (l - 1) * hLen;

    arraycopy(S, 0, block1, 0, S.length);
    for (var i = 1; i <= l; i++) {
        block1[S.length + 0] = (i >> 24 & 0xff);
        block1[S.length + 1] = (i >> 16 & 0xff);
        block1[S.length + 2] = (i >> 8  & 0xff);
        block1[S.length + 3] = (i >> 0  & 0xff);

        sha256.init(passwd);
        sha256.update(block1);
        U = sha256.finalize();
        
        arraycopy(U, 0, T, 0, hLen);

        for (var j = 1; j < c; j++) {
            sha256.update(U);
            U = sha256.finalize();

            for (var k = 0; k < hLen; k++) {
                T[k] ^= U[k];
            }
        }

        arraycopy(T, 0, DK, (i - 1) * hLen, (i == l ? r : hLen));
    }
}


function arraycopy(src, srcPos, dest, destPos, length) {
   while (length--){
     dest[destPos++] = src[srcPos++];
   }  
}


module.exports = pbkdf2;