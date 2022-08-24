var Gl=Object.defineProperty;var zl=(e,t,n)=>t in e?Gl(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Ct=(e,t,n)=>(zl(e,typeof t!="symbol"?t+"":t,n),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))l(a);new MutationObserver(a=>{for(const f of a)if(f.type==="childList")for(const h of f.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&l(h)}).observe(document,{childList:!0,subtree:!0});function n(a){const f={};return a.integrity&&(f.integrity=a.integrity),a.referrerpolicy&&(f.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?f.credentials="include":a.crossorigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function l(a){if(a.ep)return;a.ep=!0;const f=n(a);fetch(a.href,f)}})();function Bl(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var fr={exports:{}},dr={Note:"Note",Rest:"Rest",Octave:"Octave",OctaveShift:"OctaveShift",NoteLength:"NoteLength",NoteVelocity:"NoteVelocity",NoteQuantize:"NoteQuantize",Tempo:"Tempo",InfiniteLoop:"InfiniteLoop",LoopBegin:"LoopBegin",LoopExit:"LoopExit",LoopEnd:"LoopEnd"},jl={tempo:120,octave:4,length:4,velocity:100,quantize:75,loopCount:2},ql=function(){function e(t,n){for(var l=0;l<n.length;l++){var a=n[l];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}return function(t,n,l){return n&&e(t.prototype,n),l&&e(t,l),t}}();function Ul(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var Hl=function(){function e(t){Ul(this,e),this.source=t,this.index=0}return ql(e,[{key:"hasNext",value:function(){return this.index<this.source.length}},{key:"peek",value:function(){return this.source.charAt(this.index)||""}},{key:"next",value:function(){return this.source.charAt(this.index++)||""}},{key:"forward",value:function(){for(;this.hasNext()&&this.match(/\s/);)this.index+=1}},{key:"match",value:function(n){return n instanceof RegExp?n.test(this.peek()):this.peek()===n}},{key:"expect",value:function(n){this.match(n)||this.throwUnexpectedToken(),this.index+=1}},{key:"scan",value:function(n){var l=this.source.substr(this.index),a=null;if(n instanceof RegExp){var f=n.exec(l);f&&f.index===0&&(a=f[0])}else l.substr(0,n.length)===n&&(a=n);return a&&(this.index+=a.length),a}},{key:"throwUnexpectedToken",value:function(){var n=this.peek()||"ILLEGAL";throw new SyntaxError("Unexpected token: "+n)}}]),e}(),Vl=Hl,$l=function(){function e(t,n){for(var l=0;l<n.length;l++){var a=n[l];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}return function(t,n,l){return n&&e(t.prototype,n),l&&e(t,l),t}}();function Jl(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var ie=dr,Kl=Vl,Wl={c:0,d:2,e:4,f:5,g:7,a:9,b:11},Ql=function(){function e(t){Jl(this,e),this.scanner=new Kl(t)}return $l(e,[{key:"parse",value:function(){var n=this,l=[];return this._readUntil(";",function(){l=l.concat(n.advance())}),l}},{key:"advance",value:function(){switch(this.scanner.peek()){case"c":case"d":case"e":case"f":case"g":case"a":case"b":return this.readNote();case"[":return this.readChord();case"r":return this.readRest();case"o":return this.readOctave();case">":return this.readOctaveShift(1);case"<":return this.readOctaveShift(-1);case"l":return this.readNoteLength();case"q":return this.readNoteQuantize();case"v":return this.readNoteVelocity();case"t":return this.readTempo();case"$":return this.readInfiniteLoop();case"/":return this.readLoop()}this.scanner.throwUnexpectedToken()}},{key:"readNote",value:function(){return{type:ie.Note,noteNumbers:[this._readNoteNumber(0)],noteLength:this._readLength()}}},{key:"readChord",value:function(){var n=this;this.scanner.expect("[");var l=[],a=0;return this._readUntil("]",function(){switch(n.scanner.peek()){case"c":case"d":case"e":case"f":case"g":case"a":case"b":l.push(n._readNoteNumber(a));break;case">":n.scanner.next(),a+=12;break;case"<":n.scanner.next(),a-=12;break;default:n.scanner.throwUnexpectedToken()}}),this.scanner.expect("]"),{type:ie.Note,noteNumbers:l,noteLength:this._readLength()}}},{key:"readRest",value:function(){return this.scanner.expect("r"),{type:ie.Rest,noteLength:this._readLength()}}},{key:"readOctave",value:function(){return this.scanner.expect("o"),{type:ie.Octave,value:this._readArgument(/\d+/)}}},{key:"readOctaveShift",value:function(n){return this.scanner.expect(/<|>/),{type:ie.OctaveShift,direction:n|0,value:this._readArgument(/\d+/)}}},{key:"readNoteLength",value:function(){return this.scanner.expect("l"),{type:ie.NoteLength,noteLength:this._readLength()}}},{key:"readNoteQuantize",value:function(){return this.scanner.expect("q"),{type:ie.NoteQuantize,value:this._readArgument(/\d+/)}}},{key:"readNoteVelocity",value:function(){return this.scanner.expect("v"),{type:ie.NoteVelocity,value:this._readArgument(/\d+/)}}},{key:"readTempo",value:function(){return this.scanner.expect("t"),{type:ie.Tempo,value:this._readArgument(/\d+(\.\d+)?/)}}},{key:"readInfiniteLoop",value:function(){return this.scanner.expect("$"),{type:ie.InfiniteLoop}}},{key:"readLoop",value:function(){var n=this;this.scanner.expect("/"),this.scanner.expect(":");var l={type:ie.LoopBegin},a={type:ie.LoopEnd},f=[];return f=f.concat(l),this._readUntil(/[|:]/,function(){f=f.concat(n.advance())}),f=f.concat(this._readLoopExit()),this.scanner.expect(":"),this.scanner.expect("/"),l.value=this._readArgument(/\d+/)||null,f=f.concat(a),f}},{key:"_readUntil",value:function(n,l){for(;this.scanner.hasNext()&&(this.scanner.forward(),!(!this.scanner.hasNext()||this.scanner.match(n)));)l()}},{key:"_readArgument",value:function(n){var l=this.scanner.scan(n);return l!==null?+l:null}},{key:"_readNoteNumber",value:function(n){var l=Wl[this.scanner.next()];return l+this._readAccidental()+n}},{key:"_readAccidental",value:function(){return this.scanner.match("+")?1*this.scanner.scan(/\++/).length:this.scanner.match("-")?-1*this.scanner.scan(/\-+/).length:0}},{key:"_readDot",value:function(){for(var n=(this.scanner.scan(/\.+/)||"").length,l=new Array(n),a=0;a<n;a++)l[a]=0;return l}},{key:"_readLength",value:function(){var n=[];n=n.concat(this._readArgument(/\d+/)),n=n.concat(this._readDot());var l=this._readTie();return l&&(n=n.concat(l)),n}},{key:"_readTie",value:function(){return this.scanner.forward(),this.scanner.match("^")?(this.scanner.next(),this._readLength()):null}},{key:"_readLoopExit",value:function(){var n=this,l=[];if(this.scanner.match("|")){this.scanner.next();var a={type:ie.LoopExit};l=l.concat(a),this._readUntil(":",function(){l=l.concat(n.advance())})}return l}}]),e}(),Yl=Ql,Zl=function(){function e(t,n){for(var l=0;l<n.length;l++){var a=n[l];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}return function(t,n,l){return n&&e(t.prototype,n),l&&e(t,l),t}}();function Xl(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var ne=dr,se=jl,es=Yl,ts=typeof Symbol<"u"?Symbol.iterator:"@@iterator",ns=function(){function e(t){Xl(this,e),this.source=t,this._commands=new es(t).parse(),this._commandIndex=0,this._processedTime=0,this._iterator=null,this._octave=se.octave,this._noteLength=[se.length],this._velocity=se.velocity,this._quantize=se.quantize,this._tempo=se.tempo,this._infiniteLoopIndex=-1,this._loopStack=[],this._done=!1}return Zl(e,[{key:"hasNext",value:function(){return this._commandIndex<this._commands.length}},{key:"next",value:function(){if(this._done)return{done:!0,value:null};if(this._iterator){var n=this._iterator.next();if(!n.done)return n}var l=this._forward(!0);if(Xi(l))this._iterator=this[l.type](l);else return this._done=!0,{done:!1,value:{type:"end",time:this._processedTime}};return this.next()}},{key:ts,value:function(){return this}},{key:"_forward",value:function(n){for(;this.hasNext()&&!Xi(this._commands[this._commandIndex]);){var l=this._commands[this._commandIndex++];this[l.type](l)}return n&&!this.hasNext()&&this._infiniteLoopIndex!==-1?(this._commandIndex=this._infiniteLoopIndex,this._forward(!1)):this._commands[this._commandIndex++]||{}}},{key:"_calcDuration",value:function(n){var l=this;n[0]===null&&(n=this._noteLength.concat(n.slice(1)));var a=null,f=0;return n=n.map(function(h){switch(h){case null:h=a;break;case 0:h=f*=2;break;default:a=f=h;break}var g=h!==null?h:se.length;return 60/l._tempo*(4/g)}),n.reduce(function(h,g){return h+g},0)}},{key:"_calcNoteNumber",value:function(n){return n+this._octave*12+12}},{key:ne.Note,value:function(n){var l=this,a="note",f=this._processedTime,h=this._calcDuration(n.noteLength),g=n.noteNumbers.map(function(k){return l._calcNoteNumber(k)}),M=this._quantize,b=this._velocity;return this._processedTime=this._processedTime+h,is(g.map(function(k){return{type:a,time:f,duration:h,noteNumber:k,velocity:b,quantize:M}}))}},{key:ne.Rest,value:function(n){var l=this._calcDuration(n.noteLength);this._processedTime=this._processedTime+l}},{key:ne.Octave,value:function(n){this._octave=n.value!==null?n.value:se.octave}},{key:ne.OctaveShift,value:function(n){var l=n.value!==null?n.value:1;this._octave+=l*n.direction}},{key:ne.NoteLength,value:function(n){var l=n.noteLength.map(function(a){return a!==null?a:se.length});this._noteLength=l}},{key:ne.NoteVelocity,value:function(n){this._velocity=n.value!==null?n.value:se.velocity}},{key:ne.NoteQuantize,value:function(n){this._quantize=n.value!==null?n.value:se.quantize}},{key:ne.Tempo,value:function(n){this._tempo=n.value!==null?n.value:se.tempo}},{key:ne.InfiniteLoop,value:function(){this._infiniteLoopIndex=this._commandIndex}},{key:ne.LoopBegin,value:function(n){var l=n.value!==null?n.value:se.loopCount,a=this._commandIndex,f=-1;this._loopStack.push({loopCount:l,loopTopIndex:a,loopOutIndex:f})}},{key:ne.LoopExit,value:function(){var n=this._loopStack[this._loopStack.length-1],l=this._commandIndex;n.loopCount<=1&&n.loopOutIndex!==-1&&(l=n.loopOutIndex),this._commandIndex=l}},{key:ne.LoopEnd,value:function(){var n=this._loopStack[this._loopStack.length-1],l=this._commandIndex;n.loopOutIndex===-1&&(n.loopOutIndex=this._commandIndex),n.loopCount-=1,0<n.loopCount?l=n.loopTopIndex:this._loopStack.pop(),this._commandIndex=l}}]),e}();function is(e){var t=0;return{next:function(){return t<e.length?{done:!1,value:e[t++]}:{done:!0}}}}function Xi(e){return e.type===ne.Note||e.type===ne.Rest}var rs=ns;(function(e){e.exports=rs})(fr);const hr=Bl(fr.exports);var _t={};(function(e){var t=+Math.PI*2,n=16,l=1,a=Math.sin,f=Math.pow,h=Math.abs,g=1e-6,M=window.AudioContext||window.webkitAudioContext;e.SampleRate=0,e.Sec=0,e.SetSampleRate=function(r){e.SampleRate=r|0,e.Sec=r|0},e.SetSampleRate(It()),e.Live=function(){var r={};return r._generate=function(c){var m=new S(c,e.DefaultModules),P=_e(m.getSamplesLeft());return m.generate(P),P},r},e.Module={},e.G={};var b=e.stage={PhaseSpeed:0,PhaseSpeedMod:10,Generator:20,SampleMod:30,Volume:40};function k(r,c){return r.stage-c.stage}e.InitDefaultParams=R;function R(r,c){for(var m=0;m<c.length;m+=1){var P=c[m],x=r[P.name]||{};Oe(P.params,function(A,C){typeof x[C]>"u"&&(x[C]=A.D)}),r[P.name]=x}}e.Processor=S;function S(r,c){r=r||{},c=c||e.DefaultModules,typeof r=="function"?r=r():r=JSON.parse(JSON.stringify(r)),this.finished=!1,this.state={SampleRate:r.SampleRate||e.SampleRate},c=c.slice(),c.sort(k),this.modules=c,R(r,c);for(var m=0;m<this.modules.length;m+=1){var P=this.modules[m];this.modules[m].setup(this.state,r[P.name])}}S.prototype={generate:function(r){for(var c=0;c<r.length;c+=1)r[c]=0;if(!this.finished){for(var m=this.state,P=r.length|0,c=0;c<this.modules.length;c+=1){var x=this.modules[c],A=x.process(m,r.subarray(0,P))|0;P=Math.min(P,A)}P<r.length&&(this.finished=!0);for(var c=P;c<r.length;c++)r[c]=0}},getSamplesLeft:function(){for(var r=0,c=0;c<this.state.envelopes.length;c+=1)r+=this.state.envelopes[c].N;return r===0&&(r=3*this.state.SampleRate),r}},e.Module.Frequency={name:"Frequency",params:{Start:{L:30,H:1800,D:440},Min:{L:30,H:1800,D:30},Max:{L:30,H:1800,D:1800},Slide:{L:-1,H:1,D:0},DeltaSlide:{L:-1,H:1,D:0},RepeatSpeed:{L:0,H:3,D:0},ChangeAmount:{L:-12,H:12,D:0},ChangeSpeed:{L:0,H:1,D:0}},stage:b.PhaseSpeed,setup:function(r,c){var m=r.SampleRate;r.phaseParams=c,r.phaseSpeed=c.Start*t/m,r.phaseSpeedMax=c.Max*t/m,r.phaseSpeedMin=c.Min*t/m,r.phaseSpeedMin=Math.min(r.phaseSpeedMin,r.phaseSpeed),r.phaseSpeedMax=Math.max(r.phaseSpeedMax,r.phaseSpeed),r.phaseSlide=1+f(c.Slide,3)*64/m,r.phaseDeltaSlide=f(c.DeltaSlide,3)/(m*1e3),r.repeatTime=0,r.repeatLimit=1/0,c.RepeatSpeed>0&&(r.repeatLimit=c.RepeatSpeed*m),r.arpeggiatorTime=0,r.arpeggiatorLimit=c.ChangeSpeed*m,c.ChangeAmount==0&&(r.arpeggiatorLimit=1/0),r.arpeggiatorMod=1+c.ChangeAmount/12},process:function(r,c){for(var m=+r.phaseSpeed,P=+r.phaseSpeedMin,x=+r.phaseSpeedMax,A=+r.phaseSlide,C=+r.phaseDeltaSlide,N=r.repeatTime,O=r.repeatLimit,j=r.arpeggiatorTime,q=r.arpeggiatorLimit,Z=r.arpeggiatorMod,U=0;U<c.length;U++){if(A+=C,m*=A,m=m<P?P:m>x?x:m,N>O)return this.setup(r,r.phaseParams),U+this.process(r,c.subarray(U))-1;N++,j>q&&(m*=Z,j=0,q=1/0),j++,c[U]+=m}return r.repeatTime=N,r.arpeggiatorTime=j,r.arpeggiatorLimit=q,r.phaseSpeed=m,r.phaseSlide=A,c.length}},e.Module.Vibrato={name:"Vibrato",params:{Depth:{L:0,H:1,D:0},DepthSlide:{L:-1,H:1,D:0},Frequency:{L:.01,H:48,D:0},FrequencySlide:{L:-1,H:1,D:0}},stage:b.PhaseSpeedMod,setup:function(r,c){var m=r.SampleRate;r.vibratoPhase=0,r.vibratoDepth=c.Depth,r.vibratoPhaseSpeed=c.Frequency*t/m,r.vibratoPhaseSpeedSlide=1+f(c.FrequencySlide,3)*3/m,r.vibratoDepthSlide=c.DepthSlide/m},process:function(r,c){var m=+r.vibratoPhase,P=+r.vibratoDepth,x=+r.vibratoPhaseSpeed,A=+r.vibratoPhaseSpeedSlide,C=+r.vibratoDepthSlide;if(P==0&&C<=0)return c.length;for(var N=0;N<c.length;N++)m+=x,m>t&&(m-=t),c[N]+=c[N]*a(m)*P,x*=A,P+=C,P=an(P);return r.vibratoPhase=m,r.vibratoDepth=P,r.vibratoPhaseSpeed=x,c.length}},e.Module.Generator={name:"Generator",params:{Func:{C:e.G,D:"square"},A:{L:0,H:1,D:0},B:{L:0,H:1,D:0},ASlide:{L:-1,H:1,D:0},BSlide:{L:-1,H:1,D:0}},stage:b.Generator,setup:function(r,c){r.generatorPhase=0,typeof c.Func=="string"?r.generator=e.G[c.Func]:r.generator=c.Func,typeof r.generator=="object"&&(r.generator=r.generator.create()),ue(typeof r.generator=="function","generator must be a function"),r.generatorA=c.A,r.generatorASlide=c.ASlide,r.generatorB=c.B,r.generatorBSlide=c.BSlide},process:function(r,c){return r.generator(r,c)}};var D=1<<16;e.Module.Guitar={name:"Guitar",params:{A:{L:0,H:1,D:1},B:{L:0,H:1,D:1},C:{L:0,H:1,D:1}},stage:b.Generator,setup:function(r,c){r.guitarA=c.A,r.guitarB=c.B,r.guitarC=c.C,r.guitarBuffer=_e(D),r.guitarHead=0;for(var m=r.guitarBuffer,P=0;P<m.length;P++)m[P]=oe()*2-1},process:function(r,c){for(var m=D,P=m-1,x=+r.guitarA,A=+r.guitarB,C=+r.guitarC,N=x+A+C,O=r.guitarHead,j=r.guitarBuffer,q=0;q<c.length;q++){var Z=t/c[q]|0;Z=Z>m?m:Z;var U=O-Z+m&P;j[O]=(j[U-0+m&P]*x+j[U-1+m&P]*A+j[U-2+m&P]*C)/N,c[q]=j[O],O=O+1&P}return r.guitarHead=O,c.length}},e.Module.Filter={name:"Filter",params:{LP:{L:0,H:1,D:1},LPSlide:{L:-1,H:1,D:0},LPResonance:{L:0,H:1,D:0},HP:{L:0,H:1,D:0},HPSlide:{L:-1,H:1,D:0}},stage:b.SampleMod+0,setup:function(r,c){r.FilterEnabled=c.HP>g||c.LP<1-g,r.LPEnabled=c.LP<1-g,r.LP=f(c.LP,3)/10,r.LPSlide=1+c.LPSlide*100/r.SampleRate,r.LPPos=0,r.LPPosSlide=0,r.LPDamping=5/(1+f(c.LPResonance,2)*20)*(.01+c.LP),r.LPDamping=1-Math.min(r.LPDamping,.8),r.HP=f(c.HP,2)/10,r.HPPos=0,r.HPSlide=1+c.HPSlide*100/r.SampleRate},enabled:function(r){return r.FilterEnabled},process:function(r,c){if(!this.enabled(r))return c.length;for(var m=+r.LP,P=+r.LPPos,x=+r.LPPosSlide,A=+r.LPSlide,C=+r.LPDamping,N=+r.LPEnabled,O=+r.HP,j=+r.HPPos,q=+r.HPSlide,Z=0;Z<c.length;Z++){(O>g||O<-g)&&(O*=q,O=O<g?g:O>.1?.1:O);var U=P;m*=A,m=m<0?m=0:m>.1?.1:m;var he=c[Z];N?(x+=(he-P)*m,x*=C):(P=he,x=0),P+=x,j+=P-U,j*=1-O,c[Z]=j}return r.LPPos=P,r.LPPosSlide=x,r.LP=m,r.HP=O,r.HPPos=j,c.length}};var B=1<<10;e.Module.Phaser={name:"Phaser",params:{Offset:{L:-1,H:1,D:0},Sweep:{L:-1,H:1,D:0}},stage:b.SampleMod+1,setup:function(r,c){r.phaserBuffer=_e(B),r.phaserPos=0,r.phaserOffset=f(c.Offset,2)*(B-4),r.phaserOffsetSlide=f(c.Sweep,3)*4e3/r.SampleRate},enabled:function(r){return h(r.phaserOffsetSlide)>g||h(r.phaserOffset)>g},process:function(r,c){if(!this.enabled(r))return c.length;for(var m=B,P=m-1,x=r.phaserBuffer,A=r.phaserPos|0,C=+r.phaserOffset,N=+r.phaserOffsetSlide,O=0;O<c.length;O++){C+=N,C<0&&(C=-C,N=-N),C>P&&(C=P,N=0),x[A]=c[O];var j=A-(C|0)+m&P;c[O]+=x[j],A=A+1&P|0}return r.phaserPos=A,r.phaserOffset=C,c.length}},e.Module.Volume={name:"Volume",params:{Master:{L:0,H:1,D:.5},Attack:{L:.001,H:1,D:.01},Sustain:{L:0,H:2,D:.3},Punch:{L:0,H:3,D:1},Decay:{L:.001,H:2,D:1}},stage:b.Volume,setup:function(r,c){var m=r.SampleRate,P=c.Master,x=P*(1+c.Punch);r.envelopes=[{S:0,E:P,N:c.Attack*m|0},{S:x,E:P,N:c.Sustain*m|0},{S:P,E:0,N:c.Decay*m|0}];for(var A=0;A<r.envelopes.length;A+=1){var C=r.envelopes[A];C.G=(C.E-C.S)/C.N}},process:function(r,c){for(var m=0;r.envelopes.length>0&&m<c.length;){for(var P=r.envelopes[0],x=P.S,A=P.G,C=Math.min(c.length-m,P.N)|0,N=m+C|0;m<N;m+=1)c[m]*=x,x+=A,x=$e(x,0,10);P.S=x,P.N-=C,P.N<=0&&r.envelopes.shift()}return m}},e.DefaultModules=[e.Module.Frequency,e.Module.Vibrato,e.Module.Generator,e.Module.Filter,e.Module.Phaser,e.Module.Volume],e.DefaultModules.sort(k),e.EmptyParams=G;function G(){return Oe(e.Module,function(){return{}})}e._RemoveEmptyParams=Q;function Q(r){for(var c in r)Je(r[c]).length==0&&delete r[c]}e.Preset={Reset:function(){return G()},Coin:function(){var r=G();return r.Frequency.Start=y(880,660),r.Volume.Sustain=y(.1),r.Volume.Decay=y(.4,.1),r.Volume.Punch=y(.3,.3),y()<.5&&(r.Frequency.ChangeSpeed=y(.15,.1),r.Frequency.ChangeAmount=y(8,4)),Q(r),r},Laser:function(){var r=G();return r.Generator.Func=Re(["square","saw","sine"]),y()<.33?(r.Frequency.Start=y(880,440),r.Frequency.Min=y(.1),r.Frequency.Slide=y(.3,-.8)):(r.Frequency.Start=y(1200,440),r.Frequency.Min=r.Frequency.Start-y(880,440),r.Frequency.Min<110&&(r.Frequency.Min=110),r.Frequency.Slide=y(.3,-1)),y()<.5?(r.Generator.A=y(.5),r.Generator.ASlide=y(.2)):(r.Generator.A=y(.5,.4),r.Generator.ASlide=y(.7)),r.Volume.Sustain=y(.2,.1),r.Volume.Decay=y(.4),y()<.5&&(r.Volume.Punch=y(.3)),y()<.33&&(r.Phaser.Offset=y(.2),r.Phaser.Sweep=y(.2)),y()<.5&&(r.Filter.HP=y(.3)),Q(r),r},Explosion:function(){var r=G();return r.Generator.Func="noise",y()<.5?(r.Frequency.Start=y(440,40),r.Frequency.Slide=y(.4,-.1)):(r.Frequency.Start=y(1600,220),r.Frequency.Slide=y(-.2,-.2)),y()<.2&&(r.Frequency.Slide=0),y()<.3&&(r.Frequency.RepeatSpeed=y(.5,.3)),r.Volume.Sustain=y(.3,.1),r.Volume.Decay=y(.5),r.Volume.Punch=y(.6,.2),y()<.5&&(r.Phaser.Offset=y(.9,-.3),r.Phaser.Sweep=y(-.3)),y()<.33&&(r.Frequency.ChangeSpeed=y(.3,.6),r.Frequency.ChangeAmount=y(24,-12)),Q(r),r},Powerup:function(){var r=G();return y()<.5?r.Generator.Func="saw":r.Generator.A=y(.6),r.Frequency.Start=y(220,440),y()<.5?(r.Frequency.Slide=y(.5,.2),r.Frequency.RepeatSpeed=y(.4,.4)):(r.Frequency.Slide=y(.2,.05),y()<.5&&(r.Vibrato.Depth=y(.6,.1),r.Vibrato.Frequency=y(30,10))),r.Volume.Sustain=y(.4),r.Volume.Decay=y(.4,.1),Q(r),r},Hit:function(){var r=G();return r.Generator.Func=Re(["square","saw","noise"]),r.Generator.A=y(.6),r.Generator.ASlide=y(1,-.5),r.Frequency.Start=y(880,220),r.Frequency.Slide=-y(.4,.3),r.Volume.Sustain=y(.1),r.Volume.Decay=y(.2,.1),y()<.5&&(r.Filter.HP=y(.3)),Q(r),r},Jump:function(){var r=G();return r.Generator.Func="square",r.Generator.A=y(.6),r.Frequency.Start=y(330,330),r.Frequency.Slide=y(.4,.2),r.Volume.Sustain=y(.3,.1),r.Volume.Decay=y(.2,.1),y()<.5&&(r.Filter.HP=y(.3)),y()<.3&&(r.Filter.LP=y(-.6,1)),Q(r),r},Select:function(){var r=G();return r.Generator.Func=Re(["square","saw"]),r.Generator.A=y(.6),r.Frequency.Start=y(660,220),r.Volume.Sustain=y(.1,.1),r.Volume.Decay=y(.2),r.Filter.HP=.2,Q(r),r},Lucky:function(){var r=G();return Oe(r,function(c,m){var P=e.Module[m].params;Oe(P,function(x,A){if(x.C){var C=Je(x.C);c[A]=C[C.length*oe()|0]}else c[A]=oe()*(x.H-x.L)+x.L})}),r.Volume.Master=.4,r.Filter={},Q(r),r},Synth:function(){var r=G();return r.Generator.Func=Re(["square","saw"]),r.Frequency.Start=Re([340,240,170]),r.Volume.Attack=y()>.6?y(.5):0,r.Volume.Sustain=y(1),r.Volume.Punch=y(1),r.Volume.Decay=y(.9)+.1,r.Generator.A=y(1),y()<.25&&(r.Filter.HP=y(1)),y()<.25&&(r.Filter.LP=y(1)),Q(r),r},Tone:function(){var r=G();return r.Generator.Func="square",r.Frequency.Start=261.6,r.Volume.Sustain=.6441,Q(r),r},Click:function(){var r=y()>.5?e.Preset.Hit():e.Preset.Explosion();return y()<.5&&(r.Frequency.Slide=-.5+y(1)),y()<.5&&(r.Volume.Sustain*=y(.4)+.2,r.Volume.Decay*=y(.4)+.2),r.Frequency.Start=y(1200,440),Q(r),r}},e.G.unoise=ce("sample = Math.random();"),e.G.sine=ce("sample = Math.sin(phase);"),e.G.saw=ce("sample = 2*(phase/TAU - ((phase/TAU + 0.5)|0));"),e.G.triangle=ce("sample = Math.abs(4 * ((phase/TAU - 0.25)%1) - 2) - 1;"),e.G.square=ce("var s = Math.sin(phase); sample = s > A ? 1.0 : s < A ? -1.0 : A;"),e.G.synth=ce("sample = Math.sin(phase) + .5*Math.sin(phase/2) + .3*Math.sin(phase/4);"),e.G.noise=ce("if(phase % TAU < 4){__noiseLast = Math.random() * 2 - 1;} sample = __noiseLast;"),e.G.string={create:function(){for(var r=65536,c=r-1,m=_e(r),P=0;P<m.length;P++)m[P]=oe()*2-1;var x=0;return function(A,C){for(var N=Math.PI*2,O=+A.generatorA,j=+A.generatorASlide,q=+A.generatorB,Z=+A.generatorBSlide,U=m,he=0;he<C.length;he++){var rt=C[he],ot=N/rt|0;O+=j,q+=Z,O=O<0?0:O>1?1:O,q=q<0?0:q>1?1:q;var xe=x-ot+r&c,Ft=(U[xe-0+r&c]*1+U[xe-1+r&c]*O+U[xe-2+r&c]*q)/(1+O+q);U[x]=Ft,C[he]=U[x],x=x+1&c}return A.generatorA=O,A.generatorB=q,C.length}}};function ce(r){return new Function("$","block",`var TAU = Math.PI * 2;
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
`+r+`	block[i] = sample;
}

$.generatorPhase = phase;
$.generatorA = A;
$.generatorB = B;
return block.length;
`)}e.CreateAudio=Ve;function Ve(r){typeof Float32Array<"u"&&ue(r instanceof Float32Array,"data must be an Float32Array");var c=l*n>>3,m=e.SampleRate*c,P=cn(8+36+r.length*2),x=0;function A(N){for(var O=0;O<N.length;O+=1)P[x]=N.charCodeAt(O),x++}function C(N,O){O<=0||(P[x]=N&255,x++,C(N>>8,O-1))}return A("RIFF"),C(36+r.length*2,4),A("WAVEfmt "),C(16,4),C(1,2),C(l,2),C(e.SampleRate,4),C(m,4),C(c,2),C(n,2),A("data"),C(r.length*2,4),we(P.subarray(x),r),new Audio("data:audio/wav;base64,"+Ne(P))}e.DownloadAsFile=function(r){ue(r instanceof Audio,"input must be an Audio object"),document.location.href=r.src},e.Util={},e.Util.CopyFToU8=we;function we(r,c){ue(r.length/2==c.length,"the target buffer must be twice as large as the iinput");for(var m=0,P=0;P<c.length;P++){var x=+c[P],A=x*32767|0;A=A<-32768?-32768:32767<A?32767:A,A+=A<0?65536:0,r[m]=A&255,m++,r[m]=A>>8,m++}}function Ne(r){for(var c=32768,m="",P=0;P<r.length;P+=c){var x=Math.min(P+c,r.length);m+=String.fromCharCode.apply(null,r.subarray(P,x))}return btoa(m)}function It(){return typeof M<"u"?new M().sampleRate:44100}function ue(r,c){if(!r)throw new Error(c)}function $e(r,c,m){return r=+r,c=+c,m=+m,r<c?+c:r>m?+m:+r}function an(r){return r=+r,r<0?0:r>1?1:+r}function Oe(r,c){var m={};for(var P in r)r.hasOwnProperty(P)&&(m[P]=c(r[P],P));return m}function y(r,c){var m=oe();return r!==void 0&&(m*=r),c!==void 0&&(m+=c),m}function Re(r){return r[r.length*oe()|0]}function Je(r){var c=[];for(var m in r)c.push(m);return c}e._createFloatArray=_e;function _e(r){if(typeof Float32Array>"u")for(var c=new Array(r),m=0;m<c.length;m++)c[m]=0;return new Float32Array(r)}function cn(r){if(typeof Uint8Array>"u")for(var c=new Array(r),m=0;m<c.length;m++)c[m]=0;return new Uint8Array(r)}var it=Math.random;e.setRandomFunc=function(r){it=r};function oe(){return it()}})(_t={});let be,er,ln,jn,mr,tr=!1;function os(e=void 0){be=e==null?new(window.AudioContext||window.webkitAudioContext):e,pr(),gr(),yr()}function ls(){tr||(tr=!0,Mr())}function pr(e=120){er=e,ln=60/er}function gr(e=8){jn=e>0?4/e:void 0}function yr(e=.1){mr=e}function Yn(e){if(jn==null)return e;const t=ln*jn;return t>0?Math.ceil(e/t)*t:e}function Mr(){const e=be.createBufferSource();e.start=e.start||e.noteOn,e.start()}function ss(){be.resume()}class Zn{constructor(t=null){Ct(this,"x");Ct(this,"y");Ct(this,"z");Ct(this,"w");this.setSeed(t)}get(t=1,n){return n==null&&(n=t,t=0),this.next()/4294967295*(n-t)+t}getInt(t,n){n==null&&(n=t,t=0);const l=Math.floor(t),a=Math.floor(n);return a===l?l:this.next()%(a-l)+l}getPlusOrMinus(){return this.getInt(2)*2-1}select(t){return t[this.getInt(t.length)]}setSeed(t,n=123456789,l=362436069,a=521288629,f=32){this.w=t!=null?t>>>0:Math.floor(Math.random()*4294967295)>>>0,this.x=n>>>0,this.y=l>>>0,this.z=a>>>0;for(let h=0;h<f;h++)this.next();return this}getState(){return{x:this.x,y:this.y,z:this.z,w:this.w}}next(){const t=this.x^this.x<<11;return this.x=this.y,this.y=this.z,this.z=this.w,this.w=(this.w^this.w>>>19^(t^t>>>8))>>>0,this.w}}function re(e,t){let n=[];for(let l=0;l<e;l++)n.push(t(l));return n}function Pr(e){return 440*Math.pow(2,(e-69)/12)}function Xn(e){let t=0;const n=e.length;for(let l=0;l<n;l++){const a=e.charCodeAt(l);t=(t<<5)-t+a,t|=0}return t}const ei=["coin","laser","explosion","powerUp","hit","jump","select","lucky","random","click","synth","tone"],as={coin:"Coin",laser:"Laser",explosion:"Explosion",powerUp:"Powerup",hit:"Hit",jump:"Jump",select:"Select",lucky:"Lucky",random:"Lucky",click:"Click",synth:"Synth",tone:"Tone"},tn=new Zn;let ti,vr;function cs(){vr=_t.Live(),ti=[],_t.setRandomFunc(()=>tn.get())}function nr(e){ps(e)}function us(e){ti.forEach(t=>{gs(t,e)})}function nn(e=void 0,t=void 0,n=2,l=.5,a=void 0,f=1,h=1){t!=null&&tn.setSeed(t);const g=_t.Preset[as[e!=null?e:ei[tn.getInt(8)]]],M=re(n,()=>{const b=g();return a!=null&&b.Frequency.Start!=null&&(b.Frequency.Start=a),b.Volume.Attack!=null&&(b.Volume.Attack*=f),b.Volume.Sustain!=null&&(b.Volume.Sustain*=h),b});return fs(e,M,l)}function fs(e,t,n){const l=t.map(f=>{const h=vr._generate(f),g=be.createBuffer(1,h.length,_t.SampleRate);var M=g.getChannelData(0);return M.set(h),g}),a=be.createGain();return a.gain.value=n*mr,a.connect(be.destination),{type:e,params:t,volume:n,buffers:l,bufferSourceNodes:void 0,gainNode:a,isPlaying:!1,playedTime:void 0}}function ds(e,t,n,l,a){const f=new Zn;f.setSeed(n);let h;if(t){let g=f.select(["hit","hit","click","click","explosion"]);l!=null&&(g=l),h=nn(g,f.getInt(999999999),g==="explosion"?1:2,a!=null?a:g==="explosion"?.4:.5,f.get(100,200),g==="explosion"?.5:1,g==="explosion"?.2:1)}else{const g=hs(e);let M=f.get()<1/g?"select":f.select(["tone","tone","synth"]);l!=null&&(M=l),h=nn(M,f.getInt(999999999),M!=="select"?1:2,a!=null?a:M==="tone"?.3:M==="synth"?.4:.25,261.6,M!=="select"?.1:1,M!=="select"?2:1)}return h.isDrum=t,h.seed=n,h}function hs(e){if(e==null||e.notes.length===0)return 1;let t=0,n=0;return e.notes.forEach(l=>{const a=l.quantizedEndStep-l.quantizedStartStep;a>0&&(t+=a,n++)}),t/n}function ms(e){ti.push(e)}function ps(e){e.isPlaying=!0}function gs(e,t){if(!e.isPlaying)return;e.isPlaying=!1;const n=Yn(t);(e.playedTime==null||n>e.playedTime)&&(qn(e,n),e.playedTime=n)}function qn(e,t,n=void 0){e.bufferSourceNodes=[],e.buffers.forEach(l=>{const a=be.createBufferSource();if(a.buffer=l,n!=null&&a.playbackRate!=null){const f=Math.pow(2,.08333333333333333);a.playbackRate.value=Math.pow(f,n)}a.start=a.start||a.noteOn,a.connect(e.gainNode),a.start(t),e.bufferSourceNodes.push(a)})}function Un(e,t=void 0){e.bufferSourceNodes!=null&&(e.bufferSourceNodes.forEach(n=>{t==null?n.stop():n.stop(t)}),e.bufferSourceNodes=void 0)}const ys=100;function Ms(e){let t=`${e}`,n;ei.forEach(k=>{const R=`@${k}`,S=t.indexOf(R);S>=0&&(n=k,t=`${t.slice(0,S)}${t.slice(S+R.length)}`)});const l="@d",a=t.indexOf(l);let f=!1;a>=0&&(f=!0,t=`${t.slice(0,a)}${t.slice(a+l.length)}`);const h=t.match(/@s\d+/);let g=1;h!=null&&(g=Number.parseInt(h[0].substring(2)),t=t.replace(/@s\d+/,""));const M=t.match(/v\d+/);let b=.5;return M!=null&&(b=Number.parseInt(M[0].substring(1))/ys,t=t.replace(/v\d+/,"")),{mml:t,args:{isDrum:f,seed:g,type:n,volume:b}}}function Sr(e,t,n,l){return{mml:e,sequence:t,soundEffect:n,noteIndex:0,endStep:-1,visualizer:l}}function Ps(e,t,n){const l=t.sequence.notes[t.noteIndex];l!=null&&((t.soundEffect.type==="synth"||t.soundEffect.type==="tone")&&t.endStep===e.notesStepsIndex&&Un(t.soundEffect,n),l.quantizedStartStep===e.notesStepsIndex&&((t.soundEffect.type==="synth"||t.soundEffect.type==="tone")&&Un(t.soundEffect),t.soundEffect.isDrum?qn(t.soundEffect,n):qn(t.soundEffect,n,l.pitch-69),t.visualizer!=null&&t.visualizer.redraw(l),t.endStep=l.quantizedEndStep,t.endStep>=e.notesStepsCount&&(t.endStep-=e.notesStepsCount),t.noteIndex++,t.noteIndex>=t.sequence.notes.length&&(t.noteIndex=0)))}let et=[];function vs(){Cr(),et=[]}function br(e,t,n=1){e.forEach(a=>{a.noteIndex=0});const l={parts:e,notesStepsCount:t,notesStepsIndex:void 0,noteInterval:void 0,nextNotesTime:void 0,speedRatio:n,isPlaying:!1,isLooping:!1};return wr(l),l}function wr(e){const t=ln/4/e.speedRatio;e.notesStepsIndex=0,e.noteInterval=t,e.nextNotesTime=Yn(be.currentTime)-t}function ni(e){et.push(e)}function xr(e){et=et.filter(t=>t!==e)}function Ss(e){et.forEach(t=>{bs(t,e)})}function ii(e,t=!1){e.isLooping=t,wr(e),e.isPlaying=!0}function ri(e){e.isPlaying=!1,e.parts.forEach(t=>{Un(t.soundEffect)})}function Cr(){et.forEach(e=>{ri(e)})}function bs(e,t){!e.isPlaying||t<e.nextNotesTime||(e.nextNotesTime+=e.noteInterval,e.nextNotesTime<t-ln&&(e.nextNotesTime=Yn(t)),e.parts.forEach(n=>{Ps(e,n,e.nextNotesTime)}),e.notesStepsIndex++,e.notesStepsIndex>=e.notesStepsCount&&(e.isLooping?e.notesStepsIndex=0:e.isPlaying=!1))}const Ar={c:"coin",l:"laser",e:"explosion",p:"powerUp",h:"hit",j:"jump",s:"select",u:"random",r:"random",i:"click",y:"synth",t:"tone"},E=tn;let oi=1;function ws(e){oi=e}function xs(e,t,n,l,a,f,h){E.setSeed(oi+Xn(e)),Or(),kt=null;let g=E.select(f);const M=re(a,()=>{const b=Math.floor(Math.abs(E.get()+E.get()-1)*3),k=Math.floor((E.get()+E.get()-1)*10),R=Math.abs(E.get()+E.get()-1),S=E.get()<.25;S||(g=E.select(f));const D=E.get()<.5,B=E.get()<.5,G=E.get()<.9;return kr(n,g,t,.7,b,k,R,S,D,B,G,void 0,h)});return Lr(M,.5/l)}function Cs(e="0",t=!1,n=69-12,l=16,a=.25,f=4,h=1){E.setSeed(oi+Xn(e)),Or(),kt=null;let g=Ar[e[0]];g==null&&(g=ei[E.getInt(8)]);let M=.8;t&&(a/=4,M/=2);const b=re(f,()=>{const k=Math.floor(Math.abs(E.get()+E.get()-1)*3),R=Math.floor((E.get()+E.get()-1)*10),S=t?2:Math.abs(E.get()+E.get()-1),D=E.get()<.25,B=t?!1:E.get()<.5,G=E.get()<.5,Q=t?E.get()<.25:E.get()<.9,ce=E.get(.5);return kr(l,g,n,M,k,R,S,D,B,G,Q,ce,h)});return Lr(b,.5/a)}function Lr(e,t){const n=e.map(l=>{const a=[];return l.notes.forEach((f,h)=>{f!=null&&a.push({pitch:f+69,quantizedStartStep:h*2})}),Sr(void 0,{notes:a},l.soundEffect)});return br(n,e[0].notes.length*2,t)}let kt;function kr(e=32,t,n=60,l=1,a=0,f=0,h=1,g=!1,M=!1,b=!1,k=!1,R=null,S=.1){const D=Rs(t,Pr(n),l,S);if(kt!=null&&g)D.noteRatios=kt.noteRatios;else{const B=R!=null?ks(e,R):As(e);D.noteRatios=Ns(B,M?0:-1,1,h,k)}return D.notes=Os(D.noteRatios,a,f,b),kt=D,D}function As(e){let t=re(e,()=>!1),n=4;for(;n<=e;)t=Ls(t,n),n*=2;return t}function Ls(e,t){let n=re(t,()=>!1);const l=Math.floor(Math.abs(E.get()+E.get()-1)*4);for(let a=0;a<l;a++)n[E.getInt(t-1)]=!0;return e.map((a,f)=>n[f%t]?!a:a)}function ks(e,t){return re(e,()=>E.get()>=t)}const Nr=[[0,4,7],[0,3,7],[0,4,7,10],[0,4,7,11],[0,3,7,10]],Gn=[[[0,0],[7,0],[9,1],[4,1]],[[5,0],[0,0],[5,0],[7,0]],[[5,3],[7,2],[4,4],[9,1]],[[9,1],[2,1],[7,0],[0,0]],[[9,1],[5,0],[7,0],[0,0]]];let Xe;function Or(){Xe=E.select(Gn).map((t,n)=>[E.get()<.7?t[0]:Gn[E.getInt(Gn.length)][n][0],E.get()<.7?t[1]:E.getInt(Nr.length)])}function Ns(e,t,n,l,a){let f=E.get(),h=E.get(-.5,.5),M=e.length/Xe.length,b=[];return e.forEach((k,R)=>{let S=Math.floor(R/M),D=R%M;if(a&&S===Math.floor(Xe.length/2)){b.push(b[D]),b[D]!=null&&(f=b[D]);return}if(!k){b.push(null);return}b.push(f),h+=E.get(-.25,.25),f+=h*l,(E.get()<.2||f<=t||f>=n)&&(f-=h*2,h*=-1)}),b}function Os(e,t,n,l){let f=e.length/Xe.length;return e.map((h,g)=>{if(h==null)return null;let M=Math.floor(g/f),b=Xe[M][0],k=Nr[Xe[M][1]],R=h;l&&(R=Math.floor(R*2)/2);let S=Math.floor(R),D=Math.floor((R-S)*k.length);for(D+=t+E.getInt(-n,n+1);D>=k.length;)D-=k.length,S++;for(;D<0;)D+=k.length,S--;return b+S*12+k[D]})}function Rs(e,t,n,l){return{noteRatios:void 0,notes:void 0,soundEffect:nn(e,void 0,1,l,t,n,n)}}const rn=(e,t)=>Array(Math.abs(t)+1).join(e);function _s(e,t,n){return function(...l){return console.warn(`${e} is deprecated. Use ${t}.`),n.apply(this,l)}}function li(e){return e!==null&&typeof e=="object"&&typeof e.name=="string"}function si(e){return e!==null&&typeof e=="object"&&typeof e.step=="number"&&typeof e.alt=="number"}const Rr=[0,2,4,-1,1,3,5],_r=Rr.map(e=>Math.floor(e*7/12));function Er(e){const{step:t,alt:n,oct:l,dir:a=1}=e,f=Rr[t]+7*n;if(l===void 0)return[a*f];const h=l-_r[t]-4*n;return[a*f,a*h]}const Es=[3,0,4,1,5,2,6];function Dr(e){const[t,n,l]=e,a=Es[Ds(t)],f=Math.floor((t+1)/7);if(n===void 0)return{step:a,alt:f,dir:l};const h=n+4*f+_r[a];return{step:a,alt:f,oct:h,dir:l}}function Ds(e){const t=(e+1)%7;return t<0?7+t:t}const Ir={empty:!0,name:"",pc:"",acc:""},ir=new Map,Is=e=>"CDEFGAB".charAt(e),Fr=e=>e<0?rn("b",-e):rn("#",e),Tr=e=>e[0]==="b"?-e.length:e.length;function Y(e){const t=ir.get(e);if(t)return t;const n=typeof e=="string"?Gs(e):si(e)?Y(zs(e)):li(e)?Y(e.name):Ir;return ir.set(e,n),n}const Fs=/^([a-gA-G]?)(#{1,}|b{1,}|x{1,}|)(-?\d*)\s*(.*)$/;function Gr(e){const t=Fs.exec(e);return[t[1].toUpperCase(),t[2].replace(/x/g,"##"),t[3],t[4]]}function Hn(e){return Y(Dr(e))}const Ts=(e,t)=>(e%t+t)%t,zn=[0,2,4,5,7,9,11];function Gs(e){const t=Gr(e);if(t[0]===""||t[3]!=="")return Ir;const n=t[0],l=t[1],a=t[2],f=(n.charCodeAt(0)+3)%7,h=Tr(l),g=a.length?+a:void 0,M=Er({step:f,alt:h,oct:g}),b=n+l+a,k=n+l,R=(zn[f]+h+120)%12,S=g===void 0?Ts(zn[f]+h,12)-12*99:zn[f]+h+12*(g+1),D=S>=0&&S<=127?S:null,B=g===void 0?null:Math.pow(2,(S-69)/12)*440;return{empty:!1,acc:l,alt:h,chroma:R,coord:M,freq:B,height:S,letter:n,midi:D,name:b,oct:g,pc:k,step:f}}function zs(e){const{step:t,alt:n,oct:l}=e,a=Is(t);if(!a)return"";const f=a+Fr(n);return l||l===0?f+l:f}const Vn={empty:!0,name:"",acc:""},Bs="([-+]?\\d+)(d{1,4}|m|M|P|A{1,4})",js="(AA|A|P|M|m|d|dd)([-+]?\\d+)",qs=new RegExp("^"+Bs+"|"+js+"$");function Us(e){const t=qs.exec(`${e}`);return t===null?["",""]:t[1]?[t[1],t[2]]:[t[4],t[3]]}const rr={};function ke(e){return typeof e=="string"?rr[e]||(rr[e]=Hs(e)):si(e)?ke(Js(e)):li(e)?ke(e.name):Vn}const or=[0,2,4,5,7,9,11],zr="PMMPPMM";function Hs(e){const t=Us(e);if(t[0]==="")return Vn;const n=+t[0],l=t[1],a=(Math.abs(n)-1)%7,f=zr[a];if(f==="M"&&l==="P")return Vn;const h=f==="M"?"majorable":"perfectable",g=""+n+l,M=n<0?-1:1,b=n===8||n===-8?n:M*(a+1),k=$s(h,l),R=Math.floor((Math.abs(n)-1)/7),S=M*(or[a]+k+12*R),D=(M*(or[a]+k)%12+12)%12,B=Er({step:a,alt:k,oct:R,dir:M});return{empty:!1,name:g,num:n,q:l,step:a,alt:k,dir:M,type:h,simple:b,semitones:S,chroma:D,coord:B,oct:R}}function Vs(e,t){const[n,l=0]=e,a=n*7+l*12<0,f=t||a?[-n,-l,-1]:[n,l,1];return ke(Dr(f))}function $s(e,t){return t==="M"&&e==="majorable"||t==="P"&&e==="perfectable"?0:t==="m"&&e==="majorable"?-1:/^A+$/.test(t)?t.length:/^d+$/.test(t)?-1*(e==="perfectable"?t.length:t.length+1):0}function Js(e){const{step:t,alt:n,oct:l=0,dir:a}=e;if(!a)return"";const f=t+1+7*l,h=f===0?t+1:f,g=a<0?"-":"",M=zr[t]==="M"?"majorable":"perfectable";return g+h+Ks(M,n)}function Ks(e,t){return t===0?e==="majorable"?"M":"P":t===-1&&e==="majorable"?"m":t>0?rn("A",t):rn("d",e==="perfectable"?t:t+1)}function tt(e,t){const n=Y(e),l=ke(t);if(n.empty||l.empty)return"";const a=n.coord,f=l.coord,h=a.length===1?[a[0]+f[0]]:[a[0]+f[0],a[1]+f[1]];return Hn(h).name}function Br(e,t){const n=Y(e),l=Y(t);if(n.empty||l.empty)return"";const a=n.coord,f=l.coord,h=f[0]-a[0],g=a.length===2&&f.length===2?f[1]-a[1]:-Math.floor(h*7/12),M=l.height===n.height&&l.midi!==null&&n.midi!==null&&n.step>l.step;return Vs([h,g],M).name}function ai(e,t){const n=t.length,l=(e%n+n)%n;return t.slice(l,n).concat(t.slice(0,l))}function Ws(e){return e.filter(t=>t===0||t)}const Ue={empty:!0,name:"",setNum:0,chroma:"000000000000",normalized:"000000000000",intervals:[]},jr=e=>Number(e).toString(2),lr=e=>parseInt(e,2),Qs=/^[01]{12}$/;function qr(e){return Qs.test(e)}const Ys=e=>typeof e=="number"&&e>=0&&e<=4095,Zs=e=>e&&qr(e.chroma),sr={[Ue.chroma]:Ue};function He(e){const t=qr(e)?e:Ys(e)?jr(e):Array.isArray(e)?oa(e):Zs(e)?e.chroma:Ue.chroma;return sr[t]=sr[t]||ra(t)}const Xs=["1P","2m","2M","3m","3M","4P","5d","5P","6m","6M","7m","7M"];function ea(e){const t=[];for(let n=0;n<12;n++)e.charAt(n)==="1"&&t.push(Xs[n]);return t}function ta(e,t=!0){const l=He(e).chroma.split("");return Ws(l.map((a,f)=>{const h=ai(f,l);return t&&h[0]==="0"?null:h.join("")}))}function na(e){const t=He(e).setNum;return n=>{const l=He(n).setNum;return t&&t!==l&&(l&t)===l}}function Ur(e){const t=He(e).setNum;return n=>{const l=He(n).setNum;return t&&t!==l&&(l|t)===l}}function ia(e){const t=e.split("");return t.map((n,l)=>ai(l,t).join(""))}function ra(e){const t=lr(e),n=ia(e).map(lr).filter(f=>f>=2048).sort()[0],l=jr(n),a=ea(e);return{empty:!1,name:"",setNum:t,chroma:e,normalized:l,intervals:a}}function oa(e){if(e.length===0)return Ue.chroma;let t;const n=[0,0,0,0,0,0,0,0,0,0,0,0];for(let l=0;l<e.length;l++)t=Y(e[l]),t.empty&&(t=ke(e[l])),t.empty||(n[t.chroma]=1);return n.join("")}const la=[["1P 3M 5P","major","M ^ "],["1P 3M 5P 7M","major seventh","maj7 \u0394 ma7 M7 Maj7 ^7"],["1P 3M 5P 7M 9M","major ninth","maj9 \u03949 ^9"],["1P 3M 5P 7M 9M 13M","major thirteenth","maj13 Maj13 ^13"],["1P 3M 5P 6M","sixth","6 add6 add13 M6"],["1P 3M 5P 6M 9M","sixth/ninth","6/9 69 M69"],["1P 3M 6m 7M","major seventh flat sixth","M7b6 ^7b6"],["1P 3M 5P 7M 11A","major seventh sharp eleventh","maj#4 \u0394#4 \u0394#11 M7#11 ^7#11 maj7#11"],["1P 3m 5P","minor","m min -"],["1P 3m 5P 7m","minor seventh","m7 min7 mi7 -7"],["1P 3m 5P 7M","minor/major seventh","m/ma7 m/maj7 mM7 mMaj7 m/M7 -\u03947 m\u0394 -^7"],["1P 3m 5P 6M","minor sixth","m6 -6"],["1P 3m 5P 7m 9M","minor ninth","m9 -9"],["1P 3m 5P 7M 9M","minor/major ninth","mM9 mMaj9 -^9"],["1P 3m 5P 7m 9M 11P","minor eleventh","m11 -11"],["1P 3m 5P 7m 9M 13M","minor thirteenth","m13 -13"],["1P 3m 5d","diminished","dim \xB0 o"],["1P 3m 5d 7d","diminished seventh","dim7 \xB07 o7"],["1P 3m 5d 7m","half-diminished","m7b5 \xF8 -7b5 h7 h"],["1P 3M 5P 7m","dominant seventh","7 dom"],["1P 3M 5P 7m 9M","dominant ninth","9"],["1P 3M 5P 7m 9M 13M","dominant thirteenth","13"],["1P 3M 5P 7m 11A","lydian dominant seventh","7#11 7#4"],["1P 3M 5P 7m 9m","dominant flat ninth","7b9"],["1P 3M 5P 7m 9A","dominant sharp ninth","7#9"],["1P 3M 7m 9m","altered","alt7"],["1P 4P 5P","suspended fourth","sus4 sus"],["1P 2M 5P","suspended second","sus2"],["1P 4P 5P 7m","suspended fourth seventh","7sus4 7sus"],["1P 5P 7m 9M 11P","eleventh","11"],["1P 4P 5P 7m 9m","suspended fourth flat ninth","b9sus phryg 7b9sus 7b9sus4"],["1P 5P","fifth","5"],["1P 3M 5A","augmented","aug + +5 ^#5"],["1P 3m 5A","minor augmented","m#5 -#5 m+"],["1P 3M 5A 7M","augmented seventh","maj7#5 maj7+5 +maj7 ^7#5"],["1P 3M 5P 7M 9M 11A","major sharp eleventh (lydian)","maj9#11 \u03949#11 ^9#11"],["1P 2M 4P 5P","","sus24 sus4add9"],["1P 3M 5A 7M 9M","","maj9#5 Maj9#5"],["1P 3M 5A 7m","","7#5 +7 7+ 7aug aug7"],["1P 3M 5A 7m 9A","","7#5#9 7#9#5 7alt"],["1P 3M 5A 7m 9M","","9#5 9+"],["1P 3M 5A 7m 9M 11A","","9#5#11"],["1P 3M 5A 7m 9m","","7#5b9 7b9#5"],["1P 3M 5A 7m 9m 11A","","7#5b9#11"],["1P 3M 5A 9A","","+add#9"],["1P 3M 5A 9M","","M#5add9 +add9"],["1P 3M 5P 6M 11A","","M6#11 M6b5 6#11 6b5"],["1P 3M 5P 6M 7M 9M","","M7add13"],["1P 3M 5P 6M 9M 11A","","69#11"],["1P 3m 5P 6M 9M","","m69 -69"],["1P 3M 5P 6m 7m","","7b6"],["1P 3M 5P 7M 9A 11A","","maj7#9#11"],["1P 3M 5P 7M 9M 11A 13M","","M13#11 maj13#11 M13+4 M13#4"],["1P 3M 5P 7M 9m","","M7b9"],["1P 3M 5P 7m 11A 13m","","7#11b13 7b5b13"],["1P 3M 5P 7m 13M","","7add6 67 7add13"],["1P 3M 5P 7m 9A 11A","","7#9#11 7b5#9 7#9b5"],["1P 3M 5P 7m 9A 11A 13M","","13#9#11"],["1P 3M 5P 7m 9A 11A 13m","","7#9#11b13"],["1P 3M 5P 7m 9A 13M","","13#9"],["1P 3M 5P 7m 9A 13m","","7#9b13"],["1P 3M 5P 7m 9M 11A","","9#11 9+4 9#4"],["1P 3M 5P 7m 9M 11A 13M","","13#11 13+4 13#4"],["1P 3M 5P 7m 9M 11A 13m","","9#11b13 9b5b13"],["1P 3M 5P 7m 9m 11A","","7b9#11 7b5b9 7b9b5"],["1P 3M 5P 7m 9m 11A 13M","","13b9#11"],["1P 3M 5P 7m 9m 11A 13m","","7b9b13#11 7b9#11b13 7b5b9b13"],["1P 3M 5P 7m 9m 13M","","13b9"],["1P 3M 5P 7m 9m 13m","","7b9b13"],["1P 3M 5P 7m 9m 9A","","7b9#9"],["1P 3M 5P 9M","","Madd9 2 add9 add2"],["1P 3M 5P 9m","","Maddb9"],["1P 3M 5d","","Mb5"],["1P 3M 5d 6M 7m 9M","","13b5"],["1P 3M 5d 7M","","M7b5"],["1P 3M 5d 7M 9M","","M9b5"],["1P 3M 5d 7m","","7b5"],["1P 3M 5d 7m 9M","","9b5"],["1P 3M 7m","","7no5"],["1P 3M 7m 13m","","7b13"],["1P 3M 7m 9M","","9no5"],["1P 3M 7m 9M 13M","","13no5"],["1P 3M 7m 9M 13m","","9b13"],["1P 3m 4P 5P","","madd4"],["1P 3m 5P 6m 7M","","mMaj7b6"],["1P 3m 5P 6m 7M 9M","","mMaj9b6"],["1P 3m 5P 7m 11P","","m7add11 m7add4"],["1P 3m 5P 9M","","madd9"],["1P 3m 5d 6M 7M","","o7M7"],["1P 3m 5d 7M","","oM7"],["1P 3m 6m 7M","","mb6M7"],["1P 3m 6m 7m","","m7#5"],["1P 3m 6m 7m 9M","","m9#5"],["1P 3m 5A 7m 9M 11P","","m11A"],["1P 3m 6m 9m","","mb6b9"],["1P 2M 3m 5d 7m","","m9b5"],["1P 4P 5A 7M","","M7#5sus4"],["1P 4P 5A 7M 9M","","M9#5sus4"],["1P 4P 5A 7m","","7#5sus4"],["1P 4P 5P 7M","","M7sus4"],["1P 4P 5P 7M 9M","","M9sus4"],["1P 4P 5P 7m 9M","","9sus4 9sus"],["1P 4P 5P 7m 9M 13M","","13sus4 13sus"],["1P 4P 5P 7m 9m 13m","","7sus4b9b13 7b9b13sus4"],["1P 4P 7m 10m","","4 quartal"],["1P 5P 7m 9m 11P","","11b9"]],sa={...Ue,name:"",quality:"Unknown",intervals:[],aliases:[]};let ci=[],Nt={};function aa(e){return Nt[e]||sa}function ui(){return ci.slice()}function ca(e,t,n){const l=fa(e),a={...He(e),name:n||"",quality:l,intervals:e,aliases:t};ci.push(a),a.name&&(Nt[a.name]=a),Nt[a.setNum]=a,Nt[a.chroma]=a,a.aliases.forEach(f=>ua(a,f))}function ua(e,t){Nt[t]=e}function fa(e){const t=n=>e.indexOf(n)!==-1;return t("5A")?"Augmented":t("3M")?"Major":t("5d")?"Diminished":t("3m")?"Minor":"Unknown"}la.forEach(([e,t,n])=>ca(e.split(" "),n.split(" "),t));ci.sort((e,t)=>e.setNum-t.setNum);const da=e=>{const t=e.reduce((n,l)=>{const a=Y(l).chroma;return a!==void 0&&(n[a]=n[a]||Y(l).name),n},{});return n=>t[n]};function ha(e){const t=e.map(l=>Y(l).pc).filter(l=>l);return Y.length===0?[]:ma(t,1).filter(l=>l.weight).sort((l,a)=>a.weight-l.weight).map(l=>l.name)}function ma(e,t){const n=e[0],l=Y(n).chroma,a=da(e),f=ta(e,!1),h=[];return f.forEach((g,M)=>{ui().filter(k=>k.chroma===g).forEach(k=>{const R=k.aliases[0],S=a(M);M!==l?h.push({weight:.5*t,name:`${S}${R}/${n}`}):h.push({weight:1*t,name:`${S}${R}`})})}),h}const pa=[["1P 2M 3M 5P 6M","major pentatonic","pentatonic"],["1P 3M 4P 5P 7M","ionian pentatonic"],["1P 3M 4P 5P 7m","mixolydian pentatonic","indian"],["1P 2M 4P 5P 6M","ritusen"],["1P 2M 4P 5P 7m","egyptian"],["1P 3M 4P 5d 7m","neopolitan major pentatonic"],["1P 3m 4P 5P 6m","vietnamese 1"],["1P 2m 3m 5P 6m","pelog"],["1P 2m 4P 5P 6m","kumoijoshi"],["1P 2M 3m 5P 6m","hirajoshi"],["1P 2m 4P 5d 7m","iwato"],["1P 2m 4P 5P 7m","in-sen"],["1P 3M 4A 5P 7M","lydian pentatonic","chinese"],["1P 3m 4P 6m 7m","malkos raga"],["1P 3m 4P 5d 7m","locrian pentatonic","minor seven flat five pentatonic"],["1P 3m 4P 5P 7m","minor pentatonic","vietnamese 2"],["1P 3m 4P 5P 6M","minor six pentatonic"],["1P 2M 3m 5P 6M","flat three pentatonic","kumoi"],["1P 2M 3M 5P 6m","flat six pentatonic"],["1P 2m 3M 5P 6M","scriabin"],["1P 3M 5d 6m 7m","whole tone pentatonic"],["1P 3M 4A 5A 7M","lydian #5P pentatonic"],["1P 3M 4A 5P 7m","lydian dominant pentatonic"],["1P 3m 4P 5P 7M","minor #7M pentatonic"],["1P 3m 4d 5d 7m","super locrian pentatonic"],["1P 2M 3m 4P 5P 7M","minor hexatonic"],["1P 2A 3M 5P 5A 7M","augmented"],["1P 2M 3m 3M 5P 6M","major blues"],["1P 2M 4P 5P 6M 7m","piongio"],["1P 2m 3M 4A 6M 7m","prometheus neopolitan"],["1P 2M 3M 4A 6M 7m","prometheus"],["1P 2m 3M 5d 6m 7m","mystery #1"],["1P 2m 3M 4P 5A 6M","six tone symmetric"],["1P 2M 3M 4A 5A 7m","whole tone","messiaen's mode #1"],["1P 2m 4P 4A 5P 7M","messiaen's mode #5"],["1P 3m 4P 5d 5P 7m","minor blues","blues"],["1P 2M 3M 4P 5d 6m 7m","locrian major","arabian"],["1P 2m 3M 4A 5P 6m 7M","double harmonic lydian"],["1P 2M 3m 4P 5P 6m 7M","harmonic minor"],["1P 2m 2A 3M 4A 6m 7m","altered","super locrian","diminished whole tone","pomeroy"],["1P 2M 3m 4P 5d 6m 7m","locrian #2","half-diminished","aeolian b5"],["1P 2M 3M 4P 5P 6m 7m","mixolydian b6","melodic minor fifth mode","hindu"],["1P 2M 3M 4A 5P 6M 7m","lydian dominant","lydian b7","overtone"],["1P 2M 3M 4A 5P 6M 7M","lydian"],["1P 2M 3M 4A 5A 6M 7M","lydian augmented"],["1P 2m 3m 4P 5P 6M 7m","dorian b2","phrygian #6","melodic minor second mode"],["1P 2M 3m 4P 5P 6M 7M","melodic minor"],["1P 2m 3m 4P 5d 6m 7m","locrian"],["1P 2m 3m 4d 5d 6m 7d","ultralocrian","superlocrian bb7","superlocrian diminished"],["1P 2m 3m 4P 5d 6M 7m","locrian 6","locrian natural 6","locrian sharp 6"],["1P 2A 3M 4P 5P 5A 7M","augmented heptatonic"],["1P 2M 3m 4A 5P 6M 7m","dorian #4","ukrainian dorian","romanian minor","altered dorian"],["1P 2M 3m 4A 5P 6M 7M","lydian diminished"],["1P 2m 3m 4P 5P 6m 7m","phrygian"],["1P 2M 3M 4A 5A 7m 7M","leading whole tone"],["1P 2M 3M 4A 5P 6m 7m","lydian minor"],["1P 2m 3M 4P 5P 6m 7m","phrygian dominant","spanish","phrygian major"],["1P 2m 3m 4P 5P 6m 7M","balinese"],["1P 2m 3m 4P 5P 6M 7M","neopolitan major"],["1P 2M 3m 4P 5P 6m 7m","aeolian","minor"],["1P 2M 3M 4P 5P 6m 7M","harmonic major"],["1P 2m 3M 4P 5P 6m 7M","double harmonic major","gypsy"],["1P 2M 3m 4P 5P 6M 7m","dorian"],["1P 2M 3m 4A 5P 6m 7M","hungarian minor"],["1P 2A 3M 4A 5P 6M 7m","hungarian major"],["1P 2m 3M 4P 5d 6M 7m","oriental"],["1P 2m 3m 3M 4A 5P 7m","flamenco"],["1P 2m 3m 4A 5P 6m 7M","todi raga"],["1P 2M 3M 4P 5P 6M 7m","mixolydian","dominant"],["1P 2m 3M 4P 5d 6m 7M","persian"],["1P 2M 3M 4P 5P 6M 7M","major","ionian"],["1P 2m 3M 5d 6m 7m 7M","enigmatic"],["1P 2M 3M 4P 5A 6M 7M","major augmented","major #5","ionian augmented","ionian #5"],["1P 2A 3M 4A 5P 6M 7M","lydian #9"],["1P 2m 2M 4P 4A 5P 6m 7M","messiaen's mode #4"],["1P 2m 3M 4P 4A 5P 6m 7M","purvi raga"],["1P 2m 3m 3M 4P 5P 6m 7m","spanish heptatonic"],["1P 2M 3M 4P 5P 6M 7m 7M","bebop"],["1P 2M 3m 3M 4P 5P 6M 7m","bebop minor"],["1P 2M 3M 4P 5P 5A 6M 7M","bebop major"],["1P 2m 3m 4P 5d 5P 6m 7m","bebop locrian"],["1P 2M 3m 4P 5P 6m 7m 7M","minor bebop"],["1P 2M 3m 4P 5d 6m 6M 7M","diminished","whole-half diminished"],["1P 2M 3M 4P 5d 5P 6M 7M","ichikosucho"],["1P 2M 3m 4P 5P 6m 6M 7M","minor six diminished"],["1P 2m 3m 3M 4A 5P 6M 7m","half-whole diminished","dominant diminished","messiaen's mode #2"],["1P 3m 3M 4P 5P 6M 7m 7M","kafi raga"],["1P 2M 3M 4P 4A 5A 6A 7M","messiaen's mode #6"],["1P 2M 3m 3M 4P 5d 5P 6M 7m","composite blues"],["1P 2M 3m 3M 4A 5P 6m 7m 7M","messiaen's mode #3"],["1P 2m 2M 3m 4P 4A 5P 6m 6M 7M","messiaen's mode #7"],["1P 2m 2M 3m 3M 4P 5d 5P 6m 6M 7m 7M","chromatic"]],ga={...Ue,intervals:[],aliases:[]};let Hr=[],Ot={};function ya(e){return Ot[e]||ga}function Ma(){return Hr.slice()}function Pa(e,t,n=[]){const l={...He(e),name:t,intervals:e,aliases:n};return Hr.push(l),Ot[l.name]=l,Ot[l.setNum]=l,Ot[l.chroma]=l,l.aliases.forEach(a=>va(l,a)),l}function va(e,t){Ot[t]=e}pa.forEach(([e,t,...n])=>Pa(e.split(" "),t,n));const $n={empty:!0,name:"",symbol:"",root:"",rootDegree:0,type:"",tonic:null,setNum:NaN,quality:"Unknown",chroma:"",normalized:"",aliases:[],notes:[],intervals:[]},Sa=/^(6|64|7|9|11|13)$/;function sn(e){const[t,n,l,a]=Gr(e);return t===""?["",e]:t==="A"&&a==="ug"?["","aug"]:!a&&(l==="4"||l==="5")?[t+n,l]:Sa.test(l)?[t+n,l+a]:[t+n+l,a]}function Dt(e){if(e==="")return $n;if(Array.isArray(e)&&e.length===2)return Xt(e[1],e[0]);{const[t,n]=sn(e),l=Xt(n,t);return l.empty?Xt(e):l}}function Xt(e,t,n){const l=aa(e),a=Y(t||""),f=Y(n||"");if(l.empty||t&&a.empty||n&&f.empty)return $n;const h=Br(a.pc,f.pc),g=l.intervals.indexOf(h)+1;if(!f.empty&&!g)return $n;const M=Array.from(l.intervals);for(let S=1;S<g;S++){const D=M[0][0],B=M[0][1],G=parseInt(D,10)+7;M.push(`${G}${B}`),M.shift()}const b=a.empty?[]:M.map(S=>tt(a,S));e=l.aliases.indexOf(e)!==-1?e:l.aliases[0];const k=`${a.empty?"":a.pc}${e}${f.empty||g<=1?"":"/"+f.pc}`,R=`${t?a.pc+" ":""}${l.name}${g>1&&n?" over "+f.pc:""}`;return{...l,name:R,symbol:k,type:l.name,root:f.name,intervals:M,rootDegree:g,tonic:a.name,notes:b}}const ba=_s("Chord.chord","Chord.get",Dt);function wa(e,t){const[n,l]=sn(e);return n?tt(n,t)+l:e}function xa(e){const t=Dt(e),n=Ur(t.chroma);return Ma().filter(l=>n(l.chroma)).map(l=>l.name)}function Ca(e){const t=Dt(e),n=Ur(t.chroma);return ui().filter(l=>n(l.chroma)).map(l=>t.tonic+l.aliases[0])}function Aa(e){const t=Dt(e),n=na(t.chroma);return ui().filter(l=>n(l.chroma)).map(l=>t.tonic+l.aliases[0])}var La={getChord:Xt,get:Dt,detect:ha,chordScales:xa,extended:Ca,reduced:Aa,tokenize:sn,transpose:wa,chord:ba};const ka=Math.log(2),Na=Math.log(440);function Vr(e){const t=12*(Math.log(e)-Na)/ka+69;return Math.round(t*100)/100}const Oa="C C# D D# E F F# G G# A A# B".split(" "),Ra="C Db D Eb E F Gb G Ab A Bb B".split(" ");function nt(e,t={}){if(isNaN(e)||e===-1/0||e===1/0)return"";e=Math.round(e);const l=(t.sharps===!0?Oa:Ra)[e%12];if(t.pitchClass)return l;const a=Math.floor(e/12)-1;return l+a}const _a=["C","D","E","F","G","A","B"],$r=e=>e.name,Jr=e=>e.map(Y).filter(t=>!t.empty);function Ea(e){return e===void 0?_a.slice():Array.isArray(e)?Jr(e).map($r):[]}const ae=Y,Da=e=>ae(e).name,Ia=e=>ae(e).pc,Fa=e=>ae(e).acc,Ta=e=>ae(e).oct,Ga=e=>ae(e).midi,za=e=>ae(e).freq,Ba=e=>ae(e).chroma;function ja(e){return nt(e)}function qa(e){return nt(Vr(e))}function Ua(e){return nt(Vr(e),{sharps:!0})}function Ha(e){return nt(e,{sharps:!0})}const fi=tt,Va=tt,Kr=e=>t=>fi(t,e),$a=Kr,Wr=e=>t=>fi(e,t),Ja=Wr;function Qr(e,t){const n=ae(e);if(n.empty)return"";const[l,a]=n.coord;return Hn(a===void 0?[l+t]:[l+t,a]).name}const Ka=Qr,di=(e,t)=>e.height-t.height,Wa=(e,t)=>t.height-e.height;function Yr(e,t){return t=t||di,Jr(e).sort(t).map($r)}function Qa(e){return Yr(e,di).filter((t,n,l)=>n===0||t!==l[n-1])}const Ya=e=>{const t=ae(e);return t.empty?"":nt(t.midi||t.chroma,{sharps:t.alt>0,pitchClass:t.midi===null})};function Za(e,t){const n=ae(e);if(n.empty)return"";const l=ae(t||nt(n.midi||n.chroma,{sharps:n.alt<0,pitchClass:!0}));if(l.empty||l.chroma!==n.chroma)return"";if(n.oct===void 0)return l.pc;const a=n.chroma-n.alt,f=l.chroma-l.alt,h=a>11||f<0?-1:a<0||f>11?1:0,g=n.oct+h;return l.pc+g}var Xa={names:Ea,get:ae,name:Da,pitchClass:Ia,accidentals:Fa,octave:Ta,midi:Ga,ascending:di,descending:Wa,sortedNames:Yr,sortedUniqNames:Qa,fromMidi:ja,fromMidiSharps:Ha,freq:za,fromFreq:qa,fromFreqSharps:Ua,chroma:Ba,transpose:fi,tr:Va,transposeBy:Kr,trBy:$a,transposeFrom:Wr,trFrom:Ja,transposeFifths:Qr,trFifths:Ka,simplify:Ya,enharmonic:Za};const Zr={empty:!0,name:"",chordType:""},ar={};function Et(e){return typeof e=="string"?ar[e]||(ar[e]=rc(e)):typeof e=="number"?Et(hi[e]||""):si(e)?ec(e):li(e)?Et(e.name):Zr}function ec(e){return Et(Fr(e.alt)+hi[e.step])}const tc=/^(#{1,}|b{1,}|x{1,}|)(IV|I{1,3}|VI{0,2}|iv|i{1,3}|vi{0,2})([^IViv]*)$/;function nc(e){return tc.exec(e)||["","","",""]}const ic="I II III IV V VI VII",hi=ic.split(" ");function rc(e){const[t,n,l,a]=nc(e);if(!l)return Zr;const f=l.toUpperCase(),h=hi.indexOf(f),g=Tr(n),M=1;return{empty:!1,name:t,roman:l,interval:ke({step:h,alt:g,dir:M}).name,acc:n,chordType:a,alt:g,step:h,major:l===f,oct:0,dir:M}}Object.freeze([]);const mi=[[0,2773,0,"ionian","","Maj7","major"],[1,2902,2,"dorian","m","m7"],[2,3418,4,"phrygian","m","m7"],[3,2741,-1,"lydian","","Maj7"],[4,2774,1,"mixolydian","","7"],[5,2906,3,"aeolian","m","m7","minor"],[6,3434,5,"locrian","dim","m7b5"]],cr={...Ue,name:"",alt:0,modeNum:NaN,triad:"",seventh:"",aliases:[]},oc=mi.map(lc),Jn={};oc.forEach(e=>{Jn[e.name]=e,e.aliases.forEach(t=>{Jn[t]=e})});function Xr(e){return typeof e=="string"?Jn[e.toLowerCase()]||cr:e&&e.name?Xr(e.name):cr}function lc(e){const[t,n,l,a,f,h,g]=e,M=g?[g]:[],b=Number(n).toString(2),k=ya(a).intervals;return{empty:!1,intervals:k,modeNum:t,chroma:b,normalized:b,name:a,setNum:n,alt:l,triad:f,seventh:h,aliases:M}}function eo(e){return(t,n)=>{const l=Xr(t);if(l.empty)return[];const a=ai(l.modeNum,e),f=l.intervals.map(h=>tt(n,h));return a.map((h,g)=>f[g]+h)}}eo(mi.map(e=>e[4]));eo(mi.map(e=>e[5]));function sc(e,t){return t.map(Et).map(l=>tt(e,ke(l))+l.chordType)}function ac(e,t){return t.map(n=>{const[l,a]=sn(n),f=Br(e,l);return Et(ke(f)).name+a})}var cc={fromRomanNumerals:sc,toRomanNumerals:ac};const uc={seed:0,noteLength:32,partCount:4,drumPartRatio:.5},V=new Zn;let to=1;function fc(e){to=e}function dc(e){const t={...uc,...e};V.setSeed(to+t.seed);const n=gc(t.noteLength);return re(t.partCount,()=>V.get()<t.drumPartRatio?mc(t.noteLength):hc(t.noteLength,n))}function hc(e,t){const n=no(e,1),l=re(e,()=>V.get()<.8),a=V.select([[0,2],[0,1,2],[0,1,2,3]]);let f=V.select(["tone","tone","tone","select","laser","synth","hit"]),h=V.getInt(36,50);(f==="synth"||f==="select")&&(h=Math.floor(h*.6));const g=V.getInt(-1,1),M=16;let b=`@${f}@s${V.getInt(999999999)} v${h} l${M} `,k=-1,R=!1;for(let S=0;S<e;S++){if(!n[S]){b+="r",R=!1;continue}if(l[S]&&R){b+="^";continue}R=!0;const D=t[S][V.select(a)];let B=Number.parseFloat(D.charAt(D.length-1))+g,G=D.substring(0,D.length-1).replace("#","+").replace("b","-").toLowerCase();B!==k&&(b+=` o${B}`,k=B),b+=G}return b}function mc(e){const t=no(e,3),n=re(e,()=>V.get()<.4),l=V.select(["hit","hit","click","explosion"]);let a=V.getInt(36,50);(l==="click"||l==="explosion")&&(a=Math.floor(a*.5));const f=16;let h=`@${l}@d@s${V.getInt(999999999)} v${a} l${f} `,g=!1;for(let M=0;M<e;M++){if(!t[M]){h+="r",g=!1;continue}if(n[M]&&g){h+="^";continue}g=!0,h+="c"}return h}const Bn=[["I","IIIm","VIm"],["IV","IIm"],["V","VIIm"]],pc=[[0,1,2],[1,2,0],[2,0]];function gc(e){const t=V.select(["C","D","Eb","F","G","A","Bb"]),n=4,l=4;let a,f,h,g;return re(e,M=>{if(M%l===0){M===0?(f=V.getInt(Bn.length-1),a=V.select(Bn[f])):V.get()<.8-M/l%2*.5&&(f=V.select(pc[f]),a=V.select(Bn[f]));const b=cc.fromRomanNumerals(`${t}${n}`,[a])[0];b.charAt(b.length-1)==="m"?(h="m7",g=b.substring(0,b.length-1)):(h="7",g=b)}return La.getChord(h,g).notes})}function no(e,t){let n=re(e,()=>!1),l=4;for(;l<=e;)n=yc(n,l,t),l*=2;return n}function yc(e,t,n){let l=re(t,()=>!1);return re(n,()=>{l[V.getInt(t)]=!0}),e.map((a,f)=>l[f%t]?!a:a)}let Rt;function pi(e,t){const n={seed:0,numberOfSounds:2,volume:1,...t},l=`${e}_${JSON.stringify(n)}_${Rt}`;if(Lt[l]!=null)return nr(Lt[l]),Lt[l];let a;n.freq!=null?a=n.freq:n.pitch!=null?a=Pr(n.pitch):n.note!=null&&(a=Xa.get(n.note.toUpperCase().replace("+","#").replace("-","b")).freq);let f=n.numberOfSounds,h=1,g=1;e==="synth"?h=g=.2:e==="tone"&&(h=g=.1,f=1);const M=nn(e,n.seed+Rt,f,n.volume,a,h,g);return ms(M),Lt[l]=M,nr(M),M}const Kn=.125;let Lt,Ze;function Wn(e,t){gi();const n={volume:1,speed:1,isLooping:!0,...t};let l=0;const a=e.map(g=>Ms(g));a.forEach(g=>{const M=vc(g.mml);M>l&&(l=M)});const f=a.map(g=>{const{mml:M,args:b}=g,k=Sc(M,l),R=ds(k,b.isDrum,b.seed,b.type,b.volume*n.volume);return Sr(M,k,R)}),h=br(f,l,n.speed);return ni(h),ii(h,n.isLooping),n.isLooping&&(Ze=h),h}function gi(e){let t=e;if(t==null)if(Ze!=null)t=Ze,Ze=void 0;else return;ri(t),xr(t),Ze=void 0}function Qn(e){return dc(e)}function Mc(){const e=be.currentTime;Ss(e),us(e)}function Pc(e=1,t=void 0){on(e),os(t),io()}function io(){vs(),Ze=void 0,en={},cs(),Lt={}}function on(e=1){Rt=e,ws(Rt),fc(Rt)}function vc(e){const t=new hr(e);for(let n of t)if(n.type==="end")return Math.floor(n.time/Kn)}function Sc(e,t){const n=[],l=new hr(e);for(let a of l)if(a.type==="note"){let f=Math.floor((a.time+a.duration)/Kn);f>=t&&(f-=t),n.push({pitch:a.noteNumber,quantizedStartStep:Math.floor(a.time/Kn),quantizedEndStep:f})}return{notes:n}}let en,qe;function bc(e="0",t=2,n,l=1){pi(Ar[e[0]],{seed:Xn(e),numberOfSounds:t,pitch:n,volume:l})}function wc(e="0",t=69-24,n=32,l=.25,a=4,f=["laser","select","hit","hit"],h=1){ro(),qe=xs(e,t,n,l,a,f,h),ni(qe),ii(qe,!0)}function ro(){qe!=null&&(ri(qe),xr(qe),qe=void 0)}function xc(e="0",t=!1,n=69-12,l=16,a=.25,f=4,h=1){const g=`${e}_${t}_${n}_${l}_${a}_${f}_${h}`;if(en[g]==null){const M=Cs(e,t,n,l,a,f,h);ni(M),en[g]=M}ii(en[g])}function Cc(){Cr()}const Ac=Object.freeze(Object.defineProperty({__proto__:null,setTempo:pr,setQuantize:gr,setVolume:yr,playEmpty:Mr,resumeAudioContext:ss,startAudio:ls,playSoundEffect:pi,playMml:Wn,stopMml:gi,generateMml:Qn,update:Mc,init:Pc,reset:io,setSeed:on,play:bc,playBgm:wc,stopBgm:ro,playJingle:xc,stopJingles:Cc},Symbol.toStringTag,{value:"Module"}));(function(e,t){function n(o,i=0,s=1){return Math.max(i,Math.min(o,s))}function l(o,i,s){const u=s-i,d=o-i;if(d>=0)return d%u+i;{let p=u+d%u+i;return p>=s&&(p-=u),p}}function a(o,i,s){return i<=o&&o<s}function f(o){return[...Array(o).keys()]}function h(o,i){return f(o).map(s=>i(s))}function g(o,i){let s=[];for(let u=0,d=0;u<o.length;d++)i(o[u],d)?(s.push(o[u]),o.splice(u,1)):u++;return s}function M(o){return[...o].reduce((i,[s,u])=>(i[s]=u,i),{})}function b(o){return Object.keys(o).map(i=>[i,o[i]])}function k(o,i){return String.fromCharCode(o.charCodeAt(0)+i)}function R(o){return o.x!=null&&o.y!=null}class S{constructor(i,s){this.x=0,this.y=0,this.set(i,s)}set(i=0,s=0){return R(i)?(this.x=i.x,this.y=i.y,this):(this.x=i,this.y=s,this)}add(i,s){return R(i)?(this.x+=i.x,this.y+=i.y,this):(this.x+=i,this.y+=s,this)}sub(i,s){return R(i)?(this.x-=i.x,this.y-=i.y,this):(this.x-=i,this.y-=s,this)}mul(i){return this.x*=i,this.y*=i,this}div(i){return this.x/=i,this.y/=i,this}clamp(i,s,u,d){return this.x=n(this.x,i,s),this.y=n(this.y,u,d),this}wrap(i,s,u,d){return this.x=l(this.x,i,s),this.y=l(this.y,u,d),this}addWithAngle(i,s){return this.x+=Math.cos(i)*s,this.y+=Math.sin(i)*s,this}swapXy(){const i=this.x;return this.x=this.y,this.y=i,this}normalize(){return this.div(this.length),this}rotate(i){if(i===0)return this;const s=this.x;return this.x=s*Math.cos(i)-this.y*Math.sin(i),this.y=s*Math.sin(i)+this.y*Math.cos(i),this}angleTo(i,s){return R(i)?Math.atan2(i.y-this.y,i.x-this.x):Math.atan2(s-this.y,i-this.x)}distanceTo(i,s){let u,d;return R(i)?(u=i.x-this.x,d=i.y-this.y):(u=i-this.x,d=s-this.y),Math.sqrt(u*u+d*d)}isInRect(i,s,u,d){return a(this.x,i,i+u)&&a(this.y,s,s+d)}equals(i){return this.x===i.x&&this.y===i.y}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}get length(){return Math.sqrt(this.x*this.x+this.y*this.y)}get angle(){return Math.atan2(this.y,this.x)}}const D=["transparent","white","red","green","yellow","blue","purple","cyan","black","light_red","light_green","light_yellow","light_blue","light_purple","light_cyan","light_black"],B="twrgybpclRGYBPCL";let G;const Q=[15658734,15277667,5025616,16761095,4149685,10233776,240116,6381921];function ce(o){const[i,s,u]=Ve(0,o);if(G=M(D.map((d,p)=>{if(p<1)return[d,{r:0,g:0,b:0,a:0}];if(p<9){const[L,I,F]=Ve(p-1,o);return[d,{r:L,g:I,b:F,a:1}]}const[v,w,_]=Ve(p-9+1,o);return[d,{r:Math.floor(o?v*.5:i-(i-v)*.5),g:Math.floor(o?w*.5:u-(u-w)*.5),b:Math.floor(o?_*.5:s-(s-_)*.5),a:1}]})),o){const d=G.blue;G.white={r:Math.floor(d.r*.15),g:Math.floor(d.g*.15),b:Math.floor(d.b*.15),a:1}}}function Ve(o,i){i&&(o===0?o=7:o===7&&(o=0));const s=Q[o];return[(s&16711680)>>16,(s&65280)>>8,s&255]}function we(o,i=1){const s=G[o];return Math.floor(s.r*i)<<16|Math.floor(s.g*i)<<8|Math.floor(s.b*i)}function Ne(o,i=1){const s=G[o],u=Math.floor(s.r*i),d=Math.floor(s.g*i),p=Math.floor(s.b*i);return s.a<1?`rgba(${u},${d},${p},${s.a})`:`rgb(${u},${d},${p})`}const It=[`
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

`];let ue,$e;function an(){ue=[],$e=[]}function Oe(){ue=ue.concat($e),$e=[]}function y(o){let i={isColliding:{rect:{},text:{},char:{}}};return ue.forEach(s=>{Re(o,s)&&(i=Object.assign(Object.assign(Object.assign({},i),Je(s.collision.isColliding.rect)),{isColliding:{rect:Object.assign(Object.assign({},i.isColliding.rect),s.collision.isColliding.rect),text:Object.assign(Object.assign({},i.isColliding.text),s.collision.isColliding.text),char:Object.assign(Object.assign({},i.isColliding.char),s.collision.isColliding.char)}}))}),i}function Re(o,i){const s=i.pos.x-o.pos.x,u=i.pos.y-o.pos.y;return-i.size.x<s&&s<o.size.x&&-i.size.y<u&&u<o.size.y}function Je(o){if(o==null)return{};const i={transparent:"tr",white:"wh",red:"rd",green:"gr",yellow:"yl",blue:"bl",purple:"pr",cyan:"cy",black:"lc"};let s={};return b(o).forEach(([u,d])=>{const p=i[u];d&&p!=null&&(s[p]=!0)}),s}function _e(o,i,s,u){return it(!1,o,i,s,u)}function cn(o,i,s,u){return it(!0,o,i,s,u)}function it(o,i,s,u,d){if(typeof s=="number"){if(typeof u=="number")return U(i,s,u,Object.assign({isCharacter:o,isCheckingCollision:!0,color:X},d));throw"invalid params"}else return U(i,s.x,s.y,Object.assign({isCharacter:o,isCheckingCollision:!0,color:X},u))}const oe=6,r=1,c=oe*r;let m,P,x,A=!1,C,N;const O={color:"black",backgroundColor:"transparent",rotation:0,mirror:{x:1,y:1},scale:{x:1,y:1},isCharacter:!1,isCheckingCollision:!1};function j(){C=document.createElement("canvas"),C.width=C.height=c,N=C.getContext("2d"),m=It.map((o,i)=>Object.assign(Object.assign({},ot(o)),{hitBox:xe(String.fromCharCode(33+i),!1)})),P=It.map((o,i)=>Object.assign(Object.assign({},ot(o)),{hitBox:xe(String.fromCharCode(33+i),!0)})),x={}}function q(o,i){const s=i.charCodeAt(0)-33;o.forEach((u,d)=>{P[s+d]=Object.assign(Object.assign({},ot(u)),{hitBox:xe(String.fromCharCode(33+s+d),!0)})})}function Z(){A=!0}function U(o,i,s,u={}){const d=Ft(u);i-=c/2*d.scale.x,s-=c/2*d.scale.y;const p=Math.floor(i);let v=o,w=p,_=Math.floor(s),L={isColliding:{rect:{},text:{},char:{}}};for(let I=0;I<v.length;I++){const F=v[I];if(F===`
`){w=p,_+=c*d.scale.y;continue}const J=he(F,w,_,d);d.isCheckingCollision&&(L={isColliding:{rect:Object.assign(Object.assign({},L.isColliding.rect),J.isColliding.rect),text:Object.assign(Object.assign({},L.isColliding.text),J.isColliding.text),char:Object.assign(Object.assign({},L.isColliding.char),J.isColliding.char)}}),w+=c*d.scale.x}return L}function he(o,i,s,u){const d=o.charCodeAt(0);if(d<32||d>126)return{isColliding:{rect:{},text:{},char:{}}};const p=Ft(u);if(p.backgroundColor!=="transparent"&&(fn(),Ke(p.backgroundColor),ut(i,s,c*p.scale.x,c*p.scale.y),dn()),d<=32)return{isColliding:{rect:{},text:{},char:{}}};const v=d-33,w=p.isCharacter?P[v]:m[v],_=l(p.rotation,0,4);if(p.color==="black"&&_===0&&p.mirror.x===1&&p.mirror.y===1)return rt(w,i,s,p.scale,p.isCheckingCollision,!0);const L=JSON.stringify({c:o,options:p}),I=x[L];if(I!=null)return rt(I,i,s,p.scale,p.isCheckingCollision,p.color!=="transparent");N.clearRect(0,0,c,c),_===0&&p.mirror.x===1&&p.mirror.y===1?N.drawImage(w.image,0,0):(N.save(),N.translate(c/2,c/2),N.rotate(Math.PI/2*_),(p.mirror.x===-1||p.mirror.y===-1)&&N.scale(p.mirror.x,p.mirror.y),N.drawImage(w.image,-c/2,-c/2),N.restore()),p.color!=="black"&&(N.globalCompositeOperation="source-in",N.fillStyle=Ne(p.color==="transparent"?"black":p.color),N.fillRect(0,0,c,c),N.globalCompositeOperation="source-over");const F=xe(o,p.isCharacter);let J;if(A||T.isUsingPixi){const de=document.createElement("img");de.src=C.toDataURL(),T.isUsingPixi&&(J=t.Texture.from(de)),A&&(x[L]={image:de,texture:J,hitBox:F})}return rt({image:C,texture:J,hitBox:F},i,s,p.scale,p.isCheckingCollision,p.color!=="transparent")}function rt(o,i,s,u,d,p){if(p&&(u.x===1&&u.y===1?vi(o,i,s):vi(o,i,s,c*u.x,c*u.y)),!d)return;const v={pos:{x:i+o.hitBox.pos.x,y:s+o.hitBox.pos.y},size:{x:o.hitBox.size.x*u.x,y:o.hitBox.size.y*u.y},collision:o.hitBox.collision},w=y(v);return p&&ue.push(v),w}function ot(o,i=!0){N.clearRect(0,0,c,c);let s=o.split(`
`);i&&(s=s.slice(1,s.length-1));let u=0;s.forEach(_=>{u=Math.max(_.length,u)});const d=Math.max(Math.ceil((oe-u)/2),0),p=s.length,v=Math.max(Math.ceil((oe-p)/2),0);s.forEach((_,L)=>{if(!(L+v>=oe))for(let I=0;I<oe-d;I++){const F=_.charAt(I);let J=B.indexOf(F);F!==""&&J>=1&&(N.fillStyle=Ne(D[J]),N.fillRect((I+d)*r,(L+v)*r,r,r))}});const w=document.createElement("img");return w.src=C.toDataURL(),T.isUsingPixi?{image:w,texture:t.Texture.from(w)}:{image:w}}function xe(o,i){const s={pos:new S(c,c),size:new S,collision:{isColliding:{char:{},text:{}}}};i?s.collision.isColliding.char[o]=!0:s.collision.isColliding.text[o]=!0;const u=N.getImageData(0,0,c,c).data;let d=0;for(let p=0;p<c;p++)for(let v=0;v<c;v++)u[d+3]>0&&(v<s.pos.x&&(s.pos.x=v),p<s.pos.y&&(s.pos.y=p)),d+=4;d=0;for(let p=0;p<c;p++)for(let v=0;v<c;v++)u[d+3]>0&&(v>s.pos.x+s.size.x-1&&(s.size.x=v-s.pos.x+1),p>s.pos.y+s.size.y-1&&(s.size.y=p-s.pos.y+1)),d+=4;return s}function Ft(o){let i=Object.assign(Object.assign({},O),o);return o.scale!=null&&(i.scale=Object.assign(Object.assign({},O.scale),o.scale)),o.mirror!=null&&(i.mirror=Object.assign(Object.assign({},O.mirror),o.mirror)),i}const oo=`
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
`;function lo(o,i){return new t.Filter(void 0,oo,{width:o,height:i})}const Ee=new S;let K,$=new S,ge,z;const yi=5;document.createElement("img");let H,lt,st=1,un="black",X,Mi,De=!1,T,Pi;function so(o,i,s,u,d,p,v){Ee.set(o),T=v,un=s;const w=`
-webkit-touch-callout: none;
-webkit-tap-highlight-color: ${i};
-webkit-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
background: ${i};
color: #888;
`,_=`
position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
`,L=`
image-rendering: -moz-crisp-edges;
image-rendering: -webkit-optimize-contrast;
image-rendering: -o-crisp-edges;
image-rendering: pixelated;
`;if(document.body.style.cssText=w,$.set(Ee),T.isUsingPixi){$.mul(yi);const F=new t.Application({width:$.x,height:$.y});if(K=F.view,z=new t.Graphics,z.scale.x=z.scale.y=yi,t.settings.SCALE_MODE=t.SCALE_MODES.NEAREST,F.stage.addChild(z),z.filters=[],T.name==="crt"&&z.filters.push(Pi=new t.filters.CRTFilter({vignettingAlpha:.7})),T.name==="pixel"&&z.filters.push(lo($.x,$.y)),T.name==="pixel"||T.name==="shapeDark"){const J=new t.filters.AdvancedBloomFilter({threshold:.1,bloomScale:T.name==="pixel"?1.5:1,brightness:T.name==="pixel"?1.5:1,blur:8});z.filters.push(J)}z.lineStyle(0),K.style.cssText=_}else K=document.createElement("canvas"),K.width=$.x,K.height=$.y,ge=K.getContext("2d"),ge.imageSmoothingEnabled=!1,K.style.cssText=_+L;document.body.appendChild(K);const I=()=>{const J=innerWidth/innerHeight,de=$.x/$.y,xt=J<de,Le=xt?.95*innerWidth:.95*innerHeight*de,Yt=xt?.95*innerWidth/de:.95*innerHeight;K.style.width=`${Le}px`,K.style.height=`${Yt}px`};if(window.addEventListener("resize",I),I(),u){H=document.createElement("canvas");let F;d?(H.width=$.x,H.height=$.y,F=p):($.x<=$.y*2?(H.width=$.y*2,H.height=$.y):(H.width=$.x,H.height=$.x/2),H.width>400&&(st=400/H.width,H.width=400,H.height*=st),F=Math.round(400/H.width)),lt=H.getContext("2d"),lt.fillStyle=i,gcc.setOptions({scale:F,capturingFps:60,isSmoothingEnabled:!1})}}function Tt(){if(T.isUsingPixi){z.clear(),De=!1,at(we(un,T.isDarkColor?.15:1)),z.drawRect(0,0,Ee.x,Ee.y),ct(),De=!1;return}ge.fillStyle=Ne(un,T.isDarkColor?.15:1),ge.fillRect(0,0,Ee.x,Ee.y),ge.fillStyle=Ne(X)}function Ke(o){if(o===X){T.isUsingPixi&&!De&&at(we(X));return}if(X=o,T.isUsingPixi){De&&z.endFill(),at(we(X));return}ge.fillStyle=Ne(o)}function at(o){ct(),z.beginFill(o),De=!0}function ct(){De&&(z.endFill(),De=!1)}function fn(){Mi=X}function dn(){Ke(Mi)}function ut(o,i,s,u){if(T.isUsingPixi){T.name==="shape"||T.name==="shapeDark"?z.drawRoundedRect(o,i,s,u,2):z.drawRect(o,i,s,u);return}ge.fillRect(o,i,s,u)}function ao(o,i,s,u,d){const p=we(X);at(p),z.drawCircle(o,i,d*.5),z.drawCircle(s,u,d*.5),ct(),z.lineStyle(d,p),z.moveTo(o,i),z.lineTo(s,u),z.lineStyle(0)}function vi(o,i,s,u,d){if(T.isUsingPixi){ct(),z.beginTextureFill({texture:o.texture,matrix:new t.Matrix().translate(i,s)}),z.drawRect(i,s,u==null?c:u,d==null?c:d),at(we(X));return}u==null?ge.drawImage(o.image,i,s):ge.drawImage(o.image,i,s,u,d)}function co(){Pi.time+=.2}function uo(){if(lt.fillRect(0,0,H.width,H.height),st===1)lt.drawImage(K,(H.width-K.width)/2,(H.height-K.height)/2);else{const o=K.width*st,i=K.height*st;lt.drawImage(K,(H.width-o)/2,(H.height-i)/2,o,i)}gcc.capture(H)}let We=!1,Gt=!1,hn=!1;const Si=["Escape","Digit0","Digit1","Digit2","Digit3","Digit4","Digit5","Digit6","Digit7","Digit8","Digit9","Minus","Equal","Backspace","Tab","KeyQ","KeyW","KeyE","KeyR","KeyT","KeyY","KeyU","KeyI","KeyO","KeyP","BracketLeft","BracketRight","Enter","ControlLeft","KeyA","KeyS","KeyD","KeyF","KeyG","KeyH","KeyJ","KeyK","KeyL","Semicolon","Quote","Backquote","ShiftLeft","Backslash","KeyZ","KeyX","KeyC","KeyV","KeyB","KeyN","KeyM","Comma","Period","Slash","ShiftRight","NumpadMultiply","AltLeft","Space","CapsLock","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","Pause","ScrollLock","Numpad7","Numpad8","Numpad9","NumpadSubtract","Numpad4","Numpad5","Numpad6","NumpadAdd","Numpad1","Numpad2","Numpad3","Numpad0","NumpadDecimal","IntlBackslash","F11","F12","F13","F14","F15","F16","F17","F18","F19","F20","F21","F22","F23","F24","IntlYen","Undo","Paste","MediaTrackPrevious","Cut","Copy","MediaTrackNext","NumpadEnter","ControlRight","LaunchMail","AudioVolumeMute","MediaPlayPause","MediaStop","Eject","AudioVolumeDown","AudioVolumeUp","BrowserHome","NumpadDivide","PrintScreen","AltRight","Help","NumLock","Pause","Home","ArrowUp","PageUp","ArrowLeft","ArrowRight","End","ArrowDown","PageDown","Insert","Delete","OSLeft","OSRight","ContextMenu","BrowserSearch","BrowserFavorites","BrowserRefresh","BrowserStop","BrowserForward","BrowserBack"];let mn;const fo={onKeyDown:void 0};let pn,gn=!1,yn=!1,Mn=!1,Pn={},vn={},Sn={};function bi(o){pn=Object.assign(Object.assign({},fo),o),mn=M(Si.map(i=>[i,{isPressed:!1,isJustPressed:!1,isJustReleased:!1}])),document.addEventListener("keydown",i=>{gn=yn=!0,Pn[i.code]=vn[i.code]=!0,pn.onKeyDown!=null&&pn.onKeyDown(),(i.code==="AltLeft"||i.code==="AltRight"||i.code==="ArrowRight"||i.code==="ArrowDown"||i.code==="ArrowLeft"||i.code==="ArrowUp")&&i.preventDefault()}),document.addEventListener("keyup",i=>{gn=!1,Mn=!0,Pn[i.code]=!1,Sn[i.code]=!0})}function wi(){Gt=!We&&yn,hn=We&&Mn,yn=Mn=!1,We=gn,b(mn).forEach(([o,i])=>{i.isJustPressed=!i.isPressed&&vn[o],i.isJustReleased=i.isPressed&&Sn[o],i.isPressed=!!Pn[o]}),vn={},Sn={}}function xi(){Gt=!1,We=!0}var ho=Object.freeze({__proto__:null,get isPressed(){return We},get isJustPressed(){return Gt},get isJustReleased(){return hn},codes:Si,get code(){return mn},init:bi,update:wi,clearJustPressed:xi});class zt{constructor(i=null){this.setSeed(i)}get(i=1,s){return s==null&&(s=i,i=0),this.next()/4294967295*(s-i)+i}getInt(i,s){s==null&&(s=i,i=0);const u=Math.floor(i),d=Math.floor(s);return d===u?u:this.next()%(d-u)+u}getPlusOrMinus(){return this.getInt(2)*2-1}select(i){return i[this.getInt(i.length)]}setSeed(i,s=123456789,u=362436069,d=521288629,p=32){this.w=i!=null?i>>>0:Math.floor(Math.random()*4294967295)>>>0,this.x=s>>>0,this.y=u>>>0,this.z=d>>>0;for(let v=0;v<p;v++)this.next();return this}getState(){return{x:this.x,y:this.y,z:this.z,w:this.w}}next(){const i=this.x^this.x<<11;return this.x=this.y,this.y=this.z,this.z=this.w,this.w=(this.w^this.w>>>19^(i^i>>>8))>>>0,this.w}}const ft=new S;let ye=!1,Qe=!1,dt=!1,mo={isDebugMode:!1,anchor:new S,padding:new S,onPointerDownOrUp:void 0},ee,fe,W;const ht=new zt,Ie=new S,Me=new S;let mt=!1,pt=new S,bn=!1,wn=!1,xn=!1;function Ci(o,i,s){W=Object.assign(Object.assign({},mo),s),ee=o,fe=new S(i.x+W.padding.x*2,i.y+W.padding.y*2),pt.set(ee.offsetLeft+ee.clientWidth*(.5-W.anchor.x),ee.offsetTop+ee.clientWidth*(.5-W.anchor.y)),W.isDebugMode&&Ie.set(ee.offsetLeft+ee.clientWidth*(.5-W.anchor.x),ee.offsetTop+ee.clientWidth*(.5-W.anchor.y)),document.addEventListener("mousedown",u=>{ki(u.pageX,u.pageY)}),document.addEventListener("touchstart",u=>{ki(u.touches[0].pageX,u.touches[0].pageY)}),document.addEventListener("mousemove",u=>{Ni(u.pageX,u.pageY)}),document.addEventListener("touchmove",u=>{u.preventDefault(),Ni(u.touches[0].pageX,u.touches[0].pageY)},{passive:!1}),document.addEventListener("mouseup",u=>{Oi()}),document.addEventListener("touchend",u=>{u.preventDefault(),u.target.click(),Oi()},{passive:!1})}function Ai(){po(pt.x,pt.y,ft),W.isDebugMode&&!ft.isInRect(0,0,fe.x,fe.y)?(go(),ft.set(Ie),Qe=!ye&&mt,dt=ye&&!mt,ye=mt):(Qe=!ye&&wn,dt=ye&&xn,ye=bn),wn=xn=!1}function Li(){Qe=!1,ye=!0}function po(o,i,s){ee!=null&&(s.x=Math.round(((o-ee.offsetLeft)/ee.clientWidth+W.anchor.x)*fe.x-W.padding.x),s.y=Math.round(((i-ee.offsetTop)/ee.clientHeight+W.anchor.y)*fe.y-W.padding.y))}function go(){Me.length>0?(Ie.add(Me),!a(Ie.x,-fe.x*.1,fe.x*1.1)&&Ie.x*Me.x>0&&(Me.x*=-1),!a(Ie.y,-fe.y*.1,fe.y*1.1)&&Ie.y*Me.y>0&&(Me.y*=-1),ht.get()<.05&&Me.set(0)):ht.get()<.1&&(Me.set(0),Me.addWithAngle(ht.get(Math.PI*2),(fe.x+fe.y)*ht.get(.01,.03))),ht.get()<.05&&(mt=!mt)}function ki(o,i){pt.set(o,i),bn=wn=!0,W.onPointerDownOrUp!=null&&W.onPointerDownOrUp()}function Ni(o,i){pt.set(o,i)}function Oi(o){bn=!1,xn=!0,W.onPointerDownOrUp!=null&&W.onPointerDownOrUp()}var yo=Object.freeze({__proto__:null,pos:ft,get isPressed(){return ye},get isJustPressed(){return Qe},get isJustReleased(){return dt},init:Ci,update:Ai,clearJustPressed:Li});let Ce=new S,Pe=!1,me=!1,Ae=!1;function Ri(o){bi({onKeyDown:o}),Ci(K,Ee,{onPointerDownOrUp:o,anchor:new S(.5,.5)})}function _i(){wi(),Ai(),Ce=ft,Pe=We||ye,me=Gt||Qe,Ae=hn||dt}function Ei(){xi(),Li()}function gt(o){Ce.set(o.pos),Pe=o.isPressed,me=o.isJustPressed,Ae=o.isJustReleased}var Mo=Object.freeze({__proto__:null,get pos(){return Ce},get isPressed(){return Pe},get isJustPressed(){return me},get isJustReleased(){return Ae},init:Ri,update:_i,clearJustPressed:Ei,set:gt});let Di,Ii;const Fi=68,Cn=1e3/Fi;let yt=0;const Po={viewSize:{x:126,y:126},bodyBackground:"#111",viewBackground:"black",isUsingVirtualPad:!0,isFourWaysStick:!1,isCapturing:!1,isCapturingGameCanvasOnly:!1,isSoundEnabled:!0,captureCanvasScale:1,theme:{name:"simple",isUsingPixi:!1,isDarkColor:!1}};let le,Ti=10;function vo(o,i,s){Di=o,Ii=i,le=Object.assign(Object.assign({},Po),s),ce(le.theme.isDarkColor),so(le.viewSize,le.bodyBackground,le.viewBackground,le.isCapturing,le.isCapturingGameCanvasOnly,le.captureCanvasScale,le.theme),Ri(le.isSoundEnabled?sss.playEmpty:()=>{}),j(),Di(),Gi()}function Gi(){requestAnimationFrame(Gi);const o=window.performance.now();o<yt-Fi/12||(yt+=Cn,(yt<o||yt>o+Cn*2)&&(yt=o+Cn),le.isSoundEnabled&&sss.update(),_i(),Ii(),le.isCapturing&&uo(),Ti--,Ti===0&&Z())}class So{constructor(i){this.size=new S,this.size.set(i),this.letterGrid=f(this.size.x).map(()=>f(this.size.y).map(()=>{})),this.colorGrid=f(this.size.x).map(()=>f(this.size.y).map(()=>{})),this.backgroundColorGrid=f(this.size.x).map(()=>f(this.size.y).map(()=>{})),this.rotationGrid=f(this.size.x).map(()=>f(this.size.y).map(()=>{})),this.characterGrid=f(this.size.x).map(()=>f(this.size.y).map(()=>{}))}print(i,s,u,d={}){const p=Object.assign(Object.assign({},O),d);let v=Math.floor(s),w=Math.floor(u);const _=v;for(let L=0;L<i.length;L++){const I=i[L];if(I===`
`){v=_,w++;continue}if(v<0||v>=this.size.x||w<0||w>=this.size.y){v++;continue}this.letterGrid[v][w]=I,this.colorGrid[v][w]=p.color,this.backgroundColorGrid[v][w]=p.backgroundColor,this.rotationGrid[v][w]=p.rotation,this.characterGrid[v][w]=p.isCharacter,v++}}getCharAt(i,s){if(i<0||i>=this.size.x||s<0||s>=this.size.y)return;const u=Math.floor(i),d=Math.floor(s),p=this.letterGrid[u][d],v=this.colorGrid[u][d],w=this.backgroundColorGrid[u][d],_=this.rotationGrid[u][d],L=this.characterGrid[u][d];return{char:p,options:{color:v,backgroundColor:w,rotation:_,isCharacter:L}}}setCharAt(i,s,u,d){if(i<0||i>=this.size.x||s<0||s>=this.size.y)return;const p=Object.assign(Object.assign({},O),d),v=Math.floor(i),w=Math.floor(s);this.letterGrid[v][w]=u,this.colorGrid[v][w]=p.color,this.backgroundColorGrid[v][w]=p.backgroundColor,this.rotationGrid[v][w]=p.rotation,this.characterGrid[v][w]=p.isCharacter}draw(){for(let i=0;i<this.size.x;i++)for(let s=0;s<this.size.y;s++){const u=this.letterGrid[i][s];if(u==null)continue;const d=this.colorGrid[i][s],p=this.backgroundColorGrid[i][s],v=this.rotationGrid[i][s],w=this.characterGrid[i][s];he(u,i*c,s*c,{color:d,backgroundColor:p,rotation:v,isCharacter:w})}}clear(){for(let i=0;i<this.size.x;i++)for(let s=0;s<this.size.y;s++)this.letterGrid[i][s]=this.colorGrid[i][s]=this.backgroundColorGrid[i][s]=this.rotationGrid[i][s]=this.characterGrid[i][s]=void 0}scrollUp(){for(let s=0;s<this.size.x;s++)for(let u=1;u<this.size.y;u++)this.letterGrid[s][u-1]=this.letterGrid[s][u],this.colorGrid[s][u-1]=this.colorGrid[s][u],this.backgroundColorGrid[s][u-1]=this.backgroundColorGrid[s][u],this.rotationGrid[s][u-1]=this.rotationGrid[s][u],this.characterGrid[s][u-1]=this.characterGrid[s][u];const i=this.size.y-1;for(let s=0;s<this.size.x;s++)this.letterGrid[s][i]=this.colorGrid[s][i]=this.backgroundColorGrid[s][i]=this.rotationGrid[s][i]=this.characterGrid[s][i]=void 0}getState(){return{charGrid:this.letterGrid.map(i=>[].concat(i)),colorGrid:this.colorGrid.map(i=>[].concat(i)),backgroundColorGrid:this.backgroundColorGrid.map(i=>[].concat(i)),rotationGrid:this.rotationGrid.map(i=>[].concat(i)),symbolGrid:this.characterGrid.map(i=>[].concat(i))}}setState(i){this.letterGrid=i.charGrid.map(s=>[].concat(s)),this.colorGrid=i.colorGrid.map(s=>[].concat(s)),this.backgroundColorGrid=i.backgroundColorGrid.map(s=>[].concat(s)),this.rotationGrid=i.rotationGrid.map(s=>[].concat(s)),this.characterGrid=i.symbolGrid.map(s=>[].concat(s))}}let Bt;const jt=new zt;function An(){Bt=[]}function zi(o,i=16,s=1,u=0,d=Math.PI*2){if(i<1){if(jt.get()>i)return;i=1}for(let p=0;p<i;p++){const v=u+jt.get(d)-d/2,w={pos:new S(o),vel:new S(s*jt.get(.5,1),0).rotate(v),color:X,ticks:clamp(jt.get(10,20)*Math.sqrt(Math.abs(s)),10,60)};Bt.push(w)}}function qt(){fn(),Bt=Bt.filter(o=>(o.ticks--,o.ticks<0?!1:(o.pos.add(o.vel),o.vel.mul(.98),Ke(o.color),ut(Math.floor(o.pos.x),Math.floor(o.pos.y),1,1),!0))),dn()}function Ln({pos:o,size:i,text:s,isToggle:u=!1,onClick:d=()=>{}}){return{pos:o,size:i,text:s,isToggle:u,onClick:d,isPressed:!1,isSelected:!1,isHovered:!1,toggleGroup:[]}}function kn(o){const i=vec(input.pos).sub(o.pos);o.isHovered=i.isInRect(0,0,o.size.x,o.size.y),o.isHovered&&Qe&&(o.isPressed=!0),o.isPressed&&!o.isHovered&&(o.isPressed=!1),o.isPressed&&dt&&(o.onClick(),o.isPressed=!1,o.isToggle&&(o.toggleGroup.length===0?o.isSelected=!o.isSelected:(o.toggleGroup.forEach(s=>{s.isSelected=!1}),o.isSelected=!0))),Ut(o)}function Ut(o){color(o.isPressed?"blue":"light_blue"),rect(o.pos.x,o.pos.y,o.size.x,o.size.y),o.isToggle&&!o.isSelected&&(color("white"),rect(o.pos.x+1,o.pos.y+1,o.size.x-2,o.size.y-2)),color(o.isHovered?"black":"blue"),text(o.text,o.pos.x+3,o.pos.y+3)}let pe,Mt,Fe,Nn;function bo(o){pe={randomSeed:o,inputs:[]}}function wo(o){pe.inputs.push(o)}function Bi(){return pe!=null}function xo(o){Mt=0,o.setSeed(pe.randomSeed)}function Co(){Mt>=pe.inputs.length||(gt(pe.inputs[Mt]),Mt++)}function Ao(){Fe=[]}function Lo(o,i,s){Fe.push({randomState:s.getState(),gameState:cloneDeep(o),baseState:cloneDeep(i)})}function ko(o){const i=Fe.pop(),s=i.randomState;return o.setSeed(s.w,s.x,s.y,s.z,0),Nn={pos:vec(Ce),isPressed:Pe,isJustPressed:me,isJustReleased:Ae},gt(pe.inputs.pop()),i}function No(o){const i=Fe[Fe.length-1],s=i.randomState;return o.setSeed(s.w,s.x,s.y,s.z,0),Nn={pos:vec(Ce),isPressed:Pe,isJustPressed:me,isJustReleased:Ae},gt(pe.inputs[pe.inputs.length-1]),i}function Oo(){gt(Nn)}function Ro(){return Fe.length===0}function _o(){const o=Mt-1;if(!(o>=pe.inputs.length))return Fe[o]}function Eo(o,i,s,u){return ji(!1,o,i,s,u)}function Do(o,i,s,u){return ji(!0,o,i,s,u)}function Io(o,i,s,u,d=.5,p=.5){typeof o!="number"&&(p=d,d=u,u=s,s=i,i=o.y,o=o.x);const v=new S(s).rotate(d),w=new S(o-v.x*p,i-v.y*p);return On(w,v,u)}function Fo(o,i,s=3,u=3,d=3){const p=new S,v=new S;if(typeof o=="number")if(typeof i=="number")typeof s=="number"?(p.set(o,i),v.set(s,u)):(p.set(o,i),v.set(s),d=u);else throw"invalid params";else if(typeof i=="number")if(typeof s=="number")p.set(o),v.set(i,s),d=u;else throw"invalid params";else if(typeof s=="number")p.set(o),v.set(i),d=s;else throw"invalid params";return On(p,v.sub(p),d)}function To(o,i,s,u,d,p){let v=new S;typeof o=="number"?v.set(o,i):(v.set(o),p=d,d=u,u=s,s=i),u==null&&(u=3),d==null&&(d=0),p==null&&(p=Math.PI*2);let w,_;if(d>p?(w=p,_=d-p):(w=d,_=p-d),_=n(_,0,Math.PI*2),_<.01)return;const L=n(ceil(_*Math.sqrt(s*.25)),1,36),I=_/L;let F=w,J=new S(s).rotate(F).add(v),de=new S,xt=new S,Le={isColliding:{rect:{},text:{},char:{}}};for(let Yt=0;Yt<L;Yt++){F+=I,de.set(s).rotate(F).add(v),xt.set(de).sub(J);const Zt=On(J,xt,u,!0);Le=Object.assign(Object.assign(Object.assign({},Le),Je(Zt.isColliding.rect)),{isColliding:{rect:Object.assign(Object.assign({},Le.isColliding.rect),Zt.isColliding.rect),text:Object.assign(Object.assign({},Le.isColliding.text),Zt.isColliding.text),char:Object.assign(Object.assign({},Le.isColliding.char),Zt.isColliding.char)}}),J.set(de)}return Oe(),Le}function ji(o,i,s,u,d){if(typeof i=="number"){if(typeof s=="number")return typeof u=="number"?d==null?Te(o,i,s,u,u):Te(o,i,s,u,d):Te(o,i,s,u.x,u.y);throw"invalid params"}else if(typeof s=="number"){if(u==null)return Te(o,i.x,i.y,s,s);if(typeof u=="number")return Te(o,i.x,i.y,s,u);throw"invalid params"}else return Te(o,i.x,i.y,s.x,s.y)}function On(o,i,s,u=!1){let d=!0;(T.name==="shape"||T.name==="shapeDark")&&(X!=="transparent"&&ao(o.x,o.y,o.x+i.x,o.y+i.y,s),d=!1);const p=Math.floor(n(s,3,10)),v=Math.abs(i.x),w=Math.abs(i.y),_=n(Math.ceil(v>w?v/p:w/p)+1,3,99);i.div(_-1);let L={isColliding:{rect:{},text:{},char:{}}};for(let I=0;I<_;I++){const F=Te(!0,o.x,o.y,s,s,!0,d);L=Object.assign(Object.assign(Object.assign({},L),Je(F.isColliding.rect)),{isColliding:{rect:Object.assign(Object.assign({},L.isColliding.rect),F.isColliding.rect),text:Object.assign(Object.assign({},L.isColliding.text),F.isColliding.text),char:Object.assign(Object.assign({},L.isColliding.char),F.isColliding.char)}}),o.add(i)}return u||Oe(),L}function Te(o,i,s,u,d,p=!1,v=!0){let w=v;(T.name==="shape"||T.name==="shapeDark")&&w&&X!=="transparent"&&(o?ut(i-u/2,s-d/2,u,d):ut(i,s,u,d),w=!1);let _=o?{x:Math.floor(i-u/2),y:Math.floor(s-d/2)}:{x:Math.floor(i),y:Math.floor(s)};const L={x:Math.trunc(u),y:Math.trunc(d)};if(L.x===0||L.y===0)return{isColliding:{rect:{},text:{},char:{}}};L.x<0&&(_.x+=L.x,L.x*=-1),L.y<0&&(_.y+=L.y,L.y*=-1);const I={pos:_,size:L,collision:{isColliding:{rect:{}}}};I.collision.isColliding.rect[X]=!0;const F=y(I);return X!=="transparent"&&((p?$e:ue).push(I),w&&ut(_.x,_.y,L.x,L.y)),F}const Go=Math.PI,zo=Math.abs,Bo=Math.sin,jo=Math.cos,qo=Math.atan2,Uo=Math.sqrt,Ho=Math.pow,Vo=Math.floor,$o=Math.round,Jo=Math.ceil;e.ticks=0,e.score=0,e.isReplaying=!1;function Ko(o=1,i){return ve.get(o,i)}function Wo(o=2,i){return ve.getInt(o,i)}function Qo(o=1,i){return ve.get(o,i)*ve.getPlusOrMinus()}function Rn(o="GAME OVER"){Qt=o,Ye&&(e.time=void 0),Ki()}function Yo(o="COMPLETE"){Qt=o,Ki()}function Zo(o,i,s){if(e.isReplaying||(e.score+=o,i==null))return;const u=`${o>=1?"+":""}${Math.floor(o)}`;let d=new S;typeof i=="number"?d.set(i,s):d.set(i),d.x-=u.length*c/2,d.y-=c/2,Kt.push({str:u,pos:d,vy:-2,ticks:30})}function qi(o){Ke(o)}function Xo(o,i,s,u,d,p){let v=new S;typeof o=="number"?(v.set(o,i),zi(v,s,u,d,p)):(v.set(o),zi(v,i,s,u,d))}function Ui(o,i){return new S(o,i)}function Hi(o){!bt&&!je&&Be&&sss.play(nl[o])}function el(o){if(bt){const i=No(ve),s=i.baseState;return e.score=s.score,e.ticks=s.ticks,cloneDeep(i.gameState)}else if(je){const i=ko(ve),s=i.baseState;return e.score=s.score,e.ticks=s.ticks,i.gameState}else{if(e.isReplaying)return _o().gameState;if(Ge==="inGame"){const i={score:e.score,ticks:e.ticks};Lo(o,i,ve)}}return o}function tl(){je||(!e.isReplaying&&Jt?dl():Rn())}const nl={coin:"c",laser:"l",explosion:"e",powerUp:"p",hit:"h",jump:"j",select:"s",lucky:"u",random:"r"},Vi={isPlayingBgm:!1,isCapturing:!1,isCapturingGameCanvasOnly:!1,captureCanvasScale:1,isShowingScore:!0,isShowingTime:!1,isReplayEnabled:!1,isRewindEnabled:!1,isDrawingParticleFront:!1,isDrawingScoreFront:!1,isMinifying:!1,isSoundEnabled:!0,viewSize:{x:100,y:100},seed:0,theme:"simple"},il=new zt,ve=new zt;let Ge,rl={title:cl,inGame:al,gameOver:ul,rewind:hl},te,_n=0,Ht,Vt=!0,$t=0,ze,Pt,$i,Ye,vt,Jt,St,En,Be,Se,Kt,bt=!1,je=!1,wt,Wt,Qt,Dn;function ol(){let o;typeof options<"u"&&options!=null?o=Object.assign(Object.assign({},Vi),options):o=Vi;const i={name:o.theme,isUsingPixi:!1,isDarkColor:!1};o.theme!=="simple"&&o.theme!=="dark"&&(i.isUsingPixi=!0),(o.theme==="pixel"||o.theme==="shapeDark"||o.theme==="crt"||o.theme==="dark")&&(i.isDarkColor=!0),ze={viewSize:{x:100,y:100},bodyBackground:i.isDarkColor?"#101010":"#e0e0e0",viewBackground:i.isDarkColor?"blue":"white",theme:i,isSoundEnabled:o.isSoundEnabled},$t=o.seed,ze.isCapturing=o.isCapturing,ze.isCapturingGameCanvasOnly=o.isCapturingGameCanvasOnly,ze.captureCanvasScale=o.captureCanvasScale,ze.viewSize=o.viewSize,Pt=o.isPlayingBgm,$i=o.isShowingScore&&!o.isShowingTime,Ye=o.isShowingTime,vt=o.isReplayEnabled,Jt=o.isRewindEnabled,St=o.isDrawingParticleFront,En=o.isDrawingScoreFront,Be=o.isSoundEnabled,o.isMinifying&&gl(),vo(ll,sl,ze)}function ll(){typeof description<"u"&&description!=null&&description.trim().length>0&&(Vt=!1,$t+=Yi(description)),typeof title<"u"&&title!=null&&title.trim().length>0&&(Vt=!1,document.title=title,$t+=Yi(title)),typeof characters<"u"&&characters!=null&&q(characters,"a"),Be&&sss.init($t);const o=ze.viewSize;Se={x:Math.floor(o.x/6),y:Math.floor(o.y/6)},te=new So(Se),Ke("black"),Vt?(In(),e.ticks=0):Ji()}function sl(){e.df=e.difficulty=e.ticks/3600+1,e.tc=e.ticks;const o=e.score,i=e.time;e.sc=e.score;const s=e.sc;e.inp={p:Ce,ip:Pe,ijp:me,ijr:Ae},an(),rl[Ge](),T.isUsingPixi&&(ct(),T.name==="crt"&&co()),e.ticks++,e.isReplaying?(e.score=o,e.time=i):e.sc!==s&&(e.score=e.sc)}function In(){Ge="inGame",e.ticks=-1,An();const o=Math.floor(e.score);o>_n&&(_n=o),Ye&&e.time!=null&&(Ht==null||Ht>e.time)&&(Ht=e.time),e.score=0,e.time=0,Kt=[],Pt&&Be&&sss.playBgm();const i=il.getInt(999999999);ve.setSeed(i),(vt||Jt)&&(bo(i),Ao(),e.isReplaying=!1)}function al(){te.clear(),Tt(),St||qt(),En||Qi(),(vt||Jt)&&wo({pos:Ui(Ce),isPressed:Pe,isJustPressed:me,isJustReleased:Ae}),update(),St&&qt(),En&&Qi(),Fn(),te.draw(),Ye&&e.time!=null&&e.time++}function Ji(){Ge="title",e.ticks=-1,An(),te.clear(),Tt(),Bi()&&(xo(ve),e.isReplaying=!0)}function cl(){if(me){In();return}if(Tt(),vt&&Bi()&&(Co(),e.inp={p:Ce,ip:Pe,ijp:me,ijr:Ae},St||qt(),update(),St&&qt()),e.ticks===0&&(Fn(),typeof title<"u"&&title!=null&&te.print(title,Math.floor(Se.x-title.length)/2,Math.ceil(Se.y*.2))),(e.ticks===30||e.ticks==40)&&typeof description<"u"&&description!=null){let o=0;description.split(`
`).forEach(s=>{s.length>o&&(o=s.length)});const i=Math.floor((Se.x-o)/2);description.split(`
`).forEach((s,u)=>{te.print(s,i,Math.floor(Se.y/2)+u)})}te.draw()}function Ki(){Ge="gameOver",e.isReplaying||Ei(),e.ticks=-1,fl(),Pt&&Be&&sss.stopBgm()}function ul(){(e.isReplaying||e.ticks>20)&&me?In():e.ticks===(vt?120:300)&&!Vt&&Ji()}function fl(){e.isReplaying||(te.print(Qt,Math.floor((Se.x-Qt.length)/2),Math.floor(Se.y/2)),te.draw())}function dl(){Ge="rewind",bt=!0,wt=Ln({pos:{x:61,y:11},size:{x:36,y:7},text:"Rewind"}),Wt=Ln({pos:{x:61,y:81},size:{x:36,y:7},text:"GiveUp"}),Pt&&Be&&sss.stopBgm(),T.isUsingPixi&&(Ut(wt),Ut(Wt))}function hl(){te.clear(),Tt(),update(),Fn(),Oo(),je?(Ut(wt),(Ro()||!Pe)&&ml()):(kn(wt),kn(Wt),wt.isPressed&&(je=!0,bt=!1)),Wt.isPressed?(bt=je=!1,Rn()):te.draw(),Ye&&e.time!=null&&e.time++}function ml(){je=!1,Ge="inGame",An(),Pt&&Be&&sss.playBgm()}function Fn(){if($i){te.print(`${Math.floor(e.score)}`,0,0);const o=`HI ${_n}`;te.print(o,Se.x-o.length,0)}Ye&&(Wi(e.time,0,0),Wi(Ht,9,0))}function Wi(o,i,s){if(o==null)return;let u=Math.floor(o*100/50);u>=10*60*100&&(u=10*60*100-1);const d=Tn(Math.floor(u/6e3),1)+"'"+Tn(Math.floor(u%6e3/100),2)+'"'+Tn(Math.floor(u%100),2);te.print(d,i,s)}function Tn(o,i){return("0000"+o).slice(-i)}function Qi(){fn(),Ke("black"),Kt=Kt.filter(o=>(U(o.str,o.pos.x,o.pos.y),o.pos.y+=o.vy,o.vy*=.9,o.ticks--,o.ticks>0)),dn()}function Yi(o){let i=0;for(let s=0;s<o.length;s++){const u=o.charCodeAt(s);i=(i<<5)-i+u,i|=0}return i}function pl(){let o=window.location.search.substring(1);if(o=o.replace(/[^A-Za-z0-9_-]/g,""),o.length===0)return;const i=document.createElement("script");Dn=`${o}/main.js`,i.setAttribute("src",Dn),document.head.appendChild(i)}function gl(){fetch(Dn).then(o=>o.text()).then(o=>{const i=Terser.minify(o+"update();",{toplevel:!0}).code,s="function(){",u=i.indexOf(s),d="options={",p=i.indexOf(d);let v=i;if(u>=0)v=i.substring(i.indexOf(s)+s.length,i.length-4);else if(p>=0){let w=1,_;for(let L=p+d.length;L<i.length;L++){const I=i.charAt(L);if(I==="{")w++;else if(I==="}"&&(w--,w===0)){_=L+2;break}}w===0&&(v=i.substring(_))}Zi.forEach(([w,_])=>{v=v.split(w).join(_)}),console.log(v),console.log(`${v.length} letters`)})}let yl=qi,Ml=Hi,Pl=h,vl=g;const Sl="transparent",bl="white",wl="red",xl="green",Cl="yellow",Al="blue",Ll="purple",kl="cyan",Nl="black",Ol="coin",Rl="laser",_l="explosion",El="powerUp",Dl="hit",Il="jump",Fl="select",Tl="lucky";let Zi=[["===","=="],["!==","!="],["input.pos","inp.p"],["input.isPressed","inp.ip"],["input.isJustPressed","inp.ijp"],["input.isJustReleased","inp.ijr"],["color(","clr("],["play(","ply("],["times(","tms("],["remove(","rmv("],["ticks","tc"],["difficulty","df"],["score","sc"],[".isColliding.rect.transparent",".tr"],[".isColliding.rect.white",".wh"],[".isColliding.rect.red",".rd"],[".isColliding.rect.green",".gr"],[".isColliding.rect.yellow",".yl"],[".isColliding.rect.blue",".bl"],[".isColliding.rect.purple",".pr"],[".isColliding.rect.cyan",".cy"],[".isColliding.rect.black",".lc"],['"transparent"',"tr"],['"white"',"wh"],['"red"',"rd"],['"green"',"gr"],['"yellow"',"yl"],['"blue"',"bl"],['"purple"',"pr"],['"cyan"',"cy"],['"black"',"lc"],['"coin"',"cn"],['"laser"',"ls"],['"explosion"',"ex"],['"powerUp"',"pw"],['"hit"',"ht"],['"jump"',"jm"],['"select"',"sl"],['"lucky"',"uc"]];e.PI=Go,e.abs=zo,e.addGameScript=pl,e.addScore=Zo,e.addWithCharCode=k,e.arc=To,e.atan2=qo,e.bar=Io,e.bl=Al,e.box=Do,e.ceil=Jo,e.char=cn,e.clamp=n,e.clr=yl,e.cn=Ol,e.color=qi,e.complete=Yo,e.cos=jo,e.cy=kl,e.end=Rn,e.ex=_l,e.floor=Vo,e.frameState=el,e.getButton=Ln,e.gr=xl,e.ht=Dl,e.input=Mo,e.jm=Il,e.keyboard=ho,e.lc=Nl,e.line=Fo,e.ls=Rl,e.minifyReplaces=Zi,e.onLoad=ol,e.particle=Xo,e.play=Hi,e.ply=Ml,e.pointer=yo,e.pow=Ho,e.pr=Ll,e.pw=El,e.range=f,e.rd=wl,e.rect=Eo,e.remove=g,e.rewind=tl,e.rmv=vl,e.rnd=Ko,e.rndi=Wo,e.rnds=Qo,e.round=$o,e.sin=Bo,e.sl=Fl,e.sqrt=Uo,e.text=_e,e.times=h,e.tms=Pl,e.tr=Sl,e.uc=Tl,e.updateButton=kn,e.vec=Ui,e.wh=bl,e.wrap=l,e.yl=Cl})(window||{},{});window.sss=Ac;window.options={isShowingScore:!1};let ur,At=1;window.update=function(){ticks===0&&(ur=["coin","jump","powerUp","laser","select","hit","click","explosion","random"].map((t,n)=>getButton({pos:vec(5,2+n*9),size:vec(56,7),text:t,isToggle:!1,onClick:()=>{pi(t)}})),on(At),Wn(Qn())),ur.forEach(t=>{updateButton(t)});const e=vec(5,92);if(color("light_blue"),rect(e.x,e.y,90,5),color("white"),rect(e.x+1,e.y+1,88,3),input.pos.isInRect(e.x+1,e.y+1,88,3)){let t=input.pos.x-e.x;color("blue"),rect(e.x+t,e.y+1,1,3),text(`${t}`,85,e.y-3),input.isJustPressed&&(At=t,gi(),on(At),Wn(Qn()))}color("black"),rect(e.x+At,e.y+1,1,3),text(`seed: ${At}`,5,e.y-3)};window.addEventListener("load",onLoad);
