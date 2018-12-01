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


// состав

var burgerBtn = document.querySelectorAll('.burgers__composition');
var burgerCont = document.querySelectorAll('.burgers__composition-content');
var burgerClose = document.querySelectorAll('.burgers-close');


for (var i = 0; i < burgerBtn.length; i++) {
  burgerBtn[i].addEventListener('click', contentShow(i), false);
  burgerClose[i].addEventListener('click', contentHide(i), false);
}
function contentShow(i){
  return function (e) {
    burgerCont[i].classList.toggle("burgers__composition-content_opened");
  };
}

function contentHide(i){
  return function (e) {  
    e.preventDefault();  
    burgerCont[i].classList.remove("burgers__composition-content_opened");
  };
}


//слайдер

    var leftArrow = document.querySelector('#arrow-left');
    var rightArrow = document.querySelector('#arrow-right');
    var sliderContainer = document.querySelector('.burgers__slider');
    var sliderItems = document.querySelectorAll('.burgers__item');
    var sliderWidth = sliderContainer.offsetWidth; 
    var index = 0;

    rightArrow.addEventListener("click", function(e) {
        e.preventDefault();   
        index = index + 1;
        
          if (index > sliderItems.length - 1) {
              for (i = 0; i < sliderItems.length; i++) {
                index = sliderItems.length - 1;            
              };
          } else {  
              for (i = 0; i < sliderItems.length; i++) {
                var sliderData = getComputedStyle(sliderItems[i]);  
                var itemInt = parseInt(sliderData.right);
                sliderItems[i].style.right = itemInt + sliderWidth + 'px';
               };
          };
    });

    leftArrow.addEventListener("click", function(e) {
      e.preventDefault();   
      index = index - 1;
     
      if (index < 0) {
            for (i = 0; i < sliderItems.length - 1; i++) {
              index = 0;      
            };
        } else {  
            for (i = 0; i < sliderItems.length; i++) {
              var sliderData = getComputedStyle(sliderItems[i]);  
              var itemInt = parseInt(sliderData.right);
              sliderItems[i].style.right = itemInt - sliderWidth + 'px';
            };
        };
  });

  
  //горизонтальный аккордеон -- меню


  const accordeonMenu = document.querySelector('#menu-accordeon');

  crateAccordeon(accordeonMenu);

  function crateAccordeon(element) {
    let activeItem;

    element.addEventListener('click', function (event) {
      if(event.target.classList.contains('menu__title')) {
        const header = event.target;        

        if (activeItem) {
          activeItem.classList.remove('menu__item_active');
        }       

          activeItem = header.parentNode;
          activeItem.classList.add('menu__item_active'); 
      };
    });
  }
// var menuItem = document.querySelectorAll('.menu__item');
  // var menuTitle = document.querySelectorAll('.menu__title');

  // for (i=0; i < menuTitle.length; i++) {
  //   menuTitle[i].addEventListener('click', menuDeskShow(i), false);
  // };

  // function menuDeskShow(i){
  //     return function (e) {
  //         var itemClass = this.parentNode.className;

  //         for (i = 0; i < menuItem.length; i++) {
  //           menuItem[i].classList.remove('menu__item_active');
  //         }
  //         if (itemClass == 'menu__item') {
  //           this.parentNode.className = 'menu__item menu__item_active';
  //         }
  //     };
  // }






//вертикальный аккордеон -- команда

var teamItem = document.querySelectorAll('.team__item');

for (i=0; i < teamItem.length; i++) {
  teamItem[i].addEventListener('click', teamShow(i), false);    
};

function teamShow(i){
    return function (e) {

        var teamClass = this.className;

        for (i = 0; i < teamItem.length; i++) {
          teamItem[i].classList.remove('team__item_active');
        }
        if (teamClass == 'team__item') {
          this.className = 'team__item team__item_active';
        }
    };
}



// модальное окно -- отзыв

const openButton = document.querySelector("#btn-1");
const template = document.querySelector("#reviewOverlayTemplate").innerHTML;
const overlay = createOverlay(template);

openButton.addEventListener('click', function (e) {
  e.preventDefault();
  document.body.style.overflow = 'hidden';
  overlay.open();
  overlay.setName("Константин Спилберг");
  overlay.setText("Мысли все о них и о них, о них и о них. Нельзя устоять, невозможно забыть... Никогда не думал, что булочки могут быть такими мягкими, котлетка такой сочной, а сыр таким расплавленным. Мысли все о них и о них, о них и о них. Нельзя устоять, невозможно забыть... Никогда не думал, что булочки могут быть такими мягкими, котлетка такой сочной, а сыр таким расплавленным.");
});

function createOverlay(template) {
  let fragment = document.createElement('div');

   fragment.innerHTML = template;

   const overlayElem = fragment.querySelector('.overlay');
   const overlayName = fragment.querySelector('.review-list__name');
   const overlayClose = fragment.querySelector('.review-overlay__close');
   const overlayText = fragment.querySelector('.overlay__text');

   fragment = null;

   overlayElem.addEventListener('click', function(e) {
      if (e.target === overlayElem) {
        overlayClose.click();
      }
   });
   overlayClose.addEventListener('click', function(e) {
     e.preventDefault();
     document.body.removeChild(overlayElem);
     document.body.style.overflow = 'auto';
   });

   return {
     open() {
      document.body.appendChild(overlayElem)
     },    
     close() {
      overlayClose.click();
     },
     setName(content) {
      overlayName.innerHTML = content;
    },
     setText(content) {
      overlayText.innerHTML = content;
    }
   }
};



// модальное окно -- форма

const formButton = document.querySelector("#form-button");
const templateForm = document.querySelector("#formOverlayTemplate").innerHTML;
const overlayForm = createFormOverlay(templateForm);

// const errorTemplateForm = document.querySelector("#errorOverlayTemplate").innerHTML;
// const errorOverlay = createFormOverlay(template-error);

fragment = null;

formButton.addEventListener('click', function (e) {
  e.preventDefault();
  document.body.style.overflow = 'hidden';
  overlayForm.open();
  overlayForm.setText("Сообщение отправлено");
});

function createFormOverlay(templateForm) {
  let fragmentForm = document.createElement('div');

  fragmentForm.innerHTML = templateForm;

   const overlayFormElem = fragmentForm.querySelector('.overlay');
   const overlayFormClose = fragmentForm.querySelector('.form-overlay__close');
   const overlayFormText = fragmentForm.querySelector('.overlay__text');

   overlayFormElem.addEventListener('click', function(e) {
      if (e.target === overlayFormElem) {
        overlayFormClose.click();
      }
   });
   overlayFormClose.addEventListener('click', function(e) {
     e.preventDefault();
     document.body.removeChild(overlayFormElem);
     document.body.style.overflow = 'auto';
   });

   return {
     open() {
      document.body.appendChild(overlayFormElem)
     },    
     close() {
      overlayClose.click();
     },
     setText(content) {
      overlayFormText.innerHTML = content;
    }
   }
};