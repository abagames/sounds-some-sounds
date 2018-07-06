!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.sss=t():e.sss=t()}(window,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t){var n;!function(e){"use strict";String.fromCharCode;var t=2*+Math.PI,n=16,r=1,a=Math.sin,o=Math.pow,i=Math.abs;e.SampleRate=0,e.Sec=0,e.SetSampleRate=function(t){e.SampleRate=0|t,e.Sec=0|t},e.SetSampleRate(function(){if(void 0!==u)return(new u).sampleRate;return 44100}()),e.Sound=function(t){var n=new h(t,e.DefaultModules),r=b(n.getSamplesLeft());return n.generate(r),g(r)},e.Sounds=function(t,n,r){var a={},o={};o._audio=a;var i=[];P(t,function(e,t){o[t]=function(){void 0!==a[t]&&(a[t].currentTime=0,a[t].play())},i.push(t)});var u=0,l=i.length;return function o(){if(0!=i.length){var s=i.shift();a[s]=e.Sound(t[s]),r&&r(s,++u,l),window.setTimeout(o,30)}else n&&n(sounds)}(),o},e.SoundsImmediate=function(t){var n={},r={};return r._audio=n,P(t,function(t,a){n[a]=e.Sound(t),r[a]=function(){void 0!==n[a]&&(n[a].currentTime=0,n[a].play())}}),r};var u=window.AudioContext||window.webkitAudioContext;void 0!==u?(e.Node=function(t,n,r,a,o){var i=t.createScriptProcessor(a,0,1),u=new h(n,r||e.DefaultModules);return i.onaudioprocess=function(e){var t=e.outputBuffer.getChannelData(0);u.generate(t),!o&&u.finished&&setTimeout(function(){i.disconnect()},30)},i},e.Live=function(t,n,r){r=r||2048;var a={},o=new u,i=o.createGain();function l(e,t){var n=o.createBufferSource();if(n.buffer=e,null!=t&&null!=n.playbackRate){const e=Math.pow(2,1/12);n.playbackRate.value=Math.pow(e,t/100)}return n.start=n.start||n.noteOn,n}return i.connect(o.destination),a._context=o,a._volume=i,P(t,function(t,u){a[u]=function(){e.Node(o,t,n,r).connect(i)}}),a._close=function(){o.close()},a._play=function(t){e.Node(o,t,n,r).connect(i)},a._createBuffer=function(t){var n=new h(t,e.DefaultModules),r=b(n.getSamplesLeft());return n.generate(r),a._createBufferFromBlock(r)},a._createEmptyBuffer=function(){return a._createBufferFromBlock([0])},a._createBufferFromBlock=function(t){var n=o.createBuffer(1,t.length,e.SampleRate);return n.getChannelData(0).set(t),n},a._playBuffer=function(e,t,n){var r=l(e,n);r.connect(i),r.start(t)},a._playBufferAndConnect=function(e,t,n,r){var a=l(e,r);a.connect(n),n.connect(i),a.start(t)},a._createGain=function(){return o.createGain()},a}):e.Live=function(e,t,n){return null},e.Module={},e.G={};var l=e.stage={PhaseSpeed:0,PhaseSpeedMod:10,Generator:20,SampleMod:30,Volume:40};function s(e,t){return e.stage-t.stage}function c(e,t){for(var n=0;n<t.length;n+=1){var r=t[n],a=e[r.name]||{};P(r.params,function(e,t){void 0===a[t]&&(a[t]=e.D)}),e[r.name]=a}}function h(t,n){t=t||{},n=n||e.DefaultModules,t="function"==typeof t?t():JSON.parse(JSON.stringify(t)),this.finished=!1,this.state={SampleRate:t.SampleRate||e.SampleRate},(n=n.slice()).sort(s),this.modules=n,c(t,n);for(var r=0;r<this.modules.length;r+=1){var a=this.modules[r];this.modules[r].setup(this.state,t[a.name])}}e.InitDefaultParams=c,e.Processor=h,h.prototype={generate:function(e){for(var t=0;t<e.length;t+=1)e[t]=0;if(!this.finished){var n=this.state,r=0|e.length;for(t=0;t<this.modules.length;t+=1){var a=0|this.modules[t].process(n,e.subarray(0,r));r=Math.min(r,a)}r<e.length&&(this.finished=!0);for(t=r;t<e.length;t++)e[t]=0}},getSamplesLeft:function(){for(var e=0,t=0;t<this.state.envelopes.length;t+=1)e+=this.state.envelopes[t].N;return 0===e&&(e=3*this.state.SampleRate),e}},e.Module.Frequency={name:"Frequency",params:{Start:{L:30,H:1800,D:440},Min:{L:30,H:1800,D:30},Max:{L:30,H:1800,D:1800},Slide:{L:-1,H:1,D:0},DeltaSlide:{L:-1,H:1,D:0},RepeatSpeed:{L:0,H:3,D:0},ChangeAmount:{L:-12,H:12,D:0},ChangeSpeed:{L:0,H:1,D:0}},stage:l.PhaseSpeed,setup:function(e,n){var r=e.SampleRate;e.phaseParams=n,e.phaseSpeed=n.Start*t/r,e.phaseSpeedMax=n.Max*t/r,e.phaseSpeedMin=n.Min*t/r,e.phaseSpeedMin=Math.min(e.phaseSpeedMin,e.phaseSpeed),e.phaseSpeedMax=Math.max(e.phaseSpeedMax,e.phaseSpeed),e.phaseSlide=1+64*o(n.Slide,3)/r,e.phaseDeltaSlide=o(n.DeltaSlide,3)/(1e3*r),e.repeatTime=0,e.repeatLimit=1/0,n.RepeatSpeed>0&&(e.repeatLimit=n.RepeatSpeed*r),e.arpeggiatorTime=0,e.arpeggiatorLimit=n.ChangeSpeed*r,0==n.ChangeAmount&&(e.arpeggiatorLimit=1/0),e.arpeggiatorMod=1+n.ChangeAmount/12},process:function(e,t){for(var n=+e.phaseSpeed,r=+e.phaseSpeedMin,a=+e.phaseSpeedMax,o=+e.phaseSlide,i=+e.phaseDeltaSlide,u=e.repeatTime,l=e.repeatLimit,s=e.arpeggiatorTime,c=e.arpeggiatorLimit,h=e.arpeggiatorMod,f=0;f<t.length;f++){if(n=(n*=o+=i)<r?r:n>a?a:n,u>l)return this.setup(e,e.phaseParams),f+this.process(e,t.subarray(f))-1;u++,s>c&&(n*=h,s=0,c=1/0),s++,t[f]+=n}return e.repeatTime=u,e.arpeggiatorTime=s,e.arpeggiatorLimit=c,e.phaseSpeed=n,e.phaseSlide=o,t.length}},e.Module.Vibrato={name:"Vibrato",params:{Depth:{L:0,H:1,D:0},DepthSlide:{L:-1,H:1,D:0},Frequency:{L:.01,H:48,D:0},FrequencySlide:{L:-1,H:1,D:0}},stage:l.PhaseSpeedMod,setup:function(e,n){var r=e.SampleRate;e.vibratoPhase=0,e.vibratoDepth=n.Depth,e.vibratoPhaseSpeed=n.Frequency*t/r,e.vibratoPhaseSpeedSlide=1+3*o(n.FrequencySlide,3)/r,e.vibratoDepthSlide=n.DepthSlide/r},process:function(e,n){var r=+e.vibratoPhase,o=+e.vibratoDepth,i=+e.vibratoPhaseSpeed,u=+e.vibratoPhaseSpeedSlide,l=+e.vibratoDepthSlide;if(0==o&&l<=0)return n.length;for(var s=0;s<n.length;s++)(r+=i)>t&&(r-=t),n[s]+=n[s]*a(r)*o,i*=u,o=v(o+=l);return e.vibratoPhase=r,e.vibratoDepth=o,e.vibratoPhaseSpeed=i,n.length}},e.Module.Generator={name:"Generator",params:{Func:{C:e.G,D:"square"},A:{L:0,H:1,D:0},B:{L:0,H:1,D:0},ASlide:{L:-1,H:1,D:0},BSlide:{L:-1,H:1,D:0}},stage:l.Generator,setup:function(t,n){t.generatorPhase=0,"string"==typeof n.Func?t.generator=e.G[n.Func]:t.generator=n.Func,"object"==typeof t.generator&&(t.generator=t.generator.create()),S("function"==typeof t.generator,"generator must be a function"),t.generatorA=n.A,t.generatorASlide=n.ASlide,t.generatorB=n.B,t.generatorBSlide=n.BSlide},process:function(e,t){return e.generator(e,t)}};e.Module.Guitar={name:"Guitar",params:{A:{L:0,H:1,D:1},B:{L:0,H:1,D:1},C:{L:0,H:1,D:1}},stage:l.Generator,setup:function(e,t){e.guitarA=t.A,e.guitarB=t.B,e.guitarC=t.C,e.guitarBuffer=b(65536),e.guitarHead=0;for(var n=e.guitarBuffer,r=0;r<n.length;r++)n[r]=2*D()-1},process:function(e,n){for(var r=65536,a=r-1,o=+e.guitarA,i=+e.guitarB,u=+e.guitarC,l=o+i+u,s=e.guitarHead,c=e.guitarBuffer,h=0;h<n.length;h++){var f=t/n[h]|0,p=s-(f=f>r?r:f)+r&a;c[s]=(c[p-0+r&a]*o+c[p-1+r&a]*i+c[p-2+r&a]*u)/l,n[h]=c[s],s=s+1&a}return e.guitarHead=s,n.length}},e.Module.Filter={name:"Filter",params:{LP:{L:0,H:1,D:1},LPSlide:{L:-1,H:1,D:0},LPResonance:{L:0,H:1,D:0},HP:{L:0,H:1,D:0},HPSlide:{L:-1,H:1,D:0}},stage:l.SampleMod+0,setup:function(e,t){e.FilterEnabled=t.HP>1e-6||t.LP<1-1e-6,e.LPEnabled=t.LP<1-1e-6,e.LP=o(t.LP,3)/10,e.LPSlide=1+100*t.LPSlide/e.SampleRate,e.LPPos=0,e.LPPosSlide=0,e.LPDamping=5/(1+20*o(t.LPResonance,2))*(.01+t.LP),e.LPDamping=1-Math.min(e.LPDamping,.8),e.HP=o(t.HP,2)/10,e.HPPos=0,e.HPSlide=1+100*t.HPSlide/e.SampleRate},enabled:function(e){return e.FilterEnabled},process:function(e,t){if(!this.enabled(e))return t.length;for(var n=+e.LP,r=+e.LPPos,a=+e.LPPosSlide,o=+e.LPSlide,i=+e.LPDamping,u=+e.LPEnabled,l=+e.HP,s=+e.HPPos,c=+e.HPSlide,h=0;h<t.length;h++){(l>1e-6||l<-1e-6)&&(l=(l*=c)<1e-6?1e-6:l>.1?.1:l);var f=r;n=(n*=o)<0?n=0:n>.1?.1:n;var p=t[h];u?(a+=(p-r)*n,a*=i):(r=p,a=0),s+=(r+=a)-f,s*=1-l,t[h]=s}return e.LPPos=r,e.LPPosSlide=a,e.LP=n,e.HP=l,e.HPPos=s,t.length}};function f(){return P(e.Module,function(){return{}})}function p(e){for(var t in e)0==F(e[t]).length&&delete e[t]}e.Module.Phaser={name:"Phaser",params:{Offset:{L:-1,H:1,D:0},Sweep:{L:-1,H:1,D:0}},stage:l.SampleMod+1,setup:function(e,t){e.phaserBuffer=b(1024),e.phaserPos=0,e.phaserOffset=1020*o(t.Offset,2),e.phaserOffsetSlide=4e3*o(t.Sweep,3)/e.SampleRate},enabled:function(e){return i(e.phaserOffsetSlide)>1e-6||i(e.phaserOffset)>1e-6},process:function(e,t){if(!this.enabled(e))return t.length;for(var n=e.phaserBuffer,r=0|e.phaserPos,a=+e.phaserOffset,o=+e.phaserOffsetSlide,i=0;i<t.length;i++){(a+=o)<0&&(a=-a,o=-o),a>1023&&(a=1023,o=0),n[r]=t[i];var u=r-(0|a)+1024&1023;t[i]+=n[u],r=r+1&1023|0}return e.phaserPos=r,e.phaserOffset=a,t.length}},e.Module.Volume={name:"Volume",params:{Master:{L:0,H:1,D:.5},Attack:{L:.001,H:1,D:.01},Sustain:{L:0,H:2,D:.3},Punch:{L:0,H:3,D:1},Decay:{L:.001,H:2,D:1}},stage:l.Volume,setup:function(e,t){var n=e.SampleRate,r=t.Master,a=r*(1+t.Punch);e.envelopes=[{S:0,E:r,N:t.Attack*n|0},{S:a,E:r,N:t.Sustain*n|0},{S:r,E:0,N:t.Decay*n|0}];for(var o=0;o<e.envelopes.length;o+=1){var i=e.envelopes[o];i.G=(i.E-i.S)/i.N}},process:function(e,t){for(var n=0;e.envelopes.length>0&&n<t.length;){for(var r=e.envelopes[0],a=r.S,o=r.G,i=0|Math.min(t.length-n,r.N),u=n+i|0;n<u;n+=1)t[n]*=a,a=y(a+=o,0,10);r.S=a,r.N-=i,r.N<=0&&e.envelopes.shift()}return n}},e.DefaultModules=[e.Module.Frequency,e.Module.Vibrato,e.Module.Generator,e.Module.Filter,e.Module.Phaser,e.Module.Volume],e.DefaultModules.sort(s),e.EmptyParams=f,e._RemoveEmptyParams=p,e.Preset={Reset:function(){return f()},Coin:function(){var e=f();return e.Frequency.Start=M(880,660),e.Volume.Sustain=M(.1),e.Volume.Decay=M(.4,.1),e.Volume.Punch=M(.3,.3),M()<.5&&(e.Frequency.ChangeSpeed=M(.15,.1),e.Frequency.ChangeAmount=M(8,4)),p(e),e},Laser:function(){var e=f();return e.Generator.Func=L(["square","saw","sine"]),M()<.33?(e.Frequency.Start=M(880,440),e.Frequency.Min=M(.1),e.Frequency.Slide=M(.3,-.8)):(e.Frequency.Start=M(1200,440),e.Frequency.Min=e.Frequency.Start-M(880,440),e.Frequency.Min<110&&(e.Frequency.Min=110),e.Frequency.Slide=M(.3,-1)),M()<.5?(e.Generator.A=M(.5),e.Generator.ASlide=M(.2)):(e.Generator.A=M(.5,.4),e.Generator.ASlide=M(.7)),e.Volume.Sustain=M(.2,.1),e.Volume.Decay=M(.4),M()<.5&&(e.Volume.Punch=M(.3)),M()<.33&&(e.Phaser.Offset=M(.2),e.Phaser.Sweep=M(.2)),M()<.5&&(e.Filter.HP=M(.3)),p(e),e},Explosion:function(){var e=f();return e.Generator.Func="noise",M()<.5?(e.Frequency.Start=M(440,40),e.Frequency.Slide=M(.4,-.1)):(e.Frequency.Start=M(1600,220),e.Frequency.Slide=M(-.2,-.2)),M()<.2&&(e.Frequency.Slide=0),M()<.3&&(e.Frequency.RepeatSpeed=M(.5,.3)),e.Volume.Sustain=M(.3,.1),e.Volume.Decay=M(.5),e.Volume.Punch=M(.6,.2),M()<.5&&(e.Phaser.Offset=M(.9,-.3),e.Phaser.Sweep=M(-.3)),M()<.33&&(e.Frequency.ChangeSpeed=M(.3,.6),e.Frequency.ChangeAmount=M(24,-12)),p(e),e},Powerup:function(){var e=f();return M()<.5?e.Generator.Func="saw":e.Generator.A=M(.6),e.Frequency.Start=M(220,440),M()<.5?(e.Frequency.Slide=M(.5,.2),e.Frequency.RepeatSpeed=M(.4,.4)):(e.Frequency.Slide=M(.2,.05),M()<.5&&(e.Vibrato.Depth=M(.6,.1),e.Vibrato.Frequency=M(30,10))),e.Volume.Sustain=M(.4),e.Volume.Decay=M(.4,.1),p(e),e},Hit:function(){var e=f();return e.Generator.Func=L(["square","saw","noise"]),e.Generator.A=M(.6),e.Generator.ASlide=M(1,-.5),e.Frequency.Start=M(880,220),e.Frequency.Slide=-M(.4,.3),e.Volume.Sustain=M(.1),e.Volume.Decay=M(.2,.1),M()<.5&&(e.Filter.HP=M(.3)),p(e),e},Jump:function(){var e=f();return e.Generator.Func="square",e.Generator.A=M(.6),e.Frequency.Start=M(330,330),e.Frequency.Slide=M(.4,.2),e.Volume.Sustain=M(.3,.1),e.Volume.Decay=M(.2,.1),M()<.5&&(e.Filter.HP=M(.3)),M()<.3&&(e.Filter.LP=M(-.6,1)),p(e),e},Select:function(){var e=f();return e.Generator.Func=L(["square","saw"]),e.Generator.A=M(.6),e.Frequency.Start=M(660,220),e.Volume.Sustain=M(.1,.1),e.Volume.Decay=M(.2),e.Filter.HP=.2,p(e),e},Lucky:function(){var t=f();return P(t,function(t,n){P(e.Module[n].params,function(e,n){if(e.C){var r=F(e.C);t[n]=r[r.length*D()|0]}else t[n]=D()*(e.H-e.L)+e.L})}),t.Volume.Master=.4,t.Filter={},p(t),t}},e.G.unoise=d("sample = Math.random();"),e.G.sine=d("sample = Math.sin(phase);"),e.G.saw=d("sample = 2*(phase/TAU - ((phase/TAU + 0.5)|0));"),e.G.triangle=d("sample = Math.abs(4 * ((phase/TAU - 0.25)%1) - 2) - 1;"),e.G.square=d("var s = Math.sin(phase); sample = s > A ? 1.0 : s < A ? -1.0 : A;"),e.G.synth=d("sample = Math.sin(phase) + .5*Math.sin(phase/2) + .3*Math.sin(phase/4);");function d(e){return new Function("$","block","var TAU = Math.PI * 2;\nvar sample;\nvar phase = +$.generatorPhase,\n\tA = +$.generatorA, ASlide = +$.generatorASlide,\n\tB = +$.generatorB, BSlide = +$.generatorBSlide;\n\nfor(var i = 0; i < block.length; i++){\n\tvar phaseSpeed = block[i];\n\tphase += phaseSpeed;\n\tif(phase > TAU){ phase -= TAU };\n\tA += ASlide; B += BSlide;\n   A = A < 0 ? 0 : A > 1 ? 1 : A;\n   B = B < 0 ? 0 : B > 1 ? 1 : B;\n"+e+"\tblock[i] = sample;\n}\n\n$.generatorPhase = phase;\n$.generatorA = A;\n$.generatorB = B;\nreturn block.length;\n")}function g(t){"undefined"!=typeof Float32Array&&S(t instanceof Float32Array,"data must be an Float32Array");var a=r*n>>3,o=e.SampleRate*a,i=function(e){if("undefined"==typeof Uint8Array)for(var t=new Array(e),n=0;n<t.length;n++)t[n]=0;return new Uint8Array(e)}(44+2*t.length),u=0;function l(e){for(var t=0;t<e.length;t+=1)i[u]=e.charCodeAt(t),u++}function s(e,t){t<=0||(i[u]=255&e,u++,s(e>>8,t-1))}return l("RIFF"),s(36+2*t.length,4),l("WAVEfmt "),s(16,4),s(1,2),s(r,2),s(e.SampleRate,4),s(o,4),s(a,2),s(n,2),l("data"),s(2*t.length,4),m(i.subarray(u),t),new Audio("data:audio/wav;base64,"+function(e){for(var t="",n=0;n<e.length;n+=32768){var r=Math.min(n+32768,e.length);t+=String.fromCharCode.apply(null,e.subarray(n,r))}return btoa(t)}(i))}function m(e,t){S(e.length/2==t.length,"the target buffer must be twice as large as the iinput");for(var n=0,r=0;r<t.length;r++){var a=32767*+t[r]|0;a=a<-32768?-32768:32767<a?32767:a,a+=a<0?65536:0,e[n]=255&a,e[++n]=a>>8,n++}}function S(e,t){if(!e)throw new Error(t)}function y(e,t,n){return n=+n,(e=+e)<(t=+t)?+t:e>n?+n:+e}function v(e){return(e=+e)<0?0:e>1?1:+e}function P(e,t){var n={};for(var r in e)e.hasOwnProperty(r)&&(n[r]=t(e[r],r));return n}function M(e,t){var n=D();return void 0!==e&&(n*=e),void 0!==t&&(n+=t),n}function L(e){return e[e.length*D()|0]}function F(e){var t=[];for(var n in e)t.push(n);return t}function b(e){if("undefined"==typeof Float32Array)for(var t=new Array(e),n=0;n<t.length;n++)t[n]=0;return new Float32Array(e)}e.G.noise=d("if(phase % TAU < 4){__noiseLast = Math.random() * 2 - 1;} sample = __noiseLast;"),e.G.string={create:function(){for(var e=65536,t=e-1,n=b(e),r=0;r<n.length;r++)n[r]=2*D()-1;var a=0;return function(r,o){for(var i=2*Math.PI,u=+r.generatorA,l=+r.generatorASlide,s=+r.generatorB,c=+r.generatorBSlide,h=n,f=0;f<o.length;f++){var p=o[f];s+=c,u=(u+=l)<0?0:u>1?1:u,s=s<0?0:s>1?1:s;var d=a-(i/p|0)+e&t,g=(1*h[d-0+e&t]+h[d-1+e&t]*u+h[d-2+e&t]*s)/(1+u+s);h[a]=g,o[f]=h[a],a=a+1&t}return r.generatorA=u,r.generatorB=s,o.length}}},e.CreateAudio=g,e.DownloadAsFile=function(e){S(e instanceof Audio,"input must be an Audio object"),document.location.href=e.src},e.Util={},e.Util.CopyFToU8=m,e._createFloatArray=b;var A=Math.random;function D(){return A()}e.setRandomFunc=function(e){A=e}}(n={}),e.exports=n},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0);let a,o;t.Preset=r.Preset;let i,u,l={},s={},c=[];const h={c:t.Preset.Coin,l:t.Preset.Laser,e:t.Preset.Explosion,p:t.Preset.Powerup,h:t.Preset.Hit,j:t.Preset.Jump,s:t.Preset.Select,u:t.Preset.Lucky},f=function(e){let t=[];for(let n in e)e.hasOwnProperty(n)&&t.push(e[n]);return t}(h);let p,d=.5,g=!1;function m(e){null!=a&&(a._volume.gain.value=e)}function S(){null!=a&&T(c,e=>e.stop())}function y(e=32,t=.25,n,r=60,a=1,i=0,u=0,l=1,s=!1,c=!1,h=!1,f=!1,d=null){const g=new D(n,v(r),a);if(g.noteInterval=t,null!=p&&s)g.noteRatios=p.noteRatios;else{const t=null!=d?function(e,t){return x(e,()=>o.get()>=t)}(e,d):function(e){let t=B(e,!1),n=4;for(;n<=e;)t=P(t,n),n*=2;return t}(e);g.noteRatios=function(e,t,n,r,a){let i=o.get(),u=o.get(-.5,.5),l=e.length/F.length,s=[];return e.forEach((e,c)=>{let h=Math.floor(c/l),f=c%l;if(a&&h===Math.floor(F.length/2))return s.push(s[f]),void(i=s[f]);e?(s.push(i),u+=o.get(-.25,.25),i+=u*r,(o.get()<.2||i<=t||i>=n)&&(i-=2*u,u*=-1)):s.push(null)}),s}(t,c?0:-1,1,l,f)}return g.notes=function(e,t,n,r){let a=e.length/F.length;return e.map((e,i)=>{if(null==e)return null;let u=Math.floor(i/a),l=F[u][0],s=M[F[u][1]],c=e;r&&(c=Math.floor(2*c)/2);let h=Math.floor(c),f=Math.floor((c-h)*s.length);for(f+=t+o.getInt(-n,n+1);f>=s.length;)f-=s.length,h++;for(;f<0;)f+=s.length,h--;return 100*(l+12*h+s[f])})}(g.noteRatios,i,u,h),p=g,g}function v(e){return 440*Math.pow(2,(e-69)/12)}function P(e,t){let n=B(t,!1);const r=Math.floor(4*Math.abs(o.get()+o.get()-1));for(let e=0;e<r;e++)n[o.getInt(t-1)]=!0;return G(e,(e,r)=>n[r%t]?!e:e)}t.init=function(e=0,n=120,l=60){a=r.Live({}),m(.1),u=e,o=new H,r.setRandomFunc(o.get),t.playInterval=60/n,i=1/l*2},t.setSeed=function(e=0){u=e},t.play=function(e="0",t=2,n=null,r=null,i=null){if(null==a)return;if(null!=l[e])return void l[e].play(i);if(o.setSeed(u+w(e)),null==r){let n=h[e[0]];void 0===n&&(n=o.select(f)),r=B(t,n)}const s=null==n?null:v(n);l[e]=new A(r,s),l[e].play(i)},t.playJingle=function(e="0",t=!1,n=57,r=16,i=.25,l=4,c=null,d=null){if(null==a)return;if(null!=s[e])return void s[e].forEach(e=>e.play(d));if(o.setSeed(u+w(e)),b(),p=null,null==c){let t=h[e[0]];void 0===t&&(t=o.select(f)),c=t}let g=.8;t&&(i/=4,g/=2),s[e]=x(l,()=>{const e=Math.floor(3*Math.abs(o.get()+o.get()-1)),a=Math.floor(10*(o.get()+o.get()-1)),u=t?2:Math.abs(o.get()+o.get()-1),l=o.get()<.25,s=!t&&o.get()<.5,h=o.get()<.5,f=t?o.get()<.25:o.get()<.9,p=o.get(.5),d=y(r,i,c,n,g,e,a,u,l,s,h,f,p);return d.isLooping=!1,d}),s[e].forEach(e=>e.play(d))},t.stopJingles=function(){q(s,e=>T(e,e=>e.stop()))},t.setVolume=m,t.setQuantize=function(e){d=e},t.update=function(){if(null==a)return;const e=a._context.currentTime,t=e+i;return q(l,n=>n.update(e,t)),q(s,n=>T(n,n=>n.update(e,t))),T(c,n=>n.update(e,t)),e},t.reset=function(){S(),l={},s={},c=[]},t.playEmpty=function(){if(null==a)return;if(g)return;const e=a._createEmptyBuffer();a._playBuffer(e,0),g=!0},t.playParam=function(e){null!=a&&a._play(e)},t.playBgm=function(e="0",n=45,r=32,i=.25,l=4,s=[t.Preset.Laser,t.Preset.Select,t.Preset.Hit,t.Preset.Hit],h=null){if(null==a)return;S(),o.setSeed(u+w(e)),b(),p=null;let f=o.select(s);T(c=x(l,()=>{const e=Math.floor(3*Math.abs(o.get()+o.get()-1)),t=Math.floor(10*(o.get()+o.get()-1)),a=Math.abs(o.get()+o.get()-1),u=o.get()<.25;u||(f=o.select(s));const l=o.get()<.5,c=o.get()<.5,h=o.get()<.9;return y(r,i,f,n,.7,e,t,a,u,l,c,h)}),e=>e.play(h))},t.stopBgm=S;const M=[[0,4,7],[0,3,7],[0,4,7,10],[0,4,7,11],[0,3,7,10]],L=[[[0,0],[7,0],[9,1],[4,1]],[[5,0],[0,0],[5,0],[7,0]],[[5,3],[7,2],[4,4],[9,1]],[[9,1],[2,1],[7,0],[0,0]],[[9,1],[5,0],[7,0],[0,0]]];let F;function b(){const e=o.select(L);F=e.map((e,t)=>[o.get()<.7?e[0]:L[o.getInt(L.length)][t][0],o.get()<.7?e[1]:o.getInt(M.length)])}class A{constructor(e,t=null,n=1){this.isPlaying=!1,this.playedTime=null,Array.isArray(e)||(e=[e]),this.buffers=G(e,e=>(e instanceof Function&&(e=e()),e.Volume.Sustain*=n,e.Volume.Decay*=n,null!=t&&(e.Frequency.Start=t),a._createBuffer(e))),this.gainNode=a._createGain()}play(e=null){this.isPlaying=!0,this.volume=e}stop(){this.isPlaying=!1}update(e,n){if(!this.isPlaying)return;this.isPlaying=!1;const r=t.playInterval*d,a=r>0?Math.ceil(e/r)*r:e;(null==this.playedTime||a>this.playedTime)&&(this.playLater(a),this.playedTime=a)}playLater(e,t=null){null==this.volume?T(this.buffers,n=>a._playBuffer(n,e,t)):(this.gainNode.gain.value=this.volume,T(this.buffers,n=>a._playBufferAndConnect(n,e,this.gainNode,t)))}}class D extends A{constructor(){super(...arguments),this.noteIndex=0,this.noteInterval=.25,this.scheduledTime=null,this.isLooping=!0}play(e=null){super.play(e),this.scheduledTime=null}update(e,t){if(this.isPlaying){null==this.scheduledTime&&this.calcFirstScheduledTime(e);for(let t=0;t<99&&!(this.scheduledTime>=e);t++)this.calcNextScheduledTime();if(this.scheduledTime<e)this.scheduledTime=null;else for(;this.scheduledTime<=t;){if(null!=this.nextNote&&this.playLater(this.scheduledTime,this.nextNote),!this.isLooping&&0===this.noteIndex)return void this.stop();this.calcNextScheduledTime()}}}calcFirstScheduledTime(e){this.scheduledTime=Math.ceil(e/t.playInterval)*t.playInterval-t.playInterval*this.noteInterval,this.noteIndex=0,this.calcNextScheduledTime()}calcNextScheduledTime(){const e=this.notes.length,n=t.playInterval*this.noteInterval;for(let t=0;t<e&&(this.scheduledTime+=n,this.nextNote=this.notes[this.noteIndex],this.noteIndex++,!(this.noteIndex>=e)||(this.noteIndex=0,this.isLooping))&&null==this.nextNote;t++);}}class H{get(e=1,t=null){return null==t&&(t=e,e=0),this.getToMaxInt()/4294967295*(t-e)+e}getInt(e,t=null){return null==t&&(t=e,e=0),this.getToMaxInt()%(t-e)+e}getPm(){return 2*this.getInt(2)-1}select(e){return e[this.getInt(e.length)]}setSeed(e=null,t=123456789,n=362436069,r=521288629,a=32){this.w=null!=e?e>>>0:Math.floor(4294967295*Math.random())>>>0,this.x=t>>>0,this.y=n>>>0,this.z=r>>>0;for(let e=0;e<a;e++)this.getToMaxInt();return this}getToMaxInt(){const e=this.x^this.x<<11;return this.x=this.y,this.y=this.z,this.z=this.w,this.w=(this.w^this.w>>>19^e^e>>>8)>>>0,this.w}constructor(){this.setSeed(),this.get=this.get.bind(this),this.getToMaxInt=this.getToMaxInt.bind(this)}}function w(e){let t=0;const n=e.length;for(let r=0;r<n;r++){t=(t<<5)-t+e.charCodeAt(r),t|=0}return t}function B(e,t){let n=[];for(let r=0;r<e;r++)n.push(t);return n}function x(e,t){let n=[];for(let r=0;r<e;r++)n.push(t(r));return n}function T(e,t){for(let n=0;n<e.length;n++)t(e[n])}function q(e,t){for(let n in e)t(e[n])}function G(e,t){let n=[];for(let r=0;r<e.length;r++)n.push(t(e[r],r));return n}}])});