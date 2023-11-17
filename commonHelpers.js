import{a as m,i as f,S as h}from"./assets/vendor-c835c9e9.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const p="34183699-29109d6fbf2dd60241f6d6e15",g="https://pixabay.com/api/",y=s=>m.get(`${g}?key=${p}&q=${s}&image_type="photo"&orientation="horizontal"&safesearch=true&per_page=40`).then(r=>{if(!r.data)throw new Error;return r.data}),b=document.getElementById("search-form"),n=document.querySelector(".loader-container"),l=document.querySelector(".gallery"),c=document.querySelector(".load-more-wrapper");n.classList.add("is-hidden");l.classList.add("is-hidden");const L=s=>s.map(({webformatURL:o,largeImageURL:i,likes:e,views:t,comments:a,downloads:d,tags:u})=>`<li class="photo-card gallery__item">
    <a class="gallery__link" href="${i}"><img src="${o}" alt="${u}" class="gallery__image" loading="lazy" width="380"/></a>
    <div class="info">
        <p class="info-item">
            <b>Likes</b>
            ${e}
        </p>
            <p class="info-item">
        <b>Views</b>
        ${t}
        </p>
        <p class="info-item">
            <b>Comments</b>
            ${a}
        </p>
        <p class="info-item">
            <b>Downloads</b>
            ${d}
        </p>
    </div>
</li>`).join(""),w=async s=>{s.preventDefault();const{value:r}=s.currentTarget.elements.searchQuery;n.classList.remove("is-hidden");try{const{hits:o}=await y(r);console.log(o),(!o||o.length===0)&&f.warning({message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight"}),n.classList.add("is-hidden"),l.classList.remove("is-hidden"),l.insertAdjacentHTML("beforeend",L(o)),new h(".gallery__link",{captionDelay:250,captionsData:"alt",scrollZoom:!1});const{height:i}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:i/3,behavior:"smooth"}),c.classList.remove("is-hidden"),s.target.elements.searchQuery.value=""}catch(o){console.log(o)}},_=async()=>{};b.addEventListener("submit",w);c.addEventListener("click",_);
//# sourceMappingURL=commonHelpers.js.map
