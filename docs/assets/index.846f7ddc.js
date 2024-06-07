var ks=Object.defineProperty;var _s=(e,t,n)=>t in e?ks(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var wt=(e,t,n)=>(_s(e,typeof t!="symbol"?t+"":t,n),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const c of i)if(c.type==="childList")for(const d of c.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function n(i){const c={};return i.integrity&&(c.integrity=i.integrity),i.referrerpolicy&&(c.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?c.credentials="include":i.crossorigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function r(i){if(i.ep)return;i.ep=!0;const c=n(i);fetch(i.href,c)}})();function Rs(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Bi={exports:{}},qi={Note:"Note",Rest:"Rest",Octave:"Octave",OctaveShift:"OctaveShift",NoteLength:"NoteLength",NoteVelocity:"NoteVelocity",NoteQuantize:"NoteQuantize",Tempo:"Tempo",InfiniteLoop:"InfiniteLoop",LoopBegin:"LoopBegin",LoopExit:"LoopExit",LoopEnd:"LoopEnd"},Is={tempo:120,octave:4,length:4,velocity:100,quantize:75,loopCount:2},Fs=function(){function e(t,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();function Ds(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var Gs=function(){function e(t){Ds(this,e),this.source=t,this.index=0}return Fs(e,[{key:"hasNext",value:function(){return this.index<this.source.length}},{key:"peek",value:function(){return this.source.charAt(this.index)||""}},{key:"next",value:function(){return this.source.charAt(this.index++)||""}},{key:"forward",value:function(){for(;this.hasNext()&&this.match(/\s/);)this.index+=1}},{key:"match",value:function(n){return n instanceof RegExp?n.test(this.peek()):this.peek()===n}},{key:"expect",value:function(n){this.match(n)||this.throwUnexpectedToken(),this.index+=1}},{key:"scan",value:function(n){var r=this.source.substr(this.index),i=null;if(n instanceof RegExp){var c=n.exec(r);c&&c.index===0&&(i=c[0])}else r.substr(0,n.length)===n&&(i=n);return i&&(this.index+=i.length),i}},{key:"throwUnexpectedToken",value:function(){var n=this.peek()||"ILLEGAL";throw new SyntaxError("Unexpected token: "+n)}}]),e}(),zs=Gs,Bs=function(){function e(t,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();function qs(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var ie=qi,Hs=zs,Vs={c:0,d:2,e:4,f:5,g:7,a:9,b:11},Us=function(){function e(t){qs(this,e),this.scanner=new Hs(t)}return Bs(e,[{key:"parse",value:function(){var n=this,r=[];return this._readUntil(";",function(){r=r.concat(n.advance())}),r}},{key:"advance",value:function(){switch(this.scanner.peek()){case"c":case"d":case"e":case"f":case"g":case"a":case"b":return this.readNote();case"[":return this.readChord();case"r":return this.readRest();case"o":return this.readOctave();case">":return this.readOctaveShift(1);case"<":return this.readOctaveShift(-1);case"l":return this.readNoteLength();case"q":return this.readNoteQuantize();case"v":return this.readNoteVelocity();case"t":return this.readTempo();case"$":return this.readInfiniteLoop();case"/":return this.readLoop()}this.scanner.throwUnexpectedToken()}},{key:"readNote",value:function(){return{type:ie.Note,noteNumbers:[this._readNoteNumber(0)],noteLength:this._readLength()}}},{key:"readChord",value:function(){var n=this;this.scanner.expect("[");var r=[],i=0;return this._readUntil("]",function(){switch(n.scanner.peek()){case"c":case"d":case"e":case"f":case"g":case"a":case"b":r.push(n._readNoteNumber(i));break;case">":n.scanner.next(),i+=12;break;case"<":n.scanner.next(),i-=12;break;default:n.scanner.throwUnexpectedToken()}}),this.scanner.expect("]"),{type:ie.Note,noteNumbers:r,noteLength:this._readLength()}}},{key:"readRest",value:function(){return this.scanner.expect("r"),{type:ie.Rest,noteLength:this._readLength()}}},{key:"readOctave",value:function(){return this.scanner.expect("o"),{type:ie.Octave,value:this._readArgument(/\d+/)}}},{key:"readOctaveShift",value:function(n){return this.scanner.expect(/<|>/),{type:ie.OctaveShift,direction:n|0,value:this._readArgument(/\d+/)}}},{key:"readNoteLength",value:function(){return this.scanner.expect("l"),{type:ie.NoteLength,noteLength:this._readLength()}}},{key:"readNoteQuantize",value:function(){return this.scanner.expect("q"),{type:ie.NoteQuantize,value:this._readArgument(/\d+/)}}},{key:"readNoteVelocity",value:function(){return this.scanner.expect("v"),{type:ie.NoteVelocity,value:this._readArgument(/\d+/)}}},{key:"readTempo",value:function(){return this.scanner.expect("t"),{type:ie.Tempo,value:this._readArgument(/\d+(\.\d+)?/)}}},{key:"readInfiniteLoop",value:function(){return this.scanner.expect("$"),{type:ie.InfiniteLoop}}},{key:"readLoop",value:function(){var n=this;this.scanner.expect("/"),this.scanner.expect(":");var r={type:ie.LoopBegin},i={type:ie.LoopEnd},c=[];return c=c.concat(r),this._readUntil(/[|:]/,function(){c=c.concat(n.advance())}),c=c.concat(this._readLoopExit()),this.scanner.expect(":"),this.scanner.expect("/"),r.value=this._readArgument(/\d+/)||null,c=c.concat(i),c}},{key:"_readUntil",value:function(n,r){for(;this.scanner.hasNext()&&(this.scanner.forward(),!(!this.scanner.hasNext()||this.scanner.match(n)));)r()}},{key:"_readArgument",value:function(n){var r=this.scanner.scan(n);return r!==null?+r:null}},{key:"_readNoteNumber",value:function(n){var r=Vs[this.scanner.next()];return r+this._readAccidental()+n}},{key:"_readAccidental",value:function(){return this.scanner.match("+")?1*this.scanner.scan(/\++/).length:this.scanner.match("-")?-1*this.scanner.scan(/\-+/).length:0}},{key:"_readDot",value:function(){for(var n=(this.scanner.scan(/\.+/)||"").length,r=new Array(n),i=0;i<n;i++)r[i]=0;return r}},{key:"_readLength",value:function(){var n=[];n=n.concat(this._readArgument(/\d+/)),n=n.concat(this._readDot());var r=this._readTie();return r&&(n=n.concat(r)),n}},{key:"_readTie",value:function(){return this.scanner.forward(),this.scanner.match("^")?(this.scanner.next(),this._readLength()):null}},{key:"_readLoopExit",value:function(){var n=this,r=[];if(this.scanner.match("|")){this.scanner.next();var i={type:ie.LoopExit};r=r.concat(i),this._readUntil(":",function(){r=r.concat(n.advance())})}return r}}]),e}(),Js=Us,Ks=function(){function e(t,n){for(var r=0;r<n.length;r++){var i=n[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();function Qs(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var ne=qi,le=Is,Ws=Js,Xs=typeof Symbol<"u"?Symbol.iterator:"@@iterator",Ys=function(){function e(t){Qs(this,e),this.source=t,this._commands=new Ws(t).parse(),this._commandIndex=0,this._processedTime=0,this._iterator=null,this._octave=le.octave,this._noteLength=[le.length],this._velocity=le.velocity,this._quantize=le.quantize,this._tempo=le.tempo,this._infiniteLoopIndex=-1,this._loopStack=[],this._done=!1}return Ks(e,[{key:"hasNext",value:function(){return this._commandIndex<this._commands.length}},{key:"next",value:function(){if(this._done)return{done:!0,value:null};if(this._iterator){var n=this._iterator.next();if(!n.done)return n}var r=this._forward(!0);if(hi(r))this._iterator=this[r.type](r);else return this._done=!0,{done:!1,value:{type:"end",time:this._processedTime}};return this.next()}},{key:Xs,value:function(){return this}},{key:"_forward",value:function(n){for(;this.hasNext()&&!hi(this._commands[this._commandIndex]);){var r=this._commands[this._commandIndex++];this[r.type](r)}return n&&!this.hasNext()&&this._infiniteLoopIndex!==-1?(this._commandIndex=this._infiniteLoopIndex,this._forward(!1)):this._commands[this._commandIndex++]||{}}},{key:"_calcDuration",value:function(n){var r=this;n[0]===null&&(n=this._noteLength.concat(n.slice(1)));var i=null,c=0;return n=n.map(function(d){switch(d){case null:d=i;break;case 0:d=c*=2;break;default:i=c=d;break}var h=d!==null?d:le.length;return 60/r._tempo*(4/h)}),n.reduce(function(d,h){return d+h},0)}},{key:"_calcNoteNumber",value:function(n){return n+this._octave*12+12}},{key:ne.Note,value:function(n){var r=this,i="note",c=this._processedTime,d=this._calcDuration(n.noteLength),h=n.noteNumbers.map(function(A){return r._calcNoteNumber(A)}),M=this._quantize,y=this._velocity;return this._processedTime=this._processedTime+d,Zs(h.map(function(A){return{type:i,time:c,duration:d,noteNumber:A,velocity:y,quantize:M}}))}},{key:ne.Rest,value:function(n){var r=this._calcDuration(n.noteLength);this._processedTime=this._processedTime+r}},{key:ne.Octave,value:function(n){this._octave=n.value!==null?n.value:le.octave}},{key:ne.OctaveShift,value:function(n){var r=n.value!==null?n.value:1;this._octave+=r*n.direction}},{key:ne.NoteLength,value:function(n){var r=n.noteLength.map(function(i){return i!==null?i:le.length});this._noteLength=r}},{key:ne.NoteVelocity,value:function(n){this._velocity=n.value!==null?n.value:le.velocity}},{key:ne.NoteQuantize,value:function(n){this._quantize=n.value!==null?n.value:le.quantize}},{key:ne.Tempo,value:function(n){this._tempo=n.value!==null?n.value:le.tempo}},{key:ne.InfiniteLoop,value:function(){this._infiniteLoopIndex=this._commandIndex}},{key:ne.LoopBegin,value:function(n){var r=n.value!==null?n.value:le.loopCount,i=this._commandIndex,c=-1;this._loopStack.push({loopCount:r,loopTopIndex:i,loopOutIndex:c})}},{key:ne.LoopExit,value:function(){var n=this._loopStack[this._loopStack.length-1],r=this._commandIndex;n.loopCount<=1&&n.loopOutIndex!==-1&&(r=n.loopOutIndex),this._commandIndex=r}},{key:ne.LoopEnd,value:function(){var n=this._loopStack[this._loopStack.length-1],r=this._commandIndex;n.loopOutIndex===-1&&(n.loopOutIndex=this._commandIndex),n.loopCount-=1,0<n.loopCount?r=n.loopTopIndex:this._loopStack.pop(),this._commandIndex=r}}]),e}();function Zs(e){var t=0;return{next:function(){return t<e.length?{done:!1,value:e[t++]}:{done:!0}}}}function hi(e){return e.type===ne.Note||e.type===ne.Rest}var el=Ys;(function(e){e.exports=el})(Bi);const Hi=Rs(Bi.exports);var Tt={};(function(e){var t=+Math.PI*2,n=16,r=1,i=Math.sin,c=Math.pow,d=Math.abs,h=1e-6,M=window.AudioContext||window.webkitAudioContext;e.SampleRate=0,e.Sec=0,e.SetSampleRate=function(o){e.SampleRate=o|0,e.Sec=o|0},e.SetSampleRate(_t()),e.Live=function(){var o={};return o._generate=function(u){var p=new b(u,e.DefaultModules),v=_e(p.getSamplesLeft());return p.generate(v),v},o},e.Module={},e.G={};var y=e.stage={PhaseSpeed:0,PhaseSpeedMod:10,Generator:20,SampleMod:30,Volume:40};function A(o,u){return o.stage-u.stage}e.InitDefaultParams=N;function N(o,u){for(var p=0;p<u.length;p+=1){var v=u[p],x=o[v.name]||{};Oe(v.params,function(j,C){typeof x[C]>"u"&&(x[C]=j.D)}),o[v.name]=x}}e.Processor=b;function b(o,u){o=o||{},u=u||e.DefaultModules,typeof o=="function"?o=o():o=JSON.parse(JSON.stringify(o)),this.finished=!1,this.state={SampleRate:o.SampleRate||e.SampleRate},u=u.slice(),u.sort(A),this.modules=u,N(o,u);for(var p=0;p<this.modules.length;p+=1){var v=this.modules[p];this.modules[p].setup(this.state,o[v.name])}}b.prototype={generate:function(o){for(var u=0;u<o.length;u+=1)o[u]=0;if(!this.finished){for(var p=this.state,v=o.length|0,u=0;u<this.modules.length;u+=1){var x=this.modules[u],j=x.process(p,o.subarray(0,v))|0;v=Math.min(v,j)}v<o.length&&(this.finished=!0);for(var u=v;u<o.length;u++)o[u]=0}},getSamplesLeft:function(){for(var o=0,u=0;u<this.state.envelopes.length;u+=1)o+=this.state.envelopes[u].N;return o===0&&(o=3*this.state.SampleRate),o}},e.Module.Frequency={name:"Frequency",params:{Start:{L:30,H:1800,D:440},Min:{L:30,H:1800,D:30},Max:{L:30,H:1800,D:1800},Slide:{L:-1,H:1,D:0},DeltaSlide:{L:-1,H:1,D:0},RepeatSpeed:{L:0,H:3,D:0},ChangeAmount:{L:-12,H:12,D:0},ChangeSpeed:{L:0,H:1,D:0}},stage:y.PhaseSpeed,setup:function(o,u){var p=o.SampleRate;o.phaseParams=u,o.phaseSpeed=u.Start*t/p,o.phaseSpeedMax=u.Max*t/p,o.phaseSpeedMin=u.Min*t/p,o.phaseSpeedMin=Math.min(o.phaseSpeedMin,o.phaseSpeed),o.phaseSpeedMax=Math.max(o.phaseSpeedMax,o.phaseSpeed),o.phaseSlide=1+c(u.Slide,3)*64/p,o.phaseDeltaSlide=c(u.DeltaSlide,3)/(p*1e3),o.repeatTime=0,o.repeatLimit=1/0,u.RepeatSpeed>0&&(o.repeatLimit=u.RepeatSpeed*p),o.arpeggiatorTime=0,o.arpeggiatorLimit=u.ChangeSpeed*p,u.ChangeAmount==0&&(o.arpeggiatorLimit=1/0),o.arpeggiatorMod=1+u.ChangeAmount/12},process:function(o,u){for(var p=+o.phaseSpeed,v=+o.phaseSpeedMin,x=+o.phaseSpeedMax,j=+o.phaseSlide,C=+o.phaseDeltaSlide,$=o.repeatTime,T=o.repeatLimit,q=o.arpeggiatorTime,H=o.arpeggiatorLimit,Y=o.arpeggiatorMod,V=0;V<u.length;V++){if(j+=C,p*=j,p=p<v?v:p>x?x:p,$>T)return this.setup(o,o.phaseParams),V+this.process(o,u.subarray(V))-1;$++,q>H&&(p*=Y,q=0,H=1/0),q++,u[V]+=p}return o.repeatTime=$,o.arpeggiatorTime=q,o.arpeggiatorLimit=H,o.phaseSpeed=p,o.phaseSlide=j,u.length}},e.Module.Vibrato={name:"Vibrato",params:{Depth:{L:0,H:1,D:0},DepthSlide:{L:-1,H:1,D:0},Frequency:{L:.01,H:48,D:0},FrequencySlide:{L:-1,H:1,D:0}},stage:y.PhaseSpeedMod,setup:function(o,u){var p=o.SampleRate;o.vibratoPhase=0,o.vibratoDepth=u.Depth,o.vibratoPhaseSpeed=u.Frequency*t/p,o.vibratoPhaseSpeedSlide=1+c(u.FrequencySlide,3)*3/p,o.vibratoDepthSlide=u.DepthSlide/p},process:function(o,u){var p=+o.vibratoPhase,v=+o.vibratoDepth,x=+o.vibratoPhaseSpeed,j=+o.vibratoPhaseSpeedSlide,C=+o.vibratoDepthSlide;if(v==0&&C<=0)return u.length;for(var $=0;$<u.length;$++)p+=x,p>t&&(p-=t),u[$]+=u[$]*i(p)*v,x*=j,v+=C,v=pn(v);return o.vibratoPhase=p,o.vibratoDepth=v,o.vibratoPhaseSpeed=x,u.length}},e.Module.Generator={name:"Generator",params:{Func:{C:e.G,D:"square"},A:{L:0,H:1,D:0},B:{L:0,H:1,D:0},ASlide:{L:-1,H:1,D:0},BSlide:{L:-1,H:1,D:0}},stage:y.Generator,setup:function(o,u){o.generatorPhase=0,typeof u.Func=="string"?o.generator=e.G[u.Func]:o.generator=u.Func,typeof o.generator=="object"&&(o.generator=o.generator.create()),ce(typeof o.generator=="function","generator must be a function"),o.generatorA=u.A,o.generatorASlide=u.ASlide,o.generatorB=u.B,o.generatorBSlide=u.BSlide},process:function(o,u){return o.generator(o,u)}};var L=1<<16;e.Module.Guitar={name:"Guitar",params:{A:{L:0,H:1,D:1},B:{L:0,H:1,D:1},C:{L:0,H:1,D:1}},stage:y.Generator,setup:function(o,u){o.guitarA=u.A,o.guitarB=u.B,o.guitarC=u.C,o.guitarBuffer=_e(L),o.guitarHead=0;for(var p=o.guitarBuffer,v=0;v<p.length;v++)p[v]=oe()*2-1},process:function(o,u){for(var p=L,v=p-1,x=+o.guitarA,j=+o.guitarB,C=+o.guitarC,$=x+j+C,T=o.guitarHead,q=o.guitarBuffer,H=0;H<u.length;H++){var Y=t/u[H]|0;Y=Y>p?p:Y;var V=T-Y+p&v;q[T]=(q[V-0+p&v]*x+q[V-1+p&v]*j+q[V-2+p&v]*C)/$,u[H]=q[T],T=T+1&v}return o.guitarHead=T,u.length}},e.Module.Filter={name:"Filter",params:{LP:{L:0,H:1,D:1},LPSlide:{L:-1,H:1,D:0},LPResonance:{L:0,H:1,D:0},HP:{L:0,H:1,D:0},HPSlide:{L:-1,H:1,D:0}},stage:y.SampleMod+0,setup:function(o,u){o.FilterEnabled=u.HP>h||u.LP<1-h,o.LPEnabled=u.LP<1-h,o.LP=c(u.LP,3)/10,o.LPSlide=1+u.LPSlide*100/o.SampleRate,o.LPPos=0,o.LPPosSlide=0,o.LPDamping=5/(1+c(u.LPResonance,2)*20)*(.01+u.LP),o.LPDamping=1-Math.min(o.LPDamping,.8),o.HP=c(u.HP,2)/10,o.HPPos=0,o.HPSlide=1+u.HPSlide*100/o.SampleRate},enabled:function(o){return o.FilterEnabled},process:function(o,u){if(!this.enabled(o))return u.length;for(var p=+o.LP,v=+o.LPPos,x=+o.LPPosSlide,j=+o.LPSlide,C=+o.LPDamping,$=+o.LPEnabled,T=+o.HP,q=+o.HPPos,H=+o.HPSlide,Y=0;Y<u.length;Y++){(T>h||T<-h)&&(T*=H,T=T<h?h:T>.1?.1:T);var V=v;p*=j,p=p<0?p=0:p>.1?.1:p;var fe=u[Y];$?(x+=(fe-v)*p,x*=C):(v=fe,x=0),v+=x,q+=v-V,q*=1-T,u[Y]=q}return o.LPPos=v,o.LPPosSlide=x,o.LP=p,o.HP=T,o.HPPos=q,u.length}};var _=1<<10;e.Module.Phaser={name:"Phaser",params:{Offset:{L:-1,H:1,D:0},Sweep:{L:-1,H:1,D:0}},stage:y.SampleMod+1,setup:function(o,u){o.phaserBuffer=_e(_),o.phaserPos=0,o.phaserOffset=c(u.Offset,2)*(_-4),o.phaserOffsetSlide=c(u.Sweep,3)*4e3/o.SampleRate},enabled:function(o){return d(o.phaserOffsetSlide)>h||d(o.phaserOffset)>h},process:function(o,u){if(!this.enabled(o))return u.length;for(var p=_,v=p-1,x=o.phaserBuffer,j=o.phaserPos|0,C=+o.phaserOffset,$=+o.phaserOffsetSlide,T=0;T<u.length;T++){C+=$,C<0&&(C=-C,$=-$),C>v&&(C=v,$=0),x[j]=u[T];var q=j-(C|0)+p&v;u[T]+=x[q],j=j+1&v|0}return o.phaserPos=j,o.phaserOffset=C,u.length}},e.Module.Volume={name:"Volume",params:{Master:{L:0,H:1,D:.5},Attack:{L:.001,H:1,D:.01},Sustain:{L:0,H:2,D:.3},Punch:{L:0,H:3,D:1},Decay:{L:.001,H:2,D:1}},stage:y.Volume,setup:function(o,u){var p=o.SampleRate,v=u.Master,x=v*(1+u.Punch);o.envelopes=[{S:0,E:v,N:u.Attack*p|0},{S:x,E:v,N:u.Sustain*p|0},{S:v,E:0,N:u.Decay*p|0}];for(var j=0;j<o.envelopes.length;j+=1){var C=o.envelopes[j];C.G=(C.E-C.S)/C.N}},process:function(o,u){for(var p=0;o.envelopes.length>0&&p<u.length;){for(var v=o.envelopes[0],x=v.S,j=v.G,C=Math.min(u.length-p,v.N)|0,$=p+C|0;p<$;p+=1)u[p]*=x,x+=j,x=Je(x,0,10);v.S=x,v.N-=C,v.N<=0&&o.envelopes.shift()}return p}},e.DefaultModules=[e.Module.Frequency,e.Module.Vibrato,e.Module.Generator,e.Module.Filter,e.Module.Phaser,e.Module.Volume],e.DefaultModules.sort(A),e.EmptyParams=R;function R(){return Oe(e.Module,function(){return{}})}e._RemoveEmptyParams=B;function B(o){for(var u in o)Ke(o[u]).length==0&&delete o[u]}e.Preset={Reset:function(){return R()},Coin:function(){var o=R();return o.Frequency.Start=g(880,660),o.Volume.Sustain=g(.1),o.Volume.Decay=g(.4,.1),o.Volume.Punch=g(.3,.3),g()<.5&&(o.Frequency.ChangeSpeed=g(.15,.1),o.Frequency.ChangeAmount=g(8,4)),B(o),o},Laser:function(){var o=R();return o.Generator.Func=ke(["saw","sine"]),g()<.33?(o.Frequency.Start=g(880,440),o.Frequency.Min=g(.1),o.Frequency.Slide=g(.3,-.8)):(o.Frequency.Start=g(1200,440),o.Frequency.Min=o.Frequency.Start-g(880,440),o.Frequency.Min<110&&(o.Frequency.Min=110),o.Frequency.Slide=g(.3,-1)),g()<.5?(o.Generator.A=g(.5),o.Generator.ASlide=g(.2)):(o.Generator.A=g(.5,.4),o.Generator.ASlide=g(.7)),o.Volume.Sustain=g(.2,.1),o.Volume.Decay=g(.4),g()<.5&&(o.Volume.Punch=g(.3)),g()<.33&&(o.Phaser.Offset=g(.2),o.Phaser.Sweep=g(.2)),g()<.5&&(o.Filter.HP=g(.3)),B(o),o},Explosion:function(){var o=R();return o.Generator.Func="noise",g()<.5?(o.Frequency.Start=g(440,40),o.Frequency.Slide=g(.4,-.1)):(o.Frequency.Start=g(1600,220),o.Frequency.Slide=g(-.2,-.2)),g()<.2&&(o.Frequency.Slide=0),g()<.3&&(o.Frequency.RepeatSpeed=g(.5,.3)),o.Volume.Sustain=g(.3,.1),o.Volume.Decay=g(.5),o.Volume.Punch=g(.6,.2),g()<.5&&(o.Phaser.Offset=g(.9,-.3),o.Phaser.Sweep=g(-.3)),g()<.33&&(o.Frequency.ChangeSpeed=g(.3,.6),o.Frequency.ChangeAmount=g(24,-12)),B(o),o},Powerup:function(){var o=R();return g()<.5?o.Generator.Func="saw":o.Generator.A=g(.6),o.Frequency.Start=g(220,440),g()<.5?(o.Frequency.Slide=g(.5,.2),o.Frequency.RepeatSpeed=g(.4,.4)):(o.Frequency.Slide=g(.2,.05),g()<.5&&(o.Vibrato.Depth=g(.6,.1),o.Vibrato.Frequency=g(30,10))),o.Volume.Sustain=g(.4),o.Volume.Decay=g(.4,.1),B(o),o},Hit:function(){var o=R();return o.Generator.Func=ke(["saw","noise"]),o.Generator.A=g(.6),o.Generator.ASlide=g(1,-.5),o.Frequency.Start=g(880,220),o.Frequency.Slide=-g(.4,.3),o.Volume.Sustain=g(.1),o.Volume.Decay=g(.2,.1),g()<.5&&(o.Filter.HP=g(.3)),B(o),o},Jump:function(){var o=R();return o.Generator.Func="square",o.Generator.A=g(.6),o.Frequency.Start=g(330,330),o.Frequency.Slide=g(.4,.2),o.Volume.Sustain=g(.3,.1),o.Volume.Decay=g(.2,.1),g()<.5&&(o.Filter.HP=g(.3)),g()<.3&&(o.Filter.LP=g(-.6,1)),B(o),o},Select:function(){var o=R();return o.Generator.Func=ke(["square","saw"]),o.Generator.A=g(.6),o.Frequency.Start=g(660,220),o.Volume.Sustain=g(.1,.1),o.Volume.Decay=g(.2),o.Filter.HP=.2,o.Volume.Master=.4,B(o),o},Lucky:function(){var o=R();return Oe(o,function(u,p){var v=e.Module[p].params;Oe(v,function(x,j){if(x.C){var C=Ke(x.C);u[j]=C[C.length*oe()|0]}else u[j]=oe()*(x.H-x.L)+x.L})}),o.Volume.Master=.4,o.Filter={},B(o),o},Synth:function(){var o=R();return o.Generator.Func=ke(["square","saw"]),o.Frequency.Start=ke([340,240,170]),o.Volume.Attack=g()>.6?g(.5):0,o.Volume.Sustain=g(1),o.Volume.Punch=g(1),o.Volume.Decay=g(.9)+.1,o.Generator.A=g(1),g()<.25&&(o.Filter.HP=g(1)),g()<.25&&(o.Filter.LP=g(1)),B(o),o},Tone:function(){var o=R();return o.Generator.Func="square",o.Frequency.Start=261.6,o.Volume.Sustain=.6441,o.Volume.Master=.7,B(o),o},Click:function(){var o=e.Preset.Hit();return g()<.5&&(o.Frequency.Slide=-.5+g(1)),g()<.5&&(o.Volume.Sustain*=g(.4)+.2,o.Volume.Decay*=g(.4)+.2),o.Frequency.Start=g(1200,440),B(o),o}},e.G.unoise=X("sample = Math.random();"),e.G.sine=X("sample = Math.sin(phase);"),e.G.saw=X("sample = 2*(phase/TAU - ((phase/TAU + 0.5)|0));"),e.G.triangle=X("sample = Math.abs(4 * ((phase/TAU - 0.25)%1) - 2) - 1;"),e.G.square=X("var s = Math.sin(phase); sample = s > A ? 1.0 : s < A ? -1.0 : A;"),e.G.synth=X("sample = Math.sin(phase) + .5*Math.sin(phase/2) + .3*Math.sin(phase/4);"),e.G.noise=X("if(phase % TAU < 4){__noiseLast = Math.random() * 2 - 1;} sample = __noiseLast;"),e.G.string={create:function(){for(var o=65536,u=o-1,p=_e(o),v=0;v<p.length;v++)p[v]=oe()*2-1;var x=0;return function(j,C){for(var $=Math.PI*2,T=+j.generatorA,q=+j.generatorASlide,H=+j.generatorB,Y=+j.generatorBSlide,V=p,fe=0;fe<C.length;fe++){var it=C[fe],at=$/it|0;T+=q,H+=Y,T=T<0?0:T>1?1:T,H=H<0?0:H>1?1:H;var Ce=x-at+o&u,Rt=(V[Ce-0+o&u]*1+V[Ce-1+o&u]*T+V[Ce-2+o&u]*H)/(1+T+H);V[x]=Rt,C[fe]=V[x],x=x+1&u}return j.generatorA=T,j.generatorB=H,C.length}}};function X(o){return new Function("$","block",`var TAU = Math.PI * 2;
var sample;
var phase = +$.generatorPhase,
	A = +$.generatorA, ASlide = +$.generatorASlide,
	B = +$.generatorB, BSlide = +$.generatorBSlide;

for(var i = 0; i < block.length; i++){
	var phaseSpeed = block[i];
	phase += phaseSpeed;
	if(phase > TAU){ phase -= TAU };
	A += ASlide; B += BSlide;
   A = A < 0 ? 0 : A > 1 ? 1 : A;
   B = B < 0 ? 0 : B > 1 ? 1 : B;
`+o+`	block[i] = sample;
}

$.generatorPhase = phase;
$.generatorA = A;
$.generatorB = B;
return block.length;
`)}e.CreateAudio=we;function we(o){typeof Float32Array<"u"&&ce(o instanceof Float32Array,"data must be an Float32Array");var u=r*n>>3,p=e.SampleRate*u,v=Pn(8+36+o.length*2),x=0;function j($){for(var T=0;T<$.length;T+=1)v[x]=$.charCodeAt(T),x++}function C($,T){T<=0||(v[x]=$&255,x++,C($>>8,T-1))}return j("RIFF"),C(36+o.length*2,4),j("WAVEfmt "),C(16,4),C(1,2),C(r,2),C(e.SampleRate,4),C(p,4),C(u,2),C(n,2),j("data"),C(o.length*2,4),xe(v.subarray(x),o),new Audio("data:audio/wav;base64,"+Te(v))}e.DownloadAsFile=function(o){ce(o instanceof Audio,"input must be an Audio object"),document.location.href=o.src},e.Util={},e.Util.CopyFToU8=xe;function xe(o,u){ce(o.length/2==u.length,"the target buffer must be twice as large as the iinput");for(var p=0,v=0;v<u.length;v++){var x=+u[v],j=x*32767|0;j=j<-32768?-32768:32767<j?32767:j,j+=j<0?65536:0,o[p]=j&255,p++,o[p]=j>>8,p++}}function Te(o){for(var u=32768,p="",v=0;v<o.length;v+=u){var x=Math.min(v+u,o.length);p+=String.fromCharCode.apply(null,o.subarray(v,x))}return btoa(p)}function _t(){return typeof M<"u"?new M().sampleRate:44100}function ce(o,u){if(!o)throw new Error(u)}function Je(o,u,p){return o=+o,u=+u,p=+p,o<u?+u:o>p?+p:+o}function pn(o){return o=+o,o<0?0:o>1?1:+o}function Oe(o,u){var p={};for(var v in o)o.hasOwnProperty(v)&&(p[v]=u(o[v],v));return p}function g(o,u){var p=oe();return o!==void 0&&(p*=o),u!==void 0&&(p+=u),p}function ke(o){return o[o.length*oe()|0]}function Ke(o){var u=[];for(var p in o)u.push(p);return u}e._createFloatArray=_e;function _e(o){if(typeof Float32Array>"u")for(var u=new Array(o),p=0;p<u.length;p++)u[p]=0;return new Float32Array(o)}function Pn(o){if(typeof Uint8Array>"u")for(var u=new Array(o),p=0;p<u.length;p++)u[p]=0;return new Uint8Array(o)}var rt=Math.random;e.setRandomFunc=function(o){rt=o};function oe(){return rt()}})(Tt={});let Ne,Mi,dn,Xn,Vi,pi=!1;function tl(e=void 0){Ne=e==null?new(window.AudioContext||window.webkitAudioContext):e,Ui(),Ji(),Ki()}function nl(){pi||(pi=!0,Qi())}function Ui(e=120){Mi=e,dn=60/Mi}function Ji(e=8){Xn=e>0?4/e:void 0}function Ki(e=.1){Vi=e}function dr(e){if(Xn==null)return e;const t=dn*Xn;return t>0?Math.ceil(e/t)*t:e}function Qi(){const e=Ne.createBufferSource();e.start=e.start||e.noteOn,e.start()}function rl(){Ne.resume()}class fr{constructor(t=null){wt(this,"x");wt(this,"y");wt(this,"z");wt(this,"w");this.setSeed(t)}get(t=1,n){return n==null&&(n=t,t=0),this.next()/4294967295*(n-t)+t}getInt(t,n){n==null&&(n=t,t=0);const r=Math.floor(t),i=Math.floor(n);return i===r?r:this.next()%(i-r)+r}getPlusOrMinus(){return this.getInt(2)*2-1}select(t){return t[this.getInt(t.length)]}setSeed(t,n=123456789,r=362436069,i=521288629,c=32){this.w=t!=null?t>>>0:Math.floor(Math.random()*4294967295)>>>0,this.x=n>>>0,this.y=r>>>0,this.z=i>>>0;for(let d=0;d<c;d++)this.next();return this}getState(){return{x:this.x,y:this.y,z:this.z,w:this.w}}next(){const t=this.x^this.x<<11;return this.x=this.y,this.y=this.z,this.z=this.w,this.w=(this.w^this.w>>>19^(t^t>>>8))>>>0,this.w}}function ae(e,t){let n=[];for(let r=0;r<e;r++)n.push(t(r));return n}function Wi(e){return 440*Math.pow(2,(e-69)/12)}function hr(e){let t=0;const n=e.length;for(let r=0;r<n;r++){const i=e.charCodeAt(r);t=(t<<5)-t+i,t|=0}return t}function Xi(e,t=0,n=1){return Math.max(t,Math.min(e,n))}const Mr=["coin","laser","explosion","powerUp","hit","jump","select","lucky","random","click","synth","tone"],il={coin:"Coin",laser:"Laser",explosion:"Explosion",powerUp:"Powerup",hit:"Hit",jump:"Jump",select:"Select",lucky:"Lucky",random:"Lucky",click:"Click",synth:"Synth",tone:"Tone"},an=new fr;let pr,Yi;function al(){Yi=Tt.Live(),pr=[],Tt.setRandomFunc(()=>an.get())}function Pi(e){ml(e)}function ol(e){pr.forEach(t=>{dl(t,e)})}function on(e=void 0,t=void 0,n=2,r=.5,i=void 0,c=1,d=1){t!=null&&an.setSeed(t);const h=Tt.Preset[il[e!=null?e:Mr[an.getInt(8)]]],M=ae(n,()=>{const y=h();return i!=null&&y.Frequency.Start!=null&&(y.Frequency.Start=i),y.Volume.Attack!=null&&(y.Volume.Attack*=c),y.Volume.Sustain!=null&&(y.Volume.Sustain*=d),y});return sl(e,M,r)}function sl(e,t,n){const r=t.map(c=>{const d=Yi._generate(c),h=Ne.createBuffer(1,d.length,Tt.SampleRate);var M=h.getChannelData(0);return M.set(d),h}),i=Ne.createGain();return i.gain.value=n*Vi,i.connect(Ne.destination),{type:e,params:t,volume:n,buffers:r,bufferSourceNodes:void 0,gainNode:i,isPlaying:!1,playedTime:void 0}}function ll(e,t,n,r,i){const c=new fr;c.setSeed(n);let d;if(t){let h=c.select(["hit","click","explosion"]);r!=null&&(h=r),d=on(h,c.getInt(999999999),h==="explosion"?1:2,i!=null?i:h==="explosion"?.4:.5,c.get(100,200),h==="explosion"?.5:1,h==="explosion"?.2:1)}else{const h=cl(e);let M=c.get()<1/h?"select":c.select(["tone","tone","synth"]);r!=null&&(M=r),d=on(M,c.getInt(999999999),M!=="select"?1:2,i!=null?i:.3,261.6,M!=="select"?.1:1,M!=="select"?2:1)}return d.isDrum=t,d.seed=n,d}function cl(e){if(e==null||e.notes.length===0)return 1;let t=0,n=0;return e.notes.forEach(r=>{const i=r.quantizedEndStep-r.quantizedStartStep;i>0&&(t+=i,n++)}),t/n}function ul(e){pr.push(e)}function ml(e){e.isPlaying=!0}function dl(e,t){if(!e.isPlaying)return;e.isPlaying=!1;const n=dr(t);(e.playedTime==null||n>e.playedTime)&&(Yn(e,n),e.playedTime=n)}function Yn(e,t,n=void 0){e.bufferSourceNodes=[],e.buffers.forEach(r=>{const i=Ne.createBufferSource();if(i.buffer=r,n!=null&&i.playbackRate!=null){const c=Math.pow(2,.08333333333333333);i.playbackRate.value=Math.pow(c,n)}i.start=i.start||i.noteOn,i.connect(e.gainNode),i.start(t),e.bufferSourceNodes.push(i)})}function Zn(e,t=void 0){e.bufferSourceNodes!=null&&(e.bufferSourceNodes.forEach(n=>{t==null?n.stop():n.stop(t)}),e.bufferSourceNodes=void 0)}const fl=100;function hl(e){let t=`${e}`,n;Mr.forEach(A=>{const N=`@${A}`,b=t.indexOf(N);b>=0&&(n=A,t=`${t.slice(0,b)}${t.slice(b+N.length)}`)});const r="@d",i=t.indexOf(r);let c=!1;i>=0&&(c=!0,t=`${t.slice(0,i)}${t.slice(i+r.length)}`);const d=t.match(/@s\d+/);let h=1;d!=null&&(h=Number.parseInt(d[0].substring(2)),t=t.replace(/@s\d+/,""));const M=t.match(/v\d+/);let y=.5;return M!=null&&(y=Number.parseInt(M[0].substring(1))/fl,t=t.replace(/v\d+/,"")),{mml:t,args:{isDrum:c,seed:h,type:n,volume:y}}}function Zi(e,t,n,r){return{mml:e,sequence:t,soundEffect:n,noteIndex:0,endStep:-1,visualizer:r}}function Ml(e,t,n){const r=t.sequence.notes[t.noteIndex];r!=null&&((t.soundEffect.type==="synth"||t.soundEffect.type==="tone")&&t.endStep===e.notesStepsIndex&&Zn(t.soundEffect,n),r.quantizedStartStep===e.notesStepsIndex&&((t.soundEffect.type==="synth"||t.soundEffect.type==="tone")&&Zn(t.soundEffect),t.soundEffect.isDrum?Yn(t.soundEffect,n):Yn(t.soundEffect,n,r.pitch-69),t.visualizer!=null&&t.visualizer.redraw(r),t.endStep=r.quantizedEndStep,t.endStep>=e.notesStepsCount&&(t.endStep-=e.notesStepsCount),t.noteIndex++,t.noteIndex>=t.sequence.notes.length&&(t.noteIndex=0)))}let tt=[];function pl(){ra(),tt=[]}function ea(e,t,n=1){e.forEach(i=>{i.noteIndex=0});const r={parts:e,notesStepsCount:t,notesStepsIndex:void 0,noteInterval:void 0,nextNotesTime:void 0,speedRatio:n,isPlaying:!1,isLooping:!1};return ta(r),r}function ta(e){const t=dn/4/e.speedRatio;e.notesStepsIndex=0,e.noteInterval=t,e.nextNotesTime=dr(Ne.currentTime)-t}function Pr(e){tt.push(e)}function na(e){tt=tt.filter(t=>t!==e)}function Pl(e){tt.forEach(t=>{gl(t,e)})}function gr(e,t=!1){e.isLooping=t,ta(e),e.isPlaying=!0}function vr(e){e.isPlaying=!1,e.parts.forEach(t=>{Zn(t.soundEffect)})}function ra(){tt.forEach(e=>{vr(e)})}function gl(e,t){!e.isPlaying||t<e.nextNotesTime||(e.nextNotesTime+=e.noteInterval,e.nextNotesTime<t-dn&&(e.nextNotesTime=dr(t)),e.parts.forEach(n=>{Ml(e,n,e.nextNotesTime)}),e.notesStepsIndex++,e.notesStepsIndex>=e.notesStepsCount&&(e.isLooping?e.notesStepsIndex=0:e.isPlaying=!1))}const ia={c:"coin",l:"laser",e:"explosion",p:"powerUp",h:"hit",j:"jump",s:"select",u:"random",r:"random",i:"click",y:"synth",t:"tone"},k=an;let yr=1;function vl(e){yr=e}function yl(e,t,n,r,i,c,d){k.setSeed(yr+hr(e)),la(),jt=null;let h=k.select(c);const M=ae(i,()=>{const y=Math.floor(Math.abs(k.get()+k.get()-1)*3),A=Math.floor((k.get()+k.get()-1)*10),N=Math.abs(k.get()+k.get()-1),b=k.get()<.25;b||(h=k.select(c));const L=k.get()<.5,_=k.get()<.5,R=k.get()<.9;return oa(n,h,t,.7,y,A,N,b,L,_,R,void 0,d)});return aa(M,.5/r)}function bl(e="0",t=!1,n=69-12,r=16,i=.25,c=4,d=1){k.setSeed(yr+hr(e)),la(),jt=null;let h=ia[e[0]];h==null&&(h=Mr[k.getInt(8)]);let M=.8;t&&(i/=4,M/=2);const y=ae(c,()=>{const A=Math.floor(Math.abs(k.get()+k.get()-1)*3),N=Math.floor((k.get()+k.get()-1)*10),b=t?2:Math.abs(k.get()+k.get()-1),L=k.get()<.25,_=t?!1:k.get()<.5,R=k.get()<.5,B=t?k.get()<.25:k.get()<.9,X=k.get(.5);return oa(r,h,n,M,A,N,b,L,_,R,B,X,d)});return aa(y,.5/i)}function aa(e,t){const n=e.map(r=>{const i=[];return r.notes.forEach((c,d)=>{c!=null&&i.push({pitch:c+69,quantizedStartStep:d*2})}),Zi(void 0,{notes:i},r.soundEffect)});return ea(n,e[0].notes.length*2,t)}let jt;function oa(e=32,t,n=60,r=1,i=0,c=0,d=1,h=!1,M=!1,y=!1,A=!1,N=null,b=.1){const L=Cl(t,Wi(n),r,b);if(jt!=null&&h)L.noteRatios=jt.noteRatios;else{const _=N!=null?Nl(e,N):Sl(e);L.noteRatios=wl(_,M?0:-1,1,d,A)}return L.notes=xl(L.noteRatios,i,c,y),jt=L,L}function Sl(e){let t=ae(e,()=>!1),n=4;for(;n<=e;)t=Al(t,n),n*=2;return t}function Al(e,t){let n=ae(t,()=>!1);const r=Math.floor(Math.abs(k.get()+k.get()-1)*4);for(let i=0;i<r;i++)n[k.getInt(t-1)]=!0;return e.map((i,c)=>n[c%t]?!i:i)}function Nl(e,t){return ae(e,()=>k.get()>=t)}const sa=[[0,4,7],[0,3,7],[0,4,7,10],[0,4,7,11],[0,3,7,10]],Un=[[[0,0],[7,0],[9,1],[4,1]],[[5,0],[0,0],[5,0],[7,0]],[[5,3],[7,2],[4,4],[9,1]],[[9,1],[2,1],[7,0],[0,0]],[[9,1],[5,0],[7,0],[0,0]]];let et;function la(){et=k.select(Un).map((t,n)=>[k.get()<.7?t[0]:Un[k.getInt(Un.length)][n][0],k.get()<.7?t[1]:k.getInt(sa.length)])}function wl(e,t,n,r,i){let c=k.get(),d=k.get(-.5,.5),M=e.length/et.length,y=[];return e.forEach((A,N)=>{let b=Math.floor(N/M),L=N%M;if(i&&b===Math.floor(et.length/2)){y.push(y[L]),y[L]!=null&&(c=y[L]);return}if(!A){y.push(null);return}y.push(c),d+=k.get(-.25,.25),c+=d*r,(k.get()<.2||c<=t||c>=n)&&(c-=d*2,d*=-1)}),y}function xl(e,t,n,r){let c=e.length/et.length;return e.map((d,h)=>{if(d==null)return null;let M=Math.floor(h/c),y=et[M][0],A=sa[et[M][1]],N=d;r&&(N=Math.floor(N*2)/2);let b=Math.floor(N),L=Math.floor((N-b)*A.length);for(L+=t+k.getInt(-n,n+1);L>=A.length;)L-=A.length,b++;for(;L<0;)L+=A.length,b--;return y+b*12+A[L]})}function Cl(e,t,n,r){return{noteRatios:void 0,notes:void 0,soundEffect:on(e,void 0,1,r,t,n,n)}}function jl(e){return e!==null&&typeof e=="object"&&"name"in e&&typeof e.name=="string"}function Ll(e){return e!==null&&typeof e=="object"&&"step"in e&&typeof e.step=="number"&&"alt"in e&&typeof e.alt=="number"&&!isNaN(e.step)&&!isNaN(e.alt)}var ca=[0,2,4,-1,1,3,5],ua=ca.map(e=>Math.floor(e*7/12));function El(e){const{step:t,alt:n,oct:r,dir:i=1}=e,c=ca[t]+7*n;if(r===void 0)return[i*c];const d=r-ua[t]-4*n;return[i*c,i*d]}var $l=[3,0,4,1,5,2,6];function Tl(e){const[t,n,r]=e,i=$l[Ol(t)],c=Math.floor((t+1)/7);if(n===void 0)return{step:i,alt:c,dir:r};const d=n+4*c+ua[i];return{step:i,alt:c,oct:d,dir:r}}function Ol(e){const t=(e+1)%7;return t<0?7+t:t}var gi=(e,t)=>Array(Math.abs(t)+1).join(e),er=Object.freeze({empty:!0,name:"",num:NaN,q:"",type:"",step:NaN,alt:NaN,dir:NaN,simple:NaN,semitones:NaN,chroma:NaN,coord:[],oct:NaN}),kl="([-+]?\\d+)(d{1,4}|m|M|P|A{1,4})",_l="(AA|A|P|M|m|d|dd)([-+]?\\d+)",Rl=new RegExp("^"+kl+"|"+_l+"$");function Il(e){const t=Rl.exec(`${e}`);return t===null?["",""]:t[1]?[t[1],t[2]]:[t[4],t[3]]}var vi={};function sn(e){return typeof e=="string"?vi[e]||(vi[e]=Fl(e)):Ll(e)?sn(zl(e)):jl(e)?sn(e.name):er}var yi=[0,2,4,5,7,9,11],ma="PMMPPMM";function Fl(e){const t=Il(e);if(t[0]==="")return er;const n=+t[0],r=t[1],i=(Math.abs(n)-1)%7,c=ma[i];if(c==="M"&&r==="P")return er;const d=c==="M"?"majorable":"perfectable",h=""+n+r,M=n<0?-1:1,y=n===8||n===-8?n:M*(i+1),A=Gl(d,r),N=Math.floor((Math.abs(n)-1)/7),b=M*(yi[i]+A+12*N),L=(M*(yi[i]+A)%12+12)%12,_=El({step:i,alt:A,oct:N,dir:M});return{empty:!1,name:h,num:n,q:r,step:i,alt:A,dir:M,type:d,simple:y,semitones:b,chroma:L,coord:_,oct:N}}function Dl(e,t){const[n,r=0]=e,i=n*7+r*12<0,c=t||i?[-n,-r,-1]:[n,r,1];return sn(Tl(c))}function Gl(e,t){return t==="M"&&e==="majorable"||t==="P"&&e==="perfectable"?0:t==="m"&&e==="majorable"?-1:/^A+$/.test(t)?t.length:/^d+$/.test(t)?-1*(e==="perfectable"?t.length:t.length+1):0}function zl(e){const{step:t,alt:n,oct:r=0,dir:i}=e;if(!i)return"";const c=t+1+7*r,d=c===0?t+1:c,h=i<0?"-":"",M=ma[t]==="M"?"majorable":"perfectable";return h+d+Bl(M,n)}function Bl(e,t){return t===0?e==="majorable"?"M":"P":t===-1&&e==="majorable"?"m":t>0?gi("A",t):gi("d",e==="perfectable"?t:t+1)}function ql(e){return e!==null&&typeof e=="object"&&"name"in e&&typeof e.name=="string"}function Hl(e){return e!==null&&typeof e=="object"&&"step"in e&&typeof e.step=="number"&&"alt"in e&&typeof e.alt=="number"&&!isNaN(e.step)&&!isNaN(e.alt)}var da=[0,2,4,-1,1,3,5],fa=da.map(e=>Math.floor(e*7/12));function Vl(e){const{step:t,alt:n,oct:r,dir:i=1}=e,c=da[t]+7*n;if(r===void 0)return[i*c];const d=r-fa[t]-4*n;return[i*c,i*d]}var Ul=[3,0,4,1,5,2,6];function Jl(e){const[t,n,r]=e,i=Ul[Kl(t)],c=Math.floor((t+1)/7);if(n===void 0)return{step:i,alt:c,dir:r};const d=n+4*c+fa[i];return{step:i,alt:c,oct:d,dir:r}}function Kl(e){const t=(e+1)%7;return t<0?7+t:t}var bi=(e,t)=>Array(Math.abs(t)+1).join(e),ha=Object.freeze({empty:!0,name:"",letter:"",acc:"",pc:"",step:NaN,alt:NaN,chroma:NaN,height:NaN,coord:[],midi:null,freq:null}),Si=new Map,Ql=e=>"CDEFGAB".charAt(e),Ma=e=>e<0?bi("b",-e):bi("#",e),pa=e=>e[0]==="b"?-e.length:e.length;function re(e){const t=JSON.stringify(e),n=Si.get(t);if(n)return n;const r=typeof e=="string"?Zl(e):Hl(e)?re(ec(e)):ql(e)?re(e.name):ha;return Si.set(t,r),r}var Wl=/^([a-gA-G]?)(#{1,}|b{1,}|x{1,}|)(-?\d*)\s*(.*)$/;function br(e){const t=Wl.exec(e);return t?[t[1].toUpperCase(),t[2].replace(/x/g,"##"),t[3],t[4]]:["","","",""]}function Xl(e){return re(Jl(e))}var Yl=(e,t)=>(e%t+t)%t,Jn=[0,2,4,5,7,9,11];function Zl(e){const t=br(e);if(t[0]===""||t[3]!=="")return ha;const n=t[0],r=t[1],i=t[2],c=(n.charCodeAt(0)+3)%7,d=pa(r),h=i.length?+i:void 0,M=Vl({step:c,alt:d,oct:h}),y=n+r+i,A=n+r,N=(Jn[c]+d+120)%12,b=h===void 0?Yl(Jn[c]+d,12)-12*99:Jn[c]+d+12*(h+1),L=b>=0&&b<=127?b:null,_=h===void 0?null:Math.pow(2,(b-69)/12)*440;return{empty:!1,acc:r,alt:d,chroma:N,coord:M,freq:_,height:b,letter:n,midi:L,name:y,oct:h,pc:A,step:c}}function ec(e){const{step:t,alt:n,oct:r}=e,i=Ql(t);if(!i)return"";const c=i+Ma(n);return r||r===0?c+r:c}function fn(e,t){const n=re(e),r=Array.isArray(t)?t:sn(t).coord;if(n.empty||!r||r.length<2)return"";const i=n.coord,c=i.length===1?[i[0]+r[0]]:[i[0]+r[0],i[1]+r[1]];return Xl(c).name}function tc(e,t){const n=re(e),r=re(t);if(n.empty||r.empty)return"";const i=n.coord,c=r.coord,d=c[0]-i[0],h=i.length===2&&c.length===2?c[1]-i[1]:-Math.floor(d*7/12),M=r.height===n.height&&r.midi!==null&&n.midi!==null&&n.step>r.step;return Dl([d,h],M).name}Object.freeze({empty:!0,name:"",num:NaN,q:"",type:"",step:NaN,alt:NaN,dir:NaN,simple:NaN,semitones:NaN,chroma:NaN,coord:[],oct:NaN});function Sr(e,t){const n=t.length,r=(e%n+n)%n;return t.slice(r,n).concat(t.slice(0,r))}function nc(e){return e.filter(t=>t===0||t)}function rc(e){return e!==null&&typeof e=="object"&&"name"in e&&typeof e.name=="string"}function ic(e){return e!==null&&typeof e=="object"&&"step"in e&&typeof e.step=="number"&&"alt"in e&&typeof e.alt=="number"&&!isNaN(e.step)&&!isNaN(e.alt)}var Pa=[0,2,4,-1,1,3,5],ac=Pa.map(e=>Math.floor(e*7/12));function oc(e){const{step:t,alt:n,oct:r,dir:i=1}=e,c=Pa[t]+7*n;if(r===void 0)return[i*c];const d=r-ac[t]-4*n;return[i*c,i*d]}var Ai=(e,t)=>Array(Math.abs(t)+1).join(e),tr=Object.freeze({empty:!0,name:"",num:NaN,q:"",type:"",step:NaN,alt:NaN,dir:NaN,simple:NaN,semitones:NaN,chroma:NaN,coord:[],oct:NaN}),sc="([-+]?\\d+)(d{1,4}|m|M|P|A{1,4})",lc="(AA|A|P|M|m|d|dd)([-+]?\\d+)",cc=new RegExp("^"+sc+"|"+lc+"$");function uc(e){const t=cc.exec(`${e}`);return t===null?["",""]:t[1]?[t[1],t[2]]:[t[4],t[3]]}var Ni={};function nr(e){return typeof e=="string"?Ni[e]||(Ni[e]=mc(e)):ic(e)?nr(fc(e)):rc(e)?nr(e.name):tr}var wi=[0,2,4,5,7,9,11],ga="PMMPPMM";function mc(e){const t=uc(e);if(t[0]==="")return tr;const n=+t[0],r=t[1],i=(Math.abs(n)-1)%7,c=ga[i];if(c==="M"&&r==="P")return tr;const d=c==="M"?"majorable":"perfectable",h=""+n+r,M=n<0?-1:1,y=n===8||n===-8?n:M*(i+1),A=dc(d,r),N=Math.floor((Math.abs(n)-1)/7),b=M*(wi[i]+A+12*N),L=(M*(wi[i]+A)%12+12)%12,_=oc({step:i,alt:A,oct:N,dir:M});return{empty:!1,name:h,num:n,q:r,step:i,alt:A,dir:M,type:d,simple:y,semitones:b,chroma:L,coord:_,oct:N}}function dc(e,t){return t==="M"&&e==="majorable"||t==="P"&&e==="perfectable"?0:t==="m"&&e==="majorable"?-1:/^A+$/.test(t)?t.length:/^d+$/.test(t)?-1*(e==="perfectable"?t.length:t.length+1):0}function fc(e){const{step:t,alt:n,oct:r=0,dir:i}=e;if(!i)return"";const c=t+1+7*r,d=c===0?t+1:c,h=i<0?"-":"",M=ga[t]==="M"?"majorable":"perfectable";return h+d+hc(M,n)}function hc(e,t){return t===0?e==="majorable"?"M":"P":t===-1&&e==="majorable"?"m":t>0?Ai("A",t):Ai("d",e==="perfectable"?t:t+1)}var pe={empty:!0,name:"",setNum:0,chroma:"000000000000",normalized:"000000000000",intervals:[]},va=e=>Number(e).toString(2).padStart(12,"0"),xi=e=>parseInt(e,2),Mc=/^[01]{12}$/;function ya(e){return Mc.test(e)}var pc=e=>typeof e=="number"&&e>=0&&e<=4095,Pc=e=>e&&ya(e.chroma),Ci={[pe.chroma]:pe};function Pe(e){const t=ya(e)?e:pc(e)?va(e):Array.isArray(e)?Nc(e):Pc(e)?e.chroma:pe.chroma;return Ci[t]=Ci[t]||Ac(t)}var gc=["1P","2m","2M","3m","3M","4P","5d","5P","6m","6M","7m","7M"];function vc(e){const t=[];for(let n=0;n<12;n++)e.charAt(n)==="1"&&t.push(gc[n]);return t}function yc(e,t=!0){const r=Pe(e).chroma.split("");return nc(r.map((i,c)=>{const d=Sr(c,r);return t&&d[0]==="0"?null:d.join("")}))}function bc(e){const t=Pe(e).setNum;return n=>{const r=Pe(n).setNum;return t&&t!==r&&(r&t)===r}}function ba(e){const t=Pe(e).setNum;return n=>{const r=Pe(n).setNum;return t&&t!==r&&(r|t)===r}}function Sc(e){const t=e.split("");return t.map((n,r)=>Sr(r,t).join(""))}function Ac(e){const t=xi(e),n=Sc(e).map(xi).filter(c=>c>=2048).sort()[0],r=va(n),i=vc(e);return{empty:!1,name:"",setNum:t,chroma:e,normalized:r,intervals:i}}function Nc(e){if(e.length===0)return pe.chroma;let t;const n=[0,0,0,0,0,0,0,0,0,0,0,0];for(let r=0;r<e.length;r++)t=re(e[r]),t.empty&&(t=nr(e[r])),t.empty||(n[t.chroma]=1);return n.join("")}var wc=[["1P 3M 5P","major","M ^  maj"],["1P 3M 5P 7M","major seventh","maj7 \u0394 ma7 M7 Maj7 ^7"],["1P 3M 5P 7M 9M","major ninth","maj9 \u03949 ^9"],["1P 3M 5P 7M 9M 13M","major thirteenth","maj13 Maj13 ^13"],["1P 3M 5P 6M","sixth","6 add6 add13 M6"],["1P 3M 5P 6M 9M","sixth added ninth","6add9 6/9 69 M69"],["1P 3M 6m 7M","major seventh flat sixth","M7b6 ^7b6"],["1P 3M 5P 7M 11A","major seventh sharp eleventh","maj#4 \u0394#4 \u0394#11 M7#11 ^7#11 maj7#11"],["1P 3m 5P","minor","m min -"],["1P 3m 5P 7m","minor seventh","m7 min7 mi7 -7"],["1P 3m 5P 7M","minor/major seventh","m/ma7 m/maj7 mM7 mMaj7 m/M7 -\u03947 m\u0394 -^7 -maj7"],["1P 3m 5P 6M","minor sixth","m6 -6"],["1P 3m 5P 7m 9M","minor ninth","m9 -9"],["1P 3m 5P 7M 9M","minor/major ninth","mM9 mMaj9 -^9"],["1P 3m 5P 7m 9M 11P","minor eleventh","m11 -11"],["1P 3m 5P 7m 9M 13M","minor thirteenth","m13 -13"],["1P 3m 5d","diminished","dim \xB0 o"],["1P 3m 5d 7d","diminished seventh","dim7 \xB07 o7"],["1P 3m 5d 7m","half-diminished","m7b5 \xF8 -7b5 h7 h"],["1P 3M 5P 7m","dominant seventh","7 dom"],["1P 3M 5P 7m 9M","dominant ninth","9"],["1P 3M 5P 7m 9M 13M","dominant thirteenth","13"],["1P 3M 5P 7m 11A","lydian dominant seventh","7#11 7#4"],["1P 3M 5P 7m 9m","dominant flat ninth","7b9"],["1P 3M 5P 7m 9A","dominant sharp ninth","7#9"],["1P 3M 7m 9m","altered","alt7"],["1P 4P 5P","suspended fourth","sus4 sus"],["1P 2M 5P","suspended second","sus2"],["1P 4P 5P 7m","suspended fourth seventh","7sus4 7sus"],["1P 5P 7m 9M 11P","eleventh","11"],["1P 4P 5P 7m 9m","suspended fourth flat ninth","b9sus phryg 7b9sus 7b9sus4"],["1P 5P","fifth","5"],["1P 3M 5A","augmented","aug + +5 ^#5"],["1P 3m 5A","minor augmented","m#5 -#5 m+"],["1P 3M 5A 7M","augmented seventh","maj7#5 maj7+5 +maj7 ^7#5"],["1P 3M 5P 7M 9M 11A","major sharp eleventh (lydian)","maj9#11 \u03949#11 ^9#11"],["1P 2M 4P 5P","","sus24 sus4add9"],["1P 3M 5A 7M 9M","","maj9#5 Maj9#5"],["1P 3M 5A 7m","","7#5 +7 7+ 7aug aug7"],["1P 3M 5A 7m 9A","","7#5#9 7#9#5 7alt"],["1P 3M 5A 7m 9M","","9#5 9+"],["1P 3M 5A 7m 9M 11A","","9#5#11"],["1P 3M 5A 7m 9m","","7#5b9 7b9#5"],["1P 3M 5A 7m 9m 11A","","7#5b9#11"],["1P 3M 5A 9A","","+add#9"],["1P 3M 5A 9M","","M#5add9 +add9"],["1P 3M 5P 6M 11A","","M6#11 M6b5 6#11 6b5"],["1P 3M 5P 6M 7M 9M","","M7add13"],["1P 3M 5P 6M 9M 11A","","69#11"],["1P 3m 5P 6M 9M","","m69 -69"],["1P 3M 5P 6m 7m","","7b6"],["1P 3M 5P 7M 9A 11A","","maj7#9#11"],["1P 3M 5P 7M 9M 11A 13M","","M13#11 maj13#11 M13+4 M13#4"],["1P 3M 5P 7M 9m","","M7b9"],["1P 3M 5P 7m 11A 13m","","7#11b13 7b5b13"],["1P 3M 5P 7m 13M","","7add6 67 7add13"],["1P 3M 5P 7m 9A 11A","","7#9#11 7b5#9 7#9b5"],["1P 3M 5P 7m 9A 11A 13M","","13#9#11"],["1P 3M 5P 7m 9A 11A 13m","","7#9#11b13"],["1P 3M 5P 7m 9A 13M","","13#9"],["1P 3M 5P 7m 9A 13m","","7#9b13"],["1P 3M 5P 7m 9M 11A","","9#11 9+4 9#4"],["1P 3M 5P 7m 9M 11A 13M","","13#11 13+4 13#4"],["1P 3M 5P 7m 9M 11A 13m","","9#11b13 9b5b13"],["1P 3M 5P 7m 9m 11A","","7b9#11 7b5b9 7b9b5"],["1P 3M 5P 7m 9m 11A 13M","","13b9#11"],["1P 3M 5P 7m 9m 11A 13m","","7b9b13#11 7b9#11b13 7b5b9b13"],["1P 3M 5P 7m 9m 13M","","13b9"],["1P 3M 5P 7m 9m 13m","","7b9b13"],["1P 3M 5P 7m 9m 9A","","7b9#9"],["1P 3M 5P 9M","","Madd9 2 add9 add2"],["1P 3M 5P 9m","","Maddb9"],["1P 3M 5d","","Mb5"],["1P 3M 5d 6M 7m 9M","","13b5"],["1P 3M 5d 7M","","M7b5"],["1P 3M 5d 7M 9M","","M9b5"],["1P 3M 5d 7m","","7b5"],["1P 3M 5d 7m 9M","","9b5"],["1P 3M 7m","","7no5"],["1P 3M 7m 13m","","7b13"],["1P 3M 7m 9M","","9no5"],["1P 3M 7m 9M 13M","","13no5"],["1P 3M 7m 9M 13m","","9b13"],["1P 3m 4P 5P","","madd4"],["1P 3m 5P 6m 7M","","mMaj7b6"],["1P 3m 5P 6m 7M 9M","","mMaj9b6"],["1P 3m 5P 7m 11P","","m7add11 m7add4"],["1P 3m 5P 9M","","madd9"],["1P 3m 5d 6M 7M","","o7M7"],["1P 3m 5d 7M","","oM7"],["1P 3m 6m 7M","","mb6M7"],["1P 3m 6m 7m","","m7#5"],["1P 3m 6m 7m 9M","","m9#5"],["1P 3m 5A 7m 9M 11P","","m11A"],["1P 3m 6m 9m","","mb6b9"],["1P 2M 3m 5d 7m","","m9b5"],["1P 4P 5A 7M","","M7#5sus4"],["1P 4P 5A 7M 9M","","M9#5sus4"],["1P 4P 5A 7m","","7#5sus4"],["1P 4P 5P 7M","","M7sus4"],["1P 4P 5P 7M 9M","","M9sus4"],["1P 4P 5P 7m 9M","","9sus4 9sus"],["1P 4P 5P 7m 9M 13M","","13sus4 13sus"],["1P 4P 5P 7m 9m 13m","","7sus4b9b13 7b9b13sus4"],["1P 4P 7m 10m","","4 quartal"],["1P 5P 7m 9m 11P","","11b9"]],xc=wc;({...pe});var Ar=[],Zt={};function Cc(){return Ar.slice()}function jc(e,t,n){const r=Ec(e),i={...Pe(e),name:n||"",quality:r,intervals:e,aliases:t};Ar.push(i),i.name&&(Zt[i.name]=i),Zt[i.setNum]=i,Zt[i.chroma]=i,i.aliases.forEach(c=>Lc(i,c))}function Lc(e,t){Zt[t]=e}function Ec(e){const t=n=>e.indexOf(n)!==-1;return t("5A")?"Augmented":t("3M")?"Major":t("5d")?"Diminished":t("3m")?"Minor":"Unknown"}xc.forEach(([e,t,n])=>jc(e.split(" "),n.split(" "),t));Ar.sort((e,t)=>e.setNum-t.setNum);var $c=e=>{const t=e.reduce((n,r)=>{const i=re(r).chroma;return i!==void 0&&(n[i]=n[i]||re(r).name),n},{});return n=>t[n]};function Tc(e,t={}){const n=e.map(i=>re(i).pc).filter(i=>i);return re.length===0?[]:Dc(n,1,t).filter(i=>i.weight).sort((i,c)=>c.weight-i.weight).map(i=>i.name)}var hn={anyThirds:384,perfectFifth:16,nonPerfectFifths:40,anySeventh:3},Mn=e=>t=>Boolean(t&e),Oc=Mn(hn.anyThirds),kc=Mn(hn.perfectFifth),_c=Mn(hn.anySeventh),Rc=Mn(hn.nonPerfectFifths);function Ic(e){const t=parseInt(e.chroma,2);return Oc(t)&&kc(t)&&_c(t)}function Fc(e){const t=parseInt(e,2);return Rc(t)?e:(t|16).toString(2)}function Dc(e,t,n){const r=e[0],i=re(r).chroma,c=$c(e),d=yc(e,!1),h=[];return d.forEach((M,y)=>{const A=n.assumePerfectFifth&&Fc(M);Cc().filter(b=>n.assumePerfectFifth&&Ic(b)?b.chroma===A:b.chroma===M).forEach(b=>{const L=b.aliases[0],_=c(y);y!==i?h.push({weight:.5*t,name:`${_}${L}/${r}`}):h.push({weight:1*t,name:`${_}${L}`})})}),h}function Sa(e){return e!==null&&typeof e=="object"&&"name"in e&&typeof e.name=="string"}function Aa(e){return e!==null&&typeof e=="object"&&"step"in e&&typeof e.step=="number"&&"alt"in e&&typeof e.alt=="number"}var Na=[0,2,4,-1,1,3,5],wa=Na.map(e=>Math.floor(e*7/12));function xa(e){const{step:t,alt:n,oct:r,dir:i=1}=e,c=Na[t]+7*n;if(r===void 0)return[i*c];const d=r-wa[t]-4*n;return[i*c,i*d]}var Gc=[3,0,4,1,5,2,6];function Ca(e){const[t,n,r]=e,i=Gc[zc(t)],c=Math.floor((t+1)/7);if(n===void 0)return{step:i,alt:c,dir:r};const d=n+4*c+wa[i];return{step:i,alt:c,oct:d,dir:r}}function zc(e){const t=(e+1)%7;return t<0?7+t:t}var ji=(e,t)=>Array(Math.abs(t)+1).join(e),rr={empty:!0,name:"",acc:""},Bc="([-+]?\\d+)(d{1,4}|m|M|P|A{1,4})",qc="(AA|A|P|M|m|d|dd)([-+]?\\d+)",Hc=new RegExp("^"+Bc+"|"+qc+"$");function Vc(e){const t=Hc.exec(`${e}`);return t===null?["",""]:t[1]?[t[1],t[2]]:[t[4],t[3]]}var Li={};function ln(e){return typeof e=="string"?Li[e]||(Li[e]=Uc(e)):Aa(e)?ln(Qc(e)):Sa(e)?ln(e.name):rr}var Ei=[0,2,4,5,7,9,11],ja="PMMPPMM";function Uc(e){const t=Vc(e);if(t[0]==="")return rr;const n=+t[0],r=t[1],i=(Math.abs(n)-1)%7,c=ja[i];if(c==="M"&&r==="P")return rr;const d=c==="M"?"majorable":"perfectable",h=""+n+r,M=n<0?-1:1,y=n===8||n===-8?n:M*(i+1),A=Kc(d,r),N=Math.floor((Math.abs(n)-1)/7),b=M*(Ei[i]+A+12*N),L=(M*(Ei[i]+A)%12+12)%12,_=xa({step:i,alt:A,oct:N,dir:M});return{empty:!1,name:h,num:n,q:r,step:i,alt:A,dir:M,type:d,simple:y,semitones:b,chroma:L,coord:_,oct:N}}function Jc(e,t){const[n,r=0]=e,i=n*7+r*12<0,c=t||i?[-n,-r,-1]:[n,r,1];return ln(Ca(c))}function Kc(e,t){return t==="M"&&e==="majorable"||t==="P"&&e==="perfectable"?0:t==="m"&&e==="majorable"?-1:/^A+$/.test(t)?t.length:/^d+$/.test(t)?-1*(e==="perfectable"?t.length:t.length+1):0}function Qc(e){const{step:t,alt:n,oct:r=0,dir:i}=e;if(!i)return"";const c=t+1+7*r,d=c===0?t+1:c,h=i<0?"-":"",M=ja[t]==="M"?"majorable":"perfectable";return h+d+Wc(M,n)}function Wc(e,t){return t===0?e==="majorable"?"M":"P":t===-1&&e==="majorable"?"m":t>0?ji("A",t):ji("d",e==="perfectable"?t:t+1)}var $i=(e,t)=>Array(Math.abs(t)+1).join(e),La={empty:!0,name:"",pc:"",acc:""},Ti=new Map,Xc=e=>"CDEFGAB".charAt(e),Yc=e=>e<0?$i("b",-e):$i("#",e),Zc=e=>e[0]==="b"?-e.length:e.length;function $e(e){const t=JSON.stringify(e),n=Ti.get(t);if(n)return n;const r=typeof e=="string"?ru(e):Aa(e)?$e(iu(e)):Sa(e)?$e(e.name):La;return Ti.set(t,r),r}var eu=/^([a-gA-G]?)(#{1,}|b{1,}|x{1,}|)(-?\d*)\s*(.*)$/;function Ea(e){const t=eu.exec(e);return t?[t[1].toUpperCase(),t[2].replace(/x/g,"##"),t[3],t[4]]:["","","",""]}function tu(e){return $e(Ca(e))}var nu=(e,t)=>(e%t+t)%t,Kn=[0,2,4,5,7,9,11];function ru(e){const t=Ea(e);if(t[0]===""||t[3]!=="")return La;const n=t[0],r=t[1],i=t[2],c=(n.charCodeAt(0)+3)%7,d=Zc(r),h=i.length?+i:void 0,M=xa({step:c,alt:d,oct:h}),y=n+r+i,A=n+r,N=(Kn[c]+d+120)%12,b=h===void 0?nu(Kn[c]+d,12)-12*99:Kn[c]+d+12*(h+1),L=b>=0&&b<=127?b:null,_=h===void 0?null:Math.pow(2,(b-69)/12)*440;return{empty:!1,acc:r,alt:d,chroma:N,coord:M,freq:_,height:b,letter:n,midi:L,name:y,oct:h,pc:A,step:c}}function iu(e){const{step:t,alt:n,oct:r}=e,i=Xc(t);if(!i)return"";const c=i+Yc(n);return r||r===0?c+r:c}function cn(e,t){const n=$e(e),r=Array.isArray(t)?t:ln(t).coord;if(n.empty||!r||r.length<2)return"";const i=n.coord,c=i.length===1?[i[0]+r[0]]:[i[0]+r[0],i[1]+r[1]];return tu(c).name}function $a(e,t){const n=e.length;return r=>{if(!t)return"";const i=r<0?(n- -r%n)%n:r%n,c=Math.floor(r/n),d=cn(t,[0,c]);return cn(d,e[i])}}function au(e,t){const n=$e(e),r=$e(t);if(n.empty||r.empty)return"";const i=n.coord,c=r.coord,d=c[0]-i[0],h=i.length===2&&c.length===2?c[1]-i[1]:-Math.floor(d*7/12),M=r.height===n.height&&r.midi!==null&&n.midi!==null&&n.step>r.step;return Jc([d,h],M).name}function ou(e,t,n){return function(...r){return console.warn(`${e} is deprecated. Use ${t}.`),n.apply(this,r)}}var su=[["1P 3M 5P","major","M ^  maj"],["1P 3M 5P 7M","major seventh","maj7 \u0394 ma7 M7 Maj7 ^7"],["1P 3M 5P 7M 9M","major ninth","maj9 \u03949 ^9"],["1P 3M 5P 7M 9M 13M","major thirteenth","maj13 Maj13 ^13"],["1P 3M 5P 6M","sixth","6 add6 add13 M6"],["1P 3M 5P 6M 9M","sixth added ninth","6add9 6/9 69 M69"],["1P 3M 6m 7M","major seventh flat sixth","M7b6 ^7b6"],["1P 3M 5P 7M 11A","major seventh sharp eleventh","maj#4 \u0394#4 \u0394#11 M7#11 ^7#11 maj7#11"],["1P 3m 5P","minor","m min -"],["1P 3m 5P 7m","minor seventh","m7 min7 mi7 -7"],["1P 3m 5P 7M","minor/major seventh","m/ma7 m/maj7 mM7 mMaj7 m/M7 -\u03947 m\u0394 -^7"],["1P 3m 5P 6M","minor sixth","m6 -6"],["1P 3m 5P 7m 9M","minor ninth","m9 -9"],["1P 3m 5P 7M 9M","minor/major ninth","mM9 mMaj9 -^9"],["1P 3m 5P 7m 9M 11P","minor eleventh","m11 -11"],["1P 3m 5P 7m 9M 13M","minor thirteenth","m13 -13"],["1P 3m 5d","diminished","dim \xB0 o"],["1P 3m 5d 7d","diminished seventh","dim7 \xB07 o7"],["1P 3m 5d 7m","half-diminished","m7b5 \xF8 -7b5 h7 h"],["1P 3M 5P 7m","dominant seventh","7 dom"],["1P 3M 5P 7m 9M","dominant ninth","9"],["1P 3M 5P 7m 9M 13M","dominant thirteenth","13"],["1P 3M 5P 7m 11A","lydian dominant seventh","7#11 7#4"],["1P 3M 5P 7m 9m","dominant flat ninth","7b9"],["1P 3M 5P 7m 9A","dominant sharp ninth","7#9"],["1P 3M 7m 9m","altered","alt7"],["1P 4P 5P","suspended fourth","sus4 sus"],["1P 2M 5P","suspended second","sus2"],["1P 4P 5P 7m","suspended fourth seventh","7sus4 7sus"],["1P 5P 7m 9M 11P","eleventh","11"],["1P 4P 5P 7m 9m","suspended fourth flat ninth","b9sus phryg 7b9sus 7b9sus4"],["1P 5P","fifth","5"],["1P 3M 5A","augmented","aug + +5 ^#5"],["1P 3m 5A","minor augmented","m#5 -#5 m+"],["1P 3M 5A 7M","augmented seventh","maj7#5 maj7+5 +maj7 ^7#5"],["1P 3M 5P 7M 9M 11A","major sharp eleventh (lydian)","maj9#11 \u03949#11 ^9#11"],["1P 2M 4P 5P","","sus24 sus4add9"],["1P 3M 5A 7M 9M","","maj9#5 Maj9#5"],["1P 3M 5A 7m","","7#5 +7 7+ 7aug aug7"],["1P 3M 5A 7m 9A","","7#5#9 7#9#5 7alt"],["1P 3M 5A 7m 9M","","9#5 9+"],["1P 3M 5A 7m 9M 11A","","9#5#11"],["1P 3M 5A 7m 9m","","7#5b9 7b9#5"],["1P 3M 5A 7m 9m 11A","","7#5b9#11"],["1P 3M 5A 9A","","+add#9"],["1P 3M 5A 9M","","M#5add9 +add9"],["1P 3M 5P 6M 11A","","M6#11 M6b5 6#11 6b5"],["1P 3M 5P 6M 7M 9M","","M7add13"],["1P 3M 5P 6M 9M 11A","","69#11"],["1P 3m 5P 6M 9M","","m69 -69"],["1P 3M 5P 6m 7m","","7b6"],["1P 3M 5P 7M 9A 11A","","maj7#9#11"],["1P 3M 5P 7M 9M 11A 13M","","M13#11 maj13#11 M13+4 M13#4"],["1P 3M 5P 7M 9m","","M7b9"],["1P 3M 5P 7m 11A 13m","","7#11b13 7b5b13"],["1P 3M 5P 7m 13M","","7add6 67 7add13"],["1P 3M 5P 7m 9A 11A","","7#9#11 7b5#9 7#9b5"],["1P 3M 5P 7m 9A 11A 13M","","13#9#11"],["1P 3M 5P 7m 9A 11A 13m","","7#9#11b13"],["1P 3M 5P 7m 9A 13M","","13#9"],["1P 3M 5P 7m 9A 13m","","7#9b13"],["1P 3M 5P 7m 9M 11A","","9#11 9+4 9#4"],["1P 3M 5P 7m 9M 11A 13M","","13#11 13+4 13#4"],["1P 3M 5P 7m 9M 11A 13m","","9#11b13 9b5b13"],["1P 3M 5P 7m 9m 11A","","7b9#11 7b5b9 7b9b5"],["1P 3M 5P 7m 9m 11A 13M","","13b9#11"],["1P 3M 5P 7m 9m 11A 13m","","7b9b13#11 7b9#11b13 7b5b9b13"],["1P 3M 5P 7m 9m 13M","","13b9"],["1P 3M 5P 7m 9m 13m","","7b9b13"],["1P 3M 5P 7m 9m 9A","","7b9#9"],["1P 3M 5P 9M","","Madd9 2 add9 add2"],["1P 3M 5P 9m","","Maddb9"],["1P 3M 5d","","Mb5"],["1P 3M 5d 6M 7m 9M","","13b5"],["1P 3M 5d 7M","","M7b5"],["1P 3M 5d 7M 9M","","M9b5"],["1P 3M 5d 7m","","7b5"],["1P 3M 5d 7m 9M","","9b5"],["1P 3M 7m","","7no5"],["1P 3M 7m 13m","","7b13"],["1P 3M 7m 9M","","9no5"],["1P 3M 7m 9M 13M","","13no5"],["1P 3M 7m 9M 13m","","9b13"],["1P 3m 4P 5P","","madd4"],["1P 3m 5P 6m 7M","","mMaj7b6"],["1P 3m 5P 6m 7M 9M","","mMaj9b6"],["1P 3m 5P 7m 11P","","m7add11 m7add4"],["1P 3m 5P 9M","","madd9"],["1P 3m 5d 6M 7M","","o7M7"],["1P 3m 5d 7M","","oM7"],["1P 3m 6m 7M","","mb6M7"],["1P 3m 6m 7m","","m7#5"],["1P 3m 6m 7m 9M","","m9#5"],["1P 3m 5A 7m 9M 11P","","m11A"],["1P 3m 6m 9m","","mb6b9"],["1P 2M 3m 5d 7m","","m9b5"],["1P 4P 5A 7M","","M7#5sus4"],["1P 4P 5A 7M 9M","","M9#5sus4"],["1P 4P 5A 7m","","7#5sus4"],["1P 4P 5P 7M","","M7sus4"],["1P 4P 5P 7M 9M","","M9sus4"],["1P 4P 5P 7m 9M","","9sus4 9sus"],["1P 4P 5P 7m 9M 13M","","13sus4 13sus"],["1P 4P 5P 7m 9m 13m","","7sus4b9b13 7b9b13sus4"],["1P 4P 7m 10m","","4 quartal"],["1P 5P 7m 9m 11P","","11b9"]],lu=su,cu={...pe,name:"",quality:"Unknown",intervals:[],aliases:[]},Nr=[],Lt={};function uu(e){return Lt[e]||cu}function Ta(){return Nr.slice()}function mu(e,t,n){const r=fu(e),i={...Pe(e),name:n||"",quality:r,intervals:e,aliases:t};Nr.push(i),i.name&&(Lt[i.name]=i),Lt[i.setNum]=i,Lt[i.chroma]=i,i.aliases.forEach(c=>du(i,c))}function du(e,t){Lt[t]=e}function fu(e){const t=n=>e.indexOf(n)!==-1;return t("5A")?"Augmented":t("3M")?"Major":t("5d")?"Diminished":t("3m")?"Minor":"Unknown"}lu.forEach(([e,t,n])=>mu(e.split(" "),n.split(" "),t));Nr.sort((e,t)=>e.setNum-t.setNum);Object.freeze({empty:!0,name:"",num:NaN,q:"",type:"",step:NaN,alt:NaN,dir:NaN,simple:NaN,semitones:NaN,chroma:NaN,coord:[],oct:NaN});var hu=[["1P 2M 3M 5P 6M","major pentatonic","pentatonic"],["1P 2M 3M 4P 5P 6M 7M","major","ionian"],["1P 2M 3m 4P 5P 6m 7m","minor","aeolian"],["1P 2M 3m 3M 5P 6M","major blues"],["1P 3m 4P 5d 5P 7m","minor blues","blues"],["1P 2M 3m 4P 5P 6M 7M","melodic minor"],["1P 2M 3m 4P 5P 6m 7M","harmonic minor"],["1P 2M 3M 4P 5P 6M 7m 7M","bebop"],["1P 2M 3m 4P 5d 6m 6M 7M","diminished","whole-half diminished"],["1P 2M 3m 4P 5P 6M 7m","dorian"],["1P 2M 3M 4A 5P 6M 7M","lydian"],["1P 2M 3M 4P 5P 6M 7m","mixolydian","dominant"],["1P 2m 3m 4P 5P 6m 7m","phrygian"],["1P 2m 3m 4P 5d 6m 7m","locrian"],["1P 3M 4P 5P 7M","ionian pentatonic"],["1P 3M 4P 5P 7m","mixolydian pentatonic","indian"],["1P 2M 4P 5P 6M","ritusen"],["1P 2M 4P 5P 7m","egyptian"],["1P 3M 4P 5d 7m","neopolitan major pentatonic"],["1P 3m 4P 5P 6m","vietnamese 1"],["1P 2m 3m 5P 6m","pelog"],["1P 2m 4P 5P 6m","kumoijoshi"],["1P 2M 3m 5P 6m","hirajoshi"],["1P 2m 4P 5d 7m","iwato"],["1P 2m 4P 5P 7m","in-sen"],["1P 3M 4A 5P 7M","lydian pentatonic","chinese"],["1P 3m 4P 6m 7m","malkos raga"],["1P 3m 4P 5d 7m","locrian pentatonic","minor seven flat five pentatonic"],["1P 3m 4P 5P 7m","minor pentatonic","vietnamese 2"],["1P 3m 4P 5P 6M","minor six pentatonic"],["1P 2M 3m 5P 6M","flat three pentatonic","kumoi"],["1P 2M 3M 5P 6m","flat six pentatonic"],["1P 2m 3M 5P 6M","scriabin"],["1P 3M 5d 6m 7m","whole tone pentatonic"],["1P 3M 4A 5A 7M","lydian #5P pentatonic"],["1P 3M 4A 5P 7m","lydian dominant pentatonic"],["1P 3m 4P 5P 7M","minor #7M pentatonic"],["1P 3m 4d 5d 7m","super locrian pentatonic"],["1P 2M 3m 4P 5P 7M","minor hexatonic"],["1P 2A 3M 5P 5A 7M","augmented"],["1P 2M 4P 5P 6M 7m","piongio"],["1P 2m 3M 4A 6M 7m","prometheus neopolitan"],["1P 2M 3M 4A 6M 7m","prometheus"],["1P 2m 3M 5d 6m 7m","mystery #1"],["1P 2m 3M 4P 5A 6M","six tone symmetric"],["1P 2M 3M 4A 5A 6A","whole tone","messiaen's mode #1"],["1P 2m 4P 4A 5P 7M","messiaen's mode #5"],["1P 2M 3M 4P 5d 6m 7m","locrian major","arabian"],["1P 2m 3M 4A 5P 6m 7M","double harmonic lydian"],["1P 2m 2A 3M 4A 6m 7m","altered","super locrian","diminished whole tone","pomeroy"],["1P 2M 3m 4P 5d 6m 7m","locrian #2","half-diminished","aeolian b5"],["1P 2M 3M 4P 5P 6m 7m","mixolydian b6","melodic minor fifth mode","hindu"],["1P 2M 3M 4A 5P 6M 7m","lydian dominant","lydian b7","overtone"],["1P 2M 3M 4A 5A 6M 7M","lydian augmented"],["1P 2m 3m 4P 5P 6M 7m","dorian b2","phrygian #6","melodic minor second mode"],["1P 2m 3m 4d 5d 6m 7d","ultralocrian","superlocrian bb7","superlocrian diminished"],["1P 2m 3m 4P 5d 6M 7m","locrian 6","locrian natural 6","locrian sharp 6"],["1P 2A 3M 4P 5P 5A 7M","augmented heptatonic"],["1P 2M 3m 4A 5P 6M 7m","dorian #4","ukrainian dorian","romanian minor","altered dorian"],["1P 2M 3m 4A 5P 6M 7M","lydian diminished"],["1P 2M 3M 4A 5A 7m 7M","leading whole tone"],["1P 2M 3M 4A 5P 6m 7m","lydian minor"],["1P 2m 3M 4P 5P 6m 7m","phrygian dominant","spanish","phrygian major"],["1P 2m 3m 4P 5P 6m 7M","balinese"],["1P 2m 3m 4P 5P 6M 7M","neopolitan major"],["1P 2M 3M 4P 5P 6m 7M","harmonic major"],["1P 2m 3M 4P 5P 6m 7M","double harmonic major","gypsy"],["1P 2M 3m 4A 5P 6m 7M","hungarian minor"],["1P 2A 3M 4A 5P 6M 7m","hungarian major"],["1P 2m 3M 4P 5d 6M 7m","oriental"],["1P 2m 3m 3M 4A 5P 7m","flamenco"],["1P 2m 3m 4A 5P 6m 7M","todi raga"],["1P 2m 3M 4P 5d 6m 7M","persian"],["1P 2m 3M 5d 6m 7m 7M","enigmatic"],["1P 2M 3M 4P 5A 6M 7M","major augmented","major #5","ionian augmented","ionian #5"],["1P 2A 3M 4A 5P 6M 7M","lydian #9"],["1P 2m 2M 4P 4A 5P 6m 7M","messiaen's mode #4"],["1P 2m 3M 4P 4A 5P 6m 7M","purvi raga"],["1P 2m 3m 3M 4P 5P 6m 7m","spanish heptatonic"],["1P 2M 3m 3M 4P 5P 6M 7m","bebop minor"],["1P 2M 3M 4P 5P 5A 6M 7M","bebop major"],["1P 2m 3m 4P 5d 5P 6m 7m","bebop locrian"],["1P 2M 3m 4P 5P 6m 7m 7M","minor bebop"],["1P 2M 3M 4P 5d 5P 6M 7M","ichikosucho"],["1P 2M 3m 4P 5P 6m 6M 7M","minor six diminished"],["1P 2m 3m 3M 4A 5P 6M 7m","half-whole diminished","dominant diminished","messiaen's mode #2"],["1P 3m 3M 4P 5P 6M 7m 7M","kafi raga"],["1P 2M 3M 4P 4A 5A 6A 7M","messiaen's mode #6"],["1P 2M 3m 3M 4P 5d 5P 6M 7m","composite blues"],["1P 2M 3m 3M 4A 5P 6m 7m 7M","messiaen's mode #3"],["1P 2m 2M 3m 4P 4A 5P 6m 6M 7M","messiaen's mode #7"],["1P 2m 2M 3m 3M 4P 5d 5P 6m 6M 7m 7M","chromatic"]],Mu=hu,pu={...pe,intervals:[],aliases:[]},Oa=[],Et={};function Pu(e){return Et[e]||pu}function gu(){return Oa.slice()}function vu(e,t,n=[]){const r={...Pe(e),name:t,intervals:e,aliases:n};return Oa.push(r),Et[r.name]=r,Et[r.setNum]=r,Et[r.chroma]=r,r.aliases.forEach(i=>yu(r,i)),r}function yu(e,t){Et[t]=e}Mu.forEach(([e,t,...n])=>vu(e.split(" "),t,n));var ir={empty:!0,name:"",symbol:"",root:"",rootDegree:0,type:"",tonic:null,setNum:NaN,quality:"Unknown",chroma:"",normalized:"",aliases:[],notes:[],intervals:[]};function wr(e){const[t,n,r,i]=Ea(e);return t===""?["",e]:t==="A"&&i==="ug"?["","aug"]:[t+n,r+i]}function Ue(e){if(e==="")return ir;if(Array.isArray(e)&&e.length===2)return en(e[1],e[0]);{const[t,n]=wr(e),r=en(n,t);return r.empty?en(e):r}}function en(e,t,n){const r=uu(e),i=$e(t||""),c=$e(n||"");if(r.empty||t&&i.empty||n&&c.empty)return ir;const d=au(i.pc,c.pc),h=r.intervals.indexOf(d)+1;if(!c.empty&&!h)return ir;const M=Array.from(r.intervals);for(let b=1;b<h;b++){const L=M[0][0],_=M[0][1],R=parseInt(L,10)+7;M.push(`${R}${_}`),M.shift()}const y=i.empty?[]:M.map(b=>cn(i,b));e=r.aliases.indexOf(e)!==-1?e:r.aliases[0];const A=`${i.empty?"":i.pc}${e}${c.empty||h<=1?"":"/"+c.pc}`,N=`${t?i.pc+" ":""}${r.name}${h>1&&n?" over "+c.pc:""}`;return{...r,name:N,symbol:A,type:r.name,root:c.name,intervals:M,rootDegree:h,tonic:i.name,notes:y}}var bu=ou("Chord.chord","Chord.get",Ue);function Su(e,t){const[n,r]=wr(e);return n?cn(n,t)+r:e}function Au(e){const t=Ue(e),n=ba(t.chroma);return gu().filter(r=>n(r.chroma)).map(r=>r.name)}function Nu(e){const t=Ue(e),n=ba(t.chroma);return Ta().filter(r=>n(r.chroma)).map(r=>t.tonic+r.aliases[0])}function wu(e){const t=Ue(e),n=bc(t.chroma);return Ta().filter(r=>n(r.chroma)).map(r=>t.tonic+r.aliases[0])}function xu(e){const{intervals:t,tonic:n}=Ue(e),r=$a(t,n);return i=>i?r(i>0?i-1:i):""}function Cu(e){const{intervals:t,tonic:n}=Ue(e);return $a(t,n)}var ju={getChord:en,get:Ue,detect:Tc,chordScales:Au,extended:Nu,reduced:wu,tokenize:wr,transpose:Su,degrees:xu,steps:Cu,chord:bu};Object.freeze({empty:!0,name:"",num:NaN,q:"",type:"",step:NaN,alt:NaN,dir:NaN,simple:NaN,semitones:NaN,chroma:NaN,coord:[],oct:NaN});Object.freeze({empty:!0,name:"",num:NaN,q:"",type:"",step:NaN,alt:NaN,dir:NaN,simple:NaN,semitones:NaN,chroma:NaN,coord:[],oct:NaN});Object.freeze({empty:!0,name:"",num:NaN,q:"",type:"",step:NaN,alt:NaN,dir:NaN,simple:NaN,semitones:NaN,chroma:NaN,coord:[],oct:NaN});var Lu=Math.log(2),Eu=Math.log(440);function ka(e){const t=12*(Math.log(e)-Eu)/Lu+69;return Math.round(t*100)/100}var $u="C C# D D# E F F# G G# A A# B".split(" "),Tu="C Db D Eb E F Gb G Ab A Bb B".split(" ");function nt(e,t={}){if(isNaN(e)||e===-1/0||e===1/0)return"";e=Math.round(e);const r=(t.sharps===!0?$u:Tu)[e%12];if(t.pitchClass)return r;const i=Math.floor(e/12)-1;return r+i}var Ou=["C","D","E","F","G","A","B"],_a=e=>e.name,Ra=e=>e.map(re).filter(t=>!t.empty);function ku(e){return e===void 0?Ou.slice():Array.isArray(e)?Ra(e).map(_a):[]}var de=re,_u=e=>de(e).name,Ru=e=>de(e).pc,Iu=e=>de(e).acc,Fu=e=>de(e).oct,Du=e=>de(e).midi,Gu=e=>de(e).freq,zu=e=>de(e).chroma;function Bu(e){return nt(e)}function qu(e){return nt(ka(e))}function Hu(e){return nt(ka(e),{sharps:!0})}function Vu(e){return nt(e,{sharps:!0})}var kt=fn,Uu=fn,Ia=e=>t=>kt(t,e),Ju=Ia,Fa=e=>t=>kt(e,t),Ku=Fa;function Da(e,t){return kt(e,[t,0])}var Qu=Da;function Wu(e,t){return kt(e,[0,t])}var xr=(e,t)=>e.height-t.height,Xu=(e,t)=>t.height-e.height;function Ga(e,t){return t=t||xr,Ra(e).sort(t).map(_a)}function Yu(e){return Ga(e,xr).filter((t,n,r)=>n===0||t!==r[n-1])}var Zu=e=>{const t=de(e);return t.empty?"":nt(t.midi||t.chroma,{sharps:t.alt>0,pitchClass:t.midi===null})};function em(e,t){const n=de(e);if(n.empty)return"";const r=de(t||nt(n.midi||n.chroma,{sharps:n.alt<0,pitchClass:!0}));if(r.empty||r.chroma!==n.chroma)return"";if(n.oct===void 0)return r.pc;const i=n.chroma-n.alt,c=r.chroma-r.alt,d=i>11||c<0?-1:i<0||c>11?1:0,h=n.oct+d;return r.pc+h}var tm={names:ku,get:de,name:_u,pitchClass:Ru,accidentals:Iu,octave:Fu,midi:Du,ascending:xr,descending:Xu,sortedNames:Ga,sortedUniqNames:Yu,fromMidi:Bu,fromMidiSharps:Vu,freq:Gu,fromFreq:qu,fromFreqSharps:Hu,chroma:zu,transpose:kt,tr:Uu,transposeBy:Ia,trBy:Ju,transposeFrom:Fa,trFrom:Ku,transposeFifths:Da,transposeOctaves:Wu,trFifths:Qu,simplify:Zu,enharmonic:em};function za(e){return e!==null&&typeof e=="object"&&"name"in e&&typeof e.name=="string"}function Ba(e){return e!==null&&typeof e=="object"&&"step"in e&&typeof e.step=="number"&&"alt"in e&&typeof e.alt=="number"&&!isNaN(e.step)&&!isNaN(e.alt)}var qa=[0,2,4,-1,1,3,5],nm=qa.map(e=>Math.floor(e*7/12));function rm(e){const{step:t,alt:n,oct:r,dir:i=1}=e,c=qa[t]+7*n;if(r===void 0)return[i*c];const d=r-nm[t]-4*n;return[i*c,i*d]}var Oi=(e,t)=>Array(Math.abs(t)+1).join(e),ar=Object.freeze({empty:!0,name:"",num:NaN,q:"",type:"",step:NaN,alt:NaN,dir:NaN,simple:NaN,semitones:NaN,chroma:NaN,coord:[],oct:NaN}),im="([-+]?\\d+)(d{1,4}|m|M|P|A{1,4})",am="(AA|A|P|M|m|d|dd)([-+]?\\d+)",om=new RegExp("^"+im+"|"+am+"$");function sm(e){const t=om.exec(`${e}`);return t===null?["",""]:t[1]?[t[1],t[2]]:[t[4],t[3]]}var ki={};function or(e){return typeof e=="string"?ki[e]||(ki[e]=lm(e)):Ba(e)?or(um(e)):za(e)?or(e.name):ar}var _i=[0,2,4,5,7,9,11],Ha="PMMPPMM";function lm(e){const t=sm(e);if(t[0]==="")return ar;const n=+t[0],r=t[1],i=(Math.abs(n)-1)%7,c=Ha[i];if(c==="M"&&r==="P")return ar;const d=c==="M"?"majorable":"perfectable",h=""+n+r,M=n<0?-1:1,y=n===8||n===-8?n:M*(i+1),A=cm(d,r),N=Math.floor((Math.abs(n)-1)/7),b=M*(_i[i]+A+12*N),L=(M*(_i[i]+A)%12+12)%12,_=rm({step:i,alt:A,oct:N,dir:M});return{empty:!1,name:h,num:n,q:r,step:i,alt:A,dir:M,type:d,simple:y,semitones:b,chroma:L,coord:_,oct:N}}function cm(e,t){return t==="M"&&e==="majorable"||t==="P"&&e==="perfectable"?0:t==="m"&&e==="majorable"?-1:/^A+$/.test(t)?t.length:/^d+$/.test(t)?-1*(e==="perfectable"?t.length:t.length+1):0}function um(e){const{step:t,alt:n,oct:r=0,dir:i}=e;if(!i)return"";const c=t+1+7*r,d=c===0?t+1:c,h=i<0?"-":"",M=Ha[t]==="M"?"majorable":"perfectable";return h+d+mm(M,n)}function mm(e,t){return t===0?e==="majorable"?"M":"P":t===-1&&e==="majorable"?"m":t>0?Oi("A",t):Oi("d",e==="perfectable"?t:t+1)}function dm(e,t,n){return function(...r){return console.warn(`${e} is deprecated. Use ${t}.`),n.apply(this,r)}}var fm=dm("isNamed","isNamedPitch",za),Va={empty:!0,name:"",chordType:""},Ri={};function Ot(e){return typeof e=="string"?Ri[e]||(Ri[e]=gm(e)):typeof e=="number"?Ot(Cr[e]||""):Ba(e)?hm(e):fm(e)?Ot(e.name):Va}function hm(e){return Ot(Ma(e.alt)+Cr[e.step])}var Mm=/^(#{1,}|b{1,}|x{1,}|)(IV|I{1,3}|VI{0,2}|iv|i{1,3}|vi{0,2})([^IViv]*)$/;function pm(e){return Mm.exec(e)||["","","",""]}var Pm="I II III IV V VI VII",Cr=Pm.split(" ");function gm(e){const[t,n,r,i]=pm(e);if(!r)return Va;const c=r.toUpperCase(),d=Cr.indexOf(c),h=pa(n),M=1;return{empty:!1,name:t,roman:r,interval:or({step:d,alt:h,dir:M}).name,acc:n,chordType:i,alt:h,step:d,major:r===c,oct:0,dir:M}}Object.freeze([]);Object.freeze({empty:!0,name:"",num:NaN,q:"",type:"",step:NaN,alt:NaN,dir:NaN,simple:NaN,semitones:NaN,chroma:NaN,coord:[],oct:NaN});var jr=[[0,2773,0,"ionian","","Maj7","major"],[1,2902,2,"dorian","m","m7"],[2,3418,4,"phrygian","m","m7"],[3,2741,-1,"lydian","","Maj7"],[4,2774,1,"mixolydian","","7"],[5,2906,3,"aeolian","m","m7","minor"],[6,3434,5,"locrian","dim","m7b5"]],Ii={...pe,name:"",alt:0,modeNum:NaN,triad:"",seventh:"",aliases:[]},vm=jr.map(ym),sr={};vm.forEach(e=>{sr[e.name]=e,e.aliases.forEach(t=>{sr[t]=e})});function Ua(e){return typeof e=="string"?sr[e.toLowerCase()]||Ii:e&&e.name?Ua(e.name):Ii}function ym(e){const[t,n,r,i,c,d,h]=e,M=h?[h]:[],y=Number(n).toString(2);return{empty:!1,intervals:Pu(i).intervals,modeNum:t,chroma:y,normalized:y,name:i,setNum:n,alt:r,triad:c,seventh:d,aliases:M}}function Ja(e){return(t,n)=>{const r=Ua(t);if(r.empty)return[];const i=Sr(r.modeNum,e),c=r.intervals.map(d=>fn(n,d));return i.map((d,h)=>c[h]+d)}}Ja(jr.map(e=>e[4]));Ja(jr.map(e=>e[5]));function bm(e){return e!==null&&typeof e=="object"&&"name"in e&&typeof e.name=="string"}function Sm(e){return e!==null&&typeof e=="object"&&"step"in e&&typeof e.step=="number"&&"alt"in e&&typeof e.alt=="number"&&!isNaN(e.step)&&!isNaN(e.alt)}var Ka=[0,2,4,-1,1,3,5],Am=Ka.map(e=>Math.floor(e*7/12));function Nm(e){const{step:t,alt:n,oct:r,dir:i=1}=e,c=Ka[t]+7*n;if(r===void 0)return[i*c];const d=r-Am[t]-4*n;return[i*c,i*d]}var Fi=(e,t)=>Array(Math.abs(t)+1).join(e),lr=Object.freeze({empty:!0,name:"",num:NaN,q:"",type:"",step:NaN,alt:NaN,dir:NaN,simple:NaN,semitones:NaN,chroma:NaN,coord:[],oct:NaN}),wm="([-+]?\\d+)(d{1,4}|m|M|P|A{1,4})",xm="(AA|A|P|M|m|d|dd)([-+]?\\d+)",Cm=new RegExp("^"+wm+"|"+xm+"$");function jm(e){const t=Cm.exec(`${e}`);return t===null?["",""]:t[1]?[t[1],t[2]]:[t[4],t[3]]}var Di={};function un(e){return typeof e=="string"?Di[e]||(Di[e]=Lm(e)):Sm(e)?un($m(e)):bm(e)?un(e.name):lr}var Gi=[0,2,4,5,7,9,11],Qa="PMMPPMM";function Lm(e){const t=jm(e);if(t[0]==="")return lr;const n=+t[0],r=t[1],i=(Math.abs(n)-1)%7,c=Qa[i];if(c==="M"&&r==="P")return lr;const d=c==="M"?"majorable":"perfectable",h=""+n+r,M=n<0?-1:1,y=n===8||n===-8?n:M*(i+1),A=Em(d,r),N=Math.floor((Math.abs(n)-1)/7),b=M*(Gi[i]+A+12*N),L=(M*(Gi[i]+A)%12+12)%12,_=Nm({step:i,alt:A,oct:N,dir:M});return{empty:!1,name:h,num:n,q:r,step:i,alt:A,dir:M,type:d,simple:y,semitones:b,chroma:L,coord:_,oct:N}}function Em(e,t){return t==="M"&&e==="majorable"||t==="P"&&e==="perfectable"?0:t==="m"&&e==="majorable"?-1:/^A+$/.test(t)?t.length:/^d+$/.test(t)?-1*(e==="perfectable"?t.length:t.length+1):0}function $m(e){const{step:t,alt:n,oct:r=0,dir:i}=e;if(!i)return"";const c=t+1+7*r,d=c===0?t+1:c,h=i<0?"-":"",M=Qa[t]==="M"?"majorable":"perfectable";return h+d+Tm(M,n)}function Tm(e,t){return t===0?e==="majorable"?"M":"P":t===-1&&e==="majorable"?"m":t>0?Fi("A",t):Fi("d",e==="perfectable"?t:t+1)}var Om=[["1P 3M 5P","major","M ^  maj"],["1P 3M 5P 7M","major seventh","maj7 \u0394 ma7 M7 Maj7 ^7"],["1P 3M 5P 7M 9M","major ninth","maj9 \u03949 ^9"],["1P 3M 5P 7M 9M 13M","major thirteenth","maj13 Maj13 ^13"],["1P 3M 5P 6M","sixth","6 add6 add13 M6"],["1P 3M 5P 6M 9M","sixth added ninth","6add9 6/9 69 M69"],["1P 3M 6m 7M","major seventh flat sixth","M7b6 ^7b6"],["1P 3M 5P 7M 11A","major seventh sharp eleventh","maj#4 \u0394#4 \u0394#11 M7#11 ^7#11 maj7#11"],["1P 3m 5P","minor","m min -"],["1P 3m 5P 7m","minor seventh","m7 min7 mi7 -7"],["1P 3m 5P 7M","minor/major seventh","m/ma7 m/maj7 mM7 mMaj7 m/M7 -\u03947 m\u0394 -^7 -maj7"],["1P 3m 5P 6M","minor sixth","m6 -6"],["1P 3m 5P 7m 9M","minor ninth","m9 -9"],["1P 3m 5P 7M 9M","minor/major ninth","mM9 mMaj9 -^9"],["1P 3m 5P 7m 9M 11P","minor eleventh","m11 -11"],["1P 3m 5P 7m 9M 13M","minor thirteenth","m13 -13"],["1P 3m 5d","diminished","dim \xB0 o"],["1P 3m 5d 7d","diminished seventh","dim7 \xB07 o7"],["1P 3m 5d 7m","half-diminished","m7b5 \xF8 -7b5 h7 h"],["1P 3M 5P 7m","dominant seventh","7 dom"],["1P 3M 5P 7m 9M","dominant ninth","9"],["1P 3M 5P 7m 9M 13M","dominant thirteenth","13"],["1P 3M 5P 7m 11A","lydian dominant seventh","7#11 7#4"],["1P 3M 5P 7m 9m","dominant flat ninth","7b9"],["1P 3M 5P 7m 9A","dominant sharp ninth","7#9"],["1P 3M 7m 9m","altered","alt7"],["1P 4P 5P","suspended fourth","sus4 sus"],["1P 2M 5P","suspended second","sus2"],["1P 4P 5P 7m","suspended fourth seventh","7sus4 7sus"],["1P 5P 7m 9M 11P","eleventh","11"],["1P 4P 5P 7m 9m","suspended fourth flat ninth","b9sus phryg 7b9sus 7b9sus4"],["1P 5P","fifth","5"],["1P 3M 5A","augmented","aug + +5 ^#5"],["1P 3m 5A","minor augmented","m#5 -#5 m+"],["1P 3M 5A 7M","augmented seventh","maj7#5 maj7+5 +maj7 ^7#5"],["1P 3M 5P 7M 9M 11A","major sharp eleventh (lydian)","maj9#11 \u03949#11 ^9#11"],["1P 2M 4P 5P","","sus24 sus4add9"],["1P 3M 5A 7M 9M","","maj9#5 Maj9#5"],["1P 3M 5A 7m","","7#5 +7 7+ 7aug aug7"],["1P 3M 5A 7m 9A","","7#5#9 7#9#5 7alt"],["1P 3M 5A 7m 9M","","9#5 9+"],["1P 3M 5A 7m 9M 11A","","9#5#11"],["1P 3M 5A 7m 9m","","7#5b9 7b9#5"],["1P 3M 5A 7m 9m 11A","","7#5b9#11"],["1P 3M 5A 9A","","+add#9"],["1P 3M 5A 9M","","M#5add9 +add9"],["1P 3M 5P 6M 11A","","M6#11 M6b5 6#11 6b5"],["1P 3M 5P 6M 7M 9M","","M7add13"],["1P 3M 5P 6M 9M 11A","","69#11"],["1P 3m 5P 6M 9M","","m69 -69"],["1P 3M 5P 6m 7m","","7b6"],["1P 3M 5P 7M 9A 11A","","maj7#9#11"],["1P 3M 5P 7M 9M 11A 13M","","M13#11 maj13#11 M13+4 M13#4"],["1P 3M 5P 7M 9m","","M7b9"],["1P 3M 5P 7m 11A 13m","","7#11b13 7b5b13"],["1P 3M 5P 7m 13M","","7add6 67 7add13"],["1P 3M 5P 7m 9A 11A","","7#9#11 7b5#9 7#9b5"],["1P 3M 5P 7m 9A 11A 13M","","13#9#11"],["1P 3M 5P 7m 9A 11A 13m","","7#9#11b13"],["1P 3M 5P 7m 9A 13M","","13#9"],["1P 3M 5P 7m 9A 13m","","7#9b13"],["1P 3M 5P 7m 9M 11A","","9#11 9+4 9#4"],["1P 3M 5P 7m 9M 11A 13M","","13#11 13+4 13#4"],["1P 3M 5P 7m 9M 11A 13m","","9#11b13 9b5b13"],["1P 3M 5P 7m 9m 11A","","7b9#11 7b5b9 7b9b5"],["1P 3M 5P 7m 9m 11A 13M","","13b9#11"],["1P 3M 5P 7m 9m 11A 13m","","7b9b13#11 7b9#11b13 7b5b9b13"],["1P 3M 5P 7m 9m 13M","","13b9"],["1P 3M 5P 7m 9m 13m","","7b9b13"],["1P 3M 5P 7m 9m 9A","","7b9#9"],["1P 3M 5P 9M","","Madd9 2 add9 add2"],["1P 3M 5P 9m","","Maddb9"],["1P 3M 5d","","Mb5"],["1P 3M 5d 6M 7m 9M","","13b5"],["1P 3M 5d 7M","","M7b5"],["1P 3M 5d 7M 9M","","M9b5"],["1P 3M 5d 7m","","7b5"],["1P 3M 5d 7m 9M","","9b5"],["1P 3M 7m","","7no5"],["1P 3M 7m 13m","","7b13"],["1P 3M 7m 9M","","9no5"],["1P 3M 7m 9M 13M","","13no5"],["1P 3M 7m 9M 13m","","9b13"],["1P 3m 4P 5P","","madd4"],["1P 3m 5P 6m 7M","","mMaj7b6"],["1P 3m 5P 6m 7M 9M","","mMaj9b6"],["1P 3m 5P 7m 11P","","m7add11 m7add4"],["1P 3m 5P 9M","","madd9"],["1P 3m 5d 6M 7M","","o7M7"],["1P 3m 5d 7M","","oM7"],["1P 3m 6m 7M","","mb6M7"],["1P 3m 6m 7m","","m7#5"],["1P 3m 6m 7m 9M","","m9#5"],["1P 3m 5A 7m 9M 11P","","m11A"],["1P 3m 6m 9m","","mb6b9"],["1P 2M 3m 5d 7m","","m9b5"],["1P 4P 5A 7M","","M7#5sus4"],["1P 4P 5A 7M 9M","","M9#5sus4"],["1P 4P 5A 7m","","7#5sus4"],["1P 4P 5P 7M","","M7sus4"],["1P 4P 5P 7M 9M","","M9sus4"],["1P 4P 5P 7m 9M","","9sus4 9sus"],["1P 4P 5P 7m 9M 13M","","13sus4 13sus"],["1P 4P 5P 7m 9m 13m","","7sus4b9b13 7b9b13sus4"],["1P 4P 7m 10m","","4 quartal"],["1P 5P 7m 9m 11P","","11b9"]],km=Om;({...pe});var Wa=[],tn={};function _m(e,t,n){const r=Im(e),i={...Pe(e),name:n||"",quality:r,intervals:e,aliases:t};Wa.push(i),i.name&&(tn[i.name]=i),tn[i.setNum]=i,tn[i.chroma]=i,i.aliases.forEach(c=>Rm(i,c))}function Rm(e,t){tn[t]=e}function Im(e){const t=n=>e.indexOf(n)!==-1;return t("5A")?"Augmented":t("3M")?"Major":t("5d")?"Diminished":t("3m")?"Minor":"Unknown"}km.forEach(([e,t,n])=>_m(e.split(" "),n.split(" "),t));Wa.sort((e,t)=>e.setNum-t.setNum);function Fm(e){const[t,n,r,i]=br(e);return t===""?Qn("",e):t==="A"&&i==="ug"?Qn("","aug"):Qn(t+n,r+i)}function Qn(e,t){const n=t.split("/");if(n.length===1)return[e,n[0],""];const[r,i,c,d]=br(n[1]);return r!==""&&c===""&&d===""?[e,n[0],r+i]:[e,t,""]}function Dm(e,t){return t.map(Ot).map(r=>fn(e,un(r))+r.chordType)}function Gm(e,t){return t.map(n=>{const[r,i]=Fm(n),c=tc(e,r);return Ot(un(c)).name+i})}var zm={fromRomanNumerals:Dm,toRomanNumerals:Gm};Object.freeze({empty:!0,name:"",num:NaN,q:"",type:"",step:NaN,alt:NaN,dir:NaN,simple:NaN,semitones:NaN,chroma:NaN,coord:[],oct:NaN});var Bm=[["1P 3M 5P","major","M ^  maj"],["1P 3M 5P 7M","major seventh","maj7 \u0394 ma7 M7 Maj7 ^7"],["1P 3M 5P 7M 9M","major ninth","maj9 \u03949 ^9"],["1P 3M 5P 7M 9M 13M","major thirteenth","maj13 Maj13 ^13"],["1P 3M 5P 6M","sixth","6 add6 add13 M6"],["1P 3M 5P 6M 9M","sixth added ninth","6add9 6/9 69 M69"],["1P 3M 6m 7M","major seventh flat sixth","M7b6 ^7b6"],["1P 3M 5P 7M 11A","major seventh sharp eleventh","maj#4 \u0394#4 \u0394#11 M7#11 ^7#11 maj7#11"],["1P 3m 5P","minor","m min -"],["1P 3m 5P 7m","minor seventh","m7 min7 mi7 -7"],["1P 3m 5P 7M","minor/major seventh","m/ma7 m/maj7 mM7 mMaj7 m/M7 -\u03947 m\u0394 -^7 -maj7"],["1P 3m 5P 6M","minor sixth","m6 -6"],["1P 3m 5P 7m 9M","minor ninth","m9 -9"],["1P 3m 5P 7M 9M","minor/major ninth","mM9 mMaj9 -^9"],["1P 3m 5P 7m 9M 11P","minor eleventh","m11 -11"],["1P 3m 5P 7m 9M 13M","minor thirteenth","m13 -13"],["1P 3m 5d","diminished","dim \xB0 o"],["1P 3m 5d 7d","diminished seventh","dim7 \xB07 o7"],["1P 3m 5d 7m","half-diminished","m7b5 \xF8 -7b5 h7 h"],["1P 3M 5P 7m","dominant seventh","7 dom"],["1P 3M 5P 7m 9M","dominant ninth","9"],["1P 3M 5P 7m 9M 13M","dominant thirteenth","13"],["1P 3M 5P 7m 11A","lydian dominant seventh","7#11 7#4"],["1P 3M 5P 7m 9m","dominant flat ninth","7b9"],["1P 3M 5P 7m 9A","dominant sharp ninth","7#9"],["1P 3M 7m 9m","altered","alt7"],["1P 4P 5P","suspended fourth","sus4 sus"],["1P 2M 5P","suspended second","sus2"],["1P 4P 5P 7m","suspended fourth seventh","7sus4 7sus"],["1P 5P 7m 9M 11P","eleventh","11"],["1P 4P 5P 7m 9m","suspended fourth flat ninth","b9sus phryg 7b9sus 7b9sus4"],["1P 5P","fifth","5"],["1P 3M 5A","augmented","aug + +5 ^#5"],["1P 3m 5A","minor augmented","m#5 -#5 m+"],["1P 3M 5A 7M","augmented seventh","maj7#5 maj7+5 +maj7 ^7#5"],["1P 3M 5P 7M 9M 11A","major sharp eleventh (lydian)","maj9#11 \u03949#11 ^9#11"],["1P 2M 4P 5P","","sus24 sus4add9"],["1P 3M 5A 7M 9M","","maj9#5 Maj9#5"],["1P 3M 5A 7m","","7#5 +7 7+ 7aug aug7"],["1P 3M 5A 7m 9A","","7#5#9 7#9#5 7alt"],["1P 3M 5A 7m 9M","","9#5 9+"],["1P 3M 5A 7m 9M 11A","","9#5#11"],["1P 3M 5A 7m 9m","","7#5b9 7b9#5"],["1P 3M 5A 7m 9m 11A","","7#5b9#11"],["1P 3M 5A 9A","","+add#9"],["1P 3M 5A 9M","","M#5add9 +add9"],["1P 3M 5P 6M 11A","","M6#11 M6b5 6#11 6b5"],["1P 3M 5P 6M 7M 9M","","M7add13"],["1P 3M 5P 6M 9M 11A","","69#11"],["1P 3m 5P 6M 9M","","m69 -69"],["1P 3M 5P 6m 7m","","7b6"],["1P 3M 5P 7M 9A 11A","","maj7#9#11"],["1P 3M 5P 7M 9M 11A 13M","","M13#11 maj13#11 M13+4 M13#4"],["1P 3M 5P 7M 9m","","M7b9"],["1P 3M 5P 7m 11A 13m","","7#11b13 7b5b13"],["1P 3M 5P 7m 13M","","7add6 67 7add13"],["1P 3M 5P 7m 9A 11A","","7#9#11 7b5#9 7#9b5"],["1P 3M 5P 7m 9A 11A 13M","","13#9#11"],["1P 3M 5P 7m 9A 11A 13m","","7#9#11b13"],["1P 3M 5P 7m 9A 13M","","13#9"],["1P 3M 5P 7m 9A 13m","","7#9b13"],["1P 3M 5P 7m 9M 11A","","9#11 9+4 9#4"],["1P 3M 5P 7m 9M 11A 13M","","13#11 13+4 13#4"],["1P 3M 5P 7m 9M 11A 13m","","9#11b13 9b5b13"],["1P 3M 5P 7m 9m 11A","","7b9#11 7b5b9 7b9b5"],["1P 3M 5P 7m 9m 11A 13M","","13b9#11"],["1P 3M 5P 7m 9m 11A 13m","","7b9b13#11 7b9#11b13 7b5b9b13"],["1P 3M 5P 7m 9m 13M","","13b9"],["1P 3M 5P 7m 9m 13m","","7b9b13"],["1P 3M 5P 7m 9m 9A","","7b9#9"],["1P 3M 5P 9M","","Madd9 2 add9 add2"],["1P 3M 5P 9m","","Maddb9"],["1P 3M 5d","","Mb5"],["1P 3M 5d 6M 7m 9M","","13b5"],["1P 3M 5d 7M","","M7b5"],["1P 3M 5d 7M 9M","","M9b5"],["1P 3M 5d 7m","","7b5"],["1P 3M 5d 7m 9M","","9b5"],["1P 3M 7m","","7no5"],["1P 3M 7m 13m","","7b13"],["1P 3M 7m 9M","","9no5"],["1P 3M 7m 9M 13M","","13no5"],["1P 3M 7m 9M 13m","","9b13"],["1P 3m 4P 5P","","madd4"],["1P 3m 5P 6m 7M","","mMaj7b6"],["1P 3m 5P 6m 7M 9M","","mMaj9b6"],["1P 3m 5P 7m 11P","","m7add11 m7add4"],["1P 3m 5P 9M","","madd9"],["1P 3m 5d 6M 7M","","o7M7"],["1P 3m 5d 7M","","oM7"],["1P 3m 6m 7M","","mb6M7"],["1P 3m 6m 7m","","m7#5"],["1P 3m 6m 7m 9M","","m9#5"],["1P 3m 5A 7m 9M 11P","","m11A"],["1P 3m 6m 9m","","mb6b9"],["1P 2M 3m 5d 7m","","m9b5"],["1P 4P 5A 7M","","M7#5sus4"],["1P 4P 5A 7M 9M","","M9#5sus4"],["1P 4P 5A 7m","","7#5sus4"],["1P 4P 5P 7M","","M7sus4"],["1P 4P 5P 7M 9M","","M9sus4"],["1P 4P 5P 7m 9M","","9sus4 9sus"],["1P 4P 5P 7m 9M 13M","","13sus4 13sus"],["1P 4P 5P 7m 9m 13m","","7sus4b9b13 7b9b13sus4"],["1P 4P 7m 10m","","4 quartal"],["1P 5P 7m 9m 11P","","11b9"]],qm=Bm;({...pe});var Xa=[],nn={};function Hm(e,t,n){const r=Um(e),i={...Pe(e),name:n||"",quality:r,intervals:e,aliases:t};Xa.push(i),i.name&&(nn[i.name]=i),nn[i.setNum]=i,nn[i.chroma]=i,i.aliases.forEach(c=>Vm(i,c))}function Vm(e,t){nn[t]=e}function Um(e){const t=n=>e.indexOf(n)!==-1;return t("5A")?"Augmented":t("3M")?"Major":t("5d")?"Diminished":t("3m")?"Minor":"Unknown"}qm.forEach(([e,t,n])=>Hm(e.split(" "),n.split(" "),t));Xa.sort((e,t)=>e.setNum-t.setNum);const Jm={seed:0,noteLength:32,partCount:4,drumPartRatio:.5},D=new fr;let Ya=1;function Km(e){Ya=e}function Qm(e){const t={...Jm,...e};D.setSeed(Ya+t.seed);const n=e1(t.noteLength);return ae(t.partCount,()=>D.get()<t.drumPartRatio?Ym(t.noteLength):D.get()<.5?Wm(t.noteLength,n):Xm(t.noteLength,n))}function Wm(e,t){const n=D.select(["tone","synth"]),r=32,i=16;let c=`@${n}@s${D.getInt(999999999)} v${r} l${i} `;const d=Lr(e,4,8,3);let h=D.getInt(-1,1),M=-1;for(let y=0;y<e;y++){if(D.get()<.1&&(h+=D.getInt(-1,2)),!d[y]){c+="r";continue}const A=t[y][D.getInt(4)];let N=Xi(Number.parseFloat(A.charAt(A.length-1))+h,2,7);const b=A.substring(0,A.length-1).replace("#","+").replace("b","-").toLowerCase();N!==M&&(c+=` o${N}`,M=N),c+=b}return c}function Xm(e,t){const n=D.select(["tone","synth","select"]),r=D.get()<.3,i=r?24:30,c=16;let d=`@${n}@s${D.getInt(999999999)} v${i} l${c} `;const h=D.select([4,8,16]),M=ae(h,()=>D.getInt(4)),y=D.select([2,4,8]),A=r?ae(e,()=>!0):Lr(e,D.select([1,1,y/2]),y,2);let N=D.getInt(-1,1);const b=D.get()<(r?.3:.8);let L=0,_=-1;for(let R=0;R<e;R++){if(b&&R%y===0&&(L=(L+1)%2),!A[R]){d+="r";continue}const B=t[R][r?M[R%h]:0];let X=Xi(Number.parseFloat(B.charAt(B.length-1))+N+L,2,7);const we=B.substring(0,B.length-1).replace("#","+").replace("b","-").toLowerCase();X!==_&&(d+=` o${X}`,_=X),d+=we}return d}function Ym(e){let i=`@${D.select(["hit","click","explosion"])}@d@s${D.getInt(999999999)} v${36} l${16} o2 `;const c=Lr(e,D.getInt(1,3),D.select([4,8]),3);for(let d=0;d<e;d++)i+=c[d]?"c":"r";return i}const Wn=[["I","IIIm","VIm"],["IV","IIm"],["V","VIIm"]],Zm=[[0,1,2],[1,2,0],[2,0]];function e1(e){const t=D.select(["C","D","Eb","F","G","A","Bb"]),n=4,r=4;let i,c,d,h;return ae(e,M=>{if(M%r===0){M===0?(c=D.getInt(Wn.length-1),i=D.select(Wn[c])):D.get()<.8-M/r%2*.5&&(c=D.select(Zm[c]),i=D.select(Wn[c]));const y=zm.fromRomanNumerals(`${t}${n}`,[i])[0];y.charAt(y.length-1)==="m"?(d="m7",h=y.substring(0,y.length-1)):(d="7",h=y)}return ju.getChord(d,h).notes})}function Lr(e,t,n,r){let i=ae(e,()=>!1);for(let c=0;c<r&&!(n>e);c++)i=t1(i,n,t),n*=2;return i}function t1(e,t,n){let r=ae(t,()=>!1);return ae(n,()=>{r[D.getInt(t)]=!0}),e.map((i,c)=>r[c%t]?!i:i)}let $t;function Er(e,t){const n={seed:0,numberOfSounds:2,volume:1,...t},r=`${e}_${JSON.stringify(n)}_${$t}`;if(Ct[r]!=null)return Pi(Ct[r]),Ct[r];let i;n.freq!=null?i=n.freq:n.pitch!=null?i=Wi(n.pitch):n.note!=null&&(i=tm.get(n.note.toUpperCase().replace("+","#").replace("-","b")).freq);let c=n.numberOfSounds,d=1,h=1;e==="synth"?d=h=.2:e==="tone"&&(d=h=.1,c=1);const M=on(e,n.seed+$t,c,n.volume,i,d,h);return ul(M),Ct[r]=M,Pi(M),M}const cr=.125;let Ct,Ze;function ur(e,t){$r();const n={volume:1,speed:1,isLooping:!0,...t};let r=0;const i=e.map(h=>hl(h));i.forEach(h=>{const M=i1(h.mml);M>r&&(r=M)});const c=i.map(h=>{const{mml:M,args:y}=h,A=a1(M,r),N=ll(A,y.isDrum,y.seed,y.type,y.volume*n.volume);return Zi(M,A,N)}),d=ea(c,r,n.speed);return Pr(d),gr(d,n.isLooping),n.isLooping&&(Ze=d),d}function $r(e){let t=e;if(t==null)if(Ze!=null)t=Ze,Ze=void 0;else return;vr(t),na(t),Ze=void 0}function mr(e){return Qm(e)}function n1(){const e=Ne.currentTime;Pl(e),ol(e)}function r1(e=1,t=void 0){mn(e),tl(t),Za()}function Za(){pl(),Ze=void 0,rn={},al(),Ct={}}function mn(e=1){$t=e,vl($t),Km($t)}function i1(e){const t=new Hi(e);for(let n of t)if(n.type==="end")return Math.floor(n.time/cr)}function a1(e,t){const n=[],r=new Hi(e);for(let i of r)if(i.type==="note"){let c=Math.floor((i.time+i.duration)/cr);c>=t&&(c-=t),n.push({pitch:i.noteNumber,quantizedStartStep:Math.floor(i.time/cr),quantizedEndStep:c})}return{notes:n}}let rn,Ve;function o1(e="0",t=2,n,r=1){Er(ia[e[0]],{seed:hr(e),numberOfSounds:t,pitch:n,volume:r})}function s1(e="0",t=69-24,n=32,r=.25,i=4,c=["laser","select","hit","hit"],d=1){eo(),Ve=yl(e,t,n,r,i,c,d),Pr(Ve),gr(Ve,!0)}function eo(){Ve!=null&&(vr(Ve),na(Ve),Ve=void 0)}function l1(e="0",t=!1,n=69-12,r=16,i=.25,c=4,d=1){const h=`${e}_${t}_${n}_${r}_${i}_${c}_${d}`;if(rn[h]==null){const M=bl(e,t,n,r,i,c,d);Pr(M),rn[h]=M}gr(rn[h])}function c1(){ra()}const u1=Object.freeze(Object.defineProperty({__proto__:null,setTempo:Ui,setQuantize:Ji,setVolume:Ki,playEmpty:Qi,resumeAudioContext:rl,startAudio:nl,playSoundEffect:Er,playMml:ur,stopMml:$r,generateMml:mr,update:n1,init:r1,reset:Za,setSeed:mn,play:o1,playBgm:s1,stopBgm:eo,playJingle:l1,stopJingles:c1},Symbol.toStringTag,{value:"Module"}));(function(e,t){function n(s,a=0,l=1){return Math.max(a,Math.min(s,l))}function r(s,a,l){const m=l-a,f=s-a;if(f>=0)return f%m+a;{let P=m+f%m+a;return P>=l&&(P-=m),P}}function i(s,a,l){return a<=s&&s<l}function c(s){return[...Array(s).keys()]}function d(s,a){return c(s).map(l=>a(l))}function h(s,a){let l=[];for(let m=0,f=0;m<s.length;f++)a(s[m],f)?(l.push(s[m]),s.splice(m,1)):m++;return l}function M(s){return[...s].reduce((a,[l,m])=>(a[l]=m,a),{})}function y(s){return Object.keys(s).map(a=>[a,s[a]])}function A(s,a){return String.fromCharCode(s.charCodeAt(0)+a)}function N(s){return s.x!=null&&s.y!=null}class b{constructor(a,l){this.x=0,this.y=0,this.set(a,l)}set(a=0,l=0){return N(a)?(this.x=a.x,this.y=a.y,this):(this.x=a,this.y=l,this)}add(a,l){return N(a)?(this.x+=a.x,this.y+=a.y,this):(this.x+=a,this.y+=l,this)}sub(a,l){return N(a)?(this.x-=a.x,this.y-=a.y,this):(this.x-=a,this.y-=l,this)}mul(a){return this.x*=a,this.y*=a,this}div(a){return this.x/=a,this.y/=a,this}clamp(a,l,m,f){return this.x=n(this.x,a,l),this.y=n(this.y,m,f),this}wrap(a,l,m,f){return this.x=r(this.x,a,l),this.y=r(this.y,m,f),this}addWithAngle(a,l){return this.x+=Math.cos(a)*l,this.y+=Math.sin(a)*l,this}swapXy(){const a=this.x;return this.x=this.y,this.y=a,this}normalize(){return this.div(this.length),this}rotate(a){if(a===0)return this;const l=this.x;return this.x=l*Math.cos(a)-this.y*Math.sin(a),this.y=l*Math.sin(a)+this.y*Math.cos(a),this}angleTo(a,l){return N(a)?Math.atan2(a.y-this.y,a.x-this.x):Math.atan2(l-this.y,a-this.x)}distanceTo(a,l){let m,f;return N(a)?(m=a.x-this.x,f=a.y-this.y):(m=a-this.x,f=l-this.y),Math.sqrt(m*m+f*f)}isInRect(a,l,m,f){return i(this.x,a,a+m)&&i(this.y,l,l+f)}equals(a){return this.x===a.x&&this.y===a.y}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}get length(){return Math.sqrt(this.x*this.x+this.y*this.y)}get angle(){return Math.atan2(this.y,this.x)}}const L=["transparent","white","red","green","yellow","blue","purple","cyan","black","light_red","light_green","light_yellow","light_blue","light_purple","light_cyan","light_black"],_="twrgybpclRGYBPCL";let R;const B=[15658734,15277667,5025616,16761095,4149685,10233776,240116,6381921];function X(s){const[a,l,m]=we(0,s);if(R=M(L.map((f,P)=>{if(P<1)return[f,{r:0,g:0,b:0,a:0}];if(P<9){const[E,I,F]=we(P-1,s);return[f,{r:E,g:I,b:F,a:1}]}const[S,w,O]=we(P-9+1,s);return[f,{r:Math.floor(s?S*.5:a-(a-S)*.5),g:Math.floor(s?w*.5:m-(m-w)*.5),b:Math.floor(s?O*.5:l-(l-O)*.5),a:1}]})),s){const f=R.blue;R.white={r:Math.floor(f.r*.15),g:Math.floor(f.g*.15),b:Math.floor(f.b*.15),a:1}}}function we(s,a){a&&(s===0?s=7:s===7&&(s=0));const l=B[s];return[(l&16711680)>>16,(l&65280)>>8,l&255]}function xe(s,a=1){const l=R[s];return Math.floor(l.r*a)<<16|Math.floor(l.g*a)<<8|Math.floor(l.b*a)}function Te(s,a=1){const l=R[s],m=Math.floor(l.r*a),f=Math.floor(l.g*a),P=Math.floor(l.b*a);return l.a<1?`rgba(${m},${f},${P},${l.a})`:`rgb(${m},${f},${P})`}const _t=[`
l
l
l

l
`,`
l l
l l



`,`
 l l
lllll
 l l
lllll
 l l
`,`
 lll
l l
 lll
  l l
 lll
`,`
l   l
l  l
  l
 l  l
l   l
`,`
 l
l l
 ll l
l  l
 ll l
`,`
l
l



`,`
 l
l
l
l
 l
`,`
l
 l
 l
 l
l
`,`
  l
l l l
 lll
l l l
  l
`,`
  l
  l
lllll
  l
  l
`,`



 l
l
`,`


lllll


`,`




l
`,`
    l
   l
  l
 l
l
`,`
 lll
l  ll
l l l
ll  l
 lll
`,`
 ll
l l
  l
  l
lllll
`,`
 lll
l   l
  ll
 l
lllll
`,`
 lll
l   l
  ll
l   l
 lll
`,`
  ll
 l l
l  l
lllll
   l
`,`
lllll
l
llll
    l
llll
`,`
 lll
l
llll
l   l
 lll
`,`
lllll
l   l
   l
  l
 l
`,`
 lll
l   l
 lll
l   l
 lll
`,`
 lll
l   l
 llll
    l
 lll
`,`

l

l

`,`

 l

 l
l
`,`
   ll
 ll
l
 ll
   ll
`,`

lllll

lllll

`,`
ll
  ll
    l
  ll
ll
`,`
 lll
l   l
  ll

  l
`,`
 lll
l   l
l lll
l
 lll
`,`
 lll
l   l
lllll
l   l
l   l
`,`
llll
l   l
llll
l   l
llll
`,`
 lll
l   l
l
l   l
 lll
`,`
llll
l   l
l   l
l   l
llll
`,`
lllll
l
llll
l
lllll
`,`
lllll
l
llll
l
l
`,`
 lll
l
l  ll
l   l
 lll
`,`
l   l
l   l
lllll
l   l
l   l
`,`
lllll
  l
  l
  l
lllll
`,`
  lll
   l
   l
l  l
 ll
`,`
l   l
l  l
lll
l  l
l   l
`,`
l
l
l
l
lllll
`,`
l   l
ll ll
l l l
l   l
l   l
`,`
l   l
ll  l
l l l
l  ll
l   l
`,`
 lll
l   l
l   l
l   l
 lll
`,`
llll
l   l
llll
l
l
`,`
 lll
l   l
l   l
l  ll
 llll
`,`
llll
l   l
llll
l   l
l   l
`,`
 llll
l
 lll
    l
llll
`,`
lllll
  l
  l
  l
  l
`,`
l   l
l   l
l   l
l   l
 lll
`,`
l   l
l   l
l   l
 l l
  l
`,`
l   l
l l l
l l l
l l l
 l l
`,`
l   l
 l l
  l
 l l
l   l
`,`
l   l
 l l
  l
  l
  l
`,`
lllll
   l
  l
 l
lllll
`,`
  ll
  l
  l
  l
  ll
`,`
l
 l
  l
   l
    l
`,`
 ll
  l
  l
  l
 ll
`,`
  l
 l l



`,`




lllll
`,`
 l
  l



`,`

 lll
l  l
l  l
 lll
`,`
l
l
lll
l  l
lll
`,`

 lll
l  
l
 lll
`,`
   l
   l
 lll
l  l
 lll
`,`

 ll
l ll
ll
 ll
`,`
  l
 l 
lll
 l
 l
`,`
 ll
l  l
 lll
   l
 ll
`,`
l
l
ll
l l
l l
`,`

l

l
l
`,`
 l

 l
 l
l
`,`
l
l
l l
ll
l l
`,`
ll
 l
 l
 l
lll
`,`

llll
l l l
l l l
l   l
`,`

lll
l  l
l  l
l  l
`,`

 ll
l  l
l  l
 ll
`,`

lll
l  l
lll
l
`,`

 lll
l  l
 lll
   l
`,`

l ll
ll
l
l
`,`

 lll
ll
  ll
lll
`,`

 l
lll
 l
  l
`,`

l  l
l  l
l  l
 lll
`,`

l  l
l  l
 ll
 ll
`,`

l   l
l l l
l l l
 l l
`,`

l  l
 ll
 ll
l  l
`,`

l  l
 ll
 l
l
`,`

llll
  l
 l
llll
`,`
 ll
 l
l
 l
 ll
`,`
l
l
l
l
l
`,`
ll
 l
  l
 l
ll
`,`

 l
l l l
   l

`];let ce,Je;function pn(){ce=[],Je=[]}function Oe(){ce=ce.concat(Je),Je=[]}function g(s){let a={isColliding:{rect:{},text:{},char:{}}};return ce.forEach(l=>{ke(s,l)&&(a=Object.assign(Object.assign(Object.assign({},a),Ke(l.collision.isColliding.rect)),{isColliding:{rect:Object.assign(Object.assign({},a.isColliding.rect),l.collision.isColliding.rect),text:Object.assign(Object.assign({},a.isColliding.text),l.collision.isColliding.text),char:Object.assign(Object.assign({},a.isColliding.char),l.collision.isColliding.char)}}))}),a}function ke(s,a){const l=a.pos.x-s.pos.x,m=a.pos.y-s.pos.y;return-a.size.x<l&&l<s.size.x&&-a.size.y<m&&m<s.size.y}function Ke(s){if(s==null)return{};const a={transparent:"tr",white:"wh",red:"rd",green:"gr",yellow:"yl",blue:"bl",purple:"pr",cyan:"cy",black:"lc"};let l={};return y(s).forEach(([m,f])=>{const P=a[m];f&&P!=null&&(l[P]=!0)}),l}function _e(s,a,l,m){return rt(!1,s,a,l,m)}function Pn(s,a,l,m){return rt(!0,s,a,l,m)}function rt(s,a,l,m,f){if(typeof l=="number"){if(typeof m=="number")return V(a,l,m,Object.assign({isCharacter:s,isCheckingCollision:!0,color:Z},f));throw"invalid params"}else return V(a,l.x,l.y,Object.assign({isCharacter:s,isCheckingCollision:!0,color:Z},m))}const oe=6,o=1,u=oe*o;let p,v,x,j=!1,C,$;const T={color:"black",backgroundColor:"transparent",rotation:0,mirror:{x:1,y:1},scale:{x:1,y:1},isCharacter:!1,isCheckingCollision:!1};function q(){C=document.createElement("canvas"),C.width=C.height=u,$=C.getContext("2d"),p=_t.map((s,a)=>Object.assign(Object.assign({},at(s)),{hitBox:Ce(String.fromCharCode(33+a),!1)})),v=_t.map((s,a)=>Object.assign(Object.assign({},at(s)),{hitBox:Ce(String.fromCharCode(33+a),!0)})),x={}}function H(s,a){const l=a.charCodeAt(0)-33;s.forEach((m,f)=>{v[l+f]=Object.assign(Object.assign({},at(m)),{hitBox:Ce(String.fromCharCode(33+l+f),!0)})})}function Y(){j=!0}function V(s,a,l,m={}){const f=Rt(m);a-=u/2*f.scale.x,l-=u/2*f.scale.y;const P=Math.floor(a);let S=s,w=P,O=Math.floor(l),E={isColliding:{rect:{},text:{},char:{}}};for(let I=0;I<S.length;I++){const F=S[I];if(F===`
`){w=P,O+=u*f.scale.y;continue}const K=fe(F,w,O,f);f.isCheckingCollision&&(E={isColliding:{rect:Object.assign(Object.assign({},E.isColliding.rect),K.isColliding.rect),text:Object.assign(Object.assign({},E.isColliding.text),K.isColliding.text),char:Object.assign(Object.assign({},E.isColliding.char),K.isColliding.char)}}),w+=u*f.scale.x}return E}function fe(s,a,l,m){const f=s.charCodeAt(0);if(f<32||f>126)return{isColliding:{rect:{},text:{},char:{}}};const P=Rt(m);if(P.backgroundColor!=="transparent"&&(vn(),Qe(P.backgroundColor),ut(a,l,u*P.scale.x,u*P.scale.y),yn()),f<=32)return{isColliding:{rect:{},text:{},char:{}}};const S=f-33,w=P.isCharacter?v[S]:p[S],O=r(P.rotation,0,4);if(P.color==="black"&&O===0&&P.mirror.x===1&&P.mirror.y===1)return it(w,a,l,P.scale,P.isCheckingCollision,!0);const E=JSON.stringify({c:s,options:P}),I=x[E];if(I!=null)return it(I,a,l,P.scale,P.isCheckingCollision,P.color!=="transparent");$.clearRect(0,0,u,u),O===0&&P.mirror.x===1&&P.mirror.y===1?$.drawImage(w.image,0,0):($.save(),$.translate(u/2,u/2),$.rotate(Math.PI/2*O),(P.mirror.x===-1||P.mirror.y===-1)&&$.scale(P.mirror.x,P.mirror.y),$.drawImage(w.image,-u/2,-u/2),$.restore()),P.color!=="black"&&($.globalCompositeOperation="source-in",$.fillStyle=Te(P.color==="transparent"?"black":P.color),$.fillRect(0,0,u,u),$.globalCompositeOperation="source-over");const F=Ce(s,P.isCharacter);let K;if(j||G.isUsingPixi){const me=document.createElement("img");me.src=C.toDataURL(),G.isUsingPixi&&(K=t.Texture.from(me)),j&&(x[E]={image:me,texture:K,hitBox:F})}return it({image:C,texture:K,hitBox:F},a,l,P.scale,P.isCheckingCollision,P.color!=="transparent")}function it(s,a,l,m,f,P){if(P&&(m.x===1&&m.y===1?_r(s,a,l):_r(s,a,l,u*m.x,u*m.y)),!f)return;const S={pos:{x:a+s.hitBox.pos.x,y:l+s.hitBox.pos.y},size:{x:s.hitBox.size.x*m.x,y:s.hitBox.size.y*m.y},collision:s.hitBox.collision},w=g(S);return P&&ce.push(S),w}function at(s,a=!0){$.clearRect(0,0,u,u);let l=s.split(`
`);a&&(l=l.slice(1,l.length-1));let m=0;l.forEach(O=>{m=Math.max(O.length,m)});const f=Math.max(Math.ceil((oe-m)/2),0),P=l.length,S=Math.max(Math.ceil((oe-P)/2),0);l.forEach((O,E)=>{if(!(E+S>=oe))for(let I=0;I<oe-f;I++){const F=O.charAt(I);let K=_.indexOf(F);F!==""&&K>=1&&($.fillStyle=Te(L[K]),$.fillRect((I+f)*o,(E+S)*o,o,o))}});const w=document.createElement("img");return w.src=C.toDataURL(),G.isUsingPixi?{image:w,texture:t.Texture.from(w)}:{image:w}}function Ce(s,a){const l={pos:new b(u,u),size:new b,collision:{isColliding:{char:{},text:{}}}};a?l.collision.isColliding.char[s]=!0:l.collision.isColliding.text[s]=!0;const m=$.getImageData(0,0,u,u).data;let f=0;for(let P=0;P<u;P++)for(let S=0;S<u;S++)m[f+3]>0&&(S<l.pos.x&&(l.pos.x=S),P<l.pos.y&&(l.pos.y=P)),f+=4;f=0;for(let P=0;P<u;P++)for(let S=0;S<u;S++)m[f+3]>0&&(S>l.pos.x+l.size.x-1&&(l.size.x=S-l.pos.x+1),P>l.pos.y+l.size.y-1&&(l.size.y=P-l.pos.y+1)),f+=4;return l}function Rt(s){let a=Object.assign(Object.assign({},T),s);return s.scale!=null&&(a.scale=Object.assign(Object.assign({},T.scale),s.scale)),s.mirror!=null&&(a.mirror=Object.assign(Object.assign({},T.mirror),s.mirror)),a}const to=`
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float width;
uniform float height;

float gridValue(vec2 uv, float res) {
  vec2 grid = fract(uv * res);
  return (step(res, grid.x) * step(res, grid.y));
}

void main(void) {
  vec4 color = texture2D(uSampler, vTextureCoord);  
  vec2 grid_uv = vTextureCoord.xy * vec2(width, height);
  float v = gridValue(grid_uv, 0.2);
  gl_FragColor.rgba = color * v;
}
`;function no(s,a){return new t.Filter(void 0,to,{width:s,height:a})}const Re=new b;let Q,J=new b,ge,z;const Tr=5;document.createElement("img");let U,ot,st=1,gn="black",Z,Or,Ie=!1,G,kr;function ro(s,a,l,m,f,P,S){Re.set(s),G=S,gn=l;const w=`
-webkit-touch-callout: none;
-webkit-tap-highlight-color: ${a};
-webkit-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
background: ${a};
color: #888;
`,O=`
position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
`,E=`
image-rendering: -moz-crisp-edges;
image-rendering: -webkit-optimize-contrast;
image-rendering: -o-crisp-edges;
image-rendering: pixelated;
`;if(document.body.style.cssText=w,J.set(Re),G.isUsingPixi){J.mul(Tr);const F=new t.Application({width:J.x,height:J.y});if(Q=F.view,z=new t.Graphics,z.scale.x=z.scale.y=Tr,t.settings.SCALE_MODE=t.SCALE_MODES.NEAREST,F.stage.addChild(z),z.filters=[],G.name==="crt"&&z.filters.push(kr=new t.filters.CRTFilter({vignettingAlpha:.7})),G.name==="pixel"&&z.filters.push(no(J.x,J.y)),G.name==="pixel"||G.name==="shapeDark"){const K=new t.filters.AdvancedBloomFilter({threshold:.1,bloomScale:G.name==="pixel"?1.5:1,brightness:G.name==="pixel"?1.5:1,blur:8});z.filters.push(K)}z.lineStyle(0),Q.style.cssText=O}else Q=document.createElement("canvas"),Q.width=J.x,Q.height=J.y,ge=Q.getContext("2d"),ge.imageSmoothingEnabled=!1,Q.style.cssText=O+E;document.body.appendChild(Q);const I=()=>{const K=innerWidth/innerHeight,me=J.x/J.y,Nt=K<me,Ee=Nt?.95*innerWidth:.95*innerHeight*me,Xt=Nt?.95*innerWidth/me:.95*innerHeight;Q.style.width=`${Ee}px`,Q.style.height=`${Xt}px`};if(window.addEventListener("resize",I),I(),m){U=document.createElement("canvas");let F;f?(U.width=J.x,U.height=J.y,F=P):(J.x<=J.y*2?(U.width=J.y*2,U.height=J.y):(U.width=J.x,U.height=J.x/2),U.width>400&&(st=400/U.width,U.width=400,U.height*=st),F=Math.round(400/U.width)),ot=U.getContext("2d"),ot.fillStyle=a,gcc.setOptions({scale:F,capturingFps:60,isSmoothingEnabled:!1})}}function It(){if(G.isUsingPixi){z.clear(),Ie=!1,lt(xe(gn,G.isDarkColor?.15:1)),z.drawRect(0,0,Re.x,Re.y),ct(),Ie=!1;return}ge.fillStyle=Te(gn,G.isDarkColor?.15:1),ge.fillRect(0,0,Re.x,Re.y),ge.fillStyle=Te(Z)}function Qe(s){if(s===Z){G.isUsingPixi&&!Ie&&lt(xe(Z));return}if(Z=s,G.isUsingPixi){Ie&&z.endFill(),lt(xe(Z));return}ge.fillStyle=Te(s)}function lt(s){ct(),z.beginFill(s),Ie=!0}function ct(){Ie&&(z.endFill(),Ie=!1)}function vn(){Or=Z}function yn(){Qe(Or)}function ut(s,a,l,m){if(G.isUsingPixi){G.name==="shape"||G.name==="shapeDark"?z.drawRoundedRect(s,a,l,m,2):z.drawRect(s,a,l,m);return}ge.fillRect(s,a,l,m)}function io(s,a,l,m,f){const P=xe(Z);lt(P),z.drawCircle(s,a,f*.5),z.drawCircle(l,m,f*.5),ct(),z.lineStyle(f,P),z.moveTo(s,a),z.lineTo(l,m),z.lineStyle(0)}function _r(s,a,l,m,f){if(G.isUsingPixi){ct(),z.beginTextureFill({texture:s.texture,matrix:new t.Matrix().translate(a,l)}),z.drawRect(a,l,m==null?u:m,f==null?u:f),lt(xe(Z));return}m==null?ge.drawImage(s.image,a,l):ge.drawImage(s.image,a,l,m,f)}function ao(){kr.time+=.2}function oo(){if(ot.fillRect(0,0,U.width,U.height),st===1)ot.drawImage(Q,(U.width-Q.width)/2,(U.height-Q.height)/2);else{const s=Q.width*st,a=Q.height*st;ot.drawImage(Q,(U.width-s)/2,(U.height-a)/2,s,a)}gcc.capture(U)}let We=!1,Ft=!1,bn=!1;const Rr=["Escape","Digit0","Digit1","Digit2","Digit3","Digit4","Digit5","Digit6","Digit7","Digit8","Digit9","Minus","Equal","Backspace","Tab","KeyQ","KeyW","KeyE","KeyR","KeyT","KeyY","KeyU","KeyI","KeyO","KeyP","BracketLeft","BracketRight","Enter","ControlLeft","KeyA","KeyS","KeyD","KeyF","KeyG","KeyH","KeyJ","KeyK","KeyL","Semicolon","Quote","Backquote","ShiftLeft","Backslash","KeyZ","KeyX","KeyC","KeyV","KeyB","KeyN","KeyM","Comma","Period","Slash","ShiftRight","NumpadMultiply","AltLeft","Space","CapsLock","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","Pause","ScrollLock","Numpad7","Numpad8","Numpad9","NumpadSubtract","Numpad4","Numpad5","Numpad6","NumpadAdd","Numpad1","Numpad2","Numpad3","Numpad0","NumpadDecimal","IntlBackslash","F11","F12","F13","F14","F15","F16","F17","F18","F19","F20","F21","F22","F23","F24","IntlYen","Undo","Paste","MediaTrackPrevious","Cut","Copy","MediaTrackNext","NumpadEnter","ControlRight","LaunchMail","AudioVolumeMute","MediaPlayPause","MediaStop","Eject","AudioVolumeDown","AudioVolumeUp","BrowserHome","NumpadDivide","PrintScreen","AltRight","Help","NumLock","Pause","Home","ArrowUp","PageUp","ArrowLeft","ArrowRight","End","ArrowDown","PageDown","Insert","Delete","OSLeft","OSRight","ContextMenu","BrowserSearch","BrowserFavorites","BrowserRefresh","BrowserStop","BrowserForward","BrowserBack"];let Sn;const so={onKeyDown:void 0};let An,Nn=!1,wn=!1,xn=!1,Cn={},jn={},Ln={};function Ir(s){An=Object.assign(Object.assign({},so),s),Sn=M(Rr.map(a=>[a,{isPressed:!1,isJustPressed:!1,isJustReleased:!1}])),document.addEventListener("keydown",a=>{Nn=wn=!0,Cn[a.code]=jn[a.code]=!0,An.onKeyDown!=null&&An.onKeyDown(),(a.code==="AltLeft"||a.code==="AltRight"||a.code==="ArrowRight"||a.code==="ArrowDown"||a.code==="ArrowLeft"||a.code==="ArrowUp")&&a.preventDefault()}),document.addEventListener("keyup",a=>{Nn=!1,xn=!0,Cn[a.code]=!1,Ln[a.code]=!0})}function Fr(){Ft=!We&&wn,bn=We&&xn,wn=xn=!1,We=Nn,y(Sn).forEach(([s,a])=>{a.isJustPressed=!a.isPressed&&jn[s],a.isJustReleased=a.isPressed&&Ln[s],a.isPressed=!!Cn[s]}),jn={},Ln={}}function Dr(){Ft=!1,We=!0}var lo=Object.freeze({__proto__:null,get isPressed(){return We},get isJustPressed(){return Ft},get isJustReleased(){return bn},codes:Rr,get code(){return Sn},init:Ir,update:Fr,clearJustPressed:Dr});class Dt{constructor(a=null){this.setSeed(a)}get(a=1,l){return l==null&&(l=a,a=0),this.next()/4294967295*(l-a)+a}getInt(a,l){l==null&&(l=a,a=0);const m=Math.floor(a),f=Math.floor(l);return f===m?m:this.next()%(f-m)+m}getPlusOrMinus(){return this.getInt(2)*2-1}select(a){return a[this.getInt(a.length)]}setSeed(a,l=123456789,m=362436069,f=521288629,P=32){this.w=a!=null?a>>>0:Math.floor(Math.random()*4294967295)>>>0,this.x=l>>>0,this.y=m>>>0,this.z=f>>>0;for(let S=0;S<P;S++)this.next();return this}getState(){return{x:this.x,y:this.y,z:this.z,w:this.w}}next(){const a=this.x^this.x<<11;return this.x=this.y,this.y=this.z,this.z=this.w,this.w=(this.w^this.w>>>19^(a^a>>>8))>>>0,this.w}}const mt=new b;let ve=!1,Xe=!1,dt=!1,co={isDebugMode:!1,anchor:new b,padding:new b,onPointerDownOrUp:void 0},ee,ue,W;const ft=new Dt,Fe=new b,ye=new b;let ht=!1,Mt=new b,En=!1,$n=!1,Tn=!1;function Gr(s,a,l){W=Object.assign(Object.assign({},co),l),ee=s,ue=new b(a.x+W.padding.x*2,a.y+W.padding.y*2),Mt.set(ee.offsetLeft+ee.clientWidth*(.5-W.anchor.x),ee.offsetTop+ee.clientWidth*(.5-W.anchor.y)),W.isDebugMode&&Fe.set(ee.offsetLeft+ee.clientWidth*(.5-W.anchor.x),ee.offsetTop+ee.clientWidth*(.5-W.anchor.y)),document.addEventListener("mousedown",m=>{qr(m.pageX,m.pageY)}),document.addEventListener("touchstart",m=>{qr(m.touches[0].pageX,m.touches[0].pageY)}),document.addEventListener("mousemove",m=>{Hr(m.pageX,m.pageY)}),document.addEventListener("touchmove",m=>{m.preventDefault(),Hr(m.touches[0].pageX,m.touches[0].pageY)},{passive:!1}),document.addEventListener("mouseup",m=>{Vr()}),document.addEventListener("touchend",m=>{m.preventDefault(),m.target.click(),Vr()},{passive:!1})}function zr(){uo(Mt.x,Mt.y,mt),W.isDebugMode&&!mt.isInRect(0,0,ue.x,ue.y)?(mo(),mt.set(Fe),Xe=!ve&&ht,dt=ve&&!ht,ve=ht):(Xe=!ve&&$n,dt=ve&&Tn,ve=En),$n=Tn=!1}function Br(){Xe=!1,ve=!0}function uo(s,a,l){ee!=null&&(l.x=Math.round(((s-ee.offsetLeft)/ee.clientWidth+W.anchor.x)*ue.x-W.padding.x),l.y=Math.round(((a-ee.offsetTop)/ee.clientHeight+W.anchor.y)*ue.y-W.padding.y))}function mo(){ye.length>0?(Fe.add(ye),!i(Fe.x,-ue.x*.1,ue.x*1.1)&&Fe.x*ye.x>0&&(ye.x*=-1),!i(Fe.y,-ue.y*.1,ue.y*1.1)&&Fe.y*ye.y>0&&(ye.y*=-1),ft.get()<.05&&ye.set(0)):ft.get()<.1&&(ye.set(0),ye.addWithAngle(ft.get(Math.PI*2),(ue.x+ue.y)*ft.get(.01,.03))),ft.get()<.05&&(ht=!ht)}function qr(s,a){Mt.set(s,a),En=$n=!0,W.onPointerDownOrUp!=null&&W.onPointerDownOrUp()}function Hr(s,a){Mt.set(s,a)}function Vr(s){En=!1,Tn=!0,W.onPointerDownOrUp!=null&&W.onPointerDownOrUp()}var fo=Object.freeze({__proto__:null,pos:mt,get isPressed(){return ve},get isJustPressed(){return Xe},get isJustReleased(){return dt},init:Gr,update:zr,clearJustPressed:Br});let je=new b,be=!1,he=!1,Le=!1;function Ur(s){Ir({onKeyDown:s}),Gr(Q,Re,{onPointerDownOrUp:s,anchor:new b(.5,.5)})}function Jr(){Fr(),zr(),je=mt,be=We||ve,he=Ft||Xe,Le=bn||dt}function Kr(){Dr(),Br()}function pt(s){je.set(s.pos),be=s.isPressed,he=s.isJustPressed,Le=s.isJustReleased}var ho=Object.freeze({__proto__:null,get pos(){return je},get isPressed(){return be},get isJustPressed(){return he},get isJustReleased(){return Le},init:Ur,update:Jr,clearJustPressed:Kr,set:pt});let Qr,Wr;const Xr=68,On=1e3/Xr;let Pt=0;const Mo={viewSize:{x:126,y:126},bodyBackground:"#111",viewBackground:"black",isUsingVirtualPad:!0,isFourWaysStick:!1,isCapturing:!1,isCapturingGameCanvasOnly:!1,isSoundEnabled:!0,captureCanvasScale:1,theme:{name:"simple",isUsingPixi:!1,isDarkColor:!1}};let se,Yr=10;function po(s,a,l){Qr=s,Wr=a,se=Object.assign(Object.assign({},Mo),l),X(se.theme.isDarkColor),ro(se.viewSize,se.bodyBackground,se.viewBackground,se.isCapturing,se.isCapturingGameCanvasOnly,se.captureCanvasScale,se.theme),Ur(se.isSoundEnabled?sss.playEmpty:()=>{}),q(),Qr(),Zr()}function Zr(){requestAnimationFrame(Zr);const s=window.performance.now();s<Pt-Xr/12||(Pt+=On,(Pt<s||Pt>s+On*2)&&(Pt=s+On),se.isSoundEnabled&&sss.update(),Jr(),Wr(),se.isCapturing&&oo(),Yr--,Yr===0&&Y())}class Po{constructor(a){this.size=new b,this.size.set(a),this.letterGrid=c(this.size.x).map(()=>c(this.size.y).map(()=>{})),this.colorGrid=c(this.size.x).map(()=>c(this.size.y).map(()=>{})),this.backgroundColorGrid=c(this.size.x).map(()=>c(this.size.y).map(()=>{})),this.rotationGrid=c(this.size.x).map(()=>c(this.size.y).map(()=>{})),this.characterGrid=c(this.size.x).map(()=>c(this.size.y).map(()=>{}))}print(a,l,m,f={}){const P=Object.assign(Object.assign({},T),f);let S=Math.floor(l),w=Math.floor(m);const O=S;for(let E=0;E<a.length;E++){const I=a[E];if(I===`
`){S=O,w++;continue}if(S<0||S>=this.size.x||w<0||w>=this.size.y){S++;continue}this.letterGrid[S][w]=I,this.colorGrid[S][w]=P.color,this.backgroundColorGrid[S][w]=P.backgroundColor,this.rotationGrid[S][w]=P.rotation,this.characterGrid[S][w]=P.isCharacter,S++}}getCharAt(a,l){if(a<0||a>=this.size.x||l<0||l>=this.size.y)return;const m=Math.floor(a),f=Math.floor(l),P=this.letterGrid[m][f],S=this.colorGrid[m][f],w=this.backgroundColorGrid[m][f],O=this.rotationGrid[m][f],E=this.characterGrid[m][f];return{char:P,options:{color:S,backgroundColor:w,rotation:O,isCharacter:E}}}setCharAt(a,l,m,f){if(a<0||a>=this.size.x||l<0||l>=this.size.y)return;const P=Object.assign(Object.assign({},T),f),S=Math.floor(a),w=Math.floor(l);this.letterGrid[S][w]=m,this.colorGrid[S][w]=P.color,this.backgroundColorGrid[S][w]=P.backgroundColor,this.rotationGrid[S][w]=P.rotation,this.characterGrid[S][w]=P.isCharacter}draw(){for(let a=0;a<this.size.x;a++)for(let l=0;l<this.size.y;l++){const m=this.letterGrid[a][l];if(m==null)continue;const f=this.colorGrid[a][l],P=this.backgroundColorGrid[a][l],S=this.rotationGrid[a][l],w=this.characterGrid[a][l];fe(m,a*u,l*u,{color:f,backgroundColor:P,rotation:S,isCharacter:w})}}clear(){for(let a=0;a<this.size.x;a++)for(let l=0;l<this.size.y;l++)this.letterGrid[a][l]=this.colorGrid[a][l]=this.backgroundColorGrid[a][l]=this.rotationGrid[a][l]=this.characterGrid[a][l]=void 0}scrollUp(){for(let l=0;l<this.size.x;l++)for(let m=1;m<this.size.y;m++)this.letterGrid[l][m-1]=this.letterGrid[l][m],this.colorGrid[l][m-1]=this.colorGrid[l][m],this.backgroundColorGrid[l][m-1]=this.backgroundColorGrid[l][m],this.rotationGrid[l][m-1]=this.rotationGrid[l][m],this.characterGrid[l][m-1]=this.characterGrid[l][m];const a=this.size.y-1;for(let l=0;l<this.size.x;l++)this.letterGrid[l][a]=this.colorGrid[l][a]=this.backgroundColorGrid[l][a]=this.rotationGrid[l][a]=this.characterGrid[l][a]=void 0}getState(){return{charGrid:this.letterGrid.map(a=>[].concat(a)),colorGrid:this.colorGrid.map(a=>[].concat(a)),backgroundColorGrid:this.backgroundColorGrid.map(a=>[].concat(a)),rotationGrid:this.rotationGrid.map(a=>[].concat(a)),symbolGrid:this.characterGrid.map(a=>[].concat(a))}}setState(a){this.letterGrid=a.charGrid.map(l=>[].concat(l)),this.colorGrid=a.colorGrid.map(l=>[].concat(l)),this.backgroundColorGrid=a.backgroundColorGrid.map(l=>[].concat(l)),this.rotationGrid=a.rotationGrid.map(l=>[].concat(l)),this.characterGrid=a.symbolGrid.map(l=>[].concat(l))}}let Gt;const zt=new Dt;function kn(){Gt=[]}function ei(s,a=16,l=1,m=0,f=Math.PI*2){if(a<1){if(zt.get()>a)return;a=1}for(let P=0;P<a;P++){const S=m+zt.get(f)-f/2,w={pos:new b(s),vel:new b(l*zt.get(.5,1),0).rotate(S),color:Z,ticks:clamp(zt.get(10,20)*Math.sqrt(Math.abs(l)),10,60)};Gt.push(w)}}function Bt(){vn(),Gt=Gt.filter(s=>(s.ticks--,s.ticks<0?!1:(s.pos.add(s.vel),s.vel.mul(.98),Qe(s.color),ut(Math.floor(s.pos.x),Math.floor(s.pos.y),1,1),!0))),yn()}function _n({pos:s,size:a,text:l,isToggle:m=!1,onClick:f=()=>{}}){return{pos:s,size:a,text:l,isToggle:m,onClick:f,isPressed:!1,isSelected:!1,isHovered:!1,toggleGroup:[]}}function Rn(s){const a=vec(input.pos).sub(s.pos);s.isHovered=a.isInRect(0,0,s.size.x,s.size.y),s.isHovered&&Xe&&(s.isPressed=!0),s.isPressed&&!s.isHovered&&(s.isPressed=!1),s.isPressed&&dt&&(s.onClick(),s.isPressed=!1,s.isToggle&&(s.toggleGroup.length===0?s.isSelected=!s.isSelected:(s.toggleGroup.forEach(l=>{l.isSelected=!1}),s.isSelected=!0))),qt(s)}function qt(s){color(s.isPressed?"blue":"light_blue"),rect(s.pos.x,s.pos.y,s.size.x,s.size.y),s.isToggle&&!s.isSelected&&(color("white"),rect(s.pos.x+1,s.pos.y+1,s.size.x-2,s.size.y-2)),color(s.isHovered?"black":"blue"),text(s.text,s.pos.x+3,s.pos.y+3)}let Me,gt,De,In;function go(s){Me={randomSeed:s,inputs:[]}}function vo(s){Me.inputs.push(s)}function ti(){return Me!=null}function yo(s){gt=0,s.setSeed(Me.randomSeed)}function bo(){gt>=Me.inputs.length||(pt(Me.inputs[gt]),gt++)}function So(){De=[]}function Ao(s,a,l){De.push({randomState:l.getState(),gameState:cloneDeep(s),baseState:cloneDeep(a)})}function No(s){const a=De.pop(),l=a.randomState;return s.setSeed(l.w,l.x,l.y,l.z,0),In={pos:vec(je),isPressed:be,isJustPressed:he,isJustReleased:Le},pt(Me.inputs.pop()),a}function wo(s){const a=De[De.length-1],l=a.randomState;return s.setSeed(l.w,l.x,l.y,l.z,0),In={pos:vec(je),isPressed:be,isJustPressed:he,isJustReleased:Le},pt(Me.inputs[Me.inputs.length-1]),a}function xo(){pt(In)}function Co(){return De.length===0}function jo(){const s=gt-1;if(!(s>=Me.inputs.length))return De[s]}function Lo(s,a,l,m){return ni(!1,s,a,l,m)}function Eo(s,a,l,m){return ni(!0,s,a,l,m)}function $o(s,a,l,m,f=.5,P=.5){typeof s!="number"&&(P=f,f=m,m=l,l=a,a=s.y,s=s.x);const S=new b(l).rotate(f),w=new b(s-S.x*P,a-S.y*P);return Fn(w,S,m)}function To(s,a,l=3,m=3,f=3){const P=new b,S=new b;if(typeof s=="number")if(typeof a=="number")typeof l=="number"?(P.set(s,a),S.set(l,m)):(P.set(s,a),S.set(l),f=m);else throw"invalid params";else if(typeof a=="number")if(typeof l=="number")P.set(s),S.set(a,l),f=m;else throw"invalid params";else if(typeof l=="number")P.set(s),S.set(a),f=l;else throw"invalid params";return Fn(P,S.sub(P),f)}function Oo(s,a,l,m,f,P){let S=new b;typeof s=="number"?S.set(s,a):(S.set(s),P=f,f=m,m=l,l=a),m==null&&(m=3),f==null&&(f=0),P==null&&(P=Math.PI*2);let w,O;if(f>P?(w=P,O=f-P):(w=f,O=P-f),O=n(O,0,Math.PI*2),O<.01)return;const E=n(ceil(O*Math.sqrt(l*.25)),1,36),I=O/E;let F=w,K=new b(l).rotate(F).add(S),me=new b,Nt=new b,Ee={isColliding:{rect:{},text:{},char:{}}};for(let Xt=0;Xt<E;Xt++){F+=I,me.set(l).rotate(F).add(S),Nt.set(me).sub(K);const Yt=Fn(K,Nt,m,!0);Ee=Object.assign(Object.assign(Object.assign({},Ee),Ke(Yt.isColliding.rect)),{isColliding:{rect:Object.assign(Object.assign({},Ee.isColliding.rect),Yt.isColliding.rect),text:Object.assign(Object.assign({},Ee.isColliding.text),Yt.isColliding.text),char:Object.assign(Object.assign({},Ee.isColliding.char),Yt.isColliding.char)}}),K.set(me)}return Oe(),Ee}function ni(s,a,l,m,f){if(typeof a=="number"){if(typeof l=="number")return typeof m=="number"?f==null?Ge(s,a,l,m,m):Ge(s,a,l,m,f):Ge(s,a,l,m.x,m.y);throw"invalid params"}else if(typeof l=="number"){if(m==null)return Ge(s,a.x,a.y,l,l);if(typeof m=="number")return Ge(s,a.x,a.y,l,m);throw"invalid params"}else return Ge(s,a.x,a.y,l.x,l.y)}function Fn(s,a,l,m=!1){let f=!0;(G.name==="shape"||G.name==="shapeDark")&&(Z!=="transparent"&&io(s.x,s.y,s.x+a.x,s.y+a.y,l),f=!1);const P=Math.floor(n(l,3,10)),S=Math.abs(a.x),w=Math.abs(a.y),O=n(Math.ceil(S>w?S/P:w/P)+1,3,99);a.div(O-1);let E={isColliding:{rect:{},text:{},char:{}}};for(let I=0;I<O;I++){const F=Ge(!0,s.x,s.y,l,l,!0,f);E=Object.assign(Object.assign(Object.assign({},E),Ke(F.isColliding.rect)),{isColliding:{rect:Object.assign(Object.assign({},E.isColliding.rect),F.isColliding.rect),text:Object.assign(Object.assign({},E.isColliding.text),F.isColliding.text),char:Object.assign(Object.assign({},E.isColliding.char),F.isColliding.char)}}),s.add(a)}return m||Oe(),E}function Ge(s,a,l,m,f,P=!1,S=!0){let w=S;(G.name==="shape"||G.name==="shapeDark")&&w&&Z!=="transparent"&&(s?ut(a-m/2,l-f/2,m,f):ut(a,l,m,f),w=!1);let O=s?{x:Math.floor(a-m/2),y:Math.floor(l-f/2)}:{x:Math.floor(a),y:Math.floor(l)};const E={x:Math.trunc(m),y:Math.trunc(f)};if(E.x===0||E.y===0)return{isColliding:{rect:{},text:{},char:{}}};E.x<0&&(O.x+=E.x,E.x*=-1),E.y<0&&(O.y+=E.y,E.y*=-1);const I={pos:O,size:E,collision:{isColliding:{rect:{}}}};I.collision.isColliding.rect[Z]=!0;const F=g(I);return Z!=="transparent"&&((P?Je:ce).push(I),w&&ut(O.x,O.y,E.x,E.y)),F}const ko=Math.PI,_o=Math.abs,Ro=Math.sin,Io=Math.cos,Fo=Math.atan2,Do=Math.sqrt,Go=Math.pow,zo=Math.floor,Bo=Math.round,qo=Math.ceil;e.ticks=0,e.score=0,e.isReplaying=!1;function Ho(s=1,a){return Se.get(s,a)}function Vo(s=2,a){return Se.getInt(s,a)}function Uo(s=1,a){return Se.get(s,a)*Se.getPlusOrMinus()}function Dn(s="GAME OVER"){Wt=s,Ye&&(e.time=void 0),ci()}function Jo(s="COMPLETE"){Wt=s,ci()}function Ko(s,a,l){if(e.isReplaying||(e.score+=s,a==null))return;const m=`${s>=1?"+":""}${Math.floor(s)}`;let f=new b;typeof a=="number"?f.set(a,l):f.set(a),f.x-=m.length*u/2,f.y-=u/2,Kt.push({str:m,pos:f,vy:-2,ticks:30})}function ri(s){Qe(s)}function Qo(s,a,l,m,f,P){let S=new b;typeof s=="number"?(S.set(s,a),ei(S,l,m,f,P)):(S.set(s),ei(S,a,l,m,f))}function ii(s,a){return new b(s,a)}function ai(s){!St&&!He&&qe&&sss.play(Yo[s])}function Wo(s){if(St){const a=wo(Se),l=a.baseState;return e.score=l.score,e.ticks=l.ticks,cloneDeep(a.gameState)}else if(He){const a=No(Se),l=a.baseState;return e.score=l.score,e.ticks=l.ticks,a.gameState}else{if(e.isReplaying)return jo().gameState;if(ze==="inGame"){const a={score:e.score,ticks:e.ticks};Ao(s,a,Se)}}return s}function Xo(){He||(!e.isReplaying&&Jt?ls():Dn())}const Yo={coin:"c",laser:"l",explosion:"e",powerUp:"p",hit:"h",jump:"j",select:"s",lucky:"u",random:"r"},oi={isPlayingBgm:!1,isCapturing:!1,isCapturingGameCanvasOnly:!1,captureCanvasScale:1,isShowingScore:!0,isShowingTime:!1,isReplayEnabled:!1,isRewindEnabled:!1,isDrawingParticleFront:!1,isDrawingScoreFront:!1,isMinifying:!1,isSoundEnabled:!0,viewSize:{x:100,y:100},seed:0,theme:"simple"},Zo=new Dt,Se=new Dt;let ze,es={title:as,inGame:is,gameOver:os,rewind:cs},te,Gn=0,Ht,Vt=!0,Ut=0,Be,vt,si,Ye,yt,Jt,bt,zn,qe,Ae,Kt,St=!1,He=!1,At,Qt,Wt,Bn;function ts(){let s;typeof options<"u"&&options!=null?s=Object.assign(Object.assign({},oi),options):s=oi;const a={name:s.theme,isUsingPixi:!1,isDarkColor:!1};s.theme!=="simple"&&s.theme!=="dark"&&(a.isUsingPixi=!0),(s.theme==="pixel"||s.theme==="shapeDark"||s.theme==="crt"||s.theme==="dark")&&(a.isDarkColor=!0),Be={viewSize:{x:100,y:100},bodyBackground:a.isDarkColor?"#101010":"#e0e0e0",viewBackground:a.isDarkColor?"blue":"white",theme:a,isSoundEnabled:s.isSoundEnabled},Ut=s.seed,Be.isCapturing=s.isCapturing,Be.isCapturingGameCanvasOnly=s.isCapturingGameCanvasOnly,Be.captureCanvasScale=s.captureCanvasScale,Be.viewSize=s.viewSize,vt=s.isPlayingBgm,si=s.isShowingScore&&!s.isShowingTime,Ye=s.isShowingTime,yt=s.isReplayEnabled,Jt=s.isRewindEnabled,bt=s.isDrawingParticleFront,zn=s.isDrawingScoreFront,qe=s.isSoundEnabled,s.isMinifying&&ds(),po(ns,rs,Be)}function ns(){typeof description<"u"&&description!=null&&description.trim().length>0&&(Vt=!1,Ut+=di(description)),typeof title<"u"&&title!=null&&title.trim().length>0&&(Vt=!1,document.title=title,Ut+=di(title)),typeof characters<"u"&&characters!=null&&H(characters,"a"),qe&&sss.init(Ut);const s=Be.viewSize;Ae={x:Math.floor(s.x/6),y:Math.floor(s.y/6)},te=new Po(Ae),Qe("black"),Vt?(qn(),e.ticks=0):li()}function rs(){e.df=e.difficulty=e.ticks/3600+1,e.tc=e.ticks;const s=e.score,a=e.time;e.sc=e.score;const l=e.sc;e.inp={p:je,ip:be,ijp:he,ijr:Le},pn(),es[ze](),G.isUsingPixi&&(ct(),G.name==="crt"&&ao()),e.ticks++,e.isReplaying?(e.score=s,e.time=a):e.sc!==l&&(e.score=e.sc)}function qn(){ze="inGame",e.ticks=-1,kn();const s=Math.floor(e.score);s>Gn&&(Gn=s),Ye&&e.time!=null&&(Ht==null||Ht>e.time)&&(Ht=e.time),e.score=0,e.time=0,Kt=[],vt&&qe&&sss.playBgm();const a=Zo.getInt(999999999);Se.setSeed(a),(yt||Jt)&&(go(a),So(),e.isReplaying=!1)}function is(){te.clear(),It(),bt||Bt(),zn||mi(),(yt||Jt)&&vo({pos:ii(je),isPressed:be,isJustPressed:he,isJustReleased:Le}),update(),bt&&Bt(),zn&&mi(),Hn(),te.draw(),Ye&&e.time!=null&&e.time++}function li(){ze="title",e.ticks=-1,kn(),te.clear(),It(),ti()&&(yo(Se),e.isReplaying=!0)}function as(){if(he){qn();return}if(It(),yt&&ti()&&(bo(),e.inp={p:je,ip:be,ijp:he,ijr:Le},bt||Bt(),update(),bt&&Bt()),e.ticks===0&&(Hn(),typeof title<"u"&&title!=null&&te.print(title,Math.floor(Ae.x-title.length)/2,Math.ceil(Ae.y*.2))),(e.ticks===30||e.ticks==40)&&typeof description<"u"&&description!=null){let s=0;description.split(`
`).forEach(l=>{l.length>s&&(s=l.length)});const a=Math.floor((Ae.x-s)/2);description.split(`
`).forEach((l,m)=>{te.print(l,a,Math.floor(Ae.y/2)+m)})}te.draw()}function ci(){ze="gameOver",e.isReplaying||Kr(),e.ticks=-1,ss(),vt&&qe&&sss.stopBgm()}function os(){(e.isReplaying||e.ticks>20)&&he?qn():e.ticks===(yt?120:300)&&!Vt&&li()}function ss(){e.isReplaying||(te.print(Wt,Math.floor((Ae.x-Wt.length)/2),Math.floor(Ae.y/2)),te.draw())}function ls(){ze="rewind",St=!0,At=_n({pos:{x:61,y:11},size:{x:36,y:7},text:"Rewind"}),Qt=_n({pos:{x:61,y:81},size:{x:36,y:7},text:"GiveUp"}),vt&&qe&&sss.stopBgm(),G.isUsingPixi&&(qt(At),qt(Qt))}function cs(){te.clear(),It(),update(),Hn(),xo(),He?(qt(At),(Co()||!be)&&us()):(Rn(At),Rn(Qt),At.isPressed&&(He=!0,St=!1)),Qt.isPressed?(St=He=!1,Dn()):te.draw(),Ye&&e.time!=null&&e.time++}function us(){He=!1,ze="inGame",kn(),vt&&qe&&sss.playBgm()}function Hn(){if(si){te.print(`${Math.floor(e.score)}`,0,0);const s=`HI ${Gn}`;te.print(s,Ae.x-s.length,0)}Ye&&(ui(e.time,0,0),ui(Ht,9,0))}function ui(s,a,l){if(s==null)return;let m=Math.floor(s*100/50);m>=10*60*100&&(m=10*60*100-1);const f=Vn(Math.floor(m/6e3),1)+"'"+Vn(Math.floor(m%6e3/100),2)+'"'+Vn(Math.floor(m%100),2);te.print(f,a,l)}function Vn(s,a){return("0000"+s).slice(-a)}function mi(){vn(),Qe("black"),Kt=Kt.filter(s=>(V(s.str,s.pos.x,s.pos.y),s.pos.y+=s.vy,s.vy*=.9,s.ticks--,s.ticks>0)),yn()}function di(s){let a=0;for(let l=0;l<s.length;l++){const m=s.charCodeAt(l);a=(a<<5)-a+m,a|=0}return a}function ms(){let s=window.location.search.substring(1);if(s=s.replace(/[^A-Za-z0-9_-]/g,""),s.length===0)return;const a=document.createElement("script");Bn=`${s}/main.js`,a.setAttribute("src",Bn),document.head.appendChild(a)}function ds(){fetch(Bn).then(s=>s.text()).then(s=>{const a=Terser.minify(s+"update();",{toplevel:!0}).code,l="function(){",m=a.indexOf(l),f="options={",P=a.indexOf(f);let S=a;if(m>=0)S=a.substring(a.indexOf(l)+l.length,a.length-4);else if(P>=0){let w=1,O;for(let E=P+f.length;E<a.length;E++){const I=a.charAt(E);if(I==="{")w++;else if(I==="}"&&(w--,w===0)){O=E+2;break}}w===0&&(S=a.substring(O))}fi.forEach(([w,O])=>{S=S.split(w).join(O)}),console.log(S),console.log(`${S.length} letters`)})}let fs=ri,hs=ai,Ms=d,ps=h;const Ps="transparent",gs="white",vs="red",ys="green",bs="yellow",Ss="blue",As="purple",Ns="cyan",ws="black",xs="coin",Cs="laser",js="explosion",Ls="powerUp",Es="hit",$s="jump",Ts="select",Os="lucky";let fi=[["===","=="],["!==","!="],["input.pos","inp.p"],["input.isPressed","inp.ip"],["input.isJustPressed","inp.ijp"],["input.isJustReleased","inp.ijr"],["color(","clr("],["play(","ply("],["times(","tms("],["remove(","rmv("],["ticks","tc"],["difficulty","df"],["score","sc"],[".isColliding.rect.transparent",".tr"],[".isColliding.rect.white",".wh"],[".isColliding.rect.red",".rd"],[".isColliding.rect.green",".gr"],[".isColliding.rect.yellow",".yl"],[".isColliding.rect.blue",".bl"],[".isColliding.rect.purple",".pr"],[".isColliding.rect.cyan",".cy"],[".isColliding.rect.black",".lc"],['"transparent"',"tr"],['"white"',"wh"],['"red"',"rd"],['"green"',"gr"],['"yellow"',"yl"],['"blue"',"bl"],['"purple"',"pr"],['"cyan"',"cy"],['"black"',"lc"],['"coin"',"cn"],['"laser"',"ls"],['"explosion"',"ex"],['"powerUp"',"pw"],['"hit"',"ht"],['"jump"',"jm"],['"select"',"sl"],['"lucky"',"uc"]];e.PI=ko,e.abs=_o,e.addGameScript=ms,e.addScore=Ko,e.addWithCharCode=A,e.arc=Oo,e.atan2=Fo,e.bar=$o,e.bl=Ss,e.box=Eo,e.ceil=qo,e.char=Pn,e.clamp=n,e.clr=fs,e.cn=xs,e.color=ri,e.complete=Jo,e.cos=Io,e.cy=Ns,e.end=Dn,e.ex=js,e.floor=zo,e.frameState=Wo,e.getButton=_n,e.gr=ys,e.ht=Es,e.input=ho,e.jm=$s,e.keyboard=lo,e.lc=ws,e.line=To,e.ls=Cs,e.minifyReplaces=fi,e.onLoad=ts,e.particle=Qo,e.play=ai,e.ply=hs,e.pointer=fo,e.pow=Go,e.pr=As,e.pw=Ls,e.range=c,e.rd=vs,e.rect=Lo,e.remove=h,e.rewind=Xo,e.rmv=ps,e.rnd=Ho,e.rndi=Vo,e.rnds=Uo,e.round=Bo,e.sin=Ro,e.sl=Ts,e.sqrt=Do,e.text=_e,e.times=d,e.tms=Ms,e.tr=Ps,e.uc=Os,e.updateButton=Rn,e.vec=ii,e.wh=gs,e.wrap=r,e.yl=bs})(window||{},{});window.sss=u1;window.options={isShowingScore:!1};let zi,xt=1;window.update=function(){ticks===0&&(zi=["coin","jump","powerUp","laser","select","hit","click","explosion","random"].map((t,n)=>getButton({pos:vec(5,2+n*9),size:vec(56,7),text:t,isToggle:!1,onClick:()=>{Er(t)}})),mn(xt),ur(mr())),zi.forEach(t=>{updateButton(t)});const e=vec(5,92);if(color("light_blue"),rect(e.x,e.y,90,5),color("white"),rect(e.x+1,e.y+1,88,3),input.pos.isInRect(e.x+1,e.y+1,88,3)){let t=input.pos.x-e.x;color("blue"),rect(e.x+t,e.y+1,1,3),text(`${t}`,85,e.y-3),input.isJustPressed&&(xt=t,$r(),mn(xt),ur(mr()))}color("black"),rect(e.x+xt,e.y+1,1,3),text(`seed: ${xt}`,5,e.y-3)};window.addEventListener("load",onLoad);
