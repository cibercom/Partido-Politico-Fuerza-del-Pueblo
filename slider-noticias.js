/**
 * Carga dinámicamente las 3 últimas noticias en el revolution slider
 * Expone una promesa global para que index.js espere a que se carguen los slides
 */

//const BASE_URL = "http://localhost:1337";
const BASE_URL = "https://bo.fuerzadelpueblo.org.do";

// Crear promesa global
window.sliderNoticiasReady = new Promise(async (resolve) => {
  try {
    // Esperar a que el DOM esté listo
    if (document.readyState === 'loading') {
      await new Promise(r => document.addEventListener('DOMContentLoaded', r));
    }

    // Cargar las 3 últimas noticias desde Strapi con paginación
    const response = await fetch(`${BASE_URL}/api/noticias?populate=*&sort=fecha:DESC&pagination[page]=1&pagination[pageSize]=3`).then(r => r.json());
    const ultimasNoticias = response.data;
    
    // Obtener el contenedor ul del slider
    const sliderUl = document.querySelector('#rev_slider_26_1 ul');
    
    if (!sliderUl) {
      console.error('No se encontró el contenedor del slider');
      resolve(false);
      return;
    }
    
    // Limpiar slides existentes
    sliderUl.innerHTML = '';
    
    // Generar los slides dinámicamente
    ultimasNoticias.forEach((noticia, index) => {
      const slideIndex = 73 + index; // Índices rs-73, rs-74, rs-75
      const slideNumber = String(index + 1).padStart(2, '0');
      
      // Obtener URL de imagen (compatible con Strapi)
      let imagenUrl = noticia.imagen;
      if (noticia.imagen && typeof noticia.imagen === 'object' && noticia.imagen.url) {
        imagenUrl = `${BASE_URL}${noticia.imagen.url}`;
      } else if (!imagenUrl) {
        imagenUrl = '/images/default-noticia.jpg';
      }
      
      const slide = `
        <li data-index="rs-${slideIndex}" data-transition="zoomout" data-slotamount="default" data-hideafterloop="0"
          data-hideslideonmobile="off" data-easein="default" data-easeout="default" data-masterspeed="1500"
          data-thumb="http://works.themepunch.com/revolution_5_3/wp-content/" data-rotate="0"
          data-saveperformance="off" data-title="${slideNumber}" data-param1="${slideNumber}" data-description="">
          <!-- main image -->
          <img src="${imagenUrl}" alt="${noticia.titulo}" data-bgcolor="#262b32" data-bgposition="center top" data-bgfit="cover"
            data-bgrepeat="no-repeat" data-bgparallax="off" class="rev-slidebg" data-no-retina>

          <!-- Footer overlay con gradiente -->
          <div class="tp-caption tp-shape tp-shapewrapper"
            id="slide-${slideIndex}-footer-bg"
            data-frames='[{"delay":0,"speed":1000,"frame":"0","from":"opacity:0;","to":"o:1;","ease":"Power3.easeInOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]'
            data-type="shape" data-responsive="off"
            data-x="['left','left','left','center']" data-hoffset="['0','0','0','0']"
            data-y="['bottom','bottom','bottom','bottom']" data-voffset="['0','0','0','0']"
            data-width="['full','full','full','full']" data-height="['280','240','380','450']"
            style="z-index: 5; background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0) 100%);">
          </div>

          <!-- Título de la noticia -->
          <div class="tp-caption tp-resizeme alt-font text-white font-weight-600 text-center"
            id="slide-${slideIndex}-title"
            data-frames='[{"delay":400,"speed":1200,"frame":"0","from":"y:50px;opacity:0;","to":"o:1;","ease":"Power3.easeOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]'
            data-type="text" data-whitespace="normal"
            data-x="['center','center','center','center']" data-hoffset="['0','0','0','0']"
            data-y="['bottom','bottom','bottom','bottom']" data-voffset="['100','80','165','160']"
            data-width="['900','750','600','100%']" data-height="auto"
            data-fontsize="['42','34','32','30']" data-lineheight="['52','42','40','38']"
            data-letterspacing="['-1','-0.8','-0.5','-0.3']"
            data-responsive="on" data-responsive_offset="on"
            data-paddingtop="['0','0','0','0']" data-paddingbottom="['0','0','10','10']"
            data-paddingright="['20','15','15','20']" data-paddingleft="['20','15','15','20']"
            style="z-index: 10; text-shadow: 0 2px 8px rgba(0,0,0,0.3);">${noticia.titulo}
          </div>

          <!-- Botón Ver más -->
          <a class="tp-caption tp-resizeme rs-btn btn btn-rounded d-inline-flex align-items-center justify-content-center"
            href="/sala-de-prensa/noticia.html?slug=${noticia.slug}"
            id="slide-${slideIndex}-btn"
            data-frames='[{"delay":800,"speed":1000,"frame":"0","from":"y:30px;opacity:0;","to":"o:1;","ease":"Power3.easeOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]'
            data-type="button" data-responsive="off" data-responsive_offset="off"
            data-x="['center','center','center','center']" data-hoffset="['0','0','0','0']"
            data-y="['bottom','bottom','bottom','bottom']" data-voffset="['40','30','55','70']"
            data-whitespace="nowrap" data-textAlign="['center','center','center','center']"
            data-paddingtop="['12','11','11','11']" data-paddingbottom="['12','11','11','11']"
            data-paddingright="['28','26','24','24']" data-paddingleft="['28','26','24','24']"
            data-fontsize="['15','14','14','14']"
            style="z-index: 15; background-color: #009e45; color: #fff; font-weight: 600; 
                   border: none; box-shadow: 0 4px 12px rgba(0,158,69,0.3); transition: all 0.3s ease;">
            Ver más
            <i class="feather icon-feather-arrow-right" style="margin-left: 8px; font-size: 14px;"></i>
          </a>
        </li>
      `;
      
      sliderUl.insertAdjacentHTML('beforeend', slide);
    });
    
    console.log('✅ Slides dinámicos cargados:', ultimasNoticias.length);
    resolve(true);
    
  } catch (error) {
    console.error('❌ Error cargando noticias en el slider:', error);
    resolve(false);
  }
});