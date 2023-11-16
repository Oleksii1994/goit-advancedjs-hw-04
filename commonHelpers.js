import{a as l,i as d}from"./assets/vendor-09e9ce67.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const u="34183699-29109d6fbf2dd60241f6d6e15",f="https://pixabay.com/api/",m=n=>l.get(`${f}?key=${u}&q=${n}&image_type="photo"&orientation="horizontal"&safesearch="true"`).then(o=>{if(!o.data)throw new Error;return o.data}),p=document.getElementById("search-form"),g=document.querySelector(".gallery"),y=document.querySelector(".load-more"),h=n=>n.map(({webformatURL:r,largeImageURL:i,likes:e,views:t,comments:s,downloads:a,tags:c})=>`<div class="photo-card">
    <img src="${r}" alt="${c}" loading="lazy" />
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
            ${s}
        </p>
        <p class="info-item">
            <b>Downloads</b>
            ${a}
        </p>
    </div>
</div>`).join(""),b=async n=>{n.preventDefault();const{value:o}=n.currentTarget.elements.searchQuery;try{const{hits:r}=await m(o);console.log(r),r.length===0&&d.warning({message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight"}),g.insertAdjacentHTML("beforeend",h(r))}catch(r){console.log(r)}},L=async()=>{};p.addEventListener("submit",b);y.addEventListener("click",L);
//# sourceMappingURL=commonHelpers.js.map
