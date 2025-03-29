(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[177],{627:(e,t,r)=>{"use strict";r.d(t,{J:()=>c,UserProvider:()=>o});var n=r(5155),s=r(2115),a=r(3004),l=r(8915);let i=(0,s.createContext)(void 0);function o(e){let{children:t}=e,[r,o]=(0,s.useState)(null),[c,d]=(0,s.useState)(!0);(0,s.useEffect)(()=>{let e=(0,a.hg)(l.j,e=>{o(e),d(!1)});return()=>e()},[]);let u=async()=>{let e=new a.HF;try{await (0,a.df)(l.j,e)}catch(e){console.error("Error signing in with Google",e)}},m=async()=>{try{await (0,a.CI)(l.j)}catch(e){console.error("Error signing out",e)}};return(0,n.jsx)(i.Provider,{value:{user:r,loading:c,signInWithGoogle:u,logout:m},children:t})}function c(){let e=(0,s.useContext)(i);if(void 0===e)throw Error("useUser must be used within a UserProvider");return e}},1504:(e,t,r)=>{"use strict";r.d(t,{default:()=>m});var n=r(5155),s=r(2115),a=r(6874),l=r.n(a),i=r(6766),o=r(2895);let c=(0,o.A)("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),d=(0,o.A)("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]),u=e=>{let{href:t,children:r}=e;return(0,n.jsx)(l(),{href:t,className:"text-foreground hover:text-accent transition-colors duration-200 font-pixel py-2 px-4",children:r})};function m(){let[e,t]=(0,s.useState)(!1);return(0,n.jsxs)("header",{className:"bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50",children:[(0,n.jsx)("div",{className:"container mx-auto px-4 py-3",children:(0,n.jsxs)("div",{className:"flex justify-between items-center",children:[(0,n.jsxs)(l(),{href:"/",className:"flex items-center space-x-2",children:[(0,n.jsx)(i.default,{src:"/images/logo.png",alt:"Minecraft Server Logo",width:40,height:40,className:"pixelated"}),(0,n.jsx)("span",{className:"minecraft-style text-xl md:text-2xl text-accent",children:"Minecraft Server"})]}),(0,n.jsxs)("nav",{className:"hidden md:flex items-center space-x-1",children:[(0,n.jsx)(u,{href:"/",children:"Inicio"}),(0,n.jsx)(u,{href:"/modpack",children:"Modpack"}),(0,n.jsx)(u,{href:"/resource-packs",children:"Resource Packs"}),(0,n.jsx)(u,{href:"/server-info",children:"Server Info"}),(0,n.jsx)(u,{href:"/gallery",children:"Galer\xeda"})]}),(0,n.jsx)("button",{onClick:()=>{t(!e)},className:"md:hidden text-foreground hover:text-accent","aria-label":e?"Close Menu":"Open Menu",children:e?(0,n.jsx)(c,{size:24}):(0,n.jsx)(d,{size:24})})]})}),e&&(0,n.jsx)("div",{className:"md:hidden bg-background/95 backdrop-blur-sm",children:(0,n.jsx)("div",{className:"container mx-auto px-4 py-2",children:(0,n.jsxs)("nav",{className:"flex flex-col",children:[(0,n.jsx)(u,{href:"/",children:"Inicio"}),(0,n.jsx)(u,{href:"/modpack",children:"Modpack"}),(0,n.jsx)(u,{href:"/resource-packs",children:"Resource Packs"}),(0,n.jsx)(u,{href:"/server-info",children:"Server Info"}),(0,n.jsx)(u,{href:"/gallery",children:"Galer\xeda"})]})})})]})}},3813:(e,t,r)=>{"use strict";r.d(t,{default:()=>s});var n=r(2115);function s(){return(0,n.useEffect)(()=>{let e=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&e.target.classList.add("is-visible")})},{root:null,rootMargin:"0px",threshold:.1}),t=document.querySelectorAll(".fade-in-section");return t.forEach(t=>{e.observe(t)}),()=>{t.forEach(t=>{e.unobserve(t)})}},[]),null}},7198:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,9324,23)),Promise.resolve().then(r.bind(r,1504)),Promise.resolve().then(r.bind(r,3813)),Promise.resolve().then(r.bind(r,7956)),Promise.resolve().then(r.bind(r,627)),Promise.resolve().then(r.t.bind(r,6874,23)),Promise.resolve().then(r.t.bind(r,9840,23))},7956:(e,t,r)=>{"use strict";r.d(t,{ThemeProvider:()=>v});var n=r(5155),s=r(2115),a=r(8126),l=r.n(a);let i=(0,s.createContext)({setTheme:e=>{},themes:[]}),o=["light","dark"],c="(prefers-color-scheme: dark)",d=({forcedTheme:e,disableTransitionOnChange:t=!1,enableSystem:r=!0,enableColorScheme:n=!0,storageKey:a="theme",themes:l=["light","dark"],defaultTheme:d=r?"system":"light",attribute:v="data-theme",value:y,children:b})=>{let[x,p]=(0,s.useState)(()=>m(a,d)),[g,k]=(0,s.useState)(()=>m(a)),j=y?Object.values(y):l,w=(0,s.useCallback)(t=>{let r=f(t);k(r),"system"!==x||e||E(r,!1)},[x,e]),S=(0,s.useRef)(w);S.current=w;let E=(0,s.useCallback)((e,n=!0,s=!0)=>{let l=(null==y?void 0:y[e])||e,i=t&&s?h():null;if(n)try{localStorage.setItem(a,e)}catch(e){}if("system"===e&&r){let e=f();l=(null==y?void 0:y[e])||e}if(s){let e=document.documentElement;"class"===v?(e.classList.remove(...j),e.classList.add(l)):e.setAttribute(v,l),null==i||i()}},[]);(0,s.useEffect)(()=>{let e=function(){return S.current(...[].slice.call(arguments))},t=window.matchMedia(c);return t.addListener(e),e(t),()=>t.removeListener(e)},[]);let $=(0,s.useCallback)(t=>{e?E(t,!0,!1):E(t),p(t)},[e]);return(0,s.useEffect)(()=>{let e=e=>{e.key===a&&$(e.newValue||d)};return window.addEventListener("storage",e),()=>window.removeEventListener("storage",e)},[$]),(0,s.useEffect)(()=>{if(!n)return;let t=e&&o.includes(e)?e:x&&o.includes(x)?x:"system"===x&&g||null;document.documentElement.style.setProperty("color-scheme",t)},[n,x,g,e]),s.createElement(i.Provider,{value:{theme:x,setTheme:$,forcedTheme:e,resolvedTheme:"system"===x?g:x,themes:r?[...l,"system"]:l,systemTheme:r?g:void 0}},s.createElement(u,{forcedTheme:e,storageKey:a,attribute:v,value:y,enableSystem:r,defaultTheme:d,attrs:j}),b)},u=(0,s.memo)(({forcedTheme:e,storageKey:t,attribute:r,enableSystem:n,defaultTheme:a,value:i,attrs:o})=>{let d="class"===r?`var d=document.documentElement.classList;d.remove(${o.map(e=>`'${e}'`).join(",")});`:"var d=document.documentElement;",u=(e,t)=>{e=(null==i?void 0:i[e])||e;let n=t?e:`'${e}'`;return"class"===r?`d.add(${n})`:`d.setAttribute('${r}', ${n})`},m="system"===a;return s.createElement(l(),null,s.createElement("script",e?{key:"next-themes-script",dangerouslySetInnerHTML:{__html:`!function(){${d}${u(e)}}()`}}:n?{key:"next-themes-script",dangerouslySetInnerHTML:{__html:`!function(){try {${d}var e=localStorage.getItem('${t}');${m?"":u(a)+";"}if("system"===e||(!e&&${m})){var t="${c}",m=window.matchMedia(t);m.media!==t||m.matches?${u("dark")}:${u("light")}}else if(e) ${i?`var x=${JSON.stringify(i)};`:""}${u(i?"x[e]":"e",!0)}}catch(e){}}()`}}:{key:"next-themes-script",dangerouslySetInnerHTML:{__html:`!function(){try{${d}var e=localStorage.getItem("${t}");if(e){${i?`var x=${JSON.stringify(i)};`:""}${u(i?"x[e]":"e",!0)}}else{${u(a)};}}catch(t){}}();`}}))},(e,t)=>e.forcedTheme===t.forcedTheme),m=(e,t)=>{let r;if("undefined"!=typeof window){try{r=localStorage.getItem(e)||void 0}catch(e){}return r||t}},h=()=>{let e=document.createElement("style");return e.appendChild(document.createTextNode("*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}")),document.head.appendChild(e),()=>{window.getComputedStyle(document.body),setTimeout(()=>{document.head.removeChild(e)},1)}},f=e=>(e||(e=window.matchMedia(c)),e.matches?"dark":"light");function v(e){let{children:t,attribute:r="class",defaultTheme:s="system",enableSystem:a=!0,disableTransitionOnChange:l=!0}=e;return(0,n.jsx)(d,{attribute:r,defaultTheme:s,enableSystem:a,disableTransitionOnChange:l,children:t})}},8126:(e,t)=>{"use strict";function r(){return null}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return r}}),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},8915:(e,t,r)=>{"use strict";r.d(t,{I:()=>d,db:()=>c,j:()=>o});var n=r(3915),s=r(3004),a=r(5317),l=r(858);let i=0===(0,n.Dk)().length?(0,n.Wp)({apiKey:"AIzaSyDvvFlFM8dmjG6O5nKPYcvozK7Zcb1_hp4",authDomain:"minecraft-bb9e9.firebaseapp.com",projectId:"minecraft-bb9e9",storageBucket:"minecraft-bb9e9.firebasestorage.app",messagingSenderId:"698454827695",appId:"1:698454827695:web:b30f31ee8a3c6779816a5a"}):(0,n.Dk)()[0],o=(0,s.xI)(i),c=(0,a.aU)(i),d=(0,l.c7)(i)},9324:()=>{},9840:e=>{e.exports={style:{fontFamily:"'Inter', 'Inter Fallback'",fontStyle:"normal"},className:"__className_d65c78"}}},e=>{var t=t=>e(e.s=t);e.O(0,[385,992,416,766,221,874,441,684,358],()=>t(7198)),_N_E=e.O()}]);