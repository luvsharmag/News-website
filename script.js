const newsContainer = document.querySelector(".news_section");
const horinewsContainer = document.querySelector(".news_section_hori");
const dataEL = document.querySelector(".data__span");
const pagination = document.querySelector(".pagination");
const API_KEY = "853e0efea20447e898c0a1230bf458fc";
let News_count = 0;
let category = `top-headlines`;
// top-headlines

const Wait = () => {
  pagination.style.opacity = 0;
  document.querySelector(".main").style.opacity = 0;
  setTimeout(() => {
    pagination.style.opacity = 1;
    document.querySelector(".main").style.opacity = 1;
  }, 3500);
};
Wait();
const renderNews = function (data) {
  const html = `
    <div class="vertical_card">
    <div class="news_img">
        <img src="${data.imageUrl}" alt="certificate">            
    </div>
    <div class="news_info">
        <h1 class="news_heading">${data.title}</h1>
        <p class="news_para">${data.content}</p>
    </div>
    <button class="readbtn"><a href="${data.readMoreUrl}" target="_blank">Read More!</a></button>
    </div>`;
  newsContainer.insertAdjacentHTML("afterbegin", html);
};
const renderHoriNews = function (data) {
  const html = `
    <div class="Hori_card">
    <div class="Hori_news_img">
        <img src="${data.imageUrl}" alt="News png">
    </div>
    <div class="news_info hori">
        <h2>${data.title}</h2>
        <p>${data.content}</p>
    </div>
    </div>`;
  horinewsContainer.insertAdjacentHTML("afterbegin", html);
};
const getNews = async function (category = `top-headlines`, ind = 1) {
  newsContainer.innerHTML = "";
  horinewsContainer.innerHTML = "";
  try {
    const res = await fetch(`https://newsapi.org/v2/${category}/sources?${API_KEY}`);
    const res2 = await fetch(`https://newsapi.org/v2/technology/sources?${API_KEY}`);

    const news = await res.json();
    const news2 = await res2.json();
    console.log(news);
    const result = news.sources;
    const length = result.length / 4;
    console.log(news2);
    const result2 = news2.sources;
    result.slice(News_count, length * ind).forEach((data) => {
      renderNews(data);
    });
    result2.slice(News_count, length * ind).forEach((data) => {
      renderHoriNews(data);
    });
    News_count = length * ind + 1;
  } catch (err) {
    console.error(err);
  }
};
getNews();
let pagecurr = document.querySelector(".render");
pagecurr.classList.add("current");
const navContainer = document.querySelector(".nav__links");
let navcurr = document.querySelector(".rendernav");
navcurr.classList.add('current');
navContainer.addEventListener("click", (e) => {
  if (navcurr != undefined) {
    // console.log(curr);
    navcurr.classList.remove("current");
  }
  if (e.target.classList.contains("nav__link")) {
    category = e.target.textContent;
    console.log(category);

    navcurr = e.target;
    e.target.classList.add("current");

    News_count = 0;
    getNews(category);
    Wait();
  }
});

////////////////////////////////////
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thrusday",
  "Friday",
  "Saturday",
  "Sunday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const timeEl = document.querySelector(".time");
const dataEl = document.querySelector(".date");
function setTime() {
  const time = new Date();
  const month = time.getMonth();
  const day = time.getDay();
  const date = time.getDate();
  const hours = time.getHours();
  const hoursForClock = hours % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";

  timeEl.innerHTML = `${hoursForClock}:${
    minutes < 10 ? 0 : ""
  }${minutes}:${seconds} ${ampm}`;
  dataEl.innerHTML = `${days[day]}, ${months[month]} <span class="circle">${date}</span>`;
}
setInterval(() => {
  setTime();
}, 1000);
//////////////////////
//sticky Navigation
const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);
/////////////////////////////////////////////////////
//pagination

const number = document.querySelectorAll(".number");
const render = function (element) {
  element.classList.add("current");
  getNews(category, Number.parseInt(element.textContent, 10));
  pagecurr = element;
};
pagination.addEventListener("click", (e) => {
  pagenum = pagecurr.textContent;
  if (pagecurr != undefined) {
    pagecurr.classList.remove("current");
  }
  if (
    e.target.classList.contains("btn--left") ||
    e.target.classList.contains("icon_left")
  ) {
    if (pagenum > 1) {
      number.forEach((element, i) => {
        if (i == pagenum - 2) {
          render(element);
        }
      });
    }
  }
  if (
    e.target.classList.contains("btn--right") ||
    e.target.classList.contains("icon_right")
  ) {
    if (pagenum < 4) {
      number.forEach((element, i) => {
        if (i == pagenum) {
          render(element);
        }
      });
    }
  }
  if (e.target.classList.contains("number")) {
    pagecurr = e.target;
    console.log(pagecurr);
    getNews(category, Number.parseInt(e.target.textContent, 10));
    e.target.classList.add("current");
  }
  Wait();
});

// Modal window
const btnsOpenModal = document.querySelector('.nav__link--btn');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  document.querySelector('body').style.overflow = "hidden";
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  document.querySelector('body').style.overflow = "auto";
};

btnsOpenModal.addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
