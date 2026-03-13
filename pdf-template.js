// pdf-template.js

function renderMoodlePdf(pdfId, title, containerId) {
  // 1. Find the container on the Moodle page
  const container = document.getElementById(containerId);
  if (!container) return;

  // 2. Define your central HTML template using backticks
  const templateHtml = `
    <p></p>
    <h3 style="text-align: center;">
      <a href="https://drive.google.com/file/d/${pdfId}/preview" target="_blank" style="color: #0056b3; text-decoration: none;">
        <strong>${title}</strong>
      </a>
    </h3>
    <p style="text-align: center;">
      (Usa el enlace de arriba o botón en la esquina superior derecha del visor para abrir el archivo a tamaño completo y/o descargarlo.)
    </p>
    <div class="embed-responsive embed-responsive-16by9" style="text-align: center;">
      <iframe 
        class="embed-responsive-item" 
        allowfullscreen=""
        src="https://drive.google.com/file/d/${pdfId}/preview" 
        style="width: 100%; height: 100%; border: none;"
        >
      </iframe>
    </div>
    <p><br /><br /></p>
  `;

  // 3. Inject the template
  container.innerHTML = templateHtml;
}
