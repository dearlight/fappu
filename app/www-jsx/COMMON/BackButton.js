/**
 * @jsx React.DOM
 */

var React = require('react');

var BackButton = React.createClass({
  submit: function (e) {
    e.preventDefault();
    this.props.stateManager.pop();
  },
  render: function() {
    var tag = this.props.tag;
    return <form style={{display:'inline-block'}} onSubmit={this.submit}>
      <button className="back-button">
      {'\u25C4'}
      </button>
    </form>
  }
});

module.exports = BackButton;