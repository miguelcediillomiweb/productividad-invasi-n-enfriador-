(() => {
  "use strict";

  const greetingEl = document.getElementById("greeting");
  const emojiEl = document.getElementById("greeting-emoji");
  const dateEl = document.getElementById("date");
  const clockEl = document.getElementById("clock");

  const dateFormatter = new Intl.DateTimeFormat("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  const timeFormatter = new Intl.DateTimeFormat("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });

  function updateDateTime() {
    const now = new Date();
    const hour = now.getHours();
    let greeting = "¡Buenas noches!";
    let emoji = "🌙";

    if (hour >= 5 && hour < 12) {
      greeting = "¡Buenos días!";
      emoji = "☀️";
    } else if (hour >= 12 && hour < 19) {
      greeting = "¡Buenas tardes!";
      emoji = "🌤️";
    }

    greetingEl.textContent = greeting;
    emojiEl.textContent = emoji;
    dateEl.textContent = dateFormatter.format(now);
    clockEl.textContent = timeFormatter.format(now);
    clockEl.dateTime = now.toISOString();
  }

  updateDateTime();
  window.setInterval(updateDateTime, 1000);

  // La gráfica es ilustrativa. Las barras oscilan suavemente entre 1 y 2 cajas
  // para comunicar visualmente que el comportamiento puede cambiar.
  const bars = Array.from(document.querySelectorAll(".bar"));
  const chart = document.querySelector(".chart");

  function animateBars() {
    bars.forEach((bar, index) => {
      const current = Number.parseFloat(bar.dataset.level || String(2 + (index % 4)));
      const next = Math.random() > 0.5 ? 2 : 1;
      const jitter = (Math.random() * 0.35).toFixed(2);
      const height = Math.min(10, next + Number(jitter));
      bar.dataset.level = String(height);
      bar.style.setProperty("--bar-height", (height * 10) + "%");
      bar.setAttribute("aria-label", bar.dataset.brand + ": nivel ilustrativo de " + next + (next === 1 ? " caja" : " cajas"));
    });
  }

  if (bars.length && chart) {
    bars.forEach((bar, index) => {
      const initial = 1 + (index % 2);
      bar.dataset.level = String(initial);
      bar.style.setProperty("--bar-height", (initial * 10) + "%");
      bar.setAttribute("aria-label", bar.dataset.brand + ": nivel ilustrativo de " + initial + (initial === 1 ? " caja" : " cajas"));
    });
    window.setInterval(animateBars, 2100);
  }
})();