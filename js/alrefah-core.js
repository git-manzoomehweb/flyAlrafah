document.addEventListener("DOMContentLoaded", function () {
  function fetchEngine() {
    if (document.getElementById("search-box")) {
      try {
        var xhrobj = new XMLHttpRequest();
        xhrobj.open("GET", "searchengine.bc");
        xhrobj.send();

        xhrobj.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            var container = document.getElementById("search-box");
            container.innerHTML = xhrobj.responseText;
            document
              .querySelector(".search-nav.mb-4")
              .parentElement.classList.add("set_linearBg");
            const depfI = document.querySelectorAll(
              "#r-flight input.departure.text-value"
            );
            depfI.forEach((item) => {
              item.placeholder = "From";
            });
            const desfI = document.querySelectorAll(
              "#r-flight input.destination.text-value"
            );
            desfI.forEach((item) => {
              item.placeholder = "To";
            });
            // ______________________________
            const depfhI = document.querySelectorAll(
              "#r-flighthotel input.departure.text-value"
            );
            depfhI.forEach((item) => {
              item.placeholder = "From";
            });
            const desfhI = document.querySelectorAll(
              "#r-flighthotel input.destination.text-value"
            );
            desfhI.forEach((item) => {
              item.placeholder = "To";
            });
            // ______________________________
            const dephI = document.querySelectorAll(
              "#r-hotel input.departure.text-value"
            );
            dephI.forEach((item) => {
              item.placeholder = "To";
            });
            // Re-run inline scripts in response
            var scripts = container.getElementsByTagName("script");
            for (var i = 0; i < scripts.length; i++) {
              var scriptTag = document.createElement("script");
              if (scripts[i].src) {
                scriptTag.src = scripts[i].src;
                scriptTag.async = false;
              } else {
                scriptTag.text = scripts[i].textContent;
              }
              document.head
                .appendChild(scriptTag)
                .parentNode.removeChild(scriptTag);
            }
          }
        };
      } catch (error) {
        console.error("an error ocurred.", error);
      }
    }
  }

  // Wait for specific CSS file (optional, or remove this part if not needed)
  const cssHref = "[##cms.cms.cdn##]/css/customized.ui.min.css";
  const link = document.querySelector(`link[href="${cssHref}"]`);
  if (link) {
    if (link.sheet) {
      fetchEngine();
    } else {
      link.addEventListener("load", fetchEngine); // Wait until loaded
    }
  } else {
    fetchEngine();
  }
});
// ____________________________________
// ____________________________________
// ____________________________________
function watchForFlightTypeField(callback) {
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.matches(".flighttype-field")) {
            callback(node);
          }

          const matches = node.querySelectorAll(".flighttype-field");
          matches.forEach((match) => callback(match));
        }
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  document.querySelectorAll(".flighttype-field").forEach(callback);
}
watchForFlightTypeField((el) => {
  const liObserver = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        const target = mutation.target;
        if (target.classList.contains("active-module")) {
          const navValue = target.getAttribute("data-nav");
          if (navValue) {
            document.querySelectorAll(".reservation-item li").forEach((li) => {
              const val = li.getAttribute("data-nav");
              if (val) {
                document.body.classList.remove(val);
              }
            });
            document.body.classList.add(navValue);
          }
        }
      }
    }
  });

  const reservationItems = document.querySelectorAll(".reservation-item li");
  reservationItems.forEach((li) => {
    liObserver.observe(li, {
      attributes: true,
      attributeFilter: ["class"],
    });
  });
});

// _____________________________________________________________
let expCards = document.querySelectorAll(".Explore-card");
expCards.forEach((item) => {
  item.addEventListener("click", () => {
    expCards.forEach((el) => {
      el.classList.remove("active");
    });
    item.classList.add("active");
    let depText = item.querySelector(".dep-name").innerText;
    let depId = item.querySelector(".dep-id").innerText;
    let desText = item.querySelector(".des-name").innerText;
    let desId = item.querySelector(".des-id").innerText;
    // console.log(depText, depId, desText, desId);
    const liBtns = document.querySelectorAll(".reservation-item li");
    liBtns.forEach((li) => {
      if (!li.classList.contains("flight-btn")) {
        li.classList.remove("active-module");
      } else {
        li.classList.add("active-module");
      }
    });
    document.querySelector("#r-hotel").classList.add("hidden");
    document.querySelector("#r-flight").classList.remove("hidden");
    document.querySelector("#r-flighthotel").classList.add("hidden");
    let e = document.querySelector(".search-box-container");
    e && window.scrollTo({ top: e.offsetTop - 150, behavior: "smooth" });

    document.querySelector(
      "#r-flight .flight-routes input.departure.text-value "
    ).value = depText;
    document.querySelector(
      "#r-flight .flight-routes input.locationId.from "
    ).value = depId;
    document.querySelector(
      "#r-flight .flight-routes input.destination.text-value "
    ).value = desText;
    document.querySelector(
      "#r-flight .flight-routes input.locationId.to "
    ).value = desId;
  });
});

