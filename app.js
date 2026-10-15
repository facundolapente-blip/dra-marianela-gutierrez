/* =========================================================
   CONFIGURACIÓN: cambiar acá los datos de la doctora y la clínica.
   Todo el sitio se actualiza desde este objeto.
   ========================================================= */
const CONFIG = {
  medico: "Dra. Marianela Gutiérrez",
  medicoCorto: "la Dra. Gutiérrez",
  especialidad: "Gastroenteróloga y terapeuta",
  bio: "Médica gastroenteróloga. Integra la gastroenterología con la homeopatía, la terapia floral y la apiterapia para acompañar a cada paciente de forma personalizada, mirando más allá del síntoma.",
  // Frase tomada de su página de Facebook
  cita: "Cada persona llega a consulta con una historia, un contexto, hábitos, preocupaciones y emociones.",
  // Credencial principal que va sobre la foto
  credencial: "Médica gastroenteróloga",
  credencialSub: "Homeopatía, terapia floral y apiterapia",
  facts: [
    ["Especialidad", "Gastroenterología"],
    ["Terapias", "Homeopatía, terapia floral y apiterapia"],
    ["Consultorios", "Montevideo, Rosario y San José"],
    ["Atención", "Presencial y personalizada"],
  ],
  // WhatsApp: código de país + número, sin 0 ni espacios
  whatsapp: "59894401130",
  telefono: "094 401 130",
  instagram: "https://www.instagram.com/dramarianelagutierrez/",
  facebook: "https://www.facebook.com/DraMarianelaGutierrez/",
  // Consultorios: n = nombre en la web, d = departamento, q = búsqueda para el mapa (cambiar por la dirección exacta cuando la tengamos)
  sedes: [
    { n: "Montevideo", d: "Montevideo", q: "Montevideo, Uruguay" },
    { n: "Rosario", d: "Colonia", q: "Rosario, Colonia, Uruguay" },
    { n: "San José", d: "San José", q: "San José de Mayo, Uruguay" },
  ],
  sedesTexto: "Montevideo, Rosario y San José",
  horarioCorto: "Atención personalizada con agenda previa",
  // FOTOS: su foto de perfil (camisa celeste, fondo blanco), guardada en /img
  fotos: {
    avatar: "img/dra-marianela-gutierrez-avatar.jpg",
    retrato: "img/dra-marianela-gutierrez.jpg",
    consultorio: "img/dra-marianela-gutierrez.jpg",
  },
  // Bloques de atención por día de la semana (0 = domingo). DEMO: confirmar los días reales de cada consultorio.
  agenda: {
    1: [[9, 13], [15, 19]],
    2: [[9, 13], [15, 19]],
    3: [[9, 13], [15, 19]],
    4: [[9, 13], [15, 19]],
    5: [[9, 13], [15, 19]],
    6: [[9, 12]],
  },
  intervaloMin: 30,
  diasAdelante: 60,
  // ic = icono (ver ICONOS). destacado: true = va arriba en tarjeta; el primero se muestra grande.
  servicios: [
    { t: "Consulta de gastroenterología", d: "Una consulta sin apuro para entender qué te pasa: síntomas digestivos, hábitos, alimentación y cómo te sentís. Con diagnóstico médico y un plan a tu medida.", ic: "consulta", destacado: true },
    { t: "Homeopatía", d: "Un abordaje complementario que tiene en cuenta a la persona en su totalidad. Se indica de forma individual y siempre con evaluación médica.", ic: "flor", destacado: true },
    { t: "Terapia floral", d: "Esencias florales como acompañamiento en momentos de estrés, ansiedad o cambios, que muchas veces también se sienten en el cuerpo.", ic: "gotero", destacado: true },
    { t: "Apiterapia", d: "Uso terapéutico de productos de la colmena, indicado y supervisado por la doctora según cada caso.", ic: "abeja", destacado: true },
    { t: "Reflujo, gastritis y acidez", d: "Ardor, dolor de estómago o digestiones pesadas que se repiten.", ic: "estomago" },
    { t: "Colon irritable e hinchazón", d: "Gases, distensión, diarrea o estreñimiento que afectan tu día a día.", ic: "intestino" },
    { t: "Dolor digestivo que se repite", d: "Molestias crónicas que piden mirar más allá del síntoma.", ic: "colon" },
  ],
  faq: [
    ["¿Cómo es la primera consulta?", "Es una consulta sin apuro. Además de tus síntomas, hablamos de tu historia, tu alimentación, tus hábitos y cómo te sentís. Si tenés estudios o análisis previos, traelos."],
    ["¿La homeopatía reemplaza el tratamiento médico?", "No. La doctora es médica gastroenteróloga: la homeopatía, la terapia floral y la apiterapia se indican como complemento, siempre con una evaluación médica de por medio."],
    ["¿Qué es la apiterapia?", "Es el uso terapéutico de productos de la colmena. En la consulta la doctora evalúa si es adecuada para tu caso y cómo indicarla."],
    ["¿En qué ciudades atiende?", "En Montevideo, Rosario y San José, de forma presencial. Cuando confirmamos tu turno te enviamos la dirección exacta del consultorio."],
    ["¿Qué tengo que traer?", "Tu cédula, los estudios y análisis que tengas, y la lista de medicamentos o suplementos que tomás."],
    ["¿Cómo cambio o cancelo mi turno?", "Escribinos al mismo WhatsApp con al menos 24 horas de anticipación y lo reprogramamos."],
  ],
};

