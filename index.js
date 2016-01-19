var fs = require('fs');

function Version (current) {
  var parsed = current.split('.');
  if (parsed.length !== 3) throw Error('Invalid version format, please use major.minor.patch notation.');

  this.version = current;
  this.parsed = {
    major: +parsed[0],
    minor: +parsed[1],
    patch: +parsed[2]
  };
}

function parse (versionObj) {
  return versionObj.major + '.' + versionObj.minor + '.' + versionObj.patch;
}

Version.prototype.increment = Version.prototype.bump = function (type) {
  if (!type) throw Error('No type specified, choose major, minor or patch');
  this.parsed[type]++;
  this.version = parse(this.parsed);
  return this;
};

Version.prototype.decrement = function (type) {
  if (!type) throw Error('No type specified, choose major, minor or patch');
  this.parsed[type]--;
  this.version = parse(this.parsed);
  return this;
};

Version.prototype.write = function (pkg, cb) {
  cb = cb || function () {};
  var toWrite = require(pkg);
  toWrite.version = this.version;
  fs.writeFile(pkg, JSON.stringify(toWrite, null, 2), function (err) {
    if (err) throw Error('Couldnt write to package.json for some reason.');
    cb();
  });
  return this;
};

exports = module.exports = Version;
