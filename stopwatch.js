//all of the code is from https://stackoverflow.com/questions/20318822/how-to-create-a-stopwatch-using-javascript

class Stopwatch {
  constructor(elem, options) {
    var timer = createTimer(),
      startButton = createButton('start', start),
      stopButton = createButton('stop', stop),
      resetButton = createButton('reset', reset),
      offset,
      clock,
      interval;

    // default options
    options = options || {};
    options.delay = options.delay || 1;

    // append elements
    elem.appendChild(timer);
    //   elem.appendChild(startButton);
    //   elem.appendChild(stopButton);
    //   elem.appendChild(resetButton);
    // initialize
    reset();

    // private functions
    function createTimer() {
      let span = document.createElement('span');
      span.setAttribute('class', 'stopwatchSpan');
      span.setAttribute('id', 'stopId');
      return span;
    }

    function createButton(action, handler) {
      var a = document.createElement('a');
      a.href = '#' + action;
      a.innerHTML = action;
      a.addEventListener('click', function (event) {
        handler();
        event.preventDefault();
      });
      return a;
    }

    function start() {
      if (!interval) {
        offset = Date.now();
        interval = setInterval(update, options.delay);
      }
    }

    function stop() {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    }

    function reset() {
      clock = 0;
      //removeSpan();
      render();
    }

    function removeSpan() {
      var elem = document.getElementById('stopId');
      if (elem != null) elem.parentNode.removeChild(elem);
      else return;
    }

    function update() {
      clock += delta();
      render();
    }

    function render() {
      timer.innerHTML = clock / 1000;
    }

    function delta() {
      var now = Date.now(),
        d = now - offset;

      offset = now;
      return d;
    }

    // public API
    this.start = start;
    this.stop = stop;
    this.reset = reset;
    this.removeSpan = removeSpan;
  }
}
