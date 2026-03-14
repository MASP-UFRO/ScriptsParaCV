function renderSimulation(simUrl, containerId, simHeight = '1000px') {
	const container = document.getElementById(containerId);
	if (!container) return;

	container.innerHTML = `
		<p></p>
		<h3 style="text-align: center;"><strong>Animación interactiva</strong></h3>
		<p style="text-align: center;">(Simulaciones construidas por el Prof. Nikolaos Dimakis): </p>
		
		<div style="width: 100%; text-align: center;">
				<iframe 
						src="${simUrl}" 
						style="width: 100%; max-width: 1000px; height: ${simHeight} !important; min-height: ${simHeight} !important; max-height: none !important; border: 1px solid #ccc; border-radius: 8px; overflow: hidden;" 
						scrolling="no" 
						allowfullscreen="true">
				</iframe>
		</div>
		<p><br /><br /></p>
	`;
}
