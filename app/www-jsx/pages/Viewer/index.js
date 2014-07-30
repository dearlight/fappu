/**
 * @jsx React.DOM
 */

var React = require('react');
var Sidebar = require('./Sidebar');

var Viewer = React.createClass({
  getInitialState: function() {
    return {image: null};
  },
  show: function (page) {
    this.setState({image: page.image});
  },
  render: function() {
    var style = {};
    if (this.state.image) {
      style.backgroundImage = 'url(' + this.state.image + ')';
    }
    var parent;
    if (this.props.parent) {
      parent = <button>{'\u2B07'}</button>
    }
    return <div className="page viewer">
      <div id="sidebar-tools">
        <button>{'\u2605'}</button>
        {parent}
        <button>{'\u25C4'}</button>
      </div>
      <Sidebar pages={this.props.pages} onSelect={this.show} />
      <div id="viewer-content" style={style} />
    </div>
  }
})

module.exports = Viewer;