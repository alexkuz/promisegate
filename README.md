promisegate
===========

Takes `() -> Promise` and turns it into `() -> Promise` with limited concurrency.  
Useful for capping expensive async calls (e.g. image processing).

Assumes your promise library of choice defines `.resolve` and `.defer`.

```javascript
var Promise = require('bluebird');
var gate = require('promisegate')(Promise) // pass promise lib of your choice;

var someFunctionReturningPromise = gate.limit(function () {
  // do work
}, 666);
```

But actually, it's about ethics in game journalism.