import{a as u,i as m}from"./assets/vendor-09e9ce67.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const p="34183699-29109d6fbf2dd60241f6d6e15",f="https://pixabay.com/api/",g=n=>u.get(`${f}?key=${p}&q=${n}&image_type="photo"&orientation="horizontal"&safesearch=true&per_page=40`).then(r=>{if(!r.data)throw new Error;return r.data}),h=document.getElementById("search-form"),i=document.querySelector(".gallery"),c=document.querySelector(".load-more"),y=n=>n.map(({webformatURL:o,largeImageURL:a,likes:e,views:t,comments:s,downloads:l,tags:d})=>`<div class="photo-card">
    <img src="${o}" alt="${d}" loading="lazy" width="480"/>
    <div class="info">
        <p class="info-item">
            <b>Likes</b>
            <span>${e}</span>
        </p>
            <p class="info-item">
        <b>Views</b>
        <span>${t}</span>
        </p>
        <p class="info-item">
            <b>Comments</b>
            <span>${s}</span>
        </p>
        <p class="info-item">
            <b>Downloads</b>
            <span>${l}</span>
        </p>
    </div>
</div>`).join(""),b=async n=>{n.preventDefault();const{value:r}=n.currentTarget.elements.searchQuery;try{const{hits:o}=await g(r);console.log(o),(!o||o.length===0)&&m.warning({message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight"}),i.classList.remove("is-hidden"),i.insertAdjacentHTML("beforeend",y(o)),c.classList.remove("is-hidden")}catch(o){console.log(o)}},L=async()=>{};h.addEventListener("submit",b);c.addEventListener("click",L);
//# sourceMappingURL=commonHelpers.js.map
