/**
 * @jsx React.DOM
 */

var React = require('react');
var Fappu = require('./app');
var querystring = require('querystring');
var util = require('util');

// monkey patch atom shell's broken console
if (window.process && window.process.versions['atom-shell']) {
  ['log', 'error', 'debug', 'warn'].forEach(function (type) {
    var _old = console[type];
    console[type] = function (...args) {
      var index = 1;
      var prefix;
      if (typeof args[0] === 'string') {
        prefix = args[0].replace(/%[cjds%]/g, function (type) {
          if (type[1] === 'c') return '';
          if (type[1] === 'd') return +args[index++];
          if (type[1] === 's') return String(args[index++]);
          if (type[1] === 'j') return JSON.stringify(args[index++], null, 2);
        }).replace(/color:\s+\w+\s/g, '');
      }
      else {
        if (args.length === 1 && typeof args[0] !== 'object') {
          prefix = String(args[0]);
        }
        else {
          prefix = util.inspect(args[0]);
        }
      }
      var tail = args.slice(index).filter( str => typeof str !== 'string' || !/^color: \w+/ig.test(str));
      _old.call(console, prefix + ' ' + tail.map( arg => util.inspect(arg) ).join(' '));
    }
  });
}

var debug = require('debug');
var logger = debug('main');

function updateDebug() {
  var props = querystring.parse((window.location.hash || '#').slice(1));
  debug.disable();
  if (props.debug) debug.enable(props.debug);
  logger('new debugging level: %s', props.debug);
}
window.addEventListener("hashchange", updateDebug, false);
updateDebug();

window.addEventListener('error', function (e) {
  var err = e.error;
  console.log(err.message)
  console.log(err.stack)
})

var states = [{page:'tags'}];
function pushState(state, clear) {
  if (clear) {
    states = [];
  }
  states.push(state);
  logger('PUSHING', state);
  render();
}
function popState() {
  if (states.length > 1) {
    var state = states.pop();
    logger('POPPING', state, new Error().stack);
    render();
  }
}
require('ipc').on('pushState', pushState);

var component;
function render() {
  var location = states[states.length - 1];
  component = React.renderComponent(
    <Fappu location={location} stateManager={{push:pushState,pop:popState}} />,
    document.body
  )
}

render();

window.addEventListener('keydown', function (e) {
  component.handleKeyDown(e);
});