// _____________________________________________________________
if (document.querySelectorAll(".swiper-4").length > 0)
  swiper = new Swiper(".swiper-4", {
    slidesPerView: 4,
    speed: 700,
    centeredSlides: !1,
    spaceBetween: 8,
    grabCursor: !0,
    autoplay: { delay: 6500, disableOnInteraction: !1 },
    loop: 0,
    pagination: { el: ".swiper-pagination", clickable: !0 },
    navigation: {
      nextEl: ".swiper-button-next-f",
      prevEl: ".swiper-button-prev-f",
    },
    breakpoints: {
      640: { slidesPerView: 4, spaceBetween: 8 },
      768: { slidesPerView: 4, spaceBetween: 8 },
      1024: { slidesPerView: 4, spaceBetween: 8 },
    },
  });
if (document.querySelectorAll(".swiper-3").length > 0)
  swiper = new Swiper(".swiper-3", {
    slidesPerView: 3,
    speed: 700,
    centeredSlides: !1,
    spaceBetween: 16,
    grabCursor: !0,
    autoplay: { delay: 6500, disableOnInteraction: !1 },
    loop: 0,
    pagination: { el: ".swiper-pagination", clickable: !0 },
    navigation: {
      nextEl: ".swiper-button-next-f",
      prevEl: ".swiper-button-prev-f",
    },
    breakpoints: {
      640: { slidesPerView: 3, spaceBetween: 16 },
      768: { slidesPerView: 3, spaceBetween: 16 },
      1024: { slidesPerView: 3, spaceBetween: 16 },
    },
  });
if (document.querySelectorAll(".swiper-mobile").length > 0)
  swiper = new Swiper(".swiper-mobile", {
    slidesPerView: 1.48,
    speed: 700,
    centeredSlides: !1,
    spaceBetween: 10,
    grabCursor: !0,
    autoplay: { delay: 6500, disableOnInteraction: !1 },
    loop: 1,
    pagination: { el: ".swiper-pagination", clickable: !0 },
    navigation: {
      nextEl: ".swiper-button-next-f",
      prevEl: ".swiper-button-prev-f",
    },
    breakpoints: {
      640: { slidesPerView: 1.48, spaceBetween: 10 },
      768: { slidesPerView: 1.48, spaceBetween: 10 },
      1024: { slidesPerView: 1.48, spaceBetween: 10 },
    },
  });
const headerMenu = document.querySelector(".header-menu");
const headerMenuClose = document.querySelector(".header-menu-close");
const bars3 = document.querySelector(".bars3");

