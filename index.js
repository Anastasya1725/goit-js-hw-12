import{a as w,S,i as s}from"./assets/vendor-koyFXKdT.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function a(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=a(r);fetch(r.href,o)}})();const P="48840167-f96030b4e497eb15a171d5d1f",q="https://pixabay.com/api/",v=40;async function p(t,e=1){try{return(await w.get(q,{params:{key:P,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:v,page:e}})).data}catch(a){return console.error("Error fetching data from Pixabay:",a),{hits:[],totalHits:0}}}let C=new S(".gallery a");function b(t,e=!1){const a=document.querySelector(".gallery");if(e&&(a.innerHTML=""),t.length===0){s.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"});return}const n=document.createDocumentFragment();t.forEach(r=>{const o=_(r);n.appendChild(o)}),a.appendChild(n),C.refresh(),e||R()}function _(t){const{webformatURL:e,largeImageURL:a,tags:n,likes:r,views:o,comments:l,downloads:E}=t,c=document.createElement("div");c.classList.add("gallery__item");const d=document.createElement("a");d.href=a,d.setAttribute("data-lightbox","gallery");const g=document.createElement("img");g.src=e,g.alt=n,d.appendChild(g),c.appendChild(d);const h=document.createElement("div");return h.classList.add("info"),h.innerHTML=`
    <p class="info-item"><b>Likes:</b> ${r}</p>
    <p class="info-item"><b>Views:</b> ${o}</p>
    <p class="info-item"><b>Comments:</b> ${l}</p>
    <p class="info-item"><b>Downloads:</b> ${E}</p>
  `,c.appendChild(h),c}function m(t){const e=document.querySelector(".loader");e&&(e.style.display=t?"block":"none")}function u(t){const e=document.querySelector("#load-more");e&&e.classList.toggle("hidden",!t)}function R(){const t=document.querySelector(".gallery__item");if(t){const e=t.getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}}let f="",i=1;const L=40;let y=0;const x=document.querySelector("#search-form"),H=document.querySelector("#load-more");x.addEventListener("submit",async t=>{if(t.preventDefault(),f=document.querySelector("#search-query").value.trim(),f===""){s.error({title:"Error",message:"Please enter a search query!"});return}i=1,m(!0),u(!1),document.querySelector(".gallery").innerHTML="";try{const e=await p(f,i);y=e.totalHits,b(e.hits,!0),e.hits.length>0&&i*L<y?u(!0):(u(!1),s.info({title:"End of Results",message:"We're sorry, but you've reached the end of search results."}))}catch{s.error({title:"Error",message:"Something went wrong. Please try again later."})}finally{m(!1)}});H.addEventListener("click",async()=>{i++,m(!0);try{const t=await p(f,i);b(t.hits,!1),i*L>=y&&(u(!1),s.info({title:"End of Results",message:"We're sorry, but you've reached the end of search results."}))}catch{s.error({title:"Error",message:"Something went wrong. Please try again later."})}finally{m(!1)}});
//# sourceMappingURL=index.js.map