/* ---------- Utilidades ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
const pad = (n) => String(n).padStart(2, "0");
const sameDay = (a, b) => a && b && a.toDateString() === b.toDateString();
const fechaLarga = (d) => `${DIAS[d.getDay()]} ${d.getDate()} de ${MESES[d.getMonth()]}`;
const horaTxt = (min) => `${pad(Math.floor(min / 60))}:${pad(min % 60)}`;
const waLink = (text) => `https://wa.me/${CONFIG.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

/* ---------- Rellenar contenido desde CONFIG ---------- */
$$("[data-cfg]").forEach((el) => { el.textContent = CONFIG[el.dataset.cfg] ?? ""; });
$$('[data-href="wa"]').forEach((a) => { a.href = waLink(`Hola, quería hacer una consulta con ${CONFIG.medicoCorto}.`); });
$$('[data-href="tel"]').forEach((a) => { a.href = `tel:${CONFIG.telefono.replace(/\s/g, "")}`; });
$$('[data-href="ig"]').forEach((a) => { a.href = CONFIG.instagram; });
$$('[data-href="fb"]').forEach((a) => { a.href = CONFIG.facebook; });
$$("[data-img]").forEach((img) => { img.src = CONFIG.fotos[img.dataset.img] || ""; });
$("#year").textContent = new Date().getFullYear();

$("#facts").innerHTML = CONFIG.facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("");

