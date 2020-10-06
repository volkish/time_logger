/*
 * This script updates the element 'id' with 'newContent' if the two contents differ
 */
function updateElementIfChanged(id, newContent) {
    var el = $(id);
    if (el.innerHTML != newContent) { el.update(newContent); }
}

$(function() {

  // Support for data-with tag on elements with data-remote.
  // Pass custom params to data-with to send them with the request.
  $(document).on('ajax:beforeSend', '[data-remote][data-with]', function(event, xhr, settings){
    var params = eval($(this).data('with'));
    if (settings.url.match(/\?/)) {
      settings.url = settings.url + '&' + params;
    } else {
      settings.url = settings.url + params;
    }
    return true;
  });

  // Support for data-replace tag on elements with data-remote.
  // Pass an jQuery selector that should be replaced with the response from server.
  $(document).on('ajax:success', '[data-remote][data-replace]', function(event, data) {
    var $this = $(this);

    // As of Rails 5.1 and the new rails-ujs, the parameters data, status, xhr have been bundled into event.detail.
    // For information about the previously used jquery-ujs in Rails 5 and earlier, read the jquery-ujs wiki.
    if (typeof(data) === "undefined") {
      data = event.detail[2].response;
    }
    $($this.data('replace')).html(data);
    $this.trigger('ajax:replaced');
    return true;
  });
});

// Used in Plugin Settings page to delete transition
function deleteTransitionField(from_id) {
  // changes field name to remove from settings.
  document.getElementById('settings_status_transitions_' + from_id).name = "deleted_transition" + from_id;
}

// Used in Plugin Settings page to add transition
function addTransitionField() {
  // inserts new hidden tag for new status transition.
  var elem = document.getElementById('add-transition');
  var to_id = document.getElementById('new-transition-to').value;
  var from_id = document.getElementById('new-transition-from').value;
  var new_tag = '<input type="hidden" id="settings_status_transition_'+ from_id + '" name="settings[status_transitions][' + from_id + ']" value="' + to_id + '">';
  elem.innerHTML= new_tag;
}

// -----------------------------------------------------------------------------------------------------------------------------------------------------

var x;
var startstop = 0;

function startStop() { /* Toggle StartStop */

  startstop = startstop + 1;

  if (startstop === 1) {
    start();
    document.getElementById("start").innerHTML = "Stop";
  } else if (startstop === 2) {
    document.getElementById("start").innerHTML = "Start";
    startstop = 0;
    stop();
  }

}

function start() {
  x = setInterval(timer, 10);
} /* Start */

function stop() {
  clearInterval(x);
} /* Stop */

var milisec = 0;
var sec = 0; /* holds incrementing value */
var min = 0;
var hour = 0;

/* Contains and outputs returned value of  function checkTime */

var miliSecOut = 0;
var secOut = 0;
var minOut = 0;
var hourOut = 0;

/* Output variable End */


function timer() {
  /* Main Timer */


  miliSecOut = checkTime(milisec);
  secOut = checkTime(sec);
  minOut = checkTime(min);
  hourOut = checkTime(hour);

  milisec = ++milisec;

  if (milisec === 100) {
    milisec = 0;
    sec = ++sec;
  }

  if (sec == 60) {
    min = ++min;
    sec = 0;
  }

  if (min == 60) {
    min = 0;
    hour = ++hour;

  }


  document.getElementById("milisec").innerHTML = miliSecOut;
  document.getElementById("sec").innerHTML = secOut;
  document.getElementById("min").innerHTML = minOut;
  document.getElementById("hour").innerHTML = hourOut;

}


/* Adds 0 when value is <10 */


function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function reset() {


  /*Reset*/

  milisec = 0;
  sec = 0;
  min = 0
  hour = 0;

  document.getElementById("milisec").innerHTML = "00";
  document.getElementById("sec").innerHTML = "00";
  document.getElementById("min").innerHTML = "00";
  document.getElementById("hour").innerHTML = "00";

}