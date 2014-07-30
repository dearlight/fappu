/**
 * @jsx React.DOM
 */

var React = require('react');
var Viewer = require('./pages/Viewer');
var Header = require('./header');

var Fappu = React.createClass({
  render: function() {
    if (this.props.location.page === 'viewer') {
      return <div className="fappu">
        <Header />
        <Viewer parent={this.props.location.parent} pages={this.props.location.data.pages} />
      </div>
    }
    return undefined;
  }
})

module.exports = Fappu;