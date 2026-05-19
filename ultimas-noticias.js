/**
 * Carga las últimas 3 noticias
 */

document.addEventListener('DOMContentLoaded', async () => {
  const contenedorUltimas = document.getElementById('ultimas-container');

  try {
    const res = await fetch(`${BASE_URL}/api/noticias?populate=*&sort=fecha:DESC&pagination[page]=1&pagination[pageSize]=3`);
    const response = await res.json();
    const ultimasTres = response.data;

    // Renderizar
    ultimasTres.forEach(noticia => {
      // Obtener imagen (puede venir de Strapi o ser una URL directa)
      let imagenUrl = noticia.imagen;
      if (noticia.imagen && noticia.imagen.url) {
        imagenUrl = `${BASE_URL}${noticia.imagen.url}`;
      } else if (!imagenUrl) {
        imagenUrl = '/images/default-noticia.jpg';
      }

      const col = document.createElement('div');
      col.className = 'col-sm-12 col-md-4 margin-30px-bottom xs-margin-15px-bottom';
      col.innerHTML = `
        <div style="text-align: left; justify-content: stretch;"
          class="feature-box h-100 box-shadow-large-hover border-radius-6px border-all border-color-medium-gray overflow-hidden last-paragraph-no-margin">
          <div class="feature-box-move-bottom-top font-weight-500">
            <div class="position-relative" style="width: 100%; height: 222px; overflow: hidden;">
              <img src="${imagenUrl}" alt="Noticia" data-no-retina="" style="width: 100%; object-fit: cover; height: 100%;">
              <div class="position-absolute" style="top: 10px; right: 10px; background-color: rgba(0, 158, 69, 0.9); padding: 5px 10px; border-radius: 4px;">
                <span class="text-white font-weight-500" style="font-size: 12px;">${noticia.categoria}</span>
              </div>
            </div>
            <div class="padding-2-rem-all h-100 w-100" style="background-color: #fff;">
              <div class="margin-15px-bottom d-flex align-items-center">
                <i class="feather icon-feather-calendar text-green margin-10px-right"></i>
                <span class="alt-font text-green">${noticia.fecha}</span>
              </div>
              <div class="feature-box-content last-paragraph-no-margin">
                <p>${noticia.titulo}</p>
              </div>
              <div class="margin-15px-top">
                <a href="/sala-de-prensa/noticia.html?slug=${noticia.slug}"
                  class="btn btn-link thin btn-large text-green">Leer más</a>
              </div>
            </div>
          </div>
        </div>
      `;
      contenedorUltimas.appendChild(col);
    });
  } catch (error) {
    console.error('Error cargando noticias:', error);
    contenedorUltimas.innerHTML = `<p class="text-center text-muted">No se pudieron cargar las noticias</p>`;
  }
});