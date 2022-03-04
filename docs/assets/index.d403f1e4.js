var Fr=Object.defineProperty;var vi=Object.getOwnPropertySymbols;var Lr=Object.prototype.hasOwnProperty,Rr=Object.prototype.propertyIsEnumerable;var bn=(n,r,c)=>r in n?Fr(n,r,{enumerable:!0,configurable:!0,writable:!0,value:c}):n[r]=c,Cn=(n,r)=>{for(var c in r||(r={}))Lr.call(r,c)&&bn(n,c,r[c]);if(vi)for(var c of vi(r))Rr.call(r,c)&&bn(n,c,r[c]);return n};var pt=(n,r,c)=>(bn(n,typeof r!="symbol"?r+"":r,c),c);import{l as Pi}from"./vendor.b88932c4.js";const Dr=function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const h of document.querySelectorAll('link[rel="modulepreload"]'))p(h);new MutationObserver(h=>{for(const y of h)if(y.type==="childList")for(const b of y.addedNodes)b.tagName==="LINK"&&b.rel==="modulepreload"&&p(b)}).observe(document,{childList:!0,subtree:!0});function c(h){const y={};return h.integrity&&(y.integrity=h.integrity),h.referrerpolicy&&(y.referrerPolicy=h.referrerpolicy),h.crossorigin==="use-credentials"?y.credentials="include":h.crossorigin==="anonymous"?y.credentials="omit":y.credentials="same-origin",y}function p(h){if(h.ep)return;h.ep=!0;const y=c(h);fetch(h.href,y)}};Dr();var yt={};(function(n){var r=+Math.PI*2,c=16,p=1,h=Math.sin,y=Math.pow,b=Math.abs,M=1e-6,D=window.AudioContext||window.webkitAudioContext;n.SampleRate=0,n.Sec=0,n.SetSampleRate=function(t){n.SampleRate=t|0,n.Sec=t|0},n.SetSampleRate(vt()),n.Live=function(){var t={};return t._generate=function(s){var u=new P(s,n.DefaultModules),g=Pe(u.getSamplesLeft());return u.generate(g),g},t},n.Module={},n.G={};var O=n.stage={PhaseSpeed:0,PhaseSpeedMod:10,Generator:20,SampleMod:30,Volume:40};function I(t,s){return t.stage-s.stage}n.InitDefaultParams=k;function k(t,s){for(var u=0;u<s.length;u+=1){var g=s[u],v=t[g.name]||{};Ce(g.params,function(C,w){typeof v[w]=="undefined"&&(v[w]=C.D)}),t[g.name]=v}}n.Processor=P;function P(t,s){t=t||{},s=s||n.DefaultModules,typeof t=="function"?t=t():t=JSON.parse(JSON.stringify(t)),this.finished=!1,this.state={SampleRate:t.SampleRate||n.SampleRate},s=s.slice(),s.sort(I),this.modules=s,k(t,s);for(var u=0;u<this.modules.length;u+=1){var g=this.modules[u];this.modules[u].setup(this.state,t[g.name])}}P.prototype={generate:function(t){for(var s=0;s<t.length;s+=1)t[s]=0;if(!this.finished){for(var u=this.state,g=t.length|0,s=0;s<this.modules.length;s+=1){var v=this.modules[s],C=v.process(u,t.subarray(0,g))|0;g=Math.min(g,C)}g<t.length&&(this.finished=!0);for(var s=g;s<t.length;s++)t[s]=0}},getSamplesLeft:function(){for(var t=0,s=0;s<this.state.envelopes.length;s+=1)t+=this.state.envelopes[s].N;return t===0&&(t=3*this.state.SampleRate),t}},n.Module.Frequency={name:"Frequency",params:{Start:{L:30,H:1800,D:440},Min:{L:30,H:1800,D:30},Max:{L:30,H:1800,D:1800},Slide:{L:-1,H:1,D:0},DeltaSlide:{L:-1,H:1,D:0},RepeatSpeed:{L:0,H:3,D:0},ChangeAmount:{L:-12,H:12,D:0},ChangeSpeed:{L:0,H:1,D:0}},stage:O.PhaseSpeed,setup:function(t,s){var u=t.SampleRate;t.phaseParams=s,t.phaseSpeed=s.Start*r/u,t.phaseSpeedMax=s.Max*r/u,t.phaseSpeedMin=s.Min*r/u,t.phaseSpeedMin=Math.min(t.phaseSpeedMin,t.phaseSpeed),t.phaseSpeedMax=Math.max(t.phaseSpeedMax,t.phaseSpeed),t.phaseSlide=1+y(s.Slide,3)*64/u,t.phaseDeltaSlide=y(s.DeltaSlide,3)/(u*1e3),t.repeatTime=0,t.repeatLimit=1/0,s.RepeatSpeed>0&&(t.repeatLimit=s.RepeatSpeed*u),t.arpeggiatorTime=0,t.arpeggiatorLimit=s.ChangeSpeed*u,s.ChangeAmount==0&&(t.arpeggiatorLimit=1/0),t.arpeggiatorMod=1+s.ChangeAmount/12},process:function(t,s){for(var u=+t.phaseSpeed,g=+t.phaseSpeedMin,v=+t.phaseSpeedMax,C=+t.phaseSlide,w=+t.phaseDeltaSlide,F=t.repeatTime,L=t.repeatLimit,H=t.arpeggiatorTime,N=t.arpeggiatorLimit,Q=t.arpeggiatorMod,U=0;U<s.length;U++){if(C+=w,u*=C,u=u<g?g:u>v?v:u,F>L)return this.setup(t,t.phaseParams),U+this.process(t,s.subarray(U))-1;F++,H>N&&(u*=Q,H=0,N=1/0),H++,s[U]+=u}return t.repeatTime=F,t.arpeggiatorTime=H,t.arpeggiatorLimit=N,t.phaseSpeed=u,t.phaseSlide=C,s.length}},n.Module.Vibrato={name:"Vibrato",params:{Depth:{L:0,H:1,D:0},DepthSlide:{L:-1,H:1,D:0},Frequency:{L:.01,H:48,D:0},FrequencySlide:{L:-1,H:1,D:0}},stage:O.PhaseSpeedMod,setup:function(t,s){var u=t.SampleRate;t.vibratoPhase=0,t.vibratoDepth=s.Depth,t.vibratoPhaseSpeed=s.Frequency*r/u,t.vibratoPhaseSpeedSlide=1+y(s.FrequencySlide,3)*3/u,t.vibratoDepthSlide=s.DepthSlide/u},process:function(t,s){var u=+t.vibratoPhase,g=+t.vibratoDepth,v=+t.vibratoPhaseSpeed,C=+t.vibratoPhaseSpeedSlide,w=+t.vibratoDepthSlide;if(g==0&&w<=0)return s.length;for(var F=0;F<s.length;F++)u+=v,u>r&&(u-=r),s[F]+=s[F]*h(u)*g,v*=C,g+=w,g=Jt(g);return t.vibratoPhase=u,t.vibratoDepth=g,t.vibratoPhaseSpeed=v,s.length}},n.Module.Generator={name:"Generator",params:{Func:{C:n.G,D:"square"},A:{L:0,H:1,D:0},B:{L:0,H:1,D:0},ASlide:{L:-1,H:1,D:0},BSlide:{L:-1,H:1,D:0}},stage:O.Generator,setup:function(t,s){t.generatorPhase=0,typeof s.Func=="string"?t.generator=n.G[s.Func]:t.generator=s.Func,typeof t.generator=="object"&&(t.generator=t.generator.create()),ie(typeof t.generator=="function","generator must be a function"),t.generatorA=s.A,t.generatorASlide=s.ASlide,t.generatorB=s.B,t.generatorBSlide=s.BSlide},process:function(t,s){return t.generator(t,s)}};var B=1<<16;n.Module.Guitar={name:"Guitar",params:{A:{L:0,H:1,D:1},B:{L:0,H:1,D:1},C:{L:0,H:1,D:1}},stage:O.Generator,setup:function(t,s){t.guitarA=s.A,t.guitarB=s.B,t.guitarC=s.C,t.guitarBuffer=Pe(B),t.guitarHead=0;for(var u=t.guitarBuffer,g=0;g<u.length;g++)u[g]=$()*2-1},process:function(t,s){for(var u=B,g=u-1,v=+t.guitarA,C=+t.guitarB,w=+t.guitarC,F=v+C+w,L=t.guitarHead,H=t.guitarBuffer,N=0;N<s.length;N++){var Q=r/s[N]|0;Q=Q>u?u:Q;var U=L-Q+u&g;H[L]=(H[U-0+u&g]*v+H[U-1+u&g]*C+H[U-2+u&g]*w)/F,s[N]=H[L],L=L+1&g}return t.guitarHead=L,s.length}},n.Module.Filter={name:"Filter",params:{LP:{L:0,H:1,D:1},LPSlide:{L:-1,H:1,D:0},LPResonance:{L:0,H:1,D:0},HP:{L:0,H:1,D:0},HPSlide:{L:-1,H:1,D:0}},stage:O.SampleMod+0,setup:function(t,s){t.FilterEnabled=s.HP>M||s.LP<1-M,t.LPEnabled=s.LP<1-M,t.LP=y(s.LP,3)/10,t.LPSlide=1+s.LPSlide*100/t.SampleRate,t.LPPos=0,t.LPPosSlide=0,t.LPDamping=5/(1+y(s.LPResonance,2)*20)*(.01+s.LP),t.LPDamping=1-Math.min(t.LPDamping,.8),t.HP=y(s.HP,2)/10,t.HPPos=0,t.HPSlide=1+s.HPSlide*100/t.SampleRate},enabled:function(t){return t.FilterEnabled},process:function(t,s){if(!this.enabled(t))return s.length;for(var u=+t.LP,g=+t.LPPos,v=+t.LPPosSlide,C=+t.LPSlide,w=+t.LPDamping,F=+t.LPEnabled,L=+t.HP,H=+t.HPPos,N=+t.HPSlide,Q=0;Q<s.length;Q++){(L>M||L<-M)&&(L*=N,L=L<M?M:L>.1?.1:L);var U=g;u*=C,u=u<0?u=0:u>.1?.1:u;var se=s[Q];F?(v+=(se-g)*u,v*=w):(g=se,v=0),g+=v,H+=g-U,H*=1-L,s[Q]=H}return t.LPPos=g,t.LPPosSlide=v,t.LP=u,t.HP=L,t.HPPos=H,s.length}};var te=1<<10;n.Module.Phaser={name:"Phaser",params:{Offset:{L:-1,H:1,D:0},Sweep:{L:-1,H:1,D:0}},stage:O.SampleMod+1,setup:function(t,s){t.phaserBuffer=Pe(te),t.phaserPos=0,t.phaserOffset=y(s.Offset,2)*(te-4),t.phaserOffsetSlide=y(s.Sweep,3)*4e3/t.SampleRate},enabled:function(t){return b(t.phaserOffsetSlide)>M||b(t.phaserOffset)>M},process:function(t,s){if(!this.enabled(t))return s.length;for(var u=te,g=u-1,v=t.phaserBuffer,C=t.phaserPos|0,w=+t.phaserOffset,F=+t.phaserOffsetSlide,L=0;L<s.length;L++){w+=F,w<0&&(w=-w,F=-F),w>g&&(w=g,F=0),v[C]=s[L];var H=C-(w|0)+u&g;s[L]+=v[H],C=C+1&g|0}return t.phaserPos=C,t.phaserOffset=w,s.length}},n.Module.Volume={name:"Volume",params:{Master:{L:0,H:1,D:.5},Attack:{L:.001,H:1,D:.01},Sustain:{L:0,H:2,D:.3},Punch:{L:0,H:3,D:1},Decay:{L:.001,H:2,D:1}},stage:O.Volume,setup:function(t,s){var u=t.SampleRate,g=s.Master,v=g*(1+s.Punch);t.envelopes=[{S:0,E:g,N:s.Attack*u|0},{S:v,E:g,N:s.Sustain*u|0},{S:g,E:0,N:s.Decay*u|0}];for(var C=0;C<t.envelopes.length;C+=1){var w=t.envelopes[C];w.G=(w.E-w.S)/w.N}},process:function(t,s){for(var u=0;t.envelopes.length>0&&u<s.length;){for(var g=t.envelopes[0],v=g.S,C=g.G,w=Math.min(s.length-u,g.N)|0,F=u+w|0;u<F;u+=1)s[u]*=v,v+=C,v=Te(v,0,10);g.S=v,g.N-=w,g.N<=0&&t.envelopes.shift()}return u}},n.DefaultModules=[n.Module.Frequency,n.Module.Vibrato,n.Module.Generator,n.Module.Filter,n.Module.Phaser,n.Module.Volume],n.DefaultModules.sort(I),n.EmptyParams=q;function q(){return Ce(n.Module,function(){return{}})}n._RemoveEmptyParams=W;function W(t){for(var s in t)Ie(t[s]).length==0&&delete t[s]}n.Preset={Reset:function(){return q()},Coin:function(){var t=q();return t.Frequency.Start=d(880,660),t.Volume.Sustain=d(.1),t.Volume.Decay=d(.4,.1),t.Volume.Punch=d(.3,.3),d()<.5&&(t.Frequency.ChangeSpeed=d(.15,.1),t.Frequency.ChangeAmount=d(8,4)),W(t),t},Laser:function(){var t=q();return t.Generator.Func=Me(["square","saw","sine"]),d()<.33?(t.Frequency.Start=d(880,440),t.Frequency.Min=d(.1),t.Frequency.Slide=d(.3,-.8)):(t.Frequency.Start=d(1200,440),t.Frequency.Min=t.Frequency.Start-d(880,440),t.Frequency.Min<110&&(t.Frequency.Min=110),t.Frequency.Slide=d(.3,-1)),d()<.5?(t.Generator.A=d(.5),t.Generator.ASlide=d(.2)):(t.Generator.A=d(.5,.4),t.Generator.ASlide=d(.7)),t.Volume.Sustain=d(.2,.1),t.Volume.Decay=d(.4),d()<.5&&(t.Volume.Punch=d(.3)),d()<.33&&(t.Phaser.Offset=d(.2),t.Phaser.Sweep=d(.2)),d()<.5&&(t.Filter.HP=d(.3)),W(t),t},Explosion:function(){var t=q();return t.Generator.Func="noise",d()<.5?(t.Frequency.Start=d(440,40),t.Frequency.Slide=d(.4,-.1)):(t.Frequency.Start=d(1600,220),t.Frequency.Slide=d(-.2,-.2)),d()<.2&&(t.Frequency.Slide=0),d()<.3&&(t.Frequency.RepeatSpeed=d(.5,.3)),t.Volume.Sustain=d(.3,.1),t.Volume.Decay=d(.5),t.Volume.Punch=d(.6,.2),d()<.5&&(t.Phaser.Offset=d(.9,-.3),t.Phaser.Sweep=d(-.3)),d()<.33&&(t.Frequency.ChangeSpeed=d(.3,.6),t.Frequency.ChangeAmount=d(24,-12)),W(t),t},Powerup:function(){var t=q();return d()<.5?t.Generator.Func="saw":t.Generator.A=d(.6),t.Frequency.Start=d(220,440),d()<.5?(t.Frequency.Slide=d(.5,.2),t.Frequency.RepeatSpeed=d(.4,.4)):(t.Frequency.Slide=d(.2,.05),d()<.5&&(t.Vibrato.Depth=d(.6,.1),t.Vibrato.Frequency=d(30,10))),t.Volume.Sustain=d(.4),t.Volume.Decay=d(.4,.1),W(t),t},Hit:function(){var t=q();return t.Generator.Func=Me(["square","saw","noise"]),t.Generator.A=d(.6),t.Generator.ASlide=d(1,-.5),t.Frequency.Start=d(880,220),t.Frequency.Slide=-d(.4,.3),t.Volume.Sustain=d(.1),t.Volume.Decay=d(.2,.1),d()<.5&&(t.Filter.HP=d(.3)),W(t),t},Jump:function(){var t=q();return t.Generator.Func="square",t.Generator.A=d(.6),t.Frequency.Start=d(330,330),t.Frequency.Slide=d(.4,.2),t.Volume.Sustain=d(.3,.1),t.Volume.Decay=d(.2,.1),d()<.5&&(t.Filter.HP=d(.3)),d()<.3&&(t.Filter.LP=d(-.6,1)),W(t),t},Select:function(){var t=q();return t.Generator.Func=Me(["square","saw"]),t.Generator.A=d(.6),t.Frequency.Start=d(660,220),t.Volume.Sustain=d(.1,.1),t.Volume.Decay=d(.2),t.Filter.HP=.2,W(t),t},Lucky:function(){var t=q();return Ce(t,function(s,u){var g=n.Module[u].params;Ce(g,function(v,C){if(v.C){var w=Ie(v.C);s[C]=w[w.length*$()|0]}else s[C]=$()*(v.H-v.L)+v.L})}),t.Volume.Master=.4,t.Filter={},W(t),t},Synth:function(){var t=q();return t.Generator.Func=Me(["square","saw"]),t.Frequency.Start=Me([340,240,170]),t.Volume.Attack=d()>.6?d(.5):0,t.Volume.Sustain=d(1),t.Volume.Punch=d(1),t.Volume.Decay=d(.9)+.1,t.Generator.A=d(1),d()<.25&&(t.Filter.HP=d(1)),d()<.25&&(t.Filter.LP=d(1)),W(t),t},Tone:function(){var t=q();return t.Generator.Func="square",t.Frequency.Start=261.6,t.Volume.Sustain=.6441,W(t),t},Click:function(){var t=d()>.5?n.Preset.Hit():n.Preset.Explosion();return d()<.5&&(t.Frequency.Slide=-.5+d(1)),d()<.5&&(t.Volume.Sustain*=d(.4)+.2,t.Volume.Decay*=d(.4)+.2),t.Frequency.Start=d(1200,440),W(t),t}},n.G.unoise=ne("sample = Math.random();"),n.G.sine=ne("sample = Math.sin(phase);"),n.G.saw=ne("sample = 2*(phase/TAU - ((phase/TAU + 0.5)|0));"),n.G.triangle=ne("sample = Math.abs(4 * ((phase/TAU - 0.25)%1) - 2) - 1;"),n.G.square=ne("var s = Math.sin(phase); sample = s > A ? 1.0 : s < A ? -1.0 : A;"),n.G.synth=ne("sample = Math.sin(phase) + .5*Math.sin(phase/2) + .3*Math.sin(phase/4);"),n.G.noise=ne("if(phase % TAU < 4){__noiseLast = Math.random() * 2 - 1;} sample = __noiseLast;"),n.G.string={create:function(){for(var t=65536,s=t-1,u=Pe(t),g=0;g<u.length;g++)u[g]=$()*2-1;var v=0;return function(C,w){for(var F=Math.PI*2,L=+C.generatorA,H=+C.generatorASlide,N=+C.generatorB,Q=+C.generatorBSlide,U=u,se=0;se<w.length;se++){var _e=w[se],We=F/_e|0;L+=H,N+=Q,L=L<0?0:L>1?1:L,N=N<0?0:N>1?1:N;var ye=v-We+t&s,wt=(U[ye-0+t&s]*1+U[ye-1+t&s]*L+U[ye-2+t&s]*N)/(1+L+N);U[v]=wt,w[se]=U[v],v=v+1&s}return C.generatorA=L,C.generatorB=N,w.length}}};function ne(t){return new Function("$","block",`var TAU = Math.PI * 2;
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
`+t+`	block[i] = sample;
}

$.generatorPhase = phase;
$.generatorA = A;
$.generatorB = B;
return block.length;
`)}n.CreateAudio=ke;function ke(t){typeof Float32Array!="undefined"&&ie(t instanceof Float32Array,"data must be an Float32Array");var s=p*c>>3,u=n.SampleRate*s,g=jt(8+36+t.length*2),v=0;function C(F){for(var L=0;L<F.length;L+=1)g[v]=F.charCodeAt(L),v++}function w(F,L){L<=0||(g[v]=F&255,v++,w(F>>8,L-1))}return C("RIFF"),w(36+t.length*2,4),C("WAVEfmt "),w(16,4),w(1,2),w(p,2),w(n.SampleRate,4),w(u,4),w(s,2),w(c,2),C("data"),w(t.length*2,4),me(g.subarray(v),t),new Audio("data:audio/wav;base64,"+be(g))}n.DownloadAsFile=function(t){ie(t instanceof Audio,"input must be an Audio object"),document.location.href=t.src},n.Util={},n.Util.CopyFToU8=me;function me(t,s){ie(t.length/2==s.length,"the target buffer must be twice as large as the iinput");for(var u=0,g=0;g<s.length;g++){var v=+s[g],C=v*32767|0;C=C<-32768?-32768:32767<C?32767:C,C+=C<0?65536:0,t[u]=C&255,u++,t[u]=C>>8,u++}}function be(t){for(var s=32768,u="",g=0;g<t.length;g+=s){var v=Math.min(g+s,t.length);u+=String.fromCharCode.apply(null,t.subarray(g,v))}return btoa(u)}function vt(){return typeof D!="undefined"?new D().sampleRate:44100}function ie(t,s){if(!t)throw new Error(s)}function Te(t,s,u){return t=+t,s=+s,u=+u,t<s?+s:t>u?+u:+t}function Jt(t){return t=+t,t<0?0:t>1?1:+t}function Ce(t,s){var u={};for(var g in t)t.hasOwnProperty(g)&&(u[g]=s(t[g],g));return u}function d(t,s){var u=$();return t!==void 0&&(u*=t),s!==void 0&&(u+=s),u}function Me(t){return t[t.length*$()|0]}function Ie(t){var s=[];for(var u in t)s.push(u);return s}n._createFloatArray=Pe;function Pe(t){if(typeof Float32Array=="undefined")for(var s=new Array(t),u=0;u<s.length;u++)s[u]=0;return new Float32Array(t)}function jt(t){if(typeof Uint8Array=="undefined")for(var s=new Array(t),u=0;u<s.length;u++)s[u]=0;return new Uint8Array(t)}var Ke=Math.random;n.setRandomFunc=function(t){Ke=t};function $(){return Ke()}})(yt={});let ce,wi,Ut,xn,xi,bi=!1;function Gr(n=void 0){ce=n==null?new(window.AudioContext||window.webkitAudioContext):n,Fi(),Li(),Ri()}function Or(){bi||(bi=!0,Di())}function Fi(n=120){wi=n,Ut=60/wi}function Li(n=8){xn=n>0?4/n:void 0}function Ri(n=.1){xi=n}function Gn(n){if(xn==null)return n;const r=Ut*xn;return r>0?Math.ceil(n/r)*r:n}function Di(){const n=ce.createBufferSource();n.start=n.start||n.noteOn,n.start()}function Ar(){ce.resume()}class Gi{constructor(r=null){pt(this,"x");pt(this,"y");pt(this,"z");pt(this,"w");this.setSeed(r)}get(r=1,c){return c==null&&(c=r,r=0),this.next()/4294967295*(c-r)+r}getInt(r,c){c==null&&(c=r,r=0);const p=Math.floor(r),h=Math.floor(c);return h===p?p:this.next()%(h-p)+p}getPlusOrMinus(){return this.getInt(2)*2-1}select(r){return r[this.getInt(r.length)]}setSeed(r,c=123456789,p=362436069,h=521288629,y=32){this.w=r!=null?r>>>0:Math.floor(Math.random()*4294967295)>>>0,this.x=c>>>0,this.y=p>>>0,this.z=h>>>0;for(let b=0;b<y;b++)this.next();return this}getState(){return{x:this.x,y:this.y,z:this.z,w:this.w}}next(){const r=this.x^this.x<<11;return this.x=this.y,this.y=this.z,this.z=this.w,this.w=(this.w^this.w>>>19^(r^r>>>8))>>>0,this.w}}function je(n,r){let c=[];for(let p=0;p<n;p++)c.push(r(p));return c}function Oi(n){return 440*Math.pow(2,(n-69)/12)}function On(n){let r=0;const c=n.length;for(let p=0;p<c;p++){const h=n.charCodeAt(p);r=(r<<5)-r+h,r|=0}return r}const Vt=["coin","laser","explosion","powerUp","hit","jump","select","random","synth","tone","click"],Er={coin:"Coin",laser:"Laser",explosion:"Explosion",powerUp:"Powerup",hit:"Hit",jump:"Jump",select:"Select",random:"Lucky",synth:"Synth",tone:"Tone",click:"Click"},St=new Gi;let An,Ai;function Br(){Ai=yt.Live(),An=[],yt.setRandomFunc(()=>St.get())}function zr(n){Nr(n)}function kr(){const n=ce.currentTime;An.forEach(r=>{Ur(r,n)})}function qt(n=void 0,r=void 0,c=2,p=.5,h=void 0,y=1,b=1){r!=null&&St.setSeed(r);const M=yt.Preset[Er[n!=null?n:Vt[St.getInt(8)]]],D=je(c,()=>{const O=M();return h!=null&&O.Frequency.Start!=null&&(O.Frequency.Start=h),O.Volume.Attack!=null&&(O.Volume.Attack*=y),O.Volume.Sustain!=null&&(O.Volume.Sustain*=b),O});return Tr(n,D,p)}function Tr(n,r,c){const p=r.map(y=>{const b=Ai._generate(y),M=ce.createBuffer(1,b.length,yt.SampleRate);var D=M.getChannelData(0);return D.set(b),M}),h=ce.createGain();return h.gain.value=c*xi,h.connect(ce.destination),{type:n,params:r,volume:c,buffers:p,bufferSourceNodes:void 0,gainNode:h,isPlaying:!1,playedTime:void 0}}function Ir(n,r,c,p,h){const y=new Gi;y.setSeed(c);let b;if(r){let M=y.select(["hit","hit","click","click","explosion"]);p!=null&&(M=p),b=qt(M,y.getInt(999999999),M==="explosion"?1:2,h!=null?h:M==="explosion"?.4:.5,y.get(100,200),M==="explosion"?.5:1,M==="explosion"?.2:1)}else{const M=qr(n);let D=y.get()<1/M?"select":y.select(["tone","tone","synth"]);p!=null&&(D=p),b=qt(D,y.getInt(999999999),D!=="select"?1:2,h!=null?h:D==="tone"?.3:D==="synth"?.4:.25,261.6,D!=="select"?.1:1,D!=="select"?2:1)}return b.isDrum=r,b.seed=c,b}function qr(n){if(n==null||n.notes.length===0)return 1;let r=0,c=0;return n.notes.forEach(p=>{const h=p.quantizedEndStep-p.quantizedStartStep;h>0&&(r+=h,c++)}),r/c}function Hr(n){An.push(n)}function Nr(n){n.isPlaying=!0}function Ur(n,r){if(!n.isPlaying)return;n.isPlaying=!1;const c=Gn(r);(n.playedTime==null||c>n.playedTime)&&(Fn(n,c),n.playedTime=c)}function Fn(n,r,c=void 0){n.bufferSourceNodes=[],n.buffers.forEach(p=>{const h=ce.createBufferSource();if(h.buffer=p,c!=null&&h.playbackRate!=null){const y=Math.pow(2,.08333333333333333);h.playbackRate.value=Math.pow(y,c)}h.start=h.start||h.noteOn,h.connect(n.gainNode),h.start(r),n.bufferSourceNodes.push(h)})}function Ln(n,r=void 0){n.bufferSourceNodes!=null&&(n.bufferSourceNodes.forEach(c=>{r==null?c.stop():c.stop(r)}),n.bufferSourceNodes=void 0)}const Vr=100;function Jr(n){let r=`${n}`,c;Vt.forEach(I=>{const k=`@${I}`,P=r.indexOf(k);P>=0&&(c=I,r=`${r.slice(0,P)}${r.slice(P+k.length)}`)});const p="@d",h=r.indexOf(p);let y=!1;h>=0&&(y=!0,r=`${r.slice(0,h)}${r.slice(h+p.length)}`);const b=r.match(/@s\d+/);let M=1;b!=null&&(M=Number.parseInt(b[0].substring(2)),r=r.replace(/@s\d+/,""));const D=r.match(/v\d+/);let O=.5;return D!=null&&(O=Number.parseInt(D[0].substring(1))/Vr,r=r.replace(/v\d+/,"")),{mml:r,args:{isDrum:y,seed:M,type:c,volume:O}}}function Ei(n,r,c,p){return{mml:n,sequence:r,soundEffect:c,noteIndex:0,endStep:-1,visualizer:p}}function jr(n,r,c){const p=r.sequence.notes[r.noteIndex];p!=null&&((r.soundEffect.type==="synth"||r.soundEffect.type==="tone")&&r.endStep===n.notesStepsIndex&&Ln(r.soundEffect,c),p.quantizedStartStep===n.notesStepsIndex&&((r.soundEffect.type==="synth"||r.soundEffect.type==="tone")&&Ln(r.soundEffect),r.soundEffect.isDrum?Fn(r.soundEffect,c):Fn(r.soundEffect,c,p.pitch-69),r.visualizer!=null&&r.visualizer.redraw(p),r.endStep=p.quantizedEndStep,r.endStep>=n.notesStepsCount&&(r.endStep-=n.notesStepsCount),r.noteIndex++,r.noteIndex>=r.sequence.notes.length&&(r.noteIndex=0)))}let Je=[];function Kr(){Ti(),Je=[]}function Bi(n,r,c=1){n.forEach(h=>{h.noteIndex=0});const p={parts:n,notesStepsCount:r,notesStepsIndex:void 0,noteInterval:void 0,nextNotesTime:void 0,speedRatio:c,isPlaying:!1,isLooping:!1};return zi(p),p}function zi(n){const r=Ut/4/n.speedRatio;n.notesStepsIndex=0,n.noteInterval=r,n.nextNotesTime=Gn(ce.currentTime)-r}function En(n){Je.push(n)}function ki(n){Je=Je.filter(r=>r!==n)}function _r(){Je.forEach(n=>{Wr(n)})}function Bn(n,r=!1){n.isLooping=r,zi(n),n.isPlaying=!0}function zn(n){n.isPlaying=!1,n.parts.forEach(r=>{Ln(r.soundEffect)})}function Ti(){Je.forEach(n=>{zn(n)})}function Wr(n){if(!n.isPlaying)return;const r=ce.currentTime;r<n.nextNotesTime||(n.nextNotesTime+=n.noteInterval,n.nextNotesTime<r-Ut&&(n.nextNotesTime=Gn(r)),n.parts.forEach(c=>{jr(n,c,n.nextNotesTime)}),n.notesStepsIndex++,n.notesStepsIndex>=n.notesStepsCount&&(n.isLooping?n.notesStepsIndex=0:n.isPlaying=!1))}const Ii={c:"coin",l:"laser",e:"explosion",p:"powerUp",h:"hit",j:"jump",s:"select",u:"random",r:"random"},G=St;let kn=1;function Qr(n){kn=n}function Yr(n,r,c,p,h,y,b){G.setSeed(kn+On(n)),Ui(),mt=null;let M=G.select(y);const D=je(h,()=>{const O=Math.floor(Math.abs(G.get()+G.get()-1)*3),I=Math.floor((G.get()+G.get()-1)*10),k=Math.abs(G.get()+G.get()-1),P=G.get()<.25;P||(M=G.select(y));const B=G.get()<.5,te=G.get()<.5,q=G.get()<.9;return Hi(c,M,r,.7,O,I,k,P,B,te,q,void 0,b)});return qi(D,.5/p)}function Zr(n="0",r=!1,c=69-12,p=16,h=.25,y=4,b=1){G.setSeed(kn+On(n)),Ui(),mt=null;let M=Ii[n[0]];M==null&&(M=Vt[G.getInt(8)]);let D=.8;r&&(h/=4,D/=2);const O=je(y,()=>{const I=Math.floor(Math.abs(G.get()+G.get()-1)*3),k=Math.floor((G.get()+G.get()-1)*10),P=r?2:Math.abs(G.get()+G.get()-1),B=G.get()<.25,te=r?!1:G.get()<.5,q=G.get()<.5,W=r?G.get()<.25:G.get()<.9,ne=G.get(.5);return Hi(p,M,c,D,I,k,P,B,te,q,W,ne,b)});return qi(O,.5/h)}function qi(n,r){const c=n.map(p=>{const h=[];return p.notes.forEach((y,b)=>{y!=null&&h.push({pitch:y+69,quantizedStartStep:b*2})}),Ei(void 0,{notes:h},p.soundEffect)});return Bi(c,n[0].notes.length*2,r)}let mt;function Hi(n=32,r,c=60,p=1,h=0,y=0,b=1,M=!1,D=!1,O=!1,I=!1,k=null,P=.1){const B=is(r,Oi(c),p,P);if(mt!=null&&M)B.noteRatios=mt.noteRatios;else{const te=k!=null?es(n,k):Xr(n);B.noteRatios=ts(te,D?0:-1,1,b,I)}return B.notes=ns(B.noteRatios,h,y,O),mt=B,B}function Xr(n){let r=je(n,()=>!1),c=4;for(;c<=n;)r=$r(r,c),c*=2;return r}function $r(n,r){let c=je(r,()=>!1);const p=Math.floor(Math.abs(G.get()+G.get()-1)*4);for(let h=0;h<p;h++)c[G.getInt(r-1)]=!0;return n.map((h,y)=>c[y%r]?!h:h)}function es(n,r){return je(n,()=>G.get()>=r)}const Ni=[[0,4,7],[0,3,7],[0,4,7,10],[0,4,7,11],[0,3,7,10]],Mn=[[[0,0],[7,0],[9,1],[4,1]],[[5,0],[0,0],[5,0],[7,0]],[[5,3],[7,2],[4,4],[9,1]],[[9,1],[2,1],[7,0],[0,0]],[[9,1],[5,0],[7,0],[0,0]]];let Ve;function Ui(){Ve=G.select(Mn).map((r,c)=>[G.get()<.7?r[0]:Mn[G.getInt(Mn.length)][c][0],G.get()<.7?r[1]:G.getInt(Ni.length)])}function ts(n,r,c,p,h){let y=G.get(),b=G.get(-.5,.5),D=n.length/Ve.length,O=[];return n.forEach((I,k)=>{let P=Math.floor(k/D),B=k%D;if(h&&P===Math.floor(Ve.length/2)){O.push(O[B]),O[B]!=null&&(y=O[B]);return}if(!I){O.push(null);return}O.push(y),b+=G.get(-.25,.25),y+=b*p,(G.get()<.2||y<=r||y>=c)&&(y-=b*2,b*=-1)}),O}function ns(n,r,c,p){let y=n.length/Ve.length;return n.map((b,M)=>{if(b==null)return null;let D=Math.floor(M/y),O=Ve[D][0],I=Ni[Ve[D][1]],k=b;p&&(k=Math.floor(k*2)/2);let P=Math.floor(k),B=Math.floor((k-P)*I.length);for(B+=r+G.getInt(-c,c+1);B>=I.length;)B-=I.length,P++;for(;B<0;)B+=I.length,P--;return O+P*12+I[B]})}function is(n,r,c,p){return{noteRatios:void 0,notes:void 0,soundEffect:qt(n,void 0,1,p,r,c,c)}}const Ci=St;let Ht,Tt,Be;function Vi(n="0",r=2,c,p=1){Ki(Ii[n[0]],{seed:Ht+On(n),numberOfSounds:r,pitch:c,volume:p})}function Rn(n="0",r=69-24,c=32,p=.25,h=4,y=["laser","select","hit","hit"],b=1){Be=Yr(n,r,c,p,h,y,b),En(Be),Bn(Be,!0)}function Ji(){Be!=null&&(zn(Be),ki(Be),Be=void 0)}function ls(n="0",r=!1,c=69-12,p=16,h=.25,y=4,b=1){const M=`${n}_${r}_${c}_${p}_${h}_${y}_${b}`;if(Tt[M]==null){const D=Zr(n,r,c,p,h,y,b);En(D),Tt[M]=D}Bn(Tt[M])}function rs(){Ti()}const Dn=.125;let It,ze;function ss(n,r){const c=Cn({volume:1,speed:1,isLooping:!0},r);let p=0;const h=n.map(b=>Jr(b));h.forEach(b=>{const M=cs(b.mml);M>p&&(p=M)});const y=h.map(b=>{const{mml:M,args:D}=b,O=us(M,p),I=Ir(O,D.isDrum,D.seed,D.type,D.volume*c.volume);return Ei(M,O,I)});ze=Bi(y,p,c.speed),En(ze),Bn(ze,c.isLooping)}function ji(){ze!=null&&(zn(ze),ki(ze),ze=void 0)}function Ki(n=void 0,r){const c=Cn({seed:void 0,numberOfSounds:2,volume:1,pitch:void 0},r),p=`${n}_${JSON.stringify(c)}`;if(It[p]==null){n==null&&(Ci.setSeed(c.seed),n=Vt[Ci.getInt(8)]);const h=qt(n,c.seed==null?Ht:c.seed,c.numberOfSounds,c.volume,c.pitch==null?void 0:Oi(c.pitch));Hr(h),It[p]=h}zr(It[p])}function os(){_r(),kr()}function as(n=1,r=void 0){Nt(n),Gr(r),_i()}function _i(){Kr(),Tt={},Br(),It={},ji()}function Nt(n=1){Ht=n,Qr(Ht)}function cs(n){const r=new Pi(n);for(let c of r)if(c.type==="end")return Math.floor(c.time/Dn)}function us(n,r){const c=[],p=new Pi(n);for(let h of p)if(h.type==="note"){let y=Math.floor((h.time+h.duration)/Dn);y>=r&&(y-=r),c.push({pitch:h.noteNumber,quantizedStartStep:Math.floor(h.time/Dn),quantizedEndStep:y})}return{notes:c}}var fs=Object.freeze(Object.defineProperty({__proto__:null,setTempo:Fi,setQuantize:Li,setVolume:Ri,playEmpty:Di,resumeAudioContext:Ar,startAudio:Or,play:Vi,playBgm:Rn,stopBgm:Ji,playJingle:ls,stopJingles:rs,playMml:ss,stopMml:ji,playSoundEffect:Ki,update:os,init:as,reset:_i,setSeed:Nt},Symbol.toStringTag,{value:"Module"}));(function(n,r){function c(i,e=0,l=1){return Math.max(e,Math.min(i,l))}function p(i,e,l){const o=l-e,a=i-e;if(a>=0)return a%o+e;{let f=o+a%o+e;return f>=l&&(f-=o),f}}function h(i,e,l){return e<=i&&i<l}function y(i){return[...Array(i).keys()]}function b(i,e){return y(i).map(l=>e(l))}function M(i,e){let l=[];for(let o=0,a=0;o<i.length;a++)e(i[o],a)?(l.push(i[o]),i.splice(o,1)):o++;return l}function D(i){return[...i].reduce((e,[l,o])=>(e[l]=o,e),{})}function O(i){return Object.keys(i).map(e=>[e,i[e]])}function I(i,e){return String.fromCharCode(i.charCodeAt(0)+e)}function k(i){return i.x!=null&&i.y!=null}class P{constructor(e,l){this.x=0,this.y=0,this.set(e,l)}set(e=0,l=0){return k(e)?(this.x=e.x,this.y=e.y,this):(this.x=e,this.y=l,this)}add(e,l){return k(e)?(this.x+=e.x,this.y+=e.y,this):(this.x+=e,this.y+=l,this)}sub(e,l){return k(e)?(this.x-=e.x,this.y-=e.y,this):(this.x-=e,this.y-=l,this)}mul(e){return this.x*=e,this.y*=e,this}div(e){return this.x/=e,this.y/=e,this}clamp(e,l,o,a){return this.x=c(this.x,e,l),this.y=c(this.y,o,a),this}wrap(e,l,o,a){return this.x=p(this.x,e,l),this.y=p(this.y,o,a),this}addWithAngle(e,l){return this.x+=Math.cos(e)*l,this.y+=Math.sin(e)*l,this}swapXy(){const e=this.x;return this.x=this.y,this.y=e,this}normalize(){return this.div(this.length),this}rotate(e){if(e===0)return this;const l=this.x;return this.x=l*Math.cos(e)-this.y*Math.sin(e),this.y=l*Math.sin(e)+this.y*Math.cos(e),this}angleTo(e,l){return k(e)?Math.atan2(e.y-this.y,e.x-this.x):Math.atan2(l-this.y,e-this.x)}distanceTo(e,l){let o,a;return k(e)?(o=e.x-this.x,a=e.y-this.y):(o=e-this.x,a=l-this.y),Math.sqrt(o*o+a*a)}isInRect(e,l,o,a){return h(this.x,e,e+o)&&h(this.y,l,l+a)}equals(e){return this.x===e.x&&this.y===e.y}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}get length(){return Math.sqrt(this.x*this.x+this.y*this.y)}get angle(){return Math.atan2(this.y,this.x)}}const B=["transparent","white","red","green","yellow","blue","purple","cyan","black","light_red","light_green","light_yellow","light_blue","light_purple","light_cyan","light_black"],te="twrgybpclRGYBPCL";let q;const W=[15658734,15277667,5025616,16761095,4149685,10233776,240116,6381921];function ne(i){const[e,l,o]=ke(0,i);if(q=D(B.map((a,f)=>{if(f<1)return[a,{r:0,g:0,b:0,a:0}];if(f<9){const[x,A,E]=ke(f-1,i);return[a,{r:x,g:A,b:E,a:1}]}const[m,S,R]=ke(f-9+1,i);return[a,{r:Math.floor(i?m*.5:e-(e-m)*.5),g:Math.floor(i?S*.5:o-(o-S)*.5),b:Math.floor(i?R*.5:l-(l-R)*.5),a:1}]})),i){const a=q.blue;q.white={r:Math.floor(a.r*.15),g:Math.floor(a.g*.15),b:Math.floor(a.b*.15),a:1}}}function ke(i,e){e&&(i===0?i=7:i===7&&(i=0));const l=W[i];return[(l&16711680)>>16,(l&65280)>>8,l&255]}function me(i,e=1){const l=q[i];return Math.floor(l.r*e)<<16|Math.floor(l.g*e)<<8|Math.floor(l.b*e)}function be(i,e=1){const l=q[i],o=Math.floor(l.r*e),a=Math.floor(l.g*e),f=Math.floor(l.b*e);return l.a<1?`rgba(${o},${a},${f},${l.a})`:`rgb(${o},${a},${f})`}const vt=[`
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

`];let ie,Te;function Jt(){ie=[],Te=[]}function Ce(){ie=ie.concat(Te),Te=[]}function d(i){let e={isColliding:{rect:{},text:{},char:{}}};return ie.forEach(l=>{Me(i,l)&&(e=Object.assign(Object.assign(Object.assign({},e),Ie(l.collision.isColliding.rect)),{isColliding:{rect:Object.assign(Object.assign({},e.isColliding.rect),l.collision.isColliding.rect),text:Object.assign(Object.assign({},e.isColliding.text),l.collision.isColliding.text),char:Object.assign(Object.assign({},e.isColliding.char),l.collision.isColliding.char)}}))}),e}function Me(i,e){const l=e.pos.x-i.pos.x,o=e.pos.y-i.pos.y;return-e.size.x<l&&l<i.size.x&&-e.size.y<o&&o<i.size.y}function Ie(i){if(i==null)return{};const e={transparent:"tr",white:"wh",red:"rd",green:"gr",yellow:"yl",blue:"bl",purple:"pr",cyan:"cy",black:"lc"};let l={};return O(i).forEach(([o,a])=>{const f=e[o];a&&f!=null&&(l[f]=!0)}),l}function Pe(i,e,l,o){return Ke(!1,i,e,l,o)}function jt(i,e,l,o){return Ke(!0,i,e,l,o)}function Ke(i,e,l,o,a){if(typeof l=="number"){if(typeof o=="number")return U(e,l,o,Object.assign({isCharacter:i,isCheckingCollision:!0,color:Y},a));throw"invalid params"}else return U(e,l.x,l.y,Object.assign({isCharacter:i,isCheckingCollision:!0,color:Y},o))}const $=6,t=1,s=$*t;let u,g,v,C=!1,w,F;const L={color:"black",backgroundColor:"transparent",rotation:0,mirror:{x:1,y:1},scale:{x:1,y:1},isCharacter:!1,isCheckingCollision:!1};function H(){w=document.createElement("canvas"),w.width=w.height=s,F=w.getContext("2d"),u=vt.map((i,e)=>Object.assign(Object.assign({},We(i)),{hitBox:ye(String.fromCharCode(33+e),!1)})),g=vt.map((i,e)=>Object.assign(Object.assign({},We(i)),{hitBox:ye(String.fromCharCode(33+e),!0)})),v={}}function N(i,e){const l=e.charCodeAt(0)-33;i.forEach((o,a)=>{g[l+a]=Object.assign(Object.assign({},We(o)),{hitBox:ye(String.fromCharCode(33+l+a),!0)})})}function Q(){C=!0}function U(i,e,l,o={}){const a=wt(o);e-=s/2*a.scale.x,l-=s/2*a.scale.y;const f=Math.floor(e);let m=i,S=f,R=Math.floor(l),x={isColliding:{rect:{},text:{},char:{}}};for(let A=0;A<m.length;A++){const E=m[A];if(E===`
`){S=f,R+=s*a.scale.y;continue}const j=se(E,S,R,a);a.isCheckingCollision&&(x={isColliding:{rect:Object.assign(Object.assign({},x.isColliding.rect),j.isColliding.rect),text:Object.assign(Object.assign({},x.isColliding.text),j.isColliding.text),char:Object.assign(Object.assign({},x.isColliding.char),j.isColliding.char)}}),S+=s*a.scale.x}return x}function se(i,e,l,o){const a=i.charCodeAt(0);if(a<32||a>126)return{isColliding:{rect:{},text:{},char:{}}};const f=wt(o);if(f.backgroundColor!=="transparent"&&(_t(),qe(f.backgroundColor),$e(e,l,s*f.scale.x,s*f.scale.y),Wt()),a<=32)return{isColliding:{rect:{},text:{},char:{}}};const m=a-33,S=f.isCharacter?g[m]:u[m],R=p(f.rotation,0,4);if(f.color==="black"&&R===0&&f.mirror.x===1&&f.mirror.y===1)return _e(S,e,l,f.scale,f.isCheckingCollision,!0);const x=JSON.stringify({c:i,options:f}),A=v[x];if(A!=null)return _e(A,e,l,f.scale,f.isCheckingCollision,f.color!=="transparent");F.clearRect(0,0,s,s),R===0&&f.mirror.x===1&&f.mirror.y===1?F.drawImage(S.image,0,0):(F.save(),F.translate(s/2,s/2),F.rotate(Math.PI/2*R),(f.mirror.x===-1||f.mirror.y===-1)&&F.scale(f.mirror.x,f.mirror.y),F.drawImage(S.image,-s/2,-s/2),F.restore()),f.color!=="black"&&(F.globalCompositeOperation="source-in",F.fillStyle=be(f.color==="transparent"?"black":f.color),F.fillRect(0,0,s,s),F.globalCompositeOperation="source-over");const E=ye(i,f.isCharacter);let j;if(C||z.isUsingPixi){const re=document.createElement("img");re.src=w.toDataURL(),z.isUsingPixi&&(j=r.Texture.from(re)),C&&(v[x]={image:re,texture:j,hitBox:E})}return _e({image:w,texture:j,hitBox:E},e,l,f.scale,f.isCheckingCollision,f.color!=="transparent")}function _e(i,e,l,o,a,f){if(f&&(o.x===1&&o.y===1?Hn(i,e,l):Hn(i,e,l,s*o.x,s*o.y)),!a)return;const m={pos:{x:e+i.hitBox.pos.x,y:l+i.hitBox.pos.y},size:{x:i.hitBox.size.x*o.x,y:i.hitBox.size.y*o.y},collision:i.hitBox.collision},S=d(m);return f&&ie.push(m),S}function We(i,e=!0){F.clearRect(0,0,s,s);let l=i.split(`
`);e&&(l=l.slice(1,l.length-1));let o=0;l.forEach(R=>{o=Math.max(R.length,o)});const a=Math.max(Math.ceil(($-o)/2),0),f=l.length,m=Math.max(Math.ceil(($-f)/2),0);l.forEach((R,x)=>{if(!(x+m>=$))for(let A=0;A<$-a;A++){const E=R.charAt(A);let j=te.indexOf(E);E!==""&&j>=1&&(F.fillStyle=be(B[j]),F.fillRect((A+a)*t,(x+m)*t,t,t))}});const S=document.createElement("img");return S.src=w.toDataURL(),z.isUsingPixi?{image:S,texture:r.Texture.from(S)}:{image:S}}function ye(i,e){const l={pos:new P(s,s),size:new P,collision:{isColliding:{char:{},text:{}}}};e?l.collision.isColliding.char[i]=!0:l.collision.isColliding.text[i]=!0;const o=F.getImageData(0,0,s,s).data;let a=0;for(let f=0;f<s;f++)for(let m=0;m<s;m++)o[a+3]>0&&(m<l.pos.x&&(l.pos.x=m),f<l.pos.y&&(l.pos.y=f)),a+=4;a=0;for(let f=0;f<s;f++)for(let m=0;m<s;m++)o[a+3]>0&&(m>l.pos.x+l.size.x-1&&(l.size.x=m-l.pos.x+1),f>l.pos.y+l.size.y-1&&(l.size.y=f-l.pos.y+1)),a+=4;return l}function wt(i){let e=Object.assign(Object.assign({},L),i);return i.scale!=null&&(e.scale=Object.assign(Object.assign({},L.scale),i.scale)),i.mirror!=null&&(e.mirror=Object.assign(Object.assign({},L.mirror),i.mirror)),e}const Wi=`
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
`;function Qi(i,e){return new r.Filter(void 0,Wi,{width:i,height:e})}const xe=new P;let K,J=new P,ue,T;const Tn=5;document.createElement("img");let V,Qe,Ye=1,Kt="black",Y,In,Fe=!1,z,qn;function Yi(i,e,l,o,a,f,m){xe.set(i),z=m,Kt=l;const S=`
-webkit-touch-callout: none;
-webkit-tap-highlight-color: ${e};
-webkit-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
background: ${e};
color: #888;
`,R=`
position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
`,x=`
image-rendering: -moz-crisp-edges;
image-rendering: -webkit-optimize-contrast;
image-rendering: -o-crisp-edges;
image-rendering: pixelated;
`;if(document.body.style.cssText=S,J.set(xe),z.isUsingPixi){J.mul(Tn);const E=new r.Application({width:J.x,height:J.y});if(K=E.view,T=new r.Graphics,T.scale.x=T.scale.y=Tn,r.settings.SCALE_MODE=r.SCALE_MODES.NEAREST,E.stage.addChild(T),T.filters=[],z.name==="crt"&&T.filters.push(qn=new r.filters.CRTFilter({vignettingAlpha:.7})),z.name==="pixel"&&T.filters.push(Qi(J.x,J.y)),z.name==="pixel"||z.name==="shapeDark"){const j=new r.filters.AdvancedBloomFilter({threshold:.1,bloomScale:z.name==="pixel"?1.5:1,brightness:z.name==="pixel"?1.5:1,blur:8});T.filters.push(j)}T.lineStyle(0),K.style.cssText=R}else K=document.createElement("canvas"),K.width=J.x,K.height=J.y,ue=K.getContext("2d"),ue.imageSmoothingEnabled=!1,K.style.cssText=R+x;document.body.appendChild(K);const A=()=>{const j=innerWidth/innerHeight,re=J.x/J.y,ht=j<re,we=ht?.95*innerWidth:.95*innerHeight*re,zt=ht?.95*innerWidth/re:.95*innerHeight;K.style.width=`${we}px`,K.style.height=`${zt}px`};if(window.addEventListener("resize",A),A(),o){V=document.createElement("canvas");let E;a?(V.width=J.x,V.height=J.y,E=f):(J.x<=J.y*2?(V.width=J.y*2,V.height=J.y):(V.width=J.x,V.height=J.x/2),V.width>400&&(Ye=400/V.width,V.width=400,V.height*=Ye),E=Math.round(400/V.width)),Qe=V.getContext("2d"),Qe.fillStyle=e,gcc.setOptions({scale:E,capturingFps:60,isSmoothingEnabled:!1})}}function bt(){if(z.isUsingPixi){T.clear(),Fe=!1,Ze(me(Kt,z.isDarkColor?.15:1)),T.drawRect(0,0,xe.x,xe.y),Xe(),Fe=!1;return}ue.fillStyle=be(Kt,z.isDarkColor?.15:1),ue.fillRect(0,0,xe.x,xe.y),ue.fillStyle=be(Y)}function qe(i){if(i===Y){z.isUsingPixi&&!Fe&&Ze(me(Y));return}if(Y=i,z.isUsingPixi){Fe&&T.endFill(),Ze(me(Y));return}ue.fillStyle=be(i)}function Ze(i){Xe(),T.beginFill(i),Fe=!0}function Xe(){Fe&&(T.endFill(),Fe=!1)}function _t(){In=Y}function Wt(){qe(In)}function $e(i,e,l,o){if(z.isUsingPixi){z.name==="shape"||z.name==="shapeDark"?T.drawRoundedRect(i,e,l,o,2):T.drawRect(i,e,l,o);return}ue.fillRect(i,e,l,o)}function Zi(i,e,l,o,a){const f=me(Y);Ze(f),T.drawCircle(i,e,a*.5),T.drawCircle(l,o,a*.5),Xe(),T.lineStyle(a,f),T.moveTo(i,e),T.lineTo(l,o),T.lineStyle(0)}function Hn(i,e,l,o,a){if(z.isUsingPixi){Xe(),T.beginTextureFill({texture:i.texture,matrix:new r.Matrix().translate(e,l)}),T.drawRect(e,l,o==null?s:o,a==null?s:a),Ze(me(Y));return}o==null?ue.drawImage(i.image,e,l):ue.drawImage(i.image,e,l,o,a)}function Xi(){qn.time+=.2}function $i(){if(Qe.fillRect(0,0,V.width,V.height),Ye===1)Qe.drawImage(K,(V.width-K.width)/2,(V.height-K.height)/2);else{const i=K.width*Ye,e=K.height*Ye;Qe.drawImage(K,(V.width-i)/2,(V.height-e)/2,i,e)}gcc.capture(V)}let He=!1,Ct=!1,Qt=!1;const Nn=["Escape","Digit0","Digit1","Digit2","Digit3","Digit4","Digit5","Digit6","Digit7","Digit8","Digit9","Minus","Equal","Backspace","Tab","KeyQ","KeyW","KeyE","KeyR","KeyT","KeyY","KeyU","KeyI","KeyO","KeyP","BracketLeft","BracketRight","Enter","ControlLeft","KeyA","KeyS","KeyD","KeyF","KeyG","KeyH","KeyJ","KeyK","KeyL","Semicolon","Quote","Backquote","ShiftLeft","Backslash","KeyZ","KeyX","KeyC","KeyV","KeyB","KeyN","KeyM","Comma","Period","Slash","ShiftRight","NumpadMultiply","AltLeft","Space","CapsLock","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","Pause","ScrollLock","Numpad7","Numpad8","Numpad9","NumpadSubtract","Numpad4","Numpad5","Numpad6","NumpadAdd","Numpad1","Numpad2","Numpad3","Numpad0","NumpadDecimal","IntlBackslash","F11","F12","F13","F14","F15","F16","F17","F18","F19","F20","F21","F22","F23","F24","IntlYen","Undo","Paste","MediaTrackPrevious","Cut","Copy","MediaTrackNext","NumpadEnter","ControlRight","LaunchMail","AudioVolumeMute","MediaPlayPause","MediaStop","Eject","AudioVolumeDown","AudioVolumeUp","BrowserHome","NumpadDivide","PrintScreen","AltRight","Help","NumLock","Pause","Home","ArrowUp","PageUp","ArrowLeft","ArrowRight","End","ArrowDown","PageDown","Insert","Delete","OSLeft","OSRight","ContextMenu","BrowserSearch","BrowserFavorites","BrowserRefresh","BrowserStop","BrowserForward","BrowserBack"];let Yt;const el={onKeyDown:void 0};let Zt,Xt=!1,$t=!1,en=!1,tn={},nn={},ln={};function Un(i){Zt=Object.assign(Object.assign({},el),i),Yt=D(Nn.map(e=>[e,{isPressed:!1,isJustPressed:!1,isJustReleased:!1}])),document.addEventListener("keydown",e=>{Xt=$t=!0,tn[e.code]=nn[e.code]=!0,Zt.onKeyDown!=null&&Zt.onKeyDown(),(e.code==="AltLeft"||e.code==="AltRight"||e.code==="ArrowRight"||e.code==="ArrowDown"||e.code==="ArrowLeft"||e.code==="ArrowUp")&&e.preventDefault()}),document.addEventListener("keyup",e=>{Xt=!1,en=!0,tn[e.code]=!1,ln[e.code]=!0})}function Vn(){Ct=!He&&$t,Qt=He&&en,$t=en=!1,He=Xt,O(Yt).forEach(([i,e])=>{e.isJustPressed=!e.isPressed&&nn[i],e.isJustReleased=e.isPressed&&ln[i],e.isPressed=!!tn[i]}),nn={},ln={}}function Jn(){Ct=!1,He=!0}var tl=Object.freeze({__proto__:null,get isPressed(){return He},get isJustPressed(){return Ct},get isJustReleased(){return Qt},codes:Nn,get code(){return Yt},init:Un,update:Vn,clearJustPressed:Jn});class Mt{constructor(e=null){this.setSeed(e)}get(e=1,l){return l==null&&(l=e,e=0),this.next()/4294967295*(l-e)+e}getInt(e,l){l==null&&(l=e,e=0);const o=Math.floor(e),a=Math.floor(l);return a===o?o:this.next()%(a-o)+o}getPlusOrMinus(){return this.getInt(2)*2-1}select(e){return e[this.getInt(e.length)]}setSeed(e,l=123456789,o=362436069,a=521288629,f=32){this.w=e!=null?e>>>0:Math.floor(Math.random()*4294967295)>>>0,this.x=l>>>0,this.y=o>>>0,this.z=a>>>0;for(let m=0;m<f;m++)this.next();return this}getState(){return{x:this.x,y:this.y,z:this.z,w:this.w}}next(){const e=this.x^this.x<<11;return this.x=this.y,this.y=this.z,this.z=this.w,this.w=(this.w^this.w>>>19^(e^e>>>8))>>>0,this.w}}const et=new P;let fe=!1,Ne=!1,tt=!1,nl={isDebugMode:!1,anchor:new P,padding:new P,onPointerDownOrUp:void 0},Z,le,_;const nt=new Mt,Le=new P,de=new P;let it=!1,lt=new P,rn=!1,sn=!1,on=!1;function jn(i,e,l){_=Object.assign(Object.assign({},nl),l),Z=i,le=new P(e.x+_.padding.x*2,e.y+_.padding.y*2),lt.set(Z.offsetLeft+Z.clientWidth*(.5-_.anchor.x),Z.offsetTop+Z.clientWidth*(.5-_.anchor.y)),_.isDebugMode&&Le.set(Z.offsetLeft+Z.clientWidth*(.5-_.anchor.x),Z.offsetTop+Z.clientWidth*(.5-_.anchor.y)),document.addEventListener("mousedown",o=>{Wn(o.pageX,o.pageY)}),document.addEventListener("touchstart",o=>{Wn(o.touches[0].pageX,o.touches[0].pageY)}),document.addEventListener("mousemove",o=>{Qn(o.pageX,o.pageY)}),document.addEventListener("touchmove",o=>{o.preventDefault(),Qn(o.touches[0].pageX,o.touches[0].pageY)},{passive:!1}),document.addEventListener("mouseup",o=>{Yn()}),document.addEventListener("touchend",o=>{o.preventDefault(),o.target.click(),Yn()},{passive:!1})}function Kn(){il(lt.x,lt.y,et),_.isDebugMode&&!et.isInRect(0,0,le.x,le.y)?(ll(),et.set(Le),Ne=!fe&&it,tt=fe&&!it,fe=it):(Ne=!fe&&sn,tt=fe&&on,fe=rn),sn=on=!1}function _n(){Ne=!1,fe=!0}function il(i,e,l){Z!=null&&(l.x=Math.round(((i-Z.offsetLeft)/Z.clientWidth+_.anchor.x)*le.x-_.padding.x),l.y=Math.round(((e-Z.offsetTop)/Z.clientHeight+_.anchor.y)*le.y-_.padding.y))}function ll(){de.length>0?(Le.add(de),!h(Le.x,-le.x*.1,le.x*1.1)&&Le.x*de.x>0&&(de.x*=-1),!h(Le.y,-le.y*.1,le.y*1.1)&&Le.y*de.y>0&&(de.y*=-1),nt.get()<.05&&de.set(0)):nt.get()<.1&&(de.set(0),de.addWithAngle(nt.get(Math.PI*2),(le.x+le.y)*nt.get(.01,.03))),nt.get()<.05&&(it=!it)}function Wn(i,e){lt.set(i,e),rn=sn=!0,_.onPointerDownOrUp!=null&&_.onPointerDownOrUp()}function Qn(i,e){lt.set(i,e)}function Yn(i){rn=!1,on=!0,_.onPointerDownOrUp!=null&&_.onPointerDownOrUp()}var rl=Object.freeze({__proto__:null,pos:et,get isPressed(){return fe},get isJustPressed(){return Ne},get isJustReleased(){return tt},init:jn,update:Kn,clearJustPressed:_n});let Se=new P,he=!1,oe=!1,ve=!1;function Zn(i){Un({onKeyDown:i}),jn(K,xe,{onPointerDownOrUp:i,anchor:new P(.5,.5)})}function Xn(){Vn(),Kn(),Se=et,he=He||fe,oe=Ct||Ne,ve=Qt||tt}function $n(){Jn(),_n()}function rt(i){Se.set(i.pos),he=i.isPressed,oe=i.isJustPressed,ve=i.isJustReleased}var sl=Object.freeze({__proto__:null,get pos(){return Se},get isPressed(){return he},get isJustPressed(){return oe},get isJustReleased(){return ve},init:Zn,update:Xn,clearJustPressed:$n,set:rt});let ei,ti;const ni=68,an=1e3/ni;let st=0;const ol={viewSize:{x:126,y:126},bodyBackground:"#111",viewBackground:"black",isUsingVirtualPad:!0,isFourWaysStick:!1,isCapturing:!1,isCapturingGameCanvasOnly:!1,isSoundEnabled:!0,captureCanvasScale:1,theme:{name:"simple",isUsingPixi:!1,isDarkColor:!1}};let ee,ii=10;function al(i,e,l){ei=i,ti=e,ee=Object.assign(Object.assign({},ol),l),ne(ee.theme.isDarkColor),Yi(ee.viewSize,ee.bodyBackground,ee.viewBackground,ee.isCapturing,ee.isCapturingGameCanvasOnly,ee.captureCanvasScale,ee.theme),Zn(ee.isSoundEnabled?sss.playEmpty:()=>{}),H(),ei(),li()}function li(){requestAnimationFrame(li);const i=window.performance.now();i<st-ni/12||(st+=an,(st<i||st>i+an*2)&&(st=i+an),ee.isSoundEnabled&&sss.update(),Xn(),ti(),ee.isCapturing&&$i(),ii--,ii===0&&Q())}class cl{constructor(e){this.size=new P,this.size.set(e),this.letterGrid=y(this.size.x).map(()=>y(this.size.y).map(()=>{})),this.colorGrid=y(this.size.x).map(()=>y(this.size.y).map(()=>{})),this.backgroundColorGrid=y(this.size.x).map(()=>y(this.size.y).map(()=>{})),this.rotationGrid=y(this.size.x).map(()=>y(this.size.y).map(()=>{})),this.characterGrid=y(this.size.x).map(()=>y(this.size.y).map(()=>{}))}print(e,l,o,a={}){const f=Object.assign(Object.assign({},L),a);let m=Math.floor(l),S=Math.floor(o);const R=m;for(let x=0;x<e.length;x++){const A=e[x];if(A===`
`){m=R,S++;continue}if(m<0||m>=this.size.x||S<0||S>=this.size.y){m++;continue}this.letterGrid[m][S]=A,this.colorGrid[m][S]=f.color,this.backgroundColorGrid[m][S]=f.backgroundColor,this.rotationGrid[m][S]=f.rotation,this.characterGrid[m][S]=f.isCharacter,m++}}getCharAt(e,l){if(e<0||e>=this.size.x||l<0||l>=this.size.y)return;const o=Math.floor(e),a=Math.floor(l),f=this.letterGrid[o][a],m=this.colorGrid[o][a],S=this.backgroundColorGrid[o][a],R=this.rotationGrid[o][a],x=this.characterGrid[o][a];return{char:f,options:{color:m,backgroundColor:S,rotation:R,isCharacter:x}}}setCharAt(e,l,o,a){if(e<0||e>=this.size.x||l<0||l>=this.size.y)return;const f=Object.assign(Object.assign({},L),a),m=Math.floor(e),S=Math.floor(l);this.letterGrid[m][S]=o,this.colorGrid[m][S]=f.color,this.backgroundColorGrid[m][S]=f.backgroundColor,this.rotationGrid[m][S]=f.rotation,this.characterGrid[m][S]=f.isCharacter}draw(){for(let e=0;e<this.size.x;e++)for(let l=0;l<this.size.y;l++){const o=this.letterGrid[e][l];if(o==null)continue;const a=this.colorGrid[e][l],f=this.backgroundColorGrid[e][l],m=this.rotationGrid[e][l],S=this.characterGrid[e][l];se(o,e*s,l*s,{color:a,backgroundColor:f,rotation:m,isCharacter:S})}}clear(){for(let e=0;e<this.size.x;e++)for(let l=0;l<this.size.y;l++)this.letterGrid[e][l]=this.colorGrid[e][l]=this.backgroundColorGrid[e][l]=this.rotationGrid[e][l]=this.characterGrid[e][l]=void 0}scrollUp(){for(let l=0;l<this.size.x;l++)for(let o=1;o<this.size.y;o++)this.letterGrid[l][o-1]=this.letterGrid[l][o],this.colorGrid[l][o-1]=this.colorGrid[l][o],this.backgroundColorGrid[l][o-1]=this.backgroundColorGrid[l][o],this.rotationGrid[l][o-1]=this.rotationGrid[l][o],this.characterGrid[l][o-1]=this.characterGrid[l][o];const e=this.size.y-1;for(let l=0;l<this.size.x;l++)this.letterGrid[l][e]=this.colorGrid[l][e]=this.backgroundColorGrid[l][e]=this.rotationGrid[l][e]=this.characterGrid[l][e]=void 0}getState(){return{charGrid:this.letterGrid.map(e=>[].concat(e)),colorGrid:this.colorGrid.map(e=>[].concat(e)),backgroundColorGrid:this.backgroundColorGrid.map(e=>[].concat(e)),rotationGrid:this.rotationGrid.map(e=>[].concat(e)),symbolGrid:this.characterGrid.map(e=>[].concat(e))}}setState(e){this.letterGrid=e.charGrid.map(l=>[].concat(l)),this.colorGrid=e.colorGrid.map(l=>[].concat(l)),this.backgroundColorGrid=e.backgroundColorGrid.map(l=>[].concat(l)),this.rotationGrid=e.rotationGrid.map(l=>[].concat(l)),this.characterGrid=e.symbolGrid.map(l=>[].concat(l))}}let Pt;const xt=new Mt;function cn(){Pt=[]}function ri(i,e=16,l=1,o=0,a=Math.PI*2){if(e<1){if(xt.get()>e)return;e=1}for(let f=0;f<e;f++){const m=o+xt.get(a)-a/2,S={pos:new P(i),vel:new P(l*xt.get(.5,1),0).rotate(m),color:Y,ticks:clamp(xt.get(10,20)*Math.sqrt(Math.abs(l)),10,60)};Pt.push(S)}}function Ft(){_t(),Pt=Pt.filter(i=>(i.ticks--,i.ticks<0?!1:(i.pos.add(i.vel),i.vel.mul(.98),qe(i.color),$e(Math.floor(i.pos.x),Math.floor(i.pos.y),1,1),!0))),Wt()}function un({pos:i,size:e,text:l,isToggle:o=!1,onClick:a=()=>{}}){return{pos:i,size:e,text:l,isToggle:o,onClick:a,isPressed:!1,isSelected:!1,isHovered:!1,toggleGroup:[]}}function fn(i){const e=vec(input.pos).sub(i.pos);i.isHovered=e.isInRect(0,0,i.size.x,i.size.y),i.isHovered&&Ne&&(i.isPressed=!0),i.isPressed&&!i.isHovered&&(i.isPressed=!1),i.isPressed&&tt&&(i.onClick(),i.isPressed=!1,i.isToggle&&(i.toggleGroup.length===0?i.isSelected=!i.isSelected:(i.toggleGroup.forEach(l=>{l.isSelected=!1}),i.isSelected=!0))),Lt(i)}function Lt(i){color(i.isPressed?"blue":"light_blue"),rect(i.pos.x,i.pos.y,i.size.x,i.size.y),i.isToggle&&!i.isSelected&&(color("white"),rect(i.pos.x+1,i.pos.y+1,i.size.x-2,i.size.y-2)),color(i.isHovered?"black":"blue"),text(i.text,i.pos.x+3,i.pos.y+3)}let ae,ot,Re,dn;function ul(i){ae={randomSeed:i,inputs:[]}}function fl(i){ae.inputs.push(i)}function si(){return ae!=null}function dl(i){ot=0,i.setSeed(ae.randomSeed)}function hl(){ot>=ae.inputs.length||(rt(ae.inputs[ot]),ot++)}function pl(){Re=[]}function gl(i,e,l){Re.push({randomState:l.getState(),gameState:cloneDeep(i),baseState:cloneDeep(e)})}function ml(i){const e=Re.pop(),l=e.randomState;return i.setSeed(l.w,l.x,l.y,l.z,0),dn={pos:vec(Se),isPressed:he,isJustPressed:oe,isJustReleased:ve},rt(ae.inputs.pop()),e}function yl(i){const e=Re[Re.length-1],l=e.randomState;return i.setSeed(l.w,l.x,l.y,l.z,0),dn={pos:vec(Se),isPressed:he,isJustPressed:oe,isJustReleased:ve},rt(ae.inputs[ae.inputs.length-1]),e}function Sl(){rt(dn)}function vl(){return Re.length===0}function wl(){const i=ot-1;if(!(i>=ae.inputs.length))return Re[i]}function bl(i,e,l,o){return oi(!1,i,e,l,o)}function Cl(i,e,l,o){return oi(!0,i,e,l,o)}function Ml(i,e,l,o,a=.5,f=.5){typeof i!="number"&&(f=a,a=o,o=l,l=e,e=i.y,i=i.x);const m=new P(l).rotate(a),S=new P(i-m.x*f,e-m.y*f);return hn(S,m,o)}function Pl(i,e,l=3,o=3,a=3){const f=new P,m=new P;if(typeof i=="number")if(typeof e=="number")typeof l=="number"?(f.set(i,e),m.set(l,o)):(f.set(i,e),m.set(l),a=o);else throw"invalid params";else if(typeof e=="number")if(typeof l=="number")f.set(i),m.set(e,l),a=o;else throw"invalid params";else if(typeof l=="number")f.set(i),m.set(e),a=l;else throw"invalid params";return hn(f,m.sub(f),a)}function xl(i,e,l,o,a,f){let m=new P;typeof i=="number"?m.set(i,e):(m.set(i),f=a,a=o,o=l,l=e),o==null&&(o=3),a==null&&(a=0),f==null&&(f=Math.PI*2);let S,R;if(a>f?(S=f,R=a-f):(S=a,R=f-a),R=c(R,0,Math.PI*2),R<.01)return;const x=c(ceil(R*Math.sqrt(l*.25)),1,36),A=R/x;let E=S,j=new P(l).rotate(E).add(m),re=new P,ht=new P,we={isColliding:{rect:{},text:{},char:{}}};for(let zt=0;zt<x;zt++){E+=A,re.set(l).rotate(E).add(m),ht.set(re).sub(j);const kt=hn(j,ht,o,!0);we=Object.assign(Object.assign(Object.assign({},we),Ie(kt.isColliding.rect)),{isColliding:{rect:Object.assign(Object.assign({},we.isColliding.rect),kt.isColliding.rect),text:Object.assign(Object.assign({},we.isColliding.text),kt.isColliding.text),char:Object.assign(Object.assign({},we.isColliding.char),kt.isColliding.char)}}),j.set(re)}return Ce(),we}function oi(i,e,l,o,a){if(typeof e=="number"){if(typeof l=="number")return typeof o=="number"?a==null?De(i,e,l,o,o):De(i,e,l,o,a):De(i,e,l,o.x,o.y);throw"invalid params"}else if(typeof l=="number"){if(o==null)return De(i,e.x,e.y,l,l);if(typeof o=="number")return De(i,e.x,e.y,l,o);throw"invalid params"}else return De(i,e.x,e.y,l.x,l.y)}function hn(i,e,l,o=!1){let a=!0;(z.name==="shape"||z.name==="shapeDark")&&(Y!=="transparent"&&Zi(i.x,i.y,i.x+e.x,i.y+e.y,l),a=!1);const f=Math.floor(c(l,3,10)),m=Math.abs(e.x),S=Math.abs(e.y),R=c(Math.ceil(m>S?m/f:S/f)+1,3,99);e.div(R-1);let x={isColliding:{rect:{},text:{},char:{}}};for(let A=0;A<R;A++){const E=De(!0,i.x,i.y,l,l,!0,a);x=Object.assign(Object.assign(Object.assign({},x),Ie(E.isColliding.rect)),{isColliding:{rect:Object.assign(Object.assign({},x.isColliding.rect),E.isColliding.rect),text:Object.assign(Object.assign({},x.isColliding.text),E.isColliding.text),char:Object.assign(Object.assign({},x.isColliding.char),E.isColliding.char)}}),i.add(e)}return o||Ce(),x}function De(i,e,l,o,a,f=!1,m=!0){let S=m;(z.name==="shape"||z.name==="shapeDark")&&S&&Y!=="transparent"&&(i?$e(e-o/2,l-a/2,o,a):$e(e,l,o,a),S=!1);let R=i?{x:Math.floor(e-o/2),y:Math.floor(l-a/2)}:{x:Math.floor(e),y:Math.floor(l)};const x={x:Math.trunc(o),y:Math.trunc(a)};if(x.x===0||x.y===0)return{isColliding:{rect:{},text:{},char:{}}};x.x<0&&(R.x+=x.x,x.x*=-1),x.y<0&&(R.y+=x.y,x.y*=-1);const A={pos:R,size:x,collision:{isColliding:{rect:{}}}};A.collision.isColliding.rect[Y]=!0;const E=d(A);return Y!=="transparent"&&((f?Te:ie).push(A),S&&$e(R.x,R.y,x.x,x.y)),E}const Fl=Math.PI,Ll=Math.abs,Rl=Math.sin,Dl=Math.cos,Gl=Math.atan2,Ol=Math.sqrt,Al=Math.pow,El=Math.floor,Bl=Math.round,zl=Math.ceil;n.ticks=0,n.score=0,n.isReplaying=!1;function kl(i=1,e){return pe.get(i,e)}function Tl(i=2,e){return pe.getInt(i,e)}function Il(i=1,e){return pe.get(i,e)*pe.getPlusOrMinus()}function pn(i="GAME OVER"){Bt=i,Ue&&(n.time=void 0),pi()}function ql(i="COMPLETE"){Bt=i,pi()}function Hl(i,e,l){if(n.isReplaying||(n.score+=i,e==null))return;const o=`${i>=1?"+":""}${Math.floor(i)}`;let a=new P;typeof e=="number"?a.set(e,l):a.set(e),a.x-=o.length*s/2,a.y-=s/2,At.push({str:o,pos:a,vy:-2,ticks:30})}function ai(i){qe(i)}function Nl(i,e,l,o,a,f){let m=new P;typeof i=="number"?(m.set(i,e),ri(m,l,o,a,f)):(m.set(i),ri(m,e,l,o,a))}function ci(i,e){return new P(i,e)}function ui(i){!ft&&!Ee&&Ae&&sss.play(Jl[i])}function Ul(i){if(ft){const e=yl(pe),l=e.baseState;return n.score=l.score,n.ticks=l.ticks,cloneDeep(e.gameState)}else if(Ee){const e=ml(pe),l=e.baseState;return n.score=l.score,n.ticks=l.ticks,e.gameState}else{if(n.isReplaying)return wl().gameState;if(Ge==="inGame"){const e={score:n.score,ticks:n.ticks};gl(i,e,pe)}}return i}function Vl(){Ee||(!n.isReplaying&&Ot?er():pn())}const Jl={coin:"c",laser:"l",explosion:"e",powerUp:"p",hit:"h",jump:"j",select:"s",lucky:"u",random:"r"},fi={isPlayingBgm:!1,isCapturing:!1,isCapturingGameCanvasOnly:!1,captureCanvasScale:1,isShowingScore:!0,isShowingTime:!1,isReplayEnabled:!1,isRewindEnabled:!1,isDrawingParticleFront:!1,isDrawingScoreFront:!1,isMinifying:!1,isSoundEnabled:!0,viewSize:{x:100,y:100},seed:0,theme:"simple"},jl=new Mt,pe=new Mt;let Ge,Kl={title:Zl,inGame:Yl,gameOver:Xl,rewind:tr},X,gn=0,Rt,Dt=!0,Gt=0,Oe,at,di,Ue,ct,Ot,ut,mn,Ae,ge,At,ft=!1,Ee=!1,dt,Et,Bt,yn;function _l(){let i;typeof options!="undefined"&&options!=null?i=Object.assign(Object.assign({},fi),options):i=fi;const e={name:i.theme,isUsingPixi:!1,isDarkColor:!1};i.theme!=="simple"&&i.theme!=="dark"&&(e.isUsingPixi=!0),(i.theme==="pixel"||i.theme==="shapeDark"||i.theme==="crt"||i.theme==="dark")&&(e.isDarkColor=!0),Oe={viewSize:{x:100,y:100},bodyBackground:e.isDarkColor?"#101010":"#e0e0e0",viewBackground:e.isDarkColor?"blue":"white",theme:e,isSoundEnabled:i.isSoundEnabled},Gt=i.seed,Oe.isCapturing=i.isCapturing,Oe.isCapturingGameCanvasOnly=i.isCapturingGameCanvasOnly,Oe.captureCanvasScale=i.captureCanvasScale,Oe.viewSize=i.viewSize,at=i.isPlayingBgm,di=i.isShowingScore&&!i.isShowingTime,Ue=i.isShowingTime,ct=i.isReplayEnabled,Ot=i.isRewindEnabled,ut=i.isDrawingParticleFront,mn=i.isDrawingScoreFront,Ae=i.isSoundEnabled,i.isMinifying&&lr(),al(Wl,Ql,Oe)}function Wl(){typeof description!="undefined"&&description!=null&&description.trim().length>0&&(Dt=!1,Gt+=yi(description)),typeof title!="undefined"&&title!=null&&title.trim().length>0&&(Dt=!1,document.title=title,Gt+=yi(title)),typeof characters!="undefined"&&characters!=null&&N(characters,"a"),Ae&&sss.init(Gt);const i=Oe.viewSize;ge={x:Math.floor(i.x/6),y:Math.floor(i.y/6)},X=new cl(ge),qe("black"),Dt?(Sn(),n.ticks=0):hi()}function Ql(){n.df=n.difficulty=n.ticks/3600+1,n.tc=n.ticks;const i=n.score,e=n.time;n.sc=n.score;const l=n.sc;n.inp={p:Se,ip:he,ijp:oe,ijr:ve},Jt(),Kl[Ge](),z.isUsingPixi&&(Xe(),z.name==="crt"&&Xi()),n.ticks++,n.isReplaying?(n.score=i,n.time=e):n.sc!==l&&(n.score=n.sc)}function Sn(){Ge="inGame",n.ticks=-1,cn();const i=Math.floor(n.score);i>gn&&(gn=i),Ue&&n.time!=null&&(Rt==null||Rt>n.time)&&(Rt=n.time),n.score=0,n.time=0,At=[],at&&Ae&&sss.playBgm();const e=jl.getInt(999999999);pe.setSeed(e),(ct||Ot)&&(ul(e),pl(),n.isReplaying=!1)}function Yl(){X.clear(),bt(),ut||Ft(),mn||mi(),(ct||Ot)&&fl({pos:ci(Se),isPressed:he,isJustPressed:oe,isJustReleased:ve}),update(),ut&&Ft(),mn&&mi(),vn(),X.draw(),Ue&&n.time!=null&&n.time++}function hi(){Ge="title",n.ticks=-1,cn(),X.clear(),bt(),si()&&(dl(pe),n.isReplaying=!0)}function Zl(){if(oe){Sn();return}if(bt(),ct&&si()&&(hl(),n.inp={p:Se,ip:he,ijp:oe,ijr:ve},ut||Ft(),update(),ut&&Ft()),n.ticks===0&&(vn(),typeof title!="undefined"&&title!=null&&X.print(title,Math.floor(ge.x-title.length)/2,Math.ceil(ge.y*.2))),(n.ticks===30||n.ticks==40)&&typeof description!="undefined"&&description!=null){let i=0;description.split(`
`).forEach(l=>{l.length>i&&(i=l.length)});const e=Math.floor((ge.x-i)/2);description.split(`
`).forEach((l,o)=>{X.print(l,e,Math.floor(ge.y/2)+o)})}X.draw()}function pi(){Ge="gameOver",n.isReplaying||$n(),n.ticks=-1,$l(),at&&Ae&&sss.stopBgm()}function Xl(){(n.isReplaying||n.ticks>20)&&oe?Sn():n.ticks===(ct?120:300)&&!Dt&&hi()}function $l(){n.isReplaying||(X.print(Bt,Math.floor((ge.x-Bt.length)/2),Math.floor(ge.y/2)),X.draw())}function er(){Ge="rewind",ft=!0,dt=un({pos:{x:61,y:11},size:{x:36,y:7},text:"Rewind"}),Et=un({pos:{x:61,y:81},size:{x:36,y:7},text:"GiveUp"}),at&&Ae&&sss.stopBgm(),z.isUsingPixi&&(Lt(dt),Lt(Et))}function tr(){X.clear(),bt(),update(),vn(),Sl(),Ee?(Lt(dt),(vl()||!he)&&nr()):(fn(dt),fn(Et),dt.isPressed&&(Ee=!0,ft=!1)),Et.isPressed?(ft=Ee=!1,pn()):X.draw(),Ue&&n.time!=null&&n.time++}function nr(){Ee=!1,Ge="inGame",cn(),at&&Ae&&sss.playBgm()}function vn(){if(di){X.print(`${Math.floor(n.score)}`,0,0);const i=`HI ${gn}`;X.print(i,ge.x-i.length,0)}Ue&&(gi(n.time,0,0),gi(Rt,9,0))}function gi(i,e,l){if(i==null)return;let o=Math.floor(i*100/50);o>=10*60*100&&(o=10*60*100-1);const a=wn(Math.floor(o/6e3),1)+"'"+wn(Math.floor(o%6e3/100),2)+'"'+wn(Math.floor(o%100),2);X.print(a,e,l)}function wn(i,e){return("0000"+i).slice(-e)}function mi(){_t(),qe("black"),At=At.filter(i=>(U(i.str,i.pos.x,i.pos.y),i.pos.y+=i.vy,i.vy*=.9,i.ticks--,i.ticks>0)),Wt()}function yi(i){let e=0;for(let l=0;l<i.length;l++){const o=i.charCodeAt(l);e=(e<<5)-e+o,e|=0}return e}function ir(){let i=window.location.search.substring(1);if(i=i.replace(/[^A-Za-z0-9_-]/g,""),i.length===0)return;const e=document.createElement("script");yn=`${i}/main.js`,e.setAttribute("src",yn),document.head.appendChild(e)}function lr(){fetch(yn).then(i=>i.text()).then(i=>{const e=Terser.minify(i+"update();",{toplevel:!0}).code,l="function(){",o=e.indexOf(l),a="options={",f=e.indexOf(a);let m=e;if(o>=0)m=e.substring(e.indexOf(l)+l.length,e.length-4);else if(f>=0){let S=1,R;for(let x=f+a.length;x<e.length;x++){const A=e.charAt(x);if(A==="{")S++;else if(A==="}"&&(S--,S===0)){R=x+2;break}}S===0&&(m=e.substring(R))}Si.forEach(([S,R])=>{m=m.split(S).join(R)}),console.log(m),console.log(`${m.length} letters`)})}let rr=ai,sr=ui,or=b,ar=M;const cr="transparent",ur="white",fr="red",dr="green",hr="yellow",pr="blue",gr="purple",mr="cyan",yr="black",Sr="coin",vr="laser",wr="explosion",br="powerUp",Cr="hit",Mr="jump",Pr="select",xr="lucky";let Si=[["===","=="],["!==","!="],["input.pos","inp.p"],["input.isPressed","inp.ip"],["input.isJustPressed","inp.ijp"],["input.isJustReleased","inp.ijr"],["color(","clr("],["play(","ply("],["times(","tms("],["remove(","rmv("],["ticks","tc"],["difficulty","df"],["score","sc"],[".isColliding.rect.transparent",".tr"],[".isColliding.rect.white",".wh"],[".isColliding.rect.red",".rd"],[".isColliding.rect.green",".gr"],[".isColliding.rect.yellow",".yl"],[".isColliding.rect.blue",".bl"],[".isColliding.rect.purple",".pr"],[".isColliding.rect.cyan",".cy"],[".isColliding.rect.black",".lc"],['"transparent"',"tr"],['"white"',"wh"],['"red"',"rd"],['"green"',"gr"],['"yellow"',"yl"],['"blue"',"bl"],['"purple"',"pr"],['"cyan"',"cy"],['"black"',"lc"],['"coin"',"cn"],['"laser"',"ls"],['"explosion"',"ex"],['"powerUp"',"pw"],['"hit"',"ht"],['"jump"',"jm"],['"select"',"sl"],['"lucky"',"uc"]];n.PI=Fl,n.abs=Ll,n.addGameScript=ir,n.addScore=Hl,n.addWithCharCode=I,n.arc=xl,n.atan2=Gl,n.bar=Ml,n.bl=pr,n.box=Cl,n.ceil=zl,n.char=jt,n.clamp=c,n.clr=rr,n.cn=Sr,n.color=ai,n.complete=ql,n.cos=Dl,n.cy=mr,n.end=pn,n.ex=wr,n.floor=El,n.frameState=Ul,n.getButton=un,n.gr=dr,n.ht=Cr,n.input=sl,n.jm=Mr,n.keyboard=tl,n.lc=yr,n.line=Pl,n.ls=vr,n.minifyReplaces=Si,n.onLoad=_l,n.particle=Nl,n.play=ui,n.ply=sr,n.pointer=rl,n.pow=Al,n.pr=gr,n.pw=br,n.range=y,n.rd=fr,n.rect=bl,n.remove=M,n.rewind=Vl,n.rmv=ar,n.rnd=kl,n.rndi=Tl,n.rnds=Il,n.round=Bl,n.sin=Rl,n.sl=Pr,n.sqrt=Ol,n.text=Pe,n.times=b,n.tms=or,n.tr=cr,n.uc=xr,n.updateButton=fn,n.vec=ci,n.wh=ur,n.wrap=p,n.yl=hr})(window||{},{});window.sss=fs;window.options={isShowingScore:!1};let Mi,Pn,gt=31;window.update=function(){ticks===0&&(Mi=["coin","laser","explosion","powerUp","hit","jump","select","random"].map((r,c)=>getButton({pos:vec(5,2+c*9),size:vec(56,7),text:r,isToggle:!1,onClick:()=>{Vi(r),Pn=r}})),Nt(gt),Rn()),Mi.forEach(r=>{updateButton(r)});const n=vec(5,73);if(color("light_blue"),rect(n.x,n.y,90,5),color("white"),rect(n.x+1,n.y+1,88,3),input.pos.isInRect(n.x+1,n.y+1,88,3)){let r=input.pos.x-n.x;color("blue"),rect(n.x+r,n.y+1,1,3),text(`${r}`,85,n.y-3),input.isJustPressed&&(gt=r,Ji(),Nt(gt),Rn())}color("black"),rect(n.x+gt,n.y+1,1,3),text(`init(${gt})`,5,88),Pn!=null&&text(`play("${Pn}");`,5,95)};window.addEventListener("load",onLoad);
