// 1. THE HTML PHONEBOOK
// Each entry is either:
//   { type: "github", url: "https://username.github.io/repo/path/file.html" }
//   { type: "drive",  id: "GOOGLE_FILE_ID" }

const htmlRegistry = {
  "ICF177_Bibliografia":    { type: "github", url: "https://masp-ufro.github.io/ICF177/InfoHTMLs/ICF177_Bibliografia.html" },
  "ICF177_Evaluaciones":    { type: "github", url: "https://masp-ufro.github.io/ICF177/InfoHTMLs/ICF177_Evaluaciones.html" },
  "ICF177_Pautas":          { type: "github", url: "https://masp-ufro.github.io/ICF177/InfoHTMLs/ICF177_Pautas.html" },
  "ICF177_Proy_Descripcion":{ type: "github", url: "https://masp-ufro.github.io/ICF177/InfoHTMLs/ICF177_Proy_Descripcion.html" },
  "ICF177_Proy_Fechas":     { type: "github", url: "https://masp-ufro.github.io/ICF177/InfoHTMLs/ICF177_Proy_Fechas.html" },
};

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxO_3k0Sc6uvuxKBsD-0Bxl1orNDKoxXmrXYo0sdjvgOwhZsuEEsNpjeSb7ZHtdVwwRdw/exec';

const GITHUB_CACHE_TTL_MS = 30 * 1000;        // 30 seconds
const DRIVE_CACHE_TTL_MS  = 10 * 60 * 1000;   // 10 minutes

// 2. THE RENDER FUNCTION
function renderDriveHtmlSnippet(htmlKey) {
  const targetId = `html-contained-${htmlKey}`;
  const container = document.getElementById(targetId);

  if (!container) {
    console.error(`Error: Moodle is missing the <div id="${targetId}"></div>`);
    return;
  }

  const entry = htmlRegistry[htmlKey];

  if (!entry) {
    container.innerHTML = `<p style="color:red;">Error: HTML "${htmlKey}" no registrado.</p>`;
    return;
  }

  const cacheKey = `moodle_html_${htmlKey}`;
  const ttl = entry.type === "github" ? GITHUB_CACHE_TTL_MS : DRIVE_CACHE_TTL_MS;

  // Check cache (same logic for both types now)
  const cachedRaw = sessionStorage.getItem(cacheKey);
  if (cachedRaw) {
    const { html, timestamp } = JSON.parse(cachedRaw);
    if (Date.now() - timestamp < ttl) {
      container.innerHTML = html;
      return;
    }
    sessionStorage.removeItem(cacheKey); // Expired — clean up
  }

  container.innerHTML = `<p style="text-align:center;color:#666;font-style:italic;">Cargando contenido...</p>`;

  const fetchUrl = entry.type === "github"
    ? entry.url
    : `${APPS_SCRIPT_URL}?id=${entry.id}`;

  fetch(fetchUrl)
    .then(r => r.text())
    .then(html => {
      sessionStorage.setItem(cacheKey, JSON.stringify({ html, timestamp: Date.now() }));
      container.innerHTML = html;
    })
    .catch(err => {
      console.error(`Error fetching "${htmlKey}":`, err);
      container.innerHTML = `<p style="color:red;">Error cargando las instrucciones.</p>`;
    });
}
