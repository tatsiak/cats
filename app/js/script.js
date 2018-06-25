"use strict";

var catTemplate = document.querySelector("#cat-template"),
  catsContainer = document.querySelector(".container.cats"),
  content = document.querySelector(".content"),
  filterElement = document.querySelector(".filter"),
  headerCart = document.querySelector(".header__cart"),
  cartItems = headerCart.querySelector(".header__cart_items"),
  load = document.querySelector("#load"),
  gettingData = false,
  cats,
  isBuilding = 0,
  pageCount = 1,
  filterArray = [];

// build
getCatsData();
content.addEventListener("scroll", getCatsData);

function getCatsData() {
  if (isElementInViewport(load) && !gettingData) {
    gettingData = true;
    var xmlHttp = new XMLHttpRequest();
    var url = "https://ma-cats-api.herokuapp.com/api/cats?page=" + pageCount;
    xmlHttp.open("GET", url, false);
    xmlHttp.onload = function() {
      if (xmlHttp.status >= 200 && xmlHttp.status < 400) {
        // Success!
        var data = JSON.parse(xmlHttp.responseText);
        pageCount++;
        data.cats.forEach(function(cat) {
          catsContainer.appendChild(getCatMarkup(cat));
          if (!filterArray.includes(cat.category)) {
            filterArray.push(cat.category);
            var button = document.createElement("button");
            button.innerHTML = cat.category;
            button.classList.add(cat.category);
            filterElement.addEventListener("click", filterTrigger);
            filterElement.appendChild(button);
          }
        });
        cats = catsContainer.querySelectorAll(".cat");
        cats.forEach(function(cat) {
          cat.addEventListener("dragstart", onDrag);
        });
      } else {
        // We reached our target server, but it returned an error
        console.error(xmlHttp.responseText);
      }
    };
    xmlHttp.send(null);
    gettingData = false;
  }
}

function getCatMarkup(data) {
  var clone = document.importNode(catTemplate.content, true);
  clone.querySelector(".cat-card__price").textContent = data.price;
  var imageSource = Modernizr.svg ? data.img_url : "img/default_cat.png";
  clone
    .querySelector(".cat-card__image")
    .setAttribute("style", 'background-image: url("' + imageSource + '")');
  clone.querySelector(".cat-data__name").textContent = data.name;
  clone.querySelector(".cat-data__id").textContent = data.id;
  clone.querySelector(".cat-data__category").textContent = data.category;
  clone.querySelector(".cat").id = data.id;
  return clone;
}

function filterTrigger(e) {
  var clickedFilterName = e.target.classList[0];
  e.target.classList.toggle("filter__active");
  cats.forEach(function(cat) {
    var category = cat.querySelector(".cat-data__category").textContent;
    if (category == clickedFilterName) {
      cat.classList.toggle("hide");
    }
  });
}

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return (
    rect.bottom > 0 &&
    rect.right > 0 &&
    rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
    rect.top < (window.innerHeight || document.documentElement.clientHeight)
  );
}

// drag and drop

headerCart.addEventListener("dragover", onDragOver);
headerCart.addEventListener("drop", onDrop);

function onDrag(e) {
  e.dataTransfer.dropEffect = "move";
  e.dataTransfer.effectAllowed = "move";
  var target = e.target || e.srcElement;
  var success = e.dataTransfer.setData("id", target.id);
  console.log(success);
}

function onDragOver(e) {
  if (e.preventDefault) e.preventDefault();
  if (e.stopPropagation) e.stopPropagation();
  else e.cancelBubble = true;
  return false;
}

function addCartItem(item, id) {
  var clone = item.cloneNode(true);
  clone.setAttribute("data-id", id);
  clone.removeAttribute("id");
  clone.classList.add("header__cart_item");
  headerCart.querySelector(".empty").classList.add("hide");
  cartItems.appendChild(clone);
}

function onDrop(e) {
  if (e.preventDefault) e.preventDefault();
  if (e.stopPropagation) e.stopPropagation();
  else e.cancelBubble = true;
  var id = e.dataTransfer.getData("id");
  var item = document.getElementById(id);
  addCartItem(item, id);
  item.classList.add("hide");
  return false;
}
