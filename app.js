// EDITA ESTO: tus datos
const student = {
  name: "TU NOMBRE",
  group: "TU GRUPO"
};

// EDITA ESTO: añade entregas aquí (y sube los PDFs a /entregas/)
const deliveries = [
  {
    ep: 1,
    title: "EP1 · Tema X (antes de la sesión)",
    status: "done", // "done" | "todo"
    deliveredOn: "2026-02-01",
    evidence: [
      { label: "PDF del ejercicio", url: "entregas/EP1.pdf" }
    ],
    reflection:
      "Qué aprendí: ... (3–6 líneas). Qué me costó: ... Cómo lo resolvería mejor la próxima vez: ..."
  },
  {
    ep: 2,
    title: "EP2 · Tema Y",
    status: "todo",
    deliveredOn: null,
    evidence: [],
    reflection: ""
  },
  { ep: 3, title: "EP3 · Tema Z", status: "todo", deliveredOn: null, evidence: [], reflection: "" },
  { ep: 4, title: "EP4 · ...", status: "todo", deliveredOn: null, evidence: [], reflection: "" },
  { ep: 5, title: "EP5 · ...", status: "todo", deliveredOn: null, evidence: [], reflection: "" },
  { ep: 6, title: "EP6 · ...", status: "todo", deliveredOn: null, evidence: [], reflection: "" }
];

function fmtDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("es-ES", { year: "numeric", month: "short", day: "2-digit" });
}

function setHeader() {
  document.getElementById("studentName").textContent = student.name;
  document.getElementById("studentGroup").textContent = student.group;
  document.getElementById("year").textContent = new Date().getFullYear();
}

function renderProgress() {
  const grid = document.querySelector(".progress-grid");
  grid.innerHTML = "";

  deliveries
    .sort((a, b) => a.ep - b.ep)
    .forEach((d) => {
      const item = document.createElement("div");
      item.className = "progress-item";
      item.setAttribute("role", "listitem");

      const left = document.createElement("div");
      const title = document.createElement("strong");
      title.textContent = `EP${d.ep}`;
      const subtitle = document.createElement("div");
      subtitle.className = "muted small";
      subtitle.textContent = d.status === "done" ? `Entregado · ${fmtDate(d.deliveredOn)}` : "Pendiente";

      left.appendChild(title);
      left.appendChild(subtitle);

      const pill = document.createElement("span");
      pill.className = "pill " + (d.status === "done" ? "done" : "todo");
      pill.textContent = d.status === "done" ? "OK" : "Pendiente";

      item.appendChild(left);
      item.appendChild(pill);
      grid.appendChild(item);
    });
}

function renderDeliveries() {
  const grid = document.getElementById("deliveriesGrid");
  grid.innerHTML = "";

  const sorted = [...deliveries].sort((a, b) => a.ep - b.ep);

  sorted.forEach((d) => {
    const card = document.createElement("article");
    card.className = "delivery";
    card.setAttribute("aria-label", `Entrega EP${d.ep}`);

    const h3 = document.createElement("h3");
    h3.textContent = d.title;

    const meta = document.createElement("div");
    meta.className = "meta";

    const t1 = document.createElement("span");
    t1.className = "tag";
    t1.textContent = `EP${d.ep}`;

    const t2 = document.createElement("span");
    t2.className = "tag";
    t2.textContent = d.status === "done" ? `Entregado: ${fmtDate(d.deliveredOn)}` : "Pendiente";

    const t3 = document.createElement("span");
    t3.className = "tag";
    t3.textContent = d.status === "done" ? "Incluye reflexión" : "Sin reflexión aún";

    meta.appendChild(t1);
    meta.appendChild(t2);
    meta.appendChild(t3);

    const p = document.createElement("p");
    p.className = "muted";
    p.textContent =
      d.status === "done"
        ? (d.reflection || "Reflexión: (pendiente de completar)")
        : "Aún no entregado. Añadiré evidencia y reflexión tras la sesión.";

    const actions = document.createElement("div");
    actions.className = "actions";

    if (d.evidence && d.evidence.length) {
      d.evidence.forEach((e) => {
        const a = document.createElement("a");
        a.className = "button";
        a.href = e.url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.textContent = e.label;
        actions.appendChild(a);
      });
    } else {
      const a = document.createElement("span");
      a.className = "button secondary";
      a.textContent = "Sin evidencia subida";
      actions.appendChild(a);
    }

    // Botón de atajo opcional (no hace nada si no quieres)
    const how = document.createElement("a");
    how.className = "button secondary";
    how.href = "#criterios";
    how.textContent = "Ver requisitos";
    actions.appendChild(how);

    card.appendChild(h3);
    card.appendChild(meta);
    card.appendChild(p);
    card.appendChild(actions);

    grid.appendChild(card);
  });

  // KPI
  const done = deliveries.filter(d => d.status === "done").length;
  document.getElementById("kpiDone").textContent = done.toString();

  const last = deliveries
    .filter(d => d.status === "done" && d.deliveredOn)
    .sort((a, b) => (a.deliveredOn < b.deliveredOn ? 1 : -1))[0];

  document.getElementById("kpiLast").textContent = last
    ? `Última entrega: EP${last.ep} · ${fmtDate(last.deliveredOn)}`
    : "Última entrega: —";
}

setHeader();
renderProgress();
renderDeliveries();