/* Iconos propios de servicios: grilla 24, trazo 1.5, sin relleno (se pintan con .sico) */
const ICONOS = {
  consulta: '<path d="M5 3h-.5A1.5 1.5 0 0 0 3 4.5V9a5 5 0 0 0 10 0V4.5A1.5 1.5 0 0 0 11.5 3H11"/><path d="M8 14v1a5 5 0 0 0 10 0v-2.5"/><circle cx="18" cy="10.5" r="2"/>',
  endoscopia: '<rect x="3" y="2.5" width="6" height="7" rx="2"/><path d="M9 5h1.5"/><path d="M6 9.5v4A4.5 4.5 0 0 0 10.5 18H13a4 4 0 0 0 4-4v-1.5"/><circle cx="17" cy="10.5" r="2"/><path d="M17 7V5.5M19.4 8.1l1.1-1.1M20.5 10.5H22"/>',
  colon: '<path d="M7.5 20H6a2 2 0 0 1-2-2V6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5V15a3 3 0 0 1-3 3h-2.5a1.5 1.5 0 0 0-1.5 1.5V21"/><path d="M4 9.5h2M4 14h2M9.5 4v2M14.5 4v2M20 9.5h-2M20 13.5h-2"/>',
  estomago: '<path d="M7 2v4c0 3.6 1.5 6.5 3.8 7.7.9.5.6 1.8-.5 1.8H4"/><path d="M10 2v3.2c1-.9 2.3-1.4 3.8-1.3 3.5.2 6.2 3.4 6.2 7.6 0 4.7-3.6 8.5-8 8.5-1.9 0-3.4-.5-4.6-1.5H4"/><path d="M13 11.5c.8-.7 1.7-.7 2.5 0s1.7.7 2.5 0"/>',
  higado: '<path d="M3.5 8.2C3.5 6.4 5 5 6.8 5c4.6 0 9.3.8 12.6 2.3 1.3.6 1.5 2.3.4 3.2-3 2.7-7 5.4-11 6.5-2.9.8-5.3-1.4-5.3-4.3Z"/><path d="M12 5.6c-.6 2.4-.4 5 .6 7.6"/><path d="M9.3 16.9v1.6a1.75 1.75 0 0 0 3.5 0v-3.3"/>',
  intestino: '<path d="M4 4.5h12.5a2.5 2.5 0 0 1 0 5h-9a2.5 2.5 0 0 0 0 5h9a2.5 2.5 0 0 1 0 5H11"/>',
  flor: '<circle cx="12" cy="12" r="2.2"/><path d="M12 9.8C10 8 9.6 5.4 12 3c2.4 2.4 2 5 0 6.8ZM14.2 12c1.8-2 4.4-2.4 6.8 0-2.4 2.4-5 2-6.8 0ZM12 14.2c2 1.8 2.4 4.4 0 6.8-2.4-2.4-2-5 0-6.8ZM9.8 12C8 14 5.4 14.4 3 12c2.4-2.4 5-2 6.8 0Z"/>',
  gotero: '<path d="M10 2.5h4v3.5h-4z"/><path d="M8.5 6h7"/><path d="M8 9h8v10a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3Z"/><path d="M12 12.8c-1 1.2-1.6 2.1-1.6 2.8a1.6 1.6 0 0 0 3.2 0c0-.7-.6-1.6-1.6-2.8Z"/>',
  abeja: '<ellipse cx="12" cy="15" rx="4" ry="5.5"/><path d="M8.4 13.2h7.2M8.4 16.6h7.2"/><circle cx="12" cy="7.6" r="1.9"/><path d="M10.4 10.2C8.4 7 5 6.6 4 8.5s1.6 4.4 4.9 4.4M13.6 10.2c2-3.2 5.4-3.6 6.4-1.7s-1.6 4.4-4.9 4.4"/><path d="M11 5.9 9.8 3.2M13 5.9l1.2-2.7"/>',
};
const icono = (k) => `<svg class="sico" viewBox="0 0 24 24" aria-hidden="true">${ICONOS[k] || ""}</svg>`;
const btnServicio = (s, cls) => `<button type="button" class="btn ${cls}" data-book aria-label="Sacar hora: ${s.t}">Sacar hora</button>`;

$("#services").innerHTML = CONFIG.servicios.filter((s) => s.destacado).map((s, i) => `
  <li class="service${i === 0 ? " service-feat" : ""}">
    <span class="service-ico">${icono(s.ic)}</span>
    <div class="service-txt"><h3>${s.t}</h3><p>${s.d}</p></div>
    ${btnServicio(s, i === 0 ? "btn-primary" : "btn-ghost")}
  </li>`).join("");

$("#conditions").innerHTML = CONFIG.servicios.filter((s) => !s.destacado).map((s) => `
  <li class="condition">
    ${icono(s.ic)}
    <h4>${s.t}</h4>
    <p>${s.d}</p>
    ${btnServicio(s, "btn-link")}
  </li>`).join("");

$("#faq").innerHTML = CONFIG.faq.map(([q, a], i) => `<details${i === 0 ? " open" : ""}><summary><span class="faq-q">${q}</span><span class="faq-ico" aria-hidden="true"></span></summary><div class="faq-a"><p>${a}</p></div></details>`).join("");

