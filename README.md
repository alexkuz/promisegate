promisegate
===========

Takes `(args...) -> Promise` and turns it into `(args...) -> Promise` with limited concurrency.  
Useful for capping expensive async calls (e.g. image processing).  
Arguments are proxied to the wrapped function.

Assumes your promise library of choice defines `.resolve`, `.defer` and `.finally`.

```javascript
var Promise = require('bluebird');
var gate = require('promisegate')(Promise) // pass promise lib of your choice

var someFunctionReturningPromise = gate.limit(function () {
  // do work
}, 666);
```

But actually, it's about ethics in game journalism.
