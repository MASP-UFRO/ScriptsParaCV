/*
 * InteractiveHTML.js
 *
 * renderSimulation(simUrl, containerId, simHeight = '1000px', maxWidth = '1000px', expandRight = false)
 *
 *  - simUrl      : URL del HTML de la simulación (p. ej. en GitHub Pages).
 *  - containerId : id del elemento de Moodle donde se inserta el iframe.
 *  - simHeight   : altura inicial (y definitiva para simulaciones antiguas).
 *  - maxWidth    : ancho máximo del iframe (p. ej. '1400px', o '100%' para usar todo el ancho).
 *  - expandRight : true = recupera el relleno derecho que Moodle deja alrededor del contenido
 *                  (p. ej. padding-right: 200px), para que el iframe llegue hasta el borde.
 *
 * Las simulaciones nuevas avisan su altura con postMessage({type:'sim-resize', height}),
 * y el iframe se ajusta solo. Las antiguas no avisan: conservan simHeight, como antes.
 */
(function () {
	var frames = [];
	var listening = false;

	function onMessage(event) {
		var data = event.data;
		if (!data || data.type !== 'sim-resize') return;
		var h = Number(data.height);
		if (!isFinite(h) || h <= 0) return;
		for (var i = 0; i < frames.length; i++) {
			var f = frames[i];
			if (!f.isConnected) continue;
			if (f.contentWindow === event.source) {
				var hb = h + 2; // + borde del iframe (1px arriba y abajo)
				f.style.setProperty('height', hb + 'px', 'important');
				f.style.setProperty('min-height', hb + 'px', 'important');
			}
		}
	}


	// Si algún ancestro del contenedor tiene un relleno derecho grande (p. ej. 200px),
	// se compensa con un margen negativo en el hijo de ese ancestro que contiene al contenedor.
	function expandPastRightPadding(container) {
		var child = container, node = container.parentElement;
		while (node && node !== document.body) {
			var pr = parseFloat(window.getComputedStyle(node).paddingRight) || 0;
			if (pr >= 40) {
				child.style.marginRight = (-pr) + 'px';
				return;
			}
			child = node;
			node = node.parentElement;
		}
	}

	window.renderSimulation = function (simUrl, containerId, simHeight = '1000px', maxWidth = '1000px', expandRight = false) {
		const container = document.getElementById(containerId);
		if (!container) return;

		container.innerHTML = `
		<p></p>
		<!-- /** 
		<h3 style="text-align: center;"><strong>Título de ejemplo</strong></h3>
		<p style="text-align: center;">Subtítulo de ejemplo: </p>
		*/ -->
		<div style="width: 100%; text-align: center;">
				<iframe 
						src="${simUrl}" 
						style="box-sizing: border-box; width: 100%; max-width: ${maxWidth}; height: ${simHeight} !important; min-height: ${simHeight} !important; max-height: none !important; border: 1px solid #ccc; border-radius: 8px; overflow: hidden;" 
						scrolling="no" 
						allowfullscreen="true">
				</iframe>
		</div>
		<p><br /><br /></p>
	`;

		if (expandRight) expandPastRightPadding(container);

		var iframe = container.querySelector('iframe');
		frames = frames.filter(function (f) { return f.isConnected; });
		if (iframe) frames.push(iframe);
		if (!listening) {
			window.addEventListener('message', onMessage);
			listening = true;
		}
	};
})();
