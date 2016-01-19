# version-manage
Manage semantic versioned versions, version 0.1.0

### How to use

It's really simple, version manage has 3 methods (which can be chained)

##### Initialising

``` javascript
var VersionManager = require('version-manage');
var packageJson = require('./package.json');
var Manager = VersionManager(packageJson.version);
```

##### Manager.version

Returns the current version as a string. This will update after every `.increment()` and `.decrement()`.

``` javascript
var Manager = VersionManager(packageJson.version);
console.log(Manager.version); // 0.1.0
```

##### Manager.increment(type)

You can increment by calling `Manager.increment(type)` where type is
* major (THIS.x.x)
* minor (x.THIS.x)
* patch (x.x.THIS)

``` javascript
console.log(Manager.version) // 1.0.0
Manager.increment('patch');
console.log(Manager.version) // 1.0.1
```

*PROTIP: `Manager.bump(type)` is an alias for increment*.

##### Manager.decrement(type)
You can increment by calling `Manager.decrement(type)` where type is
* major (THIS.x.x)
* minor (x.THIS.x)
* patch (x.x.THIS)

``` javascript
console.log(Manager.version) // 5.7.2
Manager.decrement('major');
console.log(Manager.version) // 4.7.2
```

##### Manager.write(path, callback)
You can write to your package.json by specifying the package.json path and an optional callback

``` javascript
console.log(Manager.version) // 1.3.0
Manager.increment('patch'); // 1.3.1
Manager.write('./package.json', function () { console.log('Success!'); });
```

Or you can chain them:

``` javascript
Manager.increment('patch').write('./package.json');
```
