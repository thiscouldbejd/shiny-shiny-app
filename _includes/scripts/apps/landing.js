var _attach = function(to, fn, event) {
  to.addEventListener ?
    to.addEventListener(event ? event : "load", fn, false) :
  	to.attachEvent ? 
    	to.attachEvent("on" + (event ? event : "load"), fn) : 
  		(to.onload = fn);
};

var _run = function() {
  
  var rellax = new Rellax(".rellax");
  
  if (Element.prototype.scrollIntoView) {
    
    var hrefs = document.getElementsByTagName("a"), fn = function(e) {
      var el = document.getElementById(e.target.hash.slice(1));
      if (el && el.scrollIntoView) {
        e.preventDefault();
        el.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
        return false;
      }
    };

    for (var i= 0; i < hrefs.length; ++i) {
      if (hrefs[i].hash && hrefs[i].host == window.location.host && hrefs[i].pathname == window.location.pathname) _attach(hrefs[i], fn, "click");
    }
    
  }
 
};

_attach(window, _run);