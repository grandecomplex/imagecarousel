define("LoadEvents", ["utils"], function() {
  var LoadEvents = function() {
    $(document).ready(this.addEvents.bind(this));
    $(window).unload(this.removeEvents.bind(this));
  };

  return LoadEvents;  
});