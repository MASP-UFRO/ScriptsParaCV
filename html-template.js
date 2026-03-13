function renderDriveHtmlSnippet(htmlId, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // 1. Check Student's Local Browser Memory
  const savedHtml = sessionStorage.getItem(`moodle_html_${htmlId}`);
  if (savedHtml) {
    container.innerHTML = savedHtml;
    return;
  }

  // 2. Your specific Google Apps Script URL
  const textReaderUrl = 'https://script.google.com/macros/s/AKfycbxO_3k0Sc6uvuxKBsD-0Bxl1orNDKoxXmrXYo0sdjvgOwhZsuEEsNpjeSb7ZHtdVwwRdw/exec'; 

  // 3. Fetch from Google if not saved locally
  fetch(`${textReaderUrl}?id=${htmlId}`)
    .then(response => response.text())
    .then(rawHtmlCode => {
      // Save it in the browser for next time
      sessionStorage.setItem(`moodle_html_${htmlId}`, rawHtmlCode);
      // Inject into Moodle
      container.innerHTML = rawHtmlCode;
    })
    .catch(err => {
      console.error("Error fetching Drive HTML:", err);
      container.innerHTML = "<p>Error cargando las instrucciones del proyecto.</p>";
    });
}
