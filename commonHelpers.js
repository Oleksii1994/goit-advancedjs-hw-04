import{$ as u,a as v,i as m,A as H,l as $,S as _}from"./assets/vendor-fb8b8938.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function s(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerpolicy&&(i.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?i.credentials="include":t.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(t){if(t.ep)return;t.ep=!0;const i=s(t);fetch(t.href,i)}})();const E=document.querySelector(".up-button");u(document).ready(function(){u("a").on("click",function(e){if(this.hash!==""){e.preventDefault();var o=this.hash;u("html, body").animate({scrollTop:u(o).offset().top},700,function(){E.classList.add("is-hidden"),window.location.hash=o})}})});const M="34183699-29109d6fbf2dd60241f6d6e15",T="https://pixabay.com/api/",g=(e,o)=>v.get(`${T}?key=${M}&q=${e}&image_type="photo"&orientation="horizontal"&safesearch=true&per_page=40&page=${o}`).then(s=>{if(!s.data)throw new Error;return s.data});function p(e){return e.map(({webformatURL:s,largeImageURL:n,likes:t,views:i,comments:c,downloads:L,tags:S})=>`<li class="photo-card gallery__item" data-aos="fade-up"
     data-aos-anchor-placement="center-bottom" data-aos-duration="1500" >
    <a class="gallery__link" href="${n}"><img src="${s}" alt="${S}" class="gallery__image" loading="lazy" width="380"/></a>
    <div class="info">
        <p class="info-item">
            <b>Likes</b>
            ${t}
        </p>
            <p class="info-item">
        <b>Views</b>
        ${i}
        </p>
        <p class="info-item">
            <b>Comments</b>
            ${c}
        </p>
        <p class="info-item">
            <b>Downloads</b>
            ${L}
        </p>
    </div>
</li>`).join("")}function k(){const e=window.scrollY,o=window.innerHeight,s=document.documentElement.offsetHeight;return e+o>=s-30}function q(){const e=window.scrollY,o=window.innerHeight,s=document.documentElement.offsetHeight;return e+o>=s/3}function h(e){m.warning({message:e,position:"topRight"})}function B(e){m.info({message:e,position:"topRight"})}function A(e){m.success({message:e,position:"topRight"})}H.init();const P=document.getElementById("search-form"),r=document.querySelector(".loader-container"),a=document.querySelector(".gallery"),I=document.querySelector(".up-button");let f="";const y=40;let d=1,w=null,l=!1,b;r.classList.add("is-hidden");a.classList.add("is-hidden");function R(e){if(!e.trim())throw h("Sorry, search field can't be empty."),r.classList.add("is-hidden"),new Error;if(e===f)throw h("Try to find images by another word."),new Error;e!==f&&(f=e,r.classList.remove("is-hidden"),a.classList.add("is-hidden"),a.innerHTML="")}async function D(e){e.preventDefault();const{value:o}=e.currentTarget.elements.searchQuery;d=1;try{R(o.trim());const{hits:s,totalHits:n}=await g(o.trim(),d);if(!s||s.length===0){h("Sorry, there are no images matching your search query. Please try again."),e.target.elements.searchQuery.value="",r.classList.add("is-hidden");return}b=n,A(`Hooray! We found ${n} images`),r.classList.add("is-hidden"),a.classList.remove("is-hidden"),a.insertAdjacentHTML("beforeend",p(s)),w=new _(".gallery__link",{captionDelay:250,captionsData:"alt",scrollZoom:!1});const{height:t}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:t/3,behavior:"smooth"}),e.target.elements.searchQuery.value=""}catch(s){console.log(s)}}async function O(){if(!l){l=!0,d+=1;try{r.classList.remove("is-hidden");const{hits:e,totalHits:o}=await g(f,d);if(Math.ceil(o/y)===d){B("We're sorry, but you've reached the end of search results."),l=!1;return}a.insertAdjacentHTML("beforeend",p(e)),r.classList.add("is-hidden"),l=!1,w.refresh()}catch(e){console.log(e.message)}}}function Q(){q()&&I.classList.remove("is-hidden"),!(b<=y)&&k()&&!l&&O()}window.addEventListener("scroll",$(Q,100));P.addEventListener("submit",D);
//# sourceMappingURL=commonHelpers.js.map
