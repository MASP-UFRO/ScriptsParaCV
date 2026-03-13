function renderDriveHtmlSnippet(htmlId, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // 1. PASTE YOUR APPS SCRIPT URL HERE
  const textReaderUrl = 'https://script.google.com/macros/s/AKfycbxO_3k0Sc6uvuxKBsD-0Bxl1orNDKoxXmrXYo0sdjvgOwhZsuEEsNpjeSb7ZHtdVwwRdw/exec'; 

  // 2. Fetch the raw HTML code from Drive
  fetch(`${textReaderUrl}?id=${htmlId}`)
    .then(response => response.text())
    .then(rawHtmlCode => {
      // 3. Inject the fragment directly into the Moodle page
      container.innerHTML = rawHtmlCode;
    })
    .catch(err => {
      console.error("Error fetching Drive HTML:", err);
      container.innerHTML = "<p>Error cargando las instrucciones del proyecto.</p>";
    });
}
