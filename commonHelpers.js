import{a as L,A as b,i as m,S}from"./assets/vendor-6dce7c37.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerpolicy&&(r.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?r.credentials="include":t.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();const v="34183699-29109d6fbf2dd60241f6d6e15",E="https://pixabay.com/api/",u=(e,i)=>L.get(`${E}?key=${v}&q=${e}&image_type="photo"&orientation="horizontal"&safesearch=true&per_page=40&page=${i}`).then(o=>{if(!o.data)throw new Error;return o.data});b.init();const _=document.getElementById("search-form"),l=document.querySelector(".loader-container"),n=document.querySelector(".gallery"),h=document.querySelector(".load-more-wrapper");let c="",d=1,f=null;l.classList.add("is-hidden");n.classList.add("is-hidden");const p=e=>e.map(({webformatURL:o,largeImageURL:s,likes:t,views:r,comments:a,downloads:y,tags:w})=>`<li class="photo-card gallery__item" data-aos="fade-up"
     data-aos-anchor-placement="center-bottom" data-aos-duration="1500" >
    <a class="gallery__link" href="${s}"><img src="${o}" alt="${w}" class="gallery__image" loading="lazy" width="380"/></a>
    <div class="info">
        <p class="info-item">
            <b>Likes</b>
            ${t}
        </p>
            <p class="info-item">
        <b>Views</b>
        ${r}
        </p>
        <p class="info-item">
            <b>Comments</b>
            ${a}
        </p>
        <p class="info-item">
            <b>Downloads</b>
            ${y}
        </p>
    </div>
</li>`).join(""),$=e=>{if(!e.trim())throw m.warning({message:"Sorry, search field can't be empty.",position:"topRight"}),l.classList.add("is-hidden"),new Error;if(e===c)throw m.warning({message:"Try to find images by another word.",position:"topRight"}),new Error;e!==c&&(c=e,l.classList.remove("is-hidden"),h.classList.add("is-hidden"),n.classList.add("is-hidden"),n.innerHTML="")},k=async e=>{e.preventDefault();const{value:i}=e.currentTarget.elements.searchQuery;$(i.trim()),d=1;try{const{hits:o}=await u(i.trim(),d);(!o||o.length===0)&&m.warning({message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight"}),l.classList.add("is-hidden"),n.classList.remove("is-hidden"),n.insertAdjacentHTML("beforeend",p(o)),f=new S(".gallery__link",{captionDelay:250,captionsData:"alt",scrollZoom:!1});const{height:s}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:s/3,behavior:"smooth"}),h.classList.remove("is-hidden"),e.target.elements.searchQuery.value=""}catch(o){console.log(o)}},g=async()=>{d+=1;const{hits:e}=await u(c,d);n.insertAdjacentHTML("beforeend",p(e)),f.refresh()};function H(){const e=window.scrollY,i=window.innerHeight,o=document.documentElement.offsetHeight;return e+i>=o-30}window.addEventListener("scroll",function(){H()&&g()});_.addEventListener("submit",k);h.addEventListener("click",g);
//# sourceMappingURL=commonHelpers.js.map
