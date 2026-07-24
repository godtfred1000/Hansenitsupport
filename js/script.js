const menuButton = document.querySelector(".menu-btn");
const nav = document.querySelector(".main-nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });
}

document.querySelectorAll("#year").forEach((el) => {
  el.textContent = new Date().getFullYear();
});
