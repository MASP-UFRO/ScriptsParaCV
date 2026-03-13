function renderDriveHtmlSnippet(htmlId, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // 1. Check if the student's browser ALREADY downloaded this today
  const savedHtml = sessionStorage.getItem(`moodle_html_${htmlId}`);
  if (savedHtml) {
    // INSTANT LOAD
    container.innerHTML = savedHtml;
    return;
  }

  // 2. PASTE YOUR APPS SCRIPT URL HERE
  const textReaderUrl = 'https://script.google.com/macros/s/AKfycbxO_3k0Sc6uvuxKBsD-0Bxl1orNDKoxXmrXYo0sdjvgOwhZsuEEsNpjeSb7ZHtdVwwRdw/exec'; 

  // 3. If not saved, fetch from Google
  fetch(`${textReaderUrl}?id=${htmlId}`)
    .then(response => response.text())
    .then(rawHtmlCode => {
      // Save it in the browser memory for the rest of the session!
      sessionStorage.setItem(`moodle_html_${htmlId}`, rawHtmlCode);
      // Inject into Moodle
      container.innerHTML = rawHtmlCode;
    })
    .catch(err => {
      console.error("Error fetching Drive HTML:", err);
      container.innerHTML = "<p>Error cargando las instrucciones del proyecto.</p>";
    });
}