/* ---------- Estado de la reserva ---------- */
const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
const limite = new Date(hoy); limite.setDate(limite.getDate() + CONFIG.diasAdelante);
const state = { sede: CONFIG.sedes[0].n, fecha: null, hora: null, mes: new Date(hoy.getFullYear(), hoy.getMonth(), 1) };

// DEMO: marca algunos horarios como ocupados para que el calendario se vea real.
// Reemplazar por la disponibilidad real (Google Calendar, Cal.com, etc.).
function ocupadoDemo(d, min) {
  const s = (d.getFullYear() * 372 + d.getMonth() * 31 + d.getDate()) * 1440 + min;
  return ((s * 9301 + 49297) % 233280) / 233280 < 0.38;
}

function horariosLibres(d) {
  const bloques = CONFIG.agenda[d.getDay()];
  if (!bloques || d < hoy || d > limite) return [];
  const ahora = new Date();
  const minAhora = sameDay(d, ahora) ? ahora.getHours() * 60 + ahora.getMinutes() + 60 : -1;
  const out = [];
  bloques.forEach(([a, z]) => {
    for (let m = a * 60; m < z * 60; m += CONFIG.intervaloMin) {
      if (m > minAhora && !ocupadoDemo(d, m)) out.push(m);
    }
  });
  return out;
}

function proximoDiaLibre(desde) {
  const d = new Date(desde);
  for (let i = 0; i <= CONFIG.diasAdelante; i++) {
    if (horariosLibres(d).length) return new Date(d);
    d.setDate(d.getDate() + 1);
  }
  return null;
}

/* ---------- Consultorio ---------- */
function renderSedes() {
  $("#sedes").innerHTML = CONFIG.sedes.map((s) =>
    `<button type="button" class="chip" role="radio" aria-checked="${s.n === state.sede}" data-s="${s.n}">${s.n}</button>`).join("");
}
$("#sedes").addEventListener("click", (e) => {
  const b = e.target.closest(".chip"); if (!b) return;
  state.sede = b.dataset.s; renderSedes(); update();
});

/* ---------- Calendario ---------- */
function renderCal() {
  const { mes } = state;
  $("#calMonth").textContent = `${MESES[mes.getMonth()]} ${mes.getFullYear()}`;
  $("#calPrev").disabled = mes <= new Date(hoy.getFullYear(), hoy.getMonth(), 1);
  $("#calNext").disabled = new Date(mes.getFullYear(), mes.getMonth() + 1, 1) > limite;

  const offset = (mes.getDay() + 6) % 7;
  const total = new Date(mes.getFullYear(), mes.getMonth() + 1, 0).getDate();
  let html = "<span></span>".repeat(offset);
  for (let i = 1; i <= total; i++) {
    const d = new Date(mes.getFullYear(), mes.getMonth(), i);
    const libres = horariosLibres(d).length;
    const cls = ["day", sameDay(d, hoy) ? "is-today" : ""].join(" ");
    const label = `${fechaLarga(d)}${libres ? `, ${libres} horarios libres` : ", sin horarios"}`;
    html += `<button type="button" class="${cls}" data-d="${d.toISOString()}" aria-label="${label}" aria-pressed="${sameDay(d, state.fecha)}" ${libres ? "" : "disabled"}>${i}</button>`;
  }
  $("#calGrid").innerHTML = html;
}
$("#calGrid").addEventListener("click", (e) => {
  const b = e.target.closest(".day"); if (!b || b.disabled) return;
  elegirFecha(new Date(b.dataset.d));
});
$("#calPrev").addEventListener("click", () => { state.mes.setMonth(state.mes.getMonth() - 1); renderCal(); });
$("#calNext").addEventListener("click", () => { state.mes.setMonth(state.mes.getMonth() + 1); renderCal(); });

