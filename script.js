const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const openSidebar = document.getElementById("openSidebar");
const closeSidebar = document.getElementById("closeSidebar");

function openMenu() {
  sidebar.classList.add("open");
  overlay.classList.add("show");
}
function closeMenuFn() {
  sidebar.classList.remove("open");
  overlay.classList.remove("show");
}

openSidebar.addEventListener("click", openMenu);
closeSidebar.addEventListener("click", closeMenuFn);
overlay.addEventListener("click", closeMenuFn);

const slides = Array.from(document.querySelectorAll(".slide"));
const dotsWrap = document.getElementById("dots");

let index = 0;
let timer = null;

function renderDots() {
  dotsWrap.innerHTML = "";
  slides.forEach((_, i) => {
    const d = document.createElement("div");
    d.className = "dot" + (i === index ? " active" : "");
    d.addEventListener("click", () => {
      index = i;
      showSlide();
      restartAuto();
    });
    dotsWrap.appendChild(d);
  });
}

function showSlide() {
  slides.forEach((s, i) => s.classList.toggle("active", i === index));
  renderDots();
}

function nextSlide() {
  index = (index + 1) % slides.length;
  showSlide();
}

function restartAuto() {
  if (timer) clearInterval(timer);
  timer = setInterval(nextSlide, 4500);
}

showSlide();
restartAuto();

const tabGame = document.getElementById("tabGame");
const tabApp = document.getElementById("tabApp");
const panelGame = document.getElementById("panelGame");
const panelApp = document.getElementById("panelApp");
const tabsIndicator = document.getElementById("tabsIndicator");

function moveIndicator(targetBtn) {
  const parent = targetBtn.parentElement;
  const left = targetBtn.offsetLeft;
  const width = targetBtn.offsetWidth;

  tabsIndicator.style.left = left + "px";
  tabsIndicator.style.width = width + "px";
}

function setActiveTab(tab) {

  tabGame.classList.remove("active");
  tabApp.classList.remove("active");
  panelGame.classList.remove("active");
  panelApp.classList.remove("active");

  if (tab === "game") {
    tabGame.classList.add("active");
    panelGame.classList.add("active");
    moveIndicator(tabGame);
  } else {
    tabApp.classList.add("active");
    panelApp.classList.add("active");
    moveIndicator(tabApp);
  }
}

tabGame.addEventListener("click", () => setActiveTab("game"));
tabApp.addEventListener("click", () => setActiveTab("app"));

window.addEventListener("load", () => {
  setActiveTab("game");
});

window.addEventListener("resize", () => {
  const activeBtn = document.querySelector(".tab-btn.active");
  if (activeBtn) moveIndicator(activeBtn);
});

const gameCards = document.querySelectorAll(".game-card");

gameCards.forEach((card) => {

  card.addEventListener("touchstart", (e) => {

    if (!card.classList.contains("active")) {
      e.preventDefault();

      gameCards.forEach(c => c.classList.remove("active"));

      card.classList.add("active");
    }
  }, { passive: false });
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".game-card")) {
    gameCards.forEach(c => c.classList.remove("active"));
  }
});
