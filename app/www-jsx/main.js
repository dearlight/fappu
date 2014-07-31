/**
 * @jsx React.DOM
 */

var React = require('react');
var Fappu = require('./app');

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
  render();
  console.log('PUSHING', JSON.stringify(state, null, 2));
}
function popState() {
  var state = states.pop();
  render();
  if (state) console.log('POPPING', JSON.stringify(state, null, 2));
}
require('ipc').on('pushState', pushState);

function render() {
  var location = states[states.length - 1];
  React.renderComponent(
    <Fappu location={location} stateManager={{push:pushState,pop:popState}} />,
    document.body
  )
}

render();