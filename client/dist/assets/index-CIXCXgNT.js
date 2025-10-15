(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function r(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(o){if(o.ep)return;o.ep=!0;const i=r(o);fetch(o.href,i)}})();class R{constructor(e,r={}){let n=document.getElementById(e);n||(n=document.createElement("div"),console.warn(`Element with id "${e}" not found. Creating a new div as root.`),document.body.appendChild(n)),this.root=n,this.routes=[],this.layouts={},this.currentRoute=null,this.isAuthenticated=!1,this.loginPath=r.loginPath||"/login",window.addEventListener("popstate",()=>this.handleRoute()),document.addEventListener("click",o=>{o.target.matches("[data-link]")&&(o.preventDefault(),this.navigate(o.target.getAttribute("href")))})}setAuth(e){this.isAuthenticated=e}addLayout(e,r){return this.layouts[e]=r,this}findLayout(e){let r=null,n=0;for(const[o,i]of Object.entries(this.layouts))e.startsWith(o)&&o.length>n&&(r=i,n=o.length);return r}addRoute(e,r,n={}){const o=this.pathToRegex(e),i=this.extractParams(e);return this.routes.push({path:e,regex:o,keys:i,handler:r,requireAuth:n.requireAuth||!1,useLayout:n.useLayout!==!1}),this}pathToRegex(e){if(e==="*")return/.*/;const r=e.replace(/\//g,"\\/").replace(/:(\w+)/g,"([^\\/]+)").replace(/\*/g,".*");return new RegExp("^"+r+"$")}extractParams(e){const r=[],n=e.matchAll(/:(\w+)/g);for(const o of n)r.push(o[1]);return r}getParams(e,r){const n=r.match(e.regex);if(!n)return{};const o={};return e.keys.forEach((i,s)=>{o[i]=n[s+1]}),o}navigate(e){window.history.pushState(null,null,e),this.handleRoute()}handleRoute(){const e=window.location.pathname;for(const n of this.routes)if(n.regex.test(e)){if(n.requireAuth&&!this.isAuthenticated){sessionStorage.setItem("redirectAfterLogin",e),this.navigate(this.loginPath);return}this.currentRoute=e;const o=this.getParams(n,e),i=n.handler(o);i instanceof Promise?i.then(s=>{this.renderContent(s,n,e)}):this.renderContent(i,n,e);return}const r=this.routes.find(n=>n.path==="*");if(r){const n=r.handler({});this.root.innerHTML=n}}renderContent(e,r,n){const o=e instanceof DocumentFragment;if(r.useLayout){const i=this.findLayout(n);if(i){const s=i(),g=s.querySelector("slot");if(g)if(o)g.replaceWith(e);else{const v=document.createElement("template");v.innerHTML=e,g.replaceWith(v.content)}else console.warn("Layout does not contain a <slot> element. Content will not be inserted.");this.root.innerHTML="",this.root.appendChild(s)}else o?(this.root.innerHTML="",this.root.appendChild(e)):this.root.innerHTML=e}else o?(this.root.innerHTML="",this.root.appendChild(e)):this.root.innerHTML=e;this.attachEventListeners(n)}attachEventListeners(e){const r=document.getElementById("loginBtn");r&&r.addEventListener("click",()=>{this.login()});const n=document.getElementById("logoutBtn");n&&n.addEventListener("click",()=>{this.logout()})}login(){this.setAuth(!0);const e=sessionStorage.getItem("redirectAfterLogin");sessionStorage.removeItem("redirectAfterLogin"),this.navigate(e||"/dashboard")}logout(){this.setAuth(!1),this.navigate(this.loginPath)}start(){this.handleRoute()}}const S=`<div class="mx-auto max-w-4xl p-6">\r
  <h1 class="mb-6 text-4xl font-bold text-gray-900">À propos</h1>\r
  <p class="mb-6 text-lg text-gray-700">\r
    Base de code pour la SAE 3.01. Octobre 2025</p>\r
<p class="mb-6 text-lg text-gray-700">\r
    Se référer à la documentation pour comprendre comment l'utiliser\r
    </p>\r
   \r
</div>`;function k(){return S}const q=`<div class="mx-auto max-w-4xl p-6">\r
  <h1 class="mb-6 text-4xl font-bold text-gray-900">Accueil</h1>\r
  \r
<img \r
    src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=400&fit=crop" \r
    alt="Image d'accueil - Shopping" \r
    class="mb-6 rounded-lg shadow-lg w-full h-64 object-cover"\r
    style="filter: grayscale(1);"\r
  />\r
\r
  <p>\r
    Bienvenue sur notre plateforme de Click & Collect ! Découvrez une sélection variée de produits et profitez d'une expérience d'achat simple et rapide.\r
  </p>\r
</div>\r
`;function C(){return q}let M="http://mmi.unilim.fr/~pain11/SAE301/api/",P=async function(t){let e={method:"GET"};try{var r=await fetch(M+t,e)}catch(o){return console.error("Echec de la requête : "+o),!1}return r.status!=200?(console.error("Erreur de requête : "+r.status),!1):await r.json()},m={},L=[{id:1,name:"Marteau",description:"Un marteau est un outil utilisé pour enfoncer des clous dans du bois ou d'autres matériaux. Il se compose d'une tête lourde en métal fixée à un manche en bois ou en fibre de verre.",price:9.99},{id:2,name:"Tournevis",description:"Un tournevis est un outil utilisé pour visser ou dévisser des vis. Il se compose d'une tige en métal avec une tête qui s'adapte à la fente de la vis.",price:5.99},{id:3,name:"Clé à molette",description:"Une clé à molette est un outil utilisé pour serrer ou desserrer des écrous et des boulons. Elle se compose d'une mâchoire réglable qui s'adapte à différentes tailles d'écrous.",price:12.99},{id:4,name:"Pince",description:"Une pince est un outil utilisé pour saisir, tenir ou plier des objets. Elle se compose de deux bras articulés qui se rejoignent en un point de pivot.",price:7.99},{id:5,name:"Scie",description:"Une scie est un outil utilisé pour couper des matériaux, généralement en bois. Elle se compose d'une lame dentée fixée à un manche.",price:14.99},{id:6,name:"Perceuse",description:"Une perceuse est un outil utilisé pour percer des trous dans divers matériaux. Elle se compose d'un moteur qui fait tourner une mèche.",price:49.99},{id:7,name:"Ponceuse",description:"Une ponceuse est un outil utilisé pour lisser des surfaces en bois ou en métal. Elle se compose d'un moteur qui fait vibrer ou tourner un abrasif.",price:79.99},{id:8,name:"Mètre",description:"Un mètre est un outil utilisé pour mesurer des distances. Il se compose d'une bande graduée en métal ou en plastique.",price:19.99},{id:9,name:"Niveau à bulle",description:"Un niveau à bulle est un outil utilisé pour vérifier l'horizontalité ou la verticalité d'une surface. Il se compose d'un tube rempli de liquide avec une bulle d'air à l'intérieur.",price:9.99}];m.fetch=async function(t){let e=await P("products/"+t);return e==!1?L.pop():[e]};m.fetchAll=async function(){let t=await P("products");return t==!1?L:t};let d=function(t,e){let r=t;for(let n in e)r=r.replaceAll(new RegExp("{{"+n+"}}","g"),e[n]);return r};function a(t){const e=document.createElement("template");return e.innerHTML=t.trim(),e.content}function y(t){return`/src/assets/${t}`}const I=`<div class="max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">\r
\r
  <div class="flex flex-wrap flex-row justify-center gap-4">\r
\r
    <a href="/products/{{id}}/{{name}}" class="group block w-[292px] ">\r
      <div class="overflow-hidden bg-[#FBF8F3]">\r
        <img\r
                class="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"\r
                src="{{imageUrl}}"\r
                alt="Image de {{name}}"\r
        >\r
      </div>\r
      <div class="pt-4">\r
        <h3 class="text-xl font-normal text-zinc-800">{{name}}</h3>\r
        <p class="mt-1 text-sm text-zinc-600">{{price}} €</p>\r
      </div>\r
    </a>\r
\r
  </div>\r
</div>`;let E={html:function(t){let e='<div style="display: flex; flex-wrap: wrap; flex-direction: row; gap: 1rem;">';for(let r of t)e+=d(I,r);return e+"</div>"},dom:function(t){return a(E.html(t))}};const $=`<div>\r
  <slot name="products"></slot>\r
</div>\r
`;let x={products:[]},h={};h.handler_clickOnProduct=function(t){if(t.target.dataset.buy!==void 0){let e=t.target.dataset.buy;alert(`Le produit d'identifiant ${e} ? Excellent choix !`)}};h.init=async function(){return x.products=await m.fetchAll(),u.init(x.products)};let u={};u.init=function(t){let e=u.createPageFragment(t);return u.attachEvents(e),e};u.createPageFragment=function(t){let e=a($),r=E.dom(t);return e.querySelector('slot[name="products"]').replaceWith(r),e};u.attachEvents=function(t){return t.firstElementChild.addEventListener("click",h.handler_clickOnProduct),t};function j(t){return console.log("ProductsPage",t),h.init()}const F=`<article class="mx-auto max-w-2xl rounded-lg bg-white p-8 shadow-lg">\r
  <!-- Placeholder pour l'image du produit -->\r
  <div class="mb-6 flex h-64 items-center justify-center rounded-lg bg-gray-200">\r
    <svg class="h-20 w-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">\r
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>\r
    </svg>\r
  </div>\r
  \r
  <div class="mb-2 text-sm font-medium text-gray-500">ID: {{id}}</div>\r
  <h1 class="mb-4 text-3xl font-bold text-gray-900">{{name}}</h1>\r
  <p class="mb-6 text-lg text-gray-700">{{description}}</p>\r
  \r
  <div class="mb-6">\r
    <span class="text-2xl font-bold text-green-600">{{price}} €</span>\r
  </div>\r
  \r
  <button \r
    data-buy="{{id}}" \r
    class="w-full rounded-lg bg-green-600 px-6 py-3 text-lg font-semibold text-white transition hover:bg-green-700"\r
  >\r
    Ajouter au panier\r
  </button>\r
</article>\r
`;let A={html:function(t){return d(F,t)},dom:function(t){return a(A.html(t))}};const T=`<div>\r
<h1 style="font-size: 2rem; font-weight: bold; margin-bottom: 2rem; color: #111; text-align: center;">Allez, click click ! On achète !</h1>\r
   <slot name="detail"></slot>\r
</div>\r
`;let p={products:[]};p.getProductById=function(t){return p.products.find(e=>e.id==t)};let f={};f.handler_clickOnProduct=function(t){t.target.dataset.buy!==void 0&&(t.target.dataset.buy,alert("Produit ajouté au panier ! (Quand il y en aura un)"))};f.init=async function(t){const e=t.id;p.products=await m.fetchAll();let r=p.getProductById(e);return console.log("Product loaded:",r),c.init(r)};let c={};c.init=function(t){let e=c.createPageFragment(t);return c.attachEvents(e),e};c.createPageFragment=function(t){let e=a(T),r=A.dom(t);return e.querySelector('slot[name="detail"]').replaceWith(r),e};c.attachEvents=function(t){return t.querySelector("[data-buy]").addEventListener("click",f.handler_clickOnProduct),t};function B(t){return console.log("ProductDetailPage",t),f.init(t)}const O=`<div style="min-height: 100vh; display: flex; flex-direction: column; background-color: #E2D8CE">\r
    <slot name="header"></slot>\r
    <main style="flex: 1; padding: 0rem; ">\r
        <slot></slot>\r
    </main>\r
    <slot name="footer"></slot>\r
</div>\r
    `,b=`<header>\r
    <div class="bg-[#e0ddd9] py-2 flex justify-center">\r
        <img src="{{logoSrc}}" alt="Logo Hermès" class="h-8" />\r
    </div>\r
\r
    <div class="bg-[#e0ddd9] py-1">\r
        <nav>\r
            <ul class="flex justify-center">\r
                <li>\r
                    <a\r
                            href="/products"\r
                            class="text-xs text-gray-800 tracking-widest uppercase hover:text-gray-600 transition-colors duration-300">\r
                        Voir tous les produits\r
                    </a>\r
                </li>\r
            </ul>\r
        </nav>\r
    </div>\r
</header>`;let H={html:function(){return d(b,{logoSrc:y("Logo.png")})},dom:function(){return a(d(b,{logoSrc:y("Logo.png")}))}};const w=`<footer style="background: #f5f5f5; padding: 1rem; text-align: center;">\r
    <p style="margin: 0;">&copy; 2025 - MMI - SAE 3.01</p>\r
</footer>\r
`;let D={html:function(){return w},dom:function(){return a(w)}};function U(){let t=a(O),e=H.dom(),r=D.dom();return t.querySelector('slot[name="header"]').replaceWith(e),t.querySelector('slot[name="footer"]').replaceWith(r),t}const z=` <section>\r
    <h1>404 - Page non trouvée</h1>\r
        <p>Cette page n'existe pas</p>\r
    <nav>\r
        <a href="/" data-link>Retour à l'accueil</a>\r
    </nav>\r
</section>`;function V(){return z}const l=new R("app");l.addLayout("/",U);l.addRoute("/",C);l.addRoute("/about",k);l.addRoute("/products",j);l.addRoute("/products/:id/:slug",B);l.addRoute("*",V);l.start();
