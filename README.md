scryptsy
========

`scryptsy` is a pure JavaScript implementation of the [scrypt][wiki] key deriviation function that is fully compatible with Node.js and the browser (via Browserify). 


Why?
----

`Scrypt` is an integral part of many crypto currencies. It's a part of the [BIP38](https://github.com/bitcoin/bips/blob/master/bip-0038.mediawiki) standard for encrypting private Bitcoin keys. It also serves as the [proof-of-work system](http://en.wikipedia.org/wiki/Proof-of-work_system) for many crypto currencies, most notably: Litecoin and Dogecoin.

Why didn't I just the predominant pure JavaScript imlementation found [here](https://github.com/cheongwy/node-scrypt-js)? Because it's riddled with bugs, contains no tests, and is a transliteration of the Java version. i.e. it's neither Node.js optimized nor browser optimized. Required optimizations: [Buffer](http://nodejs.org/api/buffer.html) in Node.js and [type arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) in the browser.



Usage
-----

### Installation

    npm install --save scryptsy


### Example

```js
var scrypt = require('scryptsy').scrypt;

var key = "pleaseletmein";
var salt = "SodiumChloride";
var data = scrypt(key, salt, 16384, 8, 1, 64);
console.log(data.toString('hex')) 
// => 7023bdcb3afd7348461c06cd81fd38ebfda8fbba904f8e3ea9b543f6545da1f2d5432955613f0fcf62d49705242a9af9e61e85dc0d651e40dfcf017b45575887
```

### Bundling for the Browser

To use in the browser, clone the repo and then download [Browserify](https://github.com/substack/node-browserify):

    npm install -g browserify

run:

    browserify --standalone pbdkf2 < lib/pbkdf2.js > pbdkf2.bundle.js

then include `pbdkf2.bundle.js` in your `<script>` tag in your html. 


### Testing

If you want to test the algorithm, clone the git repo. Then run `npm install --development` to install all of the dependencies.

#### Node.js

run:

    make test-node

### Browser

run:

    make test-browser


Resources
---------
- [Tarsnap Blurb on Scrypt][tarsnap]
- [node-scrypt](https://github.com/barrysteyn/node-scrypt) A Node.js wrapper for the C++ scrypt utility
- [Scrypt Whitepaper](http://www.tarsnap.com/scrypt/scrypt.pdf)
- [IETF Scrypt](https://tools.ietf.org/html/draft-josefsson-scrypt-kdf-00) (Test vector params are [incorrect](https://twitter.com/dchest/status/247734446881640448).)


Credits
-------

This code was modified from the code found here https://github.com/cheongwy/node-scrypt-js which was based on https://github.com/wg/scrypt.


License
-------

MIT License

Copyright (c) 2014, JP Richardson Copyright (c) 2010-2011 Intalio Pte, All Rights Reserved

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


[wiki]: http://en.wikipedia.org/wiki/Scrypt
[tarsnap]: http://www.tarsnap.com/scrypt.html