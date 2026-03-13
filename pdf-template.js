function renderMoodlePdf(pdfId, title, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const templateHtml = `
    <p></p>
    <h3 style="text-align: center;">
      <a href="https://drive.google.com/file/d/${pdfId}/preview" target="_blank" style="color: #0056b3; text-decoration: none;">
        <strong>${title}</strong>
      </a>
    </h3>
    <p style="text-align: center;">
      (Puedes usar el enlace de arriba o el botón en la esquina superior derecha para abrir a tamaño completo y/o descargar el archivo):
    </p>
    <div 
      class="embed-responsive embed-responsive-16by9" 
      style="text-align: center;">
      <iframe 
        class="embed-responsive-item" 
        allowfullscreen=""
        src="https://drive.google.com/file/d/${pdfId}/preview" 
        >
      </iframe>
    </div>
    <p><br /><br /></p>
  `;

  container.innerHTML = templateHtml;
}
