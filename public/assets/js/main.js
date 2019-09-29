window.onload = function() {
    time();
    ampm();
   
    setInterval(function() {
      time();
      ampm();
     
    }, 1000);
  };
  
  function time() {
    var date = new Date(),
      hours = date.getHours(),
      minutes = date.getMinutes(),
      seconds = date.getSeconds();
    hours = (hours > 12) ? (hours - 12) : hours;
    hours = addZero(hours);
    minutes = addZero(minutes);
    seconds = addZero(seconds);
    document.getElementsByClassName('hours')[0].innerHTML = hours;
    document.getElementsByClassName('minutes')[0].innerHTML = minutes;
    document.getElementsByClassName('seconds')[0].innerHTML = seconds;
  }
  
  function addZero(val) {
    return (val <= 9) ? ("0" + val) : val;
  }
  
  function ampm() {
    var date = new Date(),
      hours = date.getHours(),
      am = document.getElementsByClassName("am")[0].classList,
      pm = document.getElementsByClassName("pm")[0].classList;
    (hours >= 12) ? pm.add("light-on"): am.add("light-on");
    (hours >= 12) ? am.remove("light-on"): pm.remove("light-on");
  }
  