if (window.innerWidth >= 1024) {
  headerMenuClose.addEventListener("click", function () {
    headerMenu.style.visibility = "hidden";
    headerMenu.style.opacity = "0";
  });
  bars3.addEventListener("click", function () {
    headerMenu.style.visibility = "visible";
    headerMenu.style.opacity = "1";
  });
} else {
  headerMenuClose.addEventListener("click", function () {
    headerMenu.style.transform = "translateX(1024px)";
  });
  bars3.addEventListener("click", function () {
    headerMenu.style.transform = "translateX(0)";
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const toggleDropdowns = document.querySelectorAll(".toggle-dropdown");
  const dropdownIcons = document.querySelectorAll(".dropdown-icon");

  toggleDropdowns.forEach((toggle, index) => {
    const submenu = toggle.nextElementSibling;
    const dropdownIcon = dropdownIcons[index];

    toggle.addEventListener("click", function () {
      dropdownIcon.classList.toggle("rotate-180");

      if (submenu.style.maxHeight) {
        submenu.style.maxHeight = null;
        submenu.style.opacity = "0";
      } else {
        submenu.style.maxHeight = submenu.scrollHeight * 30 + "px";
        submenu.style.opacity = "1";
      }
    });
  });
});
const commonQS = document.querySelector(".common-question");
if (commonQS) {
  const qusetions = commonQS.querySelectorAll(".box");
  qusetions.forEach((item, count) => {
    if (count >= 0 && count <= 9) {
      item.querySelector(".qs-count").innerText = 0 + `${count + 1}`;
    } else {
      item.querySelector(".qs-count").innerText = count;
    }
    // if (index >= 1 && index <= 9) {
    //   item.querySelector(".qs-count").innerText = 0 + index;
    // } else {
    //   item.querySelector(".qs-count").innerText = index;
    // }
    item.addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });
  const qstion = commonQS.querySelectorAll(".box");
  qstion.forEach((item) => {
    document.addEventListener("click", (e) => {
      if (!item.contains(e.target)) {
        item.classList.remove("active");
      }
    });
  });
}
const seeMoreTxt = document.querySelector(".see-more-container");
if (seeMoreTxt) {
  seeMoreTxt.querySelector("button").addEventListener("click", () => {
    if (seeMoreTxt.querySelector(".p").classList.contains("line-clamp-5")) {
      seeMoreTxt.querySelector(".p").classList.remove("line-clamp-5");
      seeMoreTxt.querySelector("button").innerText = "Less";
    } else {
      seeMoreTxt.querySelector(".p").classList.add("line-clamp-5");
      seeMoreTxt.querySelector("button").innerText = "More";
    }
  });
}

if (document.querySelectorAll(".swiper-one").length > 0) {
  const swiper = new Swiper(".swiper-one", {
    direction: "vertical",
    slidesPerView: 3,
    speed: 400,
    centeredSlides: !1,
    spaceBetween: 7,
    grabCursor: !0,
    touchReleaseOnEdges: true,
    pagination: { el: ".swiper-pagination-first-mob", clickable: !0 },
    breakpoints: {
      640: { slidesPerView: 3, spaceBetween: 7 },
      768: { slidesPerView: 3, spaceBetween: 7 },
      1024: { slidesPerView: 3, spaceBetween: 7 },
    },
  });
}
// ______________________prev_js_____________________________
// ______________________prev_js_____________________________
// ______________________prev_js_____________________________
// ______________________prev_js_____________________________
// ______________________prev_js_____________________________
// ______________________prev_js_____________________________
// ______________________prev_js_____________________________
// ______________________prev_js_____________________________
// ______________________prev_js_____________________________
// ______________________prev_js_____________________________
// ______________________prev_js_____________________________
// ______________________prev_js_____________________________
// ______________________prev_js_____________________________
// ______________________prev_js_____________________________
// ______________________prev_js_____________________________

if (document.getElementById("special-tours")) {
  var swiper = new Swiper("#special-tours", {
    slidesPerView: 1,
    speed: 400,
    centeredSlides: true,
    spaceBetween: 20,
    grabCursor: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination-special-tours",
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      650: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
}

if (document.getElementById("destination-tours")) {
  var swiper = new Swiper("#destination-tours", {
    slidesPerView: 1,
    speed: 400,
    centeredSlides: true,
    spaceBetween: 20,
    grabCursor: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination-destination-tours",
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      650: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
}

if (document.getElementById("mag-article")) {
  var swiper = new Swiper("#mag-article", {
    slidesPerView: 1,
    speed: 400,
    centeredSlides: true,
    spaceBetween: 20,
    grabCursor: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination-mag-article",
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      650: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
}

// END SLIDER DEFAULT-MOBILE

// ARTICLE-LIST SLIDER
if (document.getElementById("top-article")) {
  var swiper = new Swiper("#top-article", {
    slidesPerView: 1,
    speed: 400,
    centeredSlides: true,
    spaceBetween: 20,
    grabCursor: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination-top-article",
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      650: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
}

// ARTICLE - VIEW

function loadContentArticlePage() {
  if (document.getElementById("news-article")) {
    var swiper = new Swiper("#news-article", {
      slidesPerView: 1,
      speed: 400,
      centeredSlides: true,
      spaceBetween: 20,
      grabCursor: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      loop: true,
      pagination: {
        el: ".swiper-pagination-news-article",
        clickable: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        650: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
    });
  }
  document
    .getElementById("closePopuparticle")
    .addEventListener("click", function () {
      document.getElementById("popuparticle").classList.add("hidden");
      window.location.reload();
    });
}

function activeTebComment(element, container) {
  document.querySelectorAll(".comment-tab-title").forEach((el) => {
    el.classList.remove("border-primary-400");
    el.classList.remove("bg-primary-100");
    el.classList.remove("text-neutralcolor-700");
  });
  document.querySelectorAll(".comment-boxes").forEach((el) => {
    el.classList.add("hidden");
  });
  element.classList.add("border-primary-400");
  element.classList.add("bg-primary-100");
  element.classList.add("text-neutralcolor-700");
  document.getElementById(container).classList.remove("hidden");
}
/*------------------REFRESH CAPTCHA-----------------------*/
async function reactionSubmit(id, type) {
  const response = await fetch("Client_CheckAuthentication.inc");
  if (!response.ok) {
    throw new Error(
      "متاسفانه مشکلی به وجود آمده است لطفا بعدا مجددا تلاش فرمایید."
    );
  } else {
    let CheckAuthentication = await response.text();
    if (CheckAuthentication === "true") {
      var xhr = new XMLHttpRequest();
      var url =
        "/Like-Dislike.bc?id=" +
        encodeURIComponent(id) +
        "&type=" +
        encodeURIComponent(type);
      xhr.open("GET", url, true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
          } else {
          }
        }
      };
      xhr.send();
    } else {
      showLoginContainer(this);
    }
  }
}

function refresh_captcha(element, event) {
  var form = element.closest("form");
  var captchaElement = form.querySelector(".load-captcha");
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/Client_Captcha.bc", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      captchaElement.innerHTML = xhr.responseText;
    }
  };
  xhr.send();
}

async function Reply_Comment(element) {
  const responsereply = await fetch("Client_CheckAuthentication.inc");
  if (!responsereply.ok) {
    throw new Error(
      "متاسفانه مشکلی به وجود آمده است لطفا بعدا مجددا تلاش فرمایید."
    );
  } else {
    let CheckAuthentication = await responsereply.text();
    if (CheckAuthentication === "true") {
      var firstname = document.querySelector(
        ".user-profile-header .default-name"
      ).innerText;
      var lastname = document.querySelector(
        ".user-profile-header .default-family"
      ).innerText;
      element.closest(".opinionRow").querySelector(".reply-title").value =
        firstname + " " + lastname;
      element
        .closest(".opinionRow")
        .querySelector(".replyCommentForm")
        .classList.toggle("hidden");
    } else {
      showLoginContainer(this);
    }
  }
}

async function SubmitOpinionForm(element, event) {
  event.preventDefault();
  const response = await fetch("Client_CheckAuthentication.inc");
  if (!response.ok) {
    throw new Error(
      "متاسفانه مشکلی به وجود آمده است لطفا بعدا مجددا تلاش فرمایید."
    );
  } else {
    let CheckAuthentication = await response.text();
    if (CheckAuthentication === "true") {
      var form = new FormData(element.closest("form"));
      var xhr = new XMLHttpRequest();
      xhr.open("POST", element.closest("form").action, true);
      xhr.onload = function () {
        if (xhr.status === 200) {
          document.getElementById("popupMessage").innerHTML = xhr.responseText;
          document.getElementById("popuparticle").classList.remove("hidden");
        } else {
          document.getElementById("popupMessage").innerHTML = xhr.responseText;
          document.getElementById("popuparticle").classList.remove("hidden");
        }
      };
      xhr.send(form);
      // window.location.reload();
    } else {
      showLoginContainer(this);
    }
  }
}

async function send_Reply(element, event) {
  event.preventDefault();
  var form = new FormData(element.closest("form"));
  var xhr = new XMLHttpRequest();
  xhr.open("POST", element.closest("form").action, true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      document.getElementById("popupMessage").innerHTML = xhr.responseText;
      document.getElementById("popuparticle").classList.remove("hidden");
    } else {
      document.getElementById("popupMessage").innerHTML = xhr.responseText;
      document.getElementById("popuparticle").classList.remove("hidden");
    }
  };
  xhr.send(form);
}

// TOURLIST - SLIDER AND SEARCH FUNCTIONS

if (document.getElementById("news-article")) {
  var swiper = new Swiper("#news-article", {
    slidesPerView: 1,
    speed: 400,
    centeredSlides: true,
    spaceBetween: 20,
    grabCursor: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination-news-article",
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      650: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
}

var input = document.getElementById("searchcontent");
var isItemSelected = false; // برای بررسی اینکه آیا چیزی انتخاب شده است یا خیر

if (input) {
  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      // event.preventDefault();
      this.form.submit();
    }
  });
  // input.onkeyup = function () {
  //   if (this.value.length !== 0) {
  //     if (document.querySelector('.search-content ul')) {
  //       document.querySelector('.search-content ul').classList.remove('hidden');
  //       var filter = input.value.toUpperCase();
  //       var lis = document.querySelector('.search-content').getElementsByTagName('li');
  //       isItemSelected = false; // ریست کردن وقتی که کاربر چیزی در ورودی می‌نویسد

  //       for (var i = 0; i < lis.length; i++) {
  //         var name = lis[i].innerHTML;
  //         if (name.toUpperCase().indexOf(filter) == 0) {
  //           lis[i].style.display = 'list-item';
  //         } else {
  //           lis[i].style.display = 'none';
  //         }
  //       }
  //     }
  //   } else {
  //     var lis = document.querySelector('.search-content').getElementsByTagName('li');
  //     for (var i = 0; i < lis.length; i++) {
  //       lis[i].style.display = 'list-item';
  //     }
  //     if (document.querySelector('.search-content ul')) {
  //       document.querySelector('.search-content ul').classList.remove('hidden');
  //     }
  //   }
  // };

  // // اضافه کردن رویداد keydown برای شناسایی کلید Enter
  // input.addEventListener('keydown', function (event) {
  //   if (event.key === 'Enter') {
  //     event.preventDefault(); // جلوگیری از رفتار پیش‌فرض

  //     // اگر آیتمی انتخاب شده بود فرم سابمیت شود
  //     if (isItemSelected && input.value.length !== 0) {
  //       document.getElementById('search-content-tour').submit();
  //     }
  //   }
  // });

  // if (document.getElementById('search-content-tour')) {
  //   document.getElementById('search-content-tour').addEventListener('submit', function (e) {
  //     if (!isItemSelected) {
  //       e.preventDefault();
  //       document.getElementById('catidsearched').value = 0; // اگر هیچ چیزی انتخاب نشده باشد catid را 0 قرار دهید
  //       var lis = document.querySelector('.search-content').getElementsByTagName('li');
  //       for (var i = 0; i < lis.length; i++) {
  //         lis[i].style.display = 'list-item';
  //       }
  //       if (document.querySelector('.search-content ul')) {
  //         document.querySelector('.search-content ul').classList.remove('hidden');
  //       }
  //     }
  //   });
  // }

  // function contentSearched(datatitle, datacatid) {
  //   input.value = datatitle;
  //   document.getElementById('catidsearched').value = datacatid;
  //   document.querySelector('.search-content ul').classList.add('hidden');
  //   isItemSelected = true; // وقتی آیتمی انتخاب می‌شود، این متغیر true شود
  //   document.getElementById('search-content-tour').submit();
  // }
}

function loadContentTourListPage(catid, typeid, elementload) {
  let thiselement = document.querySelector(".tour-category");
  LoadCatTour("load-items.bc", catid, typeid, elementload, thiselement);

  const contentSection = document.getElementById("content-section");
  const content = document.getElementById("content");
  const showMore = document.getElementById("show-more");

  if (content) {
    if (content.scrollHeight > 533) {
      showMore.style.display = "flex"; // نمایش دکمه "مشاهده بیشتر"
    }
  }

  // if (document.querySelector('.search-content ul')) {
  //   document.getElementById("search-content-container").classList.remove("hidden");
  // } else {
  //   document.getElementById("search-content-container").classList.add("hidden");
  // }

  // کلیک روی دکمه "مشاهده بیشتر"
  if (showMore) {
    showMore.addEventListener("click", function () {
      contentSection.style.height = "auto"; // تغییر ارتفاع به "auto" برای نمایش کامل محتوا
      contentSection.style.overflow = "visible"; // حذف overflow برای نمایش کامل
      showMore.style.display = "none"; // مخفی‌کردن دکمه "مشاهده بیشتر"
    });
  }
}

async function LoadCatTour(url, param1, param2, elementId, thiselement) {
  document.getElementById(elementId).innerHTML =
    '<div class="w-full text-center relative z-10 flex justify-center loading mt-24 mb-24"><svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg></div>';
  document.querySelectorAll(".tour-category").forEach((e) => {
    e.classList.remove("bg-primary-100");
    e.classList.remove("text-neutralcolor-700");
    e.classList.remove("border-primary-400");

    e.classList.add("text-neutralcolor-500");
    e.classList.add("border-neutralcolor-500");
  });
  thiselement.classList.add("bg-primary-100");
  thiselement.classList.add("text-neutralcolor-700");
  thiselement.classList.add("border-primary-400");

  thiselement.classList.remove("text-neutralcolor-500");
  thiselement.classList.remove("border-neutralcolor-500");

  try {
    const params = { catid: param1, typeid: param2 };
    const queryString = new URLSearchParams(params).toString();
    const fullUrl = `${url}?${queryString}`;
    const response = await fetch(fullUrl);
    if (!response.ok) {
      throw new Error(
        "متاسفانه مشکلی به وجود آمده است لطفا بعدا مجددا تلاش فرمایید."
      );
    }
    const content = await response.text();

    // قرار دادن محتوا در المان مورد نظر
    document.getElementById(elementId).innerHTML = content;

    // پیدا کردن و اجرای اسکریپت‌های اینلاین
    const scripts = document
      .getElementById(elementId)
      .querySelectorAll("script");
    scripts.forEach((script) => {
      const newScript = document.createElement("script");
      if (script.src) {
        // اگر اسکریپت منبع خارجی دارد، آن را دوباره لود کنید
        newScript.src = script.src;
      } else {
        // اگر اسکریپت اینلاین است، متن آن را اجرا کنید
        newScript.innerHTML = script.innerHTML;
      }
      document.body.appendChild(newScript);
      document.body.removeChild(newScript); // برای جلوگیری از افزوده شدن غیرضروری به DOM
    });
  } catch (error) {
    console.error(error);
  }
}
// _____________________________________________________
const menuCloserLnd = document.querySelectorAll(".closer-mn ");
menuCloserLnd.forEach((item) => {
  item.addEventListener("click", () => {
    headerMenu.style.transform = "translateX(1024px)";
  });
});
// _____________________________________________________
const target = document.querySelector("main.my-3");
document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".footer-landing-items")) {
    const isHomePage = window.location.pathname === "/";
    const isNotHome = !isHomePage;

    const flightItem = document.querySelectorAll('div[data-id="flight"]');
    const hotelItem = document.querySelectorAll('div[data-id="hotel"]');
    const flightHotelItem = document.querySelectorAll(
      'div[data-id="flighthotel"]'
    );
    if (isNotHome) {
      if (flightItem) {
        flightItem.forEach((item) => {
          item.addEventListener("click", function (e) {
            e.preventDefault();
            window.location.href = "/flight";
          });
        });
      }
      if (flightHotelItem) {
        flightHotelItem.forEach((item) => {
          item.addEventListener("click", function (e) {
            e.preventDefault();
            window.location.href = "/flighthotel";
          });
        });
      }

      if (hotelItem) {
        hotelItem.forEach((item) => {
          item.addEventListener("click", function (e) {
            e.preventDefault();
            window.location.href = "/hotel";
          });
        });
      }
    } else {
      if (flightItem) {
        flightItem.forEach((item) => {
          item.addEventListener("click", function () {
            if (target) {
              target.scrollIntoView({ behavior: "smooth" });
            }
            check_searchHistory("flight");
            check_landing("flight");
          });
        });
      }
      if (flightHotelItem) {
        flightHotelItem.forEach((item) => {
          item.addEventListener("click", function () {
            if (target) {
              target.scrollIntoView({ behavior: "smooth" });
            }
            check_searchHistory("flighthotel");
            check_landing("flighthotel");
          });
        });
      }
      if (hotelItem) {
        hotelItem.forEach((item) => {
          item.addEventListener("click", function () {
            if (target) {
              target.scrollIntoView({ behavior: "smooth" });
            }
            check_searchHistory("hotel");
            check_landing("hotel");
          });
        });
      }
    }
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const currencyContainer = document.querySelector(".currency-content");

  if (!currencyContainer) return;

  const svgIcon = `
    <svg width="12" height="22" viewBox="0 0 12 22" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path fill-rule="evenodd" clip-rule="evenodd" d="M7.31428 17.006V12.6803C8.44818 12.6926 9.3661 13.6537 9.3661 14.8363C9.3661 16.0256 8.44818 16.9936 7.31428 17.006ZM2.6339 7.6175C2.6339 6.40887 3.53858 5.42712 4.68038 5.33775V9.911C3.5399 9.82163 2.6339 8.833 2.6339 7.6175ZM12 14.8363C12 12.1371 9.89946 9.94263 7.31428 9.93025V5.32125H7.76205C8.64572 5.32125 9.36478 6.06787 9.36478 6.985V7.16237C9.36478 7.92275 9.95477 8.53737 10.6817 8.53737C11.4087 8.53737 11.9987 7.92275 11.9987 7.16237V6.985C11.9987 4.55125 10.0983 2.57125 7.76205 2.57125H7.31428V1.375C7.31428 0.614625 6.72429 0 5.99733 0C5.27038 0 4.68038 0.614625 4.68038 1.375V2.58775C2.08605 2.67987 0 4.89225 0 7.61888C0.00131695 10.3496 2.08869 12.5689 4.68038 12.661V17.0088H4.23789C3.35428 17.0088 2.63654 16.2566 2.63654 15.3312C2.63654 14.5709 2.04654 13.9562 1.31959 13.9562C0.592629 13.9562 0.00263371 14.5709 0.00263371 15.3312C0.00263371 17.7719 1.903 19.7588 4.23789 19.7588H4.68038V20.625C4.68038 21.384 5.27038 22 5.99733 22C6.72429 22 7.31428 21.384 7.31428 20.625V19.756C9.89946 19.7436 12 17.5422 12 14.8363Z" fill="white"></path>
 </svg>`;

  function replaceCurrencyText() {
    const currencyIcon = document.querySelector(".currency__icon");
    if (currencyIcon && currencyIcon.textContent.trim() === "--Currency--") {
      currencyIcon.innerHTML = svgIcon;
    }
  }

  replaceCurrencyText();

  const observer = new MutationObserver(replaceCurrencyText);
  observer.observe(currencyContainer, { childList: true, subtree: true });

  setInterval(replaceCurrencyText, 100);
});

/*------------------CURRENCY-----------------------*/
document.addEventListener("DOMContentLoaded", function () {
  localStorage_getCurrency();

  if (document.querySelector(".contain-currency-show")) {
    document.querySelector(".currency-selected").setAttribute("onclick", "");
  }

  document.addEventListener("click", function (event) {
    if (!event.target.closest(".currency-selected,.currency-list")) {
      document.querySelector(".currency-list").classList.add("unvisible");
    }
  });
});

function currency_selected(element) {
  if (!document.querySelector(".contain-currency")) {
    if (!document.querySelector(".contain-currency-show")) {
      let headerResize = element.closest(".header-t");
      let currencySelected = headerResize.querySelector(".currency-selected");

      if (currencySelected.getAttribute("data-active") == 0) {
        headerResize
          .querySelector(".currency-loading")
          .classList.toggle("hidden");

        fetch("/Client_Currency_Rate.bc")
          .then((response) => response.text())
          .then((text) => {
            console.log("Server response:", text);
            const data_currency = JSON.parse(text.replace(/\'/g, '"'));
            let currencyList = headerResize.querySelector(".currency-list ul");
            data_currency.rate.forEach((rate) => {
              let listItem = document.createElement("li");
              listItem.setAttribute("data-cost", rate.rate_cost);
              listItem.setAttribute(
                "data-floatdigit",
                data_currency.floatdigit
              );
              listItem.textContent = rate.rate_unit;
              listItem.addEventListener("click", function () {
                select_currency(listItem);
              });
              currencyList.appendChild(listItem);
            });

            headerResize
              .querySelector(".currency-loading")
              .classList.toggle("hidden");
            currencySelected.setAttribute("data-active", 1);
            headerResize
              .querySelector(".currency-list")
              .classList.toggle("unvisible");
          })
          .catch((error) => console.error(error));
      } else {
        headerResize
          .querySelector(".currency-list")
          .classList.toggle("unvisible");
      }
    }
  }
}

function select_currency(element) {
  let headerResize = element.closest(".header-t");
  headerResize.querySelector(".currency-list").classList.toggle("unvisible");
  headerResize.querySelector(
    ".currency-selected"
  ).innerHTML = `<div>${element.innerText}</div>`;
  localStorage_setCurrency(
    element.innerText,
    element.getAttribute("data-cost"),
    element.getAttribute("data-floatdigit")
  );
}

function localStorage_setCurrency(currency_unit, currency_cost, floatdigit) {
  let currencyObject = {
    currency_unit: currency_unit,
    currency_cost: currency_cost,
    floatdigit: floatdigit,
    time: new Date().getTime(),
    expire: 1200000,
  };
  localStorage.setItem("currencyObject", JSON.stringify(currencyObject));
  localStorage_getCurrency();
}

function localStorage_getCurrency() {
  let getCurrencyObject = localStorage.getItem("currencyObject");
  let jsonCurrency = JSON.parse(getCurrencyObject);

  if (jsonCurrency) {
    document.querySelector(
      ".currency-selected"
    ).innerHTML = `<div>${jsonCurrency.currency_unit}</div>`;

    var timer = setInterval(function () {
      if (new Date().getTime() - jsonCurrency.time >= jsonCurrency.expire) {
        localStorage.removeItem("currencyObject");
        document.querySelector(
          ".currency-selected"
        ).innerHTML = `<div>--Select--</div>`;
        document
          .querySelector(".currency-selected")
          .setAttribute("data-active", 0);
        clearInterval(timer);
        console.log("localStorage has expired");
      }
    }, 1000);
  }
}
// ________________________________________________

// footer form

function uploadDocument(args) {
  const captcha = document
    .getElementById("contactform")
    .querySelector("#captchaContainer input[name='captcha']").value;
  const captchaid = document
    .getElementById("contactform")
    .querySelector("#captchaContainer input[name='captchaid']").value;
  const stringJson = JSON.stringify(args.source?.rows[0]);

  // __________________

  // __________________

  $bc.setSource("cms.upload", {
    value: stringJson,
    captcha: captcha,
    captchaid: captchaid,
    run: true,
  });
}
function refreshCaptcha(e) {
  $bc.setSource("captcha.refresh", true);
}
function captchaRendered() {
  document.querySelector(".contactUsInput").placeholder = "security code ";
}
async function OnProcessedEditObject(args) {
  var response = args.response;
  var json = await response.json();
  var errorid = json.errorid;
  if (errorid == "6") {
    document.getElementById("message-api").innerHTML =
      "Your request has been successfully submitted.";
    document
      .getElementById("contactform")
      .querySelector(".phone-number")
      .querySelector("input").value = "";
    document
      .getElementById("contactform")
      .querySelector(".firstname-last-name")
      .querySelector("input").value = "";

    refreshCaptcha();
  } else {
    console.log(errorid);
    refreshCaptcha();
    document
      .getElementById("contactform")
      .querySelector(".phone-number")
      .querySelector("input").value = "";
    document
      .getElementById("contactform")
      .querySelector(".firstname-last-name")
      .querySelector("input").value = "";
    setTimeout(() => {
      document.getElementById("message-api").innerHTML =
        "an error occured,try again";
    }, 2000);
  }
}
async function RenderForm() {
  document
    .getElementById("contactform")
    .querySelector(".phone-number")
    .querySelector("input").placeholder = " phone number";

  document
    .querySelector(".firstname-last-name")
    .querySelector("input").placeholder = " name";
}

document
  .querySelector("#contactform button.data-body-btn")
  .addEventListener("click", () => {
    const inputs = document.querySelectorAll(
      "#contactform input:not([type='hidden'])"
    );
    let allFilled = true;
    console.log(allFilled, "1");

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        allFilled = false;
        console.log(allFilled, "2");
      }
    });
    if (!allFilled) {
      console.log(allFilled, "3");
      const messageBox = document.querySelector(
        ".message-api.font-danaregular"
      );

      messageBox.innerHTML = "Please fill out all fields.";

      setTimeout(() => {
        messageBox.innerHTML = "";
      }, 12000);
      return;
    }
  });
