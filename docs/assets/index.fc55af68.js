var Fo=Object.defineProperty;var Do=(e,t,n)=>t in e?Fo(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Pt=(e,t,n)=>(Do(e,typeof t!="symbol"?t+"":t,n),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))l(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const m of s.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&l(m)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerpolicy&&(s.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?s.credentials="include":i.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();function Bo(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Hi={exports:{}},qi={Note:"Note",Rest:"Rest",Octave:"Octave",OctaveShift:"OctaveShift",NoteLength:"NoteLength",NoteVelocity:"NoteVelocity",NoteQuantize:"NoteQuantize",Tempo:"Tempo",InfiniteLoop:"InfiniteLoop",LoopBegin:"LoopBegin",LoopExit:"LoopExit",LoopEnd:"LoopEnd"},zo={tempo:120,octave:4,length:4,velocity:100,quantize:75,loopCount:2},Uo=function(){function e(t,n){for(var l=0;l<n.length;l++){var i=n[l];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(t,n,l){return n&&e(t.prototype,n),l&&e(t,l),t}}();function Go(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var Ho=function(){function e(t){Go(this,e),this.source=t,this.index=0}return Uo(e,[{key:"hasNext",value:function(){return this.index<this.source.length}},{key:"peek",value:function(){return this.source.charAt(this.index)||""}},{key:"next",value:function(){return this.source.charAt(this.index++)||""}},{key:"forward",value:function(){for(;this.hasNext()&&this.match(/\s/);)this.index+=1}},{key:"match",value:function(n){return n instanceof RegExp?n.test(this.peek()):this.peek()===n}},{key:"expect",value:function(n){this.match(n)||this.throwUnexpectedToken(),this.index+=1}},{key:"scan",value:function(n){var l=this.source.substr(this.index),i=null;if(n instanceof RegExp){var s=n.exec(l);s&&s.index===0&&(i=s[0])}else l.substr(0,n.length)===n&&(i=n);return i&&(this.index+=i.length),i}},{key:"throwUnexpectedToken",value:function(){var n=this.peek()||"ILLEGAL";throw new SyntaxError("Unexpected token: "+n)}}]),e}(),qo=Ho,Vo=function(){function e(t,n){for(var l=0;l<n.length;l++){var i=n[l];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(t,n,l){return n&&e(t.prototype,n),l&&e(t,l),t}}();function Jo(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var re=qi,Ko=qo,Xo={c:0,d:2,e:4,f:5,g:7,a:9,b:11},Wo=function(){function e(t){Jo(this,e),this.scanner=new Ko(t)}return Vo(e,[{key:"parse",value:function(){var n=this,l=[];return this._readUntil(";",function(){l=l.concat(n.advance())}),l}},{key:"advance",value:function(){switch(this.scanner.peek()){case"c":case"d":case"e":case"f":case"g":case"a":case"b":return this.readNote();case"[":return this.readChord();case"r":return this.readRest();case"o":return this.readOctave();case">":return this.readOctaveShift(1);case"<":return this.readOctaveShift(-1);case"l":return this.readNoteLength();case"q":return this.readNoteQuantize();case"v":return this.readNoteVelocity();case"t":return this.readTempo();case"$":return this.readInfiniteLoop();case"/":return this.readLoop()}this.scanner.throwUnexpectedToken()}},{key:"readNote",value:function(){return{type:re.Note,noteNumbers:[this._readNoteNumber(0)],noteLength:this._readLength()}}},{key:"readChord",value:function(){var n=this;this.scanner.expect("[");var l=[],i=0;return this._readUntil("]",function(){switch(n.scanner.peek()){case"c":case"d":case"e":case"f":case"g":case"a":case"b":l.push(n._readNoteNumber(i));break;case">":n.scanner.next(),i+=12;break;case"<":n.scanner.next(),i-=12;break;default:n.scanner.throwUnexpectedToken()}}),this.scanner.expect("]"),{type:re.Note,noteNumbers:l,noteLength:this._readLength()}}},{key:"readRest",value:function(){return this.scanner.expect("r"),{type:re.Rest,noteLength:this._readLength()}}},{key:"readOctave",value:function(){return this.scanner.expect("o"),{type:re.Octave,value:this._readArgument(/\d+/)}}},{key:"readOctaveShift",value:function(n){return this.scanner.expect(/<|>/),{type:re.OctaveShift,direction:n|0,value:this._readArgument(/\d+/)}}},{key:"readNoteLength",value:function(){return this.scanner.expect("l"),{type:re.NoteLength,noteLength:this._readLength()}}},{key:"readNoteQuantize",value:function(){return this.scanner.expect("q"),{type:re.NoteQuantize,value:this._readArgument(/\d+/)}}},{key:"readNoteVelocity",value:function(){return this.scanner.expect("v"),{type:re.NoteVelocity,value:this._readArgument(/\d+/)}}},{key:"readTempo",value:function(){return this.scanner.expect("t"),{type:re.Tempo,value:this._readArgument(/\d+(\.\d+)?/)}}},{key:"readInfiniteLoop",value:function(){return this.scanner.expect("$"),{type:re.InfiniteLoop}}},{key:"readLoop",value:function(){var n=this;this.scanner.expect("/"),this.scanner.expect(":");var l={type:re.LoopBegin},i={type:re.LoopEnd},s=[];return s=s.concat(l),this._readUntil(/[|:]/,function(){s=s.concat(n.advance())}),s=s.concat(this._readLoopExit()),this.scanner.expect(":"),this.scanner.expect("/"),l.value=this._readArgument(/\d+/)||null,s=s.concat(i),s}},{key:"_readUntil",value:function(n,l){for(;this.scanner.hasNext()&&(this.scanner.forward(),!(!this.scanner.hasNext()||this.scanner.match(n)));)l()}},{key:"_readArgument",value:function(n){var l=this.scanner.scan(n);return l!==null?+l:null}},{key:"_readNoteNumber",value:function(n){var l=Xo[this.scanner.next()];return l+this._readAccidental()+n}},{key:"_readAccidental",value:function(){return this.scanner.match("+")?1*this.scanner.scan(/\++/).length:this.scanner.match("-")?-1*this.scanner.scan(/\-+/).length:0}},{key:"_readDot",value:function(){for(var n=(this.scanner.scan(/\.+/)||"").length,l=new Array(n),i=0;i<n;i++)l[i]=0;return l}},{key:"_readLength",value:function(){var n=[];n=n.concat(this._readArgument(/\d+/)),n=n.concat(this._readDot());var l=this._readTie();return l&&(n=n.concat(l)),n}},{key:"_readTie",value:function(){return this.scanner.forward(),this.scanner.match("^")?(this.scanner.next(),this._readLength()):null}},{key:"_readLoopExit",value:function(){var n=this,l=[];if(this.scanner.match("|")){this.scanner.next();var i={type:re.LoopExit};l=l.concat(i),this._readUntil(":",function(){l=l.concat(n.advance())})}return l}}]),e}(),Qo=Wo,Yo=function(){function e(t,n){for(var l=0;l<n.length;l++){var i=n[l];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(t,n,l){return n&&e(t.prototype,n),l&&e(t,l),t}}();function Zo(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var le=qi,se=zo,es=Qo,ts=typeof Symbol<"u"?Symbol.iterator:"@@iterator",ns=function(){function e(t){Zo(this,e),this.source=t,this._commands=new es(t).parse(),this._commandIndex=0,this._processedTime=0,this._iterator=null,this._octave=se.octave,this._noteLength=[se.length],this._velocity=se.velocity,this._quantize=se.quantize,this._tempo=se.tempo,this._infiniteLoopIndex=-1,this._loopStack=[],this._done=!1}return Yo(e,[{key:"hasNext",value:function(){return this._commandIndex<this._commands.length}},{key:"next",value:function(){if(this._done)return{done:!0,value:null};if(this._iterator){var n=this._iterator.next();if(!n.done)return n}var l=this._forward(!0);if(Mi(l))this._iterator=this[l.type](l);else return this._done=!0,{done:!1,value:{type:"end",time:this._processedTime}};return this.next()}},{key:ts,value:function(){return this}},{key:"_forward",value:function(n){for(;this.hasNext()&&!Mi(this._commands[this._commandIndex]);){var l=this._commands[this._commandIndex++];this[l.type](l)}return n&&!this.hasNext()&&this._infiniteLoopIndex!==-1?(this._commandIndex=this._infiniteLoopIndex,this._forward(!1)):this._commands[this._commandIndex++]||{}}},{key:"_calcDuration",value:function(n){var l=this;n[0]===null&&(n=this._noteLength.concat(n.slice(1)));var i=null,s=0;return n=n.map(function(m){switch(m){case null:m=i;break;case 0:m=s*=2;break;default:i=s=m;break}var h=m!==null?m:se.length;return 60/l._tempo*(4/h)}),n.reduce(function(m,h){return m+h},0)}},{key:"_calcNoteNumber",value:function(n){return n+this._octave*12+12}},{key:le.Note,value:function(n){var l=this,i="note",s=this._processedTime,m=this._calcDuration(n.noteLength),h=n.noteNumbers.map(function(S){return l._calcNoteNumber(S)}),M=this._quantize,y=this._velocity;return this._processedTime=this._processedTime+m,ls(h.map(function(S){return{type:i,time:s,duration:m,noteNumber:S,velocity:y,quantize:M}}))}},{key:le.Rest,value:function(n){var l=this._calcDuration(n.noteLength);this._processedTime=this._processedTime+l}},{key:le.Octave,value:function(n){this._octave=n.value!==null?n.value:se.octave}},{key:le.OctaveShift,value:function(n){var l=n.value!==null?n.value:1;this._octave+=l*n.direction}},{key:le.NoteLength,value:function(n){var l=n.noteLength.map(function(i){return i!==null?i:se.length});this._noteLength=l}},{key:le.NoteVelocity,value:function(n){this._velocity=n.value!==null?n.value:se.velocity}},{key:le.NoteQuantize,value:function(n){this._quantize=n.value!==null?n.value:se.quantize}},{key:le.Tempo,value:function(n){this._tempo=n.value!==null?n.value:se.tempo}},{key:le.InfiniteLoop,value:function(){this._infiniteLoopIndex=this._commandIndex}},{key:le.LoopBegin,value:function(n){var l=n.value!==null?n.value:se.loopCount,i=this._commandIndex,s=-1;this._loopStack.push({loopCount:l,loopTopIndex:i,loopOutIndex:s})}},{key:le.LoopExit,value:function(){var n=this._loopStack[this._loopStack.length-1],l=this._commandIndex;n.loopCount<=1&&n.loopOutIndex!==-1&&(l=n.loopOutIndex),this._commandIndex=l}},{key:le.LoopEnd,value:function(){var n=this._loopStack[this._loopStack.length-1],l=this._commandIndex;n.loopOutIndex===-1&&(n.loopOutIndex=this._commandIndex),n.loopCount-=1,0<n.loopCount?l=n.loopTopIndex:this._loopStack.pop(),this._commandIndex=l}}]),e}();function ls(e){var t=0;return{next:function(){return t<e.length?{done:!1,value:e[t++]}:{done:!0}}}}function Mi(e){return e.type===le.Note||e.type===le.Rest}var is=ns;(function(e){e.exports=is})(Hi);const Vi=Bo(Hi.exports);var St={};(function(e){var t=+Math.PI*2,n=16,l=1,i=Math.sin,s=Math.pow,m=Math.abs,h=1e-6,M=window.AudioContext||window.webkitAudioContext;e.SampleRate=0,e.Sec=0,e.SetSampleRate=function(r){e.SampleRate=r|0,e.Sec=r|0},e.SetSampleRate(on()),e.Live=function(){var r={};return r._generate=function(d){var f=new N(d,e.DefaultModules),v=me(f.getSamplesLeft());return f.generate(v),v},r},e.Module={},e.G={};var y=e.stage={PhaseSpeed:0,PhaseSpeedMod:10,Generator:20,SampleMod:30,Volume:40};function S(r,d){return r.stage-d.stage}e.InitDefaultParams=b;function b(r,d){for(var f=0;f<d.length;f+=1){var v=d[f],C=r[v.name]||{};k(v.params,function(j,w){typeof C[w]>"u"&&(C[w]=j.D)}),r[v.name]=C}}e.Processor=N;function N(r,d){r=r||{},d=d||e.DefaultModules,typeof r=="function"?r=r():r=JSON.parse(JSON.stringify(r)),this.finished=!1,this.state={SampleRate:r.SampleRate||e.SampleRate},d=d.slice(),d.sort(S),this.modules=d,b(r,d);for(var f=0;f<this.modules.length;f+=1){var v=this.modules[f];this.modules[f].setup(this.state,r[v.name])}}N.prototype={generate:function(r){for(var d=0;d<r.length;d+=1)r[d]=0;if(!this.finished){for(var f=this.state,v=r.length|0,d=0;d<this.modules.length;d+=1){var C=this.modules[d],j=C.process(f,r.subarray(0,v))|0;v=Math.min(v,j)}v<r.length&&(this.finished=!0);for(var d=v;d<r.length;d++)r[d]=0}},getSamplesLeft:function(){for(var r=0,d=0;d<this.state.envelopes.length;d+=1)r+=this.state.envelopes[d].N;return r===0&&(r=3*this.state.SampleRate),r}},e.Module.Frequency={name:"Frequency",params:{Start:{L:30,H:1800,D:440},Min:{L:30,H:1800,D:30},Max:{L:30,H:1800,D:1800},Slide:{L:-1,H:1,D:0},DeltaSlide:{L:-1,H:1,D:0},RepeatSpeed:{L:0,H:3,D:0},ChangeAmount:{L:-12,H:12,D:0},ChangeSpeed:{L:0,H:1,D:0}},stage:y.PhaseSpeed,setup:function(r,d){var f=r.SampleRate;r.phaseParams=d,r.phaseSpeed=d.Start*t/f,r.phaseSpeedMax=d.Max*t/f,r.phaseSpeedMin=d.Min*t/f,r.phaseSpeedMin=Math.min(r.phaseSpeedMin,r.phaseSpeed),r.phaseSpeedMax=Math.max(r.phaseSpeedMax,r.phaseSpeed),r.phaseSlide=1+s(d.Slide,3)*64/f,r.phaseDeltaSlide=s(d.DeltaSlide,3)/(f*1e3),r.repeatTime=0,r.repeatLimit=1/0,d.RepeatSpeed>0&&(r.repeatLimit=d.RepeatSpeed*f),r.arpeggiatorTime=0,r.arpeggiatorLimit=d.ChangeSpeed*f,d.ChangeAmount==0&&(r.arpeggiatorLimit=1/0),r.arpeggiatorMod=1+d.ChangeAmount/12},process:function(r,d){for(var f=+r.phaseSpeed,v=+r.phaseSpeedMin,C=+r.phaseSpeedMax,j=+r.phaseSlide,w=+r.phaseDeltaSlide,F=r.repeatTime,E=r.repeatLimit,G=r.arpeggiatorTime,H=r.arpeggiatorLimit,Q=r.arpeggiatorMod,Y=0;Y<d.length;Y++){if(j+=w,f*=j,f=f<v?v:f>C?C:f,F>E)return this.setup(r,r.phaseParams),Y+this.process(r,d.subarray(Y))-1;F++,G>H&&(f*=Q,G=0,H=1/0),G++,d[Y]+=f}return r.repeatTime=F,r.arpeggiatorTime=G,r.arpeggiatorLimit=H,r.phaseSpeed=f,r.phaseSlide=j,d.length}},e.Module.Vibrato={name:"Vibrato",params:{Depth:{L:0,H:1,D:0},DepthSlide:{L:-1,H:1,D:0},Frequency:{L:.01,H:48,D:0},FrequencySlide:{L:-1,H:1,D:0}},stage:y.PhaseSpeedMod,setup:function(r,d){var f=r.SampleRate;r.vibratoPhase=0,r.vibratoDepth=d.Depth,r.vibratoPhaseSpeed=d.Frequency*t/f,r.vibratoPhaseSpeedSlide=1+s(d.FrequencySlide,3)*3/f,r.vibratoDepthSlide=d.DepthSlide/f},process:function(r,d){var f=+r.vibratoPhase,v=+r.vibratoDepth,C=+r.vibratoPhaseSpeed,j=+r.vibratoPhaseSpeedSlide,w=+r.vibratoDepthSlide;if(v==0&&w<=0)return d.length;for(var F=0;F<d.length;F++)f+=C,f>t&&(f-=t),d[F]+=d[F]*i(f)*v,C*=j,v+=w,v=ue(v);return r.vibratoPhase=f,r.vibratoDepth=v,r.vibratoPhaseSpeed=C,d.length}},e.Module.Generator={name:"Generator",params:{Func:{C:e.G,D:"square"},A:{L:0,H:1,D:0},B:{L:0,H:1,D:0},ASlide:{L:-1,H:1,D:0},BSlide:{L:-1,H:1,D:0}},stage:y.Generator,setup:function(r,d){r.generatorPhase=0,typeof d.Func=="string"?r.generator=e.G[d.Func]:r.generator=d.Func,typeof r.generator=="object"&&(r.generator=r.generator.create()),q(typeof r.generator=="function","generator must be a function"),r.generatorA=d.A,r.generatorASlide=d.ASlide,r.generatorB=d.B,r.generatorBSlide=d.BSlide},process:function(r,d){return r.generator(r,d)}};var T=1<<16;e.Module.Guitar={name:"Guitar",params:{A:{L:0,H:1,D:1},B:{L:0,H:1,D:1},C:{L:0,H:1,D:1}},stage:y.Generator,setup:function(r,d){r.guitarA=d.A,r.guitarB=d.B,r.guitarC=d.C,r.guitarBuffer=me(T),r.guitarHead=0;for(var f=r.guitarBuffer,v=0;v<f.length;v++)f[v]=J()*2-1},process:function(r,d){for(var f=T,v=f-1,C=+r.guitarA,j=+r.guitarB,w=+r.guitarC,F=C+j+w,E=r.guitarHead,G=r.guitarBuffer,H=0;H<d.length;H++){var Q=t/d[H]|0;Q=Q>f?f:Q;var Y=E-Q+f&v;G[E]=(G[Y-0+f&v]*C+G[Y-1+f&v]*j+G[Y-2+f&v]*w)/F,d[H]=G[E],E=E+1&v}return r.guitarHead=E,d.length}},e.Module.Filter={name:"Filter",params:{LP:{L:0,H:1,D:1},LPSlide:{L:-1,H:1,D:0},LPResonance:{L:0,H:1,D:0},HP:{L:0,H:1,D:0},HPSlide:{L:-1,H:1,D:0}},stage:y.SampleMod+0,setup:function(r,d){r.FilterEnabled=d.HP>h||d.LP<1-h,r.LPEnabled=d.LP<1-h,r.LP=s(d.LP,3)/10,r.LPSlide=1+d.LPSlide*100/r.SampleRate,r.LPPos=0,r.LPPosSlide=0,r.LPDamping=5/(1+s(d.LPResonance,2)*20)*(.01+d.LP),r.LPDamping=1-Math.min(r.LPDamping,.8),r.HP=s(d.HP,2)/10,r.HPPos=0,r.HPSlide=1+d.HPSlide*100/r.SampleRate},enabled:function(r){return r.FilterEnabled},process:function(r,d){if(!this.enabled(r))return d.length;for(var f=+r.LP,v=+r.LPPos,C=+r.LPPosSlide,j=+r.LPSlide,w=+r.LPDamping,F=+r.LPEnabled,E=+r.HP,G=+r.HPPos,H=+r.HPSlide,Q=0;Q<d.length;Q++){(E>h||E<-h)&&(E*=H,E=E<h?h:E>.1?.1:E);var Y=v;f*=j,f=f<0?f=0:f>.1?.1:f;var ve=d[Q];F?(C+=(ve-v)*f,C*=w):(v=ve,C=0),v+=C,G+=v-Y,G*=1-E,d[Q]=G}return r.LPPos=v,r.LPPosSlide=C,r.LP=f,r.HP=E,r.HPPos=G,d.length}};var R=1<<10;e.Module.Phaser={name:"Phaser",params:{Offset:{L:-1,H:1,D:0},Sweep:{L:-1,H:1,D:0}},stage:y.SampleMod+1,setup:function(r,d){r.phaserBuffer=me(R),r.phaserPos=0,r.phaserOffset=s(d.Offset,2)*(R-4),r.phaserOffsetSlide=s(d.Sweep,3)*4e3/r.SampleRate},enabled:function(r){return m(r.phaserOffsetSlide)>h||m(r.phaserOffset)>h},process:function(r,d){if(!this.enabled(r))return d.length;for(var f=R,v=f-1,C=r.phaserBuffer,j=r.phaserPos|0,w=+r.phaserOffset,F=+r.phaserOffsetSlide,E=0;E<d.length;E++){w+=F,w<0&&(w=-w,F=-F),w>v&&(w=v,F=0),C[j]=d[E];var G=j-(w|0)+f&v;d[E]+=C[G],j=j+1&v|0}return r.phaserPos=j,r.phaserOffset=w,d.length}},e.Module.Volume={name:"Volume",params:{Master:{L:0,H:1,D:.5},Attack:{L:.001,H:1,D:.01},Sustain:{L:0,H:2,D:.3},Punch:{L:0,H:3,D:1},Decay:{L:.001,H:2,D:1}},stage:y.Volume,setup:function(r,d){var f=r.SampleRate,v=d.Master,C=v*(1+d.Punch);r.envelopes=[{S:0,E:v,N:d.Attack*f|0},{S:C,E:v,N:d.Sustain*f|0},{S:v,E:0,N:d.Decay*f|0}];for(var j=0;j<r.envelopes.length;j+=1){var w=r.envelopes[j];w.G=(w.E-w.S)/w.N}},process:function(r,d){for(var f=0;r.envelopes.length>0&&f<d.length;){for(var v=r.envelopes[0],C=v.S,j=v.G,w=Math.min(d.length-f,v.N)|0,F=f+w|0;f<F;f+=1)d[f]*=C,C+=j,C=W(C,0,10);v.S=C,v.N-=w,v.N<=0&&r.envelopes.shift()}return f}},e.DefaultModules=[e.Module.Frequency,e.Module.Vibrato,e.Module.Generator,e.Module.Filter,e.Module.Phaser,e.Module.Volume],e.DefaultModules.sort(S),e.EmptyParams=z;function z(){return k(e.Module,function(){return{}})}e._RemoveEmptyParams=K;function K(r){for(var d in r)V(r[d]).length==0&&delete r[d]}e.Preset={Reset:function(){return z()},Coin:function(){var r=z();return r.Frequency.Start=p(880,660),r.Volume.Sustain=p(.1),r.Volume.Decay=p(.4,.1),r.Volume.Punch=p(.3,.3),p()<.5&&(r.Frequency.ChangeSpeed=p(.15,.1),r.Frequency.ChangeAmount=p(8,4)),K(r),r},Laser:function(){var r=z();return r.Generator.Func=je(["saw","sine"]),p()<.33?(r.Frequency.Start=p(880,440),r.Frequency.Min=p(.1),r.Frequency.Slide=p(.3,-.8)):(r.Frequency.Start=p(1200,440),r.Frequency.Min=r.Frequency.Start-p(880,440),r.Frequency.Min<110&&(r.Frequency.Min=110),r.Frequency.Slide=p(.3,-1)),p()<.5?(r.Generator.A=p(.5),r.Generator.ASlide=p(.2)):(r.Generator.A=p(.5,.4),r.Generator.ASlide=p(.7)),r.Volume.Sustain=p(.2,.1),r.Volume.Decay=p(.4),p()<.5&&(r.Volume.Punch=p(.3)),p()<.33&&(r.Phaser.Offset=p(.2),r.Phaser.Sweep=p(.2)),p()<.5&&(r.Filter.HP=p(.3)),K(r),r},Explosion:function(){var r=z();return r.Generator.Func="noise",p()<.5?(r.Frequency.Start=p(440,40),r.Frequency.Slide=p(.4,-.1)):(r.Frequency.Start=p(1600,220),r.Frequency.Slide=p(-.2,-.2)),p()<.2&&(r.Frequency.Slide=0),p()<.3&&(r.Frequency.RepeatSpeed=p(.5,.3)),r.Volume.Sustain=p(.3,.1),r.Volume.Decay=p(.5),r.Volume.Punch=p(.6,.2),p()<.5&&(r.Phaser.Offset=p(.9,-.3),r.Phaser.Sweep=p(-.3)),p()<.33&&(r.Frequency.ChangeSpeed=p(.3,.6),r.Frequency.ChangeAmount=p(24,-12)),K(r),r},Powerup:function(){var r=z();return p()<.5?r.Generator.Func="saw":r.Generator.A=p(.6),r.Frequency.Start=p(220,440),p()<.5?(r.Frequency.Slide=p(.5,.2),r.Frequency.RepeatSpeed=p(.4,.4)):(r.Frequency.Slide=p(.2,.05),p()<.5&&(r.Vibrato.Depth=p(.6,.1),r.Vibrato.Frequency=p(30,10))),r.Volume.Sustain=p(.4),r.Volume.Decay=p(.4,.1),K(r),r},Hit:function(){var r=z();return r.Generator.Func=je(["saw","noise"]),r.Generator.A=p(.6),r.Generator.ASlide=p(1,-.5),r.Frequency.Start=p(880,220),r.Frequency.Slide=-p(.4,.3),r.Volume.Sustain=p(.1),r.Volume.Decay=p(.2,.1),p()<.5&&(r.Filter.HP=p(.3)),K(r),r},Jump:function(){var r=z();return r.Generator.Func="square",r.Generator.A=p(.6),r.Frequency.Start=p(330,330),r.Frequency.Slide=p(.4,.2),r.Volume.Sustain=p(.3,.1),r.Volume.Decay=p(.2,.1),p()<.5&&(r.Filter.HP=p(.3)),p()<.3&&(r.Filter.LP=p(-.6,1)),K(r),r},Select:function(){var r=z();return r.Generator.Func=je(["square","saw"]),r.Generator.A=p(.6),r.Frequency.Start=p(660,220),r.Volume.Sustain=p(.1,.1),r.Volume.Decay=p(.2),r.Filter.HP=.2,r.Volume.Master=.4,K(r),r},Lucky:function(){var r=z();return k(r,function(d,f){var v=e.Module[f].params;k(v,function(C,j){if(C.C){var w=V(C.C);d[j]=w[w.length*J()|0]}else d[j]=J()*(C.H-C.L)+C.L})}),r.Volume.Master=.4,r.Filter={},K(r),r},Synth:function(){var r=z();return r.Generator.Func=je(["square","saw"]),r.Frequency.Start=je([340,240,170]),r.Volume.Attack=p()>.6?p(.5):0,r.Volume.Sustain=p(1),r.Volume.Punch=p(1),r.Volume.Decay=p(.9)+.1,r.Generator.A=p(1),p()<.25&&(r.Filter.HP=p(1)),p()<.25&&(r.Filter.LP=p(1)),K(r),r},Tone:function(){var r=z();return r.Generator.Func="square",r.Frequency.Start=261.6,r.Volume.Sustain=.6441,r.Volume.Master=.7,K(r),r},Click:function(){var r=e.Preset.Hit();return p()<.5&&(r.Frequency.Slide=-.5+p(1)),p()<.5&&(r.Volume.Sustain*=p(.4)+.2,r.Volume.Decay*=p(.4)+.2),r.Frequency.Start=p(1200,440),K(r),r}},e.G.unoise=ee("sample = Math.random();"),e.G.sine=ee("sample = Math.sin(phase);"),e.G.saw=ee("sample = 2*(phase/TAU - ((phase/TAU + 0.5)|0));"),e.G.triangle=ee("sample = Math.abs(4 * ((phase/TAU - 0.25)%1) - 2) - 1;"),e.G.square=ee("var s = Math.sin(phase); sample = s > A ? 1.0 : s < A ? -1.0 : A;"),e.G.synth=ee("sample = Math.sin(phase) + .5*Math.sin(phase/2) + .3*Math.sin(phase/4);"),e.G.noise=ee("if(phase % TAU < 4){__noiseLast = Math.random() * 2 - 1;} sample = __noiseLast;"),e.G.string={create:function(){for(var r=65536,d=r-1,f=me(r),v=0;v<f.length;v++)f[v]=J()*2-1;var C=0;return function(j,w){for(var F=Math.PI*2,E=+j.generatorA,G=+j.generatorASlide,H=+j.generatorB,Q=+j.generatorBSlide,Y=f,ve=0;ve<w.length;ve++){var sn=w[ve],wt=F/sn|0;E+=G,H+=Q,E=E<0?0:E>1?1:E,H=H<0?0:H>1?1:H;var Ye=C-wt+r&d,Te=(Y[Ye-0+r&d]*1+Y[Ye-1+r&d]*E+Y[Ye-2+r&d]*H)/(1+E+H);Y[C]=Te,w[ve]=Y[C],C=C+1&d}return j.generatorA=E,j.generatorB=H,w.length}}};function ee(r){return new Function("$","block",`var TAU = Math.PI * 2;
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
`)}e.CreateAudio=ce;function ce(r){typeof Float32Array<"u"&&q(r instanceof Float32Array,"data must be an Float32Array");var d=l*n>>3,f=e.SampleRate*d,v=$e(8+36+r.length*2),C=0;function j(F){for(var E=0;E<F.length;E+=1)v[C]=F.charCodeAt(E),C++}function w(F,E){E<=0||(v[C]=F&255,C++,w(F>>8,E-1))}return j("RIFF"),w(36+r.length*2,4),j("WAVEfmt "),w(16,4),w(1,2),w(l,2),w(e.SampleRate,4),w(f,4),w(d,2),w(n,2),j("data"),w(r.length*2,4),Ce(v.subarray(C),r),new Audio("data:audio/wav;base64,"+an(v))}e.DownloadAsFile=function(r){q(r instanceof Audio,"input must be an Audio object"),document.location.href=r.src},e.Util={},e.Util.CopyFToU8=Ce;function Ce(r,d){q(r.length/2==d.length,"the target buffer must be twice as large as the iinput");for(var f=0,v=0;v<d.length;v++){var C=+d[v],j=C*32767|0;j=j<-32768?-32768:32767<j?32767:j,j+=j<0?65536:0,r[f]=j&255,f++,r[f]=j>>8,f++}}function an(r){for(var d=32768,f="",v=0;v<r.length;v+=d){var C=Math.min(v+d,r.length);f+=String.fromCharCode.apply(null,r.subarray(v,C))}return btoa(f)}function on(){return typeof M<"u"?new M().sampleRate:44100}function q(r,d){if(!r)throw new Error(d)}function W(r,d,f){return r=+r,d=+d,f=+f,r<d?+d:r>f?+f:+r}function ue(r){return r=+r,r<0?0:r>1?1:+r}function k(r,d){var f={};for(var v in r)r.hasOwnProperty(v)&&(f[v]=d(r[v],v));return f}function p(r,d){var f=J();return r!==void 0&&(f*=r),d!==void 0&&(f+=d),f}function je(r){return r[r.length*J()|0]}function V(r){var d=[];for(var f in r)d.push(f);return d}e._createFloatArray=me;function me(r){if(typeof Float32Array>"u")for(var d=new Array(r),f=0;f<d.length;f++)d[f]=0;return new Float32Array(r)}function $e(r){if(typeof Uint8Array>"u")for(var d=new Array(r),f=0;f<d.length;f++)d[f]=0;return new Uint8Array(r)}var He=Math.random;e.setRandomFunc=function(r){He=r};function J(){return He()}})(St={});let xe,pi,tn,Jn,Ji,gi=!1;function rs(e=void 0){xe=e==null?new(window.AudioContext||window.webkitAudioContext):e,Ki(),Xi(),Wi()}function as(){gi||(gi=!0,Qi())}function Ki(e=120){pi=e,tn=60/pi}function Xi(e=8){Jn=e>0?4/e:void 0}function Wi(e=.1){Ji=e}function sl(e){if(Jn==null)return e;const t=tn*Jn;return t>0?Math.ceil(e/t)*t:e}function Qi(){const e=xe.createBufferSource();e.start=e.start||e.noteOn,e.start()}function os(){xe.resume()}class cl{constructor(t=null){Pt(this,"x");Pt(this,"y");Pt(this,"z");Pt(this,"w");this.setSeed(t)}get(t=1,n){return n==null&&(n=t,t=0),this.next()/4294967295*(n-t)+t}getInt(t,n){n==null&&(n=t,t=0);const l=Math.floor(t),i=Math.floor(n);return i===l?l:this.next()%(i-l)+l}getPlusOrMinus(){return this.getInt(2)*2-1}select(t){return t[this.getInt(t.length)]}setSeed(t,n=123456789,l=362436069,i=521288629,s=32){this.w=t!=null?t>>>0:Math.floor(Math.random()*4294967295)>>>0,this.x=n>>>0,this.y=l>>>0,this.z=i>>>0;for(let m=0;m<s;m++)this.next();return this}getState(){return{x:this.x,y:this.y,z:this.z,w:this.w}}next(){const t=this.x^this.x<<11;return this.x=this.y,this.y=this.z,this.z=this.w,this.w=(this.w^this.w>>>19^(t^t>>>8))>>>0,this.w}}function ae(e,t){let n=[];for(let l=0;l<e;l++)n.push(t(l));return n}function Yi(e){return 440*Math.pow(2,(e-69)/12)}function ul(e){let t=0;const n=e.length;for(let l=0;l<n;l++){const i=e.charCodeAt(l);t=(t<<5)-t+i,t|=0}return t}function Zi(e,t=0,n=1){return Math.max(t,Math.min(e,n))}const ml=["coin","laser","explosion","powerUp","hit","jump","select","lucky","random","click","synth","tone"],ss={coin:"Coin",laser:"Laser",explosion:"Explosion",powerUp:"Powerup",hit:"Hit",jump:"Jump",select:"Select",lucky:"Lucky",random:"Lucky",click:"Click",synth:"Synth",tone:"Tone"},Kt=new cl;let dl,er;function cs(){er=St.Live(),dl=[],St.setRandomFunc(()=>Kt.get())}function vi(e){Ps(e)}function us(e){dl.forEach(t=>{Ms(t,e)})}function Xt(e=void 0,t=void 0,n=2,l=.5,i=void 0,s=1,m=1){t!=null&&Kt.setSeed(t);const h=St.Preset[ss[e!=null?e:ml[Kt.getInt(8)]]],M=ae(n,()=>{const y=h();return i!=null&&y.Frequency.Start!=null&&(y.Frequency.Start=i),y.Volume.Attack!=null&&(y.Volume.Attack*=s),y.Volume.Sustain!=null&&(y.Volume.Sustain*=m),y});return ms(e,M,l)}function ms(e,t,n){const l=t.map(s=>{const m=er._generate(s),h=xe.createBuffer(1,m.length,St.SampleRate);var M=h.getChannelData(0);return M.set(m),h}),i=xe.createGain();return i.gain.value=n*Ji,i.connect(xe.destination),{type:e,params:t,volume:n,buffers:l,bufferSourceNodes:void 0,gainNode:i,isPlaying:!1,playedTime:void 0}}function ds(e,t,n,l,i){const s=new cl;s.setSeed(n);let m;if(t){let h=s.select(["hit","click","explosion"]);l!=null&&(h=l),m=Xt(h,s.getInt(999999999),h==="explosion"?1:2,i!=null?i:h==="explosion"?.4:.5,s.get(100,200),h==="explosion"?.5:1,h==="explosion"?.2:1)}else{const h=fs(e);let M=s.get()<1/h?"select":s.select(["tone","tone","synth"]);l!=null&&(M=l),m=Xt(M,s.getInt(999999999),M!=="select"?1:2,i!=null?i:.3,261.6,M!=="select"?.1:1,M!=="select"?2:1)}return m.isDrum=t,m.seed=n,m}function fs(e){if(e==null||e.notes.length===0)return 1;let t=0,n=0;return e.notes.forEach(l=>{const i=l.quantizedEndStep-l.quantizedStartStep;i>0&&(t+=i,n++)}),t/n}function hs(e){dl.push(e)}function Ps(e){e.isPlaying=!0}function Ms(e,t){if(!e.isPlaying)return;e.isPlaying=!1;const n=sl(t);(e.playedTime==null||n>e.playedTime)&&(Kn(e,n),e.playedTime=n)}function Kn(e,t,n=void 0){e.bufferSourceNodes=[],e.buffers.forEach(l=>{const i=xe.createBufferSource();if(i.buffer=l,n!=null&&i.playbackRate!=null){const s=Math.pow(2,.08333333333333333);i.playbackRate.value=Math.pow(s,n)}i.start=i.start||i.noteOn,i.connect(e.gainNode),i.start(t),e.bufferSourceNodes.push(i)})}function Xn(e,t=void 0){e.bufferSourceNodes!=null&&(e.bufferSourceNodes.forEach(n=>{t==null?n.stop():n.stop(t)}),e.bufferSourceNodes=void 0)}const ps=100;function gs(e){let t=`${e}`,n;ml.forEach(S=>{const b=`@${S}`,N=t.indexOf(b);N>=0&&(n=S,t=`${t.slice(0,N)}${t.slice(N+b.length)}`)});const l="@d",i=t.indexOf(l);let s=!1;i>=0&&(s=!0,t=`${t.slice(0,i)}${t.slice(i+l.length)}`);const m=t.match(/@s\d+/);let h=1;m!=null&&(h=Number.parseInt(m[0].substring(2)),t=t.replace(/@s\d+/,""));const M=t.match(/v\d+/);let y=.5;return M!=null&&(y=Number.parseInt(M[0].substring(1))/ps,t=t.replace(/v\d+/,"")),{mml:t,args:{isDrum:s,seed:h,type:n,volume:y}}}function tr(e,t,n,l){return{mml:e,sequence:t,soundEffect:n,noteIndex:0,endStep:-1,visualizer:l}}function vs(e,t,n){const l=t.sequence.notes[t.noteIndex];l!=null&&((t.soundEffect.type==="synth"||t.soundEffect.type==="tone")&&t.endStep===e.notesStepsIndex&&Xn(t.soundEffect,n),l.quantizedStartStep===e.notesStepsIndex&&((t.soundEffect.type==="synth"||t.soundEffect.type==="tone")&&Xn(t.soundEffect),t.soundEffect.isDrum?Kn(t.soundEffect,n):Kn(t.soundEffect,n,l.pitch-69),t.visualizer!=null&&t.visualizer.redraw(l),t.endStep=l.quantizedEndStep,t.endStep>=e.notesStepsCount&&(t.endStep-=e.notesStepsCount),t.noteIndex++,t.noteIndex>=t.sequence.notes.length&&(t.noteIndex=0)))}let We=[];function ys(){rr(),We=[]}function nr(e,t,n=1){e.forEach(i=>{i.noteIndex=0});const l={parts:e,notesStepsCount:t,notesStepsIndex:void 0,noteInterval:void 0,nextNotesTime:void 0,speedRatio:n,isPlaying:!1,isLooping:!1};return lr(l),l}function lr(e){const t=tn/4/e.speedRatio;e.notesStepsIndex=0,e.noteInterval=t,e.nextNotesTime=sl(xe.currentTime)-t}function fl(e){We.push(e)}function ir(e){We=We.filter(t=>t!==e)}function bs(e){We.forEach(t=>{Ss(t,e)})}function hl(e,t=!1){e.isLooping=t,lr(e),e.isPlaying=!0}function Pl(e){e.isPlaying=!1,e.parts.forEach(t=>{Xn(t.soundEffect)})}function rr(){We.forEach(e=>{Pl(e)})}function Ss(e,t){!e.isPlaying||t<e.nextNotesTime||(e.nextNotesTime+=e.noteInterval,e.nextNotesTime<t-tn&&(e.nextNotesTime=sl(t)),e.parts.forEach(n=>{vs(e,n,e.nextNotesTime)}),e.notesStepsIndex++,e.notesStepsIndex>=e.notesStepsCount&&(e.isLooping?e.notesStepsIndex=0:e.isPlaying=!1))}const ar={c:"coin",l:"laser",e:"explosion",p:"powerUp",h:"hit",j:"jump",s:"select",u:"random",r:"random",i:"click",y:"synth",t:"tone"},$=Kt;let Ml=1;function As(e){Ml=e}function Ns(e,t,n,l,i,s,m){$.setSeed(Ml+ul(e)),ur(),gt=null;let h=$.select(s);const M=ae(i,()=>{const y=Math.floor(Math.abs($.get()+$.get()-1)*3),S=Math.floor(($.get()+$.get()-1)*10),b=Math.abs($.get()+$.get()-1),N=$.get()<.25;N||(h=$.select(s));const T=$.get()<.5,R=$.get()<.5,z=$.get()<.9;return sr(n,h,t,.7,y,S,b,N,T,R,z,void 0,m)});return or(M,.5/l)}function ws(e="0",t=!1,n=69-12,l=16,i=.25,s=4,m=1){$.setSeed(Ml+ul(e)),ur(),gt=null;let h=ar[e[0]];h==null&&(h=ml[$.getInt(8)]);let M=.8;t&&(i/=4,M/=2);const y=ae(s,()=>{const S=Math.floor(Math.abs($.get()+$.get()-1)*3),b=Math.floor(($.get()+$.get()-1)*10),N=t?2:Math.abs($.get()+$.get()-1),T=$.get()<.25,R=t?!1:$.get()<.5,z=$.get()<.5,K=t?$.get()<.25:$.get()<.9,ee=$.get(.5);return sr(l,h,n,M,S,b,N,T,R,z,K,ee,m)});return or(y,.5/i)}function or(e,t){const n=e.map(l=>{const i=[];return l.notes.forEach((s,m)=>{s!=null&&i.push({pitch:s+69,quantizedStartStep:m*2})}),tr(void 0,{notes:i},l.soundEffect)});return nr(n,e[0].notes.length*2,t)}let gt;function sr(e=32,t,n=60,l=1,i=0,s=0,m=1,h=!1,M=!1,y=!1,S=!1,b=null,N=.1){const T=Es(t,Yi(n),l,N);if(gt!=null&&h)T.noteRatios=gt.noteRatios;else{const R=b!=null?js(e,b):xs(e);T.noteRatios=Ts(R,M?0:-1,1,m,S)}return T.notes=Is(T.noteRatios,i,s,y),gt=T,T}function xs(e){let t=ae(e,()=>!1),n=4;for(;n<=e;)t=Cs(t,n),n*=2;return t}function Cs(e,t){let n=ae(t,()=>!1);const l=Math.floor(Math.abs($.get()+$.get()-1)*4);for(let i=0;i<l;i++)n[$.getInt(t-1)]=!0;return e.map((i,s)=>n[s%t]?!i:i)}function js(e,t){return ae(e,()=>$.get()>=t)}const cr=[[0,4,7],[0,3,7],[0,4,7,10],[0,4,7,11],[0,3,7,10]],Un=[[[0,0],[7,0],[9,1],[4,1]],[[5,0],[0,0],[5,0],[7,0]],[[5,3],[7,2],[4,4],[9,1]],[[9,1],[2,1],[7,0],[0,0]],[[9,1],[5,0],[7,0],[0,0]]];let Xe;function ur(){Xe=$.select(Un).map((t,n)=>[$.get()<.7?t[0]:Un[$.getInt(Un.length)][n][0],$.get()<.7?t[1]:$.getInt(cr.length)])}function Ts(e,t,n,l,i){let s=$.get(),m=$.get(-.5,.5),M=e.length/Xe.length,y=[];return e.forEach((S,b)=>{let N=Math.floor(b/M),T=b%M;if(i&&N===Math.floor(Xe.length/2)){y.push(y[T]),y[T]!=null&&(s=y[T]);return}if(!S){y.push(null);return}y.push(s),m+=$.get(-.25,.25),s+=m*l,($.get()<.2||s<=t||s>=n)&&(s-=m*2,m*=-1)}),y}function Is(e,t,n,l){let s=e.length/Xe.length;return e.map((m,h)=>{if(m==null)return null;let M=Math.floor(h/s),y=Xe[M][0],S=cr[Xe[M][1]],b=m;l&&(b=Math.floor(b*2)/2);let N=Math.floor(b),T=Math.floor((b-N)*S.length);for(T+=t+$.getInt(-n,n+1);T>=S.length;)T-=S.length,N++;for(;T<0;)T+=S.length,N--;return y+N*12+S[T]})}function Es(e,t,n,l){return{noteRatios:void 0,notes:void 0,soundEffect:Xt(e,void 0,1,l,t,n,n)}}function Ls(e){return e!==null&&typeof e=="object"&&"name"in e&&typeof e.name=="string"}function Os(e){return e!==null&&typeof e=="object"&&"step"in e&&typeof e.step=="number"&&"alt"in e&&typeof e.alt=="number"&&!isNaN(e.step)&&!isNaN(e.alt)}var mr=[0,2,4,-1,1,3,5],dr=mr.map(e=>Math.floor(e*7/12));function $s(e){const{step:t,alt:n,oct:l,dir:i=1}=e,s=mr[t]+7*n;if(l===void 0)return[i*s];const m=l-dr[t]-4*n;return[i*s,i*m]}var _s=[3,0,4,1,5,2,6];function Rs(e){const[t,n,l]=e,i=_s[ks(t)],s=Math.floor((t+1)/7);if(n===void 0)return{step:i,alt:s,dir:l};const m=n+4*s+dr[i];return{step:i,alt:s,oct:m,dir:l}}function ks(e){const t=(e+1)%7;return t<0?7+t:t}var yi=(e,t)=>Array(Math.abs(t)+1).join(e),Wn=Object.freeze({empty:!0,name:"",num:NaN,q:"",type:"",step:NaN,alt:NaN,dir:NaN,simple:NaN,semitones:NaN,chroma:NaN,coord:[],oct:NaN}),Fs="([-+]?\\d+)(d{1,4}|m|M|P|A{1,4})",Ds="(AA|A|P|M|m|d|dd)([-+]?\\d+)",Bs=new RegExp("^"+Fs+"|"+Ds+"$");function zs(e){const t=Bs.exec(`${e}`);return t===null?["",""]:t[1]?[t[1],t[2]]:[t[4],t[3]]}var bi={};function Wt(e){return typeof e=="string"?bi[e]||(bi[e]=Us(e)):Os(e)?Wt(qs(e)):Ls(e)?Wt(e.name):Wn}var Si=[0,2,4,5,7,9,11],fr="PMMPPMM";function Us(e){const t=zs(e);if(t[0]==="")return Wn;const n=+t[0],l=t[1],i=(Math.abs(n)-1)%7,s=fr[i];if(s==="M"&&l==="P")return Wn;const m=s==="M"?"majorable":"perfectable",h=""+n+l,M=n<0?-1:1,y=n===8||n===-8?n:M*(i+1),S=Hs(m,l),b=Math.floor((Math.abs(n)-1)/7),N=M*(Si[i]+S+12*b),T=(M*(Si[i]+S)%12+12)%12,R=$s({step:i,alt:S,oct:b,dir:M});return{empty:!1,name:h,num:n,q:l,step:i,alt:S,dir:M,type:m,simple:y,semitones:N,chroma:T,coord:R,oct:b}}function Gs(e,t){const[n,l=0]=e,i=n*7+l*12<0,s=t||i?[-n,-l,-1]:[n,l,1];return Wt(Rs(s))}function Hs(e,t){return t==="M"&&e==="majorable"||t==="P"&&e==="perfectable"?0:t==="m"&&e==="majorable"?-1:/^A+$/.test(t)?t.length:/^d+$/.test(t)?-1*(e==="perfectable"?t.length:t.length+1):0}function qs(e){const{step:t,alt:n,oct:l=0,dir:i}=e;if(!i)return"";const s=t+1+7*l,m=s===0?t+1:s,h=i<0?"-":"",M=fr[t]==="M"?"majorable":"perfectable";return h+m+Vs(M,n)}function Vs(e,t){return t===0?e==="majorable"?"M":"P":t===-1&&e==="majorable"?"m":t>0?yi("A",t):yi("d",e==="perfectable"?t:t+1)}function Js(e){return e!==null&&typeof e=="object"&&"name"in e&&typeof e.name=="string"}function Ks(e){return e!==null&&typeof e=="object"&&"step"in e&&typeof e.step=="number"&&"alt"in e&&typeof e.alt=="number"&&!isNaN(e.step)&&!isNaN(e.alt)}var hr=[0,2,4,-1,1,3,5],Pr=hr.map(e=>Math.floor(e*7/12));function Xs(e){const{step:t,alt:n,oct:l,dir:i=1}=e,s=hr[t]+7*n;if(l===void 0)return[i*s];const m=l-Pr[t]-4*n;return[i*s,i*m]}var Ws=[3,0,4,1,5,2,6];function Qs(e){const[t,n,l]=e,i=Ws[Ys(t)],s=Math.floor((t+1)/7);if(n===void 0)return{step:i,alt:s,dir:l};const m=n+4*s+Pr[i];return{step:i,alt:s,oct:m,dir:l}}function Ys(e){const t=(e+1)%7;return t<0?7+t:t}var Ai=(e,t)=>Array(Math.abs(t)+1).join(e),Mr=Object.freeze({empty:!0,name:"",letter:"",acc:"",pc:"",step:NaN,alt:NaN,chroma:NaN,height:NaN,coord:[],midi:null,freq:null}),Ni=new Map,Zs=e=>"CDEFGAB".charAt(e),pr=e=>e<0?Ai("b",-e):Ai("#",e),gr=e=>e[0]==="b"?-e.length:e.length;function ie(e){const t=JSON.stringify(e),n=Ni.get(t);if(n)return n;const l=typeof e=="string"?lc(e):Ks(e)?ie(ic(e)):Js(e)?ie(e.name):Mr;return Ni.set(t,l),l}var ec=/^([a-gA-G]?)(#{1,}|b{1,}|x{1,}|)(-?\d*)\s*(.*)$/;function pl(e){const t=ec.exec(e);return t?[t[1].toUpperCase(),t[2].replace(/x/g,"##"),t[3],t[4]]:["","","",""]}function tc(e){return ie(Qs(e))}var nc=(e,t)=>(e%t+t)%t,Gn=[0,2,4,5,7,9,11];function lc(e){const t=pl(e);if(t[0]===""||t[3]!=="")return Mr;const n=t[0],l=t[1],i=t[2],s=(n.charCodeAt(0)+3)%7,m=gr(l),h=i.length?+i:void 0,M=Xs({step:s,alt:m,oct:h}),y=n+l+i,S=n+l,b=(Gn[s]+m+120)%12,N=h===void 0?nc(Gn[s]+m,12)-12*99:Gn[s]+m+12*(h+1),T=N>=0&&N<=127?N:null,R=h===void 0?null:Math.pow(2,(N-69)/12)*440;return{empty:!1,acc:l,alt:m,chroma:b,coord:M,freq:R,height:N,letter:n,midi:T,name:y,oct:h,pc:S,step:s}}function ic(e){const{step:t,alt:n,oct:l}=e,i=Zs(t);if(!i)return"";const s=i+pr(n);return l||l===0?s+l:s}function nn(e,t){const n=ie(e),l=Array.isArray(t)?t:Wt(t).coord;if(n.empty||!l||l.length<2)return"";const i=n.coord,s=i.length===1?[i[0]+l[0]]:[i[0]+l[0],i[1]+l[1]];return tc(s).name}function rc(e,t){const n=ie(e),l=ie(t);if(n.empty||l.empty)return"";const i=n.coord,s=l.coord,m=s[0]-i[0],h=i.length===2&&s.length===2?s[1]-i[1]:-Math.floor(m*7/12),M=l.height===n.height&&l.midi!==null&&n.midi!==null&&n.step>l.step;return Gs([m,h],M).name}Object.freeze({empty:!0,name:"",num:NaN,q:"",type:"",step:NaN,alt:NaN,dir:NaN,simple:NaN,semitones:NaN,chroma:NaN,coord:[],oct:NaN});function gl(e,t){const n=t.length,l=(e%n+n)%n;return t.slice(l,n).concat(t.slice(0,l))}function ac(e){return e.filter(t=>t===0||t)}function oc(e){return e!==null&&typeof e=="object"&&"name"in e&&typeof e.name=="string"}function sc(e){return e!==null&&typeof e=="object"&&"step"in e&&typeof e.step=="number"&&"alt"in e&&typeof e.alt=="number"&&!isNaN(e.step)&&!isNaN(e.alt)}var vr=[0,2,4,-1,1,3,5],cc=vr.map(e=>Math.floor(e*7/12));function uc(e){const{step:t,alt:n,oct:l,dir:i=1}=e,s=vr[t]+7*n;if(l===void 0)return[i*s];const m=l-cc[t]-4*n;return[i*s,i*m]}var wi=(e,t)=>Array(Math.abs(t)+1).join(e),Qn=Object.freeze({empty:!0,name:"",num:NaN,q:"",type:"",step:NaN,alt:NaN,dir:NaN,simple:NaN,semitones:NaN,chroma:NaN,coord:[],oct:NaN}),mc="([-+]?\\d+)(d{1,4}|m|M|P|A{1,4})",dc="(AA|A|P|M|m|d|dd)([-+]?\\d+)",fc=new RegExp("^"+mc+"|"+dc+"$");function hc(e){const t=fc.exec(`${e}`);return t===null?["",""]:t[1]?[t[1],t[2]]:[t[4],t[3]]}var xi={};function Yn(e){return typeof e=="string"?xi[e]||(xi[e]=Pc(e)):sc(e)?Yn(pc(e)):oc(e)?Yn(e.name):Qn}var Ci=[0,2,4,5,7,9,11],yr="PMMPPMM";function Pc(e){const t=hc(e);if(t[0]==="")return Qn;const n=+t[0],l=t[1],i=(Math.abs(n)-1)%7,s=yr[i];if(s==="M"&&l==="P")return Qn;const m=s==="M"?"majorable":"perfectable",h=""+n+l,M=n<0?-1:1,y=n===8||n===-8?n:M*(i+1),S=Mc(m,l),b=Math.floor((Math.abs(n)-1)/7),N=M*(Ci[i]+S+12*b),T=(M*(Ci[i]+S)%12+12)%12,R=uc({step:i,alt:S,oct:b,dir:M});return{empty:!1,name:h,num:n,q:l,step:i,alt:S,dir:M,type:m,simple:y,semitones:N,chroma:T,coord:R,oct:b}}function Mc(e,t){return t==="M"&&e==="majorable"||t==="P"&&e==="perfectable"?0:t==="m"&&e==="majorable"?-1:/^A+$/.test(t)?t.length:/^d+$/.test(t)?-1*(e==="perfectable"?t.length:t.length+1):0}function pc(e){const{step:t,alt:n,oct:l=0,dir:i}=e;if(!i)return"";const s=t+1+7*l,m=s===0?t+1:s,h=i<0?"-":"",M=yr[t]==="M"?"majorable":"perfectable";return h+m+gc(M,n)}function gc(e,t){return t===0?e==="majorable"?"M":"P":t===-1&&e==="majorable"?"m":t>0?wi("A",t):wi("d",e==="perfectable"?t:t+1)}var pe={empty:!0,name:"",setNum:0,chroma:"000000000000",normalized:"000000000000",intervals:[]},br=e=>Number(e).toString(2).padStart(12,"0"),ji=e=>parseInt(e,2),vc=/^[01]{12}$/;function Sr(e){return vc.test(e)}var yc=e=>typeof e=="number"&&e>=0&&e<=4095,bc=e=>e&&Sr(e.chroma),Ti={[pe.chroma]:pe};function ge(e){const t=Sr(e)?e:yc(e)?br(e):Array.isArray(e)?jc(e):bc(e)?e.chroma:pe.chroma;return Ti[t]=Ti[t]||Cc(t)}var Sc=["1P","2m","2M","3m","3M","4P","5d","5P","6m","6M","7m","7M"];function Ac(e){const t=[];for(let n=0;n<12;n++)e.charAt(n)==="1"&&t.push(Sc[n]);return t}function Nc(e,t=!0){const l=ge(e).chroma.split("");return ac(l.map((i,s)=>{const m=gl(s,l);return t&&m[0]==="0"?null:m.join("")}))}function wc(e){const t=ge(e).setNum;return n=>{const l=ge(n).setNum;return t&&t!==l&&(l&t)===l}}function Ar(e){const t=ge(e).setNum;return n=>{const l=ge(n).setNum;return t&&t!==l&&(l|t)===l}}function xc(e){const t=e.split("");return t.map((n,l)=>gl(l,t).join(""))}function Cc(e){const t=ji(e),n=xc(e).map(ji).filter(s=>s>=2048).sort()[0],l=br(n),i=Ac(e);return{empty:!1,name:"",setNum:t,chroma:e,normalized:l,intervals:i}}function jc(e){if(e.length===0)return pe.chroma;let t;const n=[0,0,0,0,0,0,0,0,0,0,0,0];for(let l=0;l<e.length;l++)t=ie(e[l]),t.empty&&(t=Yn(e[l])),t.empty||(n[t.chroma]=1);return n.join("")}var Tc=[["1P 3M 5P","major","M ^  maj"],["1P 3M 5P 7M","major seventh","maj7 \u0394 ma7 M7 Maj7 ^7"],["1P 3M 5P 7M 9M","major ninth","maj9 \u03949 ^9"],["1P 3M 5P 7M 9M 13M","major thirteenth","maj13 Maj13 ^13"],["1P 3M 5P 6M","sixth","6 add6 add13 M6"],["1P 3M 5P 6M 9M","sixth added ninth","6add9 6/9 69 M69"],["1P 3M 6m 7M","major seventh flat sixth","M7b6 ^7b6"],["1P 3M 5P 7M 11A","major seventh sharp eleventh","maj#4 \u0394#4 \u0394#11 M7#11 ^7#11 maj7#11"],["1P 3m 5P","minor","m min -"],["1P 3m 5P 7m","minor seventh","m7 min7 mi7 -7"],["1P 3m 5P 7M","minor/major seventh","m/ma7 m/maj7 mM7 mMaj7 m/M7 -\u03947 m\u0394 -^7 -maj7"],["1P 3m 5P 6M","minor sixth","m6 -6"],["1P 3m 5P 7m 9M","minor ninth","m9 -9"],["1P 3m 5P 7M 9M","minor/major ninth","mM9 mMaj9 -^9"],["1P 3m 5P 7m 9M 11P","minor eleventh","m11 -11"],["1P 3m 5P 7m 9M 13M","minor thirteenth","m13 -13"],["1P 3m 5d","diminished","dim \xB0 o"],["1P 3m 5d 7d","diminished seventh","dim7 \xB07 o7"],["1P 3m 5d 7m","half-diminished","m7b5 \xF8 -7b5 h7 h"],["1P 3M 5P 7m","dominant seventh","7 dom"],["1P 3M 5P 7m 9M","dominant ninth","9"],["1P 3M 5P 7m 9M 13M","dominant thirteenth","13"],["1P 3M 5P 7m 11A","lydian dominant seventh","7#11 7#4"],["1P 3M 5P 7m 9m","dominant flat ninth","7b9"],["1P 3M 5P 7m 9A","dominant sharp ninth","7#9"],["1P 3M 7m 9m","altered","alt7"],["1P 4P 5P","suspended fourth","sus4 sus"],["1P 2M 5P","suspended second","sus2"],["1P 4P 5P 7m","suspended fourth seventh","7sus4 7sus"],["1P 5P 7m 9M 11P","eleventh","11"],["1P 4P 5P 7m 9m","suspended fourth flat ninth","b9sus phryg 7b9sus 7b9sus4"],["1P 5P","fifth","5"],["1P 3M 5A","augmented","aug + +5 ^#5"],["1P 3m 5A","minor augmented","m#5 -#5 m+"],["1P 3M 5A 7M","augmented seventh","maj7#5 maj7+5 +maj7 ^7#5"],["1P 3M 5P 7M 9M 11A","major sharp eleventh (lydian)","maj9#11 \u03949#11 ^9#11"],["1P 2M 4P 5P","","sus24 sus4add9"],["1P 3M 5A 7M 9M","","maj9#5 Maj9#5"],["1P 3M 5A 7m","","7#5 +7 7+ 7aug aug7"],["1P 3M 5A 7m 9A","","7#5#9 7#9#5 7alt"],["1P 3M 5A 7m 9M","","9#5 9+"],["1P 3M 5A 7m 9M 11A","","9#5#11"],["1P 3M 5A 7m 9m","","7#5b9 7b9#5"],["1P 3M 5A 7m 9m 11A","","7#5b9#11"],["1P 3M 5A 9A","","+add#9"],["1P 3M 5A 9M","","M#5add9 +add9"],["1P 3M 5P 6M 11A","","M6#11 M6b5 6#11 6b5"],["1P 3M 5P 6M 7M 9M","","M7add13"],["1P 3M 5P 6M 9M 11A","","69#11"],["1P 3m 5P 6M 9M","","m69 -69"],["1P 3M 5P 6m 7m","","7b6"],["1P 3M 5P 7M 9A 11A","","maj7#9#11"],["1P 3M 5P 7M 9M 11A 13M","","M13#11 maj13#11 M13+4 M13#4"],["1P 3M 5P 7M 9m","","M7b9"],["1P 3M 5P 7m 11A 13m","","7#11b13 7b5b13"],["1P 3M 5P 7m 13M","","7add6 67 7add13"],["1P 3M 5P 7m 9A 11A","","7#9#11 7b5#9 7#9b5"],["1P 3M 5P 7m 9A 11A 13M","","13#9#11"],["1P 3M 5P 7m 9A 11A 13m","","7#9#11b13"],["1P 3M 5P 7m 9A 13M","","13#9"],["1P 3M 5P 7m 9A 13m","","7#9b13"],["1P 3M 5P 7m 9M 11A","","9#11 9+4 9#4"],["1P 3M 5P 7m 9M 11A 13M","","13#11 13+4 13#4"],["1P 3M 5P 7m 9M 11A 13m","","9#11b13 9b5b13"],["1P 3M 5P 7m 9m 11A","","7b9#11 7b5b9 7b9b5"],["1P 3M 5P 7m 9m 11A 13M","","13b9#11"],["1P 3M 5P 7m 9m 11A 13m","","7b9b13#11 7b9#11b13 7b5b9b13"],["1P 3M 5P 7m 9m 13M","","13b9"],["1P 3M 5P 7m 9m 13m","","7b9b13"],["1P 3M 5P 7m 9m 9A","","7b9#9"],["1P 3M 5P 9M","","Madd9 2 add9 add2"],["1P 3M 5P 9m","","Maddb9"],["1P 3M 5d","","Mb5"],["1P 3M 5d 6M 7m 9M","","13b5"],["1P 3M 5d 7M","","M7b5"],["1P 3M 5d 7M 9M","","M9b5"],["1P 3M 5d 7m","","7b5"],["1P 3M 5d 7m 9M","","9b5"],["1P 3M 7m","","7no5"],["1P 3M 7m 13m","","7b13"],["1P 3M 7m 9M","","9no5"],["1P 3M 7m 9M 13M","","13no5"],["1P 3M 7m 9M 13m","","9b13"],["1P 3m 4P 5P","","madd4"],["1P 3m 5P 6m 7M","","mMaj7b6"],["1P 3m 5P 6m 7M 9M","","mMaj9b6"],["1P 3m 5P 7m 11P","","m7add11 m7add4"],["1P 3m 5P 9M","","madd9"],["1P 3m 5d 6M 7M","","o7M7"],["1P 3m 5d 7M","","oM7"],["1P 3m 6m 7M","","mb6M7"],["1P 3m 6m 7m","","m7#5"],["1P 3m 6m 7m 9M","","m9#5"],["1P 3m 5A 7m 9M 11P","","m11A"],["1P 3m 6m 9m","","mb6b9"],["1P 2M 3m 5d 7m","","m9b5"],["1P 4P 5A 7M","","M7#5sus4"],["1P 4P 5A 7M 9M","","M9#5sus4"],["1P 4P 5A 7m","","7#5sus4"],["1P 4P 5P 7M","","M7sus4"],["1P 4P 5P 7M 9M","","M9sus4"],["1P 4P 5P 7m 9M","","9sus4 9sus"],["1P 4P 5P 7m 9M 13M","","13sus4 13sus"],["1P 4P 5P 7m 9m 13m","","7sus4b9b13 7b9b13sus4"],["1P 4P 7m 10m","","4 quartal"],["1P 5P 7m 9m 11P","","11b9"]],Ic=Tc;({...pe});var vl=[],Gt={};function Ec(){return vl.slice()}function Lc(e,t,n){const l=$c(e),i={...ge(e),name:n||"",quality:l,intervals:e,aliases:t};vl.push(i),i.name&&(Gt[i.name]=i),Gt[i.setNum]=i,Gt[i.chroma]=i,i.aliases.forEach(s=>Oc(i,s))}function Oc(e,t){Gt[t]=e}function $c(e){const t=n=>e.indexOf(n)!==-1;return t("5A")?"Augmented":t("3M")?"Major":t("5d")?"Diminished":t("3m")?"Minor":"Unknown"}Ic.forEach(([e,t,n])=>Lc(e.split(" "),n.split(" "),t));vl.sort((e,t)=>e.setNum-t.setNum);var _c=e=>{const t=e.reduce((n,l)=>{const i=ie(l).chroma;return i!==void 0&&(n[i]=n[i]||ie(l).name),n},{});return n=>t[n]};function Rc(e,t={}){const n=e.map(i=>ie(i).pc).filter(i=>i);return ie.length===0?[]:Gc(n,1,t).filter(i=>i.weight).sort((i,s)=>s.weight-i.weight).map(i=>i.name)}var ln={anyThirds:384,perfectFifth:16,nonPerfectFifths:40,anySeventh:3},rn=e=>t=>Boolean(t&e),kc=rn(ln.anyThirds),Fc=rn(ln.perfectFifth),Dc=rn(ln.anySeventh),Bc=rn(ln.nonPerfectFifths);function zc(e){const t=parseInt(e.chroma,2);return kc(t)&&Fc(t)&&Dc(t)}function Uc(e){const t=parseInt(e,2);return Bc(t)?e:(t|16).toString(2)}function Gc(e,t,n){const l=e[0],i=ie(l).chroma,s=_c(e),m=Nc(e,!1),h=[];return m.forEach((M,y)=>{const S=n.assumePerfectFifth&&Uc(M);Ec().filter(N=>n.assumePerfectFifth&&zc(N)?N.chroma===S:N.chroma===M).forEach(N=>{const T=N.aliases[0],R=s(y);y!==i?h.push({weight:.5*t,name:`${R}${T}/${l}`}):h.push({weight:1*t,name:`${R}${T}`})})}),h}function Nr(e){return e!==null&&typeof e=="object"&&"name"in e&&typeof e.name=="string"}function wr(e){return e!==null&&typeof e=="object"&&"step"in e&&typeof e.step=="number"&&"alt"in e&&typeof e.alt=="number"}var xr=[0,2,4,-1,1,3,5],Cr=xr.map(e=>Math.floor(e*7/12));function jr(e){const{step:t,alt:n,oct:l,dir:i=1}=e,s=xr[t]+7*n;if(l===void 0)return[i*s];const m=l-Cr[t]-4*n;return[i*s,i*m]}var Hc=[3,0,4,1,5,2,6];function Tr(e){const[t,n,l]=e,i=Hc[qc(t)],s=Math.floor((t+1)/7);if(n===void 0)return{step:i,alt:s,dir:l};const m=n+4*s+Cr[i];return{step:i,alt:s,oct:m,dir:l}}function qc(e){const t=(e+1)%7;return t<0?7+t:t}var Ii=(e,t)=>Array(Math.abs(t)+1).join(e),Zn={empty:!0,name:"",acc:""},Vc="([-+]?\\d+)(d{1,4}|m|M|P|A{1,4})",Jc="(AA|A|P|M|m|d|dd)([-+]?\\d+)",Kc=new RegExp("^"+Vc+"|"+Jc+"$");function Xc(e){const t=Kc.exec(`${e}`);return t===null?["",""]:t[1]?[t[1],t[2]]:[t[4],t[3]]}var Ei={};function Qt(e){return typeof e=="string"?Ei[e]||(Ei[e]=Wc(e)):wr(e)?Qt(Zc(e)):Nr(e)?Qt(e.name):Zn}var Li=[0,2,4,5,7,9,11],Ir="PMMPPMM";function Wc(e){const t=Xc(e);if(t[0]==="")return Zn;const n=+t[0],l=t[1],i=(Math.abs(n)-1)%7,s=Ir[i];if(s==="M"&&l==="P")return Zn;const m=s==="M"?"majorable":"perfectable",h=""+n+l,M=n<0?-1:1,y=n===8||n===-8?n:M*(i+1),S=Yc(m,l),b=Math.floor((Math.abs(n)-1)/7),N=M*(Li[i]+S+12*b),T=(M*(Li[i]+S)%12+12)%12,R=jr({step:i,alt:S,oct:b,dir:M});return{empty:!1,name:h,num:n,q:l,step:i,alt:S,dir:M,type:m,simple:y,semitones:N,chroma:T,coord:R,oct:b}}function Qc(e,t){const[n,l=0]=e,i=n*7+l*12<0,s=t||i?[-n,-l,-1]:[n,l,1];return Qt(Tr(s))}function Yc(e,t){return t==="M"&&e==="majorable"||t==="P"&&e==="perfectable"?0:t==="m"&&e==="majorable"?-1:/^A+$/.test(t)?t.length:/^d+$/.test(t)?-1*(e==="perfectable"?t.length:t.length+1):0}function Zc(e){const{step:t,alt:n,oct:l=0,dir:i}=e;if(!i)return"";const s=t+1+7*l,m=s===0?t+1:s,h=i<0?"-":"",M=Ir[t]==="M"?"majorable":"perfectable";return h+m+eu(M,n)}function eu(e,t){return t===0?e==="majorable"?"M":"P":t===-1&&e==="majorable"?"m":t>0?Ii("A",t):Ii("d",e==="perfectable"?t:t+1)}var Oi=(e,t)=>Array(Math.abs(t)+1).join(e),Er={empty:!0,name:"",pc:"",acc:""},$i=new Map,tu=e=>"CDEFGAB".charAt(e),nu=e=>e<0?Oi("b",-e):Oi("#",e),lu=e=>e[0]==="b"?-e.length:e.length;function Oe(e){const t=JSON.stringify(e),n=$i.get(t);if(n)return n;const l=typeof e=="string"?ou(e):wr(e)?Oe(su(e)):Nr(e)?Oe(e.name):Er;return $i.set(t,l),l}var iu=/^([a-gA-G]?)(#{1,}|b{1,}|x{1,}|)(-?\d*)\s*(.*)$/;function Lr(e){const t=iu.exec(e);return t?[t[1].toUpperCase(),t[2].replace(/x/g,"##"),t[3],t[4]]:["","","",""]}function ru(e){return Oe(Tr(e))}var au=(e,t)=>(e%t+t)%t,Hn=[0,2,4,5,7,9,11];function ou(e){const t=Lr(e);if(t[0]===""||t[3]!=="")return Er;const n=t[0],l=t[1],i=t[2],s=(n.charCodeAt(0)+3)%7,m=lu(l),h=i.length?+i:void 0,M=jr({step:s,alt:m,oct:h}),y=n+l+i,S=n+l,b=(Hn[s]+m+120)%12,N=h===void 0?au(Hn[s]+m,12)-12*99:Hn[s]+m+12*(h+1),T=N>=0&&N<=127?N:null,R=h===void 0?null:Math.pow(2,(N-69)/12)*440;return{empty:!1,acc:l,alt:m,chroma:b,coord:M,freq:R,height:N,letter:n,midi:T,name:y,oct:h,pc:S,step:s}}function su(e){const{step:t,alt:n,oct:l}=e,i=tu(t);if(!i)return"";const s=i+nu(n);return l||l===0?s+l:s}function Yt(e,t){const n=Oe(e),l=Array.isArray(t)?t:Qt(t).coord;if(n.empty||!l||l.length<2)return"";const i=n.coord,s=i.length===1?[i[0]+l[0]]:[i[0]+l[0],i[1]+l[1]];return ru(s).name}function Or(e,t){const n=e.length;return l=>{if(!t)return"";const i=l<0?(n- -l%n)%n:l%n,s=Math.floor(l/n),m=Yt(t,[0,s]);return Yt(m,e[i])}}function cu(e,t){const n=Oe(e),l=Oe(t);if(n.empty||l.empty)return"";const i=n.coord,s=l.coord,m=s[0]-i[0],h=i.length===2&&s.length===2?s[1]-i[1]:-Math.floor(m*7/12),M=l.height===n.height&&l.midi!==null&&n.midi!==null&&n.step>l.step;return Qc([m,h],M).name}function uu(e,t,n){return function(...l){return console.warn(`${e} is deprecated. Use ${t}.`),n.apply(this,l)}}var mu=[["1P 3M 5P","major","M ^  maj"],["1P 3M 5P 7M","major seventh","maj7 \u0394 ma7 M7 Maj7 ^7"],["1P 3M 5P 7M 9M","major ninth","maj9 \u03949 ^9"],["1P 3M 5P 7M 9M 13M","major thirteenth","maj13 Maj13 ^13"],["1P 3M 5P 6M","sixth","6 add6 add13 M6"],["1P 3M 5P 6M 9M","sixth added ninth","6add9 6/9 69 M69"],["1P 3M 6m 7M","major seventh flat sixth","M7b6 ^7b6"],["1P 3M 5P 7M 11A","major seventh sharp eleventh","maj#4 \u0394#4 \u0394#11 M7#11 ^7#11 maj7#11"],["1P 3m 5P","minor","m min -"],["1P 3m 5P 7m","minor seventh","m7 min7 mi7 -7"],["1P 3m 5P 7M","minor/major seventh","m/ma7 m/maj7 mM7 mMaj7 m/M7 -\u03947 m\u0394 -^7"],["1P 3m 5P 6M","minor sixth","m6 -6"],["1P 3m 5P 7m 9M","minor ninth","m9 -9"],["1P 3m 5P 7M 9M","minor/major ninth","mM9 mMaj9 -^9"],["1P 3m 5P 7m 9M 11P","minor eleventh","m11 -11"],["1P 3m 5P 7m 9M 13M","minor thirteenth","m13 -13"],["1P 3m 5d","diminished","dim \xB0 o"],["1P 3m 5d 7d","diminished seventh","dim7 \xB07 o7"],["1P 3m 5d 7m","half-diminished","m7b5 \xF8 -7b5 h7 h"],["1P 3M 5P 7m","dominant seventh","7 dom"],["1P 3M 5P 7m 9M","dominant ninth","9"],["1P 3M 5P 7m 9M 13M","dominant thirteenth","13"],["1P 3M 5P 7m 11A","lydian dominant seventh","7#11 7#4"],["1P 3M 5P 7m 9m","dominant flat ninth","7b9"],["1P 3M 5P 7m 9A","dominant sharp ninth","7#9"],["1P 3M 7m 9m","altered","alt7"],["1P 4P 5P","suspended fourth","sus4 sus"],["1P 2M 5P","suspended second","sus2"],["1P 4P 5P 7m","suspended fourth seventh","7sus4 7sus"],["1P 5P 7m 9M 11P","eleventh","11"],["1P 4P 5P 7m 9m","suspended fourth flat ninth","b9sus phryg 7b9sus 7b9sus4"],["1P 5P","fifth","5"],["1P 3M 5A","augmented","aug + +5 ^#5"],["1P 3m 5A","minor augmented","m#5 -#5 m+"],["1P 3M 5A 7M","augmented seventh","maj7#5 maj7+5 +maj7 ^7#5"],["1P 3M 5P 7M 9M 11A","major sharp eleventh (lydian)","maj9#11 \u03949#11 ^9#11"],["1P 2M 4P 5P","","sus24 sus4add9"],["1P 3M 5A 7M 9M","","maj9#5 Maj9#5"],["1P 3M 5A 7m","","7#5 +7 7+ 7aug aug7"],["1P 3M 5A 7m 9A","","7#5#9 7#9#5 7alt"],["1P 3M 5A 7m 9M","","9#5 9+"],["1P 3M 5A 7m 9M 11A","","9#5#11"],["1P 3M 5A 7m 9m","","7#5b9 7b9#5"],["1P 3M 5A 7m 9m 11A","","7#5b9#11"],["1P 3M 5A 9A","","+add#9"],["1P 3M 5A 9M","","M#5add9 +add9"],["1P 3M 5P 6M 11A","","M6#11 M6b5 6#11 6b5"],["1P 3M 5P 6M 7M 9M","","M7add13"],["1P 3M 5P 6M 9M 11A","","69#11"],["1P 3m 5P 6M 9M","","m69 -69"],["1P 3M 5P 6m 7m","","7b6"],["1P 3M 5P 7M 9A 11A","","maj7#9#11"],["1P 3M 5P 7M 9M 11A 13M","","M13#11 maj13#11 M13+4 M13#4"],["1P 3M 5P 7M 9m","","M7b9"],["1P 3M 5P 7m 11A 13m","","7#11b13 7b5b13"],["1P 3M 5P 7m 13M","","7add6 67 7add13"],["1P 3M 5P 7m 9A 11A","","7#9#11 7b5#9 7#9b5"],["1P 3M 5P 7m 9A 11A 13M","","13#9#11"],["1P 3M 5P 7m 9A 11A 13m","","7#9#11b13"],["1P 3M 5P 7m 9A 13M","","13#9"],["1P 3M 5P 7m 9A 13m","","7#9b13"],["1P 3M 5P 7m 9M 11A","","9#11 9+4 9#4"],["1P 3M 5P 7m 9M 11A 13M","","13#11 13+4 13#4"],["1P 3M 5P 7m 9M 11A 13m","","9#11b13 9b5b13"],["1P 3M 5P 7m 9m 11A","","7b9#11 7b5b9 7b9b5"],["1P 3M 5P 7m 9m 11A 13M","","13b9#11"],["1P 3M 5P 7m 9m 11A 13m","","7b9b13#11 7b9#11b13 7b5b9b13"],["1P 3M 5P 7m 9m 13M","","13b9"],["1P 3M 5P 7m 9m 13m","","7b9b13"],["1P 3M 5P 7m 9m 9A","","7b9#9"],["1P 3M 5P 9M","","Madd9 2 add9 add2"],["1P 3M 5P 9m","","Maddb9"],["1P 3M 5d","","Mb5"],["1P 3M 5d 6M 7m 9M","","13b5"],["1P 3M 5d 7M","","M7b5"],["1P 3M 5d 7M 9M","","M9b5"],["1P 3M 5d 7m","","7b5"],["1P 3M 5d 7m 9M","","9b5"],["1P 3M 7m","","7no5"],["1P 3M 7m 13m","","7b13"],["1P 3M 7m 9M","","9no5"],["1P 3M 7m 9M 13M","","13no5"],["1P 3M 7m 9M 13m","","9b13"],["1P 3m 4P 5P","","madd4"],["1P 3m 5P 6m 7M","","mMaj7b6"],["1P 3m 5P 6m 7M 9M","","mMaj9b6"],["1P 3m 5P 7m 11P","","m7add11 m7add4"],["1P 3m 5P 9M","","madd9"],["1P 3m 5d 6M 7M","","o7M7"],["1P 3m 5d 7M","","oM7"],["1P 3m 6m 7M","","mb6M7"],["1P 3m 6m 7m","","m7#5"],["1P 3m 6m 7m 9M","","m9#5"],["1P 3m 5A 7m 9M 11P","","m11A"],["1P 3m 6m 9m","","mb6b9"],["1P 2M 3m 5d 7m","","m9b5"],["1P 4P 5A 7M","","M7#5sus4"],["1P 4P 5A 7M 9M","","M9#5sus4"],["1P 4P 5A 7m","","7#5sus4"],["1P 4P 5P 7M","","M7sus4"],["1P 4P 5P 7M 9M","","M9sus4"],["1P 4P 5P 7m 9M","","9sus4 9sus"],["1P 4P 5P 7m 9M 13M","","13sus4 13sus"],["1P 4P 5P 7m 9m 13m","","7sus4b9b13 7b9b13sus4"],["1P 4P 7m 10m","","4 quartal"],["1P 5P 7m 9m 11P","","11b9"]],du=mu,fu={...pe,name:"",quality:"Unknown",intervals:[],aliases:[]},yl=[],vt={};function hu(e){return vt[e]||fu}function $r(){return yl.slice()}function Pu(e,t,n){const l=pu(e),i={...ge(e),name:n||"",quality:l,intervals:e,aliases:t};yl.push(i),i.name&&(vt[i.name]=i),vt[i.setNum]=i,vt[i.chroma]=i,i.aliases.forEach(s=>Mu(i,s))}function Mu(e,t){vt[t]=e}function pu(e){const t=n=>e.indexOf(n)!==-1;return t("5A")?"Augmented":t("3M")?"Major":t("5d")?"Diminished":t("3m")?"Minor":"Unknown"}du.forEach(([e,t,n])=>Pu(e.split(" "),n.split(" "),t));yl.sort((e,t)=>e.setNum-t.setNum);Object.freeze({empty:!0,name:"",num:NaN,q:"",type:"",step:NaN,alt:NaN,dir:NaN,simple:NaN,semitones:NaN,chroma:NaN,coord:[],oct:NaN});var gu=[["1P 2M 3M 5P 6M","major pentatonic","pentatonic"],["1P 2M 3M 4P 5P 6M 7M","major","ionian"],["1P 2M 3m 4P 5P 6m 7m","minor","aeolian"],["1P 2M 3m 3M 5P 6M","major blues"],["1P 3m 4P 5d 5P 7m","minor blues","blues"],["1P 2M 3m 4P 5P 6M 7M","melodic minor"],["1P 2M 3m 4P 5P 6m 7M","harmonic minor"],["1P 2M 3M 4P 5P 6M 7m 7M","bebop"],["1P 2M 3m 4P 5d 6m 6M 7M","diminished","whole-half diminished"],["1P 2M 3m 4P 5P 6M 7m","dorian"],["1P 2M 3M 4A 5P 6M 7M","lydian"],["1P 2M 3M 4P 5P 6M 7m","mixolydian","dominant"],["1P 2m 3m 4P 5P 6m 7m","phrygian"],["1P 2m 3m 4P 5d 6m 7m","locrian"],["1P 3M 4P 5P 7M","ionian pentatonic"],["1P 3M 4P 5P 7m","mixolydian pentatonic","indian"],["1P 2M 4P 5P 6M","ritusen"],["1P 2M 4P 5P 7m","egyptian"],["1P 3M 4P 5d 7m","neopolitan major pentatonic"],["1P 3m 4P 5P 6m","vietnamese 1"],["1P 2m 3m 5P 6m","pelog"],["1P 2m 4P 5P 6m","kumoijoshi"],["1P 2M 3m 5P 6m","hirajoshi"],["1P 2m 4P 5d 7m","iwato"],["1P 2m 4P 5P 7m","in-sen"],["1P 3M 4A 5P 7M","lydian pentatonic","chinese"],["1P 3m 4P 6m 7m","malkos raga"],["1P 3m 4P 5d 7m","locrian pentatonic","minor seven flat five pentatonic"],["1P 3m 4P 5P 7m","minor pentatonic","vietnamese 2"],["1P 3m 4P 5P 6M","minor six pentatonic"],["1P 2M 3m 5P 6M","flat three pentatonic","kumoi"],["1P 2M 3M 5P 6m","flat six pentatonic"],["1P 2m 3M 5P 6M","scriabin"],["1P 3M 5d 6m 7m","whole tone pentatonic"],["1P 3M 4A 5A 7M","lydian #5P pentatonic"],["1P 3M 4A 5P 7m","lydian dominant pentatonic"],["1P 3m 4P 5P 7M","minor #7M pentatonic"],["1P 3m 4d 5d 7m","super locrian pentatonic"],["1P 2M 3m 4P 5P 7M","minor hexatonic"],["1P 2A 3M 5P 5A 7M","augmented"],["1P 2M 4P 5P 6M 7m","piongio"],["1P 2m 3M 4A 6M 7m","prometheus neopolitan"],["1P 2M 3M 4A 6M 7m","prometheus"],["1P 2m 3M 5d 6m 7m","mystery #1"],["1P 2m 3M 4P 5A 6M","six tone symmetric"],["1P 2M 3M 4A 5A 6A","whole tone","messiaen's mode #1"],["1P 2m 4P 4A 5P 7M","messiaen's mode #5"],["1P 2M 3M 4P 5d 6m 7m","locrian major","arabian"],["1P 2m 3M 4A 5P 6m 7M","double harmonic lydian"],["1P 2m 2A 3M 4A 6m 7m","altered","super locrian","diminished whole tone","pomeroy"],["1P 2M 3m 4P 5d 6m 7m","locrian #2","half-diminished","aeolian b5"],["1P 2M 3M 4P 5P 6m 7m","mixolydian b6","melodic minor fifth mode","hindu"],["1P 2M 3M 4A 5P 6M 7m","lydian dominant","lydian b7","overtone"],["1P 2M 3M 4A 5A 6M 7M","lydian augmented"],["1P 2m 3m 4P 5P 6M 7m","dorian b2","phrygian #6","melodic minor second mode"],["1P 2m 3m 4d 5d 6m 7d","ultralocrian","superlocrian bb7","superlocrian diminished"],["1P 2m 3m 4P 5d 6M 7m","locrian 6","locrian natural 6","locrian sharp 6"],["1P 2A 3M 4P 5P 5A 7M","augmented heptatonic"],["1P 2M 3m 4A 5P 6M 7m","dorian #4","ukrainian dorian","romanian minor","altered dorian"],["1P 2M 3m 4A 5P 6M 7M","lydian diminished"],["1P 2M 3M 4A 5A 7m 7M","leading whole tone"],["1P 2M 3M 4A 5P 6m 7m","lydian minor"],["1P 2m 3M 4P 5P 6m 7m","phrygian dominant","spanish","phrygian major"],["1P 2m 3m 4P 5P 6m 7M","balinese"],["1P 2m 3m 4P 5P 6M 7M","neopolitan major"],["1P 2M 3M 4P 5P 6m 7M","harmonic major"],["1P 2m 3M 4P 5P 6m 7M","double harmonic major","gypsy"],["1P 2M 3m 4A 5P 6m 7M","hungarian minor"],["1P 2A 3M 4A 5P 6M 7m","hungarian major"],["1P 2m 3M 4P 5d 6M 7m","oriental"],["1P 2m 3m 3M 4A 5P 7m","flamenco"],["1P 2m 3m 4A 5P 6m 7M","todi raga"],["1P 2m 3M 4P 5d 6m 7M","persian"],["1P 2m 3M 5d 6m 7m 7M","enigmatic"],["1P 2M 3M 4P 5A 6M 7M","major augmented","major #5","ionian augmented","ionian #5"],["1P 2A 3M 4A 5P 6M 7M","lydian #9"],["1P 2m 2M 4P 4A 5P 6m 7M","messiaen's mode #4"],["1P 2m 3M 4P 4A 5P 6m 7M","purvi raga"],["1P 2m 3m 3M 4P 5P 6m 7m","spanish heptatonic"],["1P 2M 3m 3M 4P 5P 6M 7m","bebop minor"],["1P 2M 3M 4P 5P 5A 6M 7M","bebop major"],["1P 2m 3m 4P 5d 5P 6m 7m","bebop locrian"],["1P 2M 3m 4P 5P 6m 7m 7M","minor bebop"],["1P 2M 3M 4P 5d 5P 6M 7M","ichikosucho"],["1P 2M 3m 4P 5P 6m 6M 7M","minor six diminished"],["1P 2m 3m 3M 4A 5P 6M 7m","half-whole diminished","dominant diminished","messiaen's mode #2"],["1P 3m 3M 4P 5P 6M 7m 7M","kafi raga"],["1P 2M 3M 4P 4A 5A 6A 7M","messiaen's mode #6"],["1P 2M 3m 3M 4P 5d 5P 6M 7m","composite blues"],["1P 2M 3m 3M 4A 5P 6m 7m 7M","messiaen's mode #3"],["1P 2m 2M 3m 4P 4A 5P 6m 6M 7M","messiaen's mode #7"],["1P 2m 2M 3m 3M 4P 5d 5P 6m 6M 7m 7M","chromatic"]],vu=gu,yu={...pe,intervals:[],aliases:[]},_r=[],yt={};function bu(e){return yt[e]||yu}function Su(){return _r.slice()}function Au(e,t,n=[]){const l={...ge(e),name:t,intervals:e,aliases:n};return _r.push(l),yt[l.name]=l,yt[l.setNum]=l,yt[l.chroma]=l,l.aliases.forEach(i=>Nu(l,i)),l}function Nu(e,t){yt[t]=e}vu.forEach(([e,t,...n])=>Au(e.split(" "),t,n));var el={empty:!0,name:"",symbol:"",root:"",rootDegree:0,type:"",tonic:null,setNum:NaN,quality:"Unknown",chroma:"",normalized:"",aliases:[],notes:[],intervals:[]};function bl(e){const[t,n,l,i]=Lr(e);return t===""?["",e]:t==="A"&&i==="ug"?["","aug"]:[t+n,l+i]}function Ge(e){if(e==="")return el;if(Array.isArray(e)&&e.length===2)return Ht(e[1],e[0]);{const[t,n]=bl(e),l=Ht(n,t);return l.empty?Ht(e):l}}function Ht(e,t,n){const l=hu(e),i=Oe(t||""),s=Oe(n||"");if(l.empty||t&&i.empty||n&&s.empty)return el;const m=cu(i.pc,s.pc),h=l.intervals.indexOf(m)+1;if(!s.empty&&!h)return el;const M=Array.from(l.intervals);for(let N=1;N<h;N++){const T=M[0][0],R=M[0][1],z=parseInt(T,10)+7;M.push(`${z}${R}`),M.shift()}const y=i.empty?[]:M.map(N=>Yt(i,N));e=l.aliases.indexOf(e)!==-1?e:l.aliases[0];const S=`${i.empty?"":i.pc}${e}${s.empty||h<=1?"":"/"+s.pc}`,b=`${t?i.pc+" ":""}${l.name}${h>1&&n?" over "+s.pc:""}`;return{...l,name:b,symbol:S,type:l.name,root:s.name,intervals:M,rootDegree:h,tonic:i.name,notes:y}}var wu=uu("Chord.chord","Chord.get",Ge);function xu(e,t){const[n,l]=bl(e);return n?Yt(n,t)+l:e}function Cu(e){const t=Ge(e),n=Ar(t.chroma);return Su().filter(l=>n(l.chroma)).map(l=>l.name)}function ju(e){const t=Ge(e),n=Ar(t.chroma);return $r().filter(l=>n(l.chroma)).map(l=>t.tonic+l.aliases[0])}function Tu(e){const t=Ge(e),n=wc(t.chroma);return $r().filter(l=>n(l.chroma)).map(l=>t.tonic+l.aliases[0])}function Iu(e){const{intervals:t,tonic:n}=Ge(e),l=Or(t,n);return i=>i?l(i>0?i-1:i):""}function Eu(e){const{intervals:t,tonic:n}=Ge(e);return Or(t,n)}var Lu={getChord:Ht,get:Ge,detect:Rc,chordScales:Cu,extended:ju,reduced:Tu,tokenize:bl,transpose:xu,degrees:Iu,steps:Eu,chord:wu};Object.freeze({empty:!0,name:"",num:NaN,q:"",type:"",step:NaN,alt:NaN,dir:NaN,simple:NaN,semitones:NaN,chroma:NaN,coord:[],oct:NaN});Object.freeze({empty:!0,name:"",num:NaN,q:"",type:"",step:NaN,alt:NaN,dir:NaN,simple:NaN,semitones:NaN,chroma:NaN,coord:[],oct:NaN});Object.freeze({empty:!0,name:"",num:NaN,q:"",type:"",step:NaN,alt:NaN,dir:NaN,simple:NaN,semitones:NaN,chroma:NaN,coord:[],oct:NaN});var Ou=Math.log(2),$u=Math.log(440);function Rr(e){const t=12*(Math.log(e)-$u)/Ou+69;return Math.round(t*100)/100}var _u="C C# D D# E F F# G G# A A# B".split(" "),Ru="C Db D Eb E F Gb G Ab A Bb B".split(" ");function Qe(e,t={}){if(isNaN(e)||e===-1/0||e===1/0)return"";e=Math.round(e);const l=(t.sharps===!0?_u:Ru)[e%12];if(t.pitchClass)return l;const i=Math.floor(e/12)-1;return l+i}var ku=["C","D","E","F","G","A","B"],kr=e=>e.name,Fr=e=>e.map(ie).filter(t=>!t.empty);function Fu(e){return e===void 0?ku.slice():Array.isArray(e)?Fr(e).map(kr):[]}var he=ie,Du=e=>he(e).name,Bu=e=>he(e).pc,zu=e=>he(e).acc,Uu=e=>he(e).oct,Gu=e=>he(e).midi,Hu=e=>he(e).freq,qu=e=>he(e).chroma;function Vu(e){return Qe(e)}function Ju(e){return Qe(Rr(e))}function Ku(e){return Qe(Rr(e),{sharps:!0})}function Xu(e){return Qe(e,{sharps:!0})}var Nt=nn,Wu=nn,Dr=e=>t=>Nt(t,e),Qu=Dr,Br=e=>t=>Nt(e,t),Yu=Br;function zr(e,t){return Nt(e,[t,0])}var Zu=zr;function em(e,t){return Nt(e,[0,t])}var Sl=(e,t)=>e.height-t.height,tm=(e,t)=>t.height-e.height;function Ur(e,t){return t=t||Sl,Fr(e).sort(t).map(kr)}function nm(e){return Ur(e,Sl).filter((t,n,l)=>n===0||t!==l[n-1])}var lm=e=>{const t=he(e);return t.empty?"":Qe(t.midi||t.chroma,{sharps:t.alt>0,pitchClass:t.midi===null})};function im(e,t){const n=he(e);if(n.empty)return"";const l=he(t||Qe(n.midi||n.chroma,{sharps:n.alt<0,pitchClass:!0}));if(l.empty||l.chroma!==n.chroma)return"";if(n.oct===void 0)return l.pc;const i=n.chroma-n.alt,s=l.chroma-l.alt,m=i>11||s<0?-1:i<0||s>11?1:0,h=n.oct+m;return l.pc+h}var rm={names:Fu,get:he,name:Du,pitchClass:Bu,accidentals:zu,octave:Uu,midi:Gu,ascending:Sl,descending:tm,sortedNames:Ur,sortedUniqNames:nm,fromMidi:Vu,fromMidiSharps:Xu,freq:Hu,fromFreq:Ju,fromFreqSharps:Ku,chroma:qu,transpose:Nt,tr:Wu,transposeBy:Dr,trBy:Qu,transposeFrom:Br,trFrom:Yu,transposeFifths:zr,transposeOctaves:em,trFifths:Zu,simplify:lm,enharmonic:im};function Gr(e){return e!==null&&typeof e=="object"&&"name"in e&&typeof e.name=="string"}function Hr(e){return e!==null&&typeof e=="object"&&"step"in e&&typeof e.step=="number"&&"alt"in e&&typeof e.alt=="number"&&!isNaN(e.step)&&!isNaN(e.alt)}var qr=[0,2,4,-1,1,3,5],am=qr.map(e=>Math.floor(e*7/12));function om(e){const{step:t,alt:n,oct:l,dir:i=1}=e,s=qr[t]+7*n;if(l===void 0)return[i*s];const m=l-am[t]-4*n;return[i*s,i*m]}var _i=(e,t)=>Array(Math.abs(t)+1).join(e),tl=Object.freeze({empty:!0,name:"",num:NaN,q:"",type:"",step:NaN,alt:NaN,dir:NaN,simple:NaN,semitones:NaN,chroma:NaN,coord:[],oct:NaN}),sm="([-+]?\\d+)(d{1,4}|m|M|P|A{1,4})",cm="(AA|A|P|M|m|d|dd)([-+]?\\d+)",um=new RegExp("^"+sm+"|"+cm+"$");function mm(e){const t=um.exec(`${e}`);return t===null?["",""]:t[1]?[t[1],t[2]]:[t[4],t[3]]}var Ri={};function nl(e){return typeof e=="string"?Ri[e]||(Ri[e]=dm(e)):Hr(e)?nl(hm(e)):Gr(e)?nl(e.name):tl}var ki=[0,2,4,5,7,9,11],Vr="PMMPPMM";function dm(e){const t=mm(e);if(t[0]==="")return tl;const n=+t[0],l=t[1],i=(Math.abs(n)-1)%7,s=Vr[i];if(s==="M"&&l==="P")return tl;const m=s==="M"?"majorable":"perfectable",h=""+n+l,M=n<0?-1:1,y=n===8||n===-8?n:M*(i+1),S=fm(m,l),b=Math.floor((Math.abs(n)-1)/7),N=M*(ki[i]+S+12*b),T=(M*(ki[i]+S)%12+12)%12,R=om({step:i,alt:S,oct:b,dir:M});return{empty:!1,name:h,num:n,q:l,step:i,alt:S,dir:M,type:m,simple:y,semitones:N,chroma:T,coord:R,oct:b}}function fm(e,t){return t==="M"&&e==="majorable"||t==="P"&&e==="perfectable"?0:t==="m"&&e==="majorable"?-1:/^A+$/.test(t)?t.length:/^d+$/.test(t)?-1*(e==="perfectable"?t.length:t.length+1):0}function hm(e){const{step:t,alt:n,oct:l=0,dir:i}=e;if(!i)return"";const s=t+1+7*l,m=s===0?t+1:s,h=i<0?"-":"",M=Vr[t]==="M"?"majorable":"perfectable";return h+m+Pm(M,n)}function Pm(e,t){return t===0?e==="majorable"?"M":"P":t===-1&&e==="majorable"?"m":t>0?_i("A",t):_i("d",e==="perfectable"?t:t+1)}function Mm(e,t,n){return function(...l){return console.warn(`${e} is deprecated. Use ${t}.`),n.apply(this,l)}}var pm=Mm("isNamed","isNamedPitch",Gr),Jr={empty:!0,name:"",chordType:""},Fi={};function At(e){return typeof e=="string"?Fi[e]||(Fi[e]=Sm(e)):typeof e=="number"?At(Al[e]||""):Hr(e)?gm(e):pm(e)?At(e.name):Jr}function gm(e){return At(pr(e.alt)+Al[e.step])}var vm=/^(#{1,}|b{1,}|x{1,}|)(IV|I{1,3}|VI{0,2}|iv|i{1,3}|vi{0,2})([^IViv]*)$/;function ym(e){return vm.exec(e)||["","","",""]}var bm="I II III IV V VI VII",Al=bm.split(" ");function Sm(e){const[t,n,l,i]=ym(e);if(!l)return Jr;const s=l.toUpperCase(),m=Al.indexOf(s),h=gr(n),M=1;return{empty:!1,name:t,roman:l,interval:nl({step:m,alt:h,dir:M}).name,acc:n,chordType:i,alt:h,step:m,major:l===s,oct:0,dir:M}}Object.freeze([]);Object.freeze({empty:!0,name:"",num:NaN,q:"",type:"",step:NaN,alt:NaN,dir:NaN,simple:NaN,semitones:NaN,chroma:NaN,coord:[],oct:NaN});var Nl=[[0,2773,0,"ionian","","Maj7","major"],[1,2902,2,"dorian","m","m7"],[2,3418,4,"phrygian","m","m7"],[3,2741,-1,"lydian","","Maj7"],[4,2774,1,"mixolydian","","7"],[5,2906,3,"aeolian","m","m7","minor"],[6,3434,5,"locrian","dim","m7b5"]],Di={...pe,name:"",alt:0,modeNum:NaN,triad:"",seventh:"",aliases:[]},Am=Nl.map(Nm),ll={};Am.forEach(e=>{ll[e.name]=e,e.aliases.forEach(t=>{ll[t]=e})});function Kr(e){return typeof e=="string"?ll[e.toLowerCase()]||Di:e&&e.name?Kr(e.name):Di}function Nm(e){const[t,n,l,i,s,m,h]=e,M=h?[h]:[],y=Number(n).toString(2);return{empty:!1,intervals:bu(i).intervals,modeNum:t,chroma:y,normalized:y,name:i,setNum:n,alt:l,triad:s,seventh:m,aliases:M}}function Xr(e){return(t,n)=>{const l=Kr(t);if(l.empty)return[];const i=gl(l.modeNum,e),s=l.intervals.map(m=>nn(n,m));return i.map((m,h)=>s[h]+m)}}Xr(Nl.map(e=>e[4]));Xr(Nl.map(e=>e[5]));function wm(e){return e!==null&&typeof e=="object"&&"name"in e&&typeof e.name=="string"}function xm(e){return e!==null&&typeof e=="object"&&"step"in e&&typeof e.step=="number"&&"alt"in e&&typeof e.alt=="number"&&!isNaN(e.step)&&!isNaN(e.alt)}var Wr=[0,2,4,-1,1,3,5],Cm=Wr.map(e=>Math.floor(e*7/12));function jm(e){const{step:t,alt:n,oct:l,dir:i=1}=e,s=Wr[t]+7*n;if(l===void 0)return[i*s];const m=l-Cm[t]-4*n;return[i*s,i*m]}var Bi=(e,t)=>Array(Math.abs(t)+1).join(e),il=Object.freeze({empty:!0,name:"",num:NaN,q:"",type:"",step:NaN,alt:NaN,dir:NaN,simple:NaN,semitones:NaN,chroma:NaN,coord:[],oct:NaN}),Tm="([-+]?\\d+)(d{1,4}|m|M|P|A{1,4})",Im="(AA|A|P|M|m|d|dd)([-+]?\\d+)",Em=new RegExp("^"+Tm+"|"+Im+"$");function Lm(e){const t=Em.exec(`${e}`);return t===null?["",""]:t[1]?[t[1],t[2]]:[t[4],t[3]]}var zi={};function Zt(e){return typeof e=="string"?zi[e]||(zi[e]=Om(e)):xm(e)?Zt(_m(e)):wm(e)?Zt(e.name):il}var Ui=[0,2,4,5,7,9,11],Qr="PMMPPMM";function Om(e){const t=Lm(e);if(t[0]==="")return il;const n=+t[0],l=t[1],i=(Math.abs(n)-1)%7,s=Qr[i];if(s==="M"&&l==="P")return il;const m=s==="M"?"majorable":"perfectable",h=""+n+l,M=n<0?-1:1,y=n===8||n===-8?n:M*(i+1),S=$m(m,l),b=Math.floor((Math.abs(n)-1)/7),N=M*(Ui[i]+S+12*b),T=(M*(Ui[i]+S)%12+12)%12,R=jm({step:i,alt:S,oct:b,dir:M});return{empty:!1,name:h,num:n,q:l,step:i,alt:S,dir:M,type:m,simple:y,semitones:N,chroma:T,coord:R,oct:b}}function $m(e,t){return t==="M"&&e==="majorable"||t==="P"&&e==="perfectable"?0:t==="m"&&e==="majorable"?-1:/^A+$/.test(t)?t.length:/^d+$/.test(t)?-1*(e==="perfectable"?t.length:t.length+1):0}function _m(e){const{step:t,alt:n,oct:l=0,dir:i}=e;if(!i)return"";const s=t+1+7*l,m=s===0?t+1:s,h=i<0?"-":"",M=Qr[t]==="M"?"majorable":"perfectable";return h+m+Rm(M,n)}function Rm(e,t){return t===0?e==="majorable"?"M":"P":t===-1&&e==="majorable"?"m":t>0?Bi("A",t):Bi("d",e==="perfectable"?t:t+1)}var km=[["1P 3M 5P","major","M ^  maj"],["1P 3M 5P 7M","major seventh","maj7 \u0394 ma7 M7 Maj7 ^7"],["1P 3M 5P 7M 9M","major ninth","maj9 \u03949 ^9"],["1P 3M 5P 7M 9M 13M","major thirteenth","maj13 Maj13 ^13"],["1P 3M 5P 6M","sixth","6 add6 add13 M6"],["1P 3M 5P 6M 9M","sixth added ninth","6add9 6/9 69 M69"],["1P 3M 6m 7M","major seventh flat sixth","M7b6 ^7b6"],["1P 3M 5P 7M 11A","major seventh sharp eleventh","maj#4 \u0394#4 \u0394#11 M7#11 ^7#11 maj7#11"],["1P 3m 5P","minor","m min -"],["1P 3m 5P 7m","minor seventh","m7 min7 mi7 -7"],["1P 3m 5P 7M","minor/major seventh","m/ma7 m/maj7 mM7 mMaj7 m/M7 -\u03947 m\u0394 -^7 -maj7"],["1P 3m 5P 6M","minor sixth","m6 -6"],["1P 3m 5P 7m 9M","minor ninth","m9 -9"],["1P 3m 5P 7M 9M","minor/major ninth","mM9 mMaj9 -^9"],["1P 3m 5P 7m 9M 11P","minor eleventh","m11 -11"],["1P 3m 5P 7m 9M 13M","minor thirteenth","m13 -13"],["1P 3m 5d","diminished","dim \xB0 o"],["1P 3m 5d 7d","diminished seventh","dim7 \xB07 o7"],["1P 3m 5d 7m","half-diminished","m7b5 \xF8 -7b5 h7 h"],["1P 3M 5P 7m","dominant seventh","7 dom"],["1P 3M 5P 7m 9M","dominant ninth","9"],["1P 3M 5P 7m 9M 13M","dominant thirteenth","13"],["1P 3M 5P 7m 11A","lydian dominant seventh","7#11 7#4"],["1P 3M 5P 7m 9m","dominant flat ninth","7b9"],["1P 3M 5P 7m 9A","dominant sharp ninth","7#9"],["1P 3M 7m 9m","altered","alt7"],["1P 4P 5P","suspended fourth","sus4 sus"],["1P 2M 5P","suspended second","sus2"],["1P 4P 5P 7m","suspended fourth seventh","7sus4 7sus"],["1P 5P 7m 9M 11P","eleventh","11"],["1P 4P 5P 7m 9m","suspended fourth flat ninth","b9sus phryg 7b9sus 7b9sus4"],["1P 5P","fifth","5"],["1P 3M 5A","augmented","aug + +5 ^#5"],["1P 3m 5A","minor augmented","m#5 -#5 m+"],["1P 3M 5A 7M","augmented seventh","maj7#5 maj7+5 +maj7 ^7#5"],["1P 3M 5P 7M 9M 11A","major sharp eleventh (lydian)","maj9#11 \u03949#11 ^9#11"],["1P 2M 4P 5P","","sus24 sus4add9"],["1P 3M 5A 7M 9M","","maj9#5 Maj9#5"],["1P 3M 5A 7m","","7#5 +7 7+ 7aug aug7"],["1P 3M 5A 7m 9A","","7#5#9 7#9#5 7alt"],["1P 3M 5A 7m 9M","","9#5 9+"],["1P 3M 5A 7m 9M 11A","","9#5#11"],["1P 3M 5A 7m 9m","","7#5b9 7b9#5"],["1P 3M 5A 7m 9m 11A","","7#5b9#11"],["1P 3M 5A 9A","","+add#9"],["1P 3M 5A 9M","","M#5add9 +add9"],["1P 3M 5P 6M 11A","","M6#11 M6b5 6#11 6b5"],["1P 3M 5P 6M 7M 9M","","M7add13"],["1P 3M 5P 6M 9M 11A","","69#11"],["1P 3m 5P 6M 9M","","m69 -69"],["1P 3M 5P 6m 7m","","7b6"],["1P 3M 5P 7M 9A 11A","","maj7#9#11"],["1P 3M 5P 7M 9M 11A 13M","","M13#11 maj13#11 M13+4 M13#4"],["1P 3M 5P 7M 9m","","M7b9"],["1P 3M 5P 7m 11A 13m","","7#11b13 7b5b13"],["1P 3M 5P 7m 13M","","7add6 67 7add13"],["1P 3M 5P 7m 9A 11A","","7#9#11 7b5#9 7#9b5"],["1P 3M 5P 7m 9A 11A 13M","","13#9#11"],["1P 3M 5P 7m 9A 11A 13m","","7#9#11b13"],["1P 3M 5P 7m 9A 13M","","13#9"],["1P 3M 5P 7m 9A 13m","","7#9b13"],["1P 3M 5P 7m 9M 11A","","9#11 9+4 9#4"],["1P 3M 5P 7m 9M 11A 13M","","13#11 13+4 13#4"],["1P 3M 5P 7m 9M 11A 13m","","9#11b13 9b5b13"],["1P 3M 5P 7m 9m 11A","","7b9#11 7b5b9 7b9b5"],["1P 3M 5P 7m 9m 11A 13M","","13b9#11"],["1P 3M 5P 7m 9m 11A 13m","","7b9b13#11 7b9#11b13 7b5b9b13"],["1P 3M 5P 7m 9m 13M","","13b9"],["1P 3M 5P 7m 9m 13m","","7b9b13"],["1P 3M 5P 7m 9m 9A","","7b9#9"],["1P 3M 5P 9M","","Madd9 2 add9 add2"],["1P 3M 5P 9m","","Maddb9"],["1P 3M 5d","","Mb5"],["1P 3M 5d 6M 7m 9M","","13b5"],["1P 3M 5d 7M","","M7b5"],["1P 3M 5d 7M 9M","","M9b5"],["1P 3M 5d 7m","","7b5"],["1P 3M 5d 7m 9M","","9b5"],["1P 3M 7m","","7no5"],["1P 3M 7m 13m","","7b13"],["1P 3M 7m 9M","","9no5"],["1P 3M 7m 9M 13M","","13no5"],["1P 3M 7m 9M 13m","","9b13"],["1P 3m 4P 5P","","madd4"],["1P 3m 5P 6m 7M","","mMaj7b6"],["1P 3m 5P 6m 7M 9M","","mMaj9b6"],["1P 3m 5P 7m 11P","","m7add11 m7add4"],["1P 3m 5P 9M","","madd9"],["1P 3m 5d 6M 7M","","o7M7"],["1P 3m 5d 7M","","oM7"],["1P 3m 6m 7M","","mb6M7"],["1P 3m 6m 7m","","m7#5"],["1P 3m 6m 7m 9M","","m9#5"],["1P 3m 5A 7m 9M 11P","","m11A"],["1P 3m 6m 9m","","mb6b9"],["1P 2M 3m 5d 7m","","m9b5"],["1P 4P 5A 7M","","M7#5sus4"],["1P 4P 5A 7M 9M","","M9#5sus4"],["1P 4P 5A 7m","","7#5sus4"],["1P 4P 5P 7M","","M7sus4"],["1P 4P 5P 7M 9M","","M9sus4"],["1P 4P 5P 7m 9M","","9sus4 9sus"],["1P 4P 5P 7m 9M 13M","","13sus4 13sus"],["1P 4P 5P 7m 9m 13m","","7sus4b9b13 7b9b13sus4"],["1P 4P 7m 10m","","4 quartal"],["1P 5P 7m 9m 11P","","11b9"]],Fm=km;({...pe});var Yr=[],qt={};function Dm(e,t,n){const l=zm(e),i={...ge(e),name:n||"",quality:l,intervals:e,aliases:t};Yr.push(i),i.name&&(qt[i.name]=i),qt[i.setNum]=i,qt[i.chroma]=i,i.aliases.forEach(s=>Bm(i,s))}function Bm(e,t){qt[t]=e}function zm(e){const t=n=>e.indexOf(n)!==-1;return t("5A")?"Augmented":t("3M")?"Major":t("5d")?"Diminished":t("3m")?"Minor":"Unknown"}Fm.forEach(([e,t,n])=>Dm(e.split(" "),n.split(" "),t));Yr.sort((e,t)=>e.setNum-t.setNum);function Um(e){const[t,n,l,i]=pl(e);return t===""?qn("",e):t==="A"&&i==="ug"?qn("","aug"):qn(t+n,l+i)}function qn(e,t){const n=t.split("/");if(n.length===1)return[e,n[0],""];const[l,i,s,m]=pl(n[1]);return l!==""&&s===""&&m===""?[e,n[0],l+i]:[e,t,""]}function Gm(e,t){return t.map(At).map(l=>nn(e,Zt(l))+l.chordType)}function Hm(e,t){return t.map(n=>{const[l,i]=Um(n),s=rc(e,l);return At(Zt(s)).name+i})}var qm={fromRomanNumerals:Gm,toRomanNumerals:Hm};Object.freeze({empty:!0,name:"",num:NaN,q:"",type:"",step:NaN,alt:NaN,dir:NaN,simple:NaN,semitones:NaN,chroma:NaN,coord:[],oct:NaN});var Vm=[["1P 3M 5P","major","M ^  maj"],["1P 3M 5P 7M","major seventh","maj7 \u0394 ma7 M7 Maj7 ^7"],["1P 3M 5P 7M 9M","major ninth","maj9 \u03949 ^9"],["1P 3M 5P 7M 9M 13M","major thirteenth","maj13 Maj13 ^13"],["1P 3M 5P 6M","sixth","6 add6 add13 M6"],["1P 3M 5P 6M 9M","sixth added ninth","6add9 6/9 69 M69"],["1P 3M 6m 7M","major seventh flat sixth","M7b6 ^7b6"],["1P 3M 5P 7M 11A","major seventh sharp eleventh","maj#4 \u0394#4 \u0394#11 M7#11 ^7#11 maj7#11"],["1P 3m 5P","minor","m min -"],["1P 3m 5P 7m","minor seventh","m7 min7 mi7 -7"],["1P 3m 5P 7M","minor/major seventh","m/ma7 m/maj7 mM7 mMaj7 m/M7 -\u03947 m\u0394 -^7 -maj7"],["1P 3m 5P 6M","minor sixth","m6 -6"],["1P 3m 5P 7m 9M","minor ninth","m9 -9"],["1P 3m 5P 7M 9M","minor/major ninth","mM9 mMaj9 -^9"],["1P 3m 5P 7m 9M 11P","minor eleventh","m11 -11"],["1P 3m 5P 7m 9M 13M","minor thirteenth","m13 -13"],["1P 3m 5d","diminished","dim \xB0 o"],["1P 3m 5d 7d","diminished seventh","dim7 \xB07 o7"],["1P 3m 5d 7m","half-diminished","m7b5 \xF8 -7b5 h7 h"],["1P 3M 5P 7m","dominant seventh","7 dom"],["1P 3M 5P 7m 9M","dominant ninth","9"],["1P 3M 5P 7m 9M 13M","dominant thirteenth","13"],["1P 3M 5P 7m 11A","lydian dominant seventh","7#11 7#4"],["1P 3M 5P 7m 9m","dominant flat ninth","7b9"],["1P 3M 5P 7m 9A","dominant sharp ninth","7#9"],["1P 3M 7m 9m","altered","alt7"],["1P 4P 5P","suspended fourth","sus4 sus"],["1P 2M 5P","suspended second","sus2"],["1P 4P 5P 7m","suspended fourth seventh","7sus4 7sus"],["1P 5P 7m 9M 11P","eleventh","11"],["1P 4P 5P 7m 9m","suspended fourth flat ninth","b9sus phryg 7b9sus 7b9sus4"],["1P 5P","fifth","5"],["1P 3M 5A","augmented","aug + +5 ^#5"],["1P 3m 5A","minor augmented","m#5 -#5 m+"],["1P 3M 5A 7M","augmented seventh","maj7#5 maj7+5 +maj7 ^7#5"],["1P 3M 5P 7M 9M 11A","major sharp eleventh (lydian)","maj9#11 \u03949#11 ^9#11"],["1P 2M 4P 5P","","sus24 sus4add9"],["1P 3M 5A 7M 9M","","maj9#5 Maj9#5"],["1P 3M 5A 7m","","7#5 +7 7+ 7aug aug7"],["1P 3M 5A 7m 9A","","7#5#9 7#9#5 7alt"],["1P 3M 5A 7m 9M","","9#5 9+"],["1P 3M 5A 7m 9M 11A","","9#5#11"],["1P 3M 5A 7m 9m","","7#5b9 7b9#5"],["1P 3M 5A 7m 9m 11A","","7#5b9#11"],["1P 3M 5A 9A","","+add#9"],["1P 3M 5A 9M","","M#5add9 +add9"],["1P 3M 5P 6M 11A","","M6#11 M6b5 6#11 6b5"],["1P 3M 5P 6M 7M 9M","","M7add13"],["1P 3M 5P 6M 9M 11A","","69#11"],["1P 3m 5P 6M 9M","","m69 -69"],["1P 3M 5P 6m 7m","","7b6"],["1P 3M 5P 7M 9A 11A","","maj7#9#11"],["1P 3M 5P 7M 9M 11A 13M","","M13#11 maj13#11 M13+4 M13#4"],["1P 3M 5P 7M 9m","","M7b9"],["1P 3M 5P 7m 11A 13m","","7#11b13 7b5b13"],["1P 3M 5P 7m 13M","","7add6 67 7add13"],["1P 3M 5P 7m 9A 11A","","7#9#11 7b5#9 7#9b5"],["1P 3M 5P 7m 9A 11A 13M","","13#9#11"],["1P 3M 5P 7m 9A 11A 13m","","7#9#11b13"],["1P 3M 5P 7m 9A 13M","","13#9"],["1P 3M 5P 7m 9A 13m","","7#9b13"],["1P 3M 5P 7m 9M 11A","","9#11 9+4 9#4"],["1P 3M 5P 7m 9M 11A 13M","","13#11 13+4 13#4"],["1P 3M 5P 7m 9M 11A 13m","","9#11b13 9b5b13"],["1P 3M 5P 7m 9m 11A","","7b9#11 7b5b9 7b9b5"],["1P 3M 5P 7m 9m 11A 13M","","13b9#11"],["1P 3M 5P 7m 9m 11A 13m","","7b9b13#11 7b9#11b13 7b5b9b13"],["1P 3M 5P 7m 9m 13M","","13b9"],["1P 3M 5P 7m 9m 13m","","7b9b13"],["1P 3M 5P 7m 9m 9A","","7b9#9"],["1P 3M 5P 9M","","Madd9 2 add9 add2"],["1P 3M 5P 9m","","Maddb9"],["1P 3M 5d","","Mb5"],["1P 3M 5d 6M 7m 9M","","13b5"],["1P 3M 5d 7M","","M7b5"],["1P 3M 5d 7M 9M","","M9b5"],["1P 3M 5d 7m","","7b5"],["1P 3M 5d 7m 9M","","9b5"],["1P 3M 7m","","7no5"],["1P 3M 7m 13m","","7b13"],["1P 3M 7m 9M","","9no5"],["1P 3M 7m 9M 13M","","13no5"],["1P 3M 7m 9M 13m","","9b13"],["1P 3m 4P 5P","","madd4"],["1P 3m 5P 6m 7M","","mMaj7b6"],["1P 3m 5P 6m 7M 9M","","mMaj9b6"],["1P 3m 5P 7m 11P","","m7add11 m7add4"],["1P 3m 5P 9M","","madd9"],["1P 3m 5d 6M 7M","","o7M7"],["1P 3m 5d 7M","","oM7"],["1P 3m 6m 7M","","mb6M7"],["1P 3m 6m 7m","","m7#5"],["1P 3m 6m 7m 9M","","m9#5"],["1P 3m 5A 7m 9M 11P","","m11A"],["1P 3m 6m 9m","","mb6b9"],["1P 2M 3m 5d 7m","","m9b5"],["1P 4P 5A 7M","","M7#5sus4"],["1P 4P 5A 7M 9M","","M9#5sus4"],["1P 4P 5A 7m","","7#5sus4"],["1P 4P 5P 7M","","M7sus4"],["1P 4P 5P 7M 9M","","M9sus4"],["1P 4P 5P 7m 9M","","9sus4 9sus"],["1P 4P 5P 7m 9M 13M","","13sus4 13sus"],["1P 4P 5P 7m 9m 13m","","7sus4b9b13 7b9b13sus4"],["1P 4P 7m 10m","","4 quartal"],["1P 5P 7m 9m 11P","","11b9"]],Jm=Vm;({...pe});var Zr=[],Vt={};function Km(e,t,n){const l=Wm(e),i={...ge(e),name:n||"",quality:l,intervals:e,aliases:t};Zr.push(i),i.name&&(Vt[i.name]=i),Vt[i.setNum]=i,Vt[i.chroma]=i,i.aliases.forEach(s=>Xm(i,s))}function Xm(e,t){Vt[t]=e}function Wm(e){const t=n=>e.indexOf(n)!==-1;return t("5A")?"Augmented":t("3M")?"Major":t("5d")?"Diminished":t("3m")?"Minor":"Unknown"}Jm.forEach(([e,t,n])=>Km(e.split(" "),n.split(" "),t));Zr.sort((e,t)=>e.setNum-t.setNum);const Qm={seed:0,noteLength:32,partCount:4,drumPartRatio:.5},B=new cl;let ea=1;function Ym(e){ea=e}function Zm(e){const t={...Qm,...e};B.setSeed(ea+t.seed);const n=i1(t.noteLength);return ae(t.partCount,()=>B.get()<t.drumPartRatio?n1(t.noteLength):B.get()<.5?e1(t.noteLength,n):t1(t.noteLength,n))}function e1(e,t){const n=B.select(["tone","synth"]),l=32,i=16;let s=`@${n}@s${B.getInt(999999999)} v${l} l${i} `;const m=wl(e,4,8,3);let h=B.getInt(-1,1),M=-1;for(let y=0;y<e;y++){if(B.get()<.1&&(h+=B.getInt(-1,2)),!m[y]){s+="r";continue}const S=t[y][B.getInt(4)];let b=Zi(Number.parseFloat(S.charAt(S.length-1))+h,2,7);const N=S.substring(0,S.length-1).replace("#","+").replace("b","-").toLowerCase();b!==M&&(s+=` o${b}`,M=b),s+=N}return s}function t1(e,t){const n=B.select(["tone","synth","select"]),l=B.get()<.3,i=l?24:30,s=16;let m=`@${n}@s${B.getInt(999999999)} v${i} l${s} `;const h=B.select([4,8,16]),M=ae(h,()=>B.getInt(4)),y=B.select([2,4,8]),S=l?ae(e,()=>!0):wl(e,B.select([1,1,y/2]),y,2);let b=B.getInt(-1,1);const N=B.get()<(l?.3:.8);let T=0,R=-1;for(let z=0;z<e;z++){if(N&&z%y===0&&(T=(T+1)%2),!S[z]){m+="r";continue}const K=t[z][l?M[z%h]:0];let ee=Zi(Number.parseFloat(K.charAt(K.length-1))+b+T,2,7);const ce=K.substring(0,K.length-1).replace("#","+").replace("b","-").toLowerCase();ee!==R&&(m+=` o${ee}`,R=ee),m+=ce}return m}function n1(e){let i=`@${B.select(["hit","click","explosion"])}@d@s${B.getInt(999999999)} v${36} l${16} o2 `;const s=wl(e,B.getInt(1,3),B.select([4,8]),3);for(let m=0;m<e;m++)i+=s[m]?"c":"r";return i}const Vn=[["I","IIIm","VIm"],["IV","IIm"],["V","VIIm"]],l1=[[0,1,2],[1,2,0],[2,0]];function i1(e){const t=B.select(["C","D","Eb","F","G","A","Bb"]),n=4,l=4;let i,s,m,h;return ae(e,M=>{if(M%l===0){M===0?(s=B.getInt(Vn.length-1),i=B.select(Vn[s])):B.get()<.8-M/l%2*.5&&(s=B.select(l1[s]),i=B.select(Vn[s]));const y=qm.fromRomanNumerals(`${t}${n}`,[i])[0];y.charAt(y.length-1)==="m"?(m="m7",h=y.substring(0,y.length-1)):(m="7",h=y)}return Lu.getChord(m,h).notes})}function wl(e,t,n,l){let i=ae(e,()=>!1);for(let s=0;s<l&&!(n>e);s++)i=r1(i,n,t),n*=2;return i}function r1(e,t,n){let l=ae(t,()=>!1);return ae(n,()=>{l[B.getInt(t)]=!0}),e.map((i,s)=>l[s%t]?!i:i)}let bt;function xl(e,t){const n={seed:0,numberOfSounds:2,volume:1,...t},l=`${e}_${JSON.stringify(n)}_${bt}`;if(pt[l]!=null)return vi(pt[l]),pt[l];let i;n.freq!=null?i=n.freq:n.pitch!=null?i=Yi(n.pitch):n.note!=null&&(i=rm.get(n.note.toUpperCase().replace("+","#").replace("-","b")).freq);let s=n.numberOfSounds,m=1,h=1;e==="synth"?m=h=.2:e==="tone"&&(m=h=.1,s=1);const M=Xt(e,n.seed+bt,s,n.volume,i,m,h);return hs(M),pt[l]=M,vi(M),M}const rl=.125;let pt,Ke;function al(e,t){Cl();const n={volume:1,speed:1,isLooping:!0,...t};let l=0;const i=e.map(h=>gs(h));i.forEach(h=>{const M=s1(h.mml);M>l&&(l=M)});const s=i.map(h=>{const{mml:M,args:y}=h,S=c1(M,l),b=ds(S,y.isDrum,y.seed,y.type,y.volume*n.volume);return tr(M,S,b)}),m=nr(s,l,n.speed);return fl(m),hl(m,n.isLooping),n.isLooping&&(Ke=m),m}function Cl(e){let t=e;if(t==null)if(Ke!=null)t=Ke,Ke=void 0;else return;Pl(t),ir(t),Ke=void 0}function ol(e){return Zm(e)}function a1(){const e=xe.currentTime;bs(e),us(e)}function o1(e=1,t=void 0){en(e),rs(t),ta()}function ta(){ys(),Ke=void 0,Jt={},cs(),pt={}}function en(e=1){bt=e,As(bt),Ym(bt)}function s1(e){const t=new Vi(e);for(let n of t)if(n.type==="end")return Math.floor(n.time/rl)}function c1(e,t){const n=[],l=new Vi(e);for(let i of l)if(i.type==="note"){let s=Math.floor((i.time+i.duration)/rl);s>=t&&(s-=t),n.push({pitch:i.noteNumber,quantizedStartStep:Math.floor(i.time/rl),quantizedEndStep:s})}return{notes:n}}let Jt,Ue;function u1(e="0",t=2,n,l=1){xl(ar[e[0]],{seed:ul(e),numberOfSounds:t,pitch:n,volume:l})}function m1(e="0",t=69-24,n=32,l=.25,i=4,s=["laser","select","hit","hit"],m=1){na(),Ue=Ns(e,t,n,l,i,s,m),fl(Ue),hl(Ue,!0)}function na(){Ue!=null&&(Pl(Ue),ir(Ue),Ue=void 0)}function d1(e="0",t=!1,n=69-12,l=16,i=.25,s=4,m=1){const h=`${e}_${t}_${n}_${l}_${i}_${s}_${m}`;if(Jt[h]==null){const M=ws(e,t,n,l,i,s,m);fl(M),Jt[h]=M}hl(Jt[h])}function f1(){rr()}const h1=Object.freeze(Object.defineProperty({__proto__:null,setTempo:Ki,setQuantize:Xi,setVolume:Wi,playEmpty:Qi,resumeAudioContext:os,startAudio:as,playSoundEffect:xl,playMml:al,stopMml:Cl,generateMml:ol,update:a1,init:o1,reset:ta,setSeed:en,play:u1,playBgm:m1,stopBgm:na,playJingle:d1,stopJingles:f1},Symbol.toStringTag,{value:"Module"}));(function(e){function t(a,o=0,c=1){return Math.max(o,Math.min(a,c))}function n(a,o,c){const u=c-o,P=a-o;if(P>=0)return P%u+o;{let g=u+P%u+o;return g>=c&&(g-=u),g}}function l(a,o,c){return o<=a&&a<c}function i(a){return[...Array(a).keys()]}function s(a,o){return i(a).map(c=>o(c))}function m(a,o){let c=[];for(let u=0,P=0;u<a.length;P++)o(a[u],P)?(c.push(a[u]),a.splice(u,1)):u++;return c}function h(a){return[...a].reduce((o,[c,u])=>(o[c]=u,o),{})}function M(a){return Object.keys(a).map(o=>[o,a[o]])}function y(a,o){return String.fromCharCode(a.charCodeAt(0)+o)}function S(a){return a.x!=null&&a.y!=null}class b{constructor(o,c){this.x=0,this.y=0,this.set(o,c)}set(o=0,c=0){return S(o)?(this.x=o.x,this.y=o.y,this):(this.x=o,this.y=c,this)}add(o,c){return S(o)?(this.x+=o.x,this.y+=o.y,this):(this.x+=o,this.y+=c,this)}sub(o,c){return S(o)?(this.x-=o.x,this.y-=o.y,this):(this.x-=o,this.y-=c,this)}mul(o){return this.x*=o,this.y*=o,this}div(o){return this.x/=o,this.y/=o,this}clamp(o,c,u,P){return this.x=t(this.x,o,c),this.y=t(this.y,u,P),this}wrap(o,c,u,P){return this.x=n(this.x,o,c),this.y=n(this.y,u,P),this}addWithAngle(o,c){return this.x+=Math.cos(o)*c,this.y+=Math.sin(o)*c,this}swapXy(){const o=this.x;return this.x=this.y,this.y=o,this}normalize(){return this.div(this.length),this}rotate(o){if(o===0)return this;const c=this.x;return this.x=c*Math.cos(o)-this.y*Math.sin(o),this.y=c*Math.sin(o)+this.y*Math.cos(o),this}angleTo(o,c){return S(o)?Math.atan2(o.y-this.y,o.x-this.x):Math.atan2(c-this.y,o-this.x)}distanceTo(o,c){let u,P;return S(o)?(u=o.x-this.x,P=o.y-this.y):(u=o-this.x,P=c-this.y),Math.sqrt(u*u+P*P)}isInRect(o,c,u,P){return l(this.x,o,o+u)&&l(this.y,c,c+P)}equals(o){return this.x===o.x&&this.y===o.y}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}get length(){return Math.sqrt(this.x*this.x+this.y*this.y)}get angle(){return Math.atan2(this.y,this.x)}}const N=["transparent","white","red","green","yellow","blue","purple","cyan","black","light_red","light_green","light_yellow","light_blue","light_purple","light_cyan","light_black"],T="twrgybpclRGYBPCL";let R;const z=[15658734,15277667,5025616,16761095,4149685,10233776,240116,6381921];function K(a){const[o,c,u]=ee(0,a);if(R=h(N.map((P,g)=>{if(g<1)return[P,{r:0,g:0,b:0,a:0}];if(g<9){const[I,U,D]=ee(g-1,a);return[P,{r:I,g:U,b:D,a:1}]}const[A,L,O]=ee(g-9+1,a);return[P,{r:Math.floor(a?A*.5:o-(o-A)*.5),g:Math.floor(a?L*.5:u-(u-L)*.5),b:Math.floor(a?O*.5:c-(c-O)*.5),a:1}]})),a){const P=R.blue;R.white={r:Math.floor(P.r*.15),g:Math.floor(P.g*.15),b:Math.floor(P.b*.15),a:1}}}function ee(a,o){o&&(a===0?a=7:a===7&&(a=0));const c=z[a];return[(c&16711680)>>16,(c&65280)>>8,c&255]}function ce(a,o=1){const c=R[a];return Math.floor(c.r*o)<<16|Math.floor(c.g*o)<<8|Math.floor(c.b*o)}function Ce(a,o=1){const c=R[a],u=Math.floor(c.r*o),P=Math.floor(c.g*o),g=Math.floor(c.b*o);return c.a<1?`rgba(${u},${P},${g},${c.a})`:`rgb(${u},${P},${g})`}const an=`
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
`;function on(a,o){return new PIXI.Filter(void 0,an,{width:a,height:o})}const q=new b;let W,ue,k,p=new b;const je=5;document.createElement("img");let V,me,$e=1,He="black",J,r,d=!1,f,v;function C(a,o,c,u,P,g,A){q.set(a),f=A,He=c;const L=`
-webkit-touch-callout: none;
-webkit-tap-highlight-color: ${o};
-webkit-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
background: ${o};
color: #888;
`,O=`
position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
`,I=`
image-rendering: -moz-crisp-edges;
image-rendering: -webkit-optimize-contrast;
image-rendering: -o-crisp-edges;
image-rendering: pixelated;
`;if(document.body.style.cssText=L,p.set(q),f.isUsingPixi){p.mul(je);const D=new PIXI.Application({width:p.x,height:p.y});if(W=D.view,k=new PIXI.Graphics,k.scale.x=k.scale.y=je,PIXI.settings.SCALE_MODE=PIXI.SCALE_MODES.NEAREST,D.stage.addChild(k),k.filters=[],f.name==="crt"&&k.filters.push(v=new PIXI.filters.CRTFilter({vignettingAlpha:.7})),f.name==="pixel"&&k.filters.push(on(p.x,p.y)),f.name==="pixel"||f.name==="shapeDark"){const Z=new PIXI.filters.AdvancedBloomFilter({threshold:.1,bloomScale:f.name==="pixel"?1.5:1,brightness:f.name==="pixel"?1.5:1,blur:8});k.filters.push(Z)}k.lineStyle(0),W.style.cssText=O}else W=document.createElement("canvas"),W.width=p.x,W.height=p.y,ue=W.getContext("2d"),ue.imageSmoothingEnabled=!1,W.style.cssText=O+I;document.body.appendChild(W);const U=()=>{const Z=innerWidth/innerHeight,X=p.x/p.y,Le=Z<X,fe=Le?.95*innerWidth:.95*innerHeight*X,zt=Le?.95*innerWidth/X:.95*innerHeight;W.style.width=`${fe}px`,W.style.height=`${zt}px`};if(window.addEventListener("resize",U),U(),u){V=document.createElement("canvas");let D;P?(V.width=p.x,V.height=p.y,D=g):(p.x<=p.y*2?(V.width=p.y*2,V.height=p.y):(V.width=p.x,V.height=p.x/2),V.width>400&&($e=400/V.width,V.width=400,V.height*=$e),D=Math.round(400/V.width)),me=V.getContext("2d"),me.fillStyle=o,gcc.setOptions({scale:D,capturingFps:60,isSmoothingEnabled:!1})}}function j(){if(f.isUsingPixi){k.clear(),k.beginFill(ce(He,f.isDarkColor?.15:1)),k.drawRect(0,0,q.x,q.y),k.endFill(),k.beginFill(ce(J)),d=!0;return}ue.fillStyle=Ce(He,f.isDarkColor?.15:1),ue.fillRect(0,0,q.x,q.y),ue.fillStyle=Ce(J)}function w(a){if(a===J){f.isUsingPixi&&!d&&F(ce(J));return}if(J=a,f.isUsingPixi){d&&k.endFill(),F(ce(J));return}ue.fillStyle=Ce(a)}function F(a){E(),k.beginFill(a),d=!0}function E(){d&&(k.endFill(),d=!1)}function G(){r=J}function H(){w(r)}function Q(a,o,c,u){if(f.isUsingPixi){f.name==="shape"||f.name==="shapeDark"?k.drawRoundedRect(a,o,c,u,2):k.drawRect(a,o,c,u);return}ue.fillRect(a,o,c,u)}function Y(a,o,c,u,P){const g=ce(J);F(g),k.drawCircle(a,o,P*.5),k.drawCircle(c,u,P*.5),E(),k.lineStyle(P,g),k.moveTo(a,o),k.lineTo(c,u),k.lineStyle(0)}function ve(){v.time+=.2}function sn(){if(me.fillRect(0,0,V.width,V.height),$e===1)me.drawImage(W,(V.width-W.width)/2,(V.height-W.height)/2);else{const a=W.width*$e,o=W.height*$e;me.drawImage(W,(V.width-a)/2,(V.height-o)/2,a,o)}gcc.capture(V)}const wt=[`
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
llll
    l
  ll
    l
llll
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
 llll
l
l
l
 llll
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
 llll
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
   l
lll
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

`],Ye=[`
 l
 l
 l

 l
`,`
l l
l l



`,`
l l
lll
l l
lll
l l
`,`
 ll
ll
lll
 ll
ll
`,`
l l
  l
 l
l
l l
`,`
ll
ll
lll
l 
lll
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
lll
 l
lll
 l
`,`
 l
 l
lll
 l
 l
`,`



 l
l
`,`


lll


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
l l
l l
l l
lll
`,`
  l
  l
  l
  l
  l
`,`
lll
  l
lll
l
lll
`,`
lll
  l
lll
  l
lll
`,`
l l
l l
lll
  l
  l
`,`
lll
l
lll
  l
lll
`,`
l
l
lll
l l
lll
`,`
lll
  l
  l
  l
  l
`,`
lll
l l
lll
l l
lll
`,`
lll
l l
lll
  l
  l
`,`

 l

 l

`,`

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

lll

lll

`,`
l
 l
  l
 l
l
`,`
lll
  l
 ll

 l
`,`

lll
l l
l
 ll
`,`
lll
l l
lll
l l
l l
`,`
ll
l l
lll
l l
ll
`,`
lll
l
l
l
lll
`,`
ll
l l
l l
l l
ll
`,`
lll
l
lll
l
lll
`,`
lll
l
lll
l
l
`,`
lll
l
l l
l l
 ll
`,`
l l
l l
lll
l l
l l
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
ll
`,`
l l
l l
ll
l l
l l
`,`
l
l
l
l
lll
`,`
l l
lll
l l
l l
l l
`,`
l l
lll
lll
lll
l l
`,`
lll
l l
l l
l l
lll
`,`
lll
l l
lll
l
l
`,`
lll
l l
l l
lll
lll
`,`
ll
l l
ll
l l
l l
`,`
lll
l
lll
  l
lll
`,`
lll
 l
 l
 l
 l
`,`
l l
l l
l l
l l
lll
`,`
l l
l l
l l
l l
 l
`,`
l l
l l
lll
lll
l l
`,`
l l
l l
 l
l l
l l
`,`
l l
l l
lll
 l
 l
`,`
lll
  l
 l
l
lll
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




lll
`,`
l
 l



`,`


 ll
l l
 ll
`,`

l
lll
l l
lll
`,`


lll
l
lll
`,`

  l
lll
l l
lll
`,`


lll
l
 ll
`,`

 ll
 l
lll
 l
`,`

lll
lll
  l
ll
`,`

l
l
lll
l l
`,`

 l

 l
 l
`,`

 l

 l
ll
`,`

l
l l
ll
l l
`,`

 l
 l
 l
 l
`,`


lll
lll
l l
`,`


ll
l l
l l
`,`


lll
l l
lll
`,`


lll
lll
l
`,`


lll
lll
  l
`,`


lll
l
l
`,`


 ll
lll
ll
`,`


lll
 l
 l
`,`


l l
l l
lll
`,`


l l
l l
 l
`,`


l l
lll
l l
`,`


l l
 l
l l
`,`


l l
 l
l
`,`


lll
 l
lll
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
lll
  l

`];let Te,xt;function la(){Te=[],xt=[]}function jl(){Te=Te.concat(xt),xt=[]}function Tl(a){let o={isColliding:{rect:{},text:{},char:{}}};return Te.forEach(c=>{ia(a,c)&&(o=Object.assign(Object.assign(Object.assign({},o),cn(c.collision.isColliding.rect)),{isColliding:{rect:Object.assign(Object.assign({},o.isColliding.rect),c.collision.isColliding.rect),text:Object.assign(Object.assign({},o.isColliding.text),c.collision.isColliding.text),char:Object.assign(Object.assign({},o.isColliding.char),c.collision.isColliding.char)}}))}),o}function ia(a,o){const c=o.pos.x-a.pos.x,u=o.pos.y-a.pos.y;return-o.size.x<c&&c<a.size.x&&-o.size.y<u&&u<a.size.y}function cn(a){if(a==null)return{};const o={transparent:"tr",white:"wh",red:"rd",green:"gr",yellow:"yl",blue:"bl",purple:"pr",cyan:"cy",black:"lc"};let c={};return M(a).forEach(([u,P])=>{const g=o[u];P&&g!=null&&(c[g]=!0)}),c}function Il(a,o,c,u){return El(!1,a,o,c,u)}function ra(a,o,c,u){return El(!0,a,o,c,u)}function El(a,o,c,u,P){if(typeof c=="number"){if(typeof u=="number")return ye(o,c,u,Object.assign({isCharacter:a,isCheckingCollision:!0,color:J},P));throw"invalid params"}else return ye(o,c.x,c.y,Object.assign({isCharacter:a,isCheckingCollision:!0,color:J},u))}const Ze=6,aa=4,qe=1,_=Ze*qe,et=aa*qe;let Ll,Ol,un,mn,dn=!1,Ie,_e,tt,Ct;const fn={color:"black",backgroundColor:"transparent",rotation:0,mirror:{x:1,y:1},scale:{x:1,y:1},isSmallText:!1,isCharacter:!1,isCheckingCollision:!1};function oa(){Ie=document.createElement("canvas"),Ie.width=Ie.height=_,_e=Ie.getContext("2d"),tt=document.createElement("canvas"),Ct=tt.getContext("2d"),Ll=wt.map((a,o)=>Object.assign(Object.assign({},jt(a)),{hitBox:nt(String.fromCharCode(33+o),!1)})),Ol=Ye.map((a,o)=>Object.assign(Object.assign({},jt(a)),{hitBox:nt(String.fromCharCode(33+o),!1)})),un=wt.map((a,o)=>Object.assign(Object.assign({},jt(a)),{hitBox:nt(String.fromCharCode(33+o),!0)})),mn={}}function sa(a,o){const c=o.charCodeAt(0)-33;a.forEach((u,P)=>{un[c+P]=Object.assign(Object.assign({},jt(u)),{hitBox:nt(String.fromCharCode(33+c+P),!0)})})}function ca(){dn=!0}function ye(a,o,c,u={}){const P=Rl(u);o-=_/2*P.scale.x,c-=_/2*P.scale.y;const g=Math.floor(o);let A=a,L=g,O=Math.floor(c),I={isColliding:{rect:{},text:{},char:{}}};const U=P.isSmallText?et:_;for(let D=0;D<A.length;D++){const Z=A[D];if(Z===`
`){L=g,O+=_*P.scale.y;continue}const X=ua(Z,L,O,P);P.isCheckingCollision&&(I={isColliding:{rect:Object.assign(Object.assign({},I.isColliding.rect),X.isColliding.rect),text:Object.assign(Object.assign({},I.isColliding.text),X.isColliding.text),char:Object.assign(Object.assign({},I.isColliding.char),X.isColliding.char)}}),L+=U*P.scale.x}return I}function ua(a,o,c,u){const P=a.charCodeAt(0);if(P<32||P>126)return{isColliding:{rect:{},text:{},char:{}}};const g=Rl(u);if(g.backgroundColor!=="transparent"&&(G(),w(g.backgroundColor),Q(o,c,_*g.scale.x,_*g.scale.y),H()),P<=32)return{isColliding:{rect:{},text:{},char:{}}};const A=P-33,L=g.isCharacter?un[A]:g.isSmallText?Ol[A]:Ll[A],O=n(g.rotation,0,4);if(g.color==="black"&&O===0&&g.mirror.x===1&&g.mirror.y===1&&(!f.isUsingPixi||g.scale.x===1&&g.scale.y===1))return hn(L,o,c,g.scale,g.isCheckingCollision,!0);const I=JSON.stringify({c:a,options:g}),U=mn[I];if(U!=null)return hn(U,o,c,g.scale,g.isCheckingCollision,g.color!=="transparent");let D=!1;f.isUsingPixi&&(g.scale.x!==1||g.scale.y!==1)&&(tt.width=_*g.scale.x,tt.height=_*g.scale.y,Ct.imageSmoothingEnabled=!1,Ct.scale(g.scale.x,g.scale.y),$l(Ct,O,g,L),D=!0),_e.clearRect(0,0,_,_),$l(_e,O,g,L);const Z=nt(a,g.isCharacter);let X;if(dn||f.isUsingPixi){const Le=document.createElement("img");if(Le.src=Ie.toDataURL(),f.isUsingPixi){const fe=document.createElement("img");fe.src=(D?tt:Ie).toDataURL(),X=PIXI.Texture.from(fe)}dn&&(mn[I]={image:Le,texture:X,hitBox:Z})}return hn({image:Ie,texture:X,hitBox:Z},o,c,g.scale,g.isCheckingCollision,g.color!=="transparent")}function $l(a,o,c,u){o===0&&c.mirror.x===1&&c.mirror.y===1?a.drawImage(u.image,0,0):(a.save(),a.translate(_/2,_/2),a.rotate(Math.PI/2*o),(c.mirror.x===-1||c.mirror.y===-1)&&a.scale(c.mirror.x,c.mirror.y),a.drawImage(u.image,-_/2,-_/2),a.restore()),c.color!=="black"&&(a.globalCompositeOperation="source-in",a.fillStyle=Ce(c.color==="transparent"?"black":c.color),a.fillRect(0,0,_,_),a.globalCompositeOperation="source-over")}function hn(a,o,c,u,P,g){if(g&&(u.x===1&&u.y===1?_l(a,o,c):_l(a,o,c,_*u.x,_*u.y)),!P)return;const A={pos:{x:o+a.hitBox.pos.x*u.x,y:c+a.hitBox.pos.y*u.y},size:{x:a.hitBox.size.x*u.x,y:a.hitBox.size.y*u.y},collision:a.hitBox.collision},L=Tl(A);return g&&Te.push(A),L}function _l(a,o,c,u,P){if(f.isUsingPixi){E(),k.beginTextureFill({texture:a.texture,matrix:new PIXI.Matrix().translate(o,c)}),k.drawRect(o,c,u==null?_:u,P==null?_:P),F(ce(J));return}u==null?ue.drawImage(a.image,o,c):ue.drawImage(a.image,o,c,u,P)}function jt(a,o=!0){_e.clearRect(0,0,_,_);let c=a.split(`
`);o&&(c=c.slice(1,c.length-1));let u=0;c.forEach(O=>{u=Math.max(O.length,u)});const P=Math.max(Math.ceil((Ze-u)/2),0),g=c.length,A=Math.max(Math.ceil((Ze-g)/2),0);c.forEach((O,I)=>{if(!(I+A>=Ze))for(let U=0;U<Ze-P;U++){const D=O.charAt(U);let Z=T.indexOf(D);D!==""&&Z>=1&&(_e.fillStyle=Ce(N[Z]),_e.fillRect((U+P)*qe,(I+A)*qe,qe,qe))}});const L=document.createElement("img");return L.src=Ie.toDataURL(),f.isUsingPixi?{image:L,texture:PIXI.Texture.from(L)}:{image:L}}function nt(a,o){const c={pos:new b(_,_),size:new b,collision:{isColliding:{char:{},text:{}}}};o?c.collision.isColliding.char[a]=!0:c.collision.isColliding.text[a]=!0;const u=_e.getImageData(0,0,_,_).data;let P=0;for(let g=0;g<_;g++)for(let A=0;A<_;A++)u[P+3]>0&&(A<c.pos.x&&(c.pos.x=A),g<c.pos.y&&(c.pos.y=g)),P+=4;P=0;for(let g=0;g<_;g++)for(let A=0;A<_;A++)u[P+3]>0&&(A>c.pos.x+c.size.x-1&&(c.size.x=A-c.pos.x+1),g>c.pos.y+c.size.y-1&&(c.size.y=g-c.pos.y+1)),P+=4;return c}function Rl(a){let o=Object.assign(Object.assign({},fn),a);return a.scale!=null&&(o.scale=Object.assign(Object.assign({},fn.scale),a.scale)),a.mirror!=null&&(o.mirror=Object.assign(Object.assign({},fn.mirror),a.mirror)),o}let Ve=!1,Tt=!1,Pn=!1;const kl=["Escape","Digit0","Digit1","Digit2","Digit3","Digit4","Digit5","Digit6","Digit7","Digit8","Digit9","Minus","Equal","Backspace","Tab","KeyQ","KeyW","KeyE","KeyR","KeyT","KeyY","KeyU","KeyI","KeyO","KeyP","BracketLeft","BracketRight","Enter","ControlLeft","KeyA","KeyS","KeyD","KeyF","KeyG","KeyH","KeyJ","KeyK","KeyL","Semicolon","Quote","Backquote","ShiftLeft","Backslash","KeyZ","KeyX","KeyC","KeyV","KeyB","KeyN","KeyM","Comma","Period","Slash","ShiftRight","NumpadMultiply","AltLeft","Space","CapsLock","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","Pause","ScrollLock","Numpad7","Numpad8","Numpad9","NumpadSubtract","Numpad4","Numpad5","Numpad6","NumpadAdd","Numpad1","Numpad2","Numpad3","Numpad0","NumpadDecimal","IntlBackslash","F11","F12","F13","F14","F15","F16","F17","F18","F19","F20","F21","F22","F23","F24","IntlYen","Undo","Paste","MediaTrackPrevious","Cut","Copy","MediaTrackNext","NumpadEnter","ControlRight","LaunchMail","AudioVolumeMute","MediaPlayPause","MediaStop","Eject","AudioVolumeDown","AudioVolumeUp","BrowserHome","NumpadDivide","PrintScreen","AltRight","Help","NumLock","Pause","Home","ArrowUp","PageUp","ArrowLeft","ArrowRight","End","ArrowDown","PageDown","Insert","Delete","OSLeft","OSRight","ContextMenu","BrowserSearch","BrowserFavorites","BrowserRefresh","BrowserStop","BrowserForward","BrowserBack"];let Mn;const ma={onKeyDown:void 0};let pn,gn=!1,vn=!1,yn=!1,bn={},Sn={},An={};function Fl(a){pn=Object.assign(Object.assign({},ma),a),Mn=h(kl.map(o=>[o,{isPressed:!1,isJustPressed:!1,isJustReleased:!1}])),document.addEventListener("keydown",o=>{gn=vn=!0,bn[o.code]=Sn[o.code]=!0,pn.onKeyDown!=null&&pn.onKeyDown(),(o.code==="AltLeft"||o.code==="AltRight"||o.code==="ArrowRight"||o.code==="ArrowDown"||o.code==="ArrowLeft"||o.code==="ArrowUp")&&o.preventDefault()}),document.addEventListener("keyup",o=>{gn=!1,yn=!0,bn[o.code]=!1,An[o.code]=!0})}function Dl(){Tt=!Ve&&vn,Pn=Ve&&yn,vn=yn=!1,Ve=gn,M(Mn).forEach(([a,o])=>{o.isJustPressed=!o.isPressed&&Sn[a],o.isJustReleased=o.isPressed&&An[a],o.isPressed=!!bn[a]}),Sn={},An={}}function Bl(){Tt=!1,Ve=!0}var da=Object.freeze({__proto__:null,get isPressed(){return Ve},get isJustPressed(){return Tt},get isJustReleased(){return Pn},codes:kl,get code(){return Mn},init:Fl,update:Dl,clearJustPressed:Bl});class It{constructor(o=null){this.setSeed(o)}get(o=1,c){return c==null&&(c=o,o=0),this.next()/4294967295*(c-o)+o}getInt(o,c){c==null&&(c=o,o=0);const u=Math.floor(o),P=Math.floor(c);return P===u?u:this.next()%(P-u)+u}getPlusOrMinus(){return this.getInt(2)*2-1}select(o){return o[this.getInt(o.length)]}setSeed(o,c=123456789,u=362436069,P=521288629,g=32){this.w=o!=null?o>>>0:Math.floor(Math.random()*4294967295)>>>0,this.x=c>>>0,this.y=u>>>0,this.z=P>>>0;for(let A=0;A<g;A++)this.next();return this}getState(){return{x:this.x,y:this.y,z:this.z,w:this.w}}next(){const o=this.x^this.x<<11;return this.x=this.y,this.y=this.z,this.z=this.w,this.w=(this.w^this.w>>>19^(o^o>>>8))>>>0,this.w}}const lt=new b;let be=!1,Je=!1,it=!1,fa={isDebugMode:!1,anchor:new b,padding:new b,onPointerDownOrUp:void 0},ne,de,te;const rt=new It,Re=new b,Se=new b;let at=!1,ot=new b,Nn=!1,wn=!1,xn=!1;function zl(a,o,c){te=Object.assign(Object.assign({},fa),c),ne=a,de=new b(o.x+te.padding.x*2,o.y+te.padding.y*2),ot.set(ne.offsetLeft+ne.clientWidth*(.5-te.anchor.x),ne.offsetTop+ne.clientWidth*(.5-te.anchor.y)),te.isDebugMode&&Re.set(ne.offsetLeft+ne.clientWidth*(.5-te.anchor.x),ne.offsetTop+ne.clientWidth*(.5-te.anchor.y)),document.addEventListener("mousedown",u=>{Hl(u.pageX,u.pageY)}),document.addEventListener("touchstart",u=>{Hl(u.touches[0].pageX,u.touches[0].pageY)}),document.addEventListener("mousemove",u=>{ql(u.pageX,u.pageY)}),document.addEventListener("touchmove",u=>{u.preventDefault(),ql(u.touches[0].pageX,u.touches[0].pageY)},{passive:!1}),document.addEventListener("mouseup",u=>{Vl()}),document.addEventListener("touchend",u=>{u.preventDefault(),u.target.click(),Vl()},{passive:!1})}function Ul(){ha(ot.x,ot.y,lt),te.isDebugMode&&!lt.isInRect(0,0,de.x,de.y)?(Pa(),lt.set(Re),Je=!be&&at,it=be&&!at,be=at):(Je=!be&&wn,it=be&&xn,be=Nn),wn=xn=!1}function Gl(){Je=!1,be=!0}function ha(a,o,c){ne!=null&&(c.x=Math.round(((a-ne.offsetLeft)/ne.clientWidth+te.anchor.x)*de.x-te.padding.x),c.y=Math.round(((o-ne.offsetTop)/ne.clientHeight+te.anchor.y)*de.y-te.padding.y))}function Pa(){Se.length>0?(Re.add(Se),!l(Re.x,-de.x*.1,de.x*1.1)&&Re.x*Se.x>0&&(Se.x*=-1),!l(Re.y,-de.y*.1,de.y*1.1)&&Re.y*Se.y>0&&(Se.y*=-1),rt.get()<.05&&Se.set(0)):rt.get()<.1&&(Se.set(0),Se.addWithAngle(rt.get(Math.PI*2),(de.x+de.y)*rt.get(.01,.03))),rt.get()<.05&&(at=!at)}function Hl(a,o){ot.set(a,o),Nn=wn=!0,te.onPointerDownOrUp!=null&&te.onPointerDownOrUp()}function ql(a,o){ot.set(a,o)}function Vl(a){Nn=!1,xn=!0,te.onPointerDownOrUp!=null&&te.onPointerDownOrUp()}var Ma=Object.freeze({__proto__:null,pos:lt,get isPressed(){return be},get isJustPressed(){return Je},get isJustReleased(){return it},init:zl,update:Ul,clearJustPressed:Gl});let Ae=new b,Ne=!1,Pe=!1,Ee=!1;function Jl(a){Fl({onKeyDown:a}),zl(W,q,{onPointerDownOrUp:a,anchor:new b(.5,.5)})}function Kl(){Dl(),Ul(),Ae=lt,Ne=Ve||be,Pe=Tt||Je,Ee=Pn||it}function Xl(){Bl(),Gl()}function st(a){Ae.set(a.pos),Ne=a.isPressed,Pe=a.isJustPressed,Ee=a.isJustReleased}var pa=Object.freeze({__proto__:null,get pos(){return Ae},get isPressed(){return Ne},get isJustPressed(){return Pe},get isJustReleased(){return Ee},init:Jl,update:Kl,clearJustPressed:Xl,set:st});let Wl,Ql;const Yl=68,Cn=1e3/Yl;let ct=0;const ga={viewSize:{x:100,y:100},bodyBackground:"#111",viewBackground:"black",isCapturing:!1,isCapturingGameCanvasOnly:!1,isSoundEnabled:!0,captureCanvasScale:1,theme:{name:"simple",isUsingPixi:!1,isDarkColor:!1}};let oe,Zl=10;function va(a,o,c){Wl=a,Ql=o,oe=Object.assign(Object.assign({},ga),c),K(oe.theme.isDarkColor),C(oe.viewSize,oe.bodyBackground,oe.viewBackground,oe.isCapturing,oe.isCapturingGameCanvasOnly,oe.captureCanvasScale,oe.theme),Jl(oe.isSoundEnabled?sss.startAudio:()=>{}),oa(),Wl(),ei()}function ei(){requestAnimationFrame(ei);const a=window.performance.now();a<ct-Yl/12||(ct+=Cn,(ct<a||ct>a+Cn*2)&&(ct=a+Cn),oe.isSoundEnabled&&sss.update(),Kl(),Ql(),oe.isCapturing&&sn(),Zl--,Zl===0&&ca())}let Et;const Lt=new It;function jn(){Et=[]}function ti(a,o=16,c=1,u=0,P=Math.PI*2){if(o<1){if(Lt.get()>o)return;o=1}for(let g=0;g<o;g++){const A=u+Lt.get(P)-P/2,L={pos:new b(a),vel:new b(c*Lt.get(.5,1),0).rotate(A),color:J,ticks:t(Lt.get(10,20)*Math.sqrt(Math.abs(c)),10,60)};Et.push(L)}}function Ot(){G(),Et=Et.filter(a=>(a.ticks--,a.ticks<0?!1:(a.pos.add(a.vel),a.vel.mul(.98),w(a.color),Q(Math.floor(a.pos.x),Math.floor(a.pos.y),1,1),!0))),H()}function Tn(a,o,c,u){return ni(!1,a,o,c,u)}function ya(a,o,c,u){return ni(!0,a,o,c,u)}function ba(a,o,c,u,P=.5,g=.5){typeof a!="number"&&(g=P,P=u,u=c,c=o,o=a.y,a=a.x);const A=new b(c).rotate(P),L=new b(a-A.x*g,o-A.y*g);return In(L,A,u)}function Sa(a,o,c=3,u=3,P=3){const g=new b,A=new b;if(typeof a=="number")if(typeof o=="number")typeof c=="number"?(g.set(a,o),A.set(c,u)):(g.set(a,o),A.set(c),P=u);else throw"invalid params";else if(typeof o=="number")if(typeof c=="number")g.set(a),A.set(o,c),P=u;else throw"invalid params";else if(typeof c=="number")g.set(a),A.set(o),P=c;else throw"invalid params";return In(g,A.sub(g),P)}function Aa(a,o,c,u,P,g){let A=new b;typeof a=="number"?A.set(a,o):(A.set(a),g=P,P=u,u=c,c=o),u==null&&(u=3),P==null&&(P=0),g==null&&(g=Math.PI*2);let L,O;if(P>g?(L=g,O=P-g):(L=P,O=g-P),O=t(O,0,Math.PI*2),O<.01)return;const I=t(Math.ceil(O*Math.sqrt(c*.25)),1,36),U=O/I;let D=L,Z=new b(c).rotate(D).add(A),X=new b,Le=new b,fe={isColliding:{rect:{},text:{},char:{}}};for(let zt=0;zt<I;zt++){D+=U,X.set(c).rotate(D).add(A),Le.set(X).sub(Z);const Ut=In(Z,Le,u,!0);fe=Object.assign(Object.assign(Object.assign({},fe),cn(Ut.isColliding.rect)),{isColliding:{rect:Object.assign(Object.assign({},fe.isColliding.rect),Ut.isColliding.rect),text:Object.assign(Object.assign({},fe.isColliding.text),Ut.isColliding.text),char:Object.assign(Object.assign({},fe.isColliding.char),Ut.isColliding.char)}}),Z.set(X)}return jl(),fe}function ni(a,o,c,u,P){if(typeof o=="number"){if(typeof c=="number")return typeof u=="number"?P==null?ke(a,o,c,u,u):ke(a,o,c,u,P):ke(a,o,c,u.x,u.y);throw"invalid params"}else if(typeof c=="number"){if(u==null)return ke(a,o.x,o.y,c,c);if(typeof u=="number")return ke(a,o.x,o.y,c,u);throw"invalid params"}else return ke(a,o.x,o.y,c.x,c.y)}function In(a,o,c,u=!1){let P=!0;(f.name==="shape"||f.name==="shapeDark")&&(J!=="transparent"&&Y(a.x,a.y,a.x+o.x,a.y+o.y,c),P=!1);const g=Math.floor(t(c,3,10)),A=Math.abs(o.x),L=Math.abs(o.y),O=t(Math.ceil(A>L?A/g:L/g)+1,3,99);o.div(O-1);let I={isColliding:{rect:{},text:{},char:{}}};for(let U=0;U<O;U++){const D=ke(!0,a.x,a.y,c,c,!0,P);I=Object.assign(Object.assign(Object.assign({},I),cn(D.isColliding.rect)),{isColliding:{rect:Object.assign(Object.assign({},I.isColliding.rect),D.isColliding.rect),text:Object.assign(Object.assign({},I.isColliding.text),D.isColliding.text),char:Object.assign(Object.assign({},I.isColliding.char),D.isColliding.char)}}),a.add(o)}return u||jl(),I}function ke(a,o,c,u,P,g=!1,A=!0){let L=A;(f.name==="shape"||f.name==="shapeDark")&&L&&J!=="transparent"&&(a?Q(o-u/2,c-P/2,u,P):Q(o,c,u,P),L=!1);let O=a?{x:Math.floor(o-u/2),y:Math.floor(c-P/2)}:{x:Math.floor(o),y:Math.floor(c)};const I={x:Math.trunc(u),y:Math.trunc(P)};if(I.x===0||I.y===0)return{isColliding:{rect:{},text:{},char:{}}};I.x<0&&(O.x+=I.x,I.x*=-1),I.y<0&&(O.y+=I.y,I.y*=-1);const U={pos:O,size:I,collision:{isColliding:{rect:{}}}};U.collision.isColliding.rect[J]=!0;const D=Tl(U);return J!=="transparent"&&((g?xt:Te).push(U),L&&Q(O.x,O.y,I.x,I.y)),D}function En({pos:a,size:o,text:c,isToggle:u=!1,onClick:P=()=>{},isSmallText:g=!0}){return{pos:a,size:o,text:c,isToggle:u,onClick:P,isPressed:!1,isSelected:!1,isHovered:!1,toggleGroup:[],isSmallText:g}}function Ln(a){const o=new b(Ae).sub(a.pos);a.isHovered=o.isInRect(0,0,a.size.x,a.size.y),a.isHovered&&Je&&(a.isPressed=!0),a.isPressed&&!a.isHovered&&(a.isPressed=!1),a.isPressed&&it&&(a.onClick(),a.isPressed=!1,a.isToggle&&(a.toggleGroup.length===0?a.isSelected=!a.isSelected:(a.toggleGroup.forEach(c=>{c.isSelected=!1}),a.isSelected=!0))),$t(a)}function $t(a){G(),w(a.isPressed?"blue":"light_blue"),Tn(a.pos.x,a.pos.y,a.size.x,a.size.y),a.isToggle&&!a.isSelected&&(w("white"),Tn(a.pos.x+1,a.pos.y+1,a.size.x-2,a.size.y-2)),w(a.isHovered?"black":"blue"),Il(a.text,a.pos.x+3,a.pos.y+3,{isSmallText:a.isSmallText}),H()}let Me,ut,Fe,On;function Na(a){Me={randomSeed:a,inputs:[]}}function wa(a){Me.inputs.push(a)}function li(){return Me!=null}function xa(a){ut=0,a.setSeed(Me.randomSeed)}function Ca(){ut>=Me.inputs.length||(st(Me.inputs[ut]),ut++)}function ja(){Fe=[]}function Ta(a,o,c){Fe.push({randomState:c.getState(),gameState:cloneDeep(a),baseState:cloneDeep(o)})}function Ia(a){const o=Fe.pop(),c=o.randomState;return a.setSeed(c.w,c.x,c.y,c.z,0),On={pos:new b(Ae),isPressed:Ne,isJustPressed:Pe,isJustReleased:Ee},st(Me.inputs.pop()),o}function Ea(a){const o=Fe[Fe.length-1],c=o.randomState;return a.setSeed(c.w,c.x,c.y,c.z,0),On={pos:new b(Ae),isPressed:Ne,isJustPressed:Pe,isJustReleased:Ee},st(Me.inputs[Me.inputs.length-1]),o}function La(){st(On)}function Oa(){return Fe.length===0}function $a(){const a=ut-1;if(!(a>=Me.inputs.length))return Fe[a]}const _a=Math.PI,Ra=Math.abs,ka=Math.sin,Fa=Math.cos,Da=Math.atan2,Ba=Math.sqrt,za=Math.pow,Ua=Math.floor,Ga=Math.round,Ha=Math.ceil;e.ticks=0,e.difficulty=void 0,e.score=0,e.time=void 0,e.isReplaying=!1;function qa(a=1,o){return we.get(a,o)}function Va(a=2,o){return we.getInt(a,o)}function Ja(a=1,o){return we.get(a,o)*we.getPlusOrMinus()}function $n(a="GAME OVER"){Dt=a,x.isShowingTime&&(e.time=void 0),ui()}function Ka(a="COMPLETE"){Dt=a,ui()}function Xa(a,o,c){if(e.isReplaying||(e.score+=a,o==null))return;const u=`${a>=1?"+":""}${Math.floor(a)}`;let P=new b;typeof o=="number"?P.set(o,c):P.set(o),P.x-=u.length*(x.isUsingSmallText?et:_)/2,P.y-=_/2,kt.push({str:u,pos:P,vy:-2,ticks:30})}function ii(a){w(a)}function Wa(a,o,c,u,P,g){let A=new b;typeof a=="number"?(A.set(a,o),L(A,c,u,P,g)):(A.set(a),L(A,o,c,u,P));function L(O,I,U,D,Z){if(ho(I)){const X=I;ti(O,X.count,X.speed,X.angle,X.angleWidth)}else ti(O,I,U,D,Z)}}function ri(a,o){return new b(a,o)}function ai(a,o){!ft&&!ze&&x.isSoundEnabled&&(o!=null&&typeof sss.playSoundEffect=="function"?sss.playSoundEffect(a,o):sss.play(Za[a]))}let _n;function Rn(){typeof sss.generateMml=="function"?_n=sss.playMml(sss.generateMml()):sss.playBgm()}function kn(){_n!=null&&sss.stopMml(_n),sss.stopBgm()}function Qa(a){if(ft){const o=Ea(we),c=o.baseState;return e.score=c.score,e.ticks=c.ticks,cloneDeep(o.gameState)}else if(ze){const o=Ia(we),c=o.baseState;return e.score=c.score,e.ticks=c.ticks,o.gameState}else{if(e.isReplaying)return $a().gameState;if(De==="inGame"){const o={score:e.score,ticks:e.ticks};Ta(a,o,we)}}return a}function Ya(){ze||(!e.isReplaying&&x.isRewindEnabled?so():$n())}const Za={coin:"c",laser:"l",explosion:"e",powerUp:"p",hit:"h",jump:"j",select:"s",lucky:"u",random:"r",click:"i",synth:"y",tone:"t"},oi={isPlayingBgm:!1,isCapturing:!1,isCapturingGameCanvasOnly:!1,captureCanvasScale:1,isShowingScore:!0,isShowingTime:!1,isReplayEnabled:!1,isRewindEnabled:!1,isDrawingParticleFront:!1,isDrawingScoreFront:!1,isUsingSmallText:!0,isMinifying:!1,isSoundEnabled:!0,viewSize:{x:100,y:100},audioSeed:0,seed:0,audioVolume:1,theme:"simple"},eo=new It,we=new It;let De,to={title:ao,inGame:ro,gameOver:oo,rewind:co},mt=0,_t,Rt=!0,dt=0,x,Be,kt,ft=!1,ze=!1,ht,Ft,Dt,Fn,Bt;function no(a){const o=window;o.update=a.update,o.title=a.title,o.description=a.description,o.characters=a.characters,o.options=a.options,si()}function si(){typeof options<"u"&&options!=null?x=Object.assign(Object.assign({},oi),options):x=oi;const a={name:x.theme,isUsingPixi:!1,isDarkColor:!1};x.theme!=="simple"&&x.theme!=="dark"&&(a.isUsingPixi=!0),(x.theme==="pixel"||x.theme==="shapeDark"||x.theme==="crt"||x.theme==="dark")&&(a.isDarkColor=!0),Be={viewSize:{x:100,y:100},bodyBackground:a.isDarkColor?"#101010":"#e0e0e0",viewBackground:a.isDarkColor?"blue":"white",theme:a,isSoundEnabled:x.isSoundEnabled},dt=x.audioSeed+x.seed,Be.isCapturing=x.isCapturing,Be.isCapturingGameCanvasOnly=x.isCapturingGameCanvasOnly,Be.captureCanvasScale=x.captureCanvasScale,Be.viewSize=x.viewSize,x.isMinifying&&Mo(),va(lo,io,Be)}function lo(){typeof description<"u"&&description!=null&&description.trim().length>0&&(Rt=!1,dt+=hi(description)),typeof title<"u"&&title!=null&&title.trim().length>0&&(Rt=!1,document.title=title,dt+=hi(title),Bt=`crisp-game-${encodeURIComponent(title)}-${dt}`,mt=fo()),typeof characters<"u"&&characters!=null&&sa(characters,"a"),x.isSoundEnabled&&(sss.init(dt),sss.setVolume(.1*x.audioVolume)),Be.viewSize,w("black"),Rt?(Dn(),e.ticks=0):ci()}function io(){e.df=e.difficulty=e.ticks/3600+1,e.tc=e.ticks;const a=e.score,o=e.time;e.sc=e.score;const c=e.sc;e.inp={p:Ae,ip:Ne,ijp:Pe,ijr:Ee},la(),to[De](),f.isUsingPixi&&(E(),f.name==="crt"&&ve()),e.ticks++,e.isReplaying?(e.score=a,e.time=o):e.sc!==c&&(e.score=e.sc)}function Dn(){De="inGame",e.ticks=-1,jn();const a=Math.floor(e.score);a>mt&&(mt=a),x.isShowingTime&&e.time!=null&&(_t==null||_t>e.time)&&(_t=e.time),e.score=0,e.time=0,kt=[],x.isPlayingBgm&&x.isSoundEnabled&&Rn();const o=eo.getInt(999999999);we.setSeed(o),(x.isReplayEnabled||x.isRewindEnabled)&&(Na(o),ja(),e.isReplaying=!1)}function ro(){j(),x.isDrawingParticleFront||Ot(),x.isDrawingScoreFront||fi(),(x.isReplayEnabled||x.isRewindEnabled)&&wa({pos:ri(Ae),isPressed:Ne,isJustPressed:Pe,isJustReleased:Ee}),typeof update=="function"&&update(),x.isDrawingParticleFront&&Ot(),x.isDrawingScoreFront&&fi(),Bn(),x.isShowingTime&&e.time!=null&&e.time++}function ci(){De="title",e.ticks=-1,jn(),j(),li()&&(xa(we),e.isReplaying=!0)}function ao(){if(Pe){Dn();return}if(j(),x.isReplayEnabled&&li()&&(Ca(),e.inp={p:Ae,ip:Ne,ijp:Pe,ijr:Ee},x.isDrawingParticleFront||Ot(),update(),x.isDrawingParticleFront&&Ot()),Bn(),typeof title<"u"&&title!=null){let a=0;title.split(`
`).forEach(c=>{c.length>a&&(a=c.length)});const o=Math.floor((q.x-a*_)/2);title.split(`
`).forEach((c,u)=>{ye(c,o,Math.floor(q.y*.25)+u*_)})}if(typeof description<"u"&&description!=null){let a=0;description.split(`
`).forEach(u=>{u.length>a&&(a=u.length)});const o=x.isUsingSmallText?et:_,c=Math.floor((q.x-a*o)/2);description.split(`
`).forEach((u,P)=>{ye(u,c,Math.floor(q.y/2)+P*_,{isSmallText:x.isUsingSmallText})})}}function ui(){De="gameOver",e.isReplaying||Xl(),e.ticks=-1,mi(),x.isPlayingBgm&&x.isSoundEnabled&&kn();const a=Math.floor(e.score);a>mt&&mo(a)}function oo(){e.ticks===0&&!f.isUsingPixi&&mi(),(e.isReplaying||e.ticks>20)&&Pe?Dn():e.ticks===(x.isReplayEnabled?120:300)&&!Rt&&ci()}function mi(){e.isReplaying||ye(Dt,Math.floor((q.x-Dt.length*_)/2),Math.floor(q.y/2))}function so(){De="rewind",ft=!0,ht=En({pos:{x:q.x-39,y:11},size:{x:36,y:7},text:"Rewind",isSmallText:x.isUsingSmallText}),Ft=En({pos:{x:q.x-39,y:q.y-19},size:{x:36,y:7},text:"GiveUp",isSmallText:x.isUsingSmallText}),x.isPlayingBgm&&x.isSoundEnabled&&kn(),f.isUsingPixi&&($t(ht),$t(Ft))}function co(){j(),update(),Bn(),La(),ze?($t(ht),(Oa()||!Ne)&&uo()):(Ln(ht),Ln(Ft),ht.isPressed&&(ze=!0,ft=!1)),Ft.isPressed&&(ft=ze=!1,$n()),x.isShowingTime&&e.time!=null&&e.time++}function uo(){ze=!1,De="inGame",jn(),x.isPlayingBgm&&x.isSoundEnabled&&Rn()}function Bn(){if(x.isShowingTime)di(e.time,3,3),di(_t,q.x-7*(x.isUsingSmallText?et:_),3);else if(x.isShowingScore){ye(`${Math.floor(e.score)}`,3,3,{isSmallText:x.isUsingSmallText});const a=`HI ${mt}`;ye(a,q.x-a.length*(x.isUsingSmallText?et:_),3,{isSmallText:x.isUsingSmallText})}}function di(a,o,c){if(a==null)return;let u=Math.floor(a*100/50);u>=10*60*100&&(u=10*60*100-1);const P=zn(Math.floor(u/6e3),1)+"'"+zn(Math.floor(u%6e3/100),2)+'"'+zn(Math.floor(u%100),2);ye(P,o,c,{isSmallText:x.isUsingSmallText})}function zn(a,o){return("0000"+a).slice(-o)}function fi(){G(),w("black"),kt=kt.filter(a=>(ye(a.str,a.pos.x,a.pos.y,{isSmallText:x.isUsingSmallText}),a.pos.y+=a.vy,a.vy*=.9,a.ticks--,a.ticks>0)),H()}function hi(a){let o=0;for(let c=0;c<a.length;c++){const u=a.charCodeAt(c);o=(o<<5)-o+u,o|=0}return o}function mo(a){if(Bt!=null)try{const o={highScore:a};localStorage.setItem(Bt,JSON.stringify(o))}catch(o){console.warn("Unable to save high score:",o)}}function fo(){try{const a=localStorage.getItem(Bt);if(a)return JSON.parse(a).highScore}catch(a){console.warn("Unable to load high score:",a)}return 0}function ho(a){return a!=null&&a.constructor===Object}function Po(){let a=window.location.search.substring(1);if(a=a.replace(/[^A-Za-z0-9_-]/g,""),a.length===0)return;const o=document.createElement("script");Fn=`${a}/main.js`,o.setAttribute("src",Fn),document.head.appendChild(o)}function Mo(){fetch(Fn).then(a=>a.text()).then(a=>{const o=Terser.minify(a+"update();",{toplevel:!0}).code,c="function(){",u=o.indexOf(c),P="options={",g=o.indexOf(P);let A=o;if(u>=0)A=o.substring(o.indexOf(c)+c.length,o.length-4);else if(g>=0){let L=1,O;for(let I=g+P.length;I<o.length;I++){const U=o.charAt(I);if(U==="{")L++;else if(U==="}"&&(L--,L===0)){O=I+2;break}}L===0&&(A=o.substring(O))}Pi.forEach(([L,O])=>{A=A.split(L).join(O)}),console.log(A),console.log(`${A.length} letters`)})}e.inp=void 0;function po(...a){return ii.apply(this,a)}function go(...a){return ai.apply(this,a)}function vo(...a){return s.apply(this,a)}function yo(...a){return m.apply(this.args)}e.tc=void 0,e.df=void 0,e.sc=void 0;const bo="transparent",So="white",Ao="red",No="green",wo="yellow",xo="blue",Co="purple",jo="cyan",To="black",Io="coin",Eo="laser",Lo="explosion",Oo="powerUp",$o="hit",_o="jump",Ro="select",ko="lucky";let Pi=[["===","=="],["!==","!="],["input.pos","inp.p"],["input.isPressed","inp.ip"],["input.isJustPressed","inp.ijp"],["input.isJustReleased","inp.ijr"],["color(","clr("],["play(","ply("],["times(","tms("],["remove(","rmv("],["ticks","tc"],["difficulty","df"],["score","sc"],[".isColliding.rect.transparent",".tr"],[".isColliding.rect.white",".wh"],[".isColliding.rect.red",".rd"],[".isColliding.rect.green",".gr"],[".isColliding.rect.yellow",".yl"],[".isColliding.rect.blue",".bl"],[".isColliding.rect.purple",".pr"],[".isColliding.rect.cyan",".cy"],[".isColliding.rect.black",".lc"],['"transparent"',"tr"],['"white"',"wh"],['"red"',"rd"],['"green"',"gr"],['"yellow"',"yl"],['"blue"',"bl"],['"purple"',"pr"],['"cyan"',"cy"],['"black"',"lc"],['"coin"',"cn"],['"laser"',"ls"],['"explosion"',"ex"],['"powerUp"',"pw"],['"hit"',"ht"],['"jump"',"jm"],['"select"',"sl"],['"lucky"',"uc"]];e.PI=_a,e.abs=Ra,e.addGameScript=Po,e.addScore=Xa,e.addWithCharCode=y,e.arc=Aa,e.atan2=Da,e.bar=ba,e.bl=xo,e.box=ya,e.ceil=Ha,e.char=ra,e.clamp=t,e.clr=po,e.cn=Io,e.color=ii,e.complete=Ka,e.cos=Fa,e.cy=jo,e.end=$n,e.ex=Lo,e.floor=Ua,e.frameState=Qa,e.getButton=En,e.gr=No,e.ht=$o,e.init=no,e.input=pa,e.jm=_o,e.keyboard=da,e.lc=To,e.line=Sa,e.ls=Eo,e.minifyReplaces=Pi,e.onLoad=si,e.particle=Wa,e.play=ai,e.playBgm=Rn,e.ply=go,e.pointer=Ma,e.pow=za,e.pr=Co,e.pw=Oo,e.range=i,e.rd=Ao,e.rect=Tn,e.remove=m,e.rewind=Ya,e.rmv=yo,e.rnd=qa,e.rndi=Va,e.rnds=Ja,e.round=Ga,e.sin=ka,e.sl=Ro,e.sqrt=Ba,e.stopBgm=kn,e.text=Il,e.times=s,e.tms=vo,e.tr=bo,e.uc=ko,e.updateButton=Ln,e.vec=ri,e.wh=So,e.wrap=n,e.yl=wo})(window||{});window.sss=h1;window.options={theme:"dark",isShowingScore:!1};let Gi,Mt=1;window.update=function(){ticks===0&&(Gi=["coin","jump","powerUp","laser","select","hit","click","explosion","random"].map((t,n)=>getButton({pos:vec(5,2+n*9),size:vec(56,7),text:t,isToggle:!1,onClick:()=>{xl(t)}})),en(Mt),al(ol())),Gi.forEach(t=>{updateButton(t)});const e=vec(5,92);if(color("light_blue"),rect(e.x,e.y,90,5),color("white"),rect(e.x+1,e.y+1,88,3),input.pos.isInRect(e.x+1,e.y+1,88,3)){let t=input.pos.x-e.x;color("blue"),rect(e.x+t,e.y+1,1,3),text(`${t}`,90,e.y-4,{isSmallText:!0}),input.isJustPressed&&(Mt=t,Cl(),en(Mt),al(ol()))}color("black"),rect(e.x+Mt,e.y+1,1,3),text(`seed: ${Mt}`,5,e.y-4,{isSmallText:!0})};window.addEventListener("load",onLoad);
