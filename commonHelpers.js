import{a as L,i as m,S as b}from"./assets/vendor-c835c9e9.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const w="34183699-29109d6fbf2dd60241f6d6e15",S="https://pixabay.com/api/",u=(t,s)=>L.get(`${S}?key=${w}&q=${t}&image_type="photo"&orientation="horizontal"&safesearch=true&per_page=40&page=${s}`).then(o=>{if(!o.data)throw new Error;return o.data}),v=document.getElementById("search-form"),c=document.querySelector(".loader-container"),a=document.querySelector(".gallery"),h=document.querySelector(".load-more-wrapper");let l="",d=1,f=null;c.classList.add("is-hidden");a.classList.add("is-hidden");const p=t=>t.map(({webformatURL:o,largeImageURL:i,likes:e,views:r,comments:n,downloads:g,tags:y})=>`<li class="photo-card gallery__item">
    <a class="gallery__link" href="${i}"><img src="${o}" alt="${y}" class="gallery__image" loading="lazy" width="380"/></a>
    <div class="info">
        <p class="info-item">
            <b>Likes</b>
            ${e}
        </p>
            <p class="info-item">
        <b>Views</b>
        ${r}
        </p>
        <p class="info-item">
            <b>Comments</b>
            ${n}
        </p>
        <p class="info-item">
            <b>Downloads</b>
            ${g}
        </p>
    </div>
</li>`).join(""),_=t=>{if(t===l)throw m.warning({message:"Try to find images by another word.",position:"topRight"}),new Error;if(!t.trim())throw m.warning({message:"Sorry, search field can't be empty.",position:"topRight"}),c.classList.add("is-hidden"),new Error;t!==l&&(l=t,c.classList.remove("is-hidden"),h.classList.add("is-hidden"),a.classList.add("is-hidden"),a.innerHTML="")},$=async t=>{t.preventDefault();const{value:s}=t.currentTarget.elements.searchQuery;_(s.trim()),d=1;try{const{hits:o}=await u(s.trim(),d);(!o||o.length===0)&&m.warning({message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight"}),c.classList.add("is-hidden"),a.classList.remove("is-hidden"),a.insertAdjacentHTML("beforeend",p(o)),f=new b(".gallery__link",{captionDelay:250,captionsData:"alt",scrollZoom:!1});const{height:i}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:i/3,behavior:"smooth"}),h.classList.remove("is-hidden"),t.target.elements.searchQuery.value=""}catch(o){console.log(o)}},E=async()=>{d+=1;const{hits:t}=await u(l,d);a.insertAdjacentHTML("beforeend",p(t)),f.refresh()};v.addEventListener("submit",$);h.addEventListener("click",E);
//# sourceMappingURL=commonHelpers.js.map
