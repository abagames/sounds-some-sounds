var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.sss = {}));
})(this, function(exports2) {
  "use strict";
  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
  }
  var lib = { exports: {} };
  var Syntax$2 = {
    Note: "Note",
    Rest: "Rest",
    Octave: "Octave",
    OctaveShift: "OctaveShift",
    NoteLength: "NoteLength",
    NoteVelocity: "NoteVelocity",
    NoteQuantize: "NoteQuantize",
    Tempo: "Tempo",
    InfiniteLoop: "InfiniteLoop",
    LoopBegin: "LoopBegin",
    LoopExit: "LoopExit",
    LoopEnd: "LoopEnd"
  };
  var DefaultParams$1 = {
    tempo: 120,
    octave: 4,
    length: 4,
    velocity: 100,
    quantize: 75,
    loopCount: 2
  };
  var _createClass$2 = function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  function _classCallCheck$2(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var Scanner$1 = function() {
    function Scanner2(source) {
      _classCallCheck$2(this, Scanner2);
      this.source = source;
      this.index = 0;
    }
    _createClass$2(Scanner2, [{
      key: "hasNext",
      value: function hasNext() {
        return this.index < this.source.length;
      }
    }, {
      key: "peek",
      value: function peek() {
        return this.source.charAt(this.index) || "";
      }
    }, {
      key: "next",
      value: function next() {
        return this.source.charAt(this.index++) || "";
      }
    }, {
      key: "forward",
      value: function forward() {
        while (this.hasNext() && this.match(/\s/)) {
          this.index += 1;
        }
      }
    }, {
      key: "match",
      value: function match(matcher) {
        if (matcher instanceof RegExp) {
          return matcher.test(this.peek());
        }
        return this.peek() === matcher;
      }
    }, {
      key: "expect",
      value: function expect(matcher) {
        if (!this.match(matcher)) {
          this.throwUnexpectedToken();
        }
        this.index += 1;
      }
    }, {
      key: "scan",
      value: function scan(matcher) {
        var target = this.source.substr(this.index);
        var result = null;
        if (matcher instanceof RegExp) {
          var matched = matcher.exec(target);
          if (matched && matched.index === 0) {
            result = matched[0];
          }
        } else if (target.substr(0, matcher.length) === matcher) {
          result = matcher;
        }
        if (result) {
          this.index += result.length;
        }
        return result;
      }
    }, {
      key: "throwUnexpectedToken",
      value: function throwUnexpectedToken() {
        var identifier = this.peek() || "ILLEGAL";
        throw new SyntaxError("Unexpected token: " + identifier);
      }
    }]);
    return Scanner2;
  }();
  var Scanner_1 = Scanner$1;
  var _createClass$1 = function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  function _classCallCheck$1(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var Syntax$1 = Syntax$2;
  var Scanner = Scanner_1;
  var NOTE_INDEXES = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 };
  var MMLParser$1 = function() {
    function MMLParser2(source) {
      _classCallCheck$1(this, MMLParser2);
      this.scanner = new Scanner(source);
    }
    _createClass$1(MMLParser2, [{
      key: "parse",
      value: function parse2() {
        var _this = this;
        var result = [];
        this._readUntil(";", function() {
          result = result.concat(_this.advance());
        });
        return result;
      }
    }, {
      key: "advance",
      value: function advance() {
        switch (this.scanner.peek()) {
          case "c":
          case "d":
          case "e":
          case "f":
          case "g":
          case "a":
          case "b":
            return this.readNote();
          case "[":
            return this.readChord();
          case "r":
            return this.readRest();
          case "o":
            return this.readOctave();
          case ">":
            return this.readOctaveShift(1);
          case "<":
            return this.readOctaveShift(-1);
          case "l":
            return this.readNoteLength();
          case "q":
            return this.readNoteQuantize();
          case "v":
            return this.readNoteVelocity();
          case "t":
            return this.readTempo();
          case "$":
            return this.readInfiniteLoop();
          case "/":
            return this.readLoop();
        }
        this.scanner.throwUnexpectedToken();
      }
    }, {
      key: "readNote",
      value: function readNote() {
        return {
          type: Syntax$1.Note,
          noteNumbers: [this._readNoteNumber(0)],
          noteLength: this._readLength()
        };
      }
    }, {
      key: "readChord",
      value: function readChord() {
        var _this2 = this;
        this.scanner.expect("[");
        var noteList = [];
        var offset = 0;
        this._readUntil("]", function() {
          switch (_this2.scanner.peek()) {
            case "c":
            case "d":
            case "e":
            case "f":
            case "g":
            case "a":
            case "b":
              noteList.push(_this2._readNoteNumber(offset));
              break;
            case ">":
              _this2.scanner.next();
              offset += 12;
              break;
            case "<":
              _this2.scanner.next();
              offset -= 12;
              break;
            default:
              _this2.scanner.throwUnexpectedToken();
          }
        });
        this.scanner.expect("]");
        return {
          type: Syntax$1.Note,
          noteNumbers: noteList,
          noteLength: this._readLength()
        };
      }
    }, {
      key: "readRest",
      value: function readRest() {
        this.scanner.expect("r");
        return {
          type: Syntax$1.Rest,
          noteLength: this._readLength()
        };
      }
    }, {
      key: "readOctave",
      value: function readOctave() {
        this.scanner.expect("o");
        return {
          type: Syntax$1.Octave,
          value: this._readArgument(/\d+/)
        };
      }
    }, {
      key: "readOctaveShift",
      value: function readOctaveShift(direction) {
        this.scanner.expect(/<|>/);
        return {
          type: Syntax$1.OctaveShift,
          direction: direction | 0,
          value: this._readArgument(/\d+/)
        };
      }
    }, {
      key: "readNoteLength",
      value: function readNoteLength() {
        this.scanner.expect("l");
        return {
          type: Syntax$1.NoteLength,
          noteLength: this._readLength()
        };
      }
    }, {
      key: "readNoteQuantize",
      value: function readNoteQuantize() {
        this.scanner.expect("q");
        return {
          type: Syntax$1.NoteQuantize,
          value: this._readArgument(/\d+/)
        };
      }
    }, {
      key: "readNoteVelocity",
      value: function readNoteVelocity() {
        this.scanner.expect("v");
        return {
          type: Syntax$1.NoteVelocity,
          value: this._readArgument(/\d+/)
        };
      }
    }, {
      key: "readTempo",
      value: function readTempo() {
        this.scanner.expect("t");
        return {
          type: Syntax$1.Tempo,
          value: this._readArgument(/\d+(\.\d+)?/)
        };
      }
    }, {
      key: "readInfiniteLoop",
      value: function readInfiniteLoop() {
        this.scanner.expect("$");
        return {
          type: Syntax$1.InfiniteLoop
        };
      }
    }, {
      key: "readLoop",
      value: function readLoop() {
        var _this3 = this;
        this.scanner.expect("/");
        this.scanner.expect(":");
        var loopBegin = { type: Syntax$1.LoopBegin };
        var loopEnd = { type: Syntax$1.LoopEnd };
        var result = [];
        result = result.concat(loopBegin);
        this._readUntil(/[|:]/, function() {
          result = result.concat(_this3.advance());
        });
        result = result.concat(this._readLoopExit());
        this.scanner.expect(":");
        this.scanner.expect("/");
        loopBegin.value = this._readArgument(/\d+/) || null;
        result = result.concat(loopEnd);
        return result;
      }
    }, {
      key: "_readUntil",
      value: function _readUntil(matcher, callback) {
        while (this.scanner.hasNext()) {
          this.scanner.forward();
          if (!this.scanner.hasNext() || this.scanner.match(matcher)) {
            break;
          }
          callback();
        }
      }
    }, {
      key: "_readArgument",
      value: function _readArgument(matcher) {
        var num = this.scanner.scan(matcher);
        return num !== null ? +num : null;
      }
    }, {
      key: "_readNoteNumber",
      value: function _readNoteNumber(offset) {
        var noteIndex = NOTE_INDEXES[this.scanner.next()];
        return noteIndex + this._readAccidental() + offset;
      }
    }, {
      key: "_readAccidental",
      value: function _readAccidental() {
        if (this.scanner.match("+")) {
          return 1 * this.scanner.scan(/\++/).length;
        }
        if (this.scanner.match("-")) {
          return -1 * this.scanner.scan(/\-+/).length;
        }
        return 0;
      }
    }, {
      key: "_readDot",
      value: function _readDot() {
        var len = (this.scanner.scan(/\.+/) || "").length;
        var result = new Array(len);
        for (var i = 0; i < len; i++) {
          result[i] = 0;
        }
        return result;
      }
    }, {
      key: "_readLength",
      value: function _readLength() {
        var result = [];
        result = result.concat(this._readArgument(/\d+/));
        result = result.concat(this._readDot());
        var tie = this._readTie();
        if (tie) {
          result = result.concat(tie);
        }
        return result;
      }
    }, {
      key: "_readTie",
      value: function _readTie() {
        this.scanner.forward();
        if (this.scanner.match("^")) {
          this.scanner.next();
          return this._readLength();
        }
        return null;
      }
    }, {
      key: "_readLoopExit",
      value: function _readLoopExit() {
        var _this4 = this;
        var result = [];
        if (this.scanner.match("|")) {
          this.scanner.next();
          var loopExit = { type: Syntax$1.LoopExit };
          result = result.concat(loopExit);
          this._readUntil(":", function() {
            result = result.concat(_this4.advance());
          });
        }
        return result;
      }
    }]);
    return MMLParser2;
  }();
  var MMLParser_1 = MMLParser$1;
  var _createClass = function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var Syntax = Syntax$2;
  var DefaultParams = DefaultParams$1;
  var MMLParser = MMLParser_1;
  var ITERATOR = typeof Symbol !== "undefined" ? Symbol.iterator : "@@iterator";
  var MMLIterator$1 = function() {
    function MMLIterator2(source) {
      _classCallCheck(this, MMLIterator2);
      this.source = source;
      this._commands = new MMLParser(source).parse();
      this._commandIndex = 0;
      this._processedTime = 0;
      this._iterator = null;
      this._octave = DefaultParams.octave;
      this._noteLength = [DefaultParams.length];
      this._velocity = DefaultParams.velocity;
      this._quantize = DefaultParams.quantize;
      this._tempo = DefaultParams.tempo;
      this._infiniteLoopIndex = -1;
      this._loopStack = [];
      this._done = false;
    }
    _createClass(MMLIterator2, [{
      key: "hasNext",
      value: function hasNext() {
        return this._commandIndex < this._commands.length;
      }
    }, {
      key: "next",
      value: function next() {
        if (this._done) {
          return { done: true, value: null };
        }
        if (this._iterator) {
          var iterItem = this._iterator.next();
          if (!iterItem.done) {
            return iterItem;
          }
        }
        var command = this._forward(true);
        if (isNoteEvent(command)) {
          this._iterator = this[command.type](command);
        } else {
          this._done = true;
          return { done: false, value: { type: "end", time: this._processedTime } };
        }
        return this.next();
      }
    }, {
      key: ITERATOR,
      value: function value() {
        return this;
      }
    }, {
      key: "_forward",
      value: function _forward(forward) {
        while (this.hasNext() && !isNoteEvent(this._commands[this._commandIndex])) {
          var command = this._commands[this._commandIndex++];
          this[command.type](command);
        }
        if (forward && !this.hasNext() && this._infiniteLoopIndex !== -1) {
          this._commandIndex = this._infiniteLoopIndex;
          return this._forward(false);
        }
        return this._commands[this._commandIndex++] || {};
      }
    }, {
      key: "_calcDuration",
      value: function _calcDuration(noteLength) {
        var _this = this;
        if (noteLength[0] === null) {
          noteLength = this._noteLength.concat(noteLength.slice(1));
        }
        var prev = null;
        var dotted = 0;
        noteLength = noteLength.map(function(elem) {
          switch (elem) {
            case null:
              elem = prev;
              break;
            case 0:
              elem = dotted *= 2;
              break;
            default:
              prev = dotted = elem;
              break;
          }
          var length = elem !== null ? elem : DefaultParams.length;
          return 60 / _this._tempo * (4 / length);
        });
        return noteLength.reduce(function(a, b) {
          return a + b;
        }, 0);
      }
    }, {
      key: "_calcNoteNumber",
      value: function _calcNoteNumber(noteNumber) {
        return noteNumber + this._octave * 12 + 12;
      }
    }, {
      key: Syntax.Note,
      value: function value(command) {
        var _this2 = this;
        var type = "note";
        var time = this._processedTime;
        var duration = this._calcDuration(command.noteLength);
        var noteNumbers = command.noteNumbers.map(function(noteNumber) {
          return _this2._calcNoteNumber(noteNumber);
        });
        var quantize2 = this._quantize;
        var velocity = this._velocity;
        this._processedTime = this._processedTime + duration;
        return arrayToIterator(noteNumbers.map(function(noteNumber) {
          return { type, time, duration, noteNumber, velocity, quantize: quantize2 };
        }));
      }
    }, {
      key: Syntax.Rest,
      value: function value(command) {
        var duration = this._calcDuration(command.noteLength);
        this._processedTime = this._processedTime + duration;
      }
    }, {
      key: Syntax.Octave,
      value: function value(command) {
        this._octave = command.value !== null ? command.value : DefaultParams.octave;
      }
    }, {
      key: Syntax.OctaveShift,
      value: function value(command) {
        var value2 = command.value !== null ? command.value : 1;
        this._octave += value2 * command.direction;
      }
    }, {
      key: Syntax.NoteLength,
      value: function value(command) {
        var noteLength = command.noteLength.map(function(value2) {
          return value2 !== null ? value2 : DefaultParams.length;
        });
        this._noteLength = noteLength;
      }
    }, {
      key: Syntax.NoteVelocity,
      value: function value(command) {
        this._velocity = command.value !== null ? command.value : DefaultParams.velocity;
      }
    }, {
      key: Syntax.NoteQuantize,
      value: function value(command) {
        this._quantize = command.value !== null ? command.value : DefaultParams.quantize;
      }
    }, {
      key: Syntax.Tempo,
      value: function value(command) {
        this._tempo = command.value !== null ? command.value : DefaultParams.tempo;
      }
    }, {
      key: Syntax.InfiniteLoop,
      value: function value() {
        this._infiniteLoopIndex = this._commandIndex;
      }
    }, {
      key: Syntax.LoopBegin,
      value: function value(command) {
        var loopCount = command.value !== null ? command.value : DefaultParams.loopCount;
        var loopTopIndex = this._commandIndex;
        var loopOutIndex = -1;
        this._loopStack.push({ loopCount, loopTopIndex, loopOutIndex });
      }
    }, {
      key: Syntax.LoopExit,
      value: function value() {
        var looper = this._loopStack[this._loopStack.length - 1];
        var index2 = this._commandIndex;
        if (looper.loopCount <= 1 && looper.loopOutIndex !== -1) {
          index2 = looper.loopOutIndex;
        }
        this._commandIndex = index2;
      }
    }, {
      key: Syntax.LoopEnd,
      value: function value() {
        var looper = this._loopStack[this._loopStack.length - 1];
        var index2 = this._commandIndex;
        if (looper.loopOutIndex === -1) {
          looper.loopOutIndex = this._commandIndex;
        }
        looper.loopCount -= 1;
        if (0 < looper.loopCount) {
          index2 = looper.loopTopIndex;
        } else {
          this._loopStack.pop();
        }
        this._commandIndex = index2;
      }
    }]);
    return MMLIterator2;
  }();
  function arrayToIterator(array) {
    var index2 = 0;
    return {
      next: function next() {
        if (index2 < array.length) {
          return { done: false, value: array[index2++] };
        }
        return { done: true };
      }
    };
  }
  function isNoteEvent(command) {
    return command.type === Syntax.Note || command.type === Syntax.Rest;
  }
  var MMLIterator_1 = MMLIterator$1;
  (function(module2) {
    module2.exports = MMLIterator_1;
  })(lib);
  const MMLIterator = /* @__PURE__ */ getDefaultExportFromCjs(lib.exports);
  var jsfx = {};
  (function(jsfx2) {
    var TAU = +Math.PI * 2;
    var bitsPerSample = 16 | 0;
    var numChannels = 1 | 0;
    var sin = Math.sin;
    var pow = Math.pow;
    var abs = Math.abs;
    var EPSILON = 1e-6;
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    jsfx2.SampleRate = 0 | 0;
    jsfx2.Sec = 0 | 0;
    jsfx2.SetSampleRate = function(sampleRate) {
      jsfx2.SampleRate = sampleRate | 0;
      jsfx2.Sec = sampleRate | 0;
    };
    jsfx2.SetSampleRate(getDefaultSampleRate());
    jsfx2.Live = function() {
      var player = {};
      player._generate = function(params) {
        var processor = new Processor(params, jsfx2.DefaultModules);
        var block = createFloatArray(processor.getSamplesLeft());
        processor.generate(block);
        return block;
      };
      return player;
    };
    jsfx2.Module = {};
    jsfx2.G = {};
    var stage = jsfx2.stage = {
      PhaseSpeed: 0,
      PhaseSpeedMod: 10,
      Generator: 20,
      SampleMod: 30,
      Volume: 40
    };
    function byStage(a, b) {
      return a.stage - b.stage;
    }
    jsfx2.InitDefaultParams = InitDefaultParams;
    function InitDefaultParams(params, modules) {
      for (var i = 0; i < modules.length; i += 1) {
        var M = modules[i];
        var P = params[M.name] || {};
        map_object(M.params, function(def, name2) {
          if (typeof P[name2] === "undefined") {
            P[name2] = def.D;
          }
        });
        params[M.name] = P;
      }
    }
    jsfx2.Processor = Processor;
    function Processor(params, modules) {
      params = params || {};
      modules = modules || jsfx2.DefaultModules;
      if (typeof params === "function") {
        params = params();
      } else {
        params = JSON.parse(JSON.stringify(params));
      }
      this.finished = false;
      this.state = {
        SampleRate: params.SampleRate || jsfx2.SampleRate
      };
      modules = modules.slice();
      modules.sort(byStage);
      this.modules = modules;
      InitDefaultParams(params, modules);
      for (var i = 0; i < this.modules.length; i += 1) {
        var M = this.modules[i];
        this.modules[i].setup(this.state, params[M.name]);
      }
    }
    Processor.prototype = {
      generate: function(block) {
        for (var i = 0 | 0; i < block.length; i += 1) {
          block[i] = 0;
        }
        if (this.finished) {
          return;
        }
        var $ = this.state, N = block.length | 0;
        for (var i = 0; i < this.modules.length; i += 1) {
          var M = this.modules[i];
          var n = M.process($, block.subarray(0, N)) | 0;
          N = Math.min(N, n);
        }
        if (N < block.length) {
          this.finished = true;
        }
        for (var i = N; i < block.length; i++) {
          block[i] = 0;
        }
      },
      getSamplesLeft: function() {
        var samples = 0;
        for (var i = 0; i < this.state.envelopes.length; i += 1) {
          samples += this.state.envelopes[i].N;
        }
        if (samples === 0) {
          samples = 3 * this.state.SampleRate;
        }
        return samples;
      }
    };
    jsfx2.Module.Frequency = {
      name: "Frequency",
      params: {
        Start: { L: 30, H: 1800, D: 440 },
        Min: { L: 30, H: 1800, D: 30 },
        Max: { L: 30, H: 1800, D: 1800 },
        Slide: { L: -1, H: 1, D: 0 },
        DeltaSlide: { L: -1, H: 1, D: 0 },
        RepeatSpeed: { L: 0, H: 3, D: 0 },
        ChangeAmount: { L: -12, H: 12, D: 0 },
        ChangeSpeed: { L: 0, H: 1, D: 0 }
      },
      stage: stage.PhaseSpeed,
      setup: function($, P) {
        var SR = $.SampleRate;
        $.phaseParams = P;
        $.phaseSpeed = P.Start * TAU / SR;
        $.phaseSpeedMax = P.Max * TAU / SR;
        $.phaseSpeedMin = P.Min * TAU / SR;
        $.phaseSpeedMin = Math.min($.phaseSpeedMin, $.phaseSpeed);
        $.phaseSpeedMax = Math.max($.phaseSpeedMax, $.phaseSpeed);
        $.phaseSlide = 1 + pow(P.Slide, 3) * 64 / SR;
        $.phaseDeltaSlide = pow(P.DeltaSlide, 3) / (SR * 1e3);
        $.repeatTime = 0;
        $.repeatLimit = Infinity;
        if (P.RepeatSpeed > 0) {
          $.repeatLimit = P.RepeatSpeed * SR;
        }
        $.arpeggiatorTime = 0;
        $.arpeggiatorLimit = P.ChangeSpeed * SR;
        if (P.ChangeAmount == 0) {
          $.arpeggiatorLimit = Infinity;
        }
        $.arpeggiatorMod = 1 + P.ChangeAmount / 12;
      },
      process: function($, block) {
        var speed = +$.phaseSpeed, min = +$.phaseSpeedMin, max = +$.phaseSpeedMax, slide = +$.phaseSlide, deltaSlide = +$.phaseDeltaSlide;
        var repeatTime = $.repeatTime, repeatLimit = $.repeatLimit;
        var arpTime = $.arpeggiatorTime, arpLimit = $.arpeggiatorLimit, arpMod = $.arpeggiatorMod;
        for (var i = 0; i < block.length; i++) {
          slide += deltaSlide;
          speed *= slide;
          speed = speed < min ? min : speed > max ? max : speed;
          if (repeatTime > repeatLimit) {
            this.setup($, $.phaseParams);
            return i + this.process($, block.subarray(i)) - 1;
          }
          repeatTime++;
          if (arpTime > arpLimit) {
            speed *= arpMod;
            arpTime = 0;
            arpLimit = Infinity;
          }
          arpTime++;
          block[i] += speed;
        }
        $.repeatTime = repeatTime;
        $.arpeggiatorTime = arpTime;
        $.arpeggiatorLimit = arpLimit;
        $.phaseSpeed = speed;
        $.phaseSlide = slide;
        return block.length;
      }
    };
    jsfx2.Module.Vibrato = {
      name: "Vibrato",
      params: {
        Depth: { L: 0, H: 1, D: 0 },
        DepthSlide: { L: -1, H: 1, D: 0 },
        Frequency: { L: 0.01, H: 48, D: 0 },
        FrequencySlide: { L: -1, H: 1, D: 0 }
      },
      stage: stage.PhaseSpeedMod,
      setup: function($, P) {
        var SR = $.SampleRate;
        $.vibratoPhase = 0;
        $.vibratoDepth = P.Depth;
        $.vibratoPhaseSpeed = P.Frequency * TAU / SR;
        $.vibratoPhaseSpeedSlide = 1 + pow(P.FrequencySlide, 3) * 3 / SR;
        $.vibratoDepthSlide = P.DepthSlide / SR;
      },
      process: function($, block) {
        var phase = +$.vibratoPhase, depth = +$.vibratoDepth, speed = +$.vibratoPhaseSpeed, slide = +$.vibratoPhaseSpeedSlide, depthSlide = +$.vibratoDepthSlide;
        if (depth == 0 && depthSlide <= 0) {
          return block.length;
        }
        for (var i = 0; i < block.length; i++) {
          phase += speed;
          if (phase > TAU) {
            phase -= TAU;
          }
          block[i] += block[i] * sin(phase) * depth;
          speed *= slide;
          depth += depthSlide;
          depth = clamp1(depth);
        }
        $.vibratoPhase = phase;
        $.vibratoDepth = depth;
        $.vibratoPhaseSpeed = speed;
        return block.length;
      }
    };
    jsfx2.Module.Generator = {
      name: "Generator",
      params: {
        Func: { C: jsfx2.G, D: "square" },
        A: { L: 0, H: 1, D: 0 },
        B: { L: 0, H: 1, D: 0 },
        ASlide: { L: -1, H: 1, D: 0 },
        BSlide: { L: -1, H: 1, D: 0 }
      },
      stage: stage.Generator,
      setup: function($, P) {
        $.generatorPhase = 0;
        if (typeof P.Func === "string") {
          $.generator = jsfx2.G[P.Func];
        } else {
          $.generator = P.Func;
        }
        if (typeof $.generator === "object") {
          $.generator = $.generator.create();
        }
        assert(typeof $.generator === "function", "generator must be a function");
        $.generatorA = P.A;
        $.generatorASlide = P.ASlide;
        $.generatorB = P.B;
        $.generatorBSlide = P.BSlide;
      },
      process: function($, block) {
        return $.generator($, block);
      }
    };
    var GuitarBufferSize = 1 << 16;
    jsfx2.Module.Guitar = {
      name: "Guitar",
      params: {
        A: { L: 0, H: 1, D: 1 },
        B: { L: 0, H: 1, D: 1 },
        C: { L: 0, H: 1, D: 1 }
      },
      stage: stage.Generator,
      setup: function($, P) {
        $.guitarA = P.A;
        $.guitarB = P.B;
        $.guitarC = P.C;
        $.guitarBuffer = createFloatArray(GuitarBufferSize);
        $.guitarHead = 0;
        var B = $.guitarBuffer;
        for (var i = 0; i < B.length; i++) {
          B[i] = random2() * 2 - 1;
        }
      },
      process: function($, block) {
        var BS = GuitarBufferSize, BM = BS - 1;
        var A = +$.guitarA, B = +$.guitarB, C = +$.guitarC;
        var T = A + B + C;
        var h = $.guitarHead;
        var buffer = $.guitarBuffer;
        for (var i = 0; i < block.length; i++) {
          var n = TAU / block[i] | 0;
          n = n > BS ? BS : n;
          var t = h - n + BS & BM;
          buffer[h] = (buffer[t - 0 + BS & BM] * A + buffer[t - 1 + BS & BM] * B + buffer[t - 2 + BS & BM] * C) / T;
          block[i] = buffer[h];
          h = h + 1 & BM;
        }
        $.guitarHead = h;
        return block.length;
      }
    };
    jsfx2.Module.Filter = {
      name: "Filter",
      params: {
        LP: { L: 0, H: 1, D: 1 },
        LPSlide: { L: -1, H: 1, D: 0 },
        LPResonance: { L: 0, H: 1, D: 0 },
        HP: { L: 0, H: 1, D: 0 },
        HPSlide: { L: -1, H: 1, D: 0 }
      },
      stage: stage.SampleMod + 0,
      setup: function($, P) {
        $.FilterEnabled = P.HP > EPSILON || P.LP < 1 - EPSILON;
        $.LPEnabled = P.LP < 1 - EPSILON;
        $.LP = pow(P.LP, 3) / 10;
        $.LPSlide = 1 + P.LPSlide * 100 / $.SampleRate;
        $.LPPos = 0;
        $.LPPosSlide = 0;
        $.LPDamping = 5 / (1 + pow(P.LPResonance, 2) * 20) * (0.01 + P.LP);
        $.LPDamping = 1 - Math.min($.LPDamping, 0.8);
        $.HP = pow(P.HP, 2) / 10;
        $.HPPos = 0;
        $.HPSlide = 1 + P.HPSlide * 100 / $.SampleRate;
      },
      enabled: function($) {
        return $.FilterEnabled;
      },
      process: function($, block) {
        if (!this.enabled($)) {
          return block.length;
        }
        var lp = +$.LP;
        var lpPos = +$.LPPos;
        var lpPosSlide = +$.LPPosSlide;
        var lpSlide = +$.LPSlide;
        var lpDamping = +$.LPDamping;
        var lpEnabled = +$.LPEnabled;
        var hp = +$.HP;
        var hpPos = +$.HPPos;
        var hpSlide = +$.HPSlide;
        for (var i = 0; i < block.length; i++) {
          if (hp > EPSILON || hp < -EPSILON) {
            hp *= hpSlide;
            hp = hp < EPSILON ? EPSILON : hp > 0.1 ? 0.1 : hp;
          }
          var lpPos_ = lpPos;
          lp *= lpSlide;
          lp = lp < 0 ? lp = 0 : lp > 0.1 ? 0.1 : lp;
          var sample = block[i];
          if (lpEnabled) {
            lpPosSlide += (sample - lpPos) * lp;
            lpPosSlide *= lpDamping;
          } else {
            lpPos = sample;
            lpPosSlide = 0;
          }
          lpPos += lpPosSlide;
          hpPos += lpPos - lpPos_;
          hpPos *= 1 - hp;
          block[i] = hpPos;
        }
        $.LPPos = lpPos;
        $.LPPosSlide = lpPosSlide;
        $.LP = lp;
        $.HP = hp;
        $.HPPos = hpPos;
        return block.length;
      }
    };
    var PhaserBufferSize = 1 << 10;
    jsfx2.Module.Phaser = {
      name: "Phaser",
      params: {
        Offset: { L: -1, H: 1, D: 0 },
        Sweep: { L: -1, H: 1, D: 0 }
      },
      stage: stage.SampleMod + 1,
      setup: function($, P) {
        $.phaserBuffer = createFloatArray(PhaserBufferSize);
        $.phaserPos = 0;
        $.phaserOffset = pow(P.Offset, 2) * (PhaserBufferSize - 4);
        $.phaserOffsetSlide = pow(P.Sweep, 3) * 4e3 / $.SampleRate;
      },
      enabled: function($) {
        return abs($.phaserOffsetSlide) > EPSILON || abs($.phaserOffset) > EPSILON;
      },
      process: function($, block) {
        if (!this.enabled($)) {
          return block.length;
        }
        var BS = PhaserBufferSize, BM = BS - 1;
        var buffer = $.phaserBuffer, pos = $.phaserPos | 0, offset = +$.phaserOffset, offsetSlide = +$.phaserOffsetSlide;
        for (var i = 0; i < block.length; i++) {
          offset += offsetSlide;
          if (offset < 0) {
            offset = -offset;
            offsetSlide = -offsetSlide;
          }
          if (offset > BM) {
            offset = BM;
            offsetSlide = 0;
          }
          buffer[pos] = block[i];
          var p = pos - (offset | 0) + BS & BM;
          block[i] += buffer[p];
          pos = pos + 1 & BM | 0;
        }
        $.phaserPos = pos;
        $.phaserOffset = offset;
        return block.length;
      }
    };
    jsfx2.Module.Volume = {
      name: "Volume",
      params: {
        Master: { L: 0, H: 1, D: 0.5 },
        Attack: { L: 1e-3, H: 1, D: 0.01 },
        Sustain: { L: 0, H: 2, D: 0.3 },
        Punch: { L: 0, H: 3, D: 1 },
        Decay: { L: 1e-3, H: 2, D: 1 }
      },
      stage: stage.Volume,
      setup: function($, P) {
        var SR = $.SampleRate;
        var V = P.Master;
        var VP = V * (1 + P.Punch);
        $.envelopes = [
          { S: 0, E: V, N: P.Attack * SR | 0 },
          { S: VP, E: V, N: P.Sustain * SR | 0 },
          { S: V, E: 0, N: P.Decay * SR | 0 }
        ];
        for (var i = 0; i < $.envelopes.length; i += 1) {
          var e = $.envelopes[i];
          e.G = (e.E - e.S) / e.N;
        }
      },
      process: function($, block) {
        var i = 0;
        while ($.envelopes.length > 0 && i < block.length) {
          var E = $.envelopes[0];
          var vol = E.S, grad = E.G;
          var N = Math.min(block.length - i, E.N) | 0;
          var end = i + N | 0;
          for (; i < end; i += 1) {
            block[i] *= vol;
            vol += grad;
            vol = clamp2(vol, 0, 10);
          }
          E.S = vol;
          E.N -= N;
          if (E.N <= 0) {
            $.envelopes.shift();
          }
        }
        return i;
      }
    };
    jsfx2.DefaultModules = [
      jsfx2.Module.Frequency,
      jsfx2.Module.Vibrato,
      jsfx2.Module.Generator,
      jsfx2.Module.Filter,
      jsfx2.Module.Phaser,
      jsfx2.Module.Volume
    ];
    jsfx2.DefaultModules.sort(byStage);
    jsfx2.EmptyParams = EmptyParams;
    function EmptyParams() {
      return map_object(jsfx2.Module, function() {
        return {};
      });
    }
    jsfx2._RemoveEmptyParams = RemoveEmptyParams;
    function RemoveEmptyParams(params) {
      for (var name2 in params) {
        if (Object_keys(params[name2]).length == 0) {
          delete params[name2];
        }
      }
    }
    jsfx2.Preset = {
      Reset: function() {
        return EmptyParams();
      },
      Coin: function() {
        var p = EmptyParams();
        p.Frequency.Start = runif(880, 660);
        p.Volume.Sustain = runif(0.1);
        p.Volume.Decay = runif(0.4, 0.1);
        p.Volume.Punch = runif(0.3, 0.3);
        if (runif() < 0.5) {
          p.Frequency.ChangeSpeed = runif(0.15, 0.1);
          p.Frequency.ChangeAmount = runif(8, 4);
        }
        RemoveEmptyParams(p);
        return p;
      },
      Laser: function() {
        var p = EmptyParams();
        p.Generator.Func = rchoose(["saw", "sine"]);
        if (runif() < 0.33) {
          p.Frequency.Start = runif(880, 440);
          p.Frequency.Min = runif(0.1);
          p.Frequency.Slide = runif(0.3, -0.8);
        } else {
          p.Frequency.Start = runif(1200, 440);
          p.Frequency.Min = p.Frequency.Start - runif(880, 440);
          if (p.Frequency.Min < 110) {
            p.Frequency.Min = 110;
          }
          p.Frequency.Slide = runif(0.3, -1);
        }
        if (runif() < 0.5) {
          p.Generator.A = runif(0.5);
          p.Generator.ASlide = runif(0.2);
        } else {
          p.Generator.A = runif(0.5, 0.4);
          p.Generator.ASlide = runif(0.7);
        }
        p.Volume.Sustain = runif(0.2, 0.1);
        p.Volume.Decay = runif(0.4);
        if (runif() < 0.5) {
          p.Volume.Punch = runif(0.3);
        }
        if (runif() < 0.33) {
          p.Phaser.Offset = runif(0.2);
          p.Phaser.Sweep = runif(0.2);
        }
        if (runif() < 0.5) {
          p.Filter.HP = runif(0.3);
        }
        RemoveEmptyParams(p);
        return p;
      },
      Explosion: function() {
        var p = EmptyParams();
        p.Generator.Func = "noise";
        if (runif() < 0.5) {
          p.Frequency.Start = runif(440, 40);
          p.Frequency.Slide = runif(0.4, -0.1);
        } else {
          p.Frequency.Start = runif(1600, 220);
          p.Frequency.Slide = runif(-0.2, -0.2);
        }
        if (runif() < 0.2) {
          p.Frequency.Slide = 0;
        }
        if (runif() < 0.3) {
          p.Frequency.RepeatSpeed = runif(0.5, 0.3);
        }
        p.Volume.Sustain = runif(0.3, 0.1);
        p.Volume.Decay = runif(0.5);
        p.Volume.Punch = runif(0.6, 0.2);
        if (runif() < 0.5) {
          p.Phaser.Offset = runif(0.9, -0.3);
          p.Phaser.Sweep = runif(-0.3);
        }
        if (runif() < 0.33) {
          p.Frequency.ChangeSpeed = runif(0.3, 0.6);
          p.Frequency.ChangeAmount = runif(24, -12);
        }
        RemoveEmptyParams(p);
        return p;
      },
      Powerup: function() {
        var p = EmptyParams();
        if (runif() < 0.5) {
          p.Generator.Func = "saw";
        } else {
          p.Generator.A = runif(0.6);
        }
        p.Frequency.Start = runif(220, 440);
        if (runif() < 0.5) {
          p.Frequency.Slide = runif(0.5, 0.2);
          p.Frequency.RepeatSpeed = runif(0.4, 0.4);
        } else {
          p.Frequency.Slide = runif(0.2, 0.05);
          if (runif() < 0.5) {
            p.Vibrato.Depth = runif(0.6, 0.1);
            p.Vibrato.Frequency = runif(30, 10);
          }
        }
        p.Volume.Sustain = runif(0.4);
        p.Volume.Decay = runif(0.4, 0.1);
        RemoveEmptyParams(p);
        return p;
      },
      Hit: function() {
        var p = EmptyParams();
        p.Generator.Func = rchoose(["saw", "noise"]);
        p.Generator.A = runif(0.6);
        p.Generator.ASlide = runif(1, -0.5);
        p.Frequency.Start = runif(880, 220);
        p.Frequency.Slide = -runif(0.4, 0.3);
        p.Volume.Sustain = runif(0.1);
        p.Volume.Decay = runif(0.2, 0.1);
        if (runif() < 0.5) {
          p.Filter.HP = runif(0.3);
        }
        RemoveEmptyParams(p);
        return p;
      },
      Jump: function() {
        var p = EmptyParams();
        p.Generator.Func = "square";
        p.Generator.A = runif(0.6);
        p.Frequency.Start = runif(330, 330);
        p.Frequency.Slide = runif(0.4, 0.2);
        p.Volume.Sustain = runif(0.3, 0.1);
        p.Volume.Decay = runif(0.2, 0.1);
        if (runif() < 0.5) {
          p.Filter.HP = runif(0.3);
        }
        if (runif() < 0.3) {
          p.Filter.LP = runif(-0.6, 1);
        }
        RemoveEmptyParams(p);
        return p;
      },
      Select: function() {
        var p = EmptyParams();
        p.Generator.Func = rchoose(["square", "saw"]);
        p.Generator.A = runif(0.6);
        p.Frequency.Start = runif(660, 220);
        p.Volume.Sustain = runif(0.1, 0.1);
        p.Volume.Decay = runif(0.2);
        p.Filter.HP = 0.2;
        p.Volume.Master = 0.4;
        RemoveEmptyParams(p);
        return p;
      },
      Lucky: function() {
        var p = EmptyParams();
        map_object(p, function(out, moduleName) {
          var defs = jsfx2.Module[moduleName].params;
          map_object(defs, function(def, name2) {
            if (def.C) {
              var values = Object_keys(def.C);
              out[name2] = values[values.length * random2() | 0];
            } else {
              out[name2] = random2() * (def.H - def.L) + def.L;
            }
          });
        });
        p.Volume.Master = 0.4;
        p.Filter = {};
        RemoveEmptyParams(p);
        return p;
      },
      Synth: function() {
        var p = EmptyParams();
        p.Generator.Func = rchoose(["square", "saw"]);
        p.Frequency.Start = rchoose([340, 240, 170]);
        p.Volume.Attack = runif() > 0.6 ? runif(0.5) : 0;
        p.Volume.Sustain = runif(1);
        p.Volume.Punch = runif(1);
        p.Volume.Decay = runif(0.9) + 0.1;
        p.Generator.A = runif(1);
        if (runif() < 0.25) {
          p.Filter.HP = runif(1);
        }
        if (runif() < 0.25) {
          p.Filter.LP = runif(1);
        }
        RemoveEmptyParams(p);
        return p;
      },
      Tone: function() {
        var p = EmptyParams();
        p.Generator.Func = "square";
        p.Frequency.Start = 261.6;
        p.Volume.Sustain = 0.6441;
        p.Volume.Master = 0.7;
        RemoveEmptyParams(p);
        return p;
      },
      Click: function() {
        var p = jsfx2.Preset.Hit();
        if (runif() < 0.5) {
          p.Frequency.Slide = -0.5 + runif(1);
        }
        if (runif() < 0.5) {
          p.Volume.Sustain *= runif(0.4) + 0.2;
          p.Volume.Decay *= runif(0.4) + 0.2;
        }
        p.Frequency.Start = runif(1200, 440);
        RemoveEmptyParams(p);
        return p;
      }
    };
    jsfx2.G.unoise = newGenerator("sample = Math.random();");
    jsfx2.G.sine = newGenerator("sample = Math.sin(phase);");
    jsfx2.G.saw = newGenerator("sample = 2*(phase/TAU - ((phase/TAU + 0.5)|0));");
    jsfx2.G.triangle = newGenerator(
      "sample = Math.abs(4 * ((phase/TAU - 0.25)%1) - 2) - 1;"
    );
    jsfx2.G.square = newGenerator(
      "var s = Math.sin(phase); sample = s > A ? 1.0 : s < A ? -1.0 : A;"
    );
    jsfx2.G.synth = newGenerator(
      "sample = Math.sin(phase) + .5*Math.sin(phase/2) + .3*Math.sin(phase/4);"
    );
    jsfx2.G.noise = newGenerator(
      "if(phase % TAU < 4){__noiseLast = Math.random() * 2 - 1;} sample = __noiseLast;"
    );
    jsfx2.G.string = {
      create: function() {
        var BS = 1 << 16;
        var BM = BS - 1;
        var buffer = createFloatArray(BS);
        for (var i = 0; i < buffer.length; i++) {
          buffer[i] = random2() * 2 - 1;
        }
        var head = 0;
        return function($, block) {
          var TAU2 = Math.PI * 2;
          var A = +$.generatorA, ASlide = +$.generatorASlide, B = +$.generatorB, BSlide = +$.generatorBSlide;
          var buf = buffer;
          for (var i2 = 0; i2 < block.length; i2++) {
            var phaseSpeed = block[i2];
            var n = TAU2 / phaseSpeed | 0;
            A += ASlide;
            B += BSlide;
            A = A < 0 ? 0 : A > 1 ? 1 : A;
            B = B < 0 ? 0 : B > 1 ? 1 : B;
            var t = head - n + BS & BM;
            var sample = (buf[t - 0 + BS & BM] * 1 + buf[t - 1 + BS & BM] * A + buf[t - 2 + BS & BM] * B) / (1 + A + B);
            buf[head] = sample;
            block[i2] = buf[head];
            head = head + 1 & BM;
          }
          $.generatorA = A;
          $.generatorB = B;
          return block.length;
        };
      }
    };
    function newGenerator(line) {
      return new Function(
        "$",
        "block",
        "var TAU = Math.PI * 2;\nvar sample;\nvar phase = +$.generatorPhase,\n	A = +$.generatorA, ASlide = +$.generatorASlide,\n	B = +$.generatorB, BSlide = +$.generatorBSlide;\n\nfor(var i = 0; i < block.length; i++){\n	var phaseSpeed = block[i];\n	phase += phaseSpeed;\n	if(phase > TAU){ phase -= TAU };\n	A += ASlide; B += BSlide;\n   A = A < 0 ? 0 : A > 1 ? 1 : A;\n   B = B < 0 ? 0 : B > 1 ? 1 : B;\n" + line + "	block[i] = sample;\n}\n\n$.generatorPhase = phase;\n$.generatorA = A;\n$.generatorB = B;\nreturn block.length;\n"
      );
    }
    jsfx2.CreateAudio = CreateAudio;
    function CreateAudio(data) {
      if (typeof Float32Array !== "undefined") {
        assert(data instanceof Float32Array, "data must be an Float32Array");
      }
      var blockAlign = numChannels * bitsPerSample >> 3;
      var byteRate = jsfx2.SampleRate * blockAlign;
      var output = createByteArray(8 + 36 + data.length * 2);
      var p = 0;
      function S(value) {
        for (var i = 0; i < value.length; i += 1) {
          output[p] = value.charCodeAt(i);
          p++;
        }
      }
      function V(value, nBytes) {
        if (nBytes <= 0) {
          return;
        }
        output[p] = value & 255;
        p++;
        V(value >> 8, nBytes - 1);
      }
      S("RIFF");
      V(36 + data.length * 2, 4);
      S("WAVEfmt ");
      V(16, 4);
      V(1, 2);
      V(numChannels, 2);
      V(jsfx2.SampleRate, 4);
      V(byteRate, 4);
      V(blockAlign, 2);
      V(bitsPerSample, 2);
      S("data");
      V(data.length * 2, 4);
      CopyFToU8(output.subarray(p), data);
      return new Audio("data:audio/wav;base64," + U8ToB64(output));
    }
    jsfx2.DownloadAsFile = function(audio) {
      assert(audio instanceof Audio, "input must be an Audio object");
      document.location.href = audio.src;
    };
    jsfx2.Util = {};
    jsfx2.Util.CopyFToU8 = CopyFToU8;
    function CopyFToU8(into, floats) {
      assert(
        into.length / 2 == floats.length,
        "the target buffer must be twice as large as the iinput"
      );
      var k = 0;
      for (var i = 0; i < floats.length; i++) {
        var v = +floats[i];
        var a = v * 32767 | 0;
        a = a < -32768 ? -32768 : 32767 < a ? 32767 : a;
        a += a < 0 ? 65536 : 0;
        into[k] = a & 255;
        k++;
        into[k] = a >> 8;
        k++;
      }
    }
    function U8ToB64(data) {
      var CHUNK = 32768;
      var result = "";
      for (var start2 = 0; start2 < data.length; start2 += CHUNK) {
        var end = Math.min(start2 + CHUNK, data.length);
        result += String.fromCharCode.apply(null, data.subarray(start2, end));
      }
      return btoa(result);
    }
    function getDefaultSampleRate() {
      if (typeof AudioContext !== "undefined") {
        return new AudioContext().sampleRate;
      }
      return 44100;
    }
    function assert(condition, message) {
      if (!condition) {
        throw new Error(message);
      }
    }
    function clamp2(v, min, max) {
      v = +v;
      min = +min;
      max = +max;
      if (v < min) {
        return +min;
      }
      if (v > max) {
        return +max;
      }
      return +v;
    }
    function clamp1(v) {
      v = +v;
      if (v < 0) {
        return 0;
      }
      if (v > 1) {
        return 1;
      }
      return +v;
    }
    function map_object(obj, fn) {
      var r = {};
      for (var name2 in obj) {
        if (obj.hasOwnProperty(name2)) {
          r[name2] = fn(obj[name2], name2);
        }
      }
      return r;
    }
    function runif(scale, offset) {
      var a = random2();
      if (scale !== void 0)
        a *= scale;
      if (offset !== void 0)
        a += offset;
      return a;
    }
    function rchoose(gens) {
      return gens[gens.length * random2() | 0];
    }
    function Object_keys(obj) {
      var r = [];
      for (var name2 in obj) {
        r.push(name2);
      }
      return r;
    }
    jsfx2._createFloatArray = createFloatArray;
    function createFloatArray(N) {
      if (typeof Float32Array === "undefined") {
        var r = new Array(N);
        for (var i = 0; i < r.length; i++) {
          r[i] = 0;
        }
      }
      return new Float32Array(N);
    }
    function createByteArray(N) {
      if (typeof Uint8Array === "undefined") {
        var r = new Array(N);
        for (var i = 0; i < r.length; i++) {
          r[i] = 0 | 0;
        }
      }
      return new Uint8Array(N);
    }
    var randomFunc = Math.random;
    jsfx2.setRandomFunc = function(func) {
      randomFunc = func;
    };
    function random2() {
      return randomFunc();
    }
  })(jsfx = {});
  let audioContext;
  let tempo;
  let playInterval;
  let quantize;
  let gainNode;
  let isStarted = false;
  function init$3(_audioContext = void 0, _gainNode = void 0) {
    audioContext = _audioContext == null ? new (window.AudioContext || window.webkitAudioContext)() : _audioContext;
    if (_gainNode == null) {
      gainNode = audioContext.createGain();
      gainNode.connect(audioContext.destination);
    } else {
      gainNode = _gainNode;
    }
    setTempo();
    setQuantize();
    setVolume();
  }
  function start() {
    if (isStarted) {
      return;
    }
    isStarted = true;
    playEmpty();
  }
  function setTempo(_tempo = 120) {
    tempo = _tempo;
    playInterval = 60 / tempo;
  }
  function setQuantize(noteLength = 8) {
    quantize = noteLength > 0 ? 4 / noteLength : void 0;
  }
  function setVolume(_volume = 0.1) {
    gainNode.gain.value = _volume;
  }
  function getQuantizedTime(time) {
    if (quantize == null) {
      return time;
    }
    const interval2 = playInterval * quantize;
    return interval2 > 0 ? Math.ceil(time / interval2) * interval2 : time;
  }
  function playEmpty() {
    const bufferSource = audioContext.createBufferSource();
    bufferSource.start = bufferSource.start || bufferSource.noteOn;
    bufferSource.start();
  }
  function resumeAudioContext() {
    audioContext.resume();
  }
  class Random {
    constructor(seed = null) {
      __publicField(this, "x");
      __publicField(this, "y");
      __publicField(this, "z");
      __publicField(this, "w");
      this.setSeed(seed);
    }
    get(lowOrHigh = 1, high) {
      if (high == null) {
        high = lowOrHigh;
        lowOrHigh = 0;
      }
      return this.next() / 4294967295 * (high - lowOrHigh) + lowOrHigh;
    }
    getInt(lowOrHigh, high) {
      if (high == null) {
        high = lowOrHigh;
        lowOrHigh = 0;
      }
      const lowOrHighInt = Math.floor(lowOrHigh);
      const highInt = Math.floor(high);
      if (highInt === lowOrHighInt) {
        return lowOrHighInt;
      }
      return this.next() % (highInt - lowOrHighInt) + lowOrHighInt;
    }
    getPlusOrMinus() {
      return this.getInt(2) * 2 - 1;
    }
    select(values) {
      return values[this.getInt(values.length)];
    }
    setSeed(w, x = 123456789, y = 362436069, z = 521288629, loopCount = 32) {
      this.w = w != null ? w >>> 0 : Math.floor(Math.random() * 4294967295) >>> 0;
      this.x = x >>> 0;
      this.y = y >>> 0;
      this.z = z >>> 0;
      for (let i = 0; i < loopCount; i++) {
        this.next();
      }
      return this;
    }
    getState() {
      return { x: this.x, y: this.y, z: this.z, w: this.w };
    }
    next() {
      const t = this.x ^ this.x << 11;
      this.x = this.y;
      this.y = this.z;
      this.z = this.w;
      this.w = (this.w ^ this.w >>> 19 ^ (t ^ t >>> 8)) >>> 0;
      return this.w;
    }
  }
  function times(n, func) {
    let result = [];
    for (let i = 0; i < n; i++) {
      result.push(func(i));
    }
    return result;
  }
  function pitchToFreq(pitch2) {
    return 440 * Math.pow(2, (pitch2 - 69) / 12);
  }
  function getHashFromString(str) {
    let hash = 0;
    const len = str.length;
    for (let i = 0; i < len; i++) {
      const chr = str.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0;
    }
    return hash;
  }
  function clamp(v, low = 0, high = 1) {
    return Math.max(low, Math.min(v, high));
  }
  const types = [
    "coin",
    "laser",
    "explosion",
    "powerUp",
    "hit",
    "jump",
    "select",
    "lucky",
    "random",
    "click",
    "synth",
    "tone"
  ];
  const typeFunctionNames = {
    coin: "Coin",
    laser: "Laser",
    explosion: "Explosion",
    powerUp: "Powerup",
    hit: "Hit",
    jump: "Jump",
    select: "Select",
    lucky: "Lucky",
    random: "Lucky",
    click: "Click",
    synth: "Synth",
    tone: "Tone"
  };
  const random$2 = new Random();
  let soundEffects$1;
  let live;
  function init$2() {
    live = jsfx.Live();
    soundEffects$1 = [];
    jsfx.setRandomFunc(() => random$2.get());
  }
  function play$2(soundEffect) {
    playSoundEffect$1(soundEffect);
  }
  function update$3(currentTime) {
    soundEffects$1.forEach((se) => {
      updateSoundEffect(se, currentTime);
    });
  }
  function get$9(type = void 0, seed = void 0, numberOfSounds = 2, volume = 0.5, freq2 = void 0, attackRatio = 1, sustainRatio = 1) {
    if (seed != null) {
      random$2.setSeed(seed);
    }
    const preset = jsfx.Preset[typeFunctionNames[type != null ? type : types[random$2.getInt(8)]]];
    const params = times(numberOfSounds, () => {
      const p = preset();
      if (freq2 != null && p.Frequency.Start != null) {
        p.Frequency.Start = freq2;
      }
      if (p.Volume.Attack != null) {
        p.Volume.Attack *= attackRatio;
      }
      if (p.Volume.Sustain != null) {
        p.Volume.Sustain *= sustainRatio;
      }
      return p;
    });
    return createBuffers(type, params, volume);
  }
  function createBuffers(type, params, volume) {
    const buffers = params.map((p) => {
      const values = live._generate(p);
      const buffer = audioContext.createBuffer(1, values.length, jsfx.SampleRate);
      var channelData = buffer.getChannelData(0);
      channelData.set(values);
      return buffer;
    });
    const gainNode$1 = audioContext.createGain();
    gainNode$1.gain.value = volume;
    gainNode$1.connect(gainNode);
    return {
      type,
      params,
      volume,
      buffers,
      bufferSourceNodes: void 0,
      gainNode: gainNode$1,
      isPlaying: false,
      playedTime: void 0
    };
  }
  function getForSequence(sequence, isDrum, seed, type, volume) {
    const random2 = new Random();
    random2.setSeed(seed);
    let se;
    if (isDrum) {
      let t = random2.select(["hit", "click", "explosion"]);
      if (type != null) {
        t = type;
      }
      se = get$9(
        t,
        random2.getInt(999999999),
        t === "explosion" ? 1 : 2,
        volume != null ? volume : t === "explosion" ? 0.4 : 0.5,
        random2.get(100, 200),
        t === "explosion" ? 0.5 : 1,
        t === "explosion" ? 0.2 : 1
      );
    } else {
      const al = calcNoteLengthAverage(sequence);
      let t = random2.get() < 1 / al ? "select" : random2.select(["tone", "tone", "synth"]);
      if (type != null) {
        t = type;
      }
      se = get$9(
        t,
        random2.getInt(999999999),
        t !== "select" ? 1 : 2,
        volume != null ? volume : 0.3,
        261.6,
        t !== "select" ? 0.1 : 1,
        t !== "select" ? 2 : 1
      );
    }
    se.isDrum = isDrum;
    se.seed = seed;
    return se;
  }
  function calcNoteLengthAverage(sequence) {
    if (sequence == null || sequence.notes.length === 0) {
      return 1;
    }
    let sl = 0;
    let nc = 0;
    sequence.notes.forEach((n) => {
      const o = n.quantizedEndStep - n.quantizedStartStep;
      if (o > 0) {
        sl += o;
        nc++;
      }
    });
    return sl / nc;
  }
  function add$6(se) {
    soundEffects$1.push(se);
  }
  function playSoundEffect$1(soundEffect) {
    soundEffect.isPlaying = true;
  }
  function updateSoundEffect(soundEffect, currentTime) {
    if (!soundEffect.isPlaying) {
      return;
    }
    soundEffect.isPlaying = false;
    const time = getQuantizedTime(currentTime);
    if (soundEffect.playedTime == null || time > soundEffect.playedTime) {
      playLater(soundEffect, time);
      soundEffect.playedTime = time;
    }
  }
  function playLater(soundEffect, when, detune = void 0) {
    soundEffect.bufferSourceNodes = [];
    soundEffect.buffers.forEach((b) => {
      const bufferSourceNode = audioContext.createBufferSource();
      bufferSourceNode.buffer = b;
      if (detune != null && bufferSourceNode.playbackRate != null) {
        const semitoneRatio = Math.pow(2, 1 / 12);
        bufferSourceNode.playbackRate.value = Math.pow(semitoneRatio, detune);
      }
      bufferSourceNode.start = bufferSourceNode.start || bufferSourceNode.noteOn;
      bufferSourceNode.connect(soundEffect.gainNode);
      bufferSourceNode.start(when);
      soundEffect.bufferSourceNodes.push(bufferSourceNode);
    });
  }
  function stop$1(soundEffect, when = void 0) {
    if (soundEffect.bufferSourceNodes != null) {
      soundEffect.bufferSourceNodes.forEach((n) => {
        if (when == null) {
          n.stop();
        } else {
          n.stop(when);
        }
      });
      soundEffect.bufferSourceNodes = void 0;
    }
  }
  const volumeMultiplier = 100;
  function fromMml(mml) {
    let leftMml = `${mml}`;
    let type;
    types.forEach((t) => {
      const st = `@${t}`;
      const ti = leftMml.indexOf(st);
      if (ti >= 0) {
        type = t;
        leftMml = `${leftMml.slice(0, ti)}${leftMml.slice(ti + st.length)}`;
      }
    });
    const sd = "@d";
    const di = leftMml.indexOf(sd);
    let isDrum = false;
    if (di >= 0) {
      isDrum = true;
      leftMml = `${leftMml.slice(0, di)}${leftMml.slice(di + sd.length)}`;
    }
    const ss = leftMml.match(/@s\d+/);
    let seed = 1;
    if (ss != null) {
      seed = Number.parseInt(ss[0].substring(2));
      leftMml = leftMml.replace(/@s\d+/, "");
    }
    const vs = leftMml.match(/v\d+/);
    let volume = 0.5;
    if (vs != null) {
      volume = Number.parseInt(vs[0].substring(1)) / volumeMultiplier;
      leftMml = leftMml.replace(/v\d+/, "");
    }
    return { mml: leftMml, args: { isDrum, seed, type, volume } };
  }
  function get$8(mml, sequence, soundEffect2, visualizer) {
    return {
      mml,
      sequence,
      soundEffect: soundEffect2,
      noteIndex: 0,
      endStep: -1,
      visualizer
    };
  }
  function update$2(t, p, time) {
    const n = p.sequence.notes[p.noteIndex];
    if (n == null) {
      return;
    }
    if ((p.soundEffect.type === "synth" || p.soundEffect.type === "tone") && p.endStep === t.notesStepsIndex) {
      stop$1(p.soundEffect, time);
    }
    if (n.quantizedStartStep !== t.notesStepsIndex) {
      return;
    }
    if (p.soundEffect.type === "synth" || p.soundEffect.type === "tone") {
      stop$1(p.soundEffect);
    }
    if (p.soundEffect.isDrum) {
      playLater(p.soundEffect, time);
    } else {
      playLater(p.soundEffect, time, n.pitch - 69);
    }
    if (p.visualizer != null) {
      p.visualizer.redraw(n);
    }
    p.endStep = n.quantizedEndStep;
    if (p.endStep >= t.notesStepsCount) {
      p.endStep -= t.notesStepsCount;
    }
    p.noteIndex++;
    if (p.noteIndex >= p.sequence.notes.length) {
      p.noteIndex = 0;
    }
  }
  let tracks = [];
  function init$1() {
    stopAll();
    tracks = [];
  }
  function get$7(parts, notesStepsCount, speedRatio = 1) {
    parts.forEach((p) => {
      p.noteIndex = 0;
    });
    const t = {
      parts,
      notesStepsCount,
      notesStepsIndex: void 0,
      noteInterval: void 0,
      nextNotesTime: void 0,
      speedRatio,
      isPlaying: false,
      isLooping: false
    };
    initTrack(t);
    return t;
  }
  function initTrack(track) {
    const noteInterval = playInterval / 4 / track.speedRatio;
    track.notesStepsIndex = 0;
    track.noteInterval = noteInterval;
    track.nextNotesTime = getQuantizedTime(audioContext.currentTime) - noteInterval;
  }
  function add$5(track) {
    tracks.push(track);
  }
  function remove(track) {
    tracks = tracks.filter((t) => t !== track);
  }
  function update$1(currentTime) {
    tracks.forEach((t) => {
      updateTrack(t, currentTime);
    });
  }
  function play$1(track, isLooping = false) {
    track.isLooping = isLooping;
    initTrack(track);
    track.isPlaying = true;
  }
  function stop(track) {
    track.isPlaying = false;
    track.parts.forEach((p) => {
      stop$1(p.soundEffect);
    });
  }
  function stopAll() {
    tracks.forEach((t) => {
      stop(t);
    });
  }
  function updateTrack(track, currentTime) {
    if (!track.isPlaying) {
      return;
    }
    if (currentTime < track.nextNotesTime) {
      return;
    }
    track.nextNotesTime += track.noteInterval;
    if (track.nextNotesTime < currentTime - playInterval) {
      track.nextNotesTime = getQuantizedTime(currentTime);
    }
    track.parts.forEach((p) => {
      update$2(track, p, track.nextNotesTime);
    });
    track.notesStepsIndex++;
    if (track.notesStepsIndex >= track.notesStepsCount) {
      if (track.isLooping) {
        track.notesStepsIndex = 0;
      } else {
        track.isPlaying = false;
      }
    }
  }
  const playPrefixes = {
    c: "coin",
    l: "laser",
    e: "explosion",
    p: "powerUp",
    h: "hit",
    j: "jump",
    s: "select",
    u: "random",
    r: "random",
    i: "click",
    y: "synth",
    t: "tone"
  };
  const random$1 = random$2;
  let baseRandomSeed$2 = 1;
  function setSeed$2(_baseRandomSeed) {
    baseRandomSeed$2 = _baseRandomSeed;
  }
  function generateBgm(name2, pitch2, len, interval2, numberOfTracks, soundEffectTypes, volume) {
    random$1.setSeed(baseRandomSeed$2 + getHashFromString(name2));
    initProgression();
    prevTrack = null;
    let param = random$1.select(soundEffectTypes);
    const tracks2 = times(numberOfTracks, () => {
      const randomness = Math.floor(
        Math.abs(random$1.get() + random$1.get() - 1) * 3
      );
      const chordOffset = Math.floor((random$1.get() + random$1.get() - 1) * 10);
      const velocityRatio = Math.abs(random$1.get() + random$1.get() - 1);
      const hasSameNoteWithPrevPart = random$1.get() < 0.25;
      if (!hasSameNoteWithPrevPart) {
        param = random$1.select(soundEffectTypes);
      }
      const isLimitNoteWidth = random$1.get() < 0.5;
      const isLimitNoteResolution = random$1.get() < 0.5;
      const isRepeatHalf = random$1.get() < 0.9;
      return generatePart(
        len,
        param,
        pitch2,
        0.7,
        randomness,
        chordOffset,
        velocityRatio,
        hasSameNoteWithPrevPart,
        isLimitNoteWidth,
        isLimitNoteResolution,
        isRepeatHalf,
        void 0,
        volume
      );
    });
    return getTrack(tracks2, 0.5 / interval2);
  }
  function generateJingle(name2 = "0", isSe = false, note2 = 69 - 12, len = 16, interval2 = 0.25, numberOfTracks = 4, volume = 1) {
    random$1.setSeed(baseRandomSeed$2 + getHashFromString(name2));
    initProgression();
    prevTrack = null;
    let soundEffectType = playPrefixes[name2[0]];
    if (soundEffectType == null) {
      soundEffectType = types[random$1.getInt(8)];
    }
    let durationRatio = 0.8;
    if (isSe) {
      interval2 /= 4;
      durationRatio /= 2;
    }
    const tracks2 = times(numberOfTracks, () => {
      const randomness = Math.floor(
        Math.abs(random$1.get() + random$1.get() - 1) * 3
      );
      const chordOffset = Math.floor((random$1.get() + random$1.get() - 1) * 10);
      const velocityRatio = isSe ? 2 : Math.abs(random$1.get() + random$1.get() - 1);
      const hasSameNoteWithPrevPart = random$1.get() < 0.25;
      const isLimitNoteWidth = isSe ? false : random$1.get() < 0.5;
      const isLimitNoteResolution = random$1.get() < 0.5;
      const isRepeatHalf = isSe ? random$1.get() < 0.25 : random$1.get() < 0.9;
      const restRatio = random$1.get(0.5);
      const track2 = generatePart(
        len,
        soundEffectType,
        note2,
        durationRatio,
        randomness,
        chordOffset,
        velocityRatio,
        hasSameNoteWithPrevPart,
        isLimitNoteWidth,
        isLimitNoteResolution,
        isRepeatHalf,
        restRatio,
        volume
      );
      return track2;
    });
    return getTrack(tracks2, 0.5 / interval2);
  }
  function getTrack(gps, speedRatio) {
    const parts = gps.map((t) => {
      const notes = [];
      t.notes.forEach((n, i) => {
        if (n != null) {
          notes.push({ pitch: n + 69, quantizedStartStep: i * 2 });
        }
      });
      return get$8(void 0, { notes }, t.soundEffect);
    });
    return get$7(parts, gps[0].notes.length * 2, speedRatio);
  }
  let prevTrack;
  function generatePart(len = 32, soundEffectName, pitch2 = 60, durationRatio = 1, chordOffset = 0, randomness = 0, velocityRatio = 1, hasSameNoteWithPrevPart = false, isLimitNoteWidth = false, isLimitNoteResolution = false, isRepeatHalf = false, restRatio = null, volume = 0.1) {
    const generatedPart = getGeneratedPart(
      soundEffectName,
      pitchToFreq(pitch2),
      durationRatio,
      volume
    );
    if (prevTrack != null && hasSameNoteWithPrevPart) {
      generatedPart.noteRatios = prevTrack.noteRatios;
    } else {
      const pattern = restRatio != null ? createRandomPatternWithRestRatio(len, restRatio) : createRandomPattern$1(len);
      generatedPart.noteRatios = createNoteRatios(
        pattern,
        isLimitNoteWidth ? 0 : -1,
        1,
        velocityRatio,
        isRepeatHalf
      );
    }
    generatedPart.notes = createNotes(
      generatedPart.noteRatios,
      chordOffset,
      randomness,
      isLimitNoteResolution
    );
    prevTrack = generatedPart;
    return generatedPart;
  }
  function createRandomPattern$1(len) {
    let pattern = times(len, () => false);
    let pi = 4;
    while (pi <= len) {
      pattern = reversePattern$1(pattern, pi);
      pi *= 2;
    }
    return pattern;
  }
  function reversePattern$1(pattern, interval2) {
    let pt = times(interval2, () => false);
    const pn = Math.floor(Math.abs(random$1.get() + random$1.get() - 1) * 4);
    for (let i = 0; i < pn; i++) {
      pt[random$1.getInt(interval2 - 1)] = true;
    }
    return pattern.map((p, i) => pt[i % interval2] ? !p : p);
  }
  function createRandomPatternWithRestRatio(len, restRatio) {
    return times(len, () => random$1.get() >= restRatio);
  }
  const chords$2 = [
    [0, 4, 7],
    [0, 3, 7],
    [0, 4, 7, 10],
    [0, 4, 7, 11],
    [0, 3, 7, 10]
  ];
  const progressions = [
    [
      [0, 0],
      [7, 0],
      [9, 1],
      [4, 1]
    ],
    [
      [5, 0],
      [0, 0],
      [5, 0],
      [7, 0]
    ],
    [
      [5, 3],
      [7, 2],
      [4, 4],
      [9, 1]
    ],
    [
      [9, 1],
      [2, 1],
      [7, 0],
      [0, 0]
    ],
    [
      [9, 1],
      [5, 0],
      [7, 0],
      [0, 0]
    ]
  ];
  let progression;
  function initProgression() {
    const baseProgression = random$1.select(progressions);
    progression = baseProgression.map((bp, i) => [
      random$1.get() < 0.7 ? bp[0] : progressions[random$1.getInt(progressions.length)][i][0],
      random$1.get() < 0.7 ? bp[1] : random$1.getInt(chords$2.length)
    ]);
  }
  function createNoteRatios(pattern, min, max, velocityRatio, isRepeatHalf) {
    let n = random$1.get();
    let nv = random$1.get(-0.5, 0.5);
    let len = pattern.length;
    let cordLength = len / progression.length;
    let noteRatios = [];
    pattern.forEach((p, pi) => {
      let i = Math.floor(pi / cordLength);
      let j = pi % cordLength;
      if (isRepeatHalf && i === Math.floor(progression.length / 2)) {
        noteRatios.push(noteRatios[j]);
        if (noteRatios[j] != null) {
          n = noteRatios[j];
        }
        return;
      }
      if (!p) {
        noteRatios.push(null);
        return;
      }
      noteRatios.push(n);
      nv += random$1.get(-0.25, 0.25);
      n += nv * velocityRatio;
      if (random$1.get() < 0.2 || n <= min || n >= max) {
        n -= nv * 2;
        nv *= -1;
      }
    });
    return noteRatios;
  }
  function createNotes(noteRatios, offset, randomness, isLimitNoteResolution) {
    let len = noteRatios.length;
    let cordLength = len / progression.length;
    return noteRatios.map((nr, ni) => {
      if (nr == null) {
        return null;
      }
      let i = Math.floor(ni / cordLength);
      let d = progression[i][0];
      let chord2 = chords$2[progression[i][1]];
      let n = nr;
      if (isLimitNoteResolution) {
        n = Math.floor(n * 2) / 2;
      }
      let b = Math.floor(n);
      let cn = Math.floor((n - b) * chord2.length);
      cn += offset + random$1.getInt(-randomness, randomness + 1);
      while (cn >= chord2.length) {
        cn -= chord2.length;
        b++;
      }
      while (cn < 0) {
        cn += chord2.length;
        b--;
      }
      return d + b * 12 + chord2[cn];
    });
  }
  function getGeneratedPart(soundEffectName, freq2, durationRatio, volume) {
    return {
      noteRatios: void 0,
      notes: void 0,
      soundEffect: get$9(
        soundEffectName,
        void 0,
        1,
        volume,
        freq2,
        durationRatio,
        durationRatio
      )
    };
  }
  function isNamedPitch$5(src) {
    return src !== null && typeof src === "object" && "name" in src && typeof src.name === "string" ? true : false;
  }
  function isPitch$5(pitch2) {
    return pitch2 !== null && typeof pitch2 === "object" && "step" in pitch2 && typeof pitch2.step === "number" && "alt" in pitch2 && typeof pitch2.alt === "number" && !isNaN(pitch2.step) && !isNaN(pitch2.alt) ? true : false;
  }
  var FIFTHS$5 = [0, 2, 4, -1, 1, 3, 5];
  var STEPS_TO_OCTS$5 = FIFTHS$5.map(
    (fifths) => Math.floor(fifths * 7 / 12)
  );
  function coordinates$5(pitch2) {
    const { step, alt, oct, dir = 1 } = pitch2;
    const f = FIFTHS$5[step] + 7 * alt;
    if (oct === void 0) {
      return [dir * f];
    }
    const o = oct - STEPS_TO_OCTS$5[step] - 4 * alt;
    return [dir * f, dir * o];
  }
  var FIFTHS_TO_STEPS$2 = [3, 0, 4, 1, 5, 2, 6];
  function pitch$2(coord) {
    const [f, o, dir] = coord;
    const step = FIFTHS_TO_STEPS$2[unaltered$2(f)];
    const alt = Math.floor((f + 1) / 7);
    if (o === void 0) {
      return { step, alt, dir };
    }
    const oct = o + 4 * alt + STEPS_TO_OCTS$5[step];
    return { step, alt, oct, dir };
  }
  function unaltered$2(f) {
    const i = (f + 1) % 7;
    return i < 0 ? 7 + i : i;
  }
  var fillStr$6 = (s, n) => Array(Math.abs(n) + 1).join(s);
  var NoInterval$4 = Object.freeze({
    empty: true,
    name: "",
    num: NaN,
    q: "",
    type: "",
    step: NaN,
    alt: NaN,
    dir: NaN,
    simple: NaN,
    semitones: NaN,
    chroma: NaN,
    coord: [],
    oct: NaN
  });
  var INTERVAL_TONAL_REGEX$4 = "([-+]?\\d+)(d{1,4}|m|M|P|A{1,4})";
  var INTERVAL_SHORTHAND_REGEX$4 = "(AA|A|P|M|m|d|dd)([-+]?\\d+)";
  var REGEX$8 = new RegExp(
    "^" + INTERVAL_TONAL_REGEX$4 + "|" + INTERVAL_SHORTHAND_REGEX$4 + "$"
  );
  function tokenizeInterval$4(str) {
    const m = REGEX$8.exec(`${str}`);
    if (m === null) {
      return ["", ""];
    }
    return m[1] ? [m[1], m[2]] : [m[4], m[3]];
  }
  var cache$8 = {};
  function interval$4(src) {
    return typeof src === "string" ? cache$8[src] || (cache$8[src] = parse$7(src)) : isPitch$5(src) ? interval$4(pitchName$6(src)) : isNamedPitch$5(src) ? interval$4(src.name) : NoInterval$4;
  }
  var SIZES$4 = [0, 2, 4, 5, 7, 9, 11];
  var TYPES$4 = "PMMPPMM";
  function parse$7(str) {
    const tokens = tokenizeInterval$4(str);
    if (tokens[0] === "") {
      return NoInterval$4;
    }
    const num = +tokens[0];
    const q = tokens[1];
    const step = (Math.abs(num) - 1) % 7;
    const t = TYPES$4[step];
    if (t === "M" && q === "P") {
      return NoInterval$4;
    }
    const type = t === "M" ? "majorable" : "perfectable";
    const name2 = "" + num + q;
    const dir = num < 0 ? -1 : 1;
    const simple = num === 8 || num === -8 ? num : dir * (step + 1);
    const alt = qToAlt$4(type, q);
    const oct = Math.floor((Math.abs(num) - 1) / 7);
    const semitones = dir * (SIZES$4[step] + alt + 12 * oct);
    const chroma2 = (dir * (SIZES$4[step] + alt) % 12 + 12) % 12;
    const coord = coordinates$5({ step, alt, oct, dir });
    return {
      empty: false,
      name: name2,
      num,
      q,
      step,
      alt,
      dir,
      type,
      simple,
      semitones,
      chroma: chroma2,
      coord,
      oct
    };
  }
  function coordToInterval$1(coord, forceDescending) {
    const [f, o = 0] = coord;
    const isDescending = f * 7 + o * 12 < 0;
    const ivl = forceDescending || isDescending ? [-f, -o, -1] : [f, o, 1];
    return interval$4(pitch$2(ivl));
  }
  function qToAlt$4(type, q) {
    return q === "M" && type === "majorable" || q === "P" && type === "perfectable" ? 0 : q === "m" && type === "majorable" ? -1 : /^A+$/.test(q) ? q.length : /^d+$/.test(q) ? -1 * (type === "perfectable" ? q.length : q.length + 1) : 0;
  }
  function pitchName$6(props) {
    const { step, alt, oct = 0, dir } = props;
    if (!dir) {
      return "";
    }
    const calcNum = step + 1 + 7 * oct;
    const num = calcNum === 0 ? step + 1 : calcNum;
    const d = dir < 0 ? "-" : "";
    const type = TYPES$4[step] === "M" ? "majorable" : "perfectable";
    const name2 = d + num + altToQ$4(type, alt);
    return name2;
  }
  function altToQ$4(type, alt) {
    if (alt === 0) {
      return type === "majorable" ? "M" : "P";
    } else if (alt === -1 && type === "majorable") {
      return "m";
    } else if (alt > 0) {
      return fillStr$6("A", alt);
    } else {
      return fillStr$6("d", type === "perfectable" ? alt : alt + 1);
    }
  }
  function isNamedPitch$4(src) {
    return src !== null && typeof src === "object" && "name" in src && typeof src.name === "string" ? true : false;
  }
  function isPitch$4(pitch2) {
    return pitch2 !== null && typeof pitch2 === "object" && "step" in pitch2 && typeof pitch2.step === "number" && "alt" in pitch2 && typeof pitch2.alt === "number" && !isNaN(pitch2.step) && !isNaN(pitch2.alt) ? true : false;
  }
  var FIFTHS$4 = [0, 2, 4, -1, 1, 3, 5];
  var STEPS_TO_OCTS$4 = FIFTHS$4.map(
    (fifths) => Math.floor(fifths * 7 / 12)
  );
  function coordinates$4(pitch2) {
    const { step, alt, oct, dir = 1 } = pitch2;
    const f = FIFTHS$4[step] + 7 * alt;
    if (oct === void 0) {
      return [dir * f];
    }
    const o = oct - STEPS_TO_OCTS$4[step] - 4 * alt;
    return [dir * f, dir * o];
  }
  var FIFTHS_TO_STEPS$1 = [3, 0, 4, 1, 5, 2, 6];
  function pitch$1(coord) {
    const [f, o, dir] = coord;
    const step = FIFTHS_TO_STEPS$1[unaltered$1(f)];
    const alt = Math.floor((f + 1) / 7);
    if (o === void 0) {
      return { step, alt, dir };
    }
    const oct = o + 4 * alt + STEPS_TO_OCTS$4[step];
    return { step, alt, oct, dir };
  }
  function unaltered$1(f) {
    const i = (f + 1) % 7;
    return i < 0 ? 7 + i : i;
  }
  var fillStr$5 = (s, n) => Array(Math.abs(n) + 1).join(s);
  var NoNote$1 = Object.freeze({
    empty: true,
    name: "",
    letter: "",
    acc: "",
    pc: "",
    step: NaN,
    alt: NaN,
    chroma: NaN,
    height: NaN,
    coord: [],
    midi: null,
    freq: null
  });
  var cache$7 = /* @__PURE__ */ new Map();
  var stepToLetter$1 = (step) => "CDEFGAB".charAt(step);
  var altToAcc$1 = (alt) => alt < 0 ? fillStr$5("b", -alt) : fillStr$5("#", alt);
  var accToAlt$1 = (acc) => acc[0] === "b" ? -acc.length : acc.length;
  function note$1(src) {
    const stringSrc = JSON.stringify(src);
    const cached = cache$7.get(stringSrc);
    if (cached) {
      return cached;
    }
    const value = typeof src === "string" ? parse$6(src) : isPitch$4(src) ? note$1(pitchName$5(src)) : isNamedPitch$4(src) ? note$1(src.name) : NoNote$1;
    cache$7.set(stringSrc, value);
    return value;
  }
  var REGEX$7 = /^([a-gA-G]?)(#{1,}|b{1,}|x{1,}|)(-?\d*)\s*(.*)$/;
  function tokenizeNote$1(str) {
    const m = REGEX$7.exec(str);
    return m ? [m[1].toUpperCase(), m[2].replace(/x/g, "##"), m[3], m[4]] : ["", "", "", ""];
  }
  function coordToNote$1(noteCoord) {
    return note$1(pitch$1(noteCoord));
  }
  var mod$1 = (n, m) => (n % m + m) % m;
  var SEMI$1 = [0, 2, 4, 5, 7, 9, 11];
  function parse$6(noteName) {
    const tokens = tokenizeNote$1(noteName);
    if (tokens[0] === "" || tokens[3] !== "") {
      return NoNote$1;
    }
    const letter = tokens[0];
    const acc = tokens[1];
    const octStr = tokens[2];
    const step = (letter.charCodeAt(0) + 3) % 7;
    const alt = accToAlt$1(acc);
    const oct = octStr.length ? +octStr : void 0;
    const coord = coordinates$4({ step, alt, oct });
    const name2 = letter + acc + octStr;
    const pc = letter + acc;
    const chroma2 = (SEMI$1[step] + alt + 120) % 12;
    const height = oct === void 0 ? mod$1(SEMI$1[step] + alt, 12) - 12 * 99 : SEMI$1[step] + alt + 12 * (oct + 1);
    const midi2 = height >= 0 && height <= 127 ? height : null;
    const freq2 = oct === void 0 ? null : Math.pow(2, (height - 69) / 12) * 440;
    return {
      empty: false,
      acc,
      alt,
      chroma: chroma2,
      coord,
      freq: freq2,
      height,
      letter,
      midi: midi2,
      name: name2,
      oct,
      pc,
      step
    };
  }
  function pitchName$5(props) {
    const { step, alt, oct } = props;
    const letter = stepToLetter$1(step);
    if (!letter) {
      return "";
    }
    const pc = letter + altToAcc$1(alt);
    return oct || oct === 0 ? pc + oct : pc;
  }
  function transpose$3(noteName, intervalName) {
    const note2 = note$1(noteName);
    const intervalCoord = Array.isArray(intervalName) ? intervalName : interval$4(intervalName).coord;
    if (note2.empty || !intervalCoord || intervalCoord.length < 2) {
      return "";
    }
    const noteCoord = note2.coord;
    const tr2 = noteCoord.length === 1 ? [noteCoord[0] + intervalCoord[0]] : [noteCoord[0] + intervalCoord[0], noteCoord[1] + intervalCoord[1]];
    return coordToNote$1(tr2).name;
  }
  function distance$1(fromNote, toNote) {
    const from = note$1(fromNote);
    const to = note$1(toNote);
    if (from.empty || to.empty) {
      return "";
    }
    const fcoord = from.coord;
    const tcoord = to.coord;
    const fifths = tcoord[0] - fcoord[0];
    const octs = fcoord.length === 2 && tcoord.length === 2 ? tcoord[1] - fcoord[1] : -Math.floor(fifths * 7 / 12);
    const forceDescending = to.height === from.height && to.midi !== null && from.midi !== null && from.step > to.step;
    return coordToInterval$1([fifths, octs], forceDescending).name;
  }
  Object.freeze({
    empty: true,
    name: "",
    num: NaN,
    q: "",
    type: "",
    step: NaN,
    alt: NaN,
    dir: NaN,
    simple: NaN,
    semitones: NaN,
    chroma: NaN,
    coord: [],
    oct: NaN
  });
  function rotate(times2, arr) {
    const len = arr.length;
    const n = (times2 % len + len) % len;
    return arr.slice(n, len).concat(arr.slice(0, n));
  }
  function compact(arr) {
    return arr.filter((n) => n === 0 || n);
  }
  function isNamedPitch$3(src) {
    return src !== null && typeof src === "object" && "name" in src && typeof src.name === "string" ? true : false;
  }
  function isPitch$3(pitch2) {
    return pitch2 !== null && typeof pitch2 === "object" && "step" in pitch2 && typeof pitch2.step === "number" && "alt" in pitch2 && typeof pitch2.alt === "number" && !isNaN(pitch2.step) && !isNaN(pitch2.alt) ? true : false;
  }
  var FIFTHS$3 = [0, 2, 4, -1, 1, 3, 5];
  var STEPS_TO_OCTS$3 = FIFTHS$3.map(
    (fifths) => Math.floor(fifths * 7 / 12)
  );
  function coordinates$3(pitch2) {
    const { step, alt, oct, dir = 1 } = pitch2;
    const f = FIFTHS$3[step] + 7 * alt;
    if (oct === void 0) {
      return [dir * f];
    }
    const o = oct - STEPS_TO_OCTS$3[step] - 4 * alt;
    return [dir * f, dir * o];
  }
  var fillStr$4 = (s, n) => Array(Math.abs(n) + 1).join(s);
  var NoInterval$3 = Object.freeze({
    empty: true,
    name: "",
    num: NaN,
    q: "",
    type: "",
    step: NaN,
    alt: NaN,
    dir: NaN,
    simple: NaN,
    semitones: NaN,
    chroma: NaN,
    coord: [],
    oct: NaN
  });
  var INTERVAL_TONAL_REGEX$3 = "([-+]?\\d+)(d{1,4}|m|M|P|A{1,4})";
  var INTERVAL_SHORTHAND_REGEX$3 = "(AA|A|P|M|m|d|dd)([-+]?\\d+)";
  var REGEX$6 = new RegExp(
    "^" + INTERVAL_TONAL_REGEX$3 + "|" + INTERVAL_SHORTHAND_REGEX$3 + "$"
  );
  function tokenizeInterval$3(str) {
    const m = REGEX$6.exec(`${str}`);
    if (m === null) {
      return ["", ""];
    }
    return m[1] ? [m[1], m[2]] : [m[4], m[3]];
  }
  var cache$6 = {};
  function interval$3(src) {
    return typeof src === "string" ? cache$6[src] || (cache$6[src] = parse$5(src)) : isPitch$3(src) ? interval$3(pitchName$4(src)) : isNamedPitch$3(src) ? interval$3(src.name) : NoInterval$3;
  }
  var SIZES$3 = [0, 2, 4, 5, 7, 9, 11];
  var TYPES$3 = "PMMPPMM";
  function parse$5(str) {
    const tokens = tokenizeInterval$3(str);
    if (tokens[0] === "") {
      return NoInterval$3;
    }
    const num = +tokens[0];
    const q = tokens[1];
    const step = (Math.abs(num) - 1) % 7;
    const t = TYPES$3[step];
    if (t === "M" && q === "P") {
      return NoInterval$3;
    }
    const type = t === "M" ? "majorable" : "perfectable";
    const name2 = "" + num + q;
    const dir = num < 0 ? -1 : 1;
    const simple = num === 8 || num === -8 ? num : dir * (step + 1);
    const alt = qToAlt$3(type, q);
    const oct = Math.floor((Math.abs(num) - 1) / 7);
    const semitones = dir * (SIZES$3[step] + alt + 12 * oct);
    const chroma2 = (dir * (SIZES$3[step] + alt) % 12 + 12) % 12;
    const coord = coordinates$3({ step, alt, oct, dir });
    return {
      empty: false,
      name: name2,
      num,
      q,
      step,
      alt,
      dir,
      type,
      simple,
      semitones,
      chroma: chroma2,
      coord,
      oct
    };
  }
  function qToAlt$3(type, q) {
    return q === "M" && type === "majorable" || q === "P" && type === "perfectable" ? 0 : q === "m" && type === "majorable" ? -1 : /^A+$/.test(q) ? q.length : /^d+$/.test(q) ? -1 * (type === "perfectable" ? q.length : q.length + 1) : 0;
  }
  function pitchName$4(props) {
    const { step, alt, oct = 0, dir } = props;
    if (!dir) {
      return "";
    }
    const calcNum = step + 1 + 7 * oct;
    const num = calcNum === 0 ? step + 1 : calcNum;
    const d = dir < 0 ? "-" : "";
    const type = TYPES$3[step] === "M" ? "majorable" : "perfectable";
    const name2 = d + num + altToQ$3(type, alt);
    return name2;
  }
  function altToQ$3(type, alt) {
    if (alt === 0) {
      return type === "majorable" ? "M" : "P";
    } else if (alt === -1 && type === "majorable") {
      return "m";
    } else if (alt > 0) {
      return fillStr$4("A", alt);
    } else {
      return fillStr$4("d", type === "perfectable" ? alt : alt + 1);
    }
  }
  var EmptyPcset = {
    empty: true,
    name: "",
    setNum: 0,
    chroma: "000000000000",
    normalized: "000000000000",
    intervals: []
  };
  var setNumToChroma = (num2) => Number(num2).toString(2).padStart(12, "0");
  var chromaToNumber = (chroma2) => parseInt(chroma2, 2);
  var REGEX$5 = /^[01]{12}$/;
  function isChroma(set) {
    return REGEX$5.test(set);
  }
  var isPcsetNum = (set) => typeof set === "number" && set >= 0 && set <= 4095;
  var isPcset = (set) => set && isChroma(set.chroma);
  var cache$5 = { [EmptyPcset.chroma]: EmptyPcset };
  function get$6(src) {
    const chroma2 = isChroma(src) ? src : isPcsetNum(src) ? setNumToChroma(src) : Array.isArray(src) ? listToChroma(src) : isPcset(src) ? src.chroma : EmptyPcset.chroma;
    return cache$5[chroma2] = cache$5[chroma2] || chromaToPcset(chroma2);
  }
  var IVLS = [
    "1P",
    "2m",
    "2M",
    "3m",
    "3M",
    "4P",
    "5d",
    "5P",
    "6m",
    "6M",
    "7m",
    "7M"
  ];
  function chromaToIntervals(chroma2) {
    const intervals2 = [];
    for (let i = 0; i < 12; i++) {
      if (chroma2.charAt(i) === "1")
        intervals2.push(IVLS[i]);
    }
    return intervals2;
  }
  function modes$1(set, normalize = true) {
    const pcs = get$6(set);
    const binary = pcs.chroma.split("");
    return compact(
      binary.map((_, i) => {
        const r = rotate(i, binary);
        return normalize && r[0] === "0" ? null : r.join("");
      })
    );
  }
  function isSubsetOf(set) {
    const s = get$6(set).setNum;
    return (notes2) => {
      const o = get$6(notes2).setNum;
      return s && s !== o && (o & s) === o;
    };
  }
  function isSupersetOf(set) {
    const s = get$6(set).setNum;
    return (notes2) => {
      const o = get$6(notes2).setNum;
      return s && s !== o && (o | s) === o;
    };
  }
  function chromaRotations(chroma2) {
    const binary = chroma2.split("");
    return binary.map((_, i) => rotate(i, binary).join(""));
  }
  function chromaToPcset(chroma2) {
    const setNum = chromaToNumber(chroma2);
    const normalizedNum = chromaRotations(chroma2).map(chromaToNumber).filter((n) => n >= 2048).sort()[0];
    const normalized = setNumToChroma(normalizedNum);
    const intervals2 = chromaToIntervals(chroma2);
    return {
      empty: false,
      name: "",
      setNum,
      chroma: chroma2,
      normalized,
      intervals: intervals2
    };
  }
  function listToChroma(set) {
    if (set.length === 0) {
      return EmptyPcset.chroma;
    }
    let pitch2;
    const binary = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < set.length; i++) {
      pitch2 = note$1(set[i]);
      if (pitch2.empty)
        pitch2 = interval$3(set[i]);
      if (!pitch2.empty)
        binary[pitch2.chroma] = 1;
    }
    return binary.join("");
  }
  var CHORDS$3 = [
    ["1P 3M 5P", "major", "M ^  maj"],
    ["1P 3M 5P 7M", "major seventh", "maj7 \u0394 ma7 M7 Maj7 ^7"],
    ["1P 3M 5P 7M 9M", "major ninth", "maj9 \u03949 ^9"],
    ["1P 3M 5P 7M 9M 13M", "major thirteenth", "maj13 Maj13 ^13"],
    ["1P 3M 5P 6M", "sixth", "6 add6 add13 M6"],
    ["1P 3M 5P 6M 9M", "sixth added ninth", "6add9 6/9 69 M69"],
    ["1P 3M 6m 7M", "major seventh flat sixth", "M7b6 ^7b6"],
    [
      "1P 3M 5P 7M 11A",
      "major seventh sharp eleventh",
      "maj#4 \u0394#4 \u0394#11 M7#11 ^7#11 maj7#11"
    ],
    ["1P 3m 5P", "minor", "m min -"],
    ["1P 3m 5P 7m", "minor seventh", "m7 min7 mi7 -7"],
    [
      "1P 3m 5P 7M",
      "minor/major seventh",
      "m/ma7 m/maj7 mM7 mMaj7 m/M7 -\u03947 m\u0394 -^7 -maj7"
    ],
    ["1P 3m 5P 6M", "minor sixth", "m6 -6"],
    ["1P 3m 5P 7m 9M", "minor ninth", "m9 -9"],
    ["1P 3m 5P 7M 9M", "minor/major ninth", "mM9 mMaj9 -^9"],
    ["1P 3m 5P 7m 9M 11P", "minor eleventh", "m11 -11"],
    ["1P 3m 5P 7m 9M 13M", "minor thirteenth", "m13 -13"],
    ["1P 3m 5d", "diminished", "dim \xB0 o"],
    ["1P 3m 5d 7d", "diminished seventh", "dim7 \xB07 o7"],
    ["1P 3m 5d 7m", "half-diminished", "m7b5 \xF8 -7b5 h7 h"],
    ["1P 3M 5P 7m", "dominant seventh", "7 dom"],
    ["1P 3M 5P 7m 9M", "dominant ninth", "9"],
    ["1P 3M 5P 7m 9M 13M", "dominant thirteenth", "13"],
    ["1P 3M 5P 7m 11A", "lydian dominant seventh", "7#11 7#4"],
    ["1P 3M 5P 7m 9m", "dominant flat ninth", "7b9"],
    ["1P 3M 5P 7m 9A", "dominant sharp ninth", "7#9"],
    ["1P 3M 7m 9m", "altered", "alt7"],
    ["1P 4P 5P", "suspended fourth", "sus4 sus"],
    ["1P 2M 5P", "suspended second", "sus2"],
    ["1P 4P 5P 7m", "suspended fourth seventh", "7sus4 7sus"],
    ["1P 5P 7m 9M 11P", "eleventh", "11"],
    [
      "1P 4P 5P 7m 9m",
      "suspended fourth flat ninth",
      "b9sus phryg 7b9sus 7b9sus4"
    ],
    ["1P 5P", "fifth", "5"],
    ["1P 3M 5A", "augmented", "aug + +5 ^#5"],
    ["1P 3m 5A", "minor augmented", "m#5 -#5 m+"],
    ["1P 3M 5A 7M", "augmented seventh", "maj7#5 maj7+5 +maj7 ^7#5"],
    [
      "1P 3M 5P 7M 9M 11A",
      "major sharp eleventh (lydian)",
      "maj9#11 \u03949#11 ^9#11"
    ],
    ["1P 2M 4P 5P", "", "sus24 sus4add9"],
    ["1P 3M 5A 7M 9M", "", "maj9#5 Maj9#5"],
    ["1P 3M 5A 7m", "", "7#5 +7 7+ 7aug aug7"],
    ["1P 3M 5A 7m 9A", "", "7#5#9 7#9#5 7alt"],
    ["1P 3M 5A 7m 9M", "", "9#5 9+"],
    ["1P 3M 5A 7m 9M 11A", "", "9#5#11"],
    ["1P 3M 5A 7m 9m", "", "7#5b9 7b9#5"],
    ["1P 3M 5A 7m 9m 11A", "", "7#5b9#11"],
    ["1P 3M 5A 9A", "", "+add#9"],
    ["1P 3M 5A 9M", "", "M#5add9 +add9"],
    ["1P 3M 5P 6M 11A", "", "M6#11 M6b5 6#11 6b5"],
    ["1P 3M 5P 6M 7M 9M", "", "M7add13"],
    ["1P 3M 5P 6M 9M 11A", "", "69#11"],
    ["1P 3m 5P 6M 9M", "", "m69 -69"],
    ["1P 3M 5P 6m 7m", "", "7b6"],
    ["1P 3M 5P 7M 9A 11A", "", "maj7#9#11"],
    ["1P 3M 5P 7M 9M 11A 13M", "", "M13#11 maj13#11 M13+4 M13#4"],
    ["1P 3M 5P 7M 9m", "", "M7b9"],
    ["1P 3M 5P 7m 11A 13m", "", "7#11b13 7b5b13"],
    ["1P 3M 5P 7m 13M", "", "7add6 67 7add13"],
    ["1P 3M 5P 7m 9A 11A", "", "7#9#11 7b5#9 7#9b5"],
    ["1P 3M 5P 7m 9A 11A 13M", "", "13#9#11"],
    ["1P 3M 5P 7m 9A 11A 13m", "", "7#9#11b13"],
    ["1P 3M 5P 7m 9A 13M", "", "13#9"],
    ["1P 3M 5P 7m 9A 13m", "", "7#9b13"],
    ["1P 3M 5P 7m 9M 11A", "", "9#11 9+4 9#4"],
    ["1P 3M 5P 7m 9M 11A 13M", "", "13#11 13+4 13#4"],
    ["1P 3M 5P 7m 9M 11A 13m", "", "9#11b13 9b5b13"],
    ["1P 3M 5P 7m 9m 11A", "", "7b9#11 7b5b9 7b9b5"],
    ["1P 3M 5P 7m 9m 11A 13M", "", "13b9#11"],
    ["1P 3M 5P 7m 9m 11A 13m", "", "7b9b13#11 7b9#11b13 7b5b9b13"],
    ["1P 3M 5P 7m 9m 13M", "", "13b9"],
    ["1P 3M 5P 7m 9m 13m", "", "7b9b13"],
    ["1P 3M 5P 7m 9m 9A", "", "7b9#9"],
    ["1P 3M 5P 9M", "", "Madd9 2 add9 add2"],
    ["1P 3M 5P 9m", "", "Maddb9"],
    ["1P 3M 5d", "", "Mb5"],
    ["1P 3M 5d 6M 7m 9M", "", "13b5"],
    ["1P 3M 5d 7M", "", "M7b5"],
    ["1P 3M 5d 7M 9M", "", "M9b5"],
    ["1P 3M 5d 7m", "", "7b5"],
    ["1P 3M 5d 7m 9M", "", "9b5"],
    ["1P 3M 7m", "", "7no5"],
    ["1P 3M 7m 13m", "", "7b13"],
    ["1P 3M 7m 9M", "", "9no5"],
    ["1P 3M 7m 9M 13M", "", "13no5"],
    ["1P 3M 7m 9M 13m", "", "9b13"],
    ["1P 3m 4P 5P", "", "madd4"],
    ["1P 3m 5P 6m 7M", "", "mMaj7b6"],
    ["1P 3m 5P 6m 7M 9M", "", "mMaj9b6"],
    ["1P 3m 5P 7m 11P", "", "m7add11 m7add4"],
    ["1P 3m 5P 9M", "", "madd9"],
    ["1P 3m 5d 6M 7M", "", "o7M7"],
    ["1P 3m 5d 7M", "", "oM7"],
    ["1P 3m 6m 7M", "", "mb6M7"],
    ["1P 3m 6m 7m", "", "m7#5"],
    ["1P 3m 6m 7m 9M", "", "m9#5"],
    ["1P 3m 5A 7m 9M 11P", "", "m11A"],
    ["1P 3m 6m 9m", "", "mb6b9"],
    ["1P 2M 3m 5d 7m", "", "m9b5"],
    ["1P 4P 5A 7M", "", "M7#5sus4"],
    ["1P 4P 5A 7M 9M", "", "M9#5sus4"],
    ["1P 4P 5A 7m", "", "7#5sus4"],
    ["1P 4P 5P 7M", "", "M7sus4"],
    ["1P 4P 5P 7M 9M", "", "M9sus4"],
    ["1P 4P 5P 7m 9M", "", "9sus4 9sus"],
    ["1P 4P 5P 7m 9M 13M", "", "13sus4 13sus"],
    ["1P 4P 5P 7m 9m 13m", "", "7sus4b9b13 7b9b13sus4"],
    ["1P 4P 7m 10m", "", "4 quartal"],
    ["1P 5P 7m 9m 11P", "", "11b9"]
  ];
  var data_default$4 = CHORDS$3;
  ({
    ...EmptyPcset,
    name: "",
    quality: "Unknown",
    intervals: [],
    aliases: []
  });
  var dictionary$4 = [];
  var index$5 = {};
  function all$2() {
    return dictionary$4.slice();
  }
  function add$4(intervals, aliases, fullName) {
    const quality = getQuality$3(intervals);
    const chord2 = {
      ...get$6(intervals),
      name: fullName || "",
      quality,
      intervals,
      aliases
    };
    dictionary$4.push(chord2);
    if (chord2.name) {
      index$5[chord2.name] = chord2;
    }
    index$5[chord2.setNum] = chord2;
    index$5[chord2.chroma] = chord2;
    chord2.aliases.forEach((alias) => addAlias$4(chord2, alias));
  }
  function addAlias$4(chord2, alias) {
    index$5[alias] = chord2;
  }
  function getQuality$3(intervals) {
    const has = (interval2) => intervals.indexOf(interval2) !== -1;
    return has("5A") ? "Augmented" : has("3M") ? "Major" : has("5d") ? "Diminished" : has("3m") ? "Minor" : "Unknown";
  }
  data_default$4.forEach(
    ([ivls, fullName, names2]) => add$4(ivls.split(" "), names2.split(" "), fullName)
  );
  dictionary$4.sort((a, b) => a.setNum - b.setNum);
  var namedSet = (notes) => {
    const pcToName = notes.reduce((record, n) => {
      const chroma2 = note$1(n).chroma;
      if (chroma2 !== void 0) {
        record[chroma2] = record[chroma2] || note$1(n).name;
      }
      return record;
    }, {});
    return (chroma2) => pcToName[chroma2];
  };
  function detect(source, options = {}) {
    const notes = source.map((n) => note$1(n).pc).filter((x) => x);
    if (note$1.length === 0) {
      return [];
    }
    const found = findMatches(notes, 1, options);
    return found.filter((chord2) => chord2.weight).sort((a, b) => b.weight - a.weight).map((chord2) => chord2.name);
  }
  var BITMASK = {
    anyThirds: 384,
    perfectFifth: 16,
    nonPerfectFifths: 40,
    anySeventh: 3
  };
  var testChromaNumber = (bitmask) => (chromaNumber) => Boolean(chromaNumber & bitmask);
  var hasAnyThird = testChromaNumber(BITMASK.anyThirds);
  var hasPerfectFifth = testChromaNumber(BITMASK.perfectFifth);
  var hasAnySeventh = testChromaNumber(BITMASK.anySeventh);
  var hasNonPerfectFifth = testChromaNumber(BITMASK.nonPerfectFifths);
  function hasAnyThirdAndPerfectFifthAndAnySeventh(chordType) {
    const chromaNumber = parseInt(chordType.chroma, 2);
    return hasAnyThird(chromaNumber) && hasPerfectFifth(chromaNumber) && hasAnySeventh(chromaNumber);
  }
  function withPerfectFifth(chroma2) {
    const chromaNumber = parseInt(chroma2, 2);
    return hasNonPerfectFifth(chromaNumber) ? chroma2 : (chromaNumber | 16).toString(2);
  }
  function findMatches(notes, weight, options) {
    const tonic = notes[0];
    const tonicChroma = note$1(tonic).chroma;
    const noteName = namedSet(notes);
    const allModes = modes$1(notes, false);
    const found = [];
    allModes.forEach((mode, index2) => {
      const modeWithPerfectFifth = options.assumePerfectFifth && withPerfectFifth(mode);
      const chordTypes = all$2().filter((chordType) => {
        if (options.assumePerfectFifth && hasAnyThirdAndPerfectFifthAndAnySeventh(chordType)) {
          return chordType.chroma === modeWithPerfectFifth;
        }
        return chordType.chroma === mode;
      });
      chordTypes.forEach((chordType) => {
        const chordName = chordType.aliases[0];
        const baseNote = noteName(index2);
        const isInversion = index2 !== tonicChroma;
        if (isInversion) {
          found.push({
            weight: 0.5 * weight,
            name: `${baseNote}${chordName}/${tonic}`
          });
        } else {
          found.push({ weight: 1 * weight, name: `${baseNote}${chordName}` });
        }
      });
    });
    return found;
  }
  function isNamedPitch$2(src) {
    return src !== null && typeof src === "object" && "name" in src && typeof src.name === "string" ? true : false;
  }
  function isPitch$2(pitch2) {
    return pitch2 !== null && typeof pitch2 === "object" && "step" in pitch2 && typeof pitch2.step === "number" && "alt" in pitch2 && typeof pitch2.alt === "number" ? true : false;
  }
  var FIFTHS$2 = [0, 2, 4, -1, 1, 3, 5];
  var STEPS_TO_OCTS$2 = FIFTHS$2.map(
    (fifths) => Math.floor(fifths * 7 / 12)
  );
  function coordinates$2(pitch2) {
    const { step, alt, oct, dir = 1 } = pitch2;
    const f = FIFTHS$2[step] + 7 * alt;
    if (oct === void 0) {
      return [dir * f];
    }
    const o = oct - STEPS_TO_OCTS$2[step] - 4 * alt;
    return [dir * f, dir * o];
  }
  var FIFTHS_TO_STEPS = [3, 0, 4, 1, 5, 2, 6];
  function pitch(coord) {
    const [f, o, dir] = coord;
    const step = FIFTHS_TO_STEPS[unaltered(f)];
    const alt = Math.floor((f + 1) / 7);
    if (o === void 0) {
      return { step, alt, dir };
    }
    const oct = o + 4 * alt + STEPS_TO_OCTS$2[step];
    return { step, alt, oct, dir };
  }
  function unaltered(f) {
    const i = (f + 1) % 7;
    return i < 0 ? 7 + i : i;
  }
  var fillStr$3 = (s, n) => Array(Math.abs(n) + 1).join(s);
  var NoInterval$2 = { empty: true, name: "", acc: "" };
  var INTERVAL_TONAL_REGEX$2 = "([-+]?\\d+)(d{1,4}|m|M|P|A{1,4})";
  var INTERVAL_SHORTHAND_REGEX$2 = "(AA|A|P|M|m|d|dd)([-+]?\\d+)";
  var REGEX$4 = new RegExp(
    "^" + INTERVAL_TONAL_REGEX$2 + "|" + INTERVAL_SHORTHAND_REGEX$2 + "$"
  );
  function tokenizeInterval$2(str) {
    const m = REGEX$4.exec(`${str}`);
    if (m === null) {
      return ["", ""];
    }
    return m[1] ? [m[1], m[2]] : [m[4], m[3]];
  }
  var cache$4 = {};
  function interval$2(src) {
    return typeof src === "string" ? cache$4[src] || (cache$4[src] = parse$4(src)) : isPitch$2(src) ? interval$2(pitchName$3(src)) : isNamedPitch$2(src) ? interval$2(src.name) : NoInterval$2;
  }
  var SIZES$2 = [0, 2, 4, 5, 7, 9, 11];
  var TYPES$2 = "PMMPPMM";
  function parse$4(str) {
    const tokens = tokenizeInterval$2(str);
    if (tokens[0] === "") {
      return NoInterval$2;
    }
    const num = +tokens[0];
    const q = tokens[1];
    const step = (Math.abs(num) - 1) % 7;
    const t = TYPES$2[step];
    if (t === "M" && q === "P") {
      return NoInterval$2;
    }
    const type = t === "M" ? "majorable" : "perfectable";
    const name2 = "" + num + q;
    const dir = num < 0 ? -1 : 1;
    const simple = num === 8 || num === -8 ? num : dir * (step + 1);
    const alt = qToAlt$2(type, q);
    const oct = Math.floor((Math.abs(num) - 1) / 7);
    const semitones = dir * (SIZES$2[step] + alt + 12 * oct);
    const chroma2 = (dir * (SIZES$2[step] + alt) % 12 + 12) % 12;
    const coord = coordinates$2({ step, alt, oct, dir });
    return {
      empty: false,
      name: name2,
      num,
      q,
      step,
      alt,
      dir,
      type,
      simple,
      semitones,
      chroma: chroma2,
      coord,
      oct
    };
  }
  function coordToInterval(coord, forceDescending) {
    const [f, o = 0] = coord;
    const isDescending = f * 7 + o * 12 < 0;
    const ivl = forceDescending || isDescending ? [-f, -o, -1] : [f, o, 1];
    return interval$2(pitch(ivl));
  }
  function qToAlt$2(type, q) {
    return q === "M" && type === "majorable" || q === "P" && type === "perfectable" ? 0 : q === "m" && type === "majorable" ? -1 : /^A+$/.test(q) ? q.length : /^d+$/.test(q) ? -1 * (type === "perfectable" ? q.length : q.length + 1) : 0;
  }
  function pitchName$3(props) {
    const { step, alt, oct = 0, dir } = props;
    if (!dir) {
      return "";
    }
    const calcNum = step + 1 + 7 * oct;
    const num = calcNum === 0 ? step + 1 : calcNum;
    const d = dir < 0 ? "-" : "";
    const type = TYPES$2[step] === "M" ? "majorable" : "perfectable";
    const name2 = d + num + altToQ$2(type, alt);
    return name2;
  }
  function altToQ$2(type, alt) {
    if (alt === 0) {
      return type === "majorable" ? "M" : "P";
    } else if (alt === -1 && type === "majorable") {
      return "m";
    } else if (alt > 0) {
      return fillStr$3("A", alt);
    } else {
      return fillStr$3("d", type === "perfectable" ? alt : alt + 1);
    }
  }
  var fillStr$2 = (s, n) => Array(Math.abs(n) + 1).join(s);
  var NoNote = { empty: true, name: "", pc: "", acc: "" };
  var cache$3 = /* @__PURE__ */ new Map();
  var stepToLetter = (step) => "CDEFGAB".charAt(step);
  var altToAcc = (alt) => alt < 0 ? fillStr$2("b", -alt) : fillStr$2("#", alt);
  var accToAlt = (acc) => acc[0] === "b" ? -acc.length : acc.length;
  function note(src) {
    const stringSrc = JSON.stringify(src);
    const cached = cache$3.get(stringSrc);
    if (cached) {
      return cached;
    }
    const value = typeof src === "string" ? parse$3(src) : isPitch$2(src) ? note(pitchName$2(src)) : isNamedPitch$2(src) ? note(src.name) : NoNote;
    cache$3.set(stringSrc, value);
    return value;
  }
  var REGEX$3 = /^([a-gA-G]?)(#{1,}|b{1,}|x{1,}|)(-?\d*)\s*(.*)$/;
  function tokenizeNote(str) {
    const m = REGEX$3.exec(str);
    return m ? [m[1].toUpperCase(), m[2].replace(/x/g, "##"), m[3], m[4]] : ["", "", "", ""];
  }
  function coordToNote(noteCoord) {
    return note(pitch(noteCoord));
  }
  var mod = (n, m) => (n % m + m) % m;
  var SEMI = [0, 2, 4, 5, 7, 9, 11];
  function parse$3(noteName) {
    const tokens = tokenizeNote(noteName);
    if (tokens[0] === "" || tokens[3] !== "") {
      return NoNote;
    }
    const letter = tokens[0];
    const acc = tokens[1];
    const octStr = tokens[2];
    const step = (letter.charCodeAt(0) + 3) % 7;
    const alt = accToAlt(acc);
    const oct = octStr.length ? +octStr : void 0;
    const coord = coordinates$2({ step, alt, oct });
    const name2 = letter + acc + octStr;
    const pc = letter + acc;
    const chroma2 = (SEMI[step] + alt + 120) % 12;
    const height = oct === void 0 ? mod(SEMI[step] + alt, 12) - 12 * 99 : SEMI[step] + alt + 12 * (oct + 1);
    const midi2 = height >= 0 && height <= 127 ? height : null;
    const freq2 = oct === void 0 ? null : Math.pow(2, (height - 69) / 12) * 440;
    return {
      empty: false,
      acc,
      alt,
      chroma: chroma2,
      coord,
      freq: freq2,
      height,
      letter,
      midi: midi2,
      name: name2,
      oct,
      pc,
      step
    };
  }
  function pitchName$2(props) {
    const { step, alt, oct } = props;
    const letter = stepToLetter(step);
    if (!letter) {
      return "";
    }
    const pc = letter + altToAcc(alt);
    return oct || oct === 0 ? pc + oct : pc;
  }
  function transpose$2(noteName, intervalName) {
    const note$12 = note(noteName);
    const intervalCoord = Array.isArray(intervalName) ? intervalName : interval$2(intervalName).coord;
    if (note$12.empty || !intervalCoord || intervalCoord.length < 2) {
      return "";
    }
    const noteCoord = note$12.coord;
    const tr2 = noteCoord.length === 1 ? [noteCoord[0] + intervalCoord[0]] : [noteCoord[0] + intervalCoord[0], noteCoord[1] + intervalCoord[1]];
    return coordToNote(tr2).name;
  }
  function tonicIntervalsTransposer(intervals, tonic) {
    const len = intervals.length;
    return (normalized) => {
      if (!tonic)
        return "";
      const index2 = normalized < 0 ? (len - -normalized % len) % len : normalized % len;
      const octaves = Math.floor(normalized / len);
      const root = transpose$2(tonic, [0, octaves]);
      return transpose$2(root, intervals[index2]);
    };
  }
  function distance(fromNote, toNote) {
    const from = note(fromNote);
    const to = note(toNote);
    if (from.empty || to.empty) {
      return "";
    }
    const fcoord = from.coord;
    const tcoord = to.coord;
    const fifths = tcoord[0] - fcoord[0];
    const octs = fcoord.length === 2 && tcoord.length === 2 ? tcoord[1] - fcoord[1] : -Math.floor(fifths * 7 / 12);
    const forceDescending = to.height === from.height && to.midi !== null && from.midi !== null && from.step > to.step;
    return coordToInterval([fifths, octs], forceDescending).name;
  }
  function deprecate$1(original, alternative, fn) {
    return function(...args) {
      console.warn(`${original} is deprecated. Use ${alternative}.`);
      return fn.apply(this, args);
    };
  }
  var CHORDS$2 = [
    ["1P 3M 5P", "major", "M ^  maj"],
    ["1P 3M 5P 7M", "major seventh", "maj7 \u0394 ma7 M7 Maj7 ^7"],
    ["1P 3M 5P 7M 9M", "major ninth", "maj9 \u03949 ^9"],
    ["1P 3M 5P 7M 9M 13M", "major thirteenth", "maj13 Maj13 ^13"],
    ["1P 3M 5P 6M", "sixth", "6 add6 add13 M6"],
    ["1P 3M 5P 6M 9M", "sixth added ninth", "6add9 6/9 69 M69"],
    ["1P 3M 6m 7M", "major seventh flat sixth", "M7b6 ^7b6"],
    [
      "1P 3M 5P 7M 11A",
      "major seventh sharp eleventh",
      "maj#4 \u0394#4 \u0394#11 M7#11 ^7#11 maj7#11"
    ],
    ["1P 3m 5P", "minor", "m min -"],
    ["1P 3m 5P 7m", "minor seventh", "m7 min7 mi7 -7"],
    [
      "1P 3m 5P 7M",
      "minor/major seventh",
      "m/ma7 m/maj7 mM7 mMaj7 m/M7 -\u03947 m\u0394 -^7"
    ],
    ["1P 3m 5P 6M", "minor sixth", "m6 -6"],
    ["1P 3m 5P 7m 9M", "minor ninth", "m9 -9"],
    ["1P 3m 5P 7M 9M", "minor/major ninth", "mM9 mMaj9 -^9"],
    ["1P 3m 5P 7m 9M 11P", "minor eleventh", "m11 -11"],
    ["1P 3m 5P 7m 9M 13M", "minor thirteenth", "m13 -13"],
    ["1P 3m 5d", "diminished", "dim \xB0 o"],
    ["1P 3m 5d 7d", "diminished seventh", "dim7 \xB07 o7"],
    ["1P 3m 5d 7m", "half-diminished", "m7b5 \xF8 -7b5 h7 h"],
    ["1P 3M 5P 7m", "dominant seventh", "7 dom"],
    ["1P 3M 5P 7m 9M", "dominant ninth", "9"],
    ["1P 3M 5P 7m 9M 13M", "dominant thirteenth", "13"],
    ["1P 3M 5P 7m 11A", "lydian dominant seventh", "7#11 7#4"],
    ["1P 3M 5P 7m 9m", "dominant flat ninth", "7b9"],
    ["1P 3M 5P 7m 9A", "dominant sharp ninth", "7#9"],
    ["1P 3M 7m 9m", "altered", "alt7"],
    ["1P 4P 5P", "suspended fourth", "sus4 sus"],
    ["1P 2M 5P", "suspended second", "sus2"],
    ["1P 4P 5P 7m", "suspended fourth seventh", "7sus4 7sus"],
    ["1P 5P 7m 9M 11P", "eleventh", "11"],
    [
      "1P 4P 5P 7m 9m",
      "suspended fourth flat ninth",
      "b9sus phryg 7b9sus 7b9sus4"
    ],
    ["1P 5P", "fifth", "5"],
    ["1P 3M 5A", "augmented", "aug + +5 ^#5"],
    ["1P 3m 5A", "minor augmented", "m#5 -#5 m+"],
    ["1P 3M 5A 7M", "augmented seventh", "maj7#5 maj7+5 +maj7 ^7#5"],
    [
      "1P 3M 5P 7M 9M 11A",
      "major sharp eleventh (lydian)",
      "maj9#11 \u03949#11 ^9#11"
    ],
    ["1P 2M 4P 5P", "", "sus24 sus4add9"],
    ["1P 3M 5A 7M 9M", "", "maj9#5 Maj9#5"],
    ["1P 3M 5A 7m", "", "7#5 +7 7+ 7aug aug7"],
    ["1P 3M 5A 7m 9A", "", "7#5#9 7#9#5 7alt"],
    ["1P 3M 5A 7m 9M", "", "9#5 9+"],
    ["1P 3M 5A 7m 9M 11A", "", "9#5#11"],
    ["1P 3M 5A 7m 9m", "", "7#5b9 7b9#5"],
    ["1P 3M 5A 7m 9m 11A", "", "7#5b9#11"],
    ["1P 3M 5A 9A", "", "+add#9"],
    ["1P 3M 5A 9M", "", "M#5add9 +add9"],
    ["1P 3M 5P 6M 11A", "", "M6#11 M6b5 6#11 6b5"],
    ["1P 3M 5P 6M 7M 9M", "", "M7add13"],
    ["1P 3M 5P 6M 9M 11A", "", "69#11"],
    ["1P 3m 5P 6M 9M", "", "m69 -69"],
    ["1P 3M 5P 6m 7m", "", "7b6"],
    ["1P 3M 5P 7M 9A 11A", "", "maj7#9#11"],
    ["1P 3M 5P 7M 9M 11A 13M", "", "M13#11 maj13#11 M13+4 M13#4"],
    ["1P 3M 5P 7M 9m", "", "M7b9"],
    ["1P 3M 5P 7m 11A 13m", "", "7#11b13 7b5b13"],
    ["1P 3M 5P 7m 13M", "", "7add6 67 7add13"],
    ["1P 3M 5P 7m 9A 11A", "", "7#9#11 7b5#9 7#9b5"],
    ["1P 3M 5P 7m 9A 11A 13M", "", "13#9#11"],
    ["1P 3M 5P 7m 9A 11A 13m", "", "7#9#11b13"],
    ["1P 3M 5P 7m 9A 13M", "", "13#9"],
    ["1P 3M 5P 7m 9A 13m", "", "7#9b13"],
    ["1P 3M 5P 7m 9M 11A", "", "9#11 9+4 9#4"],
    ["1P 3M 5P 7m 9M 11A 13M", "", "13#11 13+4 13#4"],
    ["1P 3M 5P 7m 9M 11A 13m", "", "9#11b13 9b5b13"],
    ["1P 3M 5P 7m 9m 11A", "", "7b9#11 7b5b9 7b9b5"],
    ["1P 3M 5P 7m 9m 11A 13M", "", "13b9#11"],
    ["1P 3M 5P 7m 9m 11A 13m", "", "7b9b13#11 7b9#11b13 7b5b9b13"],
    ["1P 3M 5P 7m 9m 13M", "", "13b9"],
    ["1P 3M 5P 7m 9m 13m", "", "7b9b13"],
    ["1P 3M 5P 7m 9m 9A", "", "7b9#9"],
    ["1P 3M 5P 9M", "", "Madd9 2 add9 add2"],
    ["1P 3M 5P 9m", "", "Maddb9"],
    ["1P 3M 5d", "", "Mb5"],
    ["1P 3M 5d 6M 7m 9M", "", "13b5"],
    ["1P 3M 5d 7M", "", "M7b5"],
    ["1P 3M 5d 7M 9M", "", "M9b5"],
    ["1P 3M 5d 7m", "", "7b5"],
    ["1P 3M 5d 7m 9M", "", "9b5"],
    ["1P 3M 7m", "", "7no5"],
    ["1P 3M 7m 13m", "", "7b13"],
    ["1P 3M 7m 9M", "", "9no5"],
    ["1P 3M 7m 9M 13M", "", "13no5"],
    ["1P 3M 7m 9M 13m", "", "9b13"],
    ["1P 3m 4P 5P", "", "madd4"],
    ["1P 3m 5P 6m 7M", "", "mMaj7b6"],
    ["1P 3m 5P 6m 7M 9M", "", "mMaj9b6"],
    ["1P 3m 5P 7m 11P", "", "m7add11 m7add4"],
    ["1P 3m 5P 9M", "", "madd9"],
    ["1P 3m 5d 6M 7M", "", "o7M7"],
    ["1P 3m 5d 7M", "", "oM7"],
    ["1P 3m 6m 7M", "", "mb6M7"],
    ["1P 3m 6m 7m", "", "m7#5"],
    ["1P 3m 6m 7m 9M", "", "m9#5"],
    ["1P 3m 5A 7m 9M 11P", "", "m11A"],
    ["1P 3m 6m 9m", "", "mb6b9"],
    ["1P 2M 3m 5d 7m", "", "m9b5"],
    ["1P 4P 5A 7M", "", "M7#5sus4"],
    ["1P 4P 5A 7M 9M", "", "M9#5sus4"],
    ["1P 4P 5A 7m", "", "7#5sus4"],
    ["1P 4P 5P 7M", "", "M7sus4"],
    ["1P 4P 5P 7M 9M", "", "M9sus4"],
    ["1P 4P 5P 7m 9M", "", "9sus4 9sus"],
    ["1P 4P 5P 7m 9M 13M", "", "13sus4 13sus"],
    ["1P 4P 5P 7m 9m 13m", "", "7sus4b9b13 7b9b13sus4"],
    ["1P 4P 7m 10m", "", "4 quartal"],
    ["1P 5P 7m 9m 11P", "", "11b9"]
  ];
  var data_default$3 = CHORDS$2;
  var NoChordType = {
    ...EmptyPcset,
    name: "",
    quality: "Unknown",
    intervals: [],
    aliases: []
  };
  var dictionary$3 = [];
  var index$4 = {};
  function get$5(type) {
    return index$4[type] || NoChordType;
  }
  function all$1() {
    return dictionary$3.slice();
  }
  function add$3(intervals, aliases, fullName) {
    const quality = getQuality$2(intervals);
    const chord2 = {
      ...get$6(intervals),
      name: fullName || "",
      quality,
      intervals,
      aliases
    };
    dictionary$3.push(chord2);
    if (chord2.name) {
      index$4[chord2.name] = chord2;
    }
    index$4[chord2.setNum] = chord2;
    index$4[chord2.chroma] = chord2;
    chord2.aliases.forEach((alias) => addAlias$3(chord2, alias));
  }
  function addAlias$3(chord2, alias) {
    index$4[alias] = chord2;
  }
  function getQuality$2(intervals) {
    const has = (interval2) => intervals.indexOf(interval2) !== -1;
    return has("5A") ? "Augmented" : has("3M") ? "Major" : has("5d") ? "Diminished" : has("3m") ? "Minor" : "Unknown";
  }
  data_default$3.forEach(
    ([ivls, fullName, names2]) => add$3(ivls.split(" "), names2.split(" "), fullName)
  );
  dictionary$3.sort((a, b) => a.setNum - b.setNum);
  Object.freeze({
    empty: true,
    name: "",
    num: NaN,
    q: "",
    type: "",
    step: NaN,
    alt: NaN,
    dir: NaN,
    simple: NaN,
    semitones: NaN,
    chroma: NaN,
    coord: [],
    oct: NaN
  });
  var SCALES = [
    ["1P 2M 3M 5P 6M", "major pentatonic", "pentatonic"],
    ["1P 2M 3M 4P 5P 6M 7M", "major", "ionian"],
    ["1P 2M 3m 4P 5P 6m 7m", "minor", "aeolian"],
    ["1P 2M 3m 3M 5P 6M", "major blues"],
    ["1P 3m 4P 5d 5P 7m", "minor blues", "blues"],
    ["1P 2M 3m 4P 5P 6M 7M", "melodic minor"],
    ["1P 2M 3m 4P 5P 6m 7M", "harmonic minor"],
    ["1P 2M 3M 4P 5P 6M 7m 7M", "bebop"],
    ["1P 2M 3m 4P 5d 6m 6M 7M", "diminished", "whole-half diminished"],
    ["1P 2M 3m 4P 5P 6M 7m", "dorian"],
    ["1P 2M 3M 4A 5P 6M 7M", "lydian"],
    ["1P 2M 3M 4P 5P 6M 7m", "mixolydian", "dominant"],
    ["1P 2m 3m 4P 5P 6m 7m", "phrygian"],
    ["1P 2m 3m 4P 5d 6m 7m", "locrian"],
    ["1P 3M 4P 5P 7M", "ionian pentatonic"],
    ["1P 3M 4P 5P 7m", "mixolydian pentatonic", "indian"],
    ["1P 2M 4P 5P 6M", "ritusen"],
    ["1P 2M 4P 5P 7m", "egyptian"],
    ["1P 3M 4P 5d 7m", "neopolitan major pentatonic"],
    ["1P 3m 4P 5P 6m", "vietnamese 1"],
    ["1P 2m 3m 5P 6m", "pelog"],
    ["1P 2m 4P 5P 6m", "kumoijoshi"],
    ["1P 2M 3m 5P 6m", "hirajoshi"],
    ["1P 2m 4P 5d 7m", "iwato"],
    ["1P 2m 4P 5P 7m", "in-sen"],
    ["1P 3M 4A 5P 7M", "lydian pentatonic", "chinese"],
    ["1P 3m 4P 6m 7m", "malkos raga"],
    ["1P 3m 4P 5d 7m", "locrian pentatonic", "minor seven flat five pentatonic"],
    ["1P 3m 4P 5P 7m", "minor pentatonic", "vietnamese 2"],
    ["1P 3m 4P 5P 6M", "minor six pentatonic"],
    ["1P 2M 3m 5P 6M", "flat three pentatonic", "kumoi"],
    ["1P 2M 3M 5P 6m", "flat six pentatonic"],
    ["1P 2m 3M 5P 6M", "scriabin"],
    ["1P 3M 5d 6m 7m", "whole tone pentatonic"],
    ["1P 3M 4A 5A 7M", "lydian #5P pentatonic"],
    ["1P 3M 4A 5P 7m", "lydian dominant pentatonic"],
    ["1P 3m 4P 5P 7M", "minor #7M pentatonic"],
    ["1P 3m 4d 5d 7m", "super locrian pentatonic"],
    ["1P 2M 3m 4P 5P 7M", "minor hexatonic"],
    ["1P 2A 3M 5P 5A 7M", "augmented"],
    ["1P 2M 4P 5P 6M 7m", "piongio"],
    ["1P 2m 3M 4A 6M 7m", "prometheus neopolitan"],
    ["1P 2M 3M 4A 6M 7m", "prometheus"],
    ["1P 2m 3M 5d 6m 7m", "mystery #1"],
    ["1P 2m 3M 4P 5A 6M", "six tone symmetric"],
    ["1P 2M 3M 4A 5A 6A", "whole tone", "messiaen's mode #1"],
    ["1P 2m 4P 4A 5P 7M", "messiaen's mode #5"],
    ["1P 2M 3M 4P 5d 6m 7m", "locrian major", "arabian"],
    ["1P 2m 3M 4A 5P 6m 7M", "double harmonic lydian"],
    [
      "1P 2m 2A 3M 4A 6m 7m",
      "altered",
      "super locrian",
      "diminished whole tone",
      "pomeroy"
    ],
    ["1P 2M 3m 4P 5d 6m 7m", "locrian #2", "half-diminished", "aeolian b5"],
    [
      "1P 2M 3M 4P 5P 6m 7m",
      "mixolydian b6",
      "melodic minor fifth mode",
      "hindu"
    ],
    ["1P 2M 3M 4A 5P 6M 7m", "lydian dominant", "lydian b7", "overtone"],
    ["1P 2M 3M 4A 5A 6M 7M", "lydian augmented"],
    [
      "1P 2m 3m 4P 5P 6M 7m",
      "dorian b2",
      "phrygian #6",
      "melodic minor second mode"
    ],
    [
      "1P 2m 3m 4d 5d 6m 7d",
      "ultralocrian",
      "superlocrian bb7",
      "superlocrian diminished"
    ],
    ["1P 2m 3m 4P 5d 6M 7m", "locrian 6", "locrian natural 6", "locrian sharp 6"],
    ["1P 2A 3M 4P 5P 5A 7M", "augmented heptatonic"],
    [
      "1P 2M 3m 4A 5P 6M 7m",
      "dorian #4",
      "ukrainian dorian",
      "romanian minor",
      "altered dorian"
    ],
    ["1P 2M 3m 4A 5P 6M 7M", "lydian diminished"],
    ["1P 2M 3M 4A 5A 7m 7M", "leading whole tone"],
    ["1P 2M 3M 4A 5P 6m 7m", "lydian minor"],
    ["1P 2m 3M 4P 5P 6m 7m", "phrygian dominant", "spanish", "phrygian major"],
    ["1P 2m 3m 4P 5P 6m 7M", "balinese"],
    ["1P 2m 3m 4P 5P 6M 7M", "neopolitan major"],
    ["1P 2M 3M 4P 5P 6m 7M", "harmonic major"],
    ["1P 2m 3M 4P 5P 6m 7M", "double harmonic major", "gypsy"],
    ["1P 2M 3m 4A 5P 6m 7M", "hungarian minor"],
    ["1P 2A 3M 4A 5P 6M 7m", "hungarian major"],
    ["1P 2m 3M 4P 5d 6M 7m", "oriental"],
    ["1P 2m 3m 3M 4A 5P 7m", "flamenco"],
    ["1P 2m 3m 4A 5P 6m 7M", "todi raga"],
    ["1P 2m 3M 4P 5d 6m 7M", "persian"],
    ["1P 2m 3M 5d 6m 7m 7M", "enigmatic"],
    [
      "1P 2M 3M 4P 5A 6M 7M",
      "major augmented",
      "major #5",
      "ionian augmented",
      "ionian #5"
    ],
    ["1P 2A 3M 4A 5P 6M 7M", "lydian #9"],
    ["1P 2m 2M 4P 4A 5P 6m 7M", "messiaen's mode #4"],
    ["1P 2m 3M 4P 4A 5P 6m 7M", "purvi raga"],
    ["1P 2m 3m 3M 4P 5P 6m 7m", "spanish heptatonic"],
    ["1P 2M 3m 3M 4P 5P 6M 7m", "bebop minor"],
    ["1P 2M 3M 4P 5P 5A 6M 7M", "bebop major"],
    ["1P 2m 3m 4P 5d 5P 6m 7m", "bebop locrian"],
    ["1P 2M 3m 4P 5P 6m 7m 7M", "minor bebop"],
    ["1P 2M 3M 4P 5d 5P 6M 7M", "ichikosucho"],
    ["1P 2M 3m 4P 5P 6m 6M 7M", "minor six diminished"],
    [
      "1P 2m 3m 3M 4A 5P 6M 7m",
      "half-whole diminished",
      "dominant diminished",
      "messiaen's mode #2"
    ],
    ["1P 3m 3M 4P 5P 6M 7m 7M", "kafi raga"],
    ["1P 2M 3M 4P 4A 5A 6A 7M", "messiaen's mode #6"],
    ["1P 2M 3m 3M 4P 5d 5P 6M 7m", "composite blues"],
    ["1P 2M 3m 3M 4A 5P 6m 7m 7M", "messiaen's mode #3"],
    ["1P 2m 2M 3m 4P 4A 5P 6m 6M 7M", "messiaen's mode #7"],
    ["1P 2m 2M 3m 3M 4P 5d 5P 6m 6M 7m 7M", "chromatic"]
  ];
  var data_default$2 = SCALES;
  var NoScaleType = {
    ...EmptyPcset,
    intervals: [],
    aliases: []
  };
  var dictionary$2 = [];
  var index$3 = {};
  function get$4(type) {
    return index$3[type] || NoScaleType;
  }
  function all() {
    return dictionary$2.slice();
  }
  function add$2(intervals, name2, aliases = []) {
    const scale = { ...get$6(intervals), name: name2, intervals, aliases };
    dictionary$2.push(scale);
    index$3[scale.name] = scale;
    index$3[scale.setNum] = scale;
    index$3[scale.chroma] = scale;
    scale.aliases.forEach((alias) => addAlias$2(scale, alias));
    return scale;
  }
  function addAlias$2(scale, alias) {
    index$3[alias] = scale;
  }
  data_default$2.forEach(
    ([ivls, name2, ...aliases]) => add$2(ivls.split(" "), name2, aliases)
  );
  var NoChord = {
    empty: true,
    name: "",
    symbol: "",
    root: "",
    rootDegree: 0,
    type: "",
    tonic: null,
    setNum: NaN,
    quality: "Unknown",
    chroma: "",
    normalized: "",
    aliases: [],
    notes: [],
    intervals: []
  };
  function tokenize$2(name2) {
    const [letter, acc, oct, type] = tokenizeNote(name2);
    if (letter === "") {
      return ["", name2];
    }
    if (letter === "A" && type === "ug") {
      return ["", "aug"];
    }
    return [letter + acc, oct + type];
  }
  function get$3(src) {
    if (src === "") {
      return NoChord;
    }
    if (Array.isArray(src) && src.length === 2) {
      return getChord(src[1], src[0]);
    } else {
      const [tonic, type] = tokenize$2(src);
      const chord2 = getChord(type, tonic);
      return chord2.empty ? getChord(src) : chord2;
    }
  }
  function getChord(typeName, optionalTonic, optionalRoot) {
    const type = get$5(typeName);
    const tonic = note(optionalTonic || "");
    const root = note(optionalRoot || "");
    if (type.empty || optionalTonic && tonic.empty || optionalRoot && root.empty) {
      return NoChord;
    }
    const rootInterval = distance(tonic.pc, root.pc);
    const rootDegree = type.intervals.indexOf(rootInterval) + 1;
    if (!root.empty && !rootDegree) {
      return NoChord;
    }
    const intervals = Array.from(type.intervals);
    for (let i = 1; i < rootDegree; i++) {
      const num = intervals[0][0];
      const quality = intervals[0][1];
      const newNum = parseInt(num, 10) + 7;
      intervals.push(`${newNum}${quality}`);
      intervals.shift();
    }
    const notes = tonic.empty ? [] : intervals.map((i) => transpose$2(tonic, i));
    typeName = type.aliases.indexOf(typeName) !== -1 ? typeName : type.aliases[0];
    const symbol = `${tonic.empty ? "" : tonic.pc}${typeName}${root.empty || rootDegree <= 1 ? "" : "/" + root.pc}`;
    const name2 = `${optionalTonic ? tonic.pc + " " : ""}${type.name}${rootDegree > 1 && optionalRoot ? " over " + root.pc : ""}`;
    return {
      ...type,
      name: name2,
      symbol,
      type: type.name,
      root: root.name,
      intervals,
      rootDegree,
      tonic: tonic.name,
      notes
    };
  }
  var chord = deprecate$1("Chord.chord", "Chord.get", get$3);
  function transpose$1(chordName, interval2) {
    const [tonic, type] = tokenize$2(chordName);
    if (!tonic) {
      return chordName;
    }
    return transpose$2(tonic, interval2) + type;
  }
  function chordScales(name2) {
    const s = get$3(name2);
    const isChordIncluded = isSupersetOf(s.chroma);
    return all().filter((scale) => isChordIncluded(scale.chroma)).map((scale) => scale.name);
  }
  function extended(chordName) {
    const s = get$3(chordName);
    const isSuperset = isSupersetOf(s.chroma);
    return all$1().filter((chord2) => isSuperset(chord2.chroma)).map((chord2) => s.tonic + chord2.aliases[0]);
  }
  function reduced(chordName) {
    const s = get$3(chordName);
    const isSubset = isSubsetOf(s.chroma);
    return all$1().filter((chord2) => isSubset(chord2.chroma)).map((chord2) => s.tonic + chord2.aliases[0]);
  }
  function degrees(chordName) {
    const { intervals, tonic } = get$3(chordName);
    const transpose2 = tonicIntervalsTransposer(intervals, tonic);
    return (degree) => degree ? transpose2(degree > 0 ? degree - 1 : degree) : "";
  }
  function steps(chordName) {
    const { intervals, tonic } = get$3(chordName);
    return tonicIntervalsTransposer(intervals, tonic);
  }
  var chord_default = {
    getChord,
    get: get$3,
    detect,
    chordScales,
    extended,
    reduced,
    tokenize: tokenize$2,
    transpose: transpose$1,
    degrees,
    steps,
    chord
  };
  Object.freeze({
    empty: true,
    name: "",
    num: NaN,
    q: "",
    type: "",
    step: NaN,
    alt: NaN,
    dir: NaN,
    simple: NaN,
    semitones: NaN,
    chroma: NaN,
    coord: [],
    oct: NaN
  });
  Object.freeze({
    empty: true,
    name: "",
    num: NaN,
    q: "",
    type: "",
    step: NaN,
    alt: NaN,
    dir: NaN,
    simple: NaN,
    semitones: NaN,
    chroma: NaN,
    coord: [],
    oct: NaN
  });
  Object.freeze({
    empty: true,
    name: "",
    num: NaN,
    q: "",
    type: "",
    step: NaN,
    alt: NaN,
    dir: NaN,
    simple: NaN,
    semitones: NaN,
    chroma: NaN,
    coord: [],
    oct: NaN
  });
  var L2 = Math.log(2);
  var L440 = Math.log(440);
  function freqToMidi(freq2) {
    const v = 12 * (Math.log(freq2) - L440) / L2 + 69;
    return Math.round(v * 100) / 100;
  }
  var SHARPS = "C C# D D# E F F# G G# A A# B".split(" ");
  var FLATS = "C Db D Eb E F Gb G Ab A Bb B".split(" ");
  function midiToNoteName(midi2, options = {}) {
    if (isNaN(midi2) || midi2 === -Infinity || midi2 === Infinity)
      return "";
    midi2 = Math.round(midi2);
    const pcs = options.sharps === true ? SHARPS : FLATS;
    const pc = pcs[midi2 % 12];
    if (options.pitchClass) {
      return pc;
    }
    const o = Math.floor(midi2 / 12) - 1;
    return pc + o;
  }
  var NAMES$1 = ["C", "D", "E", "F", "G", "A", "B"];
  var toName = (n) => n.name;
  var onlyNotes = (array) => array.map(note$1).filter((n) => !n.empty);
  function names(array) {
    if (array === void 0) {
      return NAMES$1.slice();
    } else if (!Array.isArray(array)) {
      return [];
    } else {
      return onlyNotes(array).map(toName);
    }
  }
  var get$2 = note$1;
  var name = (note2) => get$2(note2).name;
  var pitchClass = (note2) => get$2(note2).pc;
  var accidentals = (note2) => get$2(note2).acc;
  var octave = (note2) => get$2(note2).oct;
  var midi = (note2) => get$2(note2).midi;
  var freq = (note2) => get$2(note2).freq;
  var chroma = (note2) => get$2(note2).chroma;
  function fromMidi(midi2) {
    return midiToNoteName(midi2);
  }
  function fromFreq(freq2) {
    return midiToNoteName(freqToMidi(freq2));
  }
  function fromFreqSharps(freq2) {
    return midiToNoteName(freqToMidi(freq2), { sharps: true });
  }
  function fromMidiSharps(midi2) {
    return midiToNoteName(midi2, { sharps: true });
  }
  var transpose = transpose$3;
  var tr = transpose$3;
  var transposeBy = (interval2) => (note2) => transpose(note2, interval2);
  var trBy = transposeBy;
  var transposeFrom = (note2) => (interval2) => transpose(note2, interval2);
  var trFrom = transposeFrom;
  function transposeFifths(noteName, fifths) {
    return transpose(noteName, [fifths, 0]);
  }
  var trFifths = transposeFifths;
  function transposeOctaves(noteName, octaves) {
    return transpose(noteName, [0, octaves]);
  }
  var ascending = (a, b) => a.height - b.height;
  var descending = (a, b) => b.height - a.height;
  function sortedNames(notes, comparator) {
    comparator = comparator || ascending;
    return onlyNotes(notes).sort(comparator).map(toName);
  }
  function sortedUniqNames(notes) {
    return sortedNames(notes, ascending).filter(
      (n, i, a) => i === 0 || n !== a[i - 1]
    );
  }
  var simplify = (noteName) => {
    const note2 = get$2(noteName);
    if (note2.empty) {
      return "";
    }
    return midiToNoteName(note2.midi || note2.chroma, {
      sharps: note2.alt > 0,
      pitchClass: note2.midi === null
    });
  };
  function enharmonic(noteName, destName) {
    const src = get$2(noteName);
    if (src.empty) {
      return "";
    }
    const dest = get$2(
      destName || midiToNoteName(src.midi || src.chroma, {
        sharps: src.alt < 0,
        pitchClass: true
      })
    );
    if (dest.empty || dest.chroma !== src.chroma) {
      return "";
    }
    if (src.oct === void 0) {
      return dest.pc;
    }
    const srcChroma = src.chroma - src.alt;
    const destChroma = dest.chroma - dest.alt;
    const destOctOffset = srcChroma > 11 || destChroma < 0 ? -1 : srcChroma < 0 || destChroma > 11 ? 1 : 0;
    const destOct = src.oct + destOctOffset;
    return dest.pc + destOct;
  }
  var note_default = {
    names,
    get: get$2,
    name,
    pitchClass,
    accidentals,
    octave,
    midi,
    ascending,
    descending,
    sortedNames,
    sortedUniqNames,
    fromMidi,
    fromMidiSharps,
    freq,
    fromFreq,
    fromFreqSharps,
    chroma,
    transpose,
    tr,
    transposeBy,
    trBy,
    transposeFrom,
    trFrom,
    transposeFifths,
    transposeOctaves,
    trFifths,
    simplify,
    enharmonic
  };
  function isNamedPitch$1(src) {
    return src !== null && typeof src === "object" && "name" in src && typeof src.name === "string" ? true : false;
  }
  function isPitch$1(pitch2) {
    return pitch2 !== null && typeof pitch2 === "object" && "step" in pitch2 && typeof pitch2.step === "number" && "alt" in pitch2 && typeof pitch2.alt === "number" && !isNaN(pitch2.step) && !isNaN(pitch2.alt) ? true : false;
  }
  var FIFTHS$1 = [0, 2, 4, -1, 1, 3, 5];
  var STEPS_TO_OCTS$1 = FIFTHS$1.map(
    (fifths) => Math.floor(fifths * 7 / 12)
  );
  function coordinates$1(pitch2) {
    const { step, alt, oct, dir = 1 } = pitch2;
    const f = FIFTHS$1[step] + 7 * alt;
    if (oct === void 0) {
      return [dir * f];
    }
    const o = oct - STEPS_TO_OCTS$1[step] - 4 * alt;
    return [dir * f, dir * o];
  }
  var fillStr$1 = (s, n) => Array(Math.abs(n) + 1).join(s);
  var NoInterval$1 = Object.freeze({
    empty: true,
    name: "",
    num: NaN,
    q: "",
    type: "",
    step: NaN,
    alt: NaN,
    dir: NaN,
    simple: NaN,
    semitones: NaN,
    chroma: NaN,
    coord: [],
    oct: NaN
  });
  var INTERVAL_TONAL_REGEX$1 = "([-+]?\\d+)(d{1,4}|m|M|P|A{1,4})";
  var INTERVAL_SHORTHAND_REGEX$1 = "(AA|A|P|M|m|d|dd)([-+]?\\d+)";
  var REGEX$2 = new RegExp(
    "^" + INTERVAL_TONAL_REGEX$1 + "|" + INTERVAL_SHORTHAND_REGEX$1 + "$"
  );
  function tokenizeInterval$1(str) {
    const m = REGEX$2.exec(`${str}`);
    if (m === null) {
      return ["", ""];
    }
    return m[1] ? [m[1], m[2]] : [m[4], m[3]];
  }
  var cache$2 = {};
  function interval$1(src) {
    return typeof src === "string" ? cache$2[src] || (cache$2[src] = parse$2(src)) : isPitch$1(src) ? interval$1(pitchName$1(src)) : isNamedPitch$1(src) ? interval$1(src.name) : NoInterval$1;
  }
  var SIZES$1 = [0, 2, 4, 5, 7, 9, 11];
  var TYPES$1 = "PMMPPMM";
  function parse$2(str) {
    const tokens = tokenizeInterval$1(str);
    if (tokens[0] === "") {
      return NoInterval$1;
    }
    const num = +tokens[0];
    const q = tokens[1];
    const step = (Math.abs(num) - 1) % 7;
    const t = TYPES$1[step];
    if (t === "M" && q === "P") {
      return NoInterval$1;
    }
    const type = t === "M" ? "majorable" : "perfectable";
    const name2 = "" + num + q;
    const dir = num < 0 ? -1 : 1;
    const simple = num === 8 || num === -8 ? num : dir * (step + 1);
    const alt = qToAlt$1(type, q);
    const oct = Math.floor((Math.abs(num) - 1) / 7);
    const semitones = dir * (SIZES$1[step] + alt + 12 * oct);
    const chroma2 = (dir * (SIZES$1[step] + alt) % 12 + 12) % 12;
    const coord = coordinates$1({ step, alt, oct, dir });
    return {
      empty: false,
      name: name2,
      num,
      q,
      step,
      alt,
      dir,
      type,
      simple,
      semitones,
      chroma: chroma2,
      coord,
      oct
    };
  }
  function qToAlt$1(type, q) {
    return q === "M" && type === "majorable" || q === "P" && type === "perfectable" ? 0 : q === "m" && type === "majorable" ? -1 : /^A+$/.test(q) ? q.length : /^d+$/.test(q) ? -1 * (type === "perfectable" ? q.length : q.length + 1) : 0;
  }
  function pitchName$1(props) {
    const { step, alt, oct = 0, dir } = props;
    if (!dir) {
      return "";
    }
    const calcNum = step + 1 + 7 * oct;
    const num = calcNum === 0 ? step + 1 : calcNum;
    const d = dir < 0 ? "-" : "";
    const type = TYPES$1[step] === "M" ? "majorable" : "perfectable";
    const name2 = d + num + altToQ$1(type, alt);
    return name2;
  }
  function altToQ$1(type, alt) {
    if (alt === 0) {
      return type === "majorable" ? "M" : "P";
    } else if (alt === -1 && type === "majorable") {
      return "m";
    } else if (alt > 0) {
      return fillStr$1("A", alt);
    } else {
      return fillStr$1("d", type === "perfectable" ? alt : alt + 1);
    }
  }
  function deprecate(original, alternative, fn) {
    return function(...args) {
      console.warn(`${original} is deprecated. Use ${alternative}.`);
      return fn.apply(this, args);
    };
  }
  var isNamed = deprecate("isNamed", "isNamedPitch", isNamedPitch$1);
  var NoRomanNumeral = { empty: true, name: "", chordType: "" };
  var cache$1 = {};
  function get$1(src) {
    return typeof src === "string" ? cache$1[src] || (cache$1[src] = parse$1(src)) : typeof src === "number" ? get$1(NAMES[src] || "") : isPitch$1(src) ? fromPitch(src) : isNamed(src) ? get$1(src.name) : NoRomanNumeral;
  }
  function fromPitch(pitch2) {
    return get$1(altToAcc$1(pitch2.alt) + NAMES[pitch2.step]);
  }
  var REGEX$1 = /^(#{1,}|b{1,}|x{1,}|)(IV|I{1,3}|VI{0,2}|iv|i{1,3}|vi{0,2})([^IViv]*)$/;
  function tokenize$1(str) {
    return REGEX$1.exec(str) || ["", "", "", ""];
  }
  var ROMANS = "I II III IV V VI VII";
  var NAMES = ROMANS.split(" ");
  function parse$1(src) {
    const [name2, acc, roman, chordType] = tokenize$1(src);
    if (!roman) {
      return NoRomanNumeral;
    }
    const upperRoman = roman.toUpperCase();
    const step = NAMES.indexOf(upperRoman);
    const alt = accToAlt$1(acc);
    const dir = 1;
    return {
      empty: false,
      name: name2,
      roman,
      interval: interval$1({ step, alt, dir }).name,
      acc,
      chordType,
      alt,
      step,
      major: roman === upperRoman,
      oct: 0,
      dir
    };
  }
  Object.freeze([]);
  Object.freeze({
    empty: true,
    name: "",
    num: NaN,
    q: "",
    type: "",
    step: NaN,
    alt: NaN,
    dir: NaN,
    simple: NaN,
    semitones: NaN,
    chroma: NaN,
    coord: [],
    oct: NaN
  });
  var MODES = [
    [0, 2773, 0, "ionian", "", "Maj7", "major"],
    [1, 2902, 2, "dorian", "m", "m7"],
    [2, 3418, 4, "phrygian", "m", "m7"],
    [3, 2741, -1, "lydian", "", "Maj7"],
    [4, 2774, 1, "mixolydian", "", "7"],
    [5, 2906, 3, "aeolian", "m", "m7", "minor"],
    [6, 3434, 5, "locrian", "dim", "m7b5"]
  ];
  var NoMode = {
    ...EmptyPcset,
    name: "",
    alt: 0,
    modeNum: NaN,
    triad: "",
    seventh: "",
    aliases: []
  };
  var modes = MODES.map(toMode);
  var index$2 = {};
  modes.forEach((mode2) => {
    index$2[mode2.name] = mode2;
    mode2.aliases.forEach((alias) => {
      index$2[alias] = mode2;
    });
  });
  function get(name2) {
    return typeof name2 === "string" ? index$2[name2.toLowerCase()] || NoMode : name2 && name2.name ? get(name2.name) : NoMode;
  }
  function toMode(mode2) {
    const [modeNum, setNum, alt, name2, triad, seventh, alias] = mode2;
    const aliases = alias ? [alias] : [];
    const chroma2 = Number(setNum).toString(2);
    const intervals = get$4(name2).intervals;
    return {
      empty: false,
      intervals,
      modeNum,
      chroma: chroma2,
      normalized: chroma2,
      name: name2,
      setNum,
      alt,
      triad,
      seventh,
      aliases
    };
  }
  function chords$1(chords2) {
    return (modeName, tonic) => {
      const mode2 = get(modeName);
      if (mode2.empty)
        return [];
      const triads2 = rotate(mode2.modeNum, chords2);
      const tonics = mode2.intervals.map((i) => transpose$3(tonic, i));
      return triads2.map((triad, i) => tonics[i] + triad);
    };
  }
  chords$1(MODES.map((x) => x[4]));
  chords$1(MODES.map((x) => x[5]));
  function isNamedPitch(src) {
    return src !== null && typeof src === "object" && "name" in src && typeof src.name === "string" ? true : false;
  }
  function isPitch(pitch2) {
    return pitch2 !== null && typeof pitch2 === "object" && "step" in pitch2 && typeof pitch2.step === "number" && "alt" in pitch2 && typeof pitch2.alt === "number" && !isNaN(pitch2.step) && !isNaN(pitch2.alt) ? true : false;
  }
  var FIFTHS = [0, 2, 4, -1, 1, 3, 5];
  var STEPS_TO_OCTS = FIFTHS.map(
    (fifths) => Math.floor(fifths * 7 / 12)
  );
  function coordinates(pitch2) {
    const { step, alt, oct, dir = 1 } = pitch2;
    const f = FIFTHS[step] + 7 * alt;
    if (oct === void 0) {
      return [dir * f];
    }
    const o = oct - STEPS_TO_OCTS[step] - 4 * alt;
    return [dir * f, dir * o];
  }
  var fillStr = (s, n) => Array(Math.abs(n) + 1).join(s);
  var NoInterval = Object.freeze({
    empty: true,
    name: "",
    num: NaN,
    q: "",
    type: "",
    step: NaN,
    alt: NaN,
    dir: NaN,
    simple: NaN,
    semitones: NaN,
    chroma: NaN,
    coord: [],
    oct: NaN
  });
  var INTERVAL_TONAL_REGEX = "([-+]?\\d+)(d{1,4}|m|M|P|A{1,4})";
  var INTERVAL_SHORTHAND_REGEX = "(AA|A|P|M|m|d|dd)([-+]?\\d+)";
  var REGEX = new RegExp(
    "^" + INTERVAL_TONAL_REGEX + "|" + INTERVAL_SHORTHAND_REGEX + "$"
  );
  function tokenizeInterval(str) {
    const m = REGEX.exec(`${str}`);
    if (m === null) {
      return ["", ""];
    }
    return m[1] ? [m[1], m[2]] : [m[4], m[3]];
  }
  var cache = {};
  function interval(src) {
    return typeof src === "string" ? cache[src] || (cache[src] = parse(src)) : isPitch(src) ? interval(pitchName(src)) : isNamedPitch(src) ? interval(src.name) : NoInterval;
  }
  var SIZES = [0, 2, 4, 5, 7, 9, 11];
  var TYPES = "PMMPPMM";
  function parse(str) {
    const tokens = tokenizeInterval(str);
    if (tokens[0] === "") {
      return NoInterval;
    }
    const num = +tokens[0];
    const q = tokens[1];
    const step = (Math.abs(num) - 1) % 7;
    const t = TYPES[step];
    if (t === "M" && q === "P") {
      return NoInterval;
    }
    const type = t === "M" ? "majorable" : "perfectable";
    const name2 = "" + num + q;
    const dir = num < 0 ? -1 : 1;
    const simple = num === 8 || num === -8 ? num : dir * (step + 1);
    const alt = qToAlt(type, q);
    const oct = Math.floor((Math.abs(num) - 1) / 7);
    const semitones = dir * (SIZES[step] + alt + 12 * oct);
    const chroma2 = (dir * (SIZES[step] + alt) % 12 + 12) % 12;
    const coord = coordinates({ step, alt, oct, dir });
    return {
      empty: false,
      name: name2,
      num,
      q,
      step,
      alt,
      dir,
      type,
      simple,
      semitones,
      chroma: chroma2,
      coord,
      oct
    };
  }
  function qToAlt(type, q) {
    return q === "M" && type === "majorable" || q === "P" && type === "perfectable" ? 0 : q === "m" && type === "majorable" ? -1 : /^A+$/.test(q) ? q.length : /^d+$/.test(q) ? -1 * (type === "perfectable" ? q.length : q.length + 1) : 0;
  }
  function pitchName(props) {
    const { step, alt, oct = 0, dir } = props;
    if (!dir) {
      return "";
    }
    const calcNum = step + 1 + 7 * oct;
    const num = calcNum === 0 ? step + 1 : calcNum;
    const d = dir < 0 ? "-" : "";
    const type = TYPES[step] === "M" ? "majorable" : "perfectable";
    const name2 = d + num + altToQ(type, alt);
    return name2;
  }
  function altToQ(type, alt) {
    if (alt === 0) {
      return type === "majorable" ? "M" : "P";
    } else if (alt === -1 && type === "majorable") {
      return "m";
    } else if (alt > 0) {
      return fillStr("A", alt);
    } else {
      return fillStr("d", type === "perfectable" ? alt : alt + 1);
    }
  }
  var CHORDS$1 = [
    ["1P 3M 5P", "major", "M ^  maj"],
    ["1P 3M 5P 7M", "major seventh", "maj7 \u0394 ma7 M7 Maj7 ^7"],
    ["1P 3M 5P 7M 9M", "major ninth", "maj9 \u03949 ^9"],
    ["1P 3M 5P 7M 9M 13M", "major thirteenth", "maj13 Maj13 ^13"],
    ["1P 3M 5P 6M", "sixth", "6 add6 add13 M6"],
    ["1P 3M 5P 6M 9M", "sixth added ninth", "6add9 6/9 69 M69"],
    ["1P 3M 6m 7M", "major seventh flat sixth", "M7b6 ^7b6"],
    [
      "1P 3M 5P 7M 11A",
      "major seventh sharp eleventh",
      "maj#4 \u0394#4 \u0394#11 M7#11 ^7#11 maj7#11"
    ],
    ["1P 3m 5P", "minor", "m min -"],
    ["1P 3m 5P 7m", "minor seventh", "m7 min7 mi7 -7"],
    [
      "1P 3m 5P 7M",
      "minor/major seventh",
      "m/ma7 m/maj7 mM7 mMaj7 m/M7 -\u03947 m\u0394 -^7 -maj7"
    ],
    ["1P 3m 5P 6M", "minor sixth", "m6 -6"],
    ["1P 3m 5P 7m 9M", "minor ninth", "m9 -9"],
    ["1P 3m 5P 7M 9M", "minor/major ninth", "mM9 mMaj9 -^9"],
    ["1P 3m 5P 7m 9M 11P", "minor eleventh", "m11 -11"],
    ["1P 3m 5P 7m 9M 13M", "minor thirteenth", "m13 -13"],
    ["1P 3m 5d", "diminished", "dim \xB0 o"],
    ["1P 3m 5d 7d", "diminished seventh", "dim7 \xB07 o7"],
    ["1P 3m 5d 7m", "half-diminished", "m7b5 \xF8 -7b5 h7 h"],
    ["1P 3M 5P 7m", "dominant seventh", "7 dom"],
    ["1P 3M 5P 7m 9M", "dominant ninth", "9"],
    ["1P 3M 5P 7m 9M 13M", "dominant thirteenth", "13"],
    ["1P 3M 5P 7m 11A", "lydian dominant seventh", "7#11 7#4"],
    ["1P 3M 5P 7m 9m", "dominant flat ninth", "7b9"],
    ["1P 3M 5P 7m 9A", "dominant sharp ninth", "7#9"],
    ["1P 3M 7m 9m", "altered", "alt7"],
    ["1P 4P 5P", "suspended fourth", "sus4 sus"],
    ["1P 2M 5P", "suspended second", "sus2"],
    ["1P 4P 5P 7m", "suspended fourth seventh", "7sus4 7sus"],
    ["1P 5P 7m 9M 11P", "eleventh", "11"],
    [
      "1P 4P 5P 7m 9m",
      "suspended fourth flat ninth",
      "b9sus phryg 7b9sus 7b9sus4"
    ],
    ["1P 5P", "fifth", "5"],
    ["1P 3M 5A", "augmented", "aug + +5 ^#5"],
    ["1P 3m 5A", "minor augmented", "m#5 -#5 m+"],
    ["1P 3M 5A 7M", "augmented seventh", "maj7#5 maj7+5 +maj7 ^7#5"],
    [
      "1P 3M 5P 7M 9M 11A",
      "major sharp eleventh (lydian)",
      "maj9#11 \u03949#11 ^9#11"
    ],
    ["1P 2M 4P 5P", "", "sus24 sus4add9"],
    ["1P 3M 5A 7M 9M", "", "maj9#5 Maj9#5"],
    ["1P 3M 5A 7m", "", "7#5 +7 7+ 7aug aug7"],
    ["1P 3M 5A 7m 9A", "", "7#5#9 7#9#5 7alt"],
    ["1P 3M 5A 7m 9M", "", "9#5 9+"],
    ["1P 3M 5A 7m 9M 11A", "", "9#5#11"],
    ["1P 3M 5A 7m 9m", "", "7#5b9 7b9#5"],
    ["1P 3M 5A 7m 9m 11A", "", "7#5b9#11"],
    ["1P 3M 5A 9A", "", "+add#9"],
    ["1P 3M 5A 9M", "", "M#5add9 +add9"],
    ["1P 3M 5P 6M 11A", "", "M6#11 M6b5 6#11 6b5"],
    ["1P 3M 5P 6M 7M 9M", "", "M7add13"],
    ["1P 3M 5P 6M 9M 11A", "", "69#11"],
    ["1P 3m 5P 6M 9M", "", "m69 -69"],
    ["1P 3M 5P 6m 7m", "", "7b6"],
    ["1P 3M 5P 7M 9A 11A", "", "maj7#9#11"],
    ["1P 3M 5P 7M 9M 11A 13M", "", "M13#11 maj13#11 M13+4 M13#4"],
    ["1P 3M 5P 7M 9m", "", "M7b9"],
    ["1P 3M 5P 7m 11A 13m", "", "7#11b13 7b5b13"],
    ["1P 3M 5P 7m 13M", "", "7add6 67 7add13"],
    ["1P 3M 5P 7m 9A 11A", "", "7#9#11 7b5#9 7#9b5"],
    ["1P 3M 5P 7m 9A 11A 13M", "", "13#9#11"],
    ["1P 3M 5P 7m 9A 11A 13m", "", "7#9#11b13"],
    ["1P 3M 5P 7m 9A 13M", "", "13#9"],
    ["1P 3M 5P 7m 9A 13m", "", "7#9b13"],
    ["1P 3M 5P 7m 9M 11A", "", "9#11 9+4 9#4"],
    ["1P 3M 5P 7m 9M 11A 13M", "", "13#11 13+4 13#4"],
    ["1P 3M 5P 7m 9M 11A 13m", "", "9#11b13 9b5b13"],
    ["1P 3M 5P 7m 9m 11A", "", "7b9#11 7b5b9 7b9b5"],
    ["1P 3M 5P 7m 9m 11A 13M", "", "13b9#11"],
    ["1P 3M 5P 7m 9m 11A 13m", "", "7b9b13#11 7b9#11b13 7b5b9b13"],
    ["1P 3M 5P 7m 9m 13M", "", "13b9"],
    ["1P 3M 5P 7m 9m 13m", "", "7b9b13"],
    ["1P 3M 5P 7m 9m 9A", "", "7b9#9"],
    ["1P 3M 5P 9M", "", "Madd9 2 add9 add2"],
    ["1P 3M 5P 9m", "", "Maddb9"],
    ["1P 3M 5d", "", "Mb5"],
    ["1P 3M 5d 6M 7m 9M", "", "13b5"],
    ["1P 3M 5d 7M", "", "M7b5"],
    ["1P 3M 5d 7M 9M", "", "M9b5"],
    ["1P 3M 5d 7m", "", "7b5"],
    ["1P 3M 5d 7m 9M", "", "9b5"],
    ["1P 3M 7m", "", "7no5"],
    ["1P 3M 7m 13m", "", "7b13"],
    ["1P 3M 7m 9M", "", "9no5"],
    ["1P 3M 7m 9M 13M", "", "13no5"],
    ["1P 3M 7m 9M 13m", "", "9b13"],
    ["1P 3m 4P 5P", "", "madd4"],
    ["1P 3m 5P 6m 7M", "", "mMaj7b6"],
    ["1P 3m 5P 6m 7M 9M", "", "mMaj9b6"],
    ["1P 3m 5P 7m 11P", "", "m7add11 m7add4"],
    ["1P 3m 5P 9M", "", "madd9"],
    ["1P 3m 5d 6M 7M", "", "o7M7"],
    ["1P 3m 5d 7M", "", "oM7"],
    ["1P 3m 6m 7M", "", "mb6M7"],
    ["1P 3m 6m 7m", "", "m7#5"],
    ["1P 3m 6m 7m 9M", "", "m9#5"],
    ["1P 3m 5A 7m 9M 11P", "", "m11A"],
    ["1P 3m 6m 9m", "", "mb6b9"],
    ["1P 2M 3m 5d 7m", "", "m9b5"],
    ["1P 4P 5A 7M", "", "M7#5sus4"],
    ["1P 4P 5A 7M 9M", "", "M9#5sus4"],
    ["1P 4P 5A 7m", "", "7#5sus4"],
    ["1P 4P 5P 7M", "", "M7sus4"],
    ["1P 4P 5P 7M 9M", "", "M9sus4"],
    ["1P 4P 5P 7m 9M", "", "9sus4 9sus"],
    ["1P 4P 5P 7m 9M 13M", "", "13sus4 13sus"],
    ["1P 4P 5P 7m 9m 13m", "", "7sus4b9b13 7b9b13sus4"],
    ["1P 4P 7m 10m", "", "4 quartal"],
    ["1P 5P 7m 9m 11P", "", "11b9"]
  ];
  var data_default$1 = CHORDS$1;
  ({
    ...EmptyPcset,
    name: "",
    quality: "Unknown",
    intervals: [],
    aliases: []
  });
  var dictionary$1 = [];
  var index$1 = {};
  function add$1(intervals, aliases, fullName) {
    const quality = getQuality$1(intervals);
    const chord2 = {
      ...get$6(intervals),
      name: fullName || "",
      quality,
      intervals,
      aliases
    };
    dictionary$1.push(chord2);
    if (chord2.name) {
      index$1[chord2.name] = chord2;
    }
    index$1[chord2.setNum] = chord2;
    index$1[chord2.chroma] = chord2;
    chord2.aliases.forEach((alias) => addAlias$1(chord2, alias));
  }
  function addAlias$1(chord2, alias) {
    index$1[alias] = chord2;
  }
  function getQuality$1(intervals) {
    const has = (interval2) => intervals.indexOf(interval2) !== -1;
    return has("5A") ? "Augmented" : has("3M") ? "Major" : has("5d") ? "Diminished" : has("3m") ? "Minor" : "Unknown";
  }
  data_default$1.forEach(
    ([ivls, fullName, names2]) => add$1(ivls.split(" "), names2.split(" "), fullName)
  );
  dictionary$1.sort((a, b) => a.setNum - b.setNum);
  function tokenize(name2) {
    const [letter, acc, oct, type] = tokenizeNote$1(name2);
    if (letter === "") {
      return tokenizeBass("", name2);
    } else if (letter === "A" && type === "ug") {
      return tokenizeBass("", "aug");
    } else {
      return tokenizeBass(letter + acc, oct + type);
    }
  }
  function tokenizeBass(note2, chord2) {
    const split = chord2.split("/");
    if (split.length === 1) {
      return [note2, split[0], ""];
    }
    const [letter, acc, oct, type] = tokenizeNote$1(split[1]);
    if (letter !== "" && oct === "" && type === "") {
      return [note2, split[0], letter + acc];
    } else {
      return [note2, chord2, ""];
    }
  }
  function fromRomanNumerals(tonic, chords2) {
    const romanNumerals = chords2.map(get$1);
    return romanNumerals.map(
      (rn) => transpose$3(tonic, interval(rn)) + rn.chordType
    );
  }
  function toRomanNumerals(tonic, chords2) {
    return chords2.map((chord2) => {
      const [note2, chordType] = tokenize(chord2);
      const intervalName = distance$1(tonic, note2);
      const roman = get$1(interval(intervalName));
      return roman.name + chordType;
    });
  }
  var progression_default = { fromRomanNumerals, toRomanNumerals };
  Object.freeze({
    empty: true,
    name: "",
    num: NaN,
    q: "",
    type: "",
    step: NaN,
    alt: NaN,
    dir: NaN,
    simple: NaN,
    semitones: NaN,
    chroma: NaN,
    coord: [],
    oct: NaN
  });
  var CHORDS = [
    ["1P 3M 5P", "major", "M ^  maj"],
    ["1P 3M 5P 7M", "major seventh", "maj7 \u0394 ma7 M7 Maj7 ^7"],
    ["1P 3M 5P 7M 9M", "major ninth", "maj9 \u03949 ^9"],
    ["1P 3M 5P 7M 9M 13M", "major thirteenth", "maj13 Maj13 ^13"],
    ["1P 3M 5P 6M", "sixth", "6 add6 add13 M6"],
    ["1P 3M 5P 6M 9M", "sixth added ninth", "6add9 6/9 69 M69"],
    ["1P 3M 6m 7M", "major seventh flat sixth", "M7b6 ^7b6"],
    [
      "1P 3M 5P 7M 11A",
      "major seventh sharp eleventh",
      "maj#4 \u0394#4 \u0394#11 M7#11 ^7#11 maj7#11"
    ],
    ["1P 3m 5P", "minor", "m min -"],
    ["1P 3m 5P 7m", "minor seventh", "m7 min7 mi7 -7"],
    [
      "1P 3m 5P 7M",
      "minor/major seventh",
      "m/ma7 m/maj7 mM7 mMaj7 m/M7 -\u03947 m\u0394 -^7 -maj7"
    ],
    ["1P 3m 5P 6M", "minor sixth", "m6 -6"],
    ["1P 3m 5P 7m 9M", "minor ninth", "m9 -9"],
    ["1P 3m 5P 7M 9M", "minor/major ninth", "mM9 mMaj9 -^9"],
    ["1P 3m 5P 7m 9M 11P", "minor eleventh", "m11 -11"],
    ["1P 3m 5P 7m 9M 13M", "minor thirteenth", "m13 -13"],
    ["1P 3m 5d", "diminished", "dim \xB0 o"],
    ["1P 3m 5d 7d", "diminished seventh", "dim7 \xB07 o7"],
    ["1P 3m 5d 7m", "half-diminished", "m7b5 \xF8 -7b5 h7 h"],
    ["1P 3M 5P 7m", "dominant seventh", "7 dom"],
    ["1P 3M 5P 7m 9M", "dominant ninth", "9"],
    ["1P 3M 5P 7m 9M 13M", "dominant thirteenth", "13"],
    ["1P 3M 5P 7m 11A", "lydian dominant seventh", "7#11 7#4"],
    ["1P 3M 5P 7m 9m", "dominant flat ninth", "7b9"],
    ["1P 3M 5P 7m 9A", "dominant sharp ninth", "7#9"],
    ["1P 3M 7m 9m", "altered", "alt7"],
    ["1P 4P 5P", "suspended fourth", "sus4 sus"],
    ["1P 2M 5P", "suspended second", "sus2"],
    ["1P 4P 5P 7m", "suspended fourth seventh", "7sus4 7sus"],
    ["1P 5P 7m 9M 11P", "eleventh", "11"],
    [
      "1P 4P 5P 7m 9m",
      "suspended fourth flat ninth",
      "b9sus phryg 7b9sus 7b9sus4"
    ],
    ["1P 5P", "fifth", "5"],
    ["1P 3M 5A", "augmented", "aug + +5 ^#5"],
    ["1P 3m 5A", "minor augmented", "m#5 -#5 m+"],
    ["1P 3M 5A 7M", "augmented seventh", "maj7#5 maj7+5 +maj7 ^7#5"],
    [
      "1P 3M 5P 7M 9M 11A",
      "major sharp eleventh (lydian)",
      "maj9#11 \u03949#11 ^9#11"
    ],
    ["1P 2M 4P 5P", "", "sus24 sus4add9"],
    ["1P 3M 5A 7M 9M", "", "maj9#5 Maj9#5"],
    ["1P 3M 5A 7m", "", "7#5 +7 7+ 7aug aug7"],
    ["1P 3M 5A 7m 9A", "", "7#5#9 7#9#5 7alt"],
    ["1P 3M 5A 7m 9M", "", "9#5 9+"],
    ["1P 3M 5A 7m 9M 11A", "", "9#5#11"],
    ["1P 3M 5A 7m 9m", "", "7#5b9 7b9#5"],
    ["1P 3M 5A 7m 9m 11A", "", "7#5b9#11"],
    ["1P 3M 5A 9A", "", "+add#9"],
    ["1P 3M 5A 9M", "", "M#5add9 +add9"],
    ["1P 3M 5P 6M 11A", "", "M6#11 M6b5 6#11 6b5"],
    ["1P 3M 5P 6M 7M 9M", "", "M7add13"],
    ["1P 3M 5P 6M 9M 11A", "", "69#11"],
    ["1P 3m 5P 6M 9M", "", "m69 -69"],
    ["1P 3M 5P 6m 7m", "", "7b6"],
    ["1P 3M 5P 7M 9A 11A", "", "maj7#9#11"],
    ["1P 3M 5P 7M 9M 11A 13M", "", "M13#11 maj13#11 M13+4 M13#4"],
    ["1P 3M 5P 7M 9m", "", "M7b9"],
    ["1P 3M 5P 7m 11A 13m", "", "7#11b13 7b5b13"],
    ["1P 3M 5P 7m 13M", "", "7add6 67 7add13"],
    ["1P 3M 5P 7m 9A 11A", "", "7#9#11 7b5#9 7#9b5"],
    ["1P 3M 5P 7m 9A 11A 13M", "", "13#9#11"],
    ["1P 3M 5P 7m 9A 11A 13m", "", "7#9#11b13"],
    ["1P 3M 5P 7m 9A 13M", "", "13#9"],
    ["1P 3M 5P 7m 9A 13m", "", "7#9b13"],
    ["1P 3M 5P 7m 9M 11A", "", "9#11 9+4 9#4"],
    ["1P 3M 5P 7m 9M 11A 13M", "", "13#11 13+4 13#4"],
    ["1P 3M 5P 7m 9M 11A 13m", "", "9#11b13 9b5b13"],
    ["1P 3M 5P 7m 9m 11A", "", "7b9#11 7b5b9 7b9b5"],
    ["1P 3M 5P 7m 9m 11A 13M", "", "13b9#11"],
    ["1P 3M 5P 7m 9m 11A 13m", "", "7b9b13#11 7b9#11b13 7b5b9b13"],
    ["1P 3M 5P 7m 9m 13M", "", "13b9"],
    ["1P 3M 5P 7m 9m 13m", "", "7b9b13"],
    ["1P 3M 5P 7m 9m 9A", "", "7b9#9"],
    ["1P 3M 5P 9M", "", "Madd9 2 add9 add2"],
    ["1P 3M 5P 9m", "", "Maddb9"],
    ["1P 3M 5d", "", "Mb5"],
    ["1P 3M 5d 6M 7m 9M", "", "13b5"],
    ["1P 3M 5d 7M", "", "M7b5"],
    ["1P 3M 5d 7M 9M", "", "M9b5"],
    ["1P 3M 5d 7m", "", "7b5"],
    ["1P 3M 5d 7m 9M", "", "9b5"],
    ["1P 3M 7m", "", "7no5"],
    ["1P 3M 7m 13m", "", "7b13"],
    ["1P 3M 7m 9M", "", "9no5"],
    ["1P 3M 7m 9M 13M", "", "13no5"],
    ["1P 3M 7m 9M 13m", "", "9b13"],
    ["1P 3m 4P 5P", "", "madd4"],
    ["1P 3m 5P 6m 7M", "", "mMaj7b6"],
    ["1P 3m 5P 6m 7M 9M", "", "mMaj9b6"],
    ["1P 3m 5P 7m 11P", "", "m7add11 m7add4"],
    ["1P 3m 5P 9M", "", "madd9"],
    ["1P 3m 5d 6M 7M", "", "o7M7"],
    ["1P 3m 5d 7M", "", "oM7"],
    ["1P 3m 6m 7M", "", "mb6M7"],
    ["1P 3m 6m 7m", "", "m7#5"],
    ["1P 3m 6m 7m 9M", "", "m9#5"],
    ["1P 3m 5A 7m 9M 11P", "", "m11A"],
    ["1P 3m 6m 9m", "", "mb6b9"],
    ["1P 2M 3m 5d 7m", "", "m9b5"],
    ["1P 4P 5A 7M", "", "M7#5sus4"],
    ["1P 4P 5A 7M 9M", "", "M9#5sus4"],
    ["1P 4P 5A 7m", "", "7#5sus4"],
    ["1P 4P 5P 7M", "", "M7sus4"],
    ["1P 4P 5P 7M 9M", "", "M9sus4"],
    ["1P 4P 5P 7m 9M", "", "9sus4 9sus"],
    ["1P 4P 5P 7m 9M 13M", "", "13sus4 13sus"],
    ["1P 4P 5P 7m 9m 13m", "", "7sus4b9b13 7b9b13sus4"],
    ["1P 4P 7m 10m", "", "4 quartal"],
    ["1P 5P 7m 9m 11P", "", "11b9"]
  ];
  var data_default = CHORDS;
  ({
    ...EmptyPcset,
    name: "",
    quality: "Unknown",
    intervals: [],
    aliases: []
  });
  var dictionary = [];
  var index = {};
  function add(intervals, aliases, fullName) {
    const quality = getQuality(intervals);
    const chord2 = {
      ...get$6(intervals),
      name: fullName || "",
      quality,
      intervals,
      aliases
    };
    dictionary.push(chord2);
    if (chord2.name) {
      index[chord2.name] = chord2;
    }
    index[chord2.setNum] = chord2;
    index[chord2.chroma] = chord2;
    chord2.aliases.forEach((alias) => addAlias(chord2, alias));
  }
  function addAlias(chord2, alias) {
    index[alias] = chord2;
  }
  function getQuality(intervals) {
    const has = (interval2) => intervals.indexOf(interval2) !== -1;
    return has("5A") ? "Augmented" : has("3M") ? "Major" : has("5d") ? "Diminished" : has("3m") ? "Minor" : "Unknown";
  }
  data_default.forEach(
    ([ivls, fullName, names2]) => add(ivls.split(" "), names2.split(" "), fullName)
  );
  dictionary.sort((a, b) => a.setNum - b.setNum);
  const defaultOptions = {
    seed: 0,
    noteLength: 32,
    partCount: 4,
    drumPartRatio: 0.5
  };
  const random = new Random();
  let baseRandomSeed$1 = 1;
  function setSeed$1(_baseRandomSeed) {
    baseRandomSeed$1 = _baseRandomSeed;
  }
  function generate(_options) {
    const options = { ...defaultOptions, ..._options };
    random.setSeed(baseRandomSeed$1 + options.seed);
    const chordProgressionNotes = generateChordProgression(options.noteLength);
    return times(options.partCount, () => {
      const isDrum = random.get() < options.drumPartRatio;
      if (isDrum) {
        return generateDrumNote(options.noteLength);
      } else {
        return random.get() < 0.5 ? generateMelodyNote(options.noteLength, chordProgressionNotes) : generateChordNote(options.noteLength, chordProgressionNotes);
      }
    });
  }
  function generateMelodyNote(noteLength, chordProgressionNotes) {
    const seType = random.select(["tone", "synth"]);
    const volume = 32;
    const baseNoteDuration = 16;
    let mml = `@${seType}@s${random.getInt(
      999999999
    )} v${volume} l${baseNoteDuration} `;
    const pattern = createRandomPattern(noteLength, 4, 8, 3);
    let octaveOffset = random.getInt(-1, 1);
    let octave2 = -1;
    for (let i = 0; i < noteLength; i++) {
      if (random.get() < 0.1) {
        octaveOffset += random.getInt(-1, 2);
      }
      if (!pattern[i]) {
        mml += "r";
        continue;
      }
      const ns = chordProgressionNotes[i][random.getInt(4)];
      let o = clamp(
        Number.parseFloat(ns.charAt(ns.length - 1)) + octaveOffset,
        2,
        7
      );
      const n = ns.substring(0, ns.length - 1).replace("#", "+").replace("b", "-").toLowerCase();
      if (o !== octave2) {
        mml += ` o${o}`;
        octave2 = o;
      }
      mml += n;
    }
    return mml;
  }
  function generateChordNote(noteLength, chordProgressionNotes) {
    const seType = random.select(["tone", "synth", "select"]);
    const isArpeggio = random.get() < 0.3;
    const volume = isArpeggio ? 24 : 30;
    const baseNoteDuration = 16;
    let mml = `@${seType}@s${random.getInt(
      999999999
    )} v${volume} l${baseNoteDuration} `;
    const arpeggioInterval = random.select([4, 8, 16]);
    const arpeggioPattern = times(arpeggioInterval, () => random.getInt(4));
    const interval2 = random.select([2, 4, 8]);
    const pattern = isArpeggio ? times(noteLength, () => true) : createRandomPattern(
      noteLength,
      random.select([1, 1, interval2 / 2]),
      interval2,
      2
    );
    let baseOctave = random.getInt(-1, 1);
    const isReciprocatingOctave = random.get() < (isArpeggio ? 0.3 : 0.8);
    let octaveOffset = 0;
    let octave2 = -1;
    for (let i = 0; i < noteLength; i++) {
      if (isReciprocatingOctave && i % interval2 === 0) {
        octaveOffset = (octaveOffset + 1) % 2;
      }
      if (!pattern[i]) {
        mml += "r";
        continue;
      }
      const ns = chordProgressionNotes[i][isArpeggio ? arpeggioPattern[i % arpeggioInterval] : 0];
      let o = clamp(
        Number.parseFloat(ns.charAt(ns.length - 1)) + baseOctave + octaveOffset,
        2,
        7
      );
      const n = ns.substring(0, ns.length - 1).replace("#", "+").replace("b", "-").toLowerCase();
      if (o !== octave2) {
        mml += ` o${o}`;
        octave2 = o;
      }
      mml += n;
    }
    return mml;
  }
  function generateDrumNote(noteLength) {
    const volume = 36;
    const baseNoteDuration = 16;
    const seType = random.select(["hit", "click", "explosion"]);
    let mml = `@${seType}@d@s${random.getInt(
      999999999
    )} v${volume} l${baseNoteDuration} o2 `;
    const pattern = createRandomPattern(
      noteLength,
      random.getInt(1, 3),
      random.select([4, 8]),
      3
    );
    for (let i = 0; i < noteLength; i++) {
      mml += pattern[i] ? "c" : "r";
    }
    return mml;
  }
  const chords = [
    ["I", "IIIm", "VIm"],
    ["IV", "IIm"],
    ["V", "VIIm"]
  ];
  const nextChordsIndex = [
    [0, 1, 2],
    [1, 2, 0],
    [2, 0]
  ];
  function generateChordProgression(len) {
    const key = random.select(["C", "D", "Eb", "F", "G", "A", "Bb"]);
    const octave2 = 4;
    const chordChangeInterval = 4;
    let chord2;
    let chordsIndex;
    let type;
    let tonic;
    return times(len, (i) => {
      if (i % chordChangeInterval === 0) {
        if (i === 0) {
          chordsIndex = random.getInt(chords.length - 1);
          chord2 = random.select(chords[chordsIndex]);
        } else if (random.get() < 0.8 - i / chordChangeInterval % 2 * 0.5) {
          chordsIndex = random.select(nextChordsIndex[chordsIndex]);
          chord2 = random.select(chords[chordsIndex]);
        }
        const progression2 = progression_default.fromRomanNumerals(`${key}${octave2}`, [
          chord2
        ])[0];
        if (progression2.charAt(progression2.length - 1) === "m") {
          type = "m7";
          tonic = progression2.substring(0, progression2.length - 1);
        } else {
          type = "7";
          tonic = progression2;
        }
      }
      return chord_default.getChord(type, tonic).notes;
    });
  }
  function createRandomPattern(len, freq2, interval2, loop) {
    let pattern = times(len, () => false);
    for (let i = 0; i < loop; i++) {
      if (interval2 > len) {
        break;
      }
      pattern = reversePattern(pattern, interval2, freq2);
      interval2 *= 2;
    }
    return pattern;
  }
  function reversePattern(pattern, interval2, freq2) {
    let pt = times(interval2, () => false);
    times(freq2, () => {
      pt[random.getInt(interval2)] = true;
    });
    return pattern.map((p, i) => pt[i % interval2] ? !p : p);
  }
  let baseRandomSeed;
  function playSoundEffect(type, _options) {
    const options = {
      ...{ seed: 0, numberOfSounds: 2, volume: 1 },
      ..._options
    };
    const key = `${type}_${JSON.stringify(options)}_${baseRandomSeed}`;
    if (soundEffects[key] != null) {
      play$2(soundEffects[key]);
      return soundEffects[key];
    }
    let freq2;
    if (options.freq != null) {
      freq2 = options.freq;
    } else if (options.pitch != null) {
      freq2 = pitchToFreq(options.pitch);
    } else if (options.note != null) {
      freq2 = note_default.get(
        options.note.toUpperCase().replace("+", "#").replace("-", "b")
      ).freq;
    }
    let numberOfSounds = options.numberOfSounds;
    let attackRatio = 1;
    let sustainRatio = 1;
    if (type === "synth") {
      attackRatio = sustainRatio = 0.2;
    } else if (type === "tone") {
      attackRatio = sustainRatio = 0.1;
      numberOfSounds = 1;
    }
    const se = get$9(
      type,
      options.seed + baseRandomSeed,
      numberOfSounds,
      options.volume,
      freq2,
      attackRatio,
      sustainRatio
    );
    add$6(se);
    soundEffects[key] = se;
    play$2(se);
    return se;
  }
  const mmlQuantizeInterval = 0.125;
  let soundEffects;
  let loopingTrack;
  function playMml(mmlStrings, _options) {
    stopMml();
    const options = { ...{ volume: 1, speed: 1, isLooping: true }, ..._options };
    let notesStepsCount = 0;
    const tracks2 = mmlStrings.map((ms) => fromMml(ms));
    tracks2.forEach((t2) => {
      const s = getNotesStepsCount(t2.mml);
      if (s > notesStepsCount) {
        notesStepsCount = s;
      }
    });
    const parts = tracks2.map((t2) => {
      const { mml, args } = t2;
      const sequence = mmlToQuantizedSequence(mml, notesStepsCount);
      const se = getForSequence(
        sequence,
        args.isDrum,
        args.seed,
        args.type,
        args.volume * options.volume
      );
      return get$8(mml, sequence, se);
    });
    const t = get$7(parts, notesStepsCount, options.speed);
    add$5(t);
    play$1(t, options.isLooping);
    if (options.isLooping) {
      loopingTrack = t;
    }
    return t;
  }
  function stopMml(_track) {
    let t = _track;
    if (t == null) {
      if (loopingTrack != null) {
        t = loopingTrack;
        loopingTrack = void 0;
      } else {
        return;
      }
    }
    stop(t);
    remove(t);
    loopingTrack = void 0;
  }
  function generateMml(option) {
    return generate(option);
  }
  function update() {
    const currentTime = audioContext.currentTime;
    update$1(currentTime);
    update$3(currentTime);
  }
  function init(baseRandomSeed2 = 1, audioContext2 = void 0, gainNode2 = void 0) {
    setSeed(baseRandomSeed2);
    init$3(audioContext2, gainNode2);
    reset();
  }
  function reset() {
    init$1();
    loopingTrack = void 0;
    jingles = {};
    init$2();
    soundEffects = {};
  }
  function setSeed(_baseRandomSeed = 1) {
    baseRandomSeed = _baseRandomSeed;
    setSeed$2(baseRandomSeed);
    setSeed$1(baseRandomSeed);
  }
  function getNotesStepsCount(mml) {
    const iter = new MMLIterator(mml);
    for (let ne of iter) {
      if (ne.type === "end") {
        return Math.floor(ne.time / mmlQuantizeInterval);
      }
    }
  }
  function mmlToQuantizedSequence(mml, notesStepsCount) {
    const notes = [];
    const iter = new MMLIterator(mml);
    for (let ne of iter) {
      if (ne.type === "note") {
        let endStep = Math.floor((ne.time + ne.duration) / mmlQuantizeInterval);
        if (endStep >= notesStepsCount) {
          endStep -= notesStepsCount;
        }
        notes.push({
          pitch: ne.noteNumber,
          quantizedStartStep: Math.floor(ne.time / mmlQuantizeInterval),
          quantizedEndStep: endStep
        });
      }
    }
    return { notes };
  }
  let jingles;
  let generatedTrack;
  function play(name2 = "0", numberOfSounds = 2, pitch2, volume = 1) {
    playSoundEffect(playPrefixes[name2[0]], {
      seed: getHashFromString(name2),
      numberOfSounds,
      pitch: pitch2,
      volume
    });
  }
  function playBgm(name2 = "0", pitch2 = 69 - 24, len = 32, interval2 = 0.25, numberOfTracks = 4, soundEffectTypes = ["laser", "select", "hit", "hit"], volume = 1) {
    stopBgm();
    generatedTrack = generateBgm(
      name2,
      pitch2,
      len,
      interval2,
      numberOfTracks,
      soundEffectTypes,
      volume
    );
    add$5(generatedTrack);
    play$1(generatedTrack, true);
  }
  function stopBgm() {
    if (generatedTrack == null) {
      return;
    }
    stop(generatedTrack);
    remove(generatedTrack);
    generatedTrack = void 0;
  }
  function playJingle(name2 = "0", isSoundEffect = false, note2 = 69 - 12, len = 16, interval2 = 0.25, numberOfTracks = 4, volume = 1) {
    const key = `${name2}_${isSoundEffect}_${note2}_${len}_${interval2}_${numberOfTracks}_${volume}`;
    if (jingles[key] == null) {
      const jingle = generateJingle(
        name2,
        isSoundEffect,
        note2,
        len,
        interval2,
        numberOfTracks,
        volume
      );
      add$5(jingle);
      jingles[key] = jingle;
    }
    play$1(jingles[key]);
  }
  function stopJingles() {
    stopAll();
  }
  exports2.generateMml = generateMml;
  exports2.init = init;
  exports2.play = play;
  exports2.playBgm = playBgm;
  exports2.playEmpty = playEmpty;
  exports2.playJingle = playJingle;
  exports2.playMml = playMml;
  exports2.playSoundEffect = playSoundEffect;
  exports2.reset = reset;
  exports2.resumeAudioContext = resumeAudioContext;
  exports2.setQuantize = setQuantize;
  exports2.setSeed = setSeed;
  exports2.setTempo = setTempo;
  exports2.setVolume = setVolume;
  exports2.startAudio = start;
  exports2.stopBgm = stopBgm;
  exports2.stopJingles = stopJingles;
  exports2.stopMml = stopMml;
  exports2.update = update;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
});
