
//верхнее меню
const openBtn = document.querySelector('#hamburger-menu');
const closeBtn = document.querySelector('#hamburger-close');
const container = document.querySelector('.hero__menu-container');

openBtn.addEventListener('click', function(e) {
  e.preventDefault();
  container.classList.add("hero__menu-container_opened");
});

closeBtn.addEventListener('click', function(e) {
  e.preventDefault();
  container.classList.remove("hero__menu-container_opened");
});





//состав

var burgerBtn = document.querySelector('#burger-btn');
var burgerCont = document.querySelector('.burgers__composition-content');
var burgerClose = document.querySelector('#burgers-close');

burgerBtn.addEventListener('click', function(e) {
  e.preventDefault();
  burgerCont.classList.toggle("burgers__composition-content_opened");
});

burgerClose.addEventListener('click', function(e) {
  e.preventDefault();
  burgerCont.classList.remove("burgers__composition-content_opened");
});
