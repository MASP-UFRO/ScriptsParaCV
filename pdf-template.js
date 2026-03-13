// pdf-template.js

function renderMoodlePdf(pdfId, title, containerId) {
  // 1. Find the container on the Moodle page
  const container = document.getElementById(containerId);
  if (!container) return;

  // 2. Define your central HTML template using backticks
  const templateHtml = `
    <p></p>
    <h3 style="text-align: center;">
      <strong>${title}</strong>
    </h3>
    <p style="text-align: center;">
      (Puedes usar el botón en la esquina superior derecha para abrir a tamaño completo y/o descargar el archivo.)
    </p>
    <div class="embed-responsive embed-responsive-16by9" style="text-align: center;">
      <iframe 
        class="embed-responsive-item" 
        allowfullscreen=""
        src="https://drive.google.com/file/d/${pdfId}/preview" 
        style="width: 100%; height: 600px; border: none;">
      </iframe>
    </div>
    <p><br /><br /></p>
  `;

  // 3. Inject the template
  container.innerHTML = templateHtml;
}
