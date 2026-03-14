// 1. THE PHONEBOOK (Registry)
// The Master Database: ids and titles live here now.
const pdfRegistry = {
	"ICF177_L01": {
    	id: 	"1f7g5h3oOzOi4be2bhD-1m8M_XkS9_gyq", 
    	title: 	"Listado 1 - Momentum lineal e impulso"
	},
	"ICF177_L02": {
    	id: 	"1gzLPYYiZj4cAhfJ8yGlZG8lcx3fSoaJG", 
    	title: 	"Listado 2 - Colisiones"
	},
	"ICF177_L03": {
		id: 	"18-gI8FPnvmvpwfxHf5jn9IR0VorsntJI", 
    	title: 	"Listado 3 - Sistemas de Partículas I"
	},
	"ICF177_L04": {
    	id: 	"18iYiKdL-1tdobbtnYCEErMWlr06j9gZT", 
    	title: 	"Listado 4 - Sistemas de Partículas II"
	},
	"ICF177_L05": {
    	id: 	"1IMG6TmyCHbJwR0-aOgxnUah8IT3ekpn7", 
    	title: 	"Listado 5 - Centro de Masa y Momento de Inercia de Sólidos Rígidos"
	},
	"ICF177_L06": {
    	id: 	"1K4afocs546NPFI7KD0dWhre76Z0b3Pk_", 
    	title: 	"Listado 6 - Poleas no ideales"
	},
	"ICF177_L07": {
    	id:   	"11h5QYKw6fNQf7E-gygTMkykgsznwBjYA", 
    	title: 	"Listado 7 - Rodadura y Momentum Angular"
	},
	"ICF177_L08": {
    	id:		"1qjlI9SzbAemUF0bT9pYEtRFGxX_iXcw9", 
    	title: 	"Listado 8 - Elementos del MAS"
	},
	"ICF177_L09": {
    	id: 	"1u5bfHD3yxGJgOey3sscRQH2XyB3zbnWO", 
    	title: 	"Listado 9 - Péndulos"
	},
	"ICF177_L10": {
    	id: 	"1uyTzGHSowHNlc6QvGI9K5-H7x_u9adB5", 
    	title:  "Listado 10 - Oscilaciones Amortiguadas y Forzadas"
	},
	"ICF177_L11": {
    	id: 	"1X708JCYsLHqnxkBnoiaqsvO-mXXCADYW", 
    	title: 	"Listado 11 - Mecánica de Fluidos: Estática"
	},
	"ICF177_L12": {
    	id: 	"1wl30HUaNfW64IwudFH-a0NC3D6FTm7tP", 
    	title: 	"Listado 12 - Mecánica de Fluidos: Dinamica"
	}
};

// 2. THE RENDER FUNCTION
// Notice it now ONLY needs the phonebook key (pdfKey)
function renderMoodlePdf(pdfKey) {
  // SAFETY MEASURE: Auto-generate the target ID
  const targetId = `pdf-contained-${pdfKey}`;
  const container = document.getElementById(targetId);
  
  // If the box isn't in Moodle, stop the script silently
  if (!container) {
    console.error(`Error: Moodle is missing the <div id="${targetId}"></div>`);
    return;
  }

  // Look up the ID and Title from the Phonebook
  const pdfData = pdfRegistry[pdfKey];

  // If you typed the wrong name in Moodle, show a safe error
  if (!pdfData) {
    container.innerHTML = `
      <p style="color: red; text-align: center; border: 1px solid red; padding: 10px;">
        Error: El PDF "${pdfKey}" no está registrado en el Phonebook de GitHub.
      </p>`;
    return;
  }

  // Inject YOUR exact HTML structure, using the Phonebook data
  const templateHtml = `
    <p></p>
    <h3 style="text-align: center;">
      <a href="https://drive.google.com/file/d/${pdfData.id}/preview" target="_blank" style="color: #0056b3; text-decoration: none;">
        <strong>${pdfData.title}</strong>
      </a>
    </h3>
    <p style="text-align: center;">
      (Usa el enlace de arriba o el botón en la esquina superior derecha del visor para abrir el archivo a tamaño completo y/o descargarlo):
    </p>
    <div 
      class="embed-responsive embed-responsive-16by9" 
      style="text-align: center;">
      <iframe 
        class="embed-responsive-item" 
        allowfullscreen=""
        src="https://drive.google.com/file/d/${pdfData.id}/preview" 
        >
      </iframe>
    </div>
    <p><br /><br /></p>
  `;

  container.innerHTML = templateHtml;
}


/* 
	// You only pass the Phonebook Name. Nothing else.
	<script src="https://masp-ufro.github.io/ScriptsParaCV/pdf-template-v2.js"></script>
	<div id="pdf-contained-ICF177_L01"></div>
	<script>
		renderMoodlePdf("ICF177_L01");
	</script>
*/
