// 1. THE HTML PHONEBOOK
const htmlRegistry = {
	"ICF177_Bibliografia": "1JeagyZyXNPWcGoxc6ZN-bQzLwpJ1H87F",
	"ICF177_Evaluaciones": "1ij9CyX69WSa8Klqk7W3Lqxp5lvITPPiF",
	"ICF177_Pautas": "19opx_-tC6L4CcLKW4J080601aIF1Bt7F",
	"ICF177_Proy_Descripcion": "1B8nd-95dKr0RNjG7vEdLL4wJOZSh45dO",
	"ICF177_Proy_Fechas": "1urY08CsOjSuN7bb07fgAJEH-_Noa7eNi"
};

// 2. THE RENDER FUNCTION
function renderDriveHtmlSnippet(htmlKey) {
	// SAFETY: Auto-generate the target ID based on the phonebook key
	const targetId = `html-contained-${htmlKey}`;
	const container = document.getElementById(targetId);
	
	if (!container) {
		console.error(`Error: Moodle is missing the <div id="${targetId}"></div>`);
		return;
	}

	// This replaces whatever is in the div immediately
	container.innerHTML = `<p style="text-align: center; color: #666; font-style: italic;">
		Cargando contenido desde Drive...
	</p>`;

	// Look up the Google File ID from our Phonebook
	const htmlFileId = htmlRegistry[htmlKey];

	if (!htmlFileId) {
		container.innerHTML = `<p style="color:red;">Error: HTML "${htmlKey}" no registrado.</p>`;
		return;
	}

	const textReaderUrl = 'https://script.google.com/macros/s/AKfycbxO_3k0Sc6uvuxKBsD-0Bxl1orNDKoxXmrXYo0sdjvgOwhZsuEEsNpjeSb7ZHtdVwwRdw/exec'; 

	// 3. Fetch from Google if not saved locally
	fetch(`${textReaderUrl}?id=${htmlFileId}`)
		.then(response => response.text())
		.then(rawHtmlCode => {
			// Save it in the browser for next time
			sessionStorage.setItem(`moodle_html_${htmlId}`, rawHtmlCode);
			// Inject into Moodle
			container.innerHTML = rawHtmlCode;
		})
		.catch(err => {
			console.error("Error fetching Drive HTML:", err);
			container.innerHTML = "<p>Error cargando las instrucciones.</p>";
		});
}
