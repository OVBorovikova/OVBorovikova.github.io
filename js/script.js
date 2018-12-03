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
        const title = event.target;   
        currentParent = title.parentNode; 

        if (currentParent.classList.contains('menu__item_active')) {
          currentParent.classList.remove('menu__item_active');
          activeItem = null;
        } else {
          if (activeItem) {
            activeItem.classList.remove('menu__item_active');
          }      
  
          activeItem = title.parentNode;
          activeItem.classList.add('menu__item_active'); 

        };       
      };
    });
  }


//вертикальный аккордеон -- команда

const accordeonTeam = document.querySelector('#team-accordeon');

  crateTeamAccordeon(accordeonTeam);

  function crateTeamAccordeon(element) {
    let activeItem;

    element.addEventListener('click', function (event) {
      if(event.target.classList.contains('team__name')) {
        const title = event.target;  
        currentParent = title.parentNode; 

        if (currentParent.classList.contains('team__item_active')) {
          currentParent.classList.remove('team__item_active');
          activeItem = null;
        } else {
          if (activeItem) {
            activeItem.classList.remove('team__item_active');
          }      
  
          activeItem = title.parentNode;
          activeItem.classList.add('team__item_active'); 

        };       
      };
    });
  }



// модальное окно -- отзыв

const review = document.querySelector('#review');

openreview(review);