function elegirFecha(d) {
  state.fecha = d; state.hora = null;
  state.mes = new Date(d.getFullYear(), d.getMonth(), 1);
  renderCal(); renderSlots(); update();
}

/* ---------- Horarios ---------- */
function renderSlots() {
  const cont = $("#slots");
  if (!state.fecha) { cont.innerHTML = `<p class="slots-empty">Elegí un día en el calendario.</p>`; $("#diaElegido").textContent = ""; return; }
  $("#diaElegido").textContent = `del ${fechaLarga(state.fecha)}`;
  const libres = horariosLibres(state.fecha);
  if (!libres.length) {
    const sig = new Date(state.fecha); sig.setDate(sig.getDate() + 1);
    const prox = proximoDiaLibre(sig);
    cont.innerHTML = `<div class="slots-empty"><p>No quedan horarios este día.</p>${prox ? `<button type="button" class="btn btn-ghost" id="irProx">Ver el ${fechaLarga(prox)}</button>` : ""}</div>`;
    if (prox) $("#irProx").onclick = () => elegirFecha(prox);
    return;
  }
  const grupos = [["Mañana", libres.filter((m) => m < 13 * 60)], ["Tarde", libres.filter((m) => m >= 13 * 60)]];
  cont.innerHTML = grupos.filter(([, l]) => l.length).map(([n, l]) => `
    <div class="slot-group"><span>${n}</span><div class="slot-list">
      ${l.map((m) => `<button type="button" class="slot" data-m="${m}" aria-pressed="${state.hora === m}">${horaTxt(m)}</button>`).join("")}
    </div></div>`).join("");
}
$("#slots").addEventListener("click", (e) => {
  const b = e.target.closest(".slot"); if (!b) return;
  state.hora = Number(b.dataset.m);
  $$(".slot").forEach((s) => s.setAttribute("aria-pressed", s === b));
  update();
  if (!$("#nombre").value.trim()) $("#nombre").focus({ preventScroll: true });
  // Si el botón de confirmar quedó fuera de pantalla, lo acercamos con un desplazamiento suave
  const falta = $("#confirmBtn").getBoundingClientRect().bottom - innerHeight + 16;
  if (falta > 0) scrollBy({ top: falta, behavior: reduceMotion ? "auto" : "smooth" });
});

/* ---------- Nombre + confirmación ---------- */
const nombre = $("#nombre");
nombre.addEventListener("input", () => {
  if (nombre.value.trim()) { nombre.removeAttribute("aria-invalid"); $("#nombreError").textContent = ""; }
  update();
});

const WA_ICON = `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>`;
function faltante() {
  if (!state.fecha) return "dia";
  if (state.hora == null) return "hora";
  if (!nombre.value.trim()) return "nombre";
  return null;
}
function update() {
  const f = faltante();
  const btn = $("#confirmBtn");
  const textos = { dia: "Elegí un día", hora: "Elegí un horario", nombre: "Escribí tu nombre" };
  btn.classList.toggle("is-ready", !f);
  btn.innerHTML = f ? textos[f] : `${WA_ICON}Confirmar turno por WhatsApp`;
  btn.setAttribute("aria-disabled", String(!!f));

  const sum = $("#summary");
  sum.innerHTML = state.fecha && state.hora != null
    ? `Consultorio de <strong>${state.sede}</strong>, el ${fechaLarga(state.fecha)} a las <strong>${horaTxt(state.hora)}</strong>`
    : "";
}

function flash(el) { el.classList.remove("is-flash"); void el.offsetWidth; el.classList.add("is-flash"); }

function mensaje() {
  return [
    `Hola, quiero sacar hora con ${CONFIG.medicoCorto}.`,
    `Consultorio: ${state.sede}`,
    `Día: ${fechaLarga(state.fecha)}`,
    `Hora: ${horaTxt(state.hora)}`,
    `Nombre: ${nombre.value.trim()}`,
  ].join("\n");
}

