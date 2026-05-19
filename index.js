// Revolution Slider initialization
var revapi263, tpj;
(function () {
  if (tpj === undefined) {
    tpj = jQuery;
    if ("off" == "on")
      tpj.noConflict();
  }
  if (!/loaded|interactive|complete/.test(document.readyState))
    document.addEventListener("DOMContentLoaded", onLoad);
  else
    onLoad();
  
  async function onLoad() {
    // Esperar a que se carguen los slides dinámicos
    if (window.sliderNoticiasReady) {
      await window.sliderNoticiasReady;
    }
    
    if (tpj("#rev_slider_26_1").revolution == undefined) {
      revslider_showDoubleJqueryError("#rev_slider_26_1");
    } else {
      var revOffset = tpj(window).width() <= 991 ? '73px' : '';
      revapi263 = tpj("#rev_slider_26_1").show().revolution({
        sliderType: "standard",
        jsFileLocation: "revolution/js/",
        sliderLayout: "fullscreen",
        dottedOverlay: "none",
        delay: 4500,
        navigation: {
          keyboardNavigation: "on",
          keyboard_direction: "horizontal",
          mouseScrollNavigation: "off",
          mouseScrollReverse: "default",
          onHoverStop: "off",
          touch: {
            touchenabled: "on",
            touchOnDesktop: "on",
            swipe_threshold: 75,
            swipe_min_touches: 1,
            swipe_direction: "horizontal",
            drag_block_vertical: false
          },
          arrows: {
            enable: true,
            style: 'ares',
            tmp: '',
            rtl: false,
            hide_onleave: false,
            hide_onmobile: true,
            hide_under: 767,
            hide_over: 9999,
            hide_delay: 0,
            hide_delay_mobile: 0,

            left: {
              container: 'slider',
              h_align: 'left',
              v_align: 'center',
              h_offset: 60,
              v_offset: 0
            },

            right: {
              container: 'slider',
              h_align: 'right',
              v_align: 'center',
              h_offset: 60,
              v_offset: 0
            }
          },
          bullets: {
            enable: true,
            style: 'zeus',
            direction: 'horizontal',
            rtl: false,

            container: 'slider',
            h_align: 'center',
            v_align: 'bottom',
            h_offset: 0,
            v_offset: 30,
            space: 7,

            hide_onleave: false,
            hide_onmobile: false,
            hide_under: 0,
            hide_over: 767,
            hide_delay: 200,
            hide_delay_mobile: 1200
          },
        },
        responsiveLevels: [1240, 1025, 778, 480],
        visibilityLevels: [1920, 1500, 1025, 768],
        gridwidth: [1200, 991, 778, 480],
        gridheight: [1025, 1366, 1025, 868],
        lazyType: "none",
        shadow: 0,
        spinner: "spinner4",
        stopLoop: "off",
        stopAfterLoops: -1,
        stopAtSlide: -1,
        shuffle: "off",
        autoHeight: "on",
        fullScreenAutoWidth: "on",
        fullScreenAlignForce: "off",
        fullScreenOffsetContainer: "",
        fullScreenOffset: revOffset,
        disableProgressBar: "on",
        hideThumbsOnMobile: "off",
        hideSliderAtLimit: 0,
        hideCaptionAtLimit: 0,
        hideAllCaptionAtLimit: 0,
        debugMode: false,
        fallbacks: {
          simplifyAll: "off",
          nextSlideOnWindowFocus: "off",
          disableFocusListener: false,
        }
      });
    }
    ; /* END OF revapi call */
  }
  ; /* END OF ON LOAD FUNCTION */
}()); /* END OF WRAPPING FUNCTION */

// Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-93NGDNYKNY');
