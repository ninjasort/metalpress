'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadJsOrYaml = undefined;
exports._fixPaginationQuirk = _fixPaginationQuirk;
exports._fixPaginationObject = _fixPaginationObject;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// var loadDataFiles = () => {
//   try {
//     var files = fs.readdirSync(path.resolve(config.basePath, './src/data'));
//     var dataFiles = {};
//     files.map((file) => {
//       dataFiles[file.split(path.extname(file))[0]] = `data/${file}`;
//     });
//     return dataFiles;
//   } catch(e) {
//     return {};
//   }
// };
// 
var loadJsOrYaml = exports.loadJsOrYaml = function loadJsOrYaml(string) {
  var metadata = {};
  if (string.indexOf('yaml') !== -1) {
    metadata = _jsYaml2.default.safeLoad(_fs2.default.readFileSync(string, 'utf8'));
  } else if (string.indexOf('json') !== -1) {
    metadata = JSON.parse(_fs2.default.readFileSync(string, 'utf8'));
  }
  return metadata;
};

function _fixPaginationQuirk(config) {
  try {
    for (var collection in config.pagination) {
      // check every pagination collection and load metadata into the original key
      if (typeof config.pagination[collection].pageMetadata !== 'string') {
        break;
      }
      var metadata = _path2.default.resolve(config.basePath, './src', config.pagination[collection].pageMetadata);
      config.pagination[collection].pageMetadata = loadJsOrYaml(metadata);
    }
  } catch (e) {
    console.log('could not resolve pagination metadata', e);
  }
}

function _fixPaginationObject(config) {
  return function (files, m, done) {
    for (var file in files) {
      if (files[file].pagination) {
        if (files[file].collection && files[file].collection.length) {
          var collection = files[file].collection[0];
          var layout = config.pagination['collections.' + collection].layout;
          if (config.pagination['collections.' + collection].pageMetadata && config.pagination['collections.' + collection].pageMetadata.title) {
            files[file].title = config.pagination['collections.' + collection].pageMetadata.title;
          }
          files[file].layout = layout;
        }
      }
    }
    done();
  };
}