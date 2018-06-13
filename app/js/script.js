"use strict";

var catTemplate = document.querySelector("#cat-template"),
  container = document.querySelector(".container"),
  catCounter = 0,
  content = document.querySelector(".content"),
  isBuilding = 0;

function getCatData() {
  catCounter++;
  var xmlHttp = new XMLHttpRequest();
  var url = "https://ma-cats-api.herokuapp.com/api/cats/" + catCounter;
  xmlHttp.open("GET", url, false);
  xmlHttp.send(null);
  var json = JSON.parse(xmlHttp.responseText);
  if (json.status == 404) return getCatData();
  else return json;
}

function buildCat() {
  var data = getCatData();
  var clone = document.importNode(catTemplate.content, true);
  clone.querySelector(".cat-card__price").textContent = data.price;
  clone.querySelector(".cat-card__image > img").src = data.img_url;
  clone.querySelector(".cat-card__image > img").setAttribute("alt", data.name);
  clone.querySelector(".cat-data__name").textContent = data.name;
  clone.querySelector(".cat-data__id").textContent = data.id;
  clone.querySelector(".cat-data__category").textContent = data.category;
  return clone;
}

function buildRow() {
  if (!isBuilding) {
    isBuilding = 1;
    var row = document.createElement("div");
    row.classList.add("row");
    row.appendChild(buildCat());
    row.appendChild(buildCat());
    row.appendChild(buildCat());
    row.appendChild(buildCat());
    container.appendChild(row);
    isBuilding = 0;
  }
}

(function printFirstScreen() {
  if (content.offsetHeight > container.offsetHeight) {
    buildRow();
    printFirstScreen();
  } else return;
})();

content.addEventListener("scroll", function() {
  buildRow();
});
