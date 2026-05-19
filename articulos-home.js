// Cargar artículos en la página principal
(function() {
  const container = document.getElementById('articulos-container');
  
  if (!container) return;

  // Cargar los 4 artículos más recientes desde Strapi
  fetch(`${BASE_URL}/api/articulos?populate=*&sort=fecha:DESC&pagination[page]=1&pagination[pageSize]=4`)
    .then(response => response.json())
    .then(data => {
      const articulosAMostrar = data.data;

      // Helper para obtener URL de imagen
      function getImageUrl(imagen) {
        if (!imagen) return '/images/default-autor.jpg';
        if (typeof imagen === 'string') return imagen;
        if (imagen.url) return `${BASE_URL}${imagen.url}`;
        return '/images/default-autor.jpg';
      }

      // Generar HTML para cada artículo
      const htmlArticulos = articulosAMostrar.map(articulo => {
        const imagenUrl = getImageUrl(articulo.imagenAutor || articulo.imagen);
        
        return `
          <div class="col-md-6 margin-30px-bottom xs-margin-15px-bottom">
            <div class="feature-box h-100 box-shadow-large-hover border-radius-6px border-all border-color-medium-gray overflow-hidden last-paragraph-no-margin" style="text-align: left;">
              <div class="feature-box-move-bottom-top w-100 font-weight-500">
                <div class="padding-2-rem-all" style="width: 100%; background-color: #fff;">
                  <div class="row row-cols-1">
                    <div class="col-8 p-0">
                      <div class="feature-box-content last-paragraph-no-margin">
                        <span class="alt-font font-weight-700 text-green d-inline-block margin-10px-bottom">${articulo.fecha}</span>
                        <span class="alt-font text-extra-large font-weight-700 d-inline-block margin-10px-bottom">${articulo.titulo}</span>
                        <span class="alt-font d-block font-weight-500 margin-10px-bottom">Escrito por: ${articulo.autor}</span>
                      </div>
                      <div class="margin-15px-top">
                        <a href="/sala-de-prensa/articulo.html?slug=${articulo.slug}" class="btn btn-link btn-large thin text-green">Leer artículo</a>
                      </div>
                    </div>
                    <div class="col-4 d-flex justify-content-center align-items-center">
                      <div style="width: 128px; height: 128px; border-radius: 50%; overflow: hidden; flex-shrink: 0;">
                        <img style="width: 100%; height: 100%; object-fit: cover; display: block;" src="${imagenUrl}" alt="${articulo.autor}">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
      }).join('');

      container.innerHTML = htmlArticulos;
    })
    .catch(error => {
      console.error('Error cargando artículos:', error);
      container.innerHTML = '<p class="text-center">Error al cargar los artículos.</p>';
    });
})();