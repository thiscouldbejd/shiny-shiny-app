$(document).ready(function() {

  // -- Load Body Content -- //
  var path = querySt("path");
  if (path) request(path).then(function(value) {
    var converter = new showdown.Converter({
        tables: true
      }),
      content = $("#content").append(converter.makeHtml(value));

    content.find("h1, h2")
      .addClass("alert alert-primary");
    content.find("h3, h4")
      .addClass("alert alert-success");
    content.find("h5, h6")
      .addClass("alert alert-secondary");
    content.find("table")
      .addClass("table table-hover")
      .filter(function(index, element) {
        return $(element).find("tr").length > 10;
      })
      .addClass("table-sm");
    content.find("thead")
      .addClass("thead-dark");

    content.find("li em strong, p em strong")
      .each(function(index, element) {
        $(element).parent().replaceWith(
          "<span class='badge bg-dark'>" + $(element).text().replace(/'/g, "") + "</span>"
        );
      });

  });

  // -- Load Version Info -- //
  request(`manifest.json`).then(function(value) {

    $("#version").append($("<p />", {
      text: "Version = " + value.version +
        (value.short_name == "** Shiny **" ? " | D" : value.short_name == "*Shiny*" ? " | B" : ""),
    }));
  });

});

// -- Provides Access to Query String Variables (e.g. debug flags) -- //
function queryStArray() {
  var url = window.location.search.substring(1);
  return url.split("&");
}

function querySt(variable) {
  var urlArray = queryStArray();

  for (var i = 0; i < urlArray.length; i = i + 1) {
    var ft = urlArray[i].split("=");
    if (ft[0] == variable) return ft[1];
  }

}