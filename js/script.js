const SITE_CONFIG = {
  email: "DIN-EPOST@EKSEMPEL.NO",
  phone: "DITT-TELEFONNUMMER"
};

const menuButton = document.querySelector(".menu-btn");
const nav = document.querySelector(".main-nav");
if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });
}

document.querySelectorAll("#year").forEach(el => el.textContent = new Date().getFullYear());

const emailReady = !SITE_CONFIG.email.includes("EKSEMPEL");
const phoneReady = !SITE_CONFIG.phone.includes("DITT-");

document.querySelectorAll(".config-email").forEach(el => el.textContent = emailReady ? SITE_CONFIG.email : "E-post legges inn");
document.querySelectorAll(".config-phone").forEach(el => el.textContent = phoneReady ? SITE_CONFIG.phone : "Telefon legges inn");
document.querySelectorAll(".config-email-link").forEach(el => {
  el.textContent = emailReady ? SITE_CONFIG.email : "E-post legges inn";
  el.href = emailReady ? `mailto:${SITE_CONFIG.email}` : "#";
});
document.querySelectorAll(".config-phone-link").forEach(el => {
  el.textContent = phoneReady ? SITE_CONFIG.phone : "Telefon legges inn";
  el.href = phoneReady ? `tel:${SITE_CONFIG.phone.replace(/\s/g, "")}` : "#";
});

const form = document.querySelector("#contact-form");
if (form) {
  form.addEventListener("submit", event => {
    event.preventDefault();
    const status = document.querySelector("#form-status");
    if (!emailReady) {
      status.textContent = "Legg først inn riktig e-postadresse øverst i js/script.js.";
      return;
    }
    const data = new FormData(form);
    const subject = `Forespørsel om hjemmeside fra ${data.get("navn")}`;
    const body = [
      `Navn: ${data.get("navn")}`,
      `Bedrift: ${data.get("bedrift") || "-"}`,
      `E-post: ${data.get("epost")}`,
      `Telefon: ${data.get("telefon") || "-"}`,
      `Tjeneste: ${data.get("tjeneste")}`,
      "",
      "Beskrivelse:",
      data.get("melding")
    ].join("\n");
    window.location.href = `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.textContent = "E-postprogrammet åpnes.";
  });
}