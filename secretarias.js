/**
 * Carga y muestra las secretarías del partido
 */
document.addEventListener('DOMContentLoaded', async () => {
  const contenedor = document.getElementById('contenedor-secretarias');
  const botones = document.querySelectorAll('.n-partido a[data-tipo]');

  // Cargar JSON
  const data = await fetch('/data/secretarias.json').then(r => r.json());

  // Función que pinta las secretarías
  function mostrarSecretarias(tipo) {
    contenedor.innerHTML = '';
    data[tipo].forEach(sec => {
      const nombre = formatearTexto(sec.nombre);
      const titular = formatearTexto(sec.titular);

      const card = `
        <div class="col-md-4 margin-30px-bottom xs-margin-15px-bottom">
          <div class="feature-box h-100 w-100 box-shadow-large-hover border-radius-6px border-all border-color-medium-gray overflow-hidden">
            <div class="padding-2-rem-all w-100 h-100" style="align-items:center;display:flex;background-color:#fff;">
              <div class="feature-box-content w-100 last-paragraph-no-margin">
                <div class="row row-cols-2" style="align-items: center;">
                  <div class="col-8 p-0" style="text-align: left;">
                    <span class="alt-font text-large font-weight-700 d-inline-block margin-10px-bottom">${nombre}</span>
                    <p>Titular: ${titular}</p>
                  </div>
                  <div class="col-4">
                    <img src="${sec.imagen}" alt="${sec.nombre}">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`;
      contenedor.insertAdjacentHTML('beforeend', card);
    });
  }

  // Eventos de los botones
  botones.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      botones.forEach(b => b.classList.remove('bg-green', 'text-white'));
      btn.classList.add('bg-green', 'text-white');
      mostrarSecretarias(btn.dataset.tipo);
    });
  });

  function formatearTexto(texto) {
    if (!texto) return '';

    // Pasar todo a minúsculas respetando acentos y ñ
    texto = texto.toLocaleLowerCase('es-ES');

    // Capitalizar la primera letra de cada palabra
    texto = texto.replace(/(^|\s)\p{L}/gu, l => l.toLocaleUpperCase('es-ES'));

    // Corregir artículos y preposiciones comunes
    texto = texto
      .replace(/\sDe\s/g, ' de ')
      .replace(/\sY\s/g, ' y ')
      .replace(/\sLa\s/g, ' la ')
      .replace(/\sEl\s/g, ' el ')
      .replace(/\sDel\s/g, ' del ')
      .replace(/\sAl\s/g, ' al ')
      .replace(/\sEn\s/g, ' en ');

    return texto.trim();
  }

  // Cargar por defecto el primero
  mostrarSecretarias('organicas');
});