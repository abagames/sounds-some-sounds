var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.sss = {}));
})(this, function(exports2) {
  "use strict";
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
      value: function parse() {
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
  var MMLIterator = function() {
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
        var index = this._commandIndex;
        if (looper.loopCount <= 1 && looper.loopOutIndex !== -1) {
          index = looper.loopOutIndex;
        }
        this._commandIndex = index;
      }
    }, {
      key: Syntax.LoopEnd,
      value: function value() {
        var looper = this._loopStack[this._loopStack.length - 1];
        var index = this._commandIndex;
        if (looper.loopOutIndex === -1) {
          looper.loopOutIndex = this._commandIndex;
        }
        looper.loopCount -= 1;
        if (0 < looper.loopCount) {
          index = looper.loopTopIndex;
        } else {
          this._loopStack.pop();
        }
        this._commandIndex = index;
      }
    }]);
    return MMLIterator2;
  }();
  function arrayToIterator(array) {
    var index = 0;
    return {
      next: function next() {
        if (index < array.length) {
          return { done: false, value: array[index++] };
        }
        return { done: true };
      }
    };
  }
  function isNoteEvent(command) {
    return command.type === Syntax.Note || command.type === Syntax.Rest;
  }
  var MMLIterator_1 = MMLIterator;
  var lib = MMLIterator_1;
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
        map_object(M.params, function(def, name) {
          if (typeof P[name] === "undefined") {
            P[name] = def.D;
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
            vol = clamp(vol, 0, 10);
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
      for (var name in params) {
        if (Object_keys(params[name]).length == 0) {
          delete params[name];
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
        p.Generator.Func = rchoose(["square", "saw", "sine"]);
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
        p.Generator.Func = rchoose(["square", "saw", "noise"]);
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
        RemoveEmptyParams(p);
        return p;
      },
      Lucky: function() {
        var p = EmptyParams();
        map_object(p, function(out, moduleName) {
          var defs = jsfx2.Module[moduleName].params;
          map_object(defs, function(def, name) {
            if (def.C) {
              var values = Object_keys(def.C);
              out[name] = values[values.length * random2() | 0];
            } else {
              out[name] = random2() * (def.H - def.L) + def.L;
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
        RemoveEmptyParams(p);
        return p;
      },
      Click: function() {
        var p = runif() > 0.5 ? jsfx2.Preset.Hit() : jsfx2.Preset.Explosion();
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
    jsfx2.G.triangle = newGenerator("sample = Math.abs(4 * ((phase/TAU - 0.25)%1) - 2) - 1;");
    jsfx2.G.square = newGenerator("var s = Math.sin(phase); sample = s > A ? 1.0 : s < A ? -1.0 : A;");
    jsfx2.G.synth = newGenerator("sample = Math.sin(phase) + .5*Math.sin(phase/2) + .3*Math.sin(phase/4);");
    jsfx2.G.noise = newGenerator("if(phase % TAU < 4){__noiseLast = Math.random() * 2 - 1;} sample = __noiseLast;");
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
      return new Function("$", "block", "var TAU = Math.PI * 2;\nvar sample;\nvar phase = +$.generatorPhase,\n	A = +$.generatorA, ASlide = +$.generatorASlide,\n	B = +$.generatorB, BSlide = +$.generatorBSlide;\n\nfor(var i = 0; i < block.length; i++){\n	var phaseSpeed = block[i];\n	phase += phaseSpeed;\n	if(phase > TAU){ phase -= TAU };\n	A += ASlide; B += BSlide;\n   A = A < 0 ? 0 : A > 1 ? 1 : A;\n   B = B < 0 ? 0 : B > 1 ? 1 : B;\n" + line + "	block[i] = sample;\n}\n\n$.generatorPhase = phase;\n$.generatorA = A;\n$.generatorB = B;\nreturn block.length;\n");
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
      assert(into.length / 2 == floats.length, "the target buffer must be twice as large as the iinput");
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
    function clamp(v, min, max) {
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
      for (var name in obj) {
        if (obj.hasOwnProperty(name)) {
          r[name] = fn(obj[name], name);
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
      for (var name in obj) {
        r.push(name);
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
  let volume;
  let isStarted = false;
  function init$3(_audioContext = void 0) {
    audioContext = _audioContext == null ? new (window.AudioContext || window.webkitAudioContext)() : _audioContext;
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
    volume = _volume;
  }
  function getQuantizedTime(time) {
    if (quantize == null) {
      return time;
    }
    const interval = playInterval * quantize;
    return interval > 0 ? Math.ceil(time / interval) * interval : time;
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
  function pitchToFreq(pitch) {
    return 440 * Math.pow(2, (pitch - 69) / 12);
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
  const types = [
    "coin",
    "laser",
    "explosion",
    "powerUp",
    "hit",
    "jump",
    "select",
    "random",
    "synth",
    "tone",
    "click"
  ];
  const typeFunctionNames = {
    coin: "Coin",
    laser: "Laser",
    explosion: "Explosion",
    powerUp: "Powerup",
    hit: "Hit",
    jump: "Jump",
    select: "Select",
    random: "Lucky",
    synth: "Synth",
    tone: "Tone",
    click: "Click"
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
  function update$3() {
    const currentTime = audioContext.currentTime;
    soundEffects$1.forEach((se) => {
      updateSoundEffect(se, currentTime);
    });
  }
  function get$2(type = void 0, seed = void 0, numberOfSounds = 2, volume2 = 0.5, freq = void 0, attackRatio = 1, sustainRatio = 1) {
    if (seed != null) {
      random$2.setSeed(seed);
    }
    const preset = jsfx.Preset[typeFunctionNames[type != null ? type : types[random$2.getInt(8)]]];
    const params = times(numberOfSounds, () => {
      const p = preset();
      if (freq != null && p.Frequency.Start != null) {
        p.Frequency.Start = freq;
      }
      if (p.Volume.Attack != null) {
        p.Volume.Attack *= attackRatio;
      }
      if (p.Volume.Sustain != null) {
        p.Volume.Sustain *= sustainRatio;
      }
      return p;
    });
    return createBuffers(type, params, volume2);
  }
  function createBuffers(type, params, volume$1) {
    const buffers = params.map((p) => {
      const values = live._generate(p);
      const buffer = audioContext.createBuffer(1, values.length, jsfx.SampleRate);
      var channelData = buffer.getChannelData(0);
      channelData.set(values);
      return buffer;
    });
    const gainNode = audioContext.createGain();
    gainNode.gain.value = volume$1 * volume;
    gainNode.connect(audioContext.destination);
    return {
      type,
      params,
      volume: volume$1,
      buffers,
      bufferSourceNodes: void 0,
      gainNode,
      isPlaying: false,
      playedTime: void 0
    };
  }
  function getForSequence(sequence, isDrum, seed, type, volume2) {
    const random2 = new Random();
    random2.setSeed(seed);
    let se;
    if (isDrum) {
      let t = random2.select(["hit", "hit", "click", "click", "explosion"]);
      if (type != null) {
        t = type;
      }
      se = get$2(t, random2.getInt(999999999), t === "explosion" ? 1 : 2, volume2 != null ? volume2 : t === "explosion" ? 0.4 : 0.5, random2.get(100, 200), t === "explosion" ? 0.5 : 1, t === "explosion" ? 0.2 : 1);
    } else {
      const al = calcNoteLengthAverage(sequence);
      let t = random2.get() < 1 / al ? "select" : random2.select(["tone", "tone", "synth"]);
      if (type != null) {
        t = type;
      }
      se = get$2(t, random2.getInt(999999999), t !== "select" ? 1 : 2, volume2 != null ? volume2 : t === "tone" ? 0.3 : t === "synth" ? 0.4 : 0.25, 261.6, t !== "select" ? 0.1 : 1, t !== "select" ? 2 : 1);
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
  function add$1(se) {
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
    let volume2 = 0.5;
    if (vs != null) {
      volume2 = Number.parseInt(vs[0].substring(1)) / volumeMultiplier;
      leftMml = leftMml.replace(/v\d+/, "");
    }
    return { mml: leftMml, args: { isDrum, seed, type, volume: volume2 } };
  }
  function get$1(mml, sequence, soundEffect2, visualizer) {
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
  function get(parts, notesStepsCount, speedRatio = 1) {
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
  function add(track) {
    tracks.push(track);
  }
  function remove(track) {
    tracks = tracks.filter((t) => t !== track);
  }
  function update$1() {
    tracks.forEach((t) => {
      updateTrack(t);
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
  function updateTrack(track) {
    if (!track.isPlaying) {
      return;
    }
    const currentTime = audioContext.currentTime;
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
    r: "random"
  };
  const random$1 = random$2;
  let baseRandomSeed$1 = 1;
  function setSeed$1(_baseRandomSeed) {
    baseRandomSeed$1 = _baseRandomSeed;
  }
  function generateBgm(name, pitch, len, interval, numberOfTracks, soundEffectTypes, volume2) {
    random$1.setSeed(baseRandomSeed$1 + getHashFromString(name));
    initProgression();
    prevTrack = null;
    let param = random$1.select(soundEffectTypes);
    const tracks2 = times(numberOfTracks, () => {
      const randomness = Math.floor(Math.abs(random$1.get() + random$1.get() - 1) * 3);
      const chordOffset = Math.floor((random$1.get() + random$1.get() - 1) * 10);
      const velocityRatio = Math.abs(random$1.get() + random$1.get() - 1);
      const hasSameNoteWithPrevPart = random$1.get() < 0.25;
      if (!hasSameNoteWithPrevPart) {
        param = random$1.select(soundEffectTypes);
      }
      const isLimitNoteWidth = random$1.get() < 0.5;
      const isLimitNoteResolution = random$1.get() < 0.5;
      const isRepeatHalf = random$1.get() < 0.9;
      return generatePart(len, param, pitch, 0.7, randomness, chordOffset, velocityRatio, hasSameNoteWithPrevPart, isLimitNoteWidth, isLimitNoteResolution, isRepeatHalf, void 0, volume2);
    });
    return getTrack(tracks2, 0.5 / interval);
  }
  function generateJingle(name = "0", isSe = false, note = 69 - 12, len = 16, interval = 0.25, numberOfTracks = 4, volume2 = 1) {
    random$1.setSeed(baseRandomSeed$1 + getHashFromString(name));
    initProgression();
    prevTrack = null;
    let soundEffectType = playPrefixes[name[0]];
    if (soundEffectType == null) {
      soundEffectType = types[random$1.getInt(8)];
    }
    let durationRatio = 0.8;
    if (isSe) {
      interval /= 4;
      durationRatio /= 2;
    }
    const tracks2 = times(numberOfTracks, () => {
      const randomness = Math.floor(Math.abs(random$1.get() + random$1.get() - 1) * 3);
      const chordOffset = Math.floor((random$1.get() + random$1.get() - 1) * 10);
      const velocityRatio = isSe ? 2 : Math.abs(random$1.get() + random$1.get() - 1);
      const hasSameNoteWithPrevPart = random$1.get() < 0.25;
      const isLimitNoteWidth = isSe ? false : random$1.get() < 0.5;
      const isLimitNoteResolution = random$1.get() < 0.5;
      const isRepeatHalf = isSe ? random$1.get() < 0.25 : random$1.get() < 0.9;
      const restRatio = random$1.get(0.5);
      const track2 = generatePart(len, soundEffectType, note, durationRatio, randomness, chordOffset, velocityRatio, hasSameNoteWithPrevPart, isLimitNoteWidth, isLimitNoteResolution, isRepeatHalf, restRatio, volume2);
      return track2;
    });
    return getTrack(tracks2, 0.5 / interval);
  }
  function getTrack(gps, speedRatio) {
    const parts = gps.map((t) => {
      const notes = [];
      t.notes.forEach((n, i) => {
        if (n != null) {
          notes.push({ pitch: n + 69, quantizedStartStep: i * 2 });
        }
      });
      return get$1(void 0, { notes }, t.soundEffect);
    });
    return get(parts, gps[0].notes.length * 2, speedRatio);
  }
  let prevTrack;
  function generatePart(len = 32, soundEffectName, pitch = 60, durationRatio = 1, chordOffset = 0, randomness = 0, velocityRatio = 1, hasSameNoteWithPrevPart = false, isLimitNoteWidth = false, isLimitNoteResolution = false, isRepeatHalf = false, restRatio = null, volume2 = 0.1) {
    const generatedPart = getGeneratedPart(soundEffectName, pitchToFreq(pitch), durationRatio, volume2);
    if (prevTrack != null && hasSameNoteWithPrevPart) {
      generatedPart.noteRatios = prevTrack.noteRatios;
    } else {
      const pattern = restRatio != null ? createRandomPatternWithRestRatio(len, restRatio) : createRandomPattern(len);
      generatedPart.noteRatios = createNoteRatios(pattern, isLimitNoteWidth ? 0 : -1, 1, velocityRatio, isRepeatHalf);
    }
    generatedPart.notes = createNotes(generatedPart.noteRatios, chordOffset, randomness, isLimitNoteResolution);
    prevTrack = generatedPart;
    return generatedPart;
  }
  function createRandomPattern(len) {
    let pattern = times(len, () => false);
    let pi = 4;
    while (pi <= len) {
      pattern = reversePattern(pattern, pi);
      pi *= 2;
    }
    return pattern;
  }
  function reversePattern(pattern, interval) {
    let pt = times(interval, () => false);
    const pn = Math.floor(Math.abs(random$1.get() + random$1.get() - 1) * 4);
    for (let i = 0; i < pn; i++) {
      pt[random$1.getInt(interval - 1)] = true;
    }
    return pattern.map((p, i) => pt[i % interval] ? !p : p);
  }
  function createRandomPatternWithRestRatio(len, restRatio) {
    return times(len, () => random$1.get() >= restRatio);
  }
  const chords = [
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
      random$1.get() < 0.7 ? bp[1] : random$1.getInt(chords.length)
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
      let chord = chords[progression[i][1]];
      let n = nr;
      if (isLimitNoteResolution) {
        n = Math.floor(n * 2) / 2;
      }
      let b = Math.floor(n);
      let cn = Math.floor((n - b) * chord.length);
      cn += offset + random$1.getInt(-randomness, randomness + 1);
      while (cn >= chord.length) {
        cn -= chord.length;
        b++;
      }
      while (cn < 0) {
        cn += chord.length;
        b--;
      }
      return d + b * 12 + chord[cn];
    });
  }
  function getGeneratedPart(soundEffectName, freq, durationRatio, volume2) {
    return {
      noteRatios: void 0,
      notes: void 0,
      soundEffect: get$2(soundEffectName, void 0, 1, volume2, freq, durationRatio, durationRatio)
    };
  }
  const random = random$2;
  let baseRandomSeed;
  let jingles;
  let generatedTrack;
  function play(name = "0", numberOfSounds = 2, pitch, volume2 = 1) {
    playSoundEffect(playPrefixes[name[0]], {
      seed: baseRandomSeed + getHashFromString(name),
      numberOfSounds,
      pitch,
      volume: volume2
    });
  }
  function playBgm(name = "0", pitch = 69 - 24, len = 32, interval = 0.25, numberOfTracks = 4, soundEffectTypes = ["laser", "select", "hit", "hit"], volume2 = 1) {
    generatedTrack = generateBgm(name, pitch, len, interval, numberOfTracks, soundEffectTypes, volume2);
    add(generatedTrack);
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
  function playJingle(name = "0", isSoundEffect = false, note = 69 - 12, len = 16, interval = 0.25, numberOfTracks = 4, volume2 = 1) {
    const key = `${name}_${isSoundEffect}_${note}_${len}_${interval}_${numberOfTracks}_${volume2}`;
    if (jingles[key] == null) {
      const jingle = generateJingle(name, isSoundEffect, note, len, interval, numberOfTracks, volume2);
      add(jingle);
      jingles[key] = jingle;
    }
    play$1(jingles[key]);
  }
  function stopJingles() {
    stopAll();
  }
  const mmlQuantizeInterval = 0.125;
  let soundEffects;
  let mmlTrack;
  function playMml(mmlStrings, _options) {
    const options = __spreadValues(__spreadValues({}, { volume: 1, speed: 1, isLooping: true }), _options);
    let notesStepsCount = 0;
    const tracks2 = mmlStrings.map((ms) => fromMml(ms));
    tracks2.forEach((t) => {
      const s = getNotesStepsCount(t.mml);
      if (s > notesStepsCount) {
        notesStepsCount = s;
      }
    });
    const parts = tracks2.map((t) => {
      const { mml, args } = t;
      const sequence = mmlToQuantizedSequence(mml, notesStepsCount);
      const se = getForSequence(sequence, args.isDrum, args.seed, args.type, args.volume * options.volume);
      return get$1(mml, sequence, se);
    });
    mmlTrack = get(parts, notesStepsCount, options.speed);
    add(mmlTrack);
    play$1(mmlTrack, options.isLooping);
  }
  function stopMml() {
    if (mmlTrack == null) {
      return;
    }
    stop(mmlTrack);
    remove(mmlTrack);
    mmlTrack = void 0;
  }
  function playSoundEffect(type = void 0, _options) {
    const options = __spreadValues(__spreadValues({}, { seed: void 0, numberOfSounds: 2, volume: 1, pitch: void 0 }), _options);
    const key = `${type}_${JSON.stringify(options)}`;
    if (soundEffects[key] == null) {
      if (type == null) {
        random.setSeed(options.seed);
        type = types[random.getInt(8)];
      }
      const se = get$2(type, options.seed == null ? baseRandomSeed : options.seed, options.numberOfSounds, options.volume, options.pitch == null ? void 0 : pitchToFreq(options.pitch));
      add$1(se);
      soundEffects[key] = se;
    }
    play$2(soundEffects[key]);
  }
  function update() {
    update$1();
    update$3();
  }
  function init(baseRandomSeed2 = 1, audioContext2 = void 0) {
    setSeed(baseRandomSeed2);
    init$3(audioContext2);
    reset();
  }
  function reset() {
    init$1();
    jingles = {};
    init$2();
    soundEffects = {};
    stopMml();
  }
  function setSeed(_baseRandomSeed = 1) {
    baseRandomSeed = _baseRandomSeed;
    setSeed$1(baseRandomSeed);
  }
  function getNotesStepsCount(mml) {
    const iter = new lib(mml);
    for (let ne of iter) {
      if (ne.type === "end") {
        return Math.floor(ne.time / mmlQuantizeInterval);
      }
    }
  }
  function mmlToQuantizedSequence(mml, notesStepsCount) {
    const notes = [];
    const iter = new lib(mml);
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
