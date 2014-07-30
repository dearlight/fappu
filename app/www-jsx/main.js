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

var states = [{
    page: 'viewer',
    data: {
      url: 'https://api.fakku.net/manga/right-now-while-cleaning-the-pool/read'
    }
  }, {page:'tags'}];
function pushState(state, clear) {
  if (clear) {
    states = [];
  }
  states.push(state);
  render();
  console.log('PUSHING', state.page);
}
function popState(state) {
  states.pop();
  render();
  console.log('POPPING', state.page);
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