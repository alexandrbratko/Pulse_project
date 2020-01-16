$(document).ready(function() {
  // Carousel
  $(".carousel__inner").slick({
    speed: 1200,
    prevArrow: `<button type="button" class="slick-prev">
		<img src="icons/left.svg">
		</button>`,
    nextArrow: `<button type="button" class="slick-next">
		<img src="icons/right.svg">
		</button>`,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          dots: true,
          arrows: false
        }
      }
    ]
  });

  // Tabs
  $("ul.catalog__tabs").on("click", "li:not(.catalog__tab_active)", function() {
    $(this)
      .addClass("catalog__tab_active")
      .siblings()
      .removeClass("catalog__tab_active")
      .closest("div.container")
      .find("div.catalog__content")
      .removeClass("catalog__content_active")
      .eq($(this).index())
      .addClass("catalog__content_active");
  });

  // Tabs Slide
  function toggleSlide(item) {
    $(item).each(function(i) {
      $(this).on("click", function(e) {
        e.preventDefault();
        $(".catalog-item__content")
          .eq(i)
          .toggleClass("catalog-item__content_active");
        $(".catalog-item__list")
          .eq(i)
          .toggleClass("catalog-item__list_active");
      });
    });
  }
  toggleSlide(".catalog-item__link");
  toggleSlide(".catalog-item__back");

  // Modal window
  // function to open a modal window when you click on the button to order a consultation
  $("[data-modal=consultation]").on("click", function() {
    $(".overlay, #consultation").fadeIn("slow");
  });

  // function to open a modal window when you click on the buy button
  $(".button_mini").each(function(i) {
    $(this).on("click", function() {
      $("#order .modal__descr").text(
        $(".catalog-item__subtitle")
          .eq(i)
          .text()
      );
      $(".overlay, #order").fadeIn("slow");
    });
  });

  // function to close all modal window
  $(".modal__close").on("click", function() {
    $(".overlay, #consultation, #order, #thanks").fadeOut("slow");
  });
});
