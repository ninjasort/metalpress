'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readFile = exports.loadJsOrYaml = exports.fileExists = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import fse from 'fs-extra';
// import temp from 'temp';
// import denodeify from 'denodeify';

var rootPath = process.cwd();
// const mkdir    = denodeify(fs.mkdir);
// const mkTmpDir = denodeify(temp.mkdir);

/*
 Node deprecated existsSync so this is a simple
 helper function wrapping try/catch around the new
 recommended approach of accessSync
 https://nodejs.org/api/fs.html#fs_fs_existssync_path
 */
var fileExists = exports.fileExists = function fileExists(filename) {
  try {
    _fs2.default.accessSync(filename);
    return true;
  } catch (e) {
    if (e.code === 'ENOENT') {
      return false;
    } else {
      throw e;
    }
  }
};

var loadJsOrYaml = exports.loadJsOrYaml = function loadJsOrYaml(string) {
  var metadata = {};
  if (string.indexOf('yaml') !== -1) {
    metadata = _jsYaml2.default.safeLoad(_fs2.default.readFileSync(string, 'utf8'));
  } else if (string.indexOf('json') !== -1) {
    metadata = JSON.parse(_fs2.default.readFileSync(string, 'utf8'));
  }
  return metadata;
};

var readFile = exports.readFile = function readFile(filename) {
  var filePath = _path2.default.join(rootPath, filename);
  return _fs2.default.readFileSync(filePath, 'utf8');
};