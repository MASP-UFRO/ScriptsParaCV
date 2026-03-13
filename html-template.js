function renderMoodleHtml(htmlUrl, title, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const templateHtml = `
    <p></p>
    <h3 style="text-align: center;">
      <a href="${htmlUrl}" target="_blank" style="color: inherit; text-decoration: none;">
        <strong>${title}</strong>
      </a>
    </h3>
    <p style="text-align: center;">
      (Puedes usar el enlace de arriba para abrir este contenido interactivo en una pestaña completa):
    </p>
    
    <div 
      class="embed-responsive embed-responsive-16by9" 
      style="text-align: center;">
      <iframe 
        class="embed-responsive-item" 
        allowfullscreen=""
        src="${htmlUrl}" 
        style="border: 1px solid #ccc; border-radius: 8px;">
      </iframe>
    </div>
    <p><br /><br /></p>
  `;

  container.innerHTML = templateHtml;
}
