// 1. THE HTML PHONEBOOK
// Each entry is either:
//   { type: "github", url: "https://username.github.io/repo/path/file.html" }
//   { type: "drive",  id: "GOOGLE_FILE_ID" }

const htmlRegistry = {
  "ICF177_Bibliografia":    { type: "github", url: "https://masp-ufro.github.io/ICF177/InfoHTMLs/ICF177_Bibliografia.html" },
  "ICF177_Evaluaciones":    { type: "github", url: "https://masp-ufro.github.io/ICF177/InfoHTMLs/ICF177_Evaluaciones.html" },
  "ICF177_Pautas":          { type: "github", url: "https://masp-ufro.github.io/ICF177/InfoHTMLs/ICF177_Pautas.html" },
  "ICF177_Proy_Descripcion":{ type: "drive",  id: "1B8nd-95dKr0RNjG7vEdLL4wJOZSh45dO" },
  "ICF177_Proy_Fechas":     { type: "drive",  id: "1urY08CsOjSuN7bb07fgAJEH-_Noa7eNi" },
};

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxO_3k0Sc6uvuxKBsD-0Bxl1orNDKoxXmrXYo0sdjvgOwhZsuEEsNpjeSb7ZHtdVwwRdw/exec';

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

  // Cache key works for both sources
  const cacheKey = `moodle_html_${htmlKey}`;
  const cached = sessionStorage.getItem(cacheKey);
  if (cached) {
    container.innerHTML = cached;
    return;
  }

  container.innerHTML = `<p style="text-align:center;color:#666;font-style:italic;">Cargando contenido...</p>`;

  // Resolve the fetch URL based on source type
  const fetchUrl = entry.type === "github"
    ? entry.url
    : `${APPS_SCRIPT_URL}?id=${entry.id}`;

  fetch(fetchUrl)
    .then(r => r.text())
    .then(html => {
      sessionStorage.setItem(cacheKey, html);
      container.innerHTML = html;
    })
    .catch(err => {
      console.error(`Error fetching "${htmlKey}":`, err);
      container.innerHTML = `<p style="color:red;">Error cargando las instrucciones.</p>`;
    });
}
