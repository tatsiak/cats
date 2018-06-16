"use strict";var cats,catTemplate=document.querySelector("#cat-template"),catsContainer=document.querySelector(".container.cats"),content=document.querySelector(".content"),filterElement=document.querySelector(".filter"),isBuilding=0,pageCount=0,filterArray=[];function getCatsData(){var t=new XMLHttpRequest,e="https://ma-cats-api.herokuapp.com/api/cats?page="+pageCount;return t.open("GET",e,!1),t.send(null),pageCount++,JSON.parse(t.responseText)}function getCatMarkup(t){var e=document.importNode(catTemplate.content,!0);return e.querySelector(".cat-card__price").textContent=t.price,e.querySelector(".cat-card__image > img").src=t.img_url,e.querySelector(".cat-card__image > img").setAttribute("alt",t.name),e.querySelector(".cat-data__name").textContent=t.name,e.querySelector(".cat-data__id").textContent=t.id,e.querySelector(".cat-data__category").textContent=t.category,e}function filterTrigger(e){cats.forEach(function(t){t.querySelector(".cat-data__category").textContent==e.target.classList[0]&&t.classList.toggle("hide")})}getCatsData().cats.forEach(function(t){filterArray.includes(t.category)||filterArray.push(t.category),catsContainer.appendChild(getCatMarkup(t))}),filterArray.forEach(function(t){var e=document.createElement("button");e.innerHTML=t,e.classList.add(t),filterElement.addEventListener("click",filterTrigger),filterElement.appendChild(e)}),cats=catsContainer.querySelectorAll(".cat");