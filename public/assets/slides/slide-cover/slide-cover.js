/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),e=new WeakMap;let o=class{constructor(t,i,e){if(this._$cssResult$=!0,e!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=i}get styleSheet(){let t=this.o;const s=this.t;if(i&&void 0===t){const i=void 0!==s&&1===s.length;i&&(t=e.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&e.set(s,t))}return t}toString(){return this.cssText}};const r=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let i="";for(const s of t.cssRules)i+=s.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(i)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,{is:n,defineProperty:h,getOwnPropertyDescriptor:l,getOwnPropertyNames:c,getOwnPropertySymbols:a,getPrototypeOf:d}=Object,u=globalThis,f=u.trustedTypes,p=f?f.emptyScript:"",v=u.reactiveElementPolyfillSupport,g=(t,i)=>t,b={toAttribute(t,i){switch(i){case Boolean:t=t?p:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},y=(t,i)=>!n(t,i),m={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;class w extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,i=m){if(i.state&&(i.attribute=!1),this._$Ei(),this.elementProperties.set(t,i),!i.noAccessor){const s=Symbol(),e=this.getPropertyDescriptor(t,s,i);void 0!==e&&h(this.prototype,t,e)}}static getPropertyDescriptor(t,i,s){const{get:e,set:o}=l(this.prototype,t)??{get(){return this[i]},set(t){this[i]=t}};return{get(){return e?.call(this)},set(i){const r=e?.call(this);o.call(this,i),this.requestUpdate(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??m}static _$Ei(){if(this.hasOwnProperty(g("elementProperties")))return;const t=d(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(g("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(g("properties"))){const t=this.properties,i=[...c(t),...a(t)];for(const s of i)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const i=litPropertyMetadata.get(t);if(void 0!==i)for(const[t,s]of i)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const s=this._$Eu(t,i);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const i=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)i.unshift(r(t))}else void 0!==t&&i.push(r(t));return i}static _$Eu(t,i){const s=i.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,i=this.constructor.elementProperties;for(const s of i.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const s=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((s,e)=>{if(i)s.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const i of e){const e=document.createElement("style"),o=t.litNonce;void 0!==o&&e.setAttribute("nonce",o),e.textContent=i.cssText,s.appendChild(e)}})(s,this.constructor.elementStyles),s}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,i,s){this._$AK(t,s)}_$EC(t,i){const s=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,s);if(void 0!==e&&!0===s.reflect){const o=(void 0!==s.converter?.toAttribute?s.converter:b).toAttribute(i,s.type);this._$Em=t,null==o?this.removeAttribute(e):this.setAttribute(e,o),this._$Em=null}}_$AK(t,i){const s=this.constructor,e=s._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=s.getPropertyOptions(e),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=e,this[e]=o.fromAttribute(i,t.type),this._$Em=null}}requestUpdate(t,i,s){if(void 0!==t){if(s??=this.constructor.getPropertyOptions(t),!(s.hasChanged??y)(this[t],i))return;this.P(t,i,s)}!1===this.isUpdatePending&&(this._$ES=this._$ET())}P(t,i,s){this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,i]of this._$Ep)this[t]=i;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[i,s]of t)!0!==s.wrapped||this._$AL.has(i)||void 0===this[i]||this.P(i,this[i],s)}let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(i)):this._$EU()}catch(i){throw t=!1,this._$EU(),i}t&&this._$AE(i)}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EC(t,this[t]))),this._$EU()}updated(t){}firstUpdated(t){}}w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[g("elementProperties")]=new Map,w[g("finalized")]=new Map,v?.({ReactiveElement:w}),(u.reactiveElementVersions??=[]).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $=globalThis,S=$.trustedTypes,x=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,_="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+A,k=`<${C}>`,E=document,T=()=>E.createComment(""),z=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,M="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,P=/-->/g,j=/>/g,N=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,I=/"/g,L=/^(?:script|style|textarea|title)$/i,D=(t=>(i,...s)=>({_$litType$:t,strings:i,values:s}))(1),H=Symbol.for("lit-noChange"),J=Symbol.for("lit-nothing"),W=new WeakMap,B=E.createTreeWalker(E,129);function Z(t,i){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==x?x.createHTML(i):i}const q=(t,i)=>{const s=t.length-1,e=[];let o,r=2===i?"<svg>":"",n=O;for(let i=0;i<s;i++){const s=t[i];let h,l,c=-1,a=0;for(;a<s.length&&(n.lastIndex=a,l=n.exec(s),null!==l);)a=n.lastIndex,n===O?"!--"===l[1]?n=P:void 0!==l[1]?n=j:void 0!==l[2]?(L.test(l[2])&&(o=RegExp("</"+l[2],"g")),n=N):void 0!==l[3]&&(n=N):n===N?">"===l[0]?(n=o??O,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,h=l[1],n=void 0===l[3]?N:'"'===l[3]?I:R):n===I||n===R?n=N:n===P||n===j?n=O:(n=N,o=void 0);const d=n===N&&t[i+1].startsWith("/>")?" ":"";r+=n===O?s+k:c>=0?(e.push(h),s.slice(0,c)+_+s.slice(c)+A+d):s+A+(-2===c?i:d)}return[Z(t,r+(t[s]||"<?>")+(2===i?"</svg>":"")),e]};class K{constructor({strings:t,_$litType$:i},s){let e;this.parts=[];let o=0,r=0;const n=t.length-1,h=this.parts,[l,c]=q(t,i);if(this.el=K.createElement(l,s),B.currentNode=this.el.content,2===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(e=B.nextNode())&&h.length<n;){if(1===e.nodeType){if(e.hasAttributes())for(const t of e.getAttributeNames())if(t.endsWith(_)){const i=c[r++],s=e.getAttribute(t).split(A),n=/([.?@])?(.*)/.exec(i);h.push({type:1,index:o,name:n[2],strings:s,ctor:"."===n[1]?Q:"?"===n[1]?Y:"@"===n[1]?tt:G}),e.removeAttribute(t)}else t.startsWith(A)&&(h.push({type:6,index:o}),e.removeAttribute(t));if(L.test(e.tagName)){const t=e.textContent.split(A),i=t.length-1;if(i>0){e.textContent=S?S.emptyScript:"";for(let s=0;s<i;s++)e.append(t[s],T()),B.nextNode(),h.push({type:2,index:++o});e.append(t[i],T())}}}else if(8===e.nodeType)if(e.data===C)h.push({type:2,index:o});else{let t=-1;for(;-1!==(t=e.data.indexOf(A,t+1));)h.push({type:7,index:o}),t+=A.length-1}o++}}static createElement(t,i){const s=E.createElement("template");return s.innerHTML=t,s}}function V(t,i,s=t,e){if(i===H)return i;let o=void 0!==e?s._$Co?.[e]:s._$Cl;const r=z(i)?void 0:i._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),void 0===r?o=void 0:(o=new r(t),o._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=o:s._$Cl=o),void 0!==o&&(i=V(t,o._$AS(t,i.values),o,e)),i}class X{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??E).importNode(i,!0);B.currentNode=e;let o=B.nextNode(),r=0,n=0,h=s[0];for(;void 0!==h;){if(r===h.index){let i;2===h.type?i=new F(o,o.nextSibling,this,t):1===h.type?i=new h.ctor(o,h.name,h.strings,this,t):6===h.type&&(i=new it(o,this,t)),this._$AV.push(i),h=s[++n]}r!==h?.index&&(o=B.nextNode(),r++)}return B.currentNode=E,e}p(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++}}class F{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=J,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=V(this,t,i),z(t)?t===J||null==t||""===t?(this._$AH!==J&&this._$AR(),this._$AH=J):t!==this._$AH&&t!==H&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}S(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.S(t))}_(t){this._$AH!==J&&z(this._$AH)?this._$AA.nextSibling.data=t:this.T(E.createTextNode(t)),this._$AH=t}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=K.createElement(Z(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else{const t=new X(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t}}_$AC(t){let i=W.get(t.strings);return void 0===i&&W.set(t.strings,i=new K(t)),i}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new F(this.S(T()),this.S(T()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e)}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class G{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,o){this.type=1,this._$AH=J,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=J}_$AI(t,i=this,s,e){const o=this.strings;let r=!1;if(void 0===o)t=V(this,t,i,0),r=!z(t)||t!==this._$AH&&t!==H,r&&(this._$AH=t);else{const e=t;let n,h;for(t=o[0],n=0;n<o.length-1;n++)h=V(this,e[s+n],i,n),h===H&&(h=this._$AH[n]),r||=!z(h)||h!==this._$AH[n],h===J?t=J:t!==J&&(t+=(h??"")+o[n+1]),this._$AH[n]=h}r&&!e&&this.j(t)}j(t){t===J?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Q extends G{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===J?void 0:t}}class Y extends G{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==J)}}class tt extends G{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5}_$AI(t,i=this){if((t=V(this,t,i,0)??J)===H)return;const s=this._$AH,e=t===J&&s!==J||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==J&&(s===J||e);e&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){V(this,t)}}const st=$.litHtmlPolyfillSupport;st?.(K,F),($.litHtmlVersions??=[]).push("3.1.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class et extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,i,s)=>{const e=s?.renderBefore??i;let o=e._$litPart$;if(void 0===o){const t=s?.renderBefore??null;e._$litPart$=o=new F(i.insertBefore(T(),t),t,void 0,s??{})}return o._$AI(t),o})(i,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return H}}et._$litElement$=!0,et.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:et});const ot=globalThis.litElementPolyfillSupport;ot?.({LitElement:et}),(globalThis.litElementVersions??=[]).push("4.0.6");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const rt={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:y},nt=(t=rt,i,s)=>{const{kind:e,metadata:o}=s;let r=globalThis.litPropertyMetadata.get(o);if(void 0===r&&globalThis.litPropertyMetadata.set(o,r=new Map),r.set(s.name,t),"accessor"===e){const{name:e}=s;return{set(s){const o=i.get.call(this);i.set.call(this,s),this.requestUpdate(e,o,t)},init(i){return void 0!==i&&this.P(e,void 0,t),i}}}if("setter"===e){const{name:e}=s;return function(s){const o=this[e];i.call(this,s),this.requestUpdate(e,o,t)}}throw Error("Unsupported decorator location: "+e)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ht=2;class lt{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,i,s){this._$Ct=t,this._$AM=i,this._$Ci=s}_$AS(t,i){return this.update(t,i)}update(t,i){return this.render(...i)}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ct extends lt{constructor(t){if(super(t),this.it=J,t.type!==ht)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===J||null==t)return this._t=void 0,this.it=t;if(t===H)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const i=[t];return i.raw=i,this._t={_$litType$:this.constructor.resultType,strings:i,values:[]}}}ct.directiveName="unsafeHTML",ct.resultType=1;const at=(t=>(...i)=>({_$litDirective$:t,values:i}))(ct);var dt=function(t,i,s,e){for(var o,r=arguments.length,n=r<3?i:null===e?e=Object.getOwnPropertyDescriptor(i,s):e,h=t.length-1;h>=0;h--)(o=t[h])&&(n=(r<3?o(n):r>3?o(i,s,n):o(i,s))||n);return r>3&&n&&Object.defineProperty(i,s,n),n};let ut=class extends et{constructor(){super(...arguments),this._content={title:"",author:"",background:"",image1:"",image2:"",text1:"",text2:""},this.content=""}attributeChangedCallback(t,i,s){if(super.attributeChangedCallback(t,i,s),"content"===t)null!==s&&(this._content={...JSON.parse(s)})}render(){const t=document.querySelector("body");return t?.style.setProperty("--background-image",`url(${this._content.background}`),D`
      <div class="slide--wrapper">
        <div class="slide--panel"></div>
        <div class="slide--title-wrapper">
          <div class="slide--title">${this._content.title}</div>
        </div>
        <div class="slide--sections">
          <div class="slide--section section-1">
            <img class="image" src="${this._content.image1}" />
            <div class="text">${at(this._content.text1)}</div>
          </div>
          <div class="slide--section section-2">
            <img class="image" src="${this._content.image2}" />
            <div class="text">${at(this._content.text2)}</div>
          </div>
        </div>
      </div>
    `}};ut.styles=((t,...i)=>{const e=1===t.length?t[0]:i.reduce(((i,s,e)=>i+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[e+1]),t[0]);return new o(e,t,s)})`
    .slide--wrapper {
      --foreground-color: #69f0ae;
      --overlay-width: 25vw;

      line-height: 1.15;
      color: var(--foreground-color);
      font-family: Arial, sans-serif;
      box-sizing: border-box;

      display: block;
      position: fixed;
      left: 0;
      top: 0;
      width: 100vw;
      height: 100vh;
      background-image: var(--background-image);
      background-repeat: no-repeat;
      background-size: cover;
    }
    .slide--panel {
      z-index: 1;
      display: block;
      position: fixed;
      left: var(--overlay-width);
      top: 0;
      width: calc(100vw - var(--overlay-width));
      height: 100vh;
      background: rgba(100, 100, 100, 0.25);
      border-left: 10px solid var(--foreground-color);
      box-sizing: border-box;
    }
    .slide--title-wrapper {
      position: fixed;
      left: var(--overlay-width);
      bottom: 0;
      display: inline-flex;
      height: 100vh;
      align-items: center;
      box-sizing: border-box;
    }
    .slide--title {
      position: relative;
      transform-origin: left bottom;
      transform: rotate(-90deg) translateX(-50%);
      font-size: 3em;
      font-weight: bold;
      right: 0.25em;
      box-sizing: border-box;
    }
    .slide--sections {
      position: fixed;
      display: inline-flex;
      flex-direction: column;
      justify-content: center;
      gap: 3em;
      left: var(--overlay-width);
      top: 0;
      width: calc(100vw - var(--overlay-width));
      height: 100vh;
      padding: 4em 12em 4em 8em;
      box-sizing: border-box;
    }
    .slide--section {
      display: flex;
      flex-direction: row;
      align-items: center;
      box-sizing: border-box;
      gap: 2em;
    }
    .slide--section .text {
      font-size: 1.4em;
    }

    .bold {
      font-weight: bold;
    }
  `,dt([function(t){return(i,s)=>"object"==typeof s?nt(t,i,s):((t,i,s)=>{const e=i.hasOwnProperty(s);return i.constructor.createProperty(s,e?{...t,wrapped:!0}:t),e?Object.getOwnPropertyDescriptor(i,s):void 0})(t,i,s)}({type:String})],ut.prototype,"content",void 0),ut=dt([(t=>(i,s)=>{void 0!==s?s.addInitializer((()=>{customElements.define(t,i)})):customElements.define(t,i)})("slide-cover")],ut);export{ut as SlideCover};
