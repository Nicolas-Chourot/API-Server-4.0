// Author: Nicolas Chourot
$(() => {
    $(".Email").each(function () {
      $(this).attr(
        "pattern",
        /* https://regex-generator.olafneumann.org/ vraiment cool*/
        /* String.raw pour ne pas interpréter les "\" */
        String.raw`^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$`
      );
    });
    $(".URL").each(function () {
        $(this).attr(
          "pattern",
          String.raw`(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?$`
        );
      });
    $(".phone").each(function () {
      $(this).attr("pattern", String.raw`^\(\d\d\d\)\s\d\d\d-\d\d\d\d$`);
      $(this).mask("(999) 999-9999");
      $(this).attr("onchange", "this.setCustomValidity('')");
      $(this).attr("onkeypress", "this.setCustomValidity('')");
    });

    $(".zipcode").each(function () {
      $(this).attr(
        "pattern",
        String.raw`^[a-zA-Z][0-9]+[a-zA-Z]\s[0-9]+[a-zA-Z][0-9]+$`
      );
      $(this).mask("a9a 9a9");
      $(this).attr("onchange", "this.setCustomValidity('')");
      $(this).attr("onkeypress", "this.setCustomValidity('')");
    });

    $("input[type='checkbox']").each(function () {
      $(this).attr("onchange", "this.setCustomValidity('')");
    });

    $("input[type='number']").each(function () {
      $(this).attr("onchange", "this.setCustomValidity('')");
    });

    $("input[type='radio']").each(function () {
      $(this).attr(
        "onchange",
        "this.setCustomValidity(''); document.getElementsByName('" +
          $(this).attr("name") +
          "').forEach((radio) => {radio.setCustomValidity('')});"
      );
      console.log($(this).attr("onchange"));
    });

    $("[required]").each(function () {
      let invalidMessage = $(this).attr("invalidMessage");
      if (invalidMessage) {
        $(this).attr(
          "oninvalid",
          "this.setCustomValidity('" +
            invalidMessage.replace("'", "\\'") +
            "')"
        );
        $(this).attr("oninput", "this.setCustomValidity('')");
      }
    });
  });