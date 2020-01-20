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
  $(".modal__close .overlay").on("click", function() {
    $(".overlay, #consultation, #order, #thanks").fadeOut("slow");
  });

  // Add validate for form

  function validateForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        phone: {
          required: true
        },
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: {
          required: "Пожалуйста введите ваше имя",
          minlength: jQuery.validator.format("Введите {0} символа!")
        },
        phone: {
          required: "Пожалуйста введите ваш номер телефона"
        },
        email: {
          required: "Пожалуйста укажите вашу почту",
          email: "Ваш почтовый ящик должен иметь формат name@domain.com"
        }
      }
    });
  }

  validateForms("#consultation-form form");
  validateForms("#consultation form");
  validateForms("#order form");

  //Add masked input
  $("input[name=phone]").mask("+7 (999) 999-99-99");

  // Add send mail
  $("form").submit(function(e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function() {
      $(this)
        .find("input")
        .val("");
      $("#consultation, #order").fadeOut();
      $(".overlay, #thanks").fadeIn("slow");

      $("form").trigger("reset");
    });
    return false;
  });

  //Add smoth scroll page up
  $(window).scroll(function() {
    if ($(this).scrollTop() > 1600) {
      $(".pageup").fadeIn();
    } else {
      $(".pageup").fadeOut();
    }
  });

  $("a[href='#up']").click(function() {
    const _href = $(this).attr("href");
    $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
    return false;
  });

  new WOW().init();
});
