#!/usr/bin/env node
exports.ids=[2],exports.modules={129:function(e,t,s){"use strict";e.exports={BINARY_TYPES:["nodebuffer","arraybuffer","fragments"],GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),EMPTY_BUFFER:Buffer.alloc(0),NOOP:()=>{}}},130:function(e,t,s){"use strict";const i=s(54),r=s(131),o=s(162),{kStatusCode:n,NOOP:a}=s(129),h=Buffer.from([0,0,255,255]),c=Symbol("permessage-deflate"),l=Symbol("total-length"),d=Symbol("callback"),f=Symbol("buffers"),_=Symbol("error");let u;function p(e){this[f].push(e),this[l]+=e.length}function m(e){this[l]+=e.length,this[c]._maxPayload<1||this[l]<=this[c]._maxPayload?this[f].push(e):(this[_]=new RangeError("Max payload size exceeded"),this[_][n]=1009,this.removeListener("data",m),this.reset())}function g(e){this[c]._inflate=null,e[n]=1007,this[d](e)}e.exports=class{constructor(e,t,s){if(this._maxPayload=0|s,this._options=e||{},this._threshold=void 0!==this._options.threshold?this._options.threshold:1024,this._isServer=!!t,this._deflate=null,this._inflate=null,this.params=null,!u){const e=void 0!==this._options.concurrencyLimit?this._options.concurrencyLimit:10;u=new o(e)}}static get extensionName(){return"permessage-deflate"}offer(){const e={};return this._options.serverNoContextTakeover&&(e.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(e.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(e.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?e.client_max_window_bits=this._options.clientMaxWindowBits:null==this._options.clientMaxWindowBits&&(e.client_max_window_bits=!0),e}accept(e){return e=this.normalizeParams(e),this.params=this._isServer?this.acceptAsServer(e):this.acceptAsClient(e),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){const e=this._deflate[d];this._deflate.close(),this._deflate=null,e&&e(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(e){const t=this._options,s=e.find(e=>!(!1===t.serverNoContextTakeover&&e.server_no_context_takeover||e.server_max_window_bits&&(!1===t.serverMaxWindowBits||"number"==typeof t.serverMaxWindowBits&&t.serverMaxWindowBits>e.server_max_window_bits)||"number"==typeof t.clientMaxWindowBits&&!e.client_max_window_bits));if(!s)throw new Error("None of the extension offers can be accepted");return t.serverNoContextTakeover&&(s.server_no_context_takeover=!0),t.clientNoContextTakeover&&(s.client_no_context_takeover=!0),"number"==typeof t.serverMaxWindowBits&&(s.server_max_window_bits=t.serverMaxWindowBits),"number"==typeof t.clientMaxWindowBits?s.client_max_window_bits=t.clientMaxWindowBits:!0!==s.client_max_window_bits&&!1!==t.clientMaxWindowBits||delete s.client_max_window_bits,s}acceptAsClient(e){const t=e[0];if(!1===this._options.clientNoContextTakeover&&t.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(t.client_max_window_bits){if(!1===this._options.clientMaxWindowBits||"number"==typeof this._options.clientMaxWindowBits&&t.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"')}else"number"==typeof this._options.clientMaxWindowBits&&(t.client_max_window_bits=this._options.clientMaxWindowBits);return t}normalizeParams(e){return e.forEach(e=>{Object.keys(e).forEach(t=>{let s=e[t];if(s.length>1)throw new Error(`Parameter "${t}" must have only a single value`);if(s=s[0],"client_max_window_bits"===t){if(!0!==s){const e=+s;if(!Number.isInteger(e)||e<8||e>15)throw new TypeError(`Invalid value for parameter "${t}": ${s}`);s=e}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${t}": ${s}`)}else if("server_max_window_bits"===t){const e=+s;if(!Number.isInteger(e)||e<8||e>15)throw new TypeError(`Invalid value for parameter "${t}": ${s}`);s=e}else{if("client_no_context_takeover"!==t&&"server_no_context_takeover"!==t)throw new Error(`Unknown parameter "${t}"`);if(!0!==s)throw new TypeError(`Invalid value for parameter "${t}": ${s}`)}e[t]=s})}),e}decompress(e,t,s){u.add(i=>{this._decompress(e,t,(e,t)=>{i(),s(e,t)})})}compress(e,t,s){u.add(i=>{this._compress(e,t,(e,t)=>{i(),s(e,t)})})}_decompress(e,t,s){const o=this._isServer?"client":"server";if(!this._inflate){const e=o+"_max_window_bits",t="number"!=typeof this.params[e]?i.Z_DEFAULT_WINDOWBITS:this.params[e];this._inflate=i.createInflateRaw({...this._options.zlibInflateOptions,windowBits:t}),this._inflate[c]=this,this._inflate[l]=0,this._inflate[f]=[],this._inflate.on("error",g),this._inflate.on("data",m)}this._inflate[d]=s,this._inflate.write(e),t&&this._inflate.write(h),this._inflate.flush(()=>{const e=this._inflate[_];if(e)return this._inflate.close(),this._inflate=null,void s(e);const i=r.concat(this._inflate[f],this._inflate[l]);t&&this.params[o+"_no_context_takeover"]?(this._inflate.close(),this._inflate=null):(this._inflate[l]=0,this._inflate[f]=[]),s(null,i)})}_compress(e,t,s){const o=this._isServer?"server":"client";if(!this._deflate){const e=o+"_max_window_bits",t="number"!=typeof this.params[e]?i.Z_DEFAULT_WINDOWBITS:this.params[e];this._deflate=i.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:t}),this._deflate[l]=0,this._deflate[f]=[],this._deflate.on("error",a),this._deflate.on("data",p)}this._deflate[d]=s,this._deflate.write(e),this._deflate.flush(i.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let e=r.concat(this._deflate[f],this._deflate[l]);t&&(e=e.slice(0,e.length-4)),this._deflate[d]=null,t&&this.params[o+"_no_context_takeover"]?(this._deflate.close(),this._deflate=null):(this._deflate[l]=0,this._deflate[f]=[]),s(null,e)})}}},131:function(e,t,s){"use strict";const{EMPTY_BUFFER:i}=s(129);function r(e,t){if(0===e.length)return i;if(1===e.length)return e[0];const s=Buffer.allocUnsafe(t);let r=0;for(let t=0;t<e.length;t++){const i=e[t];s.set(i,r),r+=i.length}return r<t?s.slice(0,r):s}function o(e,t,s,i,r){for(let o=0;o<r;o++)s[i+o]=e[o]^t[3&o]}function n(e,t){const s=e.length;for(let i=0;i<s;i++)e[i]^=t[3&i]}function a(e){return e.byteLength===e.buffer.byteLength?e.buffer:e.buffer.slice(e.byteOffset,e.byteOffset+e.byteLength)}function h(e){if(h.readOnly=!0,Buffer.isBuffer(e))return e;let t;return e instanceof ArrayBuffer?t=Buffer.from(e):ArrayBuffer.isView(e)?t=function(e){const t=Buffer.from(e.buffer);if(e.byteLength!==e.buffer.byteLength)return t.slice(e.byteOffset,e.byteOffset+e.byteLength);return t}(e):(t=Buffer.from(e),h.readOnly=!1),t}try{const t=s(!function(){var e=new Error("Cannot find module 'bufferutil'");throw e.code="MODULE_NOT_FOUND",e}()),i=t.BufferUtil||t;e.exports={concat:r,mask(e,t,s,r,n){n<48?o(e,t,s,r,n):i.mask(e,t,s,r,n)},toArrayBuffer:a,toBuffer:h,unmask(e,t){e.length<32?n(e,t):i.unmask(e,t)}}}catch(t){e.exports={concat:r,mask:o,toArrayBuffer:a,toBuffer:h,unmask:n}}},141:function(e,t,s){"use strict";const i=s(32),r=s(127),o=s(14),n=s(33),a=s(128),{randomBytes:h,createHash:c}=s(24),{URL:l}=s(5),d=s(130),f=s(142),_=s(144),{BINARY_TYPES:u,EMPTY_BUFFER:p,GUID:m,kStatusCode:g,kWebSocket:y,NOOP:v}=s(129),{addEventListener:b,removeEventListener:w}=s(163),{format:S,parse:x}=s(145),{toBuffer:k}=s(131),E=["CONNECTING","OPEN","CLOSING","CLOSED"],C=[8,13];class N extends i{constructor(e,t,s){super(),this.readyState=N.CONNECTING,this.protocol="",this._binaryType=u[0],this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage="",this._closeTimer=null,this._closeCode=1006,this._extensions={},this._receiver=null,this._sender=null,this._socket=null,null!==e?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,Array.isArray(t)?t=t.join(", "):"object"==typeof t&&null!==t&&(s=t,t=void 0),function e(t,s,i,n){const a={protocolVersion:C[1],maxPayload:104857600,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...n,createConnection:void 0,socketPath:void 0,hostname:void 0,protocol:void 0,timeout:void 0,method:void 0,auth:void 0,host:void 0,path:void 0,port:void 0};if(!C.includes(a.protocolVersion))throw new RangeError(`Unsupported protocol version: ${a.protocolVersion} (supported versions: ${C.join(", ")})`);let f;s instanceof l?(f=s,t.url=s.href):(f=new l(s),t.url=s);const _="ws+unix:"===f.protocol;if(!(f.host||_&&f.pathname))throw new Error("Invalid URL: "+t.url);const u="wss:"===f.protocol||"https:"===f.protocol,p=u?443:80,g=h(16).toString("base64"),y=u?r.get:o.get;let v;a.createConnection=u?O:L,a.defaultPort=a.defaultPort||p,a.port=f.port||p,a.host=f.hostname.startsWith("[")?f.hostname.slice(1,-1):f.hostname,a.headers={"Sec-WebSocket-Version":a.protocolVersion,"Sec-WebSocket-Key":g,Connection:"Upgrade",Upgrade:"websocket",...a.headers},a.path=f.pathname+f.search,a.timeout=a.handshakeTimeout,a.perMessageDeflate&&(v=new d(!0!==a.perMessageDeflate?a.perMessageDeflate:{},!1,a.maxPayload),a.headers["Sec-WebSocket-Extensions"]=S({[d.extensionName]:v.offer()}));i&&(a.headers["Sec-WebSocket-Protocol"]=i);a.origin&&(a.protocolVersion<13?a.headers["Sec-WebSocket-Origin"]=a.origin:a.headers.Origin=a.origin);(f.username||f.password)&&(a.auth=`${f.username}:${f.password}`);if(_){const e=a.path.split(":");a.socketPath=e[0],a.path=e[1]}let b=t._req=y(a);a.timeout&&b.on("timeout",()=>{T(t,b,"Opening handshake has timed out")});b.on("error",e=>{t._req.aborted||(b=t._req=null,t.readyState=N.CLOSING,t.emit("error",e),t.emitClose())}),b.on("response",r=>{const o=r.headers.location,h=r.statusCode;if(o&&a.followRedirects&&h>=300&&h<400){if(++t._redirects>a.maxRedirects)return void T(t,b,"Maximum redirects exceeded");b.abort();const r=new l(o,s);e(t,r,i,n)}else t.emit("unexpected-response",b,r)||T(t,b,"Unexpected server response: "+r.statusCode)}),b.on("upgrade",(e,s,r)=>{if(t.emit("upgrade",e),t.readyState!==N.CONNECTING)return;b=t._req=null;const o=c("sha1").update(g+m).digest("base64");if(e.headers["sec-websocket-accept"]!==o)return void T(t,s,"Invalid Sec-WebSocket-Accept header");const n=e.headers["sec-websocket-protocol"],h=(i||"").split(/, */);let l;if(!i&&n?l="Server sent a subprotocol but none was requested":i&&!n?l="Server sent no subprotocol":n&&!h.includes(n)&&(l="Server sent an invalid subprotocol"),l)T(t,s,l);else{if(n&&(t.protocol=n),v)try{const s=x(e.headers["sec-websocket-extensions"]);s[d.extensionName]&&(v.accept(s[d.extensionName]),t._extensions[d.extensionName]=v)}catch(e){return void T(t,s,"Invalid Sec-WebSocket-Extensions header")}t.setSocket(s,r,a.maxPayload)}})}(this,e,t,s)):this._isServer=!0}get CONNECTING(){return N.CONNECTING}get CLOSING(){return N.CLOSING}get CLOSED(){return N.CLOSED}get OPEN(){return N.OPEN}get binaryType(){return this._binaryType}set binaryType(e){u.includes(e)&&(this._binaryType=e,this._receiver&&(this._receiver._binaryType=e))}get bufferedAmount(){return this._socket?(this._socket.bufferSize||0)+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}setSocket(e,t,s){const i=new f(this._binaryType,this._extensions,this._isServer,s);this._sender=new _(e,this._extensions),this._receiver=i,this._socket=e,i[y]=this,e[y]=this,i.on("conclude",P),i.on("drain",U),i.on("error",I),i.on("message",R),i.on("ping",W),i.on("pong",F),e.setTimeout(0),e.setNoDelay(),t.length>0&&e.unshift(t),e.on("close",A),e.on("data",D),e.on("end",G),e.on("error",j),this.readyState=N.OPEN,this.emit("open")}emitClose(){if(!this._socket)return this.readyState=N.CLOSED,void this.emit("close",this._closeCode,this._closeMessage);this._extensions[d.extensionName]&&this._extensions[d.extensionName].cleanup(),this._receiver.removeAllListeners(),this.readyState=N.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(e,t){if(this.readyState!==N.CLOSED){if(this.readyState===N.CONNECTING){const e="WebSocket was closed before the connection was established";return T(this,this._req,e)}this.readyState!==N.CLOSING?(this.readyState=N.CLOSING,this._sender.close(e,t,!this._isServer,e=>{e||(this._closeFrameSent=!0,this._closeFrameReceived&&this._socket.end())}),this._closeTimer=setTimeout(this._socket.destroy.bind(this._socket),3e4)):this._closeFrameSent&&this._closeFrameReceived&&this._socket.end()}}ping(e,t,s){if(this.readyState===N.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");"function"==typeof e?(s=e,e=t=void 0):"function"==typeof t&&(s=t,t=void 0),"number"==typeof e&&(e=e.toString()),this.readyState===N.OPEN?(void 0===t&&(t=!this._isServer),this._sender.ping(e||p,t,s)):B(this,e,s)}pong(e,t,s){if(this.readyState===N.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");"function"==typeof e?(s=e,e=t=void 0):"function"==typeof t&&(s=t,t=void 0),"number"==typeof e&&(e=e.toString()),this.readyState===N.OPEN?(void 0===t&&(t=!this._isServer),this._sender.pong(e||p,t,s)):B(this,e,s)}send(e,t,s){if(this.readyState===N.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if("function"==typeof t&&(s=t,t={}),"number"==typeof e&&(e=e.toString()),this.readyState!==N.OPEN)return void B(this,e,s);const i={binary:"string"!=typeof e,mask:!this._isServer,compress:!0,fin:!0,...t};this._extensions[d.extensionName]||(i.compress=!1),this._sender.send(e||p,i,s)}terminate(){if(this.readyState!==N.CLOSED){if(this.readyState===N.CONNECTING){const e="WebSocket was closed before the connection was established";return T(this,this._req,e)}this._socket&&(this.readyState=N.CLOSING,this._socket.destroy())}}}function L(e){return e.path=e.socketPath,n.connect(e)}function O(e){return e.path=void 0,e.servername||""===e.servername||(e.servername=e.host),a.connect(e)}function T(e,t,s){e.readyState=N.CLOSING;const i=new Error(s);Error.captureStackTrace(i,T),t.setHeader?(t.abort(),t.once("abort",e.emitClose.bind(e)),e.emit("error",i)):(t.destroy(i),t.once("error",e.emit.bind(e,"error")),t.once("close",e.emitClose.bind(e)))}function B(e,t,s){if(t){const s=k(t).length;e._socket?e._sender._bufferedBytes+=s:e._bufferedAmount+=s}if(s){s(new Error(`WebSocket is not open: readyState ${e.readyState} (${E[e.readyState]})`))}}function P(e,t){const s=this[y];s._socket.removeListener("data",D),s._socket.resume(),s._closeFrameReceived=!0,s._closeMessage=t,s._closeCode=e,1005===e?s.close():s.close(e,t)}function U(){this[y]._socket.resume()}function I(e){const t=this[y];t._socket.removeListener("data",D),t.readyState=N.CLOSING,t._closeCode=e[g],t.emit("error",e),t._socket.destroy()}function M(){this[y].emitClose()}function R(e){this[y].emit("message",e)}function W(e){const t=this[y];t.pong(e,!t._isServer,v),t.emit("ping",e)}function F(e){this[y].emit("pong",e)}function A(){const e=this[y];this.removeListener("close",A),this.removeListener("end",G),e.readyState=N.CLOSING,e._socket.read(),e._receiver.end(),this.removeListener("data",D),this[y]=void 0,clearTimeout(e._closeTimer),e._receiver._writableState.finished||e._receiver._writableState.errorEmitted?e.emitClose():(e._receiver.on("error",M),e._receiver.on("finish",M))}function D(e){this[y]._receiver.write(e)||this.pause()}function G(){const e=this[y];e.readyState=N.CLOSING,e._receiver.end(),this.end()}function j(){const e=this[y];this.removeListener("error",j),this.on("error",v),e&&(e.readyState=N.CLOSING,this.destroy())}E.forEach((e,t)=>{N[e]=t}),["open","error","close","message"].forEach(e=>{Object.defineProperty(N.prototype,"on"+e,{get(){const t=this.listeners(e);for(let e=0;e<t.length;e++)if(t[e]._listener)return t[e]._listener},set(t){const s=this.listeners(e);for(let t=0;t<s.length;t++)s[t]._listener&&this.removeListener(e,s[t]);this.addEventListener(e,t)}})}),N.prototype.addEventListener=b,N.prototype.removeEventListener=w,e.exports=N},142:function(e,t,s){"use strict";const{Writable:i}=s(8),r=s(130),{BINARY_TYPES:o,EMPTY_BUFFER:n,kStatusCode:a,kWebSocket:h}=s(129),{concat:c,toArrayBuffer:l,unmask:d}=s(131),{isValidStatusCode:f,isValidUTF8:_}=s(143);function u(e,t,s,i){const r=new e(s?"Invalid WebSocket frame: "+t:t);return Error.captureStackTrace(r,u),r[a]=i,r}e.exports=class extends i{constructor(e,t,s,i){super(),this._binaryType=e||o[0],this[h]=void 0,this._extensions=t||{},this._isServer=!!s,this._maxPayload=0|i,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._fragments=[],this._state=0,this._loop=!1}_write(e,t,s){if(8===this._opcode&&0==this._state)return s();this._bufferedBytes+=e.length,this._buffers.push(e),this.startLoop(s)}consume(e){if(this._bufferedBytes-=e,e===this._buffers[0].length)return this._buffers.shift();if(e<this._buffers[0].length){const t=this._buffers[0];return this._buffers[0]=t.slice(e),t.slice(0,e)}const t=Buffer.allocUnsafe(e);do{const s=this._buffers[0],i=t.length-e;e>=s.length?t.set(this._buffers.shift(),i):(t.set(new Uint8Array(s.buffer,s.byteOffset,e),i),this._buffers[0]=s.slice(e)),e-=s.length}while(e>0);return t}startLoop(e){let t;this._loop=!0;do{switch(this._state){case 0:t=this.getInfo();break;case 1:t=this.getPayloadLength16();break;case 2:t=this.getPayloadLength64();break;case 3:this.getMask();break;case 4:t=this.getData(e);break;default:return void(this._loop=!1)}}while(this._loop);e(t)}getInfo(){if(this._bufferedBytes<2)return void(this._loop=!1);const e=this.consume(2);if(0!=(48&e[0]))return this._loop=!1,u(RangeError,"RSV2 and RSV3 must be clear",!0,1002);const t=64==(64&e[0]);if(t&&!this._extensions[r.extensionName])return this._loop=!1,u(RangeError,"RSV1 must be clear",!0,1002);if(this._fin=128==(128&e[0]),this._opcode=15&e[0],this._payloadLength=127&e[1],0===this._opcode){if(t)return this._loop=!1,u(RangeError,"RSV1 must be clear",!0,1002);if(!this._fragmented)return this._loop=!1,u(RangeError,"invalid opcode 0",!0,1002);this._opcode=this._fragmented}else if(1===this._opcode||2===this._opcode){if(this._fragmented)return this._loop=!1,u(RangeError,"invalid opcode "+this._opcode,!0,1002);this._compressed=t}else{if(!(this._opcode>7&&this._opcode<11))return this._loop=!1,u(RangeError,"invalid opcode "+this._opcode,!0,1002);if(!this._fin)return this._loop=!1,u(RangeError,"FIN must be set",!0,1002);if(t)return this._loop=!1,u(RangeError,"RSV1 must be clear",!0,1002);if(this._payloadLength>125)return this._loop=!1,u(RangeError,"invalid payload length "+this._payloadLength,!0,1002)}if(this._fin||this._fragmented||(this._fragmented=this._opcode),this._masked=128==(128&e[1]),this._isServer){if(!this._masked)return this._loop=!1,u(RangeError,"MASK must be set",!0,1002)}else if(this._masked)return this._loop=!1,u(RangeError,"MASK must be clear",!0,1002);if(126===this._payloadLength)this._state=1;else{if(127!==this._payloadLength)return this.haveLength();this._state=2}}getPayloadLength16(){if(!(this._bufferedBytes<2))return this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength();this._loop=!1}getPayloadLength64(){if(this._bufferedBytes<8)return void(this._loop=!1);const e=this.consume(8),t=e.readUInt32BE(0);return t>Math.pow(2,21)-1?(this._loop=!1,u(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009)):(this._payloadLength=t*Math.pow(2,32)+e.readUInt32BE(4),this.haveLength())}haveLength(){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0))return this._loop=!1,u(RangeError,"Max payload size exceeded",!1,1009);this._masked?this._state=3:this._state=4}getMask(){this._bufferedBytes<4?this._loop=!1:(this._mask=this.consume(4),this._state=4)}getData(e){let t=n;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength)return void(this._loop=!1);t=this.consume(this._payloadLength),this._masked&&d(t,this._mask)}return this._opcode>7?this.controlMessage(t):this._compressed?(this._state=5,void this.decompress(t,e)):(t.length&&(this._messageLength=this._totalPayloadLength,this._fragments.push(t)),this.dataMessage())}decompress(e,t){this._extensions[r.extensionName].decompress(e,this._fin,(e,s)=>{if(e)return t(e);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0)return t(u(RangeError,"Max payload size exceeded",!1,1009));this._fragments.push(s)}const i=this.dataMessage();if(i)return t(i);this.startLoop(t)})}dataMessage(){if(this._fin){const e=this._messageLength,t=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._fragments=[],2===this._opcode){let s;s="nodebuffer"===this._binaryType?c(t,e):"arraybuffer"===this._binaryType?l(c(t,e)):t,this.emit("message",s)}else{const s=c(t,e);if(!_(s))return this._loop=!1,u(Error,"invalid UTF-8 sequence",!0,1007);this.emit("message",s.toString())}}this._state=0}controlMessage(e){if(8===this._opcode)if(this._loop=!1,0===e.length)this.emit("conclude",1005,""),this.end();else{if(1===e.length)return u(RangeError,"invalid payload length 1",!0,1002);{const t=e.readUInt16BE(0);if(!f(t))return u(RangeError,"invalid status code "+t,!0,1002);const s=e.slice(2);if(!_(s))return u(Error,"invalid UTF-8 sequence",!0,1007);this.emit("conclude",t,s.toString()),this.end()}}else 9===this._opcode?this.emit("ping",e):this.emit("pong",e);this._state=0}}},143:function(e,t,s){"use strict";try{const e=s(!function(){var e=new Error("Cannot find module 'utf-8-validate'");throw e.code="MODULE_NOT_FOUND",e}());t.isValidUTF8="object"==typeof e?e.Validation.isValidUTF8:e}catch(e){t.isValidUTF8=()=>!0}t.isValidStatusCode=e=>e>=1e3&&e<=1014&&1004!==e&&1005!==e&&1006!==e||e>=3e3&&e<=4999},144:function(e,t,s){"use strict";const{randomFillSync:i}=s(24),r=s(130),{EMPTY_BUFFER:o}=s(129),{isValidStatusCode:n}=s(143),{mask:a,toBuffer:h}=s(131),c=Buffer.alloc(4);class l{constructor(e,t){this._extensions=t||{},this._socket=e,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._deflating=!1,this._queue=[]}static frame(e,t){const s=t.mask&&t.readOnly;let r=t.mask?6:2,o=e.length;e.length>=65536?(r+=8,o=127):e.length>125&&(r+=2,o=126);const n=Buffer.allocUnsafe(s?e.length+r:r);return n[0]=t.fin?128|t.opcode:t.opcode,t.rsv1&&(n[0]|=64),n[1]=o,126===o?n.writeUInt16BE(e.length,2):127===o&&(n.writeUInt32BE(0,2),n.writeUInt32BE(e.length,6)),t.mask?(i(c,0,4),n[1]|=128,n[r-4]=c[0],n[r-3]=c[1],n[r-2]=c[2],n[r-1]=c[3],s?(a(e,c,n,r,e.length),[n]):(a(e,c,e,0,e.length),[n,e])):[n,e]}close(e,t,s,i){let r;if(void 0===e)r=o;else{if("number"!=typeof e||!n(e))throw new TypeError("First argument must be a valid error code number");if(void 0===t||""===t)r=Buffer.allocUnsafe(2),r.writeUInt16BE(e,0);else{const s=Buffer.byteLength(t);if(s>123)throw new RangeError("The message must not be greater than 123 bytes");r=Buffer.allocUnsafe(2+s),r.writeUInt16BE(e,0),r.write(t,2)}}this._deflating?this.enqueue([this.doClose,r,s,i]):this.doClose(r,s,i)}doClose(e,t,s){this.sendFrame(l.frame(e,{fin:!0,rsv1:!1,opcode:8,mask:t,readOnly:!1}),s)}ping(e,t,s){const i=h(e);if(i.length>125)throw new RangeError("The data size must not be greater than 125 bytes");this._deflating?this.enqueue([this.doPing,i,t,h.readOnly,s]):this.doPing(i,t,h.readOnly,s)}doPing(e,t,s,i){this.sendFrame(l.frame(e,{fin:!0,rsv1:!1,opcode:9,mask:t,readOnly:s}),i)}pong(e,t,s){const i=h(e);if(i.length>125)throw new RangeError("The data size must not be greater than 125 bytes");this._deflating?this.enqueue([this.doPong,i,t,h.readOnly,s]):this.doPong(i,t,h.readOnly,s)}doPong(e,t,s,i){this.sendFrame(l.frame(e,{fin:!0,rsv1:!1,opcode:10,mask:t,readOnly:s}),i)}send(e,t,s){const i=h(e),o=this._extensions[r.extensionName];let n=t.binary?2:1,a=t.compress;if(this._firstFragment?(this._firstFragment=!1,a&&o&&(a=i.length>=o._threshold),this._compress=a):(a=!1,n=0),t.fin&&(this._firstFragment=!0),o){const e={fin:t.fin,rsv1:a,opcode:n,mask:t.mask,readOnly:h.readOnly};this._deflating?this.enqueue([this.dispatch,i,this._compress,e,s]):this.dispatch(i,this._compress,e,s)}else this.sendFrame(l.frame(i,{fin:t.fin,rsv1:!1,opcode:n,mask:t.mask,readOnly:h.readOnly}),s)}dispatch(e,t,s,i){if(!t)return void this.sendFrame(l.frame(e,s),i);const o=this._extensions[r.extensionName];this._deflating=!0,o.compress(e,s.fin,(e,t)=>{if(this._socket.destroyed){const e=new Error("The socket was closed while data was being compressed");"function"==typeof i&&i(e);for(let t=0;t<this._queue.length;t++){const s=this._queue[t][4];"function"==typeof s&&s(e)}}else this._deflating=!1,s.readOnly=!1,this.sendFrame(l.frame(t,s),i),this.dequeue()})}dequeue(){for(;!this._deflating&&this._queue.length;){const e=this._queue.shift();this._bufferedBytes-=e[1].length,Reflect.apply(e[0],this,e.slice(1))}}enqueue(e){this._bufferedBytes+=e[1].length,this._queue.push(e)}sendFrame(e,t){2===e.length?(this._socket.cork(),this._socket.write(e[0]),this._socket.write(e[1],t),this._socket.uncork()):this._socket.write(e[0],t)}}e.exports=l},145:function(e,t,s){"use strict";const i=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function r(e,t,s){void 0===e[t]?e[t]=[s]:e[t].push(s)}e.exports={format:function(e){return Object.keys(e).map(t=>{let s=e[t];return Array.isArray(s)||(s=[s]),s.map(e=>[t].concat(Object.keys(e).map(t=>{let s=e[t];return Array.isArray(s)||(s=[s]),s.map(e=>!0===e?t:`${t}=${e}`).join("; ")})).join("; ")).join(", ")}).join(", ")},parse:function(e){const t=Object.create(null);if(void 0===e||""===e)return t;let s,o,n=Object.create(null),a=!1,h=!1,c=!1,l=-1,d=-1,f=0;for(;f<e.length;f++){const _=e.charCodeAt(f);if(void 0===s)if(-1===d&&1===i[_])-1===l&&(l=f);else if(32===_||9===_)-1===d&&-1!==l&&(d=f);else{if(59!==_&&44!==_)throw new SyntaxError("Unexpected character at index "+f);{if(-1===l)throw new SyntaxError("Unexpected character at index "+f);-1===d&&(d=f);const i=e.slice(l,d);44===_?(r(t,i,n),n=Object.create(null)):s=i,l=d=-1}}else if(void 0===o)if(-1===d&&1===i[_])-1===l&&(l=f);else if(32===_||9===_)-1===d&&-1!==l&&(d=f);else if(59===_||44===_){if(-1===l)throw new SyntaxError("Unexpected character at index "+f);-1===d&&(d=f),r(n,e.slice(l,d),!0),44===_&&(r(t,s,n),n=Object.create(null),s=void 0),l=d=-1}else{if(61!==_||-1===l||-1!==d)throw new SyntaxError("Unexpected character at index "+f);o=e.slice(l,f),l=d=-1}else if(h){if(1!==i[_])throw new SyntaxError("Unexpected character at index "+f);-1===l?l=f:a||(a=!0),h=!1}else if(c)if(1===i[_])-1===l&&(l=f);else if(34===_&&-1!==l)c=!1,d=f;else{if(92!==_)throw new SyntaxError("Unexpected character at index "+f);h=!0}else if(34===_&&61===e.charCodeAt(f-1))c=!0;else if(-1===d&&1===i[_])-1===l&&(l=f);else if(-1===l||32!==_&&9!==_){if(59!==_&&44!==_)throw new SyntaxError("Unexpected character at index "+f);{if(-1===l)throw new SyntaxError("Unexpected character at index "+f);-1===d&&(d=f);let i=e.slice(l,d);a&&(i=i.replace(/\\/g,""),a=!1),r(n,o,i),44===_&&(r(t,s,n),n=Object.create(null),s=void 0),o=void 0,l=d=-1}}else-1===d&&(d=f)}if(-1===l||c)throw new SyntaxError("Unexpected end of input");-1===d&&(d=f);const _=e.slice(l,d);return void 0===s?r(t,_,n):(void 0===o?r(n,_,!0):r(n,o,a?_.replace(/\\/g,""):_),r(t,s,n)),t}}},162:function(e,t,s){"use strict";const i=Symbol("kDone"),r=Symbol("kRun");e.exports=class{constructor(e){this[i]=()=>{this.pending--,this[r]()},this.concurrency=e||1/0,this.jobs=[],this.pending=0}add(e){this.jobs.push(e),this[r]()}[r](){if(this.pending!==this.concurrency&&this.jobs.length){const e=this.jobs.shift();this.pending++,e(this[i])}}}},163:function(e,t,s){"use strict";class i{constructor(e,t){this.target=t,this.type=e}}class r extends i{constructor(e,t){super("message",t),this.data=e}}class o extends i{constructor(e,t,s){super("close",s),this.wasClean=s._closeFrameReceived&&s._closeFrameSent,this.reason=t,this.code=e}}class n extends i{constructor(e){super("open",e)}}class a extends i{constructor(e,t){super("error",t),this.message=e.message,this.error=e}}const h={addEventListener(e,t){function s(e){t.call(this,new r(e,this))}function i(e,s){t.call(this,new o(e,s,this))}function h(e){t.call(this,new a(e,this))}function c(){t.call(this,new n(this))}"function"==typeof t&&("message"===e?(s._listener=t,this.on(e,s)):"close"===e?(i._listener=t,this.on(e,i)):"error"===e?(h._listener=t,this.on(e,h)):"open"===e?(c._listener=t,this.on(e,c)):this.on(e,t))},removeEventListener(e,t){const s=this.listeners(e);for(let i=0;i<s.length;i++)s[i]!==t&&s[i]._listener!==t||this.removeListener(e,s[i])}};e.exports=h},164:function(e,t,s){"use strict";const{Duplex:i}=s(8);function r(e){e.emit("close")}function o(){!this.destroyed&&this._writableState.finished&&this.destroy()}function n(e){this.removeListener("error",n),this.destroy(),0===this.listenerCount("error")&&this.emit("error",e)}e.exports=function(e,t){let s=!0;function a(){s&&e._socket.resume()}e.readyState===e.CONNECTING?e.once("open",(function(){e._receiver.removeAllListeners("drain"),e._receiver.on("drain",a)})):(e._receiver.removeAllListeners("drain"),e._receiver.on("drain",a));const h=new i({...t,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return e.on("message",(function(t){h.push(t)||(s=!1,e._socket.pause())})),e.once("error",(function(e){h.destroyed||h.destroy(e)})),e.once("close",(function(){h.destroyed||h.push(null)})),h._destroy=function(t,s){if(e.readyState===e.CLOSED)return s(t),void process.nextTick(r,h);let i=!1;e.once("error",(function(e){i=!0,s(e)})),e.once("close",(function(){i||s(t),process.nextTick(r,h)})),e.terminate()},h._final=function(t){e.readyState!==e.CONNECTING?null!==e._socket&&(e._socket._writableState.finished?(h._readableState.endEmitted&&h.destroy(),t()):(e._socket.once("finish",(function(){t()})),e.close())):e.once("open",(function(){h._final(t)}))},h._read=function(){e.readyState!==e.OPEN||s||(s=!0,e._receiver._writableState.needDrain||e._socket.resume())},h._write=function(t,s,i){e.readyState!==e.CONNECTING?e.send(t,i):e.once("open",(function(){h._write(t,s,i)}))},h.on("end",o),h.on("error",n),h}},165:function(e,t,s){"use strict";const i=s(32),{createHash:r}=s(24),{createServer:o,STATUS_CODES:n}=s(14),a=s(130),h=s(141),{format:c,parse:l}=s(145),{GUID:d}=s(129),f=/^[+/0-9A-Za-z]{22}==$/,_=Symbol("kUsedByWebSocketServer");function u(e){e.emit("close")}function p(){this.destroy()}function m(e,t,s,i){e.writable&&(s=s||n[t],i={Connection:"close","Content-type":"text/html","Content-Length":Buffer.byteLength(s),...i},e.write(`HTTP/1.1 ${t} ${n[t]}\r\n`+Object.keys(i).map(e=>`${e}: ${i[e]}`).join("\r\n")+"\r\n\r\n"+s)),e.removeListener("error",p),e.destroy()}e.exports=class extends i{constructor(e,t){if(super(),null==(e={maxPayload:104857600,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,...e}).port&&!e.server&&!e.noServer)throw new TypeError('One of the "port", "server", or "noServer" options must be specified');if(null!=e.port)this._server=o((e,t)=>{const s=n[426];t.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),t.end(s)}),this._server.listen(e.port,e.host,e.backlog,t);else if(e.server){if(e.server[_])throw new Error("The HTTP/S server is already being used by another WebSocket server");e.server[_]=!0,this._server=e.server}this._server&&(this._removeListeners=function(e,t){for(const s of Object.keys(t))e.on(s,t[s]);return function(){for(const s of Object.keys(t))e.removeListener(s,t[s])}}(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(e,t,s)=>{this.handleUpgrade(e,t,s,t=>{this.emit("connection",t,e)})}})),!0===e.perMessageDeflate&&(e.perMessageDeflate={}),e.clientTracking&&(this.clients=new Set),this.options=e}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(e){if(e&&this.once("close",e),this.clients)for(const e of this.clients)e.terminate();const t=this._server;if(t){if(this._removeListeners(),this._removeListeners=this._server=null,null!=this.options.port)return void t.close(()=>this.emit("close"));delete t[_]}process.nextTick(u,this)}shouldHandle(e){if(this.options.path){const t=e.url.indexOf("?");if((-1!==t?e.url.slice(0,t):e.url)!==this.options.path)return!1}return!0}handleUpgrade(e,t,s,i){t.on("error",p);const r=void 0!==e.headers["sec-websocket-key"]&&e.headers["sec-websocket-key"].trim(),o=+e.headers["sec-websocket-version"],n={};if("GET"!==e.method||"websocket"!==e.headers.upgrade.toLowerCase()||!r||!f.test(r)||8!==o&&13!==o||!this.shouldHandle(e))return m(t,400);if(this.options.perMessageDeflate){const s=new a(this.options.perMessageDeflate,!0,this.options.maxPayload);try{const t=l(e.headers["sec-websocket-extensions"]);t[a.extensionName]&&(s.accept(t[a.extensionName]),n[a.extensionName]=s)}catch(e){return m(t,400)}}if(this.options.verifyClient){const a={origin:e.headers[""+(8===o?"sec-websocket-origin":"origin")],secure:!(!e.connection.authorized&&!e.connection.encrypted),req:e};if(2===this.options.verifyClient.length)return void this.options.verifyClient(a,(o,a,h,c)=>{if(!o)return m(t,a||401,h,c);this.completeUpgrade(r,n,e,t,s,i)});if(!this.options.verifyClient(a))return m(t,401)}this.completeUpgrade(r,n,e,t,s,i)}completeUpgrade(e,t,s,i,o,n){if(!i.readable||!i.writable)return i.destroy();const l=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade","Sec-WebSocket-Accept: "+r("sha1").update(e+d).digest("base64")],f=new h(null);let _=s.headers["sec-websocket-protocol"];if(_&&(_=_.trim().split(/ *, */),_=this.options.handleProtocols?this.options.handleProtocols(_,s):_[0],_&&(l.push("Sec-WebSocket-Protocol: "+_),f.protocol=_)),t[a.extensionName]){const e=t[a.extensionName].params,s=c({[a.extensionName]:[e]});l.push("Sec-WebSocket-Extensions: "+s),f._extensions=t}this.emit("headers",l,s),i.write(l.concat("\r\n").join("\r\n")),i.removeListener("error",p),f.setSocket(i,o,this.options.maxPayload),this.clients&&(this.clients.add(f),f.on("close",()=>this.clients.delete(f))),n(f)}}},167:function(e,t,s){"use strict";const i=s(141);i.createWebSocketStream=s(164),i.Server=s(165),i.Receiver=s(142),i.Sender=s(144),e.exports=i}};