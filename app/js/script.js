"use strict";

var catTemplate = document.querySelector("#cat-template"),
  catsContainer = document.querySelector(".container.cats"),
  content = document.querySelector(".content"),
  filterElement = document.querySelector('.filter'),
  cats,
  isBuilding = 0,
  pageCount = 0,
  filterArray = [];

function getCatsData() {
  var xmlHttp = new XMLHttpRequest();
  var url = "https://ma-cats-api.herokuapp.com/api/cats?page=" + pageCount;
  xmlHttp.open("GET", url, false);
  xmlHttp.send(null);
  pageCount++;
  var catsObject = JSON.parse(xmlHttp.responseText)
  return catsObject;
}

function getCatMarkup(data) {
  var clone = document.importNode(catTemplate.content, true);
  clone.querySelector(".cat-card__price").textContent = data.price;
  clone.querySelector(".cat-card__image > img").src = Modernizr.svg ? data.img_url: 'img/default_cat.png';
  clone.querySelector(".cat-card__image > img").setAttribute("alt", data.name);
  clone.querySelector(".cat-data__name").textContent = data.name;
  clone.querySelector(".cat-data__id").textContent = data.id;
  clone.querySelector(".cat-data__category").textContent = data.category;
  return clone;
}

(function printCats() {
  var data = getCatsData();
  data.cats.forEach(function(cat){
    if(!filterArray.includes(cat.category)) filterArray.push(cat.category)
    catsContainer.appendChild(getCatMarkup(cat));
  })
  filterArray.forEach(function(item){
    var button = document.createElement('button');
    button.innerHTML = item;
    button.classList.add(item);
    filterElement.addEventListener('click', filterTrigger)
    filterElement.appendChild(button);
  })
})();

cats = catsContainer.querySelectorAll('.cat');

function filterTrigger(e){
  cats.forEach(function (cat){
    var category = cat.querySelector('.cat-data__category').textContent
    if (category == e.target.classList[0]){
      cat.classList.toggle('hide')
    }
  })
}