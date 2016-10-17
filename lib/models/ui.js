'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _os = require('os');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _elegantSpinner = require('elegant-spinner');

var _elegantSpinner2 = _interopRequireDefault(_elegantSpinner);

var _logUpdate = require('log-update');

var _logUpdate2 = _interopRequireDefault(_logUpdate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var frame = (0, _elegantSpinner2.default)();
var DEFAULT_WRITE_LEVEL = 'INFO';
var WRITE_LEVELS = {
  'DEBUG': 1,
  'INFO': 2,
  'WARNING': 3,
  'ERROR': 4
};

var UI = function () {
  function UI() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, UI);

    this.inputStream = options.inputStream || process.stdin;
    this.outputStream = options.outputStream || process.stdout;
    this.errorStream = options.errorStream || process.stderr;

    this.writeLevel = options.writeLevel || DEFAULT_WRITE_LEVEL;
    this.streaming = false;
  }

  _createClass(UI, [{
    key: 'write',
    value: function write(data, writeLevel) {
      if (writeLevel === 'ERROR') {
        this.errorStream.write(data);
      } else if (this.writeLevelVisible(writeLevel)) {
        this.outputStream.write(data);
      }
    }
  }, {
    key: 'writeLine',
    value: function writeLine(text, writeLevel) {
      this.write(text + _os.EOL, writeLevel);
    }
  }, {
    key: 'writeInfo',
    value: function writeInfo(text) {
      var content = _chalk2.default.blue('  info: ') + _chalk2.default.white(text);
      this.writeLine(content, 'INFO');
    }
  }, {
    key: 'writeDebug',
    value: function writeDebug(text) {
      var content = _chalk2.default.gray('  debug: ') + _chalk2.default.white(text);
      this.writeLine(content, 'DEBUG');
    }
  }, {
    key: 'writeError',
    value: function writeError(text) {
      var content = _chalk2.default.red('  error: ') + _chalk2.default.white(text);
      this.writeLine(content, 'ERROR');
    }
  }, {
    key: 'writeWarning',
    value: function writeWarning(text) {
      var content = _chalk2.default.yellow('  warning: ') + _chalk2.default.white(text);
      this.writeLine(content, 'WARNING');
    }
  }, {
    key: 'writeCreate',
    value: function writeCreate(text) {
      var content = _chalk2.default.green('  create: ') + _chalk2.default.white(text);
      this.writeLine(content, 'INFO');
    }
  }, {
    key: 'writeWouldCreate',
    value: function writeWouldCreate(text) {
      var content = _chalk2.default.green('  would create: ') + _chalk2.default.white(text);
      this.writeLine(content, 'INFO');
    }
  }, {
    key: 'writeLevelVisible',
    value: function writeLevelVisible() {
      var writeLevel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_WRITE_LEVEL;

      return WRITE_LEVELS[writeLevel] >= WRITE_LEVELS[this.writeLevel];
    }
  }, {
    key: 'setWriteLevel',
    value: function setWriteLevel(newLevel) {
      var allowedLevels = Object.keys(WRITE_LEVELS);
      if (allowedLevels.indexOf(newLevel) === -1) {
        throw new Error('Unknown write level. Valid values are: ' + allowedLevels.join(', '));
      }

      this.writeLevel = newLevel;
    }
  }, {
    key: 'startProgress',
    value: function startProgress(string, customStream) {
      var stream = customStream || _logUpdate2.default.create(this.outputStream);
      if (this.writeLevelVisible(this.writeLevel)) {
        this.streaming = true;
        this.progressInterval = setInterval(function () {
          stream('  ' + _chalk2.default.green('loading:') + ' ' + string + ' ' + _chalk2.default.cyan.bold.dim(frame()));
        }, 100);
      }
    }
  }, {
    key: 'stopProgress',
    value: function stopProgress() {
      if (this.progressInterval) {
        this.streaming = false;
        clearInterval(this.progressInterval);
      }
    }
  }]);

  return UI;
}();

exports.default = UI;