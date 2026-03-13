function renderMoodleDriveHtmlDirect(htmlId, title, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // 1. PASTE YOUR APPS SCRIPT TEXT READER URL HERE
  const textReaderUrl = 'https://script.google.com/macros/s/AKfycbxO_3k0Sc6uvuxKBsD-0Bxl1orNDKoxXmrXYo0sdjvgOwhZsuEEsNpjeSb7ZHtdVwwRdw/exec'; 

  // 2. Build the layout with an EMPTY iframe (notice the unique ID for the iframe)
  container.innerHTML = `
    <p></p>
    <h3 style="text-align: center;"><strong>${title}</strong></h3>
    <div class="embed-responsive embed-responsive-16by9" style="text-align: center;">
      <iframe 
        id="iframe-${htmlId}"
        class="embed-responsive-item" 
        style="border: 1px solid #ccc; border-radius: 8px;">
      </iframe>
    </div>
    <p><br /><br /></p>
  `;

  // 3. Fetch the raw HTML code and inject it as the document source
  fetch(`${textReaderUrl}?id=${htmlId}`)
    .then(response => response.text())
    .then(rawHtmlCode => {
      // The magic happens here: srcdoc reads the string and renders a full webpage!
      document.getElementById(`iframe-${htmlId}`).srcdoc = rawHtmlCode;
    })
    .catch(err => {
      console.error(err);
      container.innerHTML = "Error cargando el contenido HTML.";
    });
}
