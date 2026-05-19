/**
 * Carga y muestra los documentos del partido
 */
document.addEventListener('DOMContentLoaded', async () => {
  const doc_contenedor = document.getElementById('contenedor-documentos');
  const doc_botones = document.querySelectorAll('#tabs-documentos a');

  // Cargar JSON
  const data = await fetch('/data/documentos.json').then(r => r.json());

  // Función de formateo
  function formatearTexto(texto) {
    if (!texto) return '';
    texto = texto.toLocaleLowerCase('es-ES');
    const tildes = {
      'organizacion': 'organización',
      'educacion': 'educación',
      'politica': 'política',
      'comunicacion': 'comunicación',
      'tecnologia': 'tecnología',
      'etica': 'ética',
      'pena': 'peña'
    };
    for (const [k, v] of Object.entries(tildes))
      texto = texto.replace(new RegExp(`\\b${k}\\b`, 'gi'), v);
    texto = texto.replace(/(^|\s)\p{L}/gu, l => l.toLocaleUpperCase('es-ES'));
    texto = texto.replace(/\sDe\s/g, ' de ').replace(/\sY\s/g, ' y ');
    return texto.trim();
  }

  // Renderizar documentos
  function mostrarDocumentos(tipo) {
    doc_contenedor.innerHTML = '';
    if (!data[tipo] || data[tipo].length === 0) {
      doc_contenedor.innerHTML = '<p class="text-center">No hay documentos disponibles.</p>';
      return;
    }

    data[tipo].forEach(doc => {
      const titulo = formatearTexto(doc.titulo);
      const descripcion = doc.descripcion;
      const archivo = doc.archivo;
      const imagen = doc.imagen || 'images/OIP.webp';

      const card = `
        <div class="col-lg-6 col-md-6 margin-30px-bottom xs-margin-15px-bottom">
          <div style="justify-content: initial; align-items: initial;" class="feature-box h-100 box-shadow-large-hover border-radius-6px border-all border-color-medium-gray overflow-hidden">
            <div class="d-flex justify-content-center flex-wrap" style="text-align:left; align-items: unset;">
              <div class="p-3 flex-fill" style="min-width:250px; max-width:65%;">
                <span class="font-weight-700 d-block margin-10px-bottom alt-font">${titulo}</span>
                <p class="m-0 p-0 text-small">${descripcion}</p>
                <a class="text-green d-block margin-10px-top" href="${!archivo.startsWith('#') ? archivo : 'javascript:void(0);'}" target="${!archivo.startsWith('#') ? '_blank' : ''}">
                  Click para leer
                </a>
              </div>
              <div class="text-center p-3" style="flex:0 0 35%; display:flex; justify-content:center;">
                <img src="${imagen}" alt="${titulo}" style="height:auto; border-radius:6px;">
              </div>
            </div>
          </div>
        </div>`;
      doc_contenedor.insertAdjacentHTML('beforeend', card);
    });
  }

  // Eventos de los tabs
  doc_botones.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      doc_botones.forEach(b => b.style.color = '#828282');
      btn.style.color = '#232323';
      mostrarDocumentos(btn.dataset.tipo);
    });
  });

  // Mostrar por defecto Legislación
  mostrarDocumentos('legislacion');
});