$("#confirmBtn").addEventListener("click", () => {
  const f = faltante();
  if (f === "dia") { flash($("#calGrid")); $("#calGrid button:not(:disabled)")?.focus(); return; }
  if (f === "hora") { flash($("#slots")); $(".slot")?.focus(); return; }
  if (f === "nombre") {
    nombre.setAttribute("aria-invalid", "true");
    nombre.setAttribute("aria-describedby", "nombreError");
    $("#nombreError").textContent = "Escribí tu nombre para que sepamos a quién agendar.";
    nombre.focus(); return;
  }
  const url = waLink(mensaje());
  window.open(url, "_blank", "noopener");
  $("#doneText").textContent = `Consultorio de ${state.sede}, ${fechaLarga(state.fecha)} a las ${horaTxt(state.hora)}.`;
  $("#doneWa").href = url;
  $("#bookingForm").hidden = true;
  $("#bookingDone").hidden = false;
  $("#bookingDone").focus({ preventScroll: true });
});

$("#otroTurno").addEventListener("click", () => {
  state.hora = null;
  $("#bookingDone").hidden = true;
  $("#bookingForm").hidden = false;
  renderCal(); renderSlots(); update();
});

/* ---------- Todos los "Sacar hora" llevan al calendario ---------- */
function irAReserva() {
  if (!$("#bookingDone").hidden) $("#otroTurno").click();
  $("#turno").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  setTimeout(() => {
    const target = state.hora == null ? $(".slot") : nombre;
    target?.focus({ preventScroll: true });
    flash($("#turno"));
  }, reduceMotion ? 0 : 450);
}
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-book]");
  if (b) { e.preventDefault(); irAReserva(); }
});

/* ---------- Inicio: preselecciona el primer día con lugar ---------- */
renderSedes();
const primero = proximoDiaLibre(hoy);
if (primero) elegirFecha(primero); else { renderCal(); renderSlots(); update(); }

/* ---------- WhatsApp flotante: se oculta donde ya hay un botón de WhatsApp visible ---------- */
const waFloat = $(".wa-float");
if (waFloat && "IntersectionObserver" in window) {
  const visibles = new Set();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => (e.isIntersecting ? visibles.add(e.target) : visibles.delete(e.target)));
    waFloat.classList.toggle("is-hidden", visibles.size > 0);
  }, { threshold: 0.15 });
  $$("#turno, .final-cta, .site-footer").forEach((el) => io.observe(el));
}

/* ---------- Header: sombra al hacer scroll y sección activa en el menú ---------- */
const header = $(".site-header");
const onScroll = () => header.classList.toggle("is-scrolled", scrollY > 8);
addEventListener("scroll", onScroll, { passive: true });
onScroll();
const navLinks = $$(".main-nav a");
if ("IntersectionObserver" in window) {
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      navLinks.forEach((a) => {
        const on = a.getAttribute("href") === `#${e.target.id}`;
        a.classList.toggle("is-active", on);
        on ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  navLinks.forEach((a) => { const s = $(a.getAttribute("href")); if (s) spy.observe(s); });
}

/* ---------- Consultorios: lista que cambia el mapa y preselecciona la reserva ---------- */
const mapsLink = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
function mostrarSede(i) {
  const s = CONFIG.sedes[i];
  $("#mapFrame").src = `https://www.google.com/maps?q=${encodeURIComponent(s.q)}&z=13&output=embed`;
  $("#mapSede").textContent = s.n;
  $("#mapLink").href = mapsLink(s.q);
  $$(".sede").forEach((b, j) => b.setAttribute("aria-selected", String(i === j)));
}
$("#sedeList").innerHTML = CONFIG.sedes.map((s, i) => `
  <button type="button" class="sede" role="tab" data-i="${i}">
    <span class="sede-n">${s.n}</span><span class="sede-d">Departamento de ${s.d}</span>
  </button>`).join("");
$("#sedeList").addEventListener("click", (e) => {
  const b = e.target.closest(".sede"); if (!b) return;
  const i = Number(b.dataset.i);
  mostrarSede(i);
  state.sede = CONFIG.sedes[i].n; renderSedes(); update();
});
mostrarSede(0);