function openreview(element) {

  const template = document.querySelector("#reviewOverlayTemplate").innerHTML;
  const overlay = createOverlay(template);

    element.addEventListener('click', function (e) {
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

};


// форма

const formButton = document.querySelector('#form-button');
const mainForm = document.querySelector('#mainform');

formButton.addEventListener('click', function(e) {
  e.preventDefault();

  if(validateForm(mainForm)) {   
    var formData = new FormData(document.forms.mainform);

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
    xhr.send(formData);

    xhr.addEventListener('load', function (e) {
      if (xhr.status < 400) {

        console.log('все ок');

        const templateForm = document.querySelector("#formOverlayTemplate").innerHTML;
        const overlayForm = createFormOverlay(templateForm);

        fragment = null;
     
          e.preventDefault();
          document.body.style.overflow = 'hidden';
          overlayForm.open();
          overlayForm.setText("Сообщение отправлено");


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
      }
    });
  };

});

function validateForm(form) {

  let valid = true;

  if (!validateField(form.elements.name)) {
    valid = false;
  };
  if (!validateField(form.elements.tel)) {
    valid = false;
  };
  if (!validateField(form.elements.comment)) {
    valid = false;
  };

  return valid;
};

function validateField(field) {
  if (!field.checkValidity()) {
    field.classList.add('form__error');
  } else {
    return true;
  };
};


/*
    jQuery Masked Input Plugin
    Copyright (c) 2007 - 2015 Josh Bush (digitalbush.com)
    Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
    Version: 1.4.1
*/
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){var b,c=navigator.userAgent,d=/iphone/i.test(c),e=/chrome/i.test(c),f=/android/i.test(c);a.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},autoclear:!0,dataName:"rawMaskFn",placeholder:"_"},a.fn.extend({caret:function(a,b){var c;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof a?(b="number"==typeof b?b:a,this.each(function(){this.setSelectionRange?this.setSelectionRange(a,b):this.createTextRange&&(c=this.createTextRange(),c.collapse(!0),c.moveEnd("character",b),c.moveStart("character",a),c.select())})):(this[0].setSelectionRange?(a=this[0].selectionStart,b=this[0].selectionEnd):document.selection&&document.selection.createRange&&(c=document.selection.createRange(),a=0-c.duplicate().moveStart("character",-1e5),b=a+c.text.length),{begin:a,end:b})},unmask:function(){return this.trigger("unmask")},mask:function(c,g){var h,i,j,k,l,m,n,o;if(!c&&this.length>0){h=a(this[0]);var p=h.data(a.mask.dataName);return p?p():void 0}return g=a.extend({autoclear:a.mask.autoclear,placeholder:a.mask.placeholder,completed:null},g),i=a.mask.definitions,j=[],k=n=c.length,l=null,a.each(c.split(""),function(a,b){"?"==b?(n--,k=a):i[b]?(j.push(new RegExp(i[b])),null===l&&(l=j.length-1),k>a&&(m=j.length-1)):j.push(null)}),this.trigger("unmask").each(function(){function h(){if(g.completed){for(var a=l;m>=a;a++)if(j[a]&&C[a]===p(a))return;g.completed.call(B)}}function p(a){return g.placeholder.charAt(a<g.placeholder.length?a:0)}function q(a){for(;++a<n&&!j[a];);return a}function r(a){for(;--a>=0&&!j[a];);return a}function s(a,b){var c,d;if(!(0>a)){for(c=a,d=q(b);n>c;c++)if(j[c]){if(!(n>d&&j[c].test(C[d])))break;C[c]=C[d],C[d]=p(d),d=q(d)}z(),B.caret(Math.max(l,a))}}function t(a){var b,c,d,e;for(b=a,c=p(a);n>b;b++)if(j[b]){if(d=q(b),e=C[b],C[b]=c,!(n>d&&j[d].test(e)))break;c=e}}function u(){var a=B.val(),b=B.caret();if(o&&o.length&&o.length>a.length){for(A(!0);b.begin>0&&!j[b.begin-1];)b.begin--;if(0===b.begin)for(;b.begin<l&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}else{for(A(!0);b.begin<n&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}h()}function v(){A(),B.val()!=E&&B.change()}function w(a){if(!B.prop("readonly")){var b,c,e,f=a.which||a.keyCode;o=B.val(),8===f||46===f||d&&127===f?(b=B.caret(),c=b.begin,e=b.end,e-c===0&&(c=46!==f?r(c):e=q(c-1),e=46===f?q(e):e),y(c,e),s(c,e-1),a.preventDefault()):13===f?v.call(this,a):27===f&&(B.val(E),B.caret(0,A()),a.preventDefault())}}function x(b){if(!B.prop("readonly")){var c,d,e,g=b.which||b.keyCode,i=B.caret();if(!(b.ctrlKey||b.altKey||b.metaKey||32>g)&&g&&13!==g){if(i.end-i.begin!==0&&(y(i.begin,i.end),s(i.begin,i.end-1)),c=q(i.begin-1),n>c&&(d=String.fromCharCode(g),j[c].test(d))){if(t(c),C[c]=d,z(),e=q(c),f){var k=function(){a.proxy(a.fn.caret,B,e)()};setTimeout(k,0)}else B.caret(e);i.begin<=m&&h()}b.preventDefault()}}}function y(a,b){var c;for(c=a;b>c&&n>c;c++)j[c]&&(C[c]=p(c))}function z(){B.val(C.join(""))}function A(a){var b,c,d,e=B.val(),f=-1;for(b=0,d=0;n>b;b++)if(j[b]){for(C[b]=p(b);d++<e.length;)if(c=e.charAt(d-1),j[b].test(c)){C[b]=c,f=b;break}if(d>e.length){y(b+1,n);break}}else C[b]===e.charAt(d)&&d++,k>b&&(f=b);return a?z():k>f+1?g.autoclear||C.join("")===D?(B.val()&&B.val(""),y(0,n)):z():(z(),B.val(B.val().substring(0,f+1))),k?b:l}var B=a(this),C=a.map(c.split(""),function(a,b){return"?"!=a?i[a]?p(b):a:void 0}),D=C.join(""),E=B.val();B.data(a.mask.dataName,function(){return a.map(C,function(a,b){return j[b]&&a!=p(b)?a:null}).join("")}),B.one("unmask",function(){B.off(".mask").removeData(a.mask.dataName)}).on("focus.mask",function(){if(!B.prop("readonly")){clearTimeout(b);var a;E=B.val(),a=A(),b=setTimeout(function(){B.get(0)===document.activeElement&&(z(),a==c.replace("?","").length?B.caret(0,a):B.caret(a))},10)}}).on("blur.mask",v).on("keydown.mask",w).on("keypress.mask",x).on("input.mask paste.mask",function(){B.prop("readonly")||setTimeout(function(){var a=A(!0);B.caret(a),h()},0)}),e&&f&&B.off("input.mask").on("input.mask",u),A()})}})});




$(document).ready(function() {
  $("#tel").mask("+7 (999) 999-9999");